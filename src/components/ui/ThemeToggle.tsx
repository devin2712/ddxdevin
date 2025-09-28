"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { useDeviceType } from "@/hooks/useDeviceType";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
import { SystemIcon } from "./icons/SystemIcon";
import styles from "./ThemeToggle.module.css";

const themeOrder: Theme[] = ["system", "light", "dark"];

const getThemeIcon = (theme: Theme, deviceType: "desktop" | "mobile" | "tablet") => {
  switch (theme) {
    case "light":
      return <SunIcon size={16} />;
    case "dark":
      return <MoonIcon size={16} />;
    case "system":
    default:
      return <SystemIcon size={16} deviceType={deviceType} />;
  }
};

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const deviceType = useDeviceType();
  const t = useTranslations("theme");

  const handleToggle = () => {
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  const nextTheme = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleToggle}
      aria-label={t("switchTo", { theme: t(nextTheme) })}
      title={t("currentMode", { mode: t(theme) })}
    >
      {getThemeIcon(theme, deviceType)}
    </button>
  );
};