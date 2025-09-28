"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Tooltip } from "./Tooltip";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
import styles from "./ThemeToggle.module.css";

const getThemeIcon = (theme: Theme) => {
  switch (theme) {
    case "light":
      return <SunIcon size={16} />;
    case "dark":
      return <MoonIcon size={16} />;
    default:
      return <SunIcon size={16} />;
  }
};

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <Tooltip content={t("switchTo", { theme: t(nextTheme) })}>
      <div className={styles.toggleWrapper}>
        <button
          type="button"
          className={styles.toggle}
          onClick={handleToggle}
          aria-label={t("switchTo", { theme: t(nextTheme) })}
        >
          {getThemeIcon(theme)}
        </button>
      </div>
    </Tooltip>
  );
};