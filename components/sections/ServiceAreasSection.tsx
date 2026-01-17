'use client';

import { cities } from '@/lib/cities-data';
import OrangeCountyMap from '@/components/ui/OrangeCountyMap';

export default function ServiceAreasSection() {
  return (
    <section id="service-areas" className="py-16 sm:py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-center">
          Service Areas
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Serving all major cities in Orange County, California
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Map */}
          <div className="lg:col-span-8 rounded-lg overflow-hidden border border-gray-200 h-[400px]">
            <OrangeCountyMap />
          </div>

          {/* Working Hours */}
          <div className="lg:col-span-4 bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Working Hours</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Monday - Sunday</p>
                  <p className="text-gray-600">8:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Phone</p>
                  <a href="tel:3412382682" className="text-primary hover:underline">(341) 238 26 82</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:info@altek-pro.com" className="text-primary hover:underline">info@altek-pro.com</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Service Area</p>
                  <p className="text-gray-600">Orange County, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
