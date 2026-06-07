"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import NeonButton from "@/components/ui/NeonButton";
import styles from "./GallerySection.module.css";

const PHOTO_FILES = [
  "DSC_1070.JPG",
  "DSC_1204.JPG",
  "DSC_1287.JPG",
  "DSC_1337.JPG",
  "DSC_1342.JPG",
  "DSC_1346.JPG",
  "DSC_1365.JPG",
  "DSC_1367.JPG",
  "DSC_1403.JPG",
  "DSC_1409.JPG",
  "DSC_1465.JPG",
  "DSC_1469.JPG",
  "DSC_1859.JPG",
  "DSC_1896.JPG",
] as const;

const GALLERY_ITEMS = PHOTO_FILES.map((file, i) => ({
  id: i,
  src: `/oldEventPicture/${file}`,
  alt: `過去のイベント写真 ${i + 1}`,
}));

interface LightboxProps {
  items: typeof GALLERY_ITEMS;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index];
  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose} aria-label="閉じる">
        <X size={22} />
      </button>
      <button
        className={styles.lightboxPrev}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="前の写真"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className={styles.lightboxNext}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="次の写真"
      >
        <ChevronRight size={24} />
      </button>

      <div key={item.id} className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.lightboxImage}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className={styles.lightboxImg}
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
        <p className={styles.lightboxCounter}>
          {index + 1} / {items.length}
        </p>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevItem = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null,
    );
  const nextItem = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % GALLERY_ITEMS.length : null));

  return (
    <div className={styles.pageWrapper}>
      <SectionWrapper className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.headerIcon} aria-hidden="true">
              <div className={styles.iconBox}>
                <Images size={32} className="text-[#F5A623]" />
              </div>
            </div>
            <span className={styles.eyebrow}>Gallery</span>
            <h1 className={styles.title}>
              過去の<span className={styles.titleAccent}>イベント風景</span>
            </h1>
            <p className={styles.desc}>夜市の活気あふれる瞬間をご覧ください</p>
          </div>

          <div className={styles.photoGrid}>
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                className={styles.photoCard}
                onClick={() => openLightbox(idx)}
                aria-label={`写真 ${idx + 1} を拡大表示`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={styles.photoImg}
                  loading={idx === 0 ? "eager" : "lazy"}
                  priority={idx === 0}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className={styles.photoOverlay} />
              </button>
            ))}
          </div>

          <div className={styles.bottomCta}>
            <p className={styles.bottomCtaText}>最新の様子はインスタグラムでも随時更新中！</p>
            <NeonButton
              href="https://www.instagram.com/kuidaoreyoichi_chikugo/"
              variant="pink"
              size="lg"
              external
              aria-label="Instagram でイベント写真を見る"
            >
              Instagram でもっと見る
            </NeonButton>
          </div>
        </div>
      </SectionWrapper>

      {lightboxIndex !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </div>
  );
}
