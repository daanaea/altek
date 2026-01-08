'use client';

import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  icon: string;
  isExpanded?: boolean;
  onClick?: () => void;
}

export default function ServiceCard({
  title,
  isExpanded = false,
  onClick,
}: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 sm:p-6 rounded-lg border transition-all',
        isExpanded
          ? 'border-primary bg-primary/5'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">{title}</h3>
        <svg
          className={cn(
            'w-5 h-5 text-gray-400 transition-transform',
            isExpanded && 'rotate-180 text-primary'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
  );
}
