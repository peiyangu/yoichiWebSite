"use client";

import { useEffect, useState } from "react";
import { getNextEventDate, formatEventDate } from "@/data/events";
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
  const nextDate = getNextEventDate();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (!nextDate) return;
    const target = new Date(`${nextDate}T17:00:00`);
    setTimeLeft(calcTimeLeft(target));
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [nextDate]);

  if (!nextDate || !timeLeft) return null;

  const units = [
    { label: "日", value: timeLeft.days },
    { label: "時間", value: timeLeft.hours },
    { label: "分", value: timeLeft.minutes },
    { label: "秒", value: timeLeft.seconds },
  ];

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>
        Next Event — {formatEventDate(nextDate)} まで
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
