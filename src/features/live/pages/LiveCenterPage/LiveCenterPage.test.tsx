import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { liveMatchesMockData } from "../../data";
import { LiveCenterPage } from "./LiveCenterPage";

function createWrapper() {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={qc}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };
}

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe("LiveCenterPage", () => {
  it("exibe skeleton durante loading", () => {
    server.use(http.get("/live", async () => new Promise(() => undefined)));
    render(<LiveCenterPage />, { wrapper: createWrapper() });
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("exibe o heading 'Live Now' após carregamento", async () => {
    render(<LiveCenterPage />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /live now/i })).toBeInTheDocument()
    );
  });

  it("exibe os cards de partidas ao vivo", async () => {
    render(<LiveCenterPage />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getAllByRole("link", { name: /live match/i }).length).toBeGreaterThan(0)
    );
  });

  it("exibe a contagem de partidas ao vivo", async () => {
    render(<LiveCenterPage />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getByText(String(liveMatchesMockData.length))).toBeInTheDocument()
    );
  });

  it("exibe o ticker de eventos ao vivo", async () => {
    render(<LiveCenterPage />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByLabelText("Live match ticker")).toBeInTheDocument());
  });

  it("exibe o grid de partidas ao vivo", async () => {
    render(<LiveCenterPage />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByLabelText("Live matches grid")).toBeInTheDocument());
  });

  it("exibe empty state quando não há partidas ao vivo", async () => {
    server.use(http.get("/live", () => HttpResponse.json([])));
    render(<LiveCenterPage />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByLabelText("No live matches")).toBeInTheDocument());
  });

  it("exibe ErrorFallback em caso de erro", async () => {
    server.use(http.get("/live", () => new HttpResponse(null, { status: 500 })));
    render(<LiveCenterPage />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });
});
