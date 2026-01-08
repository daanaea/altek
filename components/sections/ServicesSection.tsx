'use client';

import { useState } from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import ServiceAccordion from '@/components/ui/ServiceAccordion';
import { services } from '@/lib/services-data';

export default function ServicesSection() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section id="services" className="py-16 sm:py-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Services
          </h2>
          <p className="text-gray-600">
            Professional handyman services for your home and business
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id}>
              <ServiceCard
                title={service.title}
                icon={service.icon}
                isExpanded={expandedService === service.id}
                onClick={() => toggleService(service.id)}
              />
              <ServiceAccordion
                isOpen={expandedService === service.id}
                services={service.subServices}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
