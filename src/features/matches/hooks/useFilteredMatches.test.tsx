import { matchesMockData } from "@/features/matches/data";
import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { useFilteredMatches } from "./useFilteredMatches";

function createWrapper() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
  };
}

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe("useFilteredMatches", () => {
  it("retorna todos os matches quando sem filtros ativos", async () => {
    const { result } = renderHook(() => useFilteredMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.matches).toHaveLength(matchesMockData.length);
  });

  it("filtra por status 'live'", async () => {
    const { result } = renderHook(() => useFilteredMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.updateFilters({ status: "live" }));

    const liveCount = matchesMockData.filter((m) => m.status === "live").length;
    expect(result.current.matches).toHaveLength(liveCount);
    result.current.matches.forEach((m) => expect(m.status).toBe("live"));
  });

  it("filtra por status 'finished'", async () => {
    const { result } = renderHook(() => useFilteredMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.updateFilters({ status: "finished" }));

    result.current.matches.forEach((m) => expect(m.status).toBe("finished"));
  });

  it("filtra por stage 'final'", async () => {
    const { result } = renderHook(() => useFilteredMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.updateFilters({ stage: "final" }));

    expect(result.current.matches).toHaveLength(1);
    expect(result.current.matches[0].stage).toBe("final");
  });

  it("filtra por busca textual no nome da equipe", async () => {
    const { result } = renderHook(() => useFilteredMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.updateFilters({ search: "Brazil" }));

    result.current.matches.forEach((m) => {
      const names = [m.homeTeam.name, m.awayTeam.name].map((n) => n.toLowerCase());
      expect(names.some((n) => n.includes("brazil"))).toBe(true);
    });
  });

  it("filtra por team ID", async () => {
    const { result } = renderHook(() => useFilteredMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.updateFilters({ team: "bra" }));

    result.current.matches.forEach((m) => {
      expect(m.homeTeam.id === "bra" || m.awayTeam.id === "bra").toBe(true);
    });
  });

  it("resetFilters restaura os filtros padrão", async () => {
    const { result } = renderHook(() => useFilteredMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.updateFilters({ status: "live", stage: "semi_final" }));
    expect(result.current.filters.status).toBe("live");

    act(() => result.current.resetFilters());
    expect(result.current.filters.status).toBe("all");
    expect(result.current.filters.stage).toBe("all");
  });

  it("retorna array vazio quando nenhum match corresponde", async () => {
    const { result } = renderHook(() => useFilteredMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.updateFilters({ search: "nonexistent-team-xyz" }));
    expect(result.current.matches).toHaveLength(0);
  });

  it("entra em estado de erro quando a API falha", async () => {
    server.use(http.get("/matches", () => new HttpResponse(null, { status: 500 })));
    const { result } = renderHook(() => useFilteredMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
