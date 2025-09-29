"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Tooltip } from "./Tooltip";
import styles from "./Clock.module.css";

type ClockProps = {
  label?: string;
  labelAlign?: 'left' | 'right';
}

export const Clock: React.FC<ClockProps> = ({ label, labelAlign = 'right' }) => {
  const t = useTranslations("clock");
  const [time, setTime] = useState(new Date());
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const clockWrapperRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches ||
                  'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide tooltip on scroll or outside click (mobile only)
  useEffect(() => {
    if (!isMobile || !tooltipOpen) return;

    const handleScroll = () => {
      setTooltipOpen(false);
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (clockWrapperRef.current && !clockWrapperRef.current.contains(e.target as Node)) {
        setTooltipOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Small delay to prevent closing on the same click that opened it
    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick, true);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [isMobile, tooltipOpen]);

  useEffect(() => {
    let animationFrameId: number;

    const updateTime = () => {
      setTime(new Date());
      animationFrameId = requestAnimationFrame(updateTime);
    };

    animationFrameId = requestAnimationFrame(updateTime);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Get timezone offset for ET and convert while preserving milliseconds
  const etFormatter = new Intl.DateTimeFormat("en", {
    timeZone: "America/New_York",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  // Parse ET time parts and reconstruct with original milliseconds
  const etParts = etFormatter.formatToParts(time);
  const etHour = parseInt(etParts.find(p => p.type === 'hour')?.value || '0');
  const etMinute = parseInt(etParts.find(p => p.type === 'minute')?.value || '0');
  const etSecond = parseInt(etParts.find(p => p.type === 'second')?.value || '0');

  const hours = etHour % 12;
  const minutes = etMinute;
  const seconds = etSecond;
  const milliseconds = time.getMilliseconds(); // Keep original milliseconds

  // Smooth calculations including milliseconds for fluid motion
  const secondAngle = (seconds + milliseconds / 1000) * 6;
  const minuteAngle = minutes * 6 + (seconds + milliseconds / 1000) * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5 + (seconds + milliseconds / 1000) * (0.5 / 60);

  const formattedTime = time.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Split time and period
  const [timeOnly, period] = formattedTime.split(' ');

  const handleClockClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setTooltipOpen(prev => !prev);
    }
  };

  const handleOpenChange = (open: boolean) => {
    // On mobile, only allow programmatic state changes
    if (isMobile) {
      // Don't do anything - let our click handler manage the state
      return;
    }
    // On desktop, allow normal hover behavior
    setTooltipOpen(open);
  };

  return (
    <Tooltip
      content={
        <span className={styles.tooltipTime}>
          <span className={styles.timeDigits}>{timeOnly}</span> {period} ET
        </span>
      }
      open={isMobile ? tooltipOpen : undefined}
      onOpenChange={isMobile ? handleOpenChange : undefined}
      delayDuration={isMobile ? 0 : 100}
    >
      <div
        ref={clockWrapperRef}
        className={`${styles.clockWrapper} ${
          labelAlign === "right" ? "" : styles.leftAlign
        }`}
        onClick={handleClockClick}
      >
        <div
          className={styles.clock}
          role="img"
          aria-label={t("ariaLabel", { time: formattedTime })}
          tabIndex={0}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" className={styles.clockFace} />

            <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.8" />

            <line
              x1="12"
              y1="12"
              x2="12"
              y2="7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${hourAngle} 12 12)`}
              opacity="0.7"
            />

            <line
              x1="12"
              y1="12"
              x2="12"
              y2="3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${minuteAngle} 12 12)`}
              opacity="0.7"
            />

            <line
              x1="12"
              y1="12"
              x2="12"
              y2="2"
              stroke="#FF0000"
              strokeWidth="0.5"
              strokeLinecap="round"
              transform={`rotate(${secondAngle} 12 12)`}
            />
          </svg>
        </div>
        {label && <span>{label}</span>}
      </div>
    </Tooltip>
  );
};