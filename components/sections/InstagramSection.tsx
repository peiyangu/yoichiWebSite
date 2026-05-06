"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NeonButton from "@/components/ui/NeonButton";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Camera, Heart, MessageCircle } from "lucide-react";
import styles from "./InstagramSection.module.css";

const INSTAGRAM_URL = "https://www.instagram.com/kuidaoreyoichi_chikugo/";
const ACCOUNT_NAME = "@kuidaoreyoichi_chikugo";

const POST_EMOJIS = ["🏮", "🎆", "🍜", "🎇", "🎉", "🌙"];

export default function InstagramSection() {
  return (
    <SectionWrapper id="instagram" className={styles.section}>
      <div className={styles.inner}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <InstagramIcon size={12} />
            Instagram
          </span>
          <h2 className={styles.title}>
            公式<span className={`${styles.titleAccent} glow-pink`}>インスタグラム</span>
          </h2>
          <span className="section-heading-line text-[#FF2D9E]" />
          <p className={styles.desc}>
            最新情報・出店情報・当日の様子はインスタグラムでチェック！
          </p>
        </div>

        {/* プロフィールカード */}
        <div className={styles.profileCard}>
          {/* プロフィールヘッダー */}
          <div className={styles.profileHeader}>
            <div className={styles.avatarRing}>
              <div className={styles.avatarInner}>
                <span className="text-2xl">🏮</span>
              </div>
            </div>
            <div>
              <p className={styles.accountName}>土曜食いだおれ夜市 in 筑後</p>
              <p className={styles.accountHandle}>{ACCOUNT_NAME}</p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.followBtn}
              aria-label="Instagram でフォロー"
            >
              フォロー
            </a>
          </div>

          {/* 投稿グリッド */}
          <div className={styles.postGrid}>
            {POST_EMOJIS.map((emoji, i) => (
              <motion.a
                key={i}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.postItem}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                aria-label="Instagram の投稿を見る"
              >
                <span className={styles.postEmoji}>{emoji}</span>
                <div className={styles.postOverlay}>
                  <span className={styles.postStat}>
                    <Heart size={13} fill="white" /> {Math.floor(Math.random() * 80 + 20)}
                  </span>
                  <span className={styles.postStat}>
                    <MessageCircle size={13} fill="white" /> {Math.floor(Math.random() * 15 + 2)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* フッター */}
          <div className={styles.profileFooter}>
            <Camera size={14} className="text-white/30" />
            <p className={styles.profileFooterText}>続きは Instagram でチェック →</p>
          </div>
        </div>

        <div className={styles.cta}>
          <NeonButton
            href={INSTAGRAM_URL}
            variant="pink"
            size="lg"
            external
            aria-label="公式 Instagram をフォロー"
          >
            <InstagramIcon size={18} />
            フォローして最新情報をチェック
          </NeonButton>
        </div>
      </div>
    </SectionWrapper>
  );
}

