import { liveMatchesMockData } from "@/features/live/data";
import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { useLiveMatch } from "./useLiveMatch";
import { useLiveMatches } from "./useLiveMatches";

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

describe("useLiveMatches", () => {
  it("começa em estado de loading", () => {
    server.use(http.get("/live", async () => new Promise(() => undefined)));
    const { result } = renderHook(() => useLiveMatches(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("retorna a lista de partidas ao vivo após sucesso", async () => {
    const { result } = renderHook(() => useLiveMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toHaveLength(liveMatchesMockData.length);
  });

  it("todas as partidas retornadas têm status='live'", async () => {
    const { result } = renderHook(() => useLiveMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    result.current.data?.forEach((m) => expect(m.status).toBe("live"));
  });

  it("entra em estado de erro quando a API falha", async () => {
    server.use(http.get("/live", () => new HttpResponse(null, { status: 503 })));
    const { result } = renderHook(() => useLiveMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});

describe("useLiveMatch", () => {
  const target = liveMatchesMockData[0];

  it("começa em estado de loading", () => {
    server.use(http.get("/live/:matchId", async () => new Promise(() => undefined)));
    const { result } = renderHook(() => useLiveMatch(target.id), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });

  it("retorna a partida correta após sucesso", async () => {
    const { result } = renderHook(() => useLiveMatch(target.id), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.id).toBe(target.id);
    expect(result.current.data?.status).toBe("live");
  });

  it("não executa query quando matchId está vazio", () => {
    const { result } = renderHook(() => useLiveMatch(""), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it("entra em estado de erro quando a partida não existe", async () => {
    const { result } = renderHook(() => useLiveMatch("nonexistent"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
