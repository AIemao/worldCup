import { THEME_STORAGE_KEY } from "@/config/constants";
import type { ResolvedTheme, Theme } from "@/types/common";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
};

type ThemeActions = {
    setTheme: (theme: Theme) => void;
};

type ThemeStore = ThemeState & ThemeActions;

function resolveTheme(theme: Theme): ResolvedTheme {
    if (theme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }
    return theme;
}

function applyThemeToDOM(resolved: ResolvedTheme) {
    document.documentElement.classList.toggle("dark", resolved === "dark");
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "dark",
            resolvedTheme: "dark",

            setTheme: (theme: Theme) => {
                const resolved = resolveTheme(theme);
                applyThemeToDOM(resolved);
                set({ theme, resolvedTheme: resolved });
            },
        }),
        {
            name: THEME_STORAGE_KEY,
            // persiste apenas a preferência; resolvedTheme é recalculado no mount
            partialize: (state): Pick<ThemeState, "theme"> => ({
                theme: state.theme,
            }),
        }
    )
);
