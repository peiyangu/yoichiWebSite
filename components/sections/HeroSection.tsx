"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import NeonButton from "@/components/ui/NeonButton";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { EVENT_DATES, EVENT_TIME, VENUE } from "@/data/events";
import styles from "./HeroSection.module.css";

const FireworksCanvas = dynamic(() => import("@/components/ui/FireworksCanvas"), { ssr: false });

function Lantern({ delay = 0, x = 0 }: { delay?: number; x?: number }) {
  return (
    <motion.div
      className={styles.lanternItem}
      style={{ left: `${x}%`, top: 0 }}
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2.5 + delay * 0.3, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <div className={styles.lanternInner}>
        <div className={styles.lanternThread} />
        <div className={styles.lanternBody}>
          <div className={styles.lanternSheen} />
          <span className={styles.lanternText}>夜市</span>
          <motion.div
            className={styles.lanternGlow}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay }}
          />
        </div>
        <div className={styles.lanternTail} />
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const isTodayEvent = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return (EVENT_DATES as readonly string[]).includes(today);
  }, []);

  return (
    <section className={styles.section} aria-label="main visual">
      {/* background */}
      <div className={styles.bgWrapper}>
        <div className={styles.bgBase} />
        <div className={styles.bgImage} />
        <div className={styles.bgGradient1} />
        <div className={styles.bgGradient2} />
        <div className={styles.bgFade} />
      </div>

      {/* lantern string */}
      <div className={styles.lanternRow} aria-hidden="true">
        <svg className={styles.lanternSvg} preserveAspectRatio="none">
          <motion.path
            d="M 0 20 Q 100 28, 200 20 T 400 20 T 600 20 T 800 20 T 1000 20 T 1200 20"
            stroke="#fef3c7"
            strokeWidth="1.5"
            fill="none"
            strokeOpacity="0.35"
            animate={{
              d: [
                "M 0 20 Q 100 28, 200 20 T 400 20 T 600 20 T 800 20 T 1000 20 T 1200 20",
                "M 0 20 Q 100 13, 200 20 T 400 20 T 600 20 T 800 20 T 1000 20 T 1200 20",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
        {[7, 20, 33, 47, 61, 74, 88].map((x, i) => (
          <Lantern key={i} x={x} delay={i * 0.35} />
        ))}
      </div>

      <FireworksCanvas />

      {/* main content */}
      <div className={styles.content}>
        {isTodayEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.todayBadge}
          >
            <span className={styles.todayBadgeDot} />
            本日 {EVENT_TIME} 開催中！
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.eyebrowRow}
        >
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>第 3 回 開催決定</span>
          <span className={styles.eyebrowLine} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleSub}>食いだおれ</span>
            <span className={styles.heroTitleMain}>夜市</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={styles.locationRow}
        >
          <span className={styles.locationLine} />
          <span className={styles.locationText}>in 筑後</span>
          <span className={styles.locationLine} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className={styles.badgeWrap}
        >
          <motion.div
            className={styles.badge}
            animate={{
              boxShadow: [
                "0 0 18px rgba(220,38,38,0.5)",
                "0 0 36px rgba(220,38,38,0.85)",
                "0 0 18px rgba(220,38,38,0.5)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <motion.div
              className={styles.badgeSheen}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
            />
            <span className={styles.badgeText}>毎週土曜日 17:00 ～ 21:00 開催</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className={styles.countdownWrap}
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className={styles.ctaRow}
        >
          <NeonButton href="/stores" size="lg" variant="gold">
            出店情報を見る
          </NeonButton>
          <NeonButton
            href="https://www.instagram.com/kuidaoreyoichi_chikugo/"
            size="lg"
            variant="pink"
            external
            aria-label="official Instagram"
          >
            Instagram をフォロー
          </NeonButton>
        </motion.div>
      </div>

      {/* event info bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className={styles.infoBar}
      >
        <div className={styles.infoBarInner}>
          <div className={styles.infoBarItems}>
            <span className={styles.infoBarLabel}>開催情報</span>
            <span className={styles.infoBarDivider}>|</span>
            <span>
              {EVENT_DATES[0].replace(/-/g, ".").slice(5)} - {EVENT_DATES[EVENT_DATES.length - 1].replace(/-/g, ".").slice(5)}
            </span>
            <span className={styles.infoBarDivider}>|</span>
            <span>毎週土曜日 {EVENT_TIME}</span>
            <span className={styles.infoBarDivider}>|</span>
            <span>{VENUE.name}</span>
          </div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={styles.scrollIndicator}
        aria-hidden="true"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
