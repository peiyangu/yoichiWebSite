import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import NeonButton from "@/components/ui/NeonButton";
import { MapPin, Navigation, Map as MapIcon } from "lucide-react";
import { VENUE } from "@/data/events";
import styles from "./VenueSection.module.css";

export default function VenueSection() {
  return (
    <SectionWrapper id="venue" className={styles.section}>
      <div className={styles.inner}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Venue</span>
          <h2 className={styles.title}>
            開催<span className={styles.titleAccent}>会場</span>
          </h2>
          <span className="section-heading-line text-[#F5A623]" />
        </div>

        <div className={styles.grid}>
          {/* 地図 */}
          <div className={styles.mapWrapper}>
            <iframe
              src={VENUE.mapUrl}
              className={styles.mapIframe}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="開催会場の地図"
              aria-label="川の駅船小屋 恋ぼたるの地図"
            />
          </div>

          {/* 情報 */}
          <GlassCard className={styles.infoCard}>
            <div className={styles.venueHeader}>
              <div className={styles.venueIcon}>
                <MapPin size={22} className="text-[#F5A623]" />
              </div>
              <div>
                <h3 className={styles.venueName}>{VENUE.name}</h3>
                <p className={styles.venueAddress}>{VENUE.address}</p>
              </div>
            </div>

            <div className={styles.infoList}>
              <div className={styles.infoBlock}>
                <p className={styles.infoBlockTitle}>アクセス</p>
                <ul className={styles.infoBlockList}>
                  <li className={styles.infoBlockItem}>• 九州新幹線「筑後船小屋駅」より徒歩すぐ</li>
                  <li className={styles.infoBlockItem}>• 駐車場あり（無料）</li>
                </ul>
              </div>
              <div className={styles.infoBlock}>
                <p className={styles.infoBlockTitle}>注意事項</p>
                <ul className={styles.infoBlockList}>
                  <li className={styles.infoBlockItem}>• 雨天時は一部変更になる場合があります</li>
                  <li className={styles.infoBlockItem}>• ゴミは各自でお持ち帰りください</li>
                  <li className={styles.infoBlockItem}>• 未成年への飲酒提供は行いません</li>
                </ul>
              </div>
            </div>

            <div className={styles.venueButtonRow}>
              <NeonButton
                href="#venue-map"
                variant="gold"
                size="md"
                aria-label="会場マップを見る"
                className="w-full"
              >
                <MapIcon size={16} />
                会場マップを見る
              </NeonButton>
              <NeonButton
                href={VENUE.googleMapsLink}
                variant="outline"
                size="md"
                external
                aria-label="Google マップで開く"
                className="w-full"
              >
                <Navigation size={16} />
                Google マップで開く
              </NeonButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
}
