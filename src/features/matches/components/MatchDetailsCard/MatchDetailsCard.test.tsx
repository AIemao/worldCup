import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { matchesMockData } from "../../data";
import { MatchDetailsCard } from "./MatchDetailsCard";

const finishedMatch = matchesMockData.find(
  (m) => m.status === "finished" && m.stats && m.events?.length
)!;
const upcomingMatch = matchesMockData.find((m) => m.status === "upcoming")!;

function renderCard(match = finishedMatch) {
  return render(
    <MemoryRouter>
      <MatchDetailsCard match={match} />
    </MemoryRouter>
  );
}

afterEach(() => cleanup());

describe("MatchDetailsCard", () => {
  it("renderiza o hero da partida", () => {
    renderCard();
    expect(screen.getByRole("region", { name: /vs/i })).toBeInTheDocument();
  });

  it("exibe a seção de estatísticas quando disponível", () => {
    renderCard(finishedMatch);
    expect(screen.getByText("Match Statistics")).toBeInTheDocument();
  });

  it("exibe a seção de timeline quando eventos estão disponíveis", () => {
    renderCard(finishedMatch);
    expect(screen.getByText("Timeline")).toBeInTheDocument();
  });

  it("exibe mensagem de upcoming quando partida não começou", () => {
    renderCard(upcomingMatch);
    expect(screen.getByText(/will be available once the game starts/i)).toBeInTheDocument();
  });

  it("tem aria-label de artigo de detalhe", () => {
    renderCard();
    expect(screen.getByRole("article", { name: /Match details:/i })).toBeInTheDocument();
  });
});
