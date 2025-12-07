'use client';

import { useSyncExternalStore, useEffect } from 'react';

const subscribe = () => () => {};

const getSnapshot = () => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('page-animated') === null;
};

const getServerSnapshot = () => null;

export function PageAnimations({ children }: { children: React.ReactNode }) {
  const shouldAnimate = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Mark as animated after first render
  useEffect(() => {
    if (shouldAnimate === true) {
      sessionStorage.setItem('page-animated', 'true');
    }
  }, [shouldAnimate]);

  return (
    <div
      data-animate={shouldAnimate === null ? undefined : shouldAnimate ? 'true' : 'false'}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
