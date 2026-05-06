import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { Calendar, Clock, Store, Ticket, MapPin } from "lucide-react";
import { EVENT_DATES, EVENT_TIME, STORE_COUNT, formatEventDate, VENUE } from "@/data/events";
import styles from "./OverviewSection.module.css";

const features = [
  {
    icon: Calendar,
    title: "全6日間開催",
    desc: `7月18日〜8月29日の毎週土曜日、計6回開催。`,
  },
  {
    icon: Clock,
    title: EVENT_TIME,
    desc: "夕暮れから夜市の始まり。夏の夜風とともに楽しむ4時間。",
  },
  {
    icon: Store,
    title: `約${STORE_COUNT}店舗出店`,
    desc: "毎週メンバーが入れ替わり！何度来ても新しい発見がある。",
  },
  {
    icon: Ticket,
    title: "お得チケット販売",
    desc: "お酒がお得になる限定チケットを販売。仲間とワイワイ楽しもう！",
  },
];

export default function OverviewSection() {
  return (
    <SectionWrapper id="overview" className={styles.section}>
      <div className={styles.inner}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Event Overview</span>
          <h2 className={styles.title}>
            開催<span className={styles.titleAccent}>概要</span>
          </h2>
          <span className="section-heading-line text-[#F5A623]" />
          <p className={styles.desc}>
            筑後に毎週土曜夜市が帰ってくる！食・飲み・笑い、夏の全部が詰まった夜をあなたと。
          </p>
        </div>

        {/* 特徴カード */}
        <div className={styles.featureGrid}>
          {features.map(({ icon: Icon, title, desc }) => (
            <GlassCard key={title} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon size={22} className="text-[#F5A623]" />
              </div>
              <div>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDesc}>{desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* 日程一覧 */}
        <GlassCard className={styles.datesCard}>
          <div className={styles.datesHeader}>
            <Calendar size={18} className="text-[#F5A623]" />
            <h3 className={styles.datesTitle}>開催日程</h3>
          </div>
          <div className={styles.datesGrid}>
            {EVENT_DATES.map((d, i) => (
              <div key={d} className={styles.dateItem}>
                <span className={styles.dateNum}>{i + 1}</span>
                <span className={styles.dateText}>{formatEventDate(d)}</span>
              </div>
            ))}
          </div>
          <div className={styles.venue}>
            <MapPin size={12} />
            <span>{VENUE.name}｜{VENUE.address}</span>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}
