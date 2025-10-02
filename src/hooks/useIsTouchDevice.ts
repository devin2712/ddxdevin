"use client";

import { useState } from "react";

export const useIsTouchDevice = (): boolean => {
  const [isTouchDevice] = useState(() =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );

  return isTouchDevice;
};
