"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Tooltip } from "./Tooltip";
import { useDeviceType } from "@/hooks/useDeviceType";
import styles from "./Clock.module.css";

type ClockProps = {
  label?: string;
  labelAlign?: 'left' | 'right';
}

export const Clock: React.FC<ClockProps> = ({ label, labelAlign = 'right' }) => {
  const t = useTranslations("clock");
  const [time, setTime] = useState(new Date());
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const deviceType = useDeviceType();
  const isMobile = deviceType !== 'desktop';
  const clockWrapperRef = useRef<HTMLDivElement>(null);

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
    const updateTime = () => {
      setTime(new Date());
    };

    // Update every 100ms for smooth second hand
    const intervalId = setInterval(updateTime, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Memoize formatters to avoid recreating on every render
  const etFormatter = React.useMemo(() => new Intl.DateTimeFormat("en", {
    timeZone: "America/New_York",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }), []);

  const timeFormatter = React.useMemo(() => new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }), []);

  const timezoneFormatter = React.useMemo(() => new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "short",
  }), []);

  // Calculate angles and formatted times
  const clockData = React.useMemo(() => {
    // Parse ET time parts and reconstruct with original milliseconds
    const etParts = etFormatter.formatToParts(time);
    const etHour = parseInt(etParts.find(p => p.type === 'hour')?.value || '0');
    const etMinute = parseInt(etParts.find(p => p.type === 'minute')?.value || '0');
    const etSecond = parseInt(etParts.find(p => p.type === 'second')?.value || '0');

    const hours = etHour % 12;
    const minutes = etMinute;
    const seconds = etSecond;
    const milliseconds = time.getMilliseconds();

    // Smooth calculations including milliseconds for fluid motion
    const secondAngle = (seconds + milliseconds / 1000) * 6;
    const minuteAngle = minutes * 6 + (seconds + milliseconds / 1000) * 0.1;
    const hourAngle = hours * 30 + minutes * 0.5 + (seconds + milliseconds / 1000) * (0.5 / 60);

    const formattedTime = timeFormatter.format(time);
    const timezoneName = timezoneFormatter.format(time).split(' ').pop();

    return {
      secondAngle,
      minuteAngle,
      hourAngle,
      formattedTime,
      timezoneName
    };
  }, [time, etFormatter, timeFormatter, timezoneFormatter]);

  const handleClockClick = React.useCallback((e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setTooltipOpen(prev => !prev);
    }
  }, [isMobile]);

  const handleOpenChange = React.useCallback((open: boolean) => {
    // On mobile, only allow programmatic state changes from our click handler
    if (isMobile) {
      // Don't update state - let our click handler manage it
      return;
    }
    // On desktop, allow normal hover behavior
    setTooltipOpen(open);
  }, [isMobile]);

  return (
    <Tooltip
      content={
        <span className={styles.tooltipTime}>
          <span className={styles.timeDigits}>{clockData.formattedTime}</span> {clockData.timezoneName}
        </span>
      }
      open={tooltipOpen}
      onOpenChange={handleOpenChange}
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
          aria-label={t("ariaLabel", { time: clockData.formattedTime })}
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
              transform={`rotate(${clockData.hourAngle} 12 12)`}
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
              transform={`rotate(${clockData.minuteAngle} 12 12)`}
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
              transform={`rotate(${clockData.secondAngle} 12 12)`}
            />
          </svg>
        </div>
        {label && <span>{label}</span>}
      </div>
    </Tooltip>
  );
};