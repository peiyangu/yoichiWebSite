import { ReactNode } from "react";
import styles from "./GlassCard.module.css";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  neonColor?: "gold" | "pink" | "none";
}

export default function GlassCard({
  children,
  className = "",
  neonColor = "gold",
}: GlassCardProps) {
  const borderClass =
    neonColor === "gold"
      ? styles.borderGold
      : neonColor === "pink"
        ? styles.borderPink
        : styles.borderNone;

  return (
    <div className={`glass ${styles.card} ${borderClass} ${className}`}>
      {children}
    </div>
  );
}
