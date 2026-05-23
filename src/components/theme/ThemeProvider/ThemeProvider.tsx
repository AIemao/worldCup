import { useThemeStore } from "@/store/themeStore";
import type { ReactNode } from "react";
import { useEffect } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * Sincroniza o store de tema com o DOM no mount e em mudanças de system theme.
 * O inline script no index.html já aplica o tema antes do React renderizar (anti-FOUC).
 * Este provider garante que mudanças em tempo real (system theme) sejam aplicadas.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    // Sincroniza o DOM com a preferência armazenada no mount
    setTheme(theme);

    if (theme !== "system") return;

    // Ouve mudanças na preferência do sistema quando theme === 'system'
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setTheme("system");
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme, setTheme]);

  return <>{children}</>;
}
