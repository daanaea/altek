'use client';

import { useEffect } from 'react';

export default function PhoneClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="tel:"]');
      if (!link) return;
      const gtag = (window as any).gtag;
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-17999843147/nqbZCNGfjqgcEMue_4ZD',
          value: 1.0,
          currency: 'USD',
        });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
