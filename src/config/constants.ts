export const APP_NAME = "World Cup 2026" as const;
export const APP_DESCRIPTION =
  "World Cup 2026 AI Experience — Live stats, predictions and immersive match coverage." as const;

// Deve estar em sync com o inline script de anti-FOUC no index.html
export const THEME_STORAGE_KEY = "wc26-theme" as const;

export const ROUTES = {
  HOME: "/",
  GROUPS: "/groups",
  MATCHES: "/matches",
  LIVE: "/live",
  TEAMS: "/teams",
  STANDINGS: "/standings",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
