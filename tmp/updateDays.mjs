import { readFileSync, writeFileSync } from 'fs';

const csv = readFileSync('d:/programing/yoruichi/tmp/storeDate.csv', 'utf8');
const lines = csv.split('\n').slice(1);

const colDates = [
  '2026-07-18', // C
  '2026-07-25', // D
  '2026-08-01', // E
  '2026-08-15', // F
  '2026-08-22', // G
  '2026-08-29', // H
];

const storeDays = {};

for (const line of lines) {
  if (!line.trim()) continue;
  
  const cols = [];
  let inQuote = false;
  let cur = '';
  for (const ch of line) {
    if (ch === '"') { inQuote = !inQuote; }
    else if (ch === ',' && !inQuote) { cols.push(cur); cur = ''; }
    else { cur += ch; }
  }
  cols.push(cur);

  const name = cols[0].trim();
  if (!name) continue;

  const days = [];
  for (let i = 0; i < 6; i++) {
    const val = (cols[i + 2] || '').trim();
    if (val !== '不参加' && val !== 'キャンセル' && val !== '') {
      days.push(colDates[i]);
    }
  }
  storeDays[name] = days;
}

// stores.ts を読み込んで days を更新
let src = readFileSync('d:/programing/yoruichi/data/stores.ts', 'utf8');

// 各店舗の days: [...] を正規表現で置換
for (const [name, days] of Object.entries(storeDays)) {
  // 店舗名でブロックを特定し、その中の days: [...] を置換
  // エスケープ
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const daysStr = JSON.stringify(days);
  
  // name: "..." の後に来る days: [...] を置換（同ブロック内）
  // 該当する name フィールドから次の }, までの範囲で days を置換
  const re = new RegExp(`(name:\\s*"${escapedName}"[^}]*?)days:\\s*\\[[^\\]]*\\]`, 's');
  if (re.test(src)) {
    src = src.replace(re, `$1days: ${daysStr}`);
  } else {
    console.warn(`Not found: ${name}`);
  }
}

writeFileSync('d:/programing/yoruichi/data/stores.ts', src, 'utf8');
console.log('Done!');
