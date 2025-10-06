"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

export const ThemeInitializer = () => {
  const { setTheme, setMounted } = useThemeStore();

  useEffect(() => {
    setMounted(true);

    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme && ["light", "dark"].includes(currentTheme)) {
      setTheme(currentTheme as "light" | "dark");
    }
  }, [setTheme, setMounted]);

  return null;
};
