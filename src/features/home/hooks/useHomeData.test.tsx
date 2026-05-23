import { homeMockData } from "@/features/home/data/home.mock";
import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { useHomeData } from "./useHomeData";

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

describe("useHomeData", () => {
  it("começa em estado de loading", () => {
    server.use(
      http.get("/home", async () => {
        await new Promise(() => undefined); // nunca resolve
      })
    );

    const { result } = renderHook(() => useHomeData(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("retorna HomeData após sucesso", async () => {
    server.use(http.get("/home", () => HttpResponse.json(homeMockData)));

    const { result } = renderHook(() => useHomeData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(false);
    expect(result.current.data?.featuredMatch?.id).toBe("wc26-opening-match");
    expect(result.current.data?.stats).toHaveLength(4);
  });

  it("entra em estado de erro quando o servidor falha", async () => {
    server.use(http.get("/home", () => new HttpResponse(null, { status: 500 })));

    const { result } = renderHook(() => useHomeData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("entra em erro quando o schema é inválido", async () => {
    server.use(http.get("/home", () => HttpResponse.json({ invalid: "data" })));

    const { result } = renderHook(() => useHomeData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it("expõe função refetch", async () => {
    server.use(http.get("/home", () => HttpResponse.json(homeMockData)));

    const { result } = renderHook(() => useHomeData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      result.current.refetch();
    });

    expect(result.current.data).toBeDefined();
  });
});
