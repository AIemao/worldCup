import { AppLayout } from "@/layouts/AppLayout";
import { RootLayout } from "@/layouts/RootLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./route.constants";

/**
 * Configuração central do React Router v7.
 *
 * Usa `Component:` (sem JSX) e `lazy:` nativo do React Router
 * em vez de React.lazy + <Suspense> inline — isso:
 *   1. Mantém este arquivo como TypeScript puro (sem JSX)
 *   2. Elimina definições locais de componentes lazy que violam react-refresh
 *   3. Delega o fallback de loading ao <Suspense> em RootLayout
 */
export const router = createBrowserRouter([
  {
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            path: ROUTES.HOME,
            lazy: () => import("@/pages/HomePage").then((m) => ({ Component: m.HomePage })),
          },
          {
            path: ROUTES.MATCHES,
            lazy: () => import("@/pages/NotFoundPage").then((m) => ({ Component: m.NotFoundPage })),
          },
          {
            path: ROUTES.GROUPS,
            lazy: () => import("@/pages/NotFoundPage").then((m) => ({ Component: m.NotFoundPage })),
          },
          {
            path: ROUTES.TEAMS,
            lazy: () => import("@/pages/NotFoundPage").then((m) => ({ Component: m.NotFoundPage })),
          },
          {
            path: ROUTES.STANDINGS,
            lazy: () => import("@/pages/NotFoundPage").then((m) => ({ Component: m.NotFoundPage })),
          },
        ],
      },
      {
        path: "*",
        lazy: () => import("@/pages/NotFoundPage").then((m) => ({ Component: m.NotFoundPage })),
      },
    ],
  },
]);
