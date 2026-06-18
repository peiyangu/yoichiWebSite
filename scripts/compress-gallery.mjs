import sharp from "sharp";
import { readdir, stat, unlink, writeFile } from "fs/promises";
import { join, extname, basename } from "path";

sharp.cache(false);

const dir = "public/oldEventPicture";
const maxWidth = 1200;
const kb = (b) => Math.round(b / 1024);

const entries = await readdir(dir);

for (const file of entries) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const src = join(dir, file);
  const before = (await stat(src)).size;
  const base = basename(file, extname(file));
  const destWebp = join(dir, `${base}.webp`);

  // WebP 生成（toFile で別パスに書くので競合しない）
  await sharp(src)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(destWebp);

  // 圧縮 JPG をバッファに読み込む（ファイルハンドルを完全に閉じてから書き込む）
  const jpgBuf = await sharp(src)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 75, progressive: true })
    .toBuffer();

  // 元ファイルを削除してから書き直す（rename/EPERM 回避）
  await unlink(src);
  await writeFile(src, jpgBuf);

  const afterWebp = (await stat(destWebp)).size;
  const afterJpg = (await stat(src)).size;
  console.log(`${file}: ${kb(before)} KB → webp ${kb(afterWebp)} KB / jpg ${kb(afterJpg)} KB`);
}

console.log("\n完了！");
