"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, Store as StoreIcon } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { mockStores } from "@/data/stores";
import { formatEventDate } from "@/data/events";
import { VENUE_MAP_AREAS, VENUE_MAP_IMAGE, VENUE_MAP_IMAGE_WIDTH, VENUE_MAP_IMAGE_HEIGHT } from "@/data/venueMapAreas";
import type { Store } from "@/types";
import { withBasePath, toWebpPath } from "@/lib/sitePath";
import { getBoothList } from "@/lib/boothNumber";
import styles from "./VenueMapSection.module.css";

const BOOTH_QUERY_KEY = "booth";

function findStoresByBooth(booth: string): Store[] {
  if (!booth) return [];
  return mockStores.filter((s) => getBoothList(s.boothNumber).includes(booth));
}

// data/stores.ts で実際に使われているブース番号の一覧。
// 出店店舗は毎週入れ替わるため、この一覧は固定のブース除外リストではなく、
// stores.ts の内容から都度導出する（店舗のブース番号が更新されれば自動的に反映される）。
const BOOTHS_WITH_STORE_DATA = new Set(
  mockStores.flatMap((s) => getBoothList(s.boothNumber))
);

function StoreMiniCard({ store }: { store: Store }) {
  const hasImage = Boolean(store.image);
  const hasInstagram = Boolean(store.instagram);

  return (
    <div className={styles.storeCard}>
      <div className={styles.storeCardImageWrap}>
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBasePath(toWebpPath(store.image))}
            alt={store.name}
            className={styles.storeCardImage}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.storeCardPlaceholder}>
            <StoreIcon size={24} />
          </div>
        )}
      </div>
      <div className={styles.storeCardBody}>
        <p className={styles.storeCardGenre}>{store.genre}</p>
        <h4 className={styles.storeCardName}>{store.name}</h4>
        <p className={styles.storeCardDesc}>{store.description}</p>
        <p className={styles.storeCardDays}>
          出店日: {store.days.map(formatEventDate).join("・")}
        </p>
        {hasInstagram && (
          <a
            href={store.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.storeCardInstagram}
            aria-label={`${store.name} の Instagram`}
          >
            <InstagramIcon size={14} />
            Instagramで見る
          </a>
        )}
      </div>
    </div>
  );
}

function getInitialBooth(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(BOOTH_QUERY_KEY);
}

export default function VenueMapSection() {
  // 静的書き出し（SSG）のため初期状態は常に「未選択」にし、
  // クエリの反映はマウント後の useEffect（クライアント側）で行う。
  // ここで window.location を直接読んで初期化すると、ハイドレーション時に
  // サーバー側の描画結果とズレて選択状態が反映されないことがあるため避ける。
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  // 店舗一覧などから ?booth= 付きでアクセスした場合、該当店舗を選択状態にし
  // モバイルはモーダルを開き、地図上の該当位置までスクロールする
  useEffect(() => {
    const initialBooth = getInitialBooth();
    if (!initialBooth) return;
    // URL（外部システム）と同期するための正当な初期化のため、ここでの setState は意図的
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedBooth(initialBooth);
    setModalOpen(true);
    mapWrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const matchedStores = useMemo(
    () => (selectedBooth ? findStoresByBooth(selectedBooth) : []),
    [selectedBooth]
  );

  const activeAreaBooths = useMemo(
    () => new Set(selectedBooth ? [selectedBooth] : []),
    [selectedBooth]
  );

  const selectBooth = useCallback((booth: string) => {
    setSelectedBooth(booth);
    setModalOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set(BOOTH_QUERY_KEY, booth);
    window.history.replaceState({}, "", url.toString());
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedBooth(null);
    setModalOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete(BOOTH_QUERY_KEY);
    window.history.replaceState({}, "", url.toString());
  }, []);

  // 店舗名の検索候補
  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return mockStores
      .filter((s) => s.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [search]);

  function handleSuggestionClick(store: Store) {
    setSearch(store.name);
    const primary = getBoothList(store.boothNumber)[0];
    if (primary) {
      selectBooth(primary);
    } else {
      setSelectedBooth("__no-booth__:" + store.name);
      setModalOpen(true);
    }
  }

  const noticeText = (() => {
    if (!selectedBooth) return "地図上の番号をタップすると、出店店舗の情報がここに表示されます。";
    if (selectedBooth.startsWith("__no-booth__:")) {
      const name = selectedBooth.replace("__no-booth__:", "");
      return `店舗「${name}」はまだブース番号が登録されていません。`;
    }
    if (matchedStores.length === 0) {
      return `ブース ${selectedBooth}：店舗情報は近日公開予定です。`;
    }
    return `ブース ${selectedBooth}：${matchedStores.length}件`;
  })();

  const panelContent = (
    <>
      <p className={styles.noticeText}>{noticeText}</p>
      {matchedStores.length > 0 && (
        <div className={styles.storeList}>
          {matchedStores.map((store) => (
            <StoreMiniCard key={store.name} store={store} />
          ))}
        </div>
      )}
    </>
  );

  return (
    <SectionWrapper id="venue-map" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Venue Map</span>
          <h2 className={styles.title}>
            会場<span className={styles.titleAccent}>マップ</span>
          </h2>
          <span className="section-heading-line text-[#F5A623]" />
          <p className={styles.desc}>
            番号をタップすると、該当する店舗情報が表示されます。
            <br />
            ブース番号は主催者側で順次公開予定です。
          </p>
        </div>

        {/* 検索 */}
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="店舗名で検索する（例: baobab coffee）"
            className={styles.searchInput}
            aria-label="店舗名で検索"
          />
          {suggestions.length > 0 && (
            <div className={styles.suggestions}>
              {suggestions.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.grid}>
          {/* マップ */}
          <div className={styles.mapWrapper} ref={mapWrapperRef}>
            <div
              className={styles.mapImageContainer}
              style={{ aspectRatio: `${VENUE_MAP_IMAGE_WIDTH} / ${VENUE_MAP_IMAGE_HEIGHT}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(VENUE_MAP_IMAGE)}
                alt="会場マップ"
                className={styles.mapImage}
              />
              {VENUE_MAP_AREAS.map((area, i) => {
                const hasStore = BOOTHS_WITH_STORE_DATA.has(area.booth);
                return (
                  <button
                    key={`${area.booth}-${i}`}
                    type="button"
                    disabled={!hasStore}
                    className={`${styles.areaBtn} ${
                      activeAreaBooths.has(area.booth) ? styles.areaBtnActive : ""
                    } ${!hasStore ? styles.areaBtnDisabled : ""}`}
                    style={{
                      left: `${area.xPct}%`,
                      top: `${area.yPct}%`,
                      width: `${area.wPct}%`,
                      height: `${area.hPct}%`,
                    }}
                    onClick={hasStore ? () => selectBooth(area.booth) : undefined}
                    aria-label={
                      hasStore
                        ? `ブース ${area.booth} の店舗情報を見る`
                        : `ブース ${area.booth}（店舗は未定です）`
                    }
                  />
                );
              })}
            </div>
            <p className={styles.hint}>
              <MapPin size={14} className="inline-block mr-1 align-[-2px]" />
              ヒント: スマホでは番号をタップするとポップアップで店舗情報が表示されます。
            </p>
          </div>

          {/* 店舗情報パネル（デスクトップ） */}
          <GlassCard className={styles.panel}>{panelContent}</GlassCard>
        </div>
      </div>

      {/* モバイル用モーダル */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={clearSelection}
          >
            <motion.div
              className={`glass ${styles.modalContent}`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>店舗情報</h3>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={clearSelection}
                  aria-label="閉じる"
                >
                  <X size={20} />
                </button>
              </div>
              <div className={styles.modalBody}>{panelContent}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
