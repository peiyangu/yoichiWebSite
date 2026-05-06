import { Store } from "@/types";

export const GENRES = [
  "すべて",
  "和食",
  "洋食",
  "アジア料理",
  "スイーツ",
  "ドリンク",
  "その他",
] as const;

export const mockStores: Store[] = [
  {
    name: "バオバブコーヒー",
    boothNumber: "A-01",
    description: "こだわりのスペシャルティコーヒーとスイーツ。夜市限定ドリンクあり！",
    image: "/images/stores/placeholder.jpg",
    instagram: "https://www.instagram.com/kuidaoreyoichi_chikugo/",
    days: ["2026-07-18", "2026-07-25", "2026-08-01", "2026-08-15", "2026-08-22", "2026-08-29"],
    genre: "ドリンク",
  },
  {
    name: "筑後焼き鳥 鶏蔵",
    boothNumber: "B-03",
    description: "地元産の新鮮な鶏を使った絶品焼き鳥。炭火で丁寧に焼き上げます。",
    image: "/images/stores/placeholder.jpg",
    instagram: "",
    days: ["2026-07-18", "2026-07-25", "2026-08-15"],
    genre: "和食",
  },
  {
    name: "たこ焼き道楽",
    boothNumber: "C-05",
    description: "外カリッと中トロ〜のたこ焼き。ソース・塩・明太など多彩なトッピング。",
    image: "/images/stores/placeholder.jpg",
    instagram: "",
    days: ["2026-07-25", "2026-08-01", "2026-08-22"],
    genre: "和食",
  },
  {
    name: "タイ屋台 SAWASDEE",
    boothNumber: "D-02",
    description: "本場タイのパッタイ・カオマンガイ・タピオカドリンクをご提供。",
    image: "/images/stores/placeholder.jpg",
    instagram: "",
    days: ["2026-08-01", "2026-08-15", "2026-08-29"],
    genre: "アジア料理",
  },
  {
    name: "クレープ工房 Lune",
    boothNumber: "E-04",
    description: "フルーツたっぷりのスイーツクレープ。インスタ映えするビジュアルが人気！",
    image: "/images/stores/placeholder.jpg",
    instagram: "",
    days: ["2026-07-18", "2026-08-22", "2026-08-29"],
    genre: "スイーツ",
  },
  {
    name: "クラフトビール 麦の星",
    boothNumber: "F-01",
    description: "九州産麦芽を使ったクラフトビール専門店。IPA・ヴァイツェン・スタウトなど常時5種類。",
    image: "/images/stores/placeholder.jpg",
    instagram: "",
    days: ["2026-07-18", "2026-07-25", "2026-08-01", "2026-08-15", "2026-08-22", "2026-08-29"],
    genre: "ドリンク",
  },
];
