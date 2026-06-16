import type { Metadata } from "next";
import StoreListSection from "@/components/sections/StoreListSection";

export const metadata: Metadata = {
  title: "出店店舗一覧",
  description:
    "土曜食いだおれ夜市 in 筑後の出店店舗一覧。和食・洋食・アジア料理・スイーツ・ドリンクなど約70店舗が集結！",
  alternates: {
    canonical: "/stores",
  },
  openGraph: {
    title: "出店店舗一覧 | 土曜食いだおれ夜市 in 筑後",
    description:
      "土曜食いだおれ夜市 in 筑後の出店店舗一覧。和食・洋食・アジア料理・スイーツ・ドリンクなど約70店舗が集結！",
    url: "/stores",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function StoresPage() {
  return <StoreListSection />;
}
