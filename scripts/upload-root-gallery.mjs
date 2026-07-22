import { put } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GALLERY_ROOT = path.join(__dirname, "..", "public", "images", "gallery");
const OUTPUT_FILE = path.join(__dirname, "..", "lib", "blob-urls.json");

const IMAGE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];

async function getRootImages() {
  const entries = await fs.readdir(GALLERY_ROOT, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        images.push({
          localPath: path.join(GALLERY_ROOT, entry.name),
          blobPath: `gallery/${entry.name}`,
          urlKey: `/images/gallery/${entry.name}`,
        });
      }
    }
  }

  return images;
}

async function uploadImage(image) {
  const fileBuffer = await fs.readFile(image.localPath);
  const ext = path.extname(image.localPath).toLowerCase();
  const contentType = ext === ".png" ? "image/png"
    : ext === ".webp" ? "image/webp"
    : "image/jpeg";

  const blob = await put(image.blobPath, fileBuffer, {
    access: "public",
    contentType,
    addRandomSuffix: false,
  });

  return {
    key: image.urlKey,
    url: blob.url,
  };
}

async function main() {
  // Load existing URLs
  let existingUrls = {};
  try {
    const existing = await fs.readFile(OUTPUT_FILE, "utf-8");
    existingUrls = JSON.parse(existing);
  } catch (e) {
    // File doesn't exist yet
  }

  console.log("🔍 Finding root gallery images...");
  const images = await getRootImages();
  console.log(`📁 Found ${images.length} images to upload\n`);

  let uploaded = 0;
  let failed = 0;

  for (const image of images) {
    try {
      process.stdout.write(`⬆️  Uploading ${image.blobPath}...`);
      const result = await uploadImage(image);
      existingUrls[result.key] = result.url;
      uploaded++;
      console.log(" ✅");
    } catch (error) {
      failed++;
      console.log(` ❌ ${error.message}`);
    }
  }

  // Save the merged URL mapping
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(existingUrls, null, 2));

  console.log(`\n✨ Done!`);
  console.log(`   Uploaded: ${uploaded}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total URLs in map: ${Object.keys(existingUrls).length}`);
}

main().catch(console.error);
