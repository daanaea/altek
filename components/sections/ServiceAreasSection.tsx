'use client';

import { cities } from '@/lib/cities-data';

export default function ServiceAreasSection() {
  return (
    <section id="service-areas" className="py-16 sm:py-24 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Service Areas
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Serving all major cities in Orange County, California
        </p>

        {/* Cities List */}
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
          {cities.map((city, index) => (
            <span key={city}>
              {city}
              {index < cities.length - 1 && <span className="ml-2">•</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
