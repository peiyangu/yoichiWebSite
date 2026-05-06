import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { CONTACT, EVENT_DATES, formatEventDate } from "@/data/events";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand */}
          <div>
            <h2 className={`${styles.brandTitle} glow-gold`}>土曜食いだおれ夜市</h2>
            <p className={styles.brandDesc}>
              毎週土曜日、筑後の夜に約70店舗が集結する食の夜市。川の駅船小屋 恋ぼたるで開催！
            </p>
          </div>

          {/* Dates */}
          <div>
            <h3 className={styles.colHeading}>開催日程</h3>
            <ul className={styles.dateList}>
              {EVENT_DATES.map((d) => (
                <li key={d} className={styles.dateItem}>{formatEventDate(d)}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={styles.colHeading}>お問い合わせ</h3>
            <ul className={styles.contactList}>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className={styles.contactLinkGold}
                  aria-label="メールでお問い合わせ"
                >
                  <Mail size={14} />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLinkPink}
                  aria-label="Instagram でお問い合わせ"
                >
                  <InstagramIcon size={14} />
                  Instagram DM
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className={styles.contactLinkGold}
                  aria-label="電話でお問い合わせ"
                >
                  <Phone size={14} />
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 土曜食いだおれ夜市 in 筑後. All rights reserved.
          </p>
          <Link
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramLink}
            aria-label="公式 Instagram"
          >
            <InstagramIcon size={14} />
            @kuidaoreyoichi_chikugo
          </Link>
        </div>
      </div>
    </footer>
  );
}
