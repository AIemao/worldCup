import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { TeamDetailsPage } from "./TeamDetailsPage";

function renderPage(teamId = "bra") {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[`/teams/${teamId}`]}>
        <Routes>
          <Route path="/teams/:teamId" element={<TeamDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe("TeamDetailsPage", () => {
  it("exibe o nome da seleção no heading", async () => {
    renderPage();
    await waitFor(() => {
      const headings = screen.getAllByRole("heading", { name: /Brazil/i });
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  it("exibe o link de volta para Teams", async () => {
    renderPage();
    await waitFor(() => {
      const backLink = screen.getByRole("link", { name: /Back to Teams/i });
      expect(backLink).toBeDefined();
    });
  });

  it("exibe a aba Squad ativa por padrão", async () => {
    renderPage();
    await waitFor(() => {
      const tab = screen.getByRole("tab", { name: /Squad/i });
      expect(tab.getAttribute("aria-selected")).toBe("true");
    });
  });

  it("exibe jogadores após carregar a aba Squad", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("Ederson")).toBeDefined();
    });
  });

  it("navega para a aba Schedule ao clicar", async () => {
    const user = userEvent.setup();
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("tab", { name: /Schedule/i })).toBeDefined();
    });
    await user.click(screen.getByRole("tab", { name: /Schedule/i }));
    await waitFor(() => {
      const tab = screen.getByRole("tab", { name: /Schedule/i });
      expect(tab.getAttribute("aria-selected")).toBe("true");
    });
  });

  it("navega para a aba Results ao clicar", async () => {
    const user = userEvent.setup();
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("tab", { name: /Results/i })).toBeDefined();
    });
    await user.click(screen.getByRole("tab", { name: /Results/i }));
    await waitFor(() => {
      const tab = screen.getByRole("tab", { name: /Results/i });
      expect(tab.getAttribute("aria-selected")).toBe("true");
    });
  });

  it("exibe 'Team not found' para teamId inválido", async () => {
    // The MSW handler returns 404 for unknown teamIds naturally
    // retry:1 in the hook means React Query retries once, so we wait up to 15s
    renderPage("invalid");
    await waitFor(
      () => {
        expect(screen.getAllByText(/Team not found/i).length).toBeGreaterThan(0);
      },
      { timeout: 12000 }
    );
  }, 15000);

  it("exibe seção de estatísticas", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("region", { name: /Team statistics/i })).toBeDefined();
    });
  });
});
