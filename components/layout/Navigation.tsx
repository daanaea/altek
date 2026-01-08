'use client';

import { cn } from '@/lib/utils';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  mobile?: boolean;
}

export default function Navigation({ onNavigate, mobile = false }: NavigationProps) {
  const links = [
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Service Areas', id: 'service-areas' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id)}
          className={cn(
            'font-medium text-gray-700 hover:text-primary transition-colors duration-200',
            mobile && 'text-left px-4 py-2 hover:bg-gray-50 rounded-lg w-full'
          )}
        >
          {link.label}
        </button>
      ))}
    </>
  );
}
