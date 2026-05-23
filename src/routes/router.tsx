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
            lazy: () =>
              import("@/features/matches/pages/MatchesPage").then((m) => ({
                Component: m.MatchesPage,
              })),
          },
          {
            path: `${ROUTES.MATCHES}/:matchId`,
            lazy: () =>
              import("@/features/matches/pages/MatchDetailsPage").then((m) => ({
                Component: m.MatchDetailsPage,
              })),
          },
          {
            path: ROUTES.LIVE,
            lazy: () =>
              import("@/features/live/pages/LiveCenterPage").then((m) => ({
                Component: m.LiveCenterPage,
              })),
          },
          {
            path: `${ROUTES.LIVE}/:matchId`,
            lazy: () =>
              import("@/features/live/pages/LiveMatchPage").then((m) => ({
                Component: m.LiveMatchPage,
              })),
          },
          {
            path: ROUTES.GROUPS,
            lazy: () =>
              import("@/features/groups/pages/GroupsPage").then((m) => ({
                Component: m.GroupsPage,
              })),
          },
          {
            path: `${ROUTES.GROUPS}/:groupId`,
            lazy: () =>
              import("@/features/groups/pages/GroupDetailsPage").then((m) => ({
                Component: m.GroupDetailsPage,
              })),
          },
          {
            path: ROUTES.TEAMS,
            lazy: () =>
              import("@/features/teams/pages/TeamsPage").then((m) => ({
                Component: m.TeamsPage,
              })),
          },
          {
            path: `${ROUTES.TEAMS}/:teamId`,
            lazy: () =>
              import("@/features/teams/pages/TeamDetailsPage").then((m) => ({
                Component: m.TeamDetailsPage,
              })),
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
