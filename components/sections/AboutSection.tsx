import { Utensils, Users, Sparkles, Heart } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import styles from "./AboutSection.module.css";

const POINTS = [
  {
    icon: Utensils,
    title: "約70店舗が集結",
    desc: "和食・洋食・アジア料理・スイーツ・ドリンクまで、毎週メンバーが入れ替わるバラエティ豊かな出店陣。何度来ても飽きない！",
    color: "#F5A623",
  },
  {
    icon: Users,
    title: "入場無料・誰でもウェルカム",
    desc: "入場料は一切かかりません。ご家族・友人・カップル・おひとりさままで、どなたでもお気軽にどうぞ。",
    color: "#FF2D9E",
  },
  {
    icon: Sparkles,
    title: "夏の夜を彩る非日常",
    desc: "夕暮れどきに始まり、夜風とともに盛り上がる4時間。屋台の灯り、人の笑顔、食のにぎわいが筑後の夜を特別な場所に変えます。",
    color: "#F5A623",
  },
  {
    icon: Heart,
    title: "地域の食文化をつなぐ場",
    desc: "地元の飲食店・農家・クラフト作家など、筑後エリアの魅力を一か所で体験できる、地域密着型の夜市です。",
    color: "#FF2D9E",
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>About</span>
          <h2 className={styles.title}>
            くいだおれ夜市<span className={`${styles.titleAccent} glow-gold`}>とは</span>
          </h2>
          <span className="section-heading-line text-[#F5A623]" />
          <p className={styles.lead}>
            「土曜食いだおれ夜市 in 筑後」は、福岡県筑後市の
            <span className={styles.leadAccent}>川の駅船小屋 恋ぼたる</span>
            で毎週土曜日の夕方に開催される屋台イベントです。
            <br />
            食・飲み・笑いが詰まった夏の夜をぜひ体験してください。
          </p>
        </div>

        <div className={styles.grid}>
          {POINTS.map(({ icon: Icon, title, desc, color }) => (
            <GlassCard key={title} className={styles.card}>
              <div className={styles.iconWrap} style={{ background: `${color}22` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className={styles.cardTitle} style={{ color }}>
                {title}
              </h3>
              <p className={styles.cardDesc}>{desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className={styles.catchWrap}>
          <p className={styles.catch}>
            <span className={styles.catchAccent}>食いだおれ</span>ようぜ、筑後の夏夜。
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
