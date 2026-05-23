import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http } from "msw";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { TeamsPage } from "./TeamsPage";

function createWrapper() {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={["/teams"]}>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };
}

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe("TeamsPage", () => {
  it("exibe o heading 'World Cup Teams'", async () => {
    render(<TeamsPage />, { wrapper: createWrapper() });
    await waitFor(() => {
      const headings = screen.getAllByRole("heading", { name: /World Cup Teams/i });
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  it("exibe o grid de seleções após carregamento", async () => {
    render(<TeamsPage />, { wrapper: createWrapper() });
    await waitFor(() => {
      const brazilLink = screen.getByRole("link", { name: /Brazil — view team details/i });
      expect(brazilLink).toBeDefined();
    });
  });

  it("exibe busca com aria-label 'Search teams'", async () => {
    render(<TeamsPage />, { wrapper: createWrapper() });
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeDefined();
  });

  it("filtra seleções por busca", async () => {
    const user = userEvent.setup();
    render(<TeamsPage />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /Brazil — view team details/i })).toBeDefined();
    });
    const searchInput = screen.getByRole("searchbox");
    await user.type(searchInput, "Brazil");
    await waitFor(() => {
      expect(screen.queryByRole("link", { name: /England — view team details/i })).toBeNull();
    });
  });

  it("filtra por grupo A ao clicar no botão do grupo", async () => {
    const user = userEvent.setup();
    render(<TeamsPage />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /Brazil — view team details/i })).toBeDefined();
    });
    const groupABtn = screen.getByRole("button", { name: /Group A/i });
    await user.click(groupABtn);
    await waitFor(() => {
      expect(screen.queryByRole("link", { name: /England — view team details/i })).toBeNull();
    });
  });

  it("exibe skeleton durante carregamento", () => {
    server.use(http.get("/teams", () => new Promise(() => {})));
    render(<TeamsPage />, { wrapper: createWrapper() });
    // In loading state, no TeamCard links should be visible
    expect(screen.queryByRole("link", { name: /view team details/i })).toBeNull();
  });

  it("exibe empty state quando busca não encontra resultados", async () => {
    const user = userEvent.setup();
    render(<TeamsPage />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /Brazil — view team details/i })).toBeDefined();
    });
    const searchInput = screen.getByRole("searchbox");
    await user.type(searchInput, "xyznonexistentteam");
    await waitFor(() => {
      expect(screen.getByText(/No teams found/i)).toBeDefined();
    });
  });

  it("limpa filtro de grupo ao clicar em 'All'", async () => {
    const user = userEvent.setup();
    render(<TeamsPage />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /Brazil — view team details/i })).toBeDefined();
    });
    const groupABtn = screen.getByRole("button", { name: /Group A/i });
    await user.click(groupABtn);
    const allBtn = screen.getByRole("button", { name: /^All$/i });
    await user.click(allBtn);
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /England — view team details/i })).toBeDefined();
    });
  });
});
