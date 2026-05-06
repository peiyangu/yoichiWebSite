"use client";

import { useEffect } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NeonButton from "@/components/ui/NeonButton";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import styles from "./InstagramSection.module.css";

const INSTAGRAM_URL = "https://www.instagram.com/kuidaoreyoichi_chikugo/";
const POST_URL = "https://www.instagram.com/p/DXtX8V0kyg_/";

export default function InstagramSection() {
  useEffect(() => {
    // Instagram 埋め込みスクリプトを動的に読み込む
    if (typeof window !== "undefined") {
      const existingScript = document.getElementById("instagram-embed-script");
      if (existingScript) {
        // すでにロード済みの場合は再処理を要求
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).instgrm?.Embeds?.process();
      } else {
        const script = document.createElement("script");
        script.id = "instagram-embed-script";
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

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

        {/* Instagram 埋め込み */}
        <div className={styles.embedWrapper}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={POST_URL}
            data-instgrm-version="14"
            style={{ margin: "0 auto", maxWidth: 540, width: "100%" }}
          />
        </div>

        <div className={styles.cta}>
          <NeonButton
            href={INSTAGRAM_URL}
            variant="pink"
            size="lg"
            external
            aria-label="公式 Instagram をフォロー"
            className="w-full sm:w-auto"
          >
            <InstagramIcon size={18} />
            フォローして最新情報をチェック
          </NeonButton>
        </div>
      </div>
    </SectionWrapper>
  );
}

