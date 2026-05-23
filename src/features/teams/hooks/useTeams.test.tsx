import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import {
  teamPlayersMockData,
  teamResultsMockData,
  teamScheduleMockData,
  teamsMockData,
} from "../data";
import { useTeam } from "./useTeam";
import { useTeamPlayers } from "./useTeamPlayers";
import { useTeamResults } from "./useTeamResults";
import { useTeams } from "./useTeams";
import { useTeamSchedule } from "./useTeamSchedule";

function createWrapper() {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
  };
}

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// ─── useTeams ─────────────────────────────────────────────────────────────────

describe("useTeams", () => {
  it("começa em loading", () => {
    const { result } = renderHook(() => useTeams(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it("retorna todas as seleções após carregamento", async () => {
    const { result } = renderHook(() => useTeams(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(teamsMockData.length);
  });

  it("isError=true em falha de API", async () => {
    server.use(http.get("/teams", () => new HttpResponse(null, { status: 500 })));
    const { result } = renderHook(() => useTeams(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 10000 });
  }, 15000);
});

// ─── useTeam ──────────────────────────────────────────────────────────────────

describe("useTeam", () => {
  it("retorna o Brasil ao buscar por 'bra'", async () => {
    const { result } = renderHook(() => useTeam("bra"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.id).toBe("bra");
    expect(result.current.data?.name).toBe("Brazil");
  });

  it("não executa query com id vazio", () => {
    const { result } = renderHook(() => useTeam(""), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it("isError=true para seleção inexistente", async () => {
    server.use(http.get("/teams/:teamId", () => new HttpResponse(null, { status: 404 })));
    const { result } = renderHook(() => useTeam("invalid"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 10000 });
  }, 15000);
});

// ─── useTeamPlayers ───────────────────────────────────────────────────────────

describe("useTeamPlayers", () => {
  it("retorna jogadores do Brasil", async () => {
    const { result } = renderHook(() => useTeamPlayers("bra"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(teamPlayersMockData["bra"].length);
  });

  it("não executa query com id vazio", () => {
    const { result } = renderHook(() => useTeamPlayers(""), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toHaveLength(0);
  });
});

// ─── useTeamSchedule ─────────────────────────────────────────────────────────

describe("useTeamSchedule", () => {
  it("retorna partidas agendadas do Brasil", async () => {
    const { result } = renderHook(() => useTeamSchedule("bra"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(teamScheduleMockData["bra"].length);
  });

  it("não executa query com id vazio", () => {
    const { result } = renderHook(() => useTeamSchedule(""), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toHaveLength(0);
  });
});

// ─── useTeamResults ───────────────────────────────────────────────────────────

describe("useTeamResults", () => {
  it("retorna resultados do Brasil", async () => {
    const { result } = renderHook(() => useTeamResults("bra"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(teamResultsMockData["bra"].length);
  });

  it("não executa query com id vazio", () => {
    const { result } = renderHook(() => useTeamResults(""), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toHaveLength(0);
  });
});
