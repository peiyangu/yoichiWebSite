import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import OverviewSection from "@/components/sections/OverviewSection";
import StoresSection from "@/components/sections/StoresSection";
import VenueSection from "@/components/sections/VenueSection";
import VenueMapSection from "@/components/sections/VenueMapSection";
import InstagramSection from "@/components/sections/InstagramSection";
import NewsSection from "@/components/sections/NewsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { EVENT_DATES, VENUE, CONTACT } from "@/data/events";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kuidaoreyoichi.com";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "第3回 土曜食いだおれ夜市 in 筑後",
  description:
    "毎週土曜日、川の駅船小屋 恋ぼたるに約70店舗が集結！筑後の夏夜を彩る食の夜市。2026年7月〜8月開催。",
  url: BASE_URL,
  image: `${BASE_URL}/og-image.jpg`,
  organizer: {
    "@type": "Organization",
    name: "バオバブコーヒー",
    email: CONTACT.email,
  },
  location: {
    "@type": "Place",
    name: VENUE.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "尾島298-2",
      addressLocality: "筑後市",
      addressRegion: "福岡県",
      postalCode: "833-0014",
      addressCountry: "JP",
    },
  },
  subEvent: EVENT_DATES.map((dateStr) => ({
    "@type": "Event",
    name: "第3回 土曜食いだおれ夜市 in 筑後",
    startDate: `${dateStr}T17:00:00+09:00`,
    endDate: `${dateStr}T21:00:00+09:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    url: BASE_URL,
    location: {
      "@type": "Place",
      name: VENUE.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "尾島298-2",
        addressLocality: "筑後市",
        addressRegion: "福岡県",
        postalCode: "833-0014",
        addressCountry: "JP",
      },
    },
  })),
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "土曜食いだおれ夜市 in 筑後",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: [CONTACT.instagram],
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT.email,
    telephone: CONTACT.phone,
    contactType: "customer service",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "入場料はかかりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "入場は無料です。各店舗での飲食代金のみご負担ください。",
      },
    },
    {
      "@type": "Question",
      name: "雨天の場合はどうなりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "小雨の場合は開催します。天候が悪化した場合は公式 Instagram にてお知らせします。",
      },
    },
    {
      "@type": "Question",
      name: "駐車場はありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "川の駅船小屋 恋ぼたるに無料駐車場がございます。混雑時は近隣の駐車場もご利用ください。",
      },
    },
    {
      "@type": "Question",
      name: "ペット同伴は可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "リードをつけた状態であればご同伴いただけます。他のお客様へのご配慮をお願いします。",
      },
    },
    {
      "@type": "Question",
      name: "出店したいのですがどこに連絡すればいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "公式 Instagram の DM またはメール（baobabcoffee.001@gmail.com）にてお問い合わせください。",
      },
    },
    {
      "@type": "Question",
      name: "お酒チケットとは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "一部のお酒が通常よりお得になる限定チケットです。当日会場にて販売します。詳細は Instagram をご確認ください。",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <OverviewSection />
      <SectionDivider />
      <StoresSection />
      <SectionDivider />
      <VenueSection />
      <SectionDivider />
      <VenueMapSection />
      <SectionDivider />
      <InstagramSection />
      <SectionDivider />
      <NewsSection />
      <SectionDivider />
      <FAQSection />
      <SectionDivider />
      <ContactSection />
    </>
  );
}
