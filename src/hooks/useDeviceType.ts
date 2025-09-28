"use client";

import { useState, useEffect } from "react";

type DeviceType = "desktop" | "mobile" | "tablet";

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const detectDevice = () => {
      if (typeof window === "undefined") return "desktop";

      const userAgent = window.navigator.userAgent;
      const width = window.innerWidth;
      const platform = window.navigator.platform;

      // Check for iPadOS 13+ which reports as desktop Safari
      const isIPad = (platform === "MacIntel" && window.navigator.maxTouchPoints > 1) ||
                     /iPad/i.test(userAgent);

      if (isIPad) {
        return "tablet";
      }

      // Check for other mobile devices
      if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        // Distinguish between mobile and tablet based on screen width
        if (width >= 768) {
          return "tablet";
        }
        return "mobile";
      }

      // Check for Android tablets
      if (/Android/i.test(userAgent) && width >= 768) {
        return "tablet";
      }

      return "desktop";
    };

    const handleResize = () => {
      setDeviceType(detectDevice());
    };

    // Initial detection
    setDeviceType(detectDevice());

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};