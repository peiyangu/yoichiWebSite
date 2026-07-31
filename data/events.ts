export const EVENT_DATES = [
  "2026-07-18",
  "2026-07-25",
  "2026-08-01",
  "2026-08-15",
  "2026-08-22",
  "2026-08-29",
] as const;

export const EVENT_TIME = "17:00〜21:00";
export const STORE_COUNT = 70;

export const VENUE = {
  name: "川の駅船小屋 恋ぼたる",
  address: "〒833-0014 福岡県筑後市尾島２９８−２",
  mapUrl:
    "https://maps.google.com/maps?q=%E5%B7%9D%E3%81%AE%E9%A7%85%E8%88%B9%E5%B0%8F%E5%B1%8B+%E6%81%8B%E3%81%BC%E3%81%9F%E3%82%8B+%E7%A6%8F%E5%B2%A1%E7%9C%8C%E7%AD%91%E5%BE%8C%E5%B8%82%E5%B0%BE%E5%B3%B6298-2&z=17&output=embed",
  googleMapsLink: "https://maps.google.com/?q=川の駅船小屋+恋ぼたる+福岡県筑後市尾島298-2",
} as const;

export const CONTACT = {
  email: "baobabcoffee.001@gmail.com",
  instagram: "https://www.instagram.com/kuidaoreyoichi_chikugo/",
  phone: "0942-91-0698",
  shopName: "バオバブコーヒー",
  hours: "11:00〜21:00",
} as const;

/** "YYYY-MM-DD" をローカルタイムの Date（00:00）としてパースする。
 * `new Date("YYYY-MM-DD")` はUTC 0時として解釈されてしまい、
 * JST等では日付や時刻の比較がずれるため、この関数を必ず使う。
 */
function parseEventDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatEventDate(dateStr: string): string {
  const d = parseEventDate(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[d.getDay()];
  return `${month}/${day}（${weekday}）`;
}

/** イベント当日は21:00（終了時刻）まで「次回イベント」として扱う。 */
export function getNextEventDate(now: Date = new Date()): string | null {
  for (const dateStr of EVENT_DATES) {
    const end = parseEventDate(dateStr);
    end.setHours(21, 0, 0, 0);
    if (end >= now) return dateStr;
  }
  return null;
}

export type EventPhase =
  | { phase: "upcoming"; date: string; target: Date }
  | { phase: "live"; date: string }
  | { phase: "ended" };

/**
 * 現在時刻に対するイベントの状態を返す。
 * - upcoming: 開催日の17:00より前。17:00までの残り時間（target）を返す
 * - live: 開催日の17:00〜21:00の間。「本日開催中」表示用
 * - ended: 全ての開催日が終了済み
 */
export function getEventPhase(now: Date = new Date()): EventPhase {
  for (const dateStr of EVENT_DATES) {
    const start = parseEventDate(dateStr);
    start.setHours(17, 0, 0, 0);
    const end = parseEventDate(dateStr);
    end.setHours(21, 0, 0, 0);

    if (now < start) return { phase: "upcoming", date: dateStr, target: start };
    if (now < end) return { phase: "live", date: dateStr };
  }
  return { phase: "ended" };
}
