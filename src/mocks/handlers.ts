import {
  groupMatchesMockData,
  groupsMockData,
  groupStandingsMockData,
} from "@/features/groups/data";
import { homeMockData } from "@/features/home/data/home.mock";
import { liveInsightsMockData, liveMatchesMockData } from "@/features/live/data";
import { matchesMockData } from "@/features/matches/data";
import {
  teamPlayersMockData,
  teamResultsMockData,
  teamScheduleMockData,
  teamsMockData,
} from "@/features/teams/data";
import { http, HttpResponse } from "msw";

/**
 * Handlers MSW centralizados.
 *
 * Fluxo: UI → React Query → Service → HTTP Client → MSW (dev/test)
 *
 * Cada feature adiciona seus handlers aqui.
 * Para sobrescrever em testes individuais use server.use() dentro do teste.
 */
export const handlers = [
  http.get("/api/health", () => HttpResponse.json({ status: "ok" })),

  // ─── Home ──────────────────────────────────────────────────────────────────
  http.get("/home", () => HttpResponse.json(homeMockData)),

  // ─── Matches ───────────────────────────────────────────────────────────────
  http.get("/matches", () => HttpResponse.json(matchesMockData)),

  http.get("/matches/:matchId", ({ params }) => {
    const { matchId } = params;
    const match = matchesMockData.find((m) => m.id === matchId);
    if (!match) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(match);
  }),

  // ─── Live ──────────────────────────────────────────────────────────────────
  http.get("/live", () => HttpResponse.json(liveMatchesMockData)),

  http.get("/live/:matchId", ({ params }) => {
    const { matchId } = params;
    const match = liveMatchesMockData.find((m) => m.id === matchId);
    if (!match) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(match);
  }),

  http.get("/live/:matchId/insights", ({ params }) => {
    const { matchId } = params;
    if (matchId === liveInsightsMockData.matchId) {
      return HttpResponse.json(liveInsightsMockData);
    }
    return HttpResponse.json({
      matchId,
      insights: [],
      generatedAt: new Date().toISOString(),
    });
  }),

  // ─── Groups ────────────────────────────────────────────────────────────────
  http.get("/groups", () => HttpResponse.json(groupsMockData)),

  http.get("/groups/:letter/standings", ({ params }) => {
    const letter = String(params["letter"]).toUpperCase();
    const standings = groupStandingsMockData[letter];
    if (!standings) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(standings);
  }),

  http.get("/groups/:letter/matches", ({ params }) => {
    const letter = String(params["letter"]).toUpperCase();
    const matches = groupMatchesMockData[letter];
    if (!matches) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(matches);
  }),

  // ─── Teams ─────────────────────────────────────────────────────────────────
  http.get("/teams", () => HttpResponse.json(teamsMockData)),

  http.get("/teams/:teamId", ({ params }) => {
    const teamId = String(params["teamId"]);
    const team = teamsMockData.find((t) => t.id === teamId);
    if (!team) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(team);
  }),

  http.get("/teams/:teamId/players", ({ params }) => {
    const teamId = String(params["teamId"]);
    return HttpResponse.json(teamPlayersMockData[teamId] ?? []);
  }),

  http.get("/teams/:teamId/schedule", ({ params }) => {
    const teamId = String(params["teamId"]);
    return HttpResponse.json(teamScheduleMockData[teamId] ?? []);
  }),

  http.get("/teams/:teamId/results", ({ params }) => {
    const teamId = String(params["teamId"]);
    return HttpResponse.json(teamResultsMockData[teamId] ?? []);
  }),
];
