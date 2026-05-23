import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it } from "vitest";
import { matchesMockData } from "../data";
import { getMatchById, getMatches } from "./matches.service";

afterEach(() => server.resetHandlers());

describe("getMatches", () => {
  it("retorna a lista de partidas do mock", async () => {
    const result = await getMatches();
    expect(result).toHaveLength(matchesMockData.length);
    expect(result[0]).toMatchObject({ id: matchesMockData[0].id });
  });

  it("lança erro quando a resposta falha", async () => {
    server.use(http.get("/matches", () => new HttpResponse(null, { status: 500 })));
    await expect(getMatches()).rejects.toThrow();
  });

  it("lança ZodError quando a resposta tem schema inválido", async () => {
    server.use(http.get("/matches", () => HttpResponse.json([{ id: 123 }])));
    await expect(getMatches()).rejects.toThrow();
  });
});

describe("getMatchById", () => {
  it("retorna a partida correta pelo ID", async () => {
    const target = matchesMockData[0];
    const result = await getMatchById(target.id);
    expect(result.id).toBe(target.id);
    expect(result.homeTeam.id).toBe(target.homeTeam.id);
  });

  it("lança erro 404 quando a partida não existe", async () => {
    await expect(getMatchById("nonexistent-id")).rejects.toThrow();
  });

  it("lança ZodError quando a resposta tem schema inválido", async () => {
    server.use(http.get("/matches/:matchId", () => HttpResponse.json({ id: 123 })));
    await expect(getMatchById("wc26-m01")).rejects.toThrow();
  });
});
