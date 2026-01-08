import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import GallerySection from '@/components/sections/GallerySection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ServiceAreasSection from '@/components/sections/ServiceAreasSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <ReviewsSection />
      <ServiceAreasSection />
      <ContactSection />
    </main>
  );
}
