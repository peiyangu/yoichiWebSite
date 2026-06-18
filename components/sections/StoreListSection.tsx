"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, SlidersHorizontal, Store as StoreIcon } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { mockStores, GENRES } from "@/data/stores";
import { formatEventDate, EVENT_DATES, getNextEventDate } from "@/data/events";
import type { Store } from "@/types";
import { withBasePath, toWebpPath } from "@/lib/sitePath";
import styles from "./StoreListSection.module.css";

const GENRE_COLORS: Record<string, string> = {
  "和食": "#ef4444",
  "洋食": "#3b82f6",
  "アジア料理": "#f59e0b",
  "スイーツ": "#ec4899",
  "ドリンク": "#8b5cf6",
  "その他": "#6b7280",
};

const LANTERN_COLORS = ["#FF2D9E", "#F5A623", "#FF2D9E", "#F5A623", "#FF2D9E"];
const INITIAL_COUNT = 30;
const LOAD_MORE_COUNT = 30;

function getInitialDateFilter(): string {
  const today = new Date().toISOString().split("T")[0];
  if ((EVENT_DATES as readonly string[]).includes(today)) return today;
  return getNextEventDate() ?? "すべて";
}

interface StoreCardProps {
  store: Store;
}

function StoreCard({ store }: StoreCardProps) {
  const genreColor = GENRE_COLORS[store.genre] ?? "#6b7280";
  const hasImage = store.image && store.image !== "/images/stores/placeholder.jpg";

  return (
    <div className={styles.cardWrapper}>
      <div
        className={styles.cardThread}
        style={{ background: `linear-gradient(to bottom, transparent, ${genreColor}60)` }}
      />
      <motion.div
        className="w-full"
        whileHover={{
          rotate: [0, -1, 1, -0.5, 0],
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        style={{ transformOrigin: "top center" }}
      >
        <div
          className={styles.card}
          style={{
            border: `1px solid ${genreColor}40`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 12px ${genreColor}15`,
          }}
        >
          <div className={styles.colorBar} style={{ backgroundColor: genreColor }} />
          <div
            className={styles.cardImageArea}
            style={{ background: `linear-gradient(135deg, ${genreColor}18 0%, rgba(11,30,58,0.8) 100%)` }}
          >
            <div className={styles.cardImageInner}>
              {hasImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={withBasePath(toWebpPath(store.image))}
                  alt={store.name}
                  className={styles.cardImg}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className={styles.placeholder}>
                  <StoreIcon size={32} style={{ color: genreColor, opacity: 0.5 }} />
                  <span className={styles.placeholderGenre} style={{ color: genreColor }}>
                    {store.genre}
                  </span>
                </div>
              )}
            </div>
            <span
              className={styles.genreBadge}
              style={{ backgroundColor: genreColor, boxShadow: `0 0 8px ${genreColor}60` }}
            >
              {store.genre}
            </span>
            <div className={styles.boothBadge}>
              <span className={styles.boothNum}>{store.boothNumber}</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.storeName}>{store.name}</h3>
          </div>
          <div className={styles.expandArea}>
            <div
              className={styles.expandContent}
              style={{ borderTop: `1px solid ${genreColor}25` }}
            >
              <p className={styles.storeDesc}>{store.description}</p>
              <div className={styles.storeDays}>
                出店日: {store.days.map(formatEventDate).join("・")}
              </div>
              {store.instagram && (
                <Link
                  href={store.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.storeInstagram}
                  aria-label={`${store.name} の Instagram`}
                >
                  <InstagramIcon className="w-2.5 h-2.5" />
                  Instagram
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function StoreListSection() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("すべて");
  const [dateFilter, setDateFilter] = useState<string>(getInitialDateFilter);
  const [displayCount, setDisplayCount] = useState(INITIAL_COUNT);
  const prevFiltersRef = useRef({ search, genre, dateFilter });

  const filtered = useMemo(
    () =>
      mockStores.filter((s) => {
        const matchGenre = genre === "すべて" || s.genre === genre;
        const matchDate  = dateFilter === "すべて" || s.days.includes(dateFilter);
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.genre.toLowerCase().includes(q);
        return matchGenre && matchDate && matchSearch;
      }),
    [search, genre, dateFilter]
  );

  useEffect(() => {
    const prev = prevFiltersRef.current;
    if (prev.search !== search || prev.genre !== genre || prev.dateFilter !== dateFilter) {
      setDisplayCount(INITIAL_COUNT);
      prevFiltersRef.current = { search, genre, dateFilter };
    }
  }, [search, genre, dateFilter]);

  const displayed = useMemo(() => filtered.slice(0, displayCount), [filtered, displayCount]);
  const hasMore = filtered.length > displayCount;

  return (
    <div className={styles.pageWrapper}>
      <SectionWrapper className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.lanternRow} aria-hidden="true">
              {LANTERN_COLORS.map((color, i) => (
                <div key={i} className={styles.lanternItem}>
                  <div className={styles.lanternString} style={{ background: `${color}50` }} />
                  <div
                    className={styles.lanternBody}
                    style={{
                      background: `linear-gradient(160deg, ${color}35 0%, ${color}18 100%)`,
                      border: `1px solid ${color}50`,
                      boxShadow: `0 0 14px ${color}35`,
                    }}
                  >
                    🏮
                  </div>
                  <div className={styles.lanternTail} style={{ background: `${color}30` }} />
                </div>
              ))}
            </div>
            <span className={styles.eyebrow}>Stores</span>
            <h1 className={styles.title}>
              出店<span className={styles.titleAccent}>一覧</span>
            </h1>
            <p className={styles.desc}>
              毎週入れ替わる約70店舗が集結！和食・洋食・アジア料理・スイーツ・ドリンクなど多彩なジャンルが揃う、筑後の夏夜を彩るイベントです。店舗名・ジャンル・開催日でしぼり込んで探せます。
            </p>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
              <Search size={15} className={styles.searchIcon} aria-hidden="true" />
              <input
                type="search"
                placeholder="店舗名・ジャンルで検索..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
                aria-label="店舗検索"
              />
            </div>
            <div className={styles.genreFilters}>
              <SlidersHorizontal size={14} className={styles.filterIcon} aria-hidden="true" />
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={styles.filterButton}
                  style={
                    genre === g
                      ? { background: "#F5A623", color: "#071428" }
                      : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }
                  }
                  aria-pressed={genre === g}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.dateFilterBar}>
            <span className={styles.dateFilterLabel}>開催日:</span>
            <button
              onClick={() => setDateFilter("すべて")}
              className={styles.filterButton}
              style={
                dateFilter === "すべて"
                  ? { background: "#FF2D9E", color: "#fff" }
                  : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }
              }
              aria-pressed={dateFilter === "すべて"}
            >
              すべて
            </button>
            {EVENT_DATES.map((d) => (
              <button
                key={d}
                onClick={() => setDateFilter(d)}
                className={styles.filterButton}
                style={
                  dateFilter === d
                    ? { background: "#FF2D9E", color: "#fff" }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }
                }
                aria-pressed={dateFilter === d}
              >
                {formatEventDate(d)}
              </button>
            ))}
          </div>

          <p className={styles.count}>
            {filtered.length} 店舗
            {hasMore && <span>（{displayed.length} 件表示中）</span>}
          </p>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyIcon}>🏮</p>
              <p>条件に合う店舗が見つかりませんでした。</p>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {displayed.map((store, i) => (
                  <motion.div
                    key={store.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i, 10) * 0.04, duration: 0.4 }}
                  >
                    <StoreCard store={store} />
                  </motion.div>
                ))}
              </div>
              {hasMore && (
                <div className={styles.loadMore}>
                  <button
                    onClick={() => setDisplayCount((c) => c + LOAD_MORE_COUNT)}
                    className={styles.loadMoreBtn}
                  >
                    もっと見る（残り {filtered.length - displayCount} 件）
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
