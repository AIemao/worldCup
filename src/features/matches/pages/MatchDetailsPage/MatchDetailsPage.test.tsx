import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { matchesMockData } from "../../data";
import { MatchDetailsPage } from "./MatchDetailsPage";

const finishedMatch = matchesMockData.find((m) => m.status === "finished" && m.stats)!;

function renderDetailsPage(matchId: string) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[`/matches/${matchId}`]}>
        <Routes>
          <Route path="/matches/:matchId" element={<MatchDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe("MatchDetailsPage", () => {
  it("exibe os dados da partida após carregamento", async () => {
    renderDetailsPage(finishedMatch.id);
    await waitFor(() =>
      expect(screen.getByRole("article", { name: /match details/i })).toBeInTheDocument()
    );
    expect(screen.getAllByText(finishedMatch.homeTeam.shortName).length).toBeGreaterThan(0);
    expect(screen.getAllByText(finishedMatch.awayTeam.shortName).length).toBeGreaterThan(0);
  });

  it("exibe link de volta para All Matches", async () => {
    renderDetailsPage(finishedMatch.id);
    await waitFor(() =>
      expect(screen.getByRole("article", { name: /match details/i })).toBeInTheDocument()
    );
    expect(screen.getByRole("link", { name: /back to all matches/i })).toBeInTheDocument();
  });

  it("exibe ErrorFallback em caso de erro", async () => {
    server.use(http.get("/matches/:matchId", () => new HttpResponse(null, { status: 500 })));
    renderDetailsPage("wc26-m01");
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });

  it("exibe mensagem de not found para ID inexistente", async () => {
    renderDetailsPage("nonexistent-match-id");
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });

  it("exibe estatísticas quando disponíveis", async () => {
    renderDetailsPage(finishedMatch.id);
    await waitFor(() => expect(screen.getByText("Match Statistics")).toBeInTheDocument());
  });
});
