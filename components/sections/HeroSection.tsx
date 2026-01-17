'use client';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-white px-4" style={{ backgroundImage: 'url(/bg.svg)', backgroundSize: '50%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Brand and Slogan */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-sans" style={{ color: '#F7641A' }}>
            Altek Pro
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-montserrat)', color: '#244567' }}>
            Reliable. Skilled. Local
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-900">
          Your go-to handyman in Orange County
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {/* Phone Button */}
          <a
            href="tel:3412382682"
            className="flex items-center gap-1.5 px-4 py-2 text-base font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>(341) 238 2682</span>
          </a>

          {/* Request a Job Button */}
          <button
            onClick={scrollToContact}
            className="px-6 py-2 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Request a Job
          </button>
        </div>
      </div>
    </section>
  );
}
