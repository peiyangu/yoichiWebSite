"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NeonButton from "@/components/ui/NeonButton";
import styles from "./GallerySection.module.css";

// ─── ギャラリーデータ ─────────────────────────────────────
interface GalleryItem {
  id: number;
  title: string;
  description: string;
  event: string;
  color: string;
  emoji: string;
  category: "food" | "crowd" | "stage" | "fireworks" | "booth";
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1,  title: "夜市の賑わい",         description: "たくさんのお客様にご来場いただきました",  event: "第1回", color: "rgba(255,45,158,0.5)",  emoji: "🏮", category: "crowd" },
  { id: 2,  title: "たこ焼きコーナー",     description: "炭火で丁寧に焼き上げる絶品たこ焼き",      event: "第1回", color: "rgba(245,166,35,0.5)",  emoji: "🐙", category: "food" },
  { id: 3,  title: "花火の打ち上げ",       description: "夜空を彩る美しい花火",                  event: "第1回", color: "rgba(139,92,246,0.5)",  emoji: "🎆", category: "fireworks" },
  { id: 4,  title: "屋台の装飾",           description: "カラフルな提灯が並ぶ会場",              event: "第1回", color: "rgba(0,206,201,0.5)",   emoji: "🎇", category: "booth" },
  { id: 5,  title: "クラフトビールブース", description: "九州産クラフトビールが大人気",            event: "第2回", color: "rgba(245,158,11,0.5)",  emoji: "🍺", category: "food" },
  { id: 6,  title: "ステージイベント",     description: "地元アーティストによるライブパフォーマンス", event: "第2回", color: "rgba(239,68,68,0.5)",   emoji: "🎤", category: "stage" },
  { id: 7,  title: "スイーツコーナー",     description: "インスタ映えスイーツが大集合",            event: "第2回", color: "rgba(236,72,153,0.5)",  emoji: "🍮", category: "food" },
  { id: 8,  title: "夕暮れの会場",         description: "筑後の夕空と夜市の灯り",                event: "第2回", color: "rgba(249,115,22,0.5)",  emoji: "🌅", category: "crowd" },
  { id: 9,  title: "フィナーレ花火",       description: "大迫力のフィナーレを飾る打ち上げ花火",    event: "第2回", color: "rgba(124,58,237,0.5)",  emoji: "✨", category: "fireworks" },
  { id: 10, title: "地元の名物料理",       description: "筑後の食材を活かした絶品グルメ",          event: "第2回", color: "rgba(16,185,129,0.5)",  emoji: "🍱", category: "food" },
  { id: 11, title: "入場ゲート",           description: "夜市の幻想的な入り口",                  event: "第2回", color: "rgba(255,45,158,0.4)",  emoji: "⛩", category: "booth" },
  { id: 12, title: "子供たちの笑顔",       description: "世代を超えてみんなが楽しめる夜市",        event: "第2回", color: "rgba(59,130,246,0.5)",  emoji: "😊", category: "crowd" },
];

const CATEGORIES: { key: "all" | GalleryItem["category"]; label: string }[] = [
  { key: "all",       label: "すべて" },
  { key: "crowd",     label: "賑わい" },
  { key: "food",      label: "グルメ" },
  { key: "booth",     label: "屋台" },
  { key: "stage",     label: "ステージ" },
  { key: "fireworks", label: "花火" },
];

const EVENTS = ["すべて", "第1回", "第2回"];

// ─── ライトボックス ───────────────────────────────────────
interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.lightbox}
      onClick={onClose}
    >
      <button className={styles.lightboxClose} onClick={onClose} aria-label="閉じる">
        <X size={22} />
      </button>
      <button
        className={styles.lightboxPrev}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="前の写真"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className={styles.lightboxNext}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="次の写真"
      >
        <ChevronRight size={24} />
      </button>

      <motion.div
        key={item.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className={styles.lightboxContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.lightboxImage}
          style={{ background: `linear-gradient(135deg, ${item.color}, #0b1e3a)` }}
        >
          <span className={styles.lightboxEmoji}>{item.emoji}</span>
        </div>
        <div className={styles.lightboxInfo}>
          <span className={styles.lightboxEvent}>{item.event}</span>
          <h3 className={styles.lightboxTitle}>{item.title}</h3>
          <p className={styles.lightboxDesc}>{item.description}</p>
          <p className={styles.lightboxCounter}>{index + 1} / {items.length}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── メインコンポーネント ────────────────────────────────
export default function GallerySection() {
  const [category, setCategory] = useState<"all" | GalleryItem["category"]>("all");
  const [eventFilter, setEventFilter] = useState("すべて");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = GALLERY_ITEMS.filter((item) => {
    const matchCat   = category === "all" || item.category === category;
    const matchEvent = eventFilter === "すべて" || item.event === eventFilter;
    return matchCat && matchEvent;
  });

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevItem = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextItem = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <div className={styles.pageWrapper}>
      <SectionWrapper className={styles.section}>
        <div className={styles.inner}>

          {/* ヘッダー */}
          <div className={styles.header}>
            <div className={styles.headerIcon} aria-hidden="true">
              <div className={styles.iconBox}>
                <Images size={32} className="text-[#F5A623]" />
              </div>
            </div>
            <span className={styles.eyebrow}>Gallery</span>
            <h1 className={styles.title}>
              過去の<span className={styles.titleAccent}>イベント風景</span>
            </h1>
            <p className={styles.desc}>夜市の活気あふれる瞬間をご覧ください</p>
          </div>

          {/* フィルター */}
          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>開催回:</span>
              {EVENTS.map((ev) => (
                <button
                  key={ev}
                  onClick={() => setEventFilter(ev)}
                  className={styles.filterButton}
                  style={
                    eventFilter === ev
                      ? { background: "#F5A623", color: "#071428" }
                      : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }
                  }
                  aria-pressed={eventFilter === ev}
                >
                  {ev}
                </button>
              ))}
            </div>
            <div className={styles.filterGroupRight}>
              <span className={styles.filterLabel}>種別:</span>
              {CATEGORIES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={styles.filterButton}
                  style={
                    category === key
                      ? { background: "#FF2D9E", color: "#fff" }
                      : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }
                  }
                  aria-pressed={category === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 件数 */}
          <p className={styles.count}>{filtered.length} 枚表示中</p>

          {/* フォトグリッド */}
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <Camera size={40} className={styles.emptyIcon} />
              <p>条件に合う写真が見つかりませんでした。</p>
            </div>
          ) : (
            <motion.div layout className={styles.photoGrid}>
              <AnimatePresence>
                {filtered.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={styles.photoCard}
                    onClick={() => openLightbox(idx)}
                    aria-label={`${item.title}の写真を拡大表示`}
                  >
                    <div
                      className={styles.photoBg}
                      style={{ background: `linear-gradient(135deg, ${item.color}, #0b1e3a)` }}
                    />
                    <div className={styles.photoEmoji}>{item.emoji}</div>
                    <div className={styles.photoOverlay}>
                      <Camera size={20} className="text-white mb-2" />
                      <p className={styles.photoOverlayTitle}>{item.title}</p>
                    </div>
                    <div className={styles.photoBadge}>{item.event}</div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* 下部CTA */}
          <div className={styles.bottomCta}>
            <p className={styles.bottomCtaText}>最新の様子はインスタグラムでも随時更新中！</p>
            <NeonButton
              href="https://www.instagram.com/kuidaoreyoichi_chikugo/"
              variant="pink"
              size="lg"
              external
              aria-label="Instagram でイベント写真を見る"
            >
              Instagram でもっと見る
            </NeonButton>
          </div>
        </div>
      </SectionWrapper>

      {/* ライトボックス */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

