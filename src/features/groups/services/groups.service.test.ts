import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it } from "vitest";
import { groupMatchesMockData, groupsMockData, groupStandingsMockData } from "../data";
import { getGroupMatches, getGroups, getGroupStandings } from "./groups.service";

afterEach(() => server.resetHandlers());

// ─── getGroups ────────────────────────────────────────────────────────────────

describe("getGroups", () => {
  it("retorna a lista de grupos do mock", async () => {
    const result = await getGroups();
    expect(result).toHaveLength(groupsMockData.length);
  });

  it("cada grupo possui id, name e letter", async () => {
    const result = await getGroups();
    for (const group of result) {
      expect(group).toHaveProperty("id");
      expect(group).toHaveProperty("name");
      expect(group).toHaveProperty("letter");
    }
  });

  it("retorna 8 grupos (A–H)", async () => {
    const result = await getGroups();
    expect(result).toHaveLength(8);
    const letters = result.map((g) => g.letter);
    expect(letters).toContain("A");
    expect(letters).toContain("H");
  });

  it("lança erro ao receber payload inválido", async () => {
    server.use(http.get("/groups", () => HttpResponse.json([{ invalid: true }])));
    await expect(getGroups()).rejects.toThrow();
  });

  it("lança ApiError em resposta 500", async () => {
    server.use(http.get("/groups", () => new HttpResponse(null, { status: 500 })));
    await expect(getGroups()).rejects.toThrow();
  });
});

// ─── getGroupStandings ────────────────────────────────────────────────────────

describe("getGroupStandings", () => {
  it("retorna 4 times para o Grupo A", async () => {
    const result = await getGroupStandings("A");
    expect(result).toHaveLength(4);
  });

  it("standings estão ordenados por posição (1-4)", async () => {
    const result = await getGroupStandings("A");
    expect(result[0].position).toBe(1);
    expect(result[3].position).toBe(4);
  });

  it("todos os standings possuem qualificationStatus válido", async () => {
    const result = await getGroupStandings("A");
    const validStatuses = ["qualified", "playoff", "eliminated", "pending"];
    for (const s of result) {
      expect(validStatuses).toContain(s.qualificationStatus);
    }
  });

  it("retorna standings do Grupo B", async () => {
    const result = await getGroupStandings("B");
    expect(result).toHaveLength(groupStandingsMockData["B"].length);
  });

  it("lança erro ao receber payload inválido", async () => {
    server.use(http.get("/groups/:letter/standings", () => HttpResponse.json([{ invalid: true }])));
    await expect(getGroupStandings("A")).rejects.toThrow();
  });

  it("lança ApiError em 404", async () => {
    server.use(
      http.get("/groups/:letter/standings", () => new HttpResponse(null, { status: 404 }))
    );
    await expect(getGroupStandings("Z")).rejects.toThrow();
  });
});

// ─── getGroupMatches ──────────────────────────────────────────────────────────

describe("getGroupMatches", () => {
  it("retorna 6 partidas para o Grupo A", async () => {
    const result = await getGroupMatches("A");
    expect(result).toHaveLength(6);
  });

  it("todas as partidas possuem homeTeam e awayTeam", async () => {
    const result = await getGroupMatches("A");
    for (const match of result) {
      expect(match.homeTeam).toBeDefined();
      expect(match.awayTeam).toBeDefined();
    }
  });

  it("partidas terminadas possuem score", async () => {
    const result = await getGroupMatches("A");
    const finished = result.filter((m) => m.status === "finished");
    for (const match of finished) {
      expect(match.score).toBeDefined();
    }
  });

  it("retorna partidas do Grupo B", async () => {
    const result = await getGroupMatches("B");
    expect(result).toHaveLength(groupMatchesMockData["B"].length);
  });

  it("lança erro ao receber payload inválido", async () => {
    server.use(http.get("/groups/:letter/matches", () => HttpResponse.json([{ invalid: true }])));
    await expect(getGroupMatches("A")).rejects.toThrow();
  });

  it("lança ApiError em 404", async () => {
    server.use(http.get("/groups/:letter/matches", () => new HttpResponse(null, { status: 404 })));
    await expect(getGroupMatches("Z")).rejects.toThrow();
  });
});
