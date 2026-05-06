import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho_B1 } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientWrapper from "@/components/ui/ClientWrapper";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const shipporiMincho = Shippori_Mincho_B1({
  variable: "--font-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://yoruichi-chikugo.com";

export const metadata: Metadata = {
  title: {
    default: "第3回 土曜食いだおれ夜市 in 筑後",
    template: "%s | 土曜食いだおれ夜市 in 筑後",
  },
  description:
    "毎週土曜日、川の駅船小屋 恋ぼたるに約70店舗が集結！筑後の夏夜を彩る食の夜市。2026年7月〜8月開催。",
  keywords: ["夜市", "筑後", "屋台", "夏祭り", "食いだおれ", "川の駅船小屋", "恋ぼたる", "福岡"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "土曜食いだおれ夜市 in 筑後",
    title: "第3回 土曜食いだおれ夜市 in 筑後",
    description:
      "毎週土曜日、川の駅船小屋 恋ぼたるに約70店舗が集結！筑後の夏夜を彩る食の夜市。",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "第3回 土曜食いだおれ夜市 in 筑後",
    description: "毎週土曜日、川の駅船小屋 恋ぼたるに約70店舗が集結！",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${shipporiMincho.variable} ${styles.htmlRoot}`}>
      <body className={styles.body}>
        <ClientWrapper />
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
