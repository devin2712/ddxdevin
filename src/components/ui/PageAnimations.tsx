'use client';

import { useState } from 'react';

export function PageAnimations({ children }: { children: React.ReactNode }) {
  // Initialize state from sessionStorage to avoid effect setState
  const [shouldAnimate] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const hasAnimated = sessionStorage.getItem('page-animated');
    if (!hasAnimated) {
      sessionStorage.setItem('page-animated', 'true');
      return true;
    }
    return false;
  });

  return (
    <div data-animate={shouldAnimate === null ? undefined : shouldAnimate ? 'true' : 'false'}>
      {children}
    </div>
  );
}
