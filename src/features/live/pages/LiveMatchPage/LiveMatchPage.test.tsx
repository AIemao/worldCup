import { server } from "@/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { liveMatchesMockData } from "../../data";
import { LiveMatchPage } from "./LiveMatchPage";

const liveMatch = liveMatchesMockData[0];

function renderLiveMatchPage(matchId: string) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[`/live/${matchId}`]}>
        <Routes>
          <Route path="/live/:matchId" element={<LiveMatchPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe("LiveMatchPage", () => {
  it("exibe o hero com badge LIVE após carregamento", async () => {
    renderLiveMatchPage(liveMatch.id);
    await waitFor(() =>
      expect(
        screen.getByLabelText(`Live: ${liveMatch.homeTeam.name} vs ${liveMatch.awayTeam.name}`)
      ).toBeInTheDocument()
    );
  });

  it("exibe o placar da partida", async () => {
    renderLiveMatchPage(liveMatch.id);
    await waitFor(() =>
      expect(
        screen.getByLabelText(`Score: ${liveMatch.score.home} to ${liveMatch.score.away}`)
      ).toBeInTheDocument()
    );
  });

  it("exibe o link de volta para Live Center", async () => {
    renderLiveMatchPage(liveMatch.id);
    await waitFor(() =>
      expect(screen.getByRole("link", { name: /back to live center/i })).toBeInTheDocument()
    );
  });

  it("exibe as estatísticas da partida", async () => {
    renderLiveMatchPage(liveMatch.id);
    await waitFor(() => expect(screen.getByLabelText("Match statistics")).toBeInTheDocument());
  });

  it("exibe o feed de eventos", async () => {
    renderLiveMatchPage(liveMatch.id);
    await waitFor(() =>
      expect(screen.getByRole("list", { name: "Match events" })).toBeInTheDocument()
    );
  });

  it("exibe o painel de insights de IA", async () => {
    renderLiveMatchPage(liveMatch.id);
    await waitFor(() => expect(screen.getByLabelText("AI insights panel")).toBeInTheDocument());
  });

  it("exibe ErrorFallback em caso de erro", async () => {
    server.use(http.get("/live/:matchId", () => new HttpResponse(null, { status: 500 })));
    renderLiveMatchPage("wc26-live-01");
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });

  it("exibe mensagem de not found para ID inexistente", async () => {
    renderLiveMatchPage("nonexistent-match-id");
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });
});
