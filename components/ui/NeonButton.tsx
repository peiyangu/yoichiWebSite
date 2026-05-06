"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./NeonButton.module.css";

interface NeonButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "pink" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  "aria-label"?: string;
}

const sizeMap: Record<string, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const variantMap: Record<string, string> = {
  gold: `${styles.gold} glow-box-gold`,
  pink: `${styles.pink} glow-box-pink`,
  outline: `${styles.outline} glow-box-gold`,
};

export default function NeonButton({
  children,
  href,
  onClick,
  variant = "gold",
  size = "md",
  className = "",
  external = false,
  "aria-label": ariaLabel,
}: NeonButtonProps) {
  const baseClass = [styles.base, sizeMap[size], variantMap[variant], className]
    .filter(Boolean)
    .join(" ");

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={baseClass}
          aria-label={ariaLabel}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      className={baseClass}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
