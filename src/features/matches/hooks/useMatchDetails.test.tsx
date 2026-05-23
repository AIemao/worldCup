import { matchesMockData } from "@/features/matches/data";
import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { useMatchDetails } from "./useMatchDetails";

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

describe("useMatchDetails", () => {
  it("não faz fetch quando matchId é undefined", () => {
    const { result } = renderHook(() => useMatchDetails(undefined), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it("retorna a partida correta após sucesso", async () => {
    const target = matchesMockData[0];
    const { result } = renderHook(() => useMatchDetails(target.id), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(result.current.data?.id).toBe(target.id);
  });

  it("entra em estado de erro para ID inválido (404)", async () => {
    const { result } = renderHook(() => useMatchDetails("nonexistent"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it("expõe a função refetch", async () => {
    const target = matchesMockData[0];
    const { result } = renderHook(() => useMatchDetails(target.id), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(typeof result.current.refetch).toBe("function");
  });
});
