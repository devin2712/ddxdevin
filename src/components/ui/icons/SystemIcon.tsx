import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  deviceType?: "desktop" | "mobile" | "tablet";
}

export const SystemIcon: React.FC<IconProps> = ({ size = 20, className, deviceType = "desktop" }) => {
  if (deviceType === "mobile") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M7 2h10a3 3 0 013 3v14a3 3 0 01-3 3H7a3 3 0 01-3-3V5a3 3 0 013-3z" />
        <path d="M10 2.5h4" />
        <circle cx="12" cy="18.5" r="0.5" fill="currentColor" />
      </svg>
    );
  }

  if (deviceType === "tablet") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M5 1h14a3 3 0 013 3v16a3 3 0 01-3 3H5a3 3 0 01-3-3V4a3 3 0 013-3z" />
        <path d="M10 1.5h4" />
        <circle cx="12" cy="19.5" r="0.5" fill="currentColor" />
      </svg>
    );
  }

  // Default desktop icon
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
};