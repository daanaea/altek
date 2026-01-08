'use client';

interface ServiceAccordionProps {
  isOpen: boolean;
  services: string[];
}

export default function ServiceAccordion({
  isOpen,
  services,
}: ServiceAccordionProps) {
  if (!isOpen) return null;

  return (
    <div className="mt-3 px-4 sm:px-6 pb-4">
      <ul className="space-y-2 text-sm text-gray-600">
        {services.map((service, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-2 flex-shrink-0">•</span>
            <span>{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
