import type { Metadata } from "next";
import GalleryPageContent from "@/components/sections/GallerySection";

export const metadata: Metadata = {
  title: "イベント風景 | 土曜食いだおれ夜市 in 筑後",
  description:
    "過去の「土曜食いだおれ夜市 in 筑後」の開催風景をギャラリーでご覧いただけます。活気あふれる夜市の様子をお楽しみください。",
  openGraph: {
    title: "イベント風景 | 土曜食いだおれ夜市 in 筑後",
    description: "過去のイベント開催の様子をギャラリーでご紹介",
  },
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
