import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { MatchesPage } from "./MatchesPage";

function createWrapper() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
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

describe("MatchesPage", () => {
  it("exibe skeleton durante loading", () => {
    server.use(http.get("/matches", async () => new Promise(() => undefined)));
    render(<MatchesPage />, { wrapper: createWrapper() });
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("exibe o heading de Matches após carregamento", async () => {
    render(<MatchesPage />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /matches/i })).toBeInTheDocument()
    );
  });

  it("exibe os cards de partidas após carregamento", async () => {
    render(<MatchesPage />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getAllByRole("link", { name: /match details/i }).length).toBeGreaterThan(0)
    );
  });

  it("exibe ErrorFallback em caso de erro", async () => {
    server.use(http.get("/matches", () => new HttpResponse(null, { status: 500 })));
    render(<MatchesPage />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });

  it("filtragem por 'live' exibe apenas partidas ao vivo", async () => {
    render(<MatchesPage />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getAllByRole("link", { name: /match details/i }).length).toBeGreaterThan(0)
    );
    const statusSelect = screen.getByLabelText(/filter by match status/i);
    await userEvent.selectOptions(statusSelect, "live");
    const badges = screen.getAllByLabelText("Match status: live");
    expect(badges.length).toBeGreaterThan(0);
  });

  it("exibe EmptyMatchesState quando filtro não tem resultados", async () => {
    render(<MatchesPage />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getAllByRole("link", { name: /match details/i }).length).toBeGreaterThan(0)
    );
    const searchInput = screen.getByPlaceholderText(/search/i);
    await userEvent.type(searchInput, "nonexistent-team-xyz-qwerty");
    await waitFor(() => expect(screen.getByText("No matches")).toBeInTheDocument());
  });
});
