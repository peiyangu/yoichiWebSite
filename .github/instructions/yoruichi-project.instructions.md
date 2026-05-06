---
description: "Use when building or modifying UI components, pages, animations, or any code for the 夜市 (Kuidaore Night Market) event website. Covers design theme, tech stack, coding rules, and UX goals."
---

# 第3回 土曜食いだおれ夜市 in 筑後 — プロジェクト規約

## プロジェクト概要

夜開催の屋台イベント特設Webサイト。Instagram からの流入を意識し、「行きたい！」と思わせる没入感あるデザインを最優先にする。

- 公式 Instagram: https://www.instagram.com/kuidaoreyoichi_chikugo/

---

## テックスタック

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **UI**: shadcn/ui
- **方針**: Mobile First / ダークテーマ前提 / SEO 必須

---

## デザイン方針

### テーマ・世界観

「夏祭り」「夜市」「花火大会」「屋台」「ネオン」「和モダン」「活気」

### カラーパレット

| 用途 | 値 |
|------|----|
| ベース背景 | Navy `#0B1E3A` / Deep Blue |
| アクセント | Gold / Warm Orange |
| 強調 | Neon Pink |
| テキスト | White |

### ビジュアルスタイル

- 夜空背景・花火風グラデーション
- ぼかしエフェクト・ガラスモーフィズム
- 光るボタン・ホバー時にネオン発光
- パララックス演出・スクロールアニメーション（重すぎない）

---

## イベントデータ（固定値）

```ts
export const EVENT_DATES = [
  "2026-07-18", "2026-07-25",
  "2026-08-01", "2026-08-15", "2026-08-22", "2026-08-29",
] as const;

export const EVENT_TIME = "17:00〜21:00";
export const STORE_COUNT = 70; // 各日程の出店数目安
```

---

## ページ構成

### TOP ページ必須セクション（この順序を基本とする）

1. Hero — イベント名・開催日・キャッチコピー・光る CTA
2. 開催概要 — 日時・場所・特徴（毎週店舗入替・お得チケット）
3. 出店情報 — 店舗カード一覧
4. 会場情報 — マップ埋め込み
5. Instagram 埋め込み
6. お知らせ
7. FAQ
8. お問い合わせ導線

### 店舗紹介ページ

- カードUI（夜店の看板風・ネオン枠）
- 店舗名・ジャンル・出店日・Instagram リンク・画像
- カテゴリフィルター・検索機能

### お問い合わせページ

- 必須項目: 名前・メールアドレス・問い合わせ内容
- バリデーション実装・送信完了アニメーション

---

## コーディング規約
デザインと構造は必ず別ファイルに記載すること。スタイルは Tailwind CSS を使用し、必要に応じてカスタムクラスを定義する。コードの可読性と保守性を最優先にする。
### TypeScript

- `strict` mode 前提。`any` 使用禁止
- コンポーネント Props は `interface` で定義
- 型安全を最優先

### コンポーネント設計

- 再利用可能な粒度で分割
- `components/ui/` — shadcn/ui ベースの汎用パーツ
- `components/sections/` — ページセクション単位

### フォルダ構成

```
/app/(pages)/
/components/ui/
/components/sections/
/lib/
/types/
/data/
/public/
```

### アニメーション（Framer Motion）

- 過度に重いアニメーションは禁止（モバイルで快適に動作すること）
- スクロールフェードイン・パーティクル背景・花火 Canvas 演出などを積極的に提案
- `prefers-reduced-motion` を考慮

### アクセシビリティ

- Semantic HTML を使用
- インタラクティブ要素には `aria-label` を設定
- コントラスト比を確保（ダークテーマ上の白文字）

### SEO

- 各ページに `metadata` を設定
- OGP・Twitter Card 対応
- 構造化データを意識

---

## UX 優先事項

- **スマホ表示最優先**（Instagram からの流入を想定）
- CTA（開催日・申込み等）を大きく・目立たせる
- 「開催日」「出店数 70 店舗」を常に強調
- スクロール時に動きを持たせる
- 夏祭り感・イベント感を最大化

---

## 推奨する演出アイデア（提案歓迎）

- 花火風 Canvas 背景アニメーション
- ローディングアニメーション（提灯ゆらぎなど）
- 開催日カウントダウンタイマー
- 出店店舗ランダム表示
- Instagram 風ストーリーUI
- SNS シェア導線
