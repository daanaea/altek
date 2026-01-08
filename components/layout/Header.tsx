'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all',
        isScrolled ? 'bg-white border-b border-gray-200' : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-xl font-bold text-gray-900"
          >
            <Image
              src="/images/logo.svg"
              alt="Altek Pro Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="hidden sm:inline">Altek Pro</span>
          </button>

          <nav className="flex items-center gap-3">
            <button onClick={() => scrollToSection('services')} className="hidden md:block text-sm text-gray-600 hover:text-gray-900">
              Services
            </button>
            <button onClick={() => scrollToSection('gallery')} className="hidden md:block text-sm text-gray-600 hover:text-gray-900">
              Gallery
            </button>

            {/* Phone Button */}
            <a
              href="tel:3413338855"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden sm:inline">341 333 88 55</span>
            </a>

            {/* Request a Job Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Request a Job
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
