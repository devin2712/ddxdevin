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
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const etTime = new Date(
    time.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const hours = etTime.getHours() % 12;
  const minutes = etTime.getMinutes();
  const seconds = etTime.getSeconds();

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

  const formattedTime = etTime.toLocaleTimeString("en-US", {
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
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              transform={`rotate(${secondAngle} 14 14)`}
              opacity="0.6"
            />
          </svg>
        </div>
        {label && <span>{label}</span>}
      </div>
    </Tooltip>
  );
};