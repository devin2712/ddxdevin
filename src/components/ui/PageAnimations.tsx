'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

const getSnapshot = () => {
  if (typeof window === 'undefined') return null;

  const hasAnimated = sessionStorage.getItem('page-animated');
  if (!hasAnimated) {
    sessionStorage.setItem('page-animated', 'true');
    return true;
  }
  return false;
};

const getServerSnapshot = () => null;

export function PageAnimations({ children }: { children: React.ReactNode }) {
  const shouldAnimate = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div data-animate={shouldAnimate === null ? undefined : shouldAnimate ? 'true' : 'false'}>
      {children}
    </div>
  );
}
