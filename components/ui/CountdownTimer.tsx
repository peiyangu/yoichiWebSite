"use client";

import { useEffect, useState } from "react";
import { getEventPhase, formatEventDate, EVENT_TIME, type EventPhase } from "@/data/events";
import styles from "./CountdownTimer.module.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [phase, setPhase] = useState<EventPhase | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => {
      const p = getEventPhase();
      setPhase(p);
      setTimeLeft(p.phase === "upcoming" ? calcTimeLeft(p.target) : null);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!phase || phase.phase === "ended") return null;

  if (phase.phase === "live") {
    return (
      <div className={styles.wrapper}>
        <div className={styles.liveBadge}>
          <span className={styles.liveDot} />
          本日 {EVENT_TIME} 開催中！
        </div>
      </div>
    );
  }

  if (!timeLeft) return null;

  const units = [
    { label: "日", value: timeLeft.days },
    { label: "時間", value: timeLeft.hours },
    { label: "分", value: timeLeft.minutes },
    { label: "秒", value: timeLeft.seconds },
  ];

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>
        {formatEventDate(phase.date)} 17:00 開催まで
      </p>
      <div className={styles.units}>
        {units.map(({ label, value }, i) => (
          <div key={label} className={styles.unitGroup}>
            <div className={styles.unit}>
              <span className={`${styles.number} glow-gold`}>
                {String(value).padStart(2, "0")}
              </span>
              <span className={styles.unitLabel}>{label}</span>
            </div>
            {i < units.length - 1 && (
              <span className={styles.colon}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
