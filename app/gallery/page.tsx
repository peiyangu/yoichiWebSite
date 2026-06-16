import type { Metadata } from "next";
import GalleryPageContent from "@/components/sections/GallerySection";

export const metadata: Metadata = {
  title: "イベント風景",
  description:
    "過去の「土曜食いだおれ夜市 in 筑後」の開催風景をギャラリーでご覧いただけます。活気あふれる夜市の様子をお楽しみください。",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "イベント風景 | 土曜食いだおれ夜市 in 筑後",
    description: "過去のイベント開催の様子をギャラリーでご紹介",
    url: "/gallery",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
