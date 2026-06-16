import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { Bell } from "lucide-react";
import { NEWS } from "@/data/news";
import styles from "./NewsSection.module.css";

export default function NewsSection() {
  return (
    <SectionWrapper id="news" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <Bell size={12} />
            News
          </span>
          <h2 className={styles.title}>
            お<span className={styles.titleAccent}>知らせ</span>
          </h2>
          <span className="section-heading-line text-[#F5A623]" />
        </div>

        <div className={styles.list}>
          {NEWS.map((item) => (
            <GlassCard key={item.id} className={styles.card}>
              <div className={styles.meta}>
                <span className={styles.date}>{item.date}</span>
                <span className={styles.tag}>{item.tag}</span>
              </div>
              <h3 className={styles.newsTitle}>{item.title}</h3>
              <p className={styles.newsBody}>{item.body}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
