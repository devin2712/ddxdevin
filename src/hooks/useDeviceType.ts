"use client";

import { useState, useEffect } from "react";

type DeviceType = "desktop" | "mobile" | "tablet";

const detectDevice = (): DeviceType => {
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

export const useDeviceType = (): DeviceType => {
  // Use lazy initialization to avoid setState in effect
  const [deviceType, setDeviceType] = useState<DeviceType>(detectDevice);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Debounce to avoid excessive updates
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const newDeviceType = detectDevice();
        if (newDeviceType !== deviceType) {
          setDeviceType(newDeviceType);
        }
      }, 150);
    };

    // Use visualViewport API if available 
    // This only fires when the layout viewport changes, not when browser chrome (address bar) hides/shows
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    } else {
      // Fallback for older browsers
      window.addEventListener("resize", handleResize);
    }

    return () => {
      clearTimeout(timeoutId);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [deviceType]);

  return deviceType;
};