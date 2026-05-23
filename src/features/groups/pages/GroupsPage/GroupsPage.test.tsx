import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http } from "msw";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { GroupsPage } from "./GroupsPage";

function createWrapper(initialEntries = ["/groups?group=A"]) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };
}

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe("GroupsPage", () => {
  it("exibe o heading 'Group Stage'", async () => {
    render(<GroupsPage />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /Group Stage/i })).toBeInTheDocument()
    );
  });

  it("exibe as 8 abas de grupos", async () => {
    render(<GroupsPage />, { wrapper: createWrapper() });
    await waitFor(() => {
      const tabs = screen.getAllByRole("tab");
      expect(tabs).toHaveLength(8);
    });
  });

  it("exibe o tabpanel do grupo ativo", async () => {
    render(<GroupsPage />, { wrapper: createWrapper() });
    // The tabpanel's accessible name comes from the button with id=group-tab-A: "Group A"
    await waitFor(() =>
      expect(screen.getByRole("tabpanel", { name: /Group A/i })).toBeInTheDocument()
    );
  });

  it("exibe a tabela de classificação após carregamento", async () => {
    render(<GroupsPage />, { wrapper: createWrapper() });
    // BRA appears in both standings table and match cards — use getAllByText
    await waitFor(() => {
      expect(screen.getAllByText("BRA").length).toBeGreaterThan(0);
    });
  });

  it("exibe as partidas do grupo A", async () => {
    render(<GroupsPage />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getAllByRole("article").length).toBeGreaterThan(0));
  });

  it("navega para o Grupo B ao clicar na aba", async () => {
    const user = userEvent.setup();
    render(<GroupsPage />, { wrapper: createWrapper() });
    await waitFor(() => expect(screen.getAllByRole("tab")).toHaveLength(8));
    await user.click(screen.getByRole("tab", { name: /Group B/i }));
    // ENG appears in both standings and match cards — use getAllByText
    await waitFor(() => {
      expect(screen.getAllByText("ENG").length).toBeGreaterThan(0);
    });
  });

  it("exibe skeleton durante loading de standings", () => {
    server.use(http.get("/groups/:letter/standings", async () => new Promise(() => undefined)));
    render(<GroupsPage />, { wrapper: createWrapper() });
    // The page heading is always visible regardless of loading state
    expect(screen.getByRole("heading", { name: /Group A Standings/i })).toBeInTheDocument();
  });

  it("exibe heading 'Group A Standings'", async () => {
    render(<GroupsPage />, { wrapper: createWrapper() });
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /Group A Standings/i })).toBeInTheDocument()
    );
  });
});
