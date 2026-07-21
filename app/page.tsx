import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GalleryPreviewSection from "@/components/sections/GalleryPreviewSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ServiceAreasSection from "@/components/sections/ServiceAreasSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <GalleryPreviewSection />
      <ReviewsSection />
      <ServiceAreasSection />
      <ContactSection />
    </>
  );
}