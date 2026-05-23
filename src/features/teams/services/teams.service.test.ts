import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it } from "vitest";
import {
  teamPlayersMockData,
  teamResultsMockData,
  teamScheduleMockData,
  teamsMockData,
} from "../data";
import {
  getTeam,
  getTeamPlayers,
  getTeamResults,
  getTeams,
  getTeamSchedule,
} from "./teams.service";

afterEach(() => server.resetHandlers());

// ─── getTeams ─────────────────────────────────────────────────────────────────

describe("getTeams", () => {
  it("retorna a lista completa de seleções", async () => {
    const result = await getTeams();
    expect(result).toHaveLength(teamsMockData.length);
  });

  it("retorna 32 seleções", async () => {
    const result = await getTeams();
    expect(result).toHaveLength(32);
  });

  it("cada seleção possui id, name, badge e flagEmoji", async () => {
    const result = await getTeams();
    for (const team of result) {
      expect(team).toHaveProperty("id");
      expect(team).toHaveProperty("name");
      expect(team).toHaveProperty("badge");
      expect(team).toHaveProperty("flagEmoji");
    }
  });

  it("lança erro ao receber payload inválido", async () => {
    server.use(http.get("/teams", () => HttpResponse.json([{ invalid: true }])));
    await expect(getTeams()).rejects.toThrow();
  });

  it("lança ApiError em resposta 500", async () => {
    server.use(http.get("/teams", () => new HttpResponse(null, { status: 500 })));
    await expect(getTeams()).rejects.toThrow();
  });
});

// ─── getTeam ──────────────────────────────────────────────────────────────────

describe("getTeam", () => {
  it("retorna o Brasil pelo id 'bra'", async () => {
    const result = await getTeam("bra");
    expect(result.id).toBe("bra");
    expect(result.name).toBe("Brazil");
  });

  it("retorna a Inglaterra pelo id 'eng'", async () => {
    const result = await getTeam("eng");
    expect(result.id).toBe("eng");
    expect(result.name).toBe("England");
  });

  it("a seleção retornada possui stats", async () => {
    const result = await getTeam("bra");
    expect(result.stats).toBeDefined();
    expect(result.stats?.wins).toBeGreaterThanOrEqual(0);
  });

  it("lança ApiError em 404 para teamId inválido", async () => {
    server.use(http.get("/teams/:teamId", () => new HttpResponse(null, { status: 404 })));
    await expect(getTeam("invalid")).rejects.toThrow();
  });

  it("lança erro ao receber payload inválido", async () => {
    server.use(http.get("/teams/:teamId", () => HttpResponse.json({ invalid: true })));
    await expect(getTeam("bra")).rejects.toThrow();
  });
});

// ─── getTeamPlayers ───────────────────────────────────────────────────────────

describe("getTeamPlayers", () => {
  it("retorna 5 jogadores para o Brasil", async () => {
    const result = await getTeamPlayers("bra");
    expect(result).toHaveLength(teamPlayersMockData["bra"].length);
  });

  it("cada jogador possui id, name, position e teamId", async () => {
    const result = await getTeamPlayers("bra");
    for (const player of result) {
      expect(player).toHaveProperty("id");
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("position");
      expect(player).toHaveProperty("teamId");
    }
  });

  it("posições são válidas", async () => {
    const result = await getTeamPlayers("bra");
    const validPositions = ["goalkeeper", "defender", "midfielder", "forward"];
    for (const player of result) {
      expect(validPositions).toContain(player.position);
    }
  });

  it("retorna lista vazia para time sem jogadores cadastrados", async () => {
    server.use(http.get("/teams/:teamId/players", () => HttpResponse.json([])));
    const result = await getTeamPlayers("unknown");
    expect(result).toHaveLength(0);
  });

  it("lança ApiError em 500", async () => {
    server.use(http.get("/teams/:teamId/players", () => new HttpResponse(null, { status: 500 })));
    await expect(getTeamPlayers("bra")).rejects.toThrow();
  });
});

// ─── getTeamSchedule ──────────────────────────────────────────────────────────

describe("getTeamSchedule", () => {
  it("retorna 3 partidas agendadas para o Brasil", async () => {
    const result = await getTeamSchedule("bra");
    expect(result).toHaveLength(teamScheduleMockData["bra"].length);
  });

  it("todas as partidas têm status 'upcoming'", async () => {
    const result = await getTeamSchedule("bra");
    for (const match of result) {
      expect(match.status).toBe("upcoming");
    }
  });

  it("retorna lista vazia quando não há partidas agendadas", async () => {
    server.use(http.get("/teams/:teamId/schedule", () => HttpResponse.json([])));
    const result = await getTeamSchedule("unknown");
    expect(result).toHaveLength(0);
  });

  it("lança ApiError em 500", async () => {
    server.use(http.get("/teams/:teamId/schedule", () => new HttpResponse(null, { status: 500 })));
    await expect(getTeamSchedule("bra")).rejects.toThrow();
  });
});

// ─── getTeamResults ───────────────────────────────────────────────────────────

describe("getTeamResults", () => {
  it("retorna 3 resultados para o Brasil", async () => {
    const result = await getTeamResults("bra");
    expect(result).toHaveLength(teamResultsMockData["bra"].length);
  });

  it("todos os resultados têm status 'finished'", async () => {
    const result = await getTeamResults("bra");
    for (const match of result) {
      expect(match.status).toBe("finished");
    }
  });

  it("cada resultado possui placar", async () => {
    const result = await getTeamResults("bra");
    for (const match of result) {
      expect(match.score).toBeDefined();
      expect(typeof match.score.home).toBe("number");
      expect(typeof match.score.away).toBe("number");
    }
  });

  it("retorna lista vazia quando não há resultados", async () => {
    server.use(http.get("/teams/:teamId/results", () => HttpResponse.json([])));
    const result = await getTeamResults("unknown");
    expect(result).toHaveLength(0);
  });

  it("lança ApiError em 500", async () => {
    server.use(http.get("/teams/:teamId/results", () => new HttpResponse(null, { status: 500 })));
    await expect(getTeamResults("bra")).rejects.toThrow();
  });
});
