"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/#overview", label: "開催概要" },
  { href: "/#stores", label: "出店情報" },
  { href: "/#venue", label: "会場" },
  { href: "/venue-map", label: "会場マップ" },
  { href: "/stores", label: "店舗一覧" },
  { href: "/gallery", label: "イベント風景" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? `${styles.headerScrolled} glass` : ""}`}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="ホームへ">
          <span className={styles.logoSub}>土曜食いだおれ</span>
          <span className={styles.logoMain}>夜市 in 筑後</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="メインナビゲーション">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`${styles.mobileMenu} glass`}
          >
            <nav className={styles.mobileNav} aria-label="モバイルナビゲーション">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
