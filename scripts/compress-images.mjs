/**
 * 画像圧縮スクリプト
 * 使い方:
 *   npm install --save-dev sharp
 *   node scripts/compress-images.mjs
 *
 * public/stores/ と public/oldEventPicture/ の JPG を
 * 同じパスに WebP + 圧縮 JPG として上書き保存する。
 */

import sharp from "sharp";
import { readdir, stat, rename, unlink, writeFile } from "fs/promises";
import { join, extname, basename } from "path";

const DIRS = [
  { dir: "public/stores", maxWidth: 600 },
  { dir: "public/oldEventPicture", maxWidth: 1200 },
];

async function processDir({ dir, maxWidth }) {
  const entries = await readdir(dir);
  for (const file of entries) {
    const ext = extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const src = join(dir, file);
    const info = await stat(src);
    const before = info.size;

    const base = basename(file, extname(file));

    // WebP として保存
    const destWebp = join(dir, `${base}.webp`);
    await sharp(src)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destWebp);

    // 圧縮 JPG をバッファで生成してそのまま書き込む（Windows の rename 権限エラー回避）
    const jpgBuf = await sharp(src)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality: 75, progressive: true })
      .toBuffer();

    await writeFile(src, jpgBuf);

    const afterWebp = (await stat(destWebp)).size;
    const afterJpg = (await stat(src)).size;
    console.log(
      `${file}: ${kb(before)} KB → webp ${kb(afterWebp)} KB / jpg ${kb(afterJpg)} KB`
    );
  }
}

const kb = (b) => Math.round(b / 1024);

for (const config of DIRS) {
  console.log(`\n=== ${config.dir} ===`);
  await processDir(config);
}
console.log("\n完了！");
