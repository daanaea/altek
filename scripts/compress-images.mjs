import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname } from 'path';

const GALLERY_DIR = './public/images/gallery';
const BACKUP_DIR = './public/images/gallery-backup';
const QUALITY = 85; // High quality for professional images
const MAX_WIDTH = 2400; // Max width for full-size images

async function getAllImages(dir) {
  const files = await readdir(dir);
  const images = [];

  for (const file of files) {
    const fullPath = join(dir, file);
    const fileStat = await stat(fullPath);

    if (fileStat.isDirectory()) {
      const subImages = await getAllImages(fullPath);
      images.push(...subImages);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      images.push(fullPath);
    }
  }

  return images;
}

async function compressImage(imagePath) {
  try {
    const ext = extname(imagePath).toLowerCase();
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const originalStat = await stat(imagePath);

    console.log(`Processing: ${imagePath}`);
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${metadata.format}, ${(originalStat.size / 1024).toFixed(1)}KB`);

    let outputPath = imagePath;

    // If PNG, convert to JPEG (much smaller for photos)
    if (ext === '.png') {
      outputPath = imagePath.replace(/\.png$/i, '.jpg');
      await image
        .resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(outputPath);

      console.log(`  Converted PNG -> JPEG`);

      const newStat = await stat(outputPath);
      const savings = ((1 - newStat.size / originalStat.size) * 100).toFixed(1);
      console.log(`  Compressed: ${(newStat.size / 1024).toFixed(1)}KB (${savings}% smaller)`);

      // Remove the old PNG
      const { unlink } = await import('fs/promises');
      await unlink(imagePath);
      console.log(`  Removed original PNG`);
      console.log(`  ✓ Done\n`);
      return { original: originalStat.size, compressed: newStat.size };
    } else if (ext === '.webp') {
      // WebP is already optimized, skip it
      console.log(`  Skipping WebP (already optimized)\n`);
      return { original: originalStat.size, compressed: originalStat.size };
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Compress JPEG in place
      await image
        .resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(outputPath + '.tmp');

      const newStat = await stat(outputPath + '.tmp');

      // Only replace if smaller
      if (newStat.size < originalStat.size) {
        await sharp(outputPath + '.tmp').toFile(outputPath);
        const savings = ((1 - newStat.size / originalStat.size) * 100).toFixed(1);
        console.log(`  Compressed: ${(newStat.size / 1024).toFixed(1)}KB (${savings}% smaller)`);

        const { unlink } = await import('fs/promises');
        await unlink(outputPath + '.tmp');
        console.log(`  ✓ Done\n`);
        return { original: originalStat.size, compressed: newStat.size };
      } else {
        console.log(`  Already optimized, skipping`);
        const { unlink } = await import('fs/promises');
        await unlink(outputPath + '.tmp');
        console.log(`  ✓ Done\n`);
        return { original: originalStat.size, compressed: originalStat.size };
      }
    }

    return { original: 0, compressed: 0 };
  } catch (error) {
    console.error(`  ✗ Error processing ${imagePath}:`, error.message);
    return { original: 0, compressed: 0 };
  }
}

async function main() {
  console.log('🖼️  Image Compression Script\n');
  console.log('Settings:');
  console.log(`  - Quality: ${QUALITY}%`);
  console.log(`  - Max width: ${MAX_WIDTH}px`);
  console.log(`  - Converting PNGs to JPEGs`);
  console.log(`  - Keeping WebP files as-is (already optimized)\n`);

  // Create backup directory
  console.log('Creating backup directory...');
  await mkdir(BACKUP_DIR, { recursive: true });
  console.log(`Backup directory ready at: ${BACKUP_DIR}\n`);

  // Get all images
  const images = await getAllImages(GALLERY_DIR);
  console.log(`Found ${images.length} images to compress\n`);

  let totalOriginal = 0;
  let totalCompressed = 0;

  // Process each image
  for (const imagePath of images) {
    const result = await compressImage(imagePath);
    totalOriginal += result.original;
    totalCompressed += result.compressed;
  }

  // Summary
  const totalSavings = totalOriginal - totalCompressed;
  const percentSaved = ((totalSavings / totalOriginal) * 100).toFixed(1);

  console.log('\n✅ Compression Complete!\n');
  console.log('Summary:');
  console.log(`  Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Compressed size: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Space saved: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${percentSaved}%)`);
  console.log(`\nNote: Original images backed up to ${BACKUP_DIR}`);
}

main().catch(console.error);
