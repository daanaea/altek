import { put } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GALLERY_ROOT = path.join(__dirname, "..", "public", "images", "gallery");
const OUTPUT_FILE = path.join(__dirname, "..", "lib", "blob-urls.json");

const IMAGE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];

async function getAllImages() {
  const folders = await fs.readdir(GALLERY_ROOT, { withFileTypes: true });
  const images = [];

  for (const folder of folders) {
    if (!folder.isDirectory() || folder.name === "public" || folder.name.startsWith(".")) {
      continue;
    }

    const folderPath = path.join(GALLERY_ROOT, folder.name);
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        images.push({
          localPath: path.join(folderPath, file),
          blobPath: `gallery/${folder.name}/${file}`,
          urlKey: `/images/gallery/${folder.name}/${file}`,
        });
      }
    }
  }

  return images;
}

async function uploadImage(image) {
  const fileBuffer = await fs.readFile(image.localPath);
  const contentType = image.localPath.endsWith(".png") ? "image/png"
    : image.localPath.endsWith(".webp") ? "image/webp"
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
  console.log("🔍 Finding all gallery images...");
  const images = await getAllImages();
  console.log(`📁 Found ${images.length} images to upload\n`);

  const urlMap = {};
  let uploaded = 0;
  let failed = 0;

  for (const image of images) {
    try {
      process.stdout.write(`⬆️  Uploading ${image.blobPath}...`);
      const result = await uploadImage(image);
      urlMap[result.key] = result.url;
      uploaded++;
      console.log(" ✅");
    } catch (error) {
      failed++;
      console.log(` ❌ ${error.message}`);
    }
  }

  // Save the URL mapping
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(urlMap, null, 2));

  console.log(`\n✨ Done!`);
  console.log(`   Uploaded: ${uploaded}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   URL map saved to: ${OUTPUT_FILE}`);
}

main().catch(console.error);
