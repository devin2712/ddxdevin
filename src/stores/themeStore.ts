"use client";

import { create } from "zustand";
import { persist} from "zustand/middleware";

export type Theme = "light" | "dark";

type ThemeStore = {
    theme: Theme;
    mounted: boolean;
    setTheme: (theme: Theme) => void;
    setMounted: (mounted: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "light",
            mounted: false,
            setTheme: (theme) => {
                set({ theme});
                if (typeof window !== "undefined") {
                  document.documentElement.setAttribute("data-theme", theme);
                }
            },
            setMounted: (mounted) => set({ mounted })
        }),
        {
            name: "theme",
            partialize: (state) => ({ theme: state.theme })
        }
    )
);

