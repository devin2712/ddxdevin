"use client";

import React, { useState, useEffect } from "react";
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

  return (
    <Tooltip content={`${formattedTime} ET`}>
      <div
        className={`${styles.clockWrapper} ${
          labelAlign === "right" ? "" : styles.leftAlign
        }`}
      >
        <div
          className={styles.clock}
          role="img"
          aria-label={t("ariaLabel", { time: formattedTime })}
          tabIndex={0}
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle
              cx="14"
              cy="14"
              r="12"
              fill="none"
              className={styles.clockFace}
            />

            <circle cx="14" cy="14" r="1" fill="currentColor" opacity="0.8" />

            <line
              x1="14"
              y1="14"
              x2="14"
              y2="8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${hourAngle} 14 14)`}
              opacity="0.7"
            />

            <line
              x1="14"
              y1="14"
              x2="14"
              y2="4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${minuteAngle} 14 14)`}
              opacity="0.7"
            />

            <line
              x1="14"
              y1="14"
              x2="14"
              y2="3"
              stroke="#FF0000"
              strokeWidth="0.5"
              strokeLinecap="round"
              transform={`rotate(${secondAngle} 14 14)`}
            />
          </svg>
        </div>
        {label && <span>{label}</span>}
      </div>
    </Tooltip>
  );
};