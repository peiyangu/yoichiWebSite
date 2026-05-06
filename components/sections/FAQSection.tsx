"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ChevronDown } from "lucide-react";
import styles from "./FAQSection.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "入場料はかかりますか？",
    answer: "入場は無料です。各店舗での飲食代金のみご負担ください。",
  },
  {
    question: "雨天の場合はどうなりますか？",
    answer:
      "小雨の場合は開催します。天候が悪化した場合は公式 Instagram にてお知らせします。",
  },
  {
    question: "駐車場はありますか？",
    answer:
      "川の駅船小屋 恋ぼたるに無料駐車場がございます。混雑時は近隣の駐車場もご利用ください。",
  },
  {
    question: "ペット同伴は可能ですか？",
    answer: "リードをつけた状態であればご同伴いただけます。他のお客様へのご配慮をお願いします。",
  },
  {
    question: "出店したいのですがどこに連絡すればいいですか？",
    answer:
      "公式 Instagram の DM またはメール（baobabcoffee.001@gmail.com）にてお問い合わせください。",
  },
  {
    question: "お酒チケットとは何ですか？",
    answer:
      "一部のお酒が通常よりお得になる限定チケットです。当日会場にて販売します。詳細は Instagram をご確認ください。",
  },
];

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <button
        onClick={() => setOpen(!open)}
        className={styles.accordionButton}
        aria-expanded={open}
      >
        <div className={styles.questionRow}>
          <span className={styles.questionNum}>Q{index + 1}</span>
          <span className={styles.questionText}>{item.question}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={styles.chevron}
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.answerWrapper}
          >
            <p className={styles.answerText}>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <SectionWrapper id="faq" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2 className={styles.title}>
            よくある<span className={styles.titleAccent}>質問</span>
          </h2>
          <span className="section-heading-line text-[#F5A623]" />
        </div>

        <div className={`${styles.list} glass`}>
          {FAQ_ITEMS.map((item, i) => (
            <FAQAccordion key={item.question} item={item} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
