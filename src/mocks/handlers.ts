import { homeMockData } from "@/features/home/data/home.mock";
import { matchesMockData } from "@/features/matches/data";
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
];
