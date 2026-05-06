import HeroSection from "@/components/sections/HeroSection";
import OverviewSection from "@/components/sections/OverviewSection";
import StoresSection from "@/components/sections/StoresSection";
import VenueSection from "@/components/sections/VenueSection";
import InstagramSection from "@/components/sections/InstagramSection";
import NewsSection from "@/components/sections/NewsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <OverviewSection />
      <SectionDivider />
      <StoresSection />
      <SectionDivider />
      <VenueSection />
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
