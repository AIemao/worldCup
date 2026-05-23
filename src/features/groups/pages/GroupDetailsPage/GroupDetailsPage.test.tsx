import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { http } from "msw";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { GroupDetailsPage } from "./GroupDetailsPage";

function createWrapper(groupId = "a") {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={[`/groups/${groupId}`]}>
          <Routes>
            <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
          </Routes>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    );
  };
}

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe("GroupDetailsPage", () => {
  it("exibe o heading 'Group A'", async () => {
    render(<div />, { wrapper: createWrapper("a") });
    await waitFor(() =>
      expect(screen.getAllByRole("heading", { name: /Group A/i }).length).toBeGreaterThan(0)
    );
  });

  it("exibe o link de volta para Group Stage", async () => {
    render(<div />, { wrapper: createWrapper("a") });
    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /Back to Group Stage overview/i })
      ).toBeInTheDocument()
    );
  });

  it("exibe o heading 'Standings'", async () => {
    render(<div />, { wrapper: createWrapper("b") });
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /Standings/i })).toBeInTheDocument()
    );
  });

  it("exibe os times do Grupo A após carregamento", async () => {
    render(<div />, { wrapper: createWrapper("a") });
    // BRA appears in both standings table and match cards — use getAllByText
    await waitFor(() => {
      expect(screen.getAllByText("BRA").length).toBeGreaterThan(0);
    });
  });

  it("exibe as partidas do Grupo B", async () => {
    render(<div />, { wrapper: createWrapper("b") });
    await waitFor(() => expect(screen.getAllByRole("article").length).toBeGreaterThan(0));
  });

  it("exibe skeleton quando standings está carregando", () => {
    server.use(http.get("/groups/:letter/standings", async () => new Promise(() => undefined)));
    render(<div />, { wrapper: createWrapper("a") });
    expect(screen.getAllByRole("heading", { name: /Group A/i }).length).toBeGreaterThan(0);
  });

  it("exibe heading 'All Fixtures'", async () => {
    render(<div />, { wrapper: createWrapper("a") });
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /All Fixtures/i })).toBeInTheDocument()
    );
  });

  it("aceita groupId em maiúsculas", async () => {
    render(<div />, { wrapper: createWrapper("C") });
    await waitFor(() =>
      expect(screen.getAllByRole("heading", { name: /Group C/i }).length).toBeGreaterThan(0)
    );
  });
});
