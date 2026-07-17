"use client";

import { useState } from "react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import NeonButton from "@/components/ui/NeonButton";
import { Store } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { mockStores } from "@/data/stores";
import { formatEventDate } from "@/data/events";
import { withBasePath, toWebpPath } from "@/lib/sitePath";
import { getPrimaryBooth } from "@/lib/boothNumber";
import styles from "./StoresSection.module.css";

export default function StoresSection() {
  // ランダム抽選は不純関数（Math.random）を使うため、レンダー中ではなく
  // useState の遅延初期化（マウント時に一度だけ実行）で行う。
  const [preview] = useState(() => {
    const withImage = mockStores.filter(
      (s) => s.image && s.image !== "/images/stores/placeholder.jpg"
    );
    const pool = withImage.length >= 3 ? withImage : mockStores;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });

  return (
    <SectionWrapper id="stores" className={styles.section}>
      <div className={styles.inner}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Stores</span>
          <h2 className={styles.title}>
            出店<span className={`${styles.titleAccent} glow-pink`}>情報</span>
          </h2>
          <span className="section-heading-line text-[#FF2D9E]" />
          <p className={styles.desc}>
            毎週入れ替わる約70店舗が集結！和食・洋食・アジア料理・スイーツ・ドリンクまで勢揃い。
          </p>
        </div>

        {/* プレビューカード */}
        <div className={styles.previewGrid}>
          {preview.map((store) => {
            const primaryBooth = getPrimaryBooth(store.boothNumber);
            return (
            <GlassCard key={store.name} neonColor="pink" className={styles.card}>
              {/* 画像 */}
              <div className={styles.cardImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {store.image && store.image !== "/images/stores/placeholder.jpg" ? (
                  <img
                    src={withBasePath(toWebpPath(store.image))}
                    alt={store.name}
                    className={styles.cardImg}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <Store size={40} className="text-white/20" />
                )}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardBadgeRow}>
                  <span className={styles.cardGenre}>{store.genre}</span>
                  {primaryBooth ? (
                    <Link
                      href={`/venue-map?booth=${encodeURIComponent(primaryBooth)}`}
                      className={`${styles.cardBooth} ${styles.cardBoothLink}`}
                      aria-label={`会場マップで${store.name}の場所（ブース${store.boothNumber}）を見る`}
                    >
                      ブース {store.boothNumber}
                    </Link>
                  ) : (
                    <span className={styles.cardBooth}>ブース未定</span>
                  )}
                </div>
                <h3 className={styles.cardName}>{store.name}</h3>
                <p className={styles.cardDesc}>{store.description}</p>
                <div className={styles.cardDays}>
                  出店日: {store.days.map(formatEventDate).join("・")}
                </div>
                {store.instagram && (
                  <Link
                    href={store.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardInstagram}
                    aria-label={`${store.name} の Instagram`}
                  >
                    <InstagramIcon size={10} />
                    Instagram
                  </Link>
                )}
              </div>
            </GlassCard>
            );
          })}
        </div>

        <div className={styles.cta}>
          <NeonButton href="/stores" variant="outline" size="lg">
            全店舗を見る →
          </NeonButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
