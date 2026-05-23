import { matchesMockData } from "@/features/matches/data";
import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { useMatches } from "./useMatches";

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

describe("useMatches", () => {
  it("começa em estado de loading", () => {
    server.use(http.get("/matches", async () => new Promise(() => undefined)));
    const { result } = renderHook(() => useMatches(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("retorna a lista de partidas após sucesso", async () => {
    const { result } = renderHook(() => useMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toHaveLength(matchesMockData.length);
  });

  it("entra em estado de erro quando a API falha", async () => {
    server.use(http.get("/matches", () => new HttpResponse(null, { status: 503 })));
    const { result } = renderHook(() => useMatches(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});
