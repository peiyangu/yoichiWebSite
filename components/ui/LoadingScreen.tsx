"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

function Lantern({ x, delay }: { x: number; delay: number }) {
  return (
    <motion.div
      className={styles.lanternItem}
      style={{ left: `${x}%` }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <div className={styles.lanternInner}>
        <div className={styles.lanternThread} />
        <div className={styles.lanternBody}>
          <div className={styles.lanternSheen} />
          <span className={styles.lanternText}>夜市</span>
          <motion.div
            className={styles.lanternGlow}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.8, repeat: Infinity, delay }}
          />
        </div>
        <div className={styles.lanternTail} />
      </div>
    </motion.div>
  );
}

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // enter 0.6s → hold 1.4s → exit 0.6s
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 2000);
    const t3 = setTimeout(() => onComplete(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      {/* stars bg */}
      <div className={styles.starsBg} aria-hidden="true">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              width: `${1 + (i % 3) * 0.7}px`,
              height: `${1 + (i % 3) * 0.7}px`,
              top: `${(i * 137.5) % 100}%`,
              left: `${(i * 97.3) % 100}%`,
              opacity: 0.15 + (i % 5) * 0.1,
            }}
          />
        ))}
      </div>

      {/* radial glow */}
      <div className={styles.radialGlow} />

      {/* logo area */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={styles.content}
      >
        {/* logo image or text fallback */}
        <LogoDisplay />

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.subtitle}
        >
          KUIDAORE YOICHI IN CHIKUGO
        </motion.p>

        {/* loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={styles.dots}
          aria-label="読み込み中"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={styles.dot}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* lanterns row */}
      <div className={styles.lanternsRow} aria-hidden="true">
        {[15, 35, 50, 65, 85].map((x, i) => (
          <Lantern key={i} x={x} delay={i * 0.3} />
        ))}
      </div>

      {/* SVG lantern string */}
      <svg
        className={styles.lanternString}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 0 16 Q 100 22, 200 16 T 400 16 T 600 16 T 800 16 T 1000 16 T 1200 16"
          stroke="#fef3c7"
          strokeWidth="1"
          fill="none"
          strokeOpacity="0.25"
          animate={{
            d: [
              "M 0 16 Q 100 22, 200 16 T 400 16 T 600 16 T 800 16 T 1000 16 T 1200 16",
              "M 0 16 Q 100 10, 200 16 T 400 16 T 600 16 T 800 16 T 1000 16 T 1200 16",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    </motion.div>
  );
}

function LogoDisplay() {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logo.png"
        alt="夜市 in 筑後 ロゴ"
        className={styles.logoImg}
        onError={() => setImgError(true)}
      />
    );
  }

  // テキストロゴ（フォールバック）
  return (
    <div className={styles.logoText}>
      <span className={styles.logoSubText}>食いだおれ</span>
      <span className={styles.logoMainText}>夜市</span>
      <span className={styles.logoLocation}>in 筑後</span>
    </div>
  );
}
