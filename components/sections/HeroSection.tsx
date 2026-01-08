'use client';

import Button from '@/components/ui/Button';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Brand */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
          Altek Pro
        </h1>

        {/* Slogan */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
          Local Handyman. Professional Results.
        </p>

        {/* Simple badges */}
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
          <span>Licensed</span>
          <span>•</span>
          <span>Insured</span>
          <span>•</span>
          <span>Orange County</span>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Button size="lg" onClick={scrollToContact}>
            Get a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
