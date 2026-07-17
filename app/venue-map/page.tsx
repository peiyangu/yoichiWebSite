import type { Metadata } from "next";
import VenueMapSection from "@/components/sections/VenueMapSection";

export const metadata: Metadata = {
  title: "会場マップ",
  description:
    "土曜食いだおれ夜市 in 筑後の会場マップ。番号をタップすると該当する店舗情報を表示します。",
  alternates: {
    canonical: "/venue-map",
  },
  openGraph: {
    title: "会場マップ | 土曜食いだおれ夜市 in 筑後",
    description:
      "土曜食いだおれ夜市 in 筑後の会場マップ。番号をタップすると該当する店舗情報を表示します。",
    url: "/venue-map",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function VenueMapPage() {
  return <VenueMapSection />;
}
