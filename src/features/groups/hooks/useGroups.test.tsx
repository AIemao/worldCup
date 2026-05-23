import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { groupMatchesMockData, groupsMockData, groupStandingsMockData } from "../data";
import { useGroupMatches } from "./useGroupMatches";
import { useGroups } from "./useGroups";
import { useGroupStandings } from "./useGroupStandings";

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

// ─── useGroups ────────────────────────────────────────────────────────────────

describe("useGroups", () => {
  it("começa em loading", () => {
    const { result } = renderHook(() => useGroups(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it("retorna os grupos após carregamento", async () => {
    const { result } = renderHook(() => useGroups(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(groupsMockData.length);
  });

  it("isError=false em carregamento bem-sucedido", async () => {
    const { result } = renderHook(() => useGroups(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(false);
  });

  it("isError=true em falha de API", async () => {
    server.use(http.get("/groups", () => new HttpResponse(null, { status: 500 })));
    const { result } = renderHook(() => useGroups(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

// ─── useGroupStandings ────────────────────────────────────────────────────────

describe("useGroupStandings", () => {
  it("começa em loading para groupLetter válido", () => {
    const { result } = renderHook(() => useGroupStandings("A"), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it("retorna standings do grupo A", async () => {
    const { result } = renderHook(() => useGroupStandings("A"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(groupStandingsMockData["A"].length);
  });

  it("não executa query se groupLetter estiver vazio", () => {
    const { result } = renderHook(() => useGroupStandings(""), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it("isError=true em falha de API", async () => {
    server.use(
      http.get("/groups/:letter/standings", () => new HttpResponse(null, { status: 500 }))
    );
    const { result } = renderHook(() => useGroupStandings("A"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

// ─── useGroupMatches ──────────────────────────────────────────────────────────

describe("useGroupMatches", () => {
  it("começa em loading para groupLetter válido", () => {
    const { result } = renderHook(() => useGroupMatches("A"), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it("retorna partidas do grupo A", async () => {
    const { result } = renderHook(() => useGroupMatches("A"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(groupMatchesMockData["A"].length);
  });

  it("não executa query se groupLetter estiver vazio", () => {
    const { result } = renderHook(() => useGroupMatches(""), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it("isError=true em falha de API", async () => {
    server.use(http.get("/groups/:letter/matches", () => new HttpResponse(null, { status: 500 })));
    const { result } = renderHook(() => useGroupMatches("A"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
