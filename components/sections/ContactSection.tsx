import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import NeonButton from "@/components/ui/NeonButton";
import { Mail, Phone, Clock } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { CONTACT } from "@/data/events";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Contact</span>
          <h2 className={styles.title}>
            お<span className={styles.titleAccent}>問い合わせ</span>
          </h2>
          <span className="section-heading-line text-[#F5A623]" />
          <p className={styles.desc}>
            出店・取材・その他のお問い合わせはお気軽にどうぞ。
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {/* メール */}
          <GlassCard className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.iconGold}`}>
              <Mail size={26} className="text-[#F5A623]" />
            </div>
            <div>
              <p className={styles.cardTitle}>メール</p>
              <p className={styles.cardSubtitle}>24時間受付</p>
            </div>
            <NeonButton
              href={`mailto:${CONTACT.email}`}
              variant="outline"
              size="sm"
              className="w-full text-xs"
              aria-label="メールでお問い合わせ"
            >
              メールを送る
            </NeonButton>
            <p className={styles.cardValue}>{CONTACT.email}</p>
          </GlassCard>

          {/* Instagram */}
          <GlassCard neonColor="pink" className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.iconPink}`}>
              <InstagramIcon size={26} className="text-[#FF2D9E]" />
            </div>
            <div>
              <p className={styles.cardTitle}>Instagram DM</p>
              <p className={styles.cardSubtitle}>気軽にメッセージを</p>
            </div>
            <NeonButton
              href={CONTACT.instagram}
              variant="pink"
              size="sm"
              external
              className="w-full text-xs"
              aria-label="Instagram DM でお問い合わせ"
            >
              DM を送る
            </NeonButton>
            <p className={styles.cardValue}>@kuidaoreyoichi_chikugo</p>
          </GlassCard>

          {/* 電話 */}
          <GlassCard className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.iconGold}`}>
              <Phone size={26} className="text-[#F5A623]" />
            </div>
            <div>
              <p className={styles.cardTitle}>電話</p>
              <p className={styles.cardSubtitle}>お急ぎの方はこちら</p>
              <p className={styles.cardNote}>{CONTACT.shopName}</p>
            </div>
            <NeonButton
              href={`tel:${CONTACT.phone}`}
              variant="gold"
              size="sm"
              className="w-full text-xs"
              aria-label="電話でお問い合わせ"
            >
              電話をかける
            </NeonButton>
            <div className={styles.cardValue}>
              <Clock size={10} />
              <span>営業時間 {CONTACT.hours}</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
}
