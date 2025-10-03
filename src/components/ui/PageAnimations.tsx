'use client';

import { useEffect, useState } from 'react';

export function PageAnimations({ children }: { children: React.ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem('page-animated');
    if (!hasAnimated) {
      setShouldAnimate(true);
      sessionStorage.setItem('page-animated', 'true');
    } else {
      setShouldAnimate(false);
    }
  }, []);

  return (
    <div data-animate={shouldAnimate === null ? undefined : shouldAnimate ? 'true' : 'false'}>
      {children}
    </div>
  );
}
