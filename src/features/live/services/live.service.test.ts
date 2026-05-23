import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it } from "vitest";
import { liveInsightsMockData, liveMatchesMockData } from "../data";
import { getLiveInsights, getLiveMatchById, getLiveMatches } from "./live.service";

afterEach(() => server.resetHandlers());

describe("getLiveMatches", () => {
  it("retorna a lista de partidas ao vivo do mock", async () => {
    const result = await getLiveMatches();
    expect(result).toHaveLength(liveMatchesMockData.length);
    expect(result[0]).toMatchObject({ id: liveMatchesMockData[0].id });
  });

  it("todas as partidas retornadas possuem status='live'", async () => {
    const result = await getLiveMatches();
    for (const match of result) {
      expect(match.status).toBe("live");
    }
  });

  it("lança erro quando a resposta falha", async () => {
    server.use(http.get("/live", () => new HttpResponse(null, { status: 500 })));
    await expect(getLiveMatches()).rejects.toThrow();
  });

  it("lança ZodError quando a resposta tem schema inválido", async () => {
    server.use(http.get("/live", () => HttpResponse.json([{ id: 123 }])));
    await expect(getLiveMatches()).rejects.toThrow();
  });
});

describe("getLiveMatchById", () => {
  it("retorna a partida correta pelo ID", async () => {
    const target = liveMatchesMockData[0];
    const result = await getLiveMatchById(target.id);
    expect(result.id).toBe(target.id);
    expect(result.status).toBe("live");
    expect(result.homeTeam.id).toBe(target.homeTeam.id);
  });

  it("retorna score e currentMinute obrigatórios", async () => {
    const target = liveMatchesMockData[0];
    const result = await getLiveMatchById(target.id);
    expect(result.score).toBeDefined();
    expect(typeof result.currentMinute).toBe("number");
  });

  it("lança erro 404 quando a partida não existe", async () => {
    await expect(getLiveMatchById("nonexistent-id")).rejects.toThrow();
  });

  it("lança ZodError quando a resposta tem schema inválido", async () => {
    server.use(http.get("/live/:matchId", () => HttpResponse.json({ id: 123 })));
    await expect(getLiveMatchById("wc26-live-01")).rejects.toThrow();
  });
});

describe("getLiveInsights", () => {
  it("retorna insights para a partida ao vivo", async () => {
    const result = await getLiveInsights(liveInsightsMockData.matchId);
    expect(result.matchId).toBe(liveInsightsMockData.matchId);
    expect(result.insights.length).toBeGreaterThan(0);
  });

  it("retorna lista vazia para partida sem insights", async () => {
    const result = await getLiveInsights("unknown-match-id");
    expect(result.insights).toHaveLength(0);
  });

  it("todos os insights possuem confidence entre 0 e 1", async () => {
    const result = await getLiveInsights(liveInsightsMockData.matchId);
    for (const insight of result.insights) {
      expect(insight.confidence).toBeGreaterThanOrEqual(0);
      expect(insight.confidence).toBeLessThanOrEqual(1);
    }
  });

  it("lança erro quando a resposta falha", async () => {
    server.use(http.get("/live/:matchId/insights", () => new HttpResponse(null, { status: 500 })));
    await expect(getLiveInsights("wc26-live-01")).rejects.toThrow();
  });
});
