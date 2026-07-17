/**
 * 店舗の boothNumber フィールド（例: "23" や "16, 85" のような複数指定）を
 * 個々のブース番号の配列に分解する。
 */
export function getBoothList(boothNumber: string): string[] {
  if (!boothNumber) return [];
  return String(boothNumber)
    .split(/[\s,、/・]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** 会場マップへのリンクなどに使う代表ブース番号（先頭の番号）を返す。 */
export function getPrimaryBooth(boothNumber: string): string | null {
  return getBoothList(boothNumber)[0] ?? null;
}
