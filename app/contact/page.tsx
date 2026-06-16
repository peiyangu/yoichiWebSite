import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import NeonButton from "@/components/ui/NeonButton";
import { Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { CONTACT } from "@/data/events";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "土曜食いだおれ夜市 in 筑後へのお問い合わせ。出店・取材・その他のご相談はメール・Instagram DM・お電話にて承ります。",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "お問い合わせ | 土曜食いだおれ夜市 in 筑後",
    description:
      "出店・取材・その他のご相談はメール・Instagram DM・お電話にて承ります。",
    url: "/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "メール",
    subtitle: "24時間受付",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    label: "メールを送る",
    variant: "outline" as const,
    neonColor: "gold" as const,
    note: null,
  },
  {
    icon: InstagramIcon,
    title: "Instagram DM",
    subtitle: "気軽にメッセージを",
    value: "@kuidaoreyoichi_chikugo",
    href: CONTACT.instagram,
    label: "DM を送る",
    variant: "pink" as const,
    neonColor: "pink" as const,
    note: null,
  },
  {
    icon: Phone,
    title: "電話",
    subtitle: `${CONTACT.shopName}`,
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone}`,
    label: "電話をかける",
    variant: "gold" as const,
    neonColor: "gold" as const,
    note: `営業時間 ${CONTACT.hours}`,
  },
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <SectionWrapper className={styles.inner}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <MessageCircle size={14} />
            Contact
          </span>
          <h1 className={styles.title}>
            お<span className={styles.titleAccent}>問い合わせ</span>
          </h1>
          <p className={styles.desc}>
            出店・取材・その他のご相談はお気軽にご連絡ください。できる限り迅速にご返信いたします。
          </p>
        </div>

        {/* 連絡先カード */}
        <div className={styles.cardsGrid}>
          {CONTACT_METHODS.map(
            ({ icon: Icon, title, subtitle, value, href, label, variant, neonColor, note }) => (
              <GlassCard
                key={title}
                neonColor={neonColor}
                className={styles.card}
              >
                <div className={`${styles.iconWrapper} ${neonColor === "pink" ? styles.iconPink : styles.iconGold}`}>
                  <Icon size={28} />
                </div>

                <div>
                  <p className={styles.cardTitle}>{title}</p>
                  <p className={styles.cardSubtitle}>{subtitle}</p>
                </div>

                <NeonButton
                  href={href}
                  variant={variant}
                  size="sm"
                  className="w-full"
                  external={href.startsWith("http")}
                  aria-label={`${title}で問い合わせる`}
                >
                  {label}
                </NeonButton>

                <p className={styles.cardValue}>{value}</p>

                {note && (
                  <div className={styles.cardNote}>
                    <Clock size={10} />
                    {note}
                  </div>
                )}
              </GlassCard>
            )
          )}
        </div>

        {/* 補足 */}
        <GlassCard className={styles.note}>
          <p className={styles.noteText}>
            お急ぎの場合は電話にてお問い合わせください。<br />
            <span className={styles.titleAccent}>{CONTACT.shopName}</span> 営業時間内（{CONTACT.hours}）にご連絡いただけると幸いです。
          </p>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
