import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { matchesMockData } from "../../data";
import { MatchCard } from "./MatchCard";

const upcomingMatch = matchesMockData.find((m) => m.status === "upcoming")!;
const liveMatch = matchesMockData.find((m) => m.status === "live")!;
const finishedMatch = matchesMockData.find((m) => m.status === "finished")!;

function renderCard(match = upcomingMatch) {
  return render(
    <MemoryRouter>
      <MatchCard match={match} />
    </MemoryRouter>
  );
}

afterEach(() => cleanup());

describe("MatchCard", () => {
  it("renderiza os nomes abreviados das equipes", () => {
    renderCard();
    expect(screen.getByText(upcomingMatch.homeTeam.shortName)).toBeInTheDocument();
    expect(screen.getByText(upcomingMatch.awayTeam.shortName)).toBeInTheDocument();
  });

  it("renderiza as emojis de bandeira com aria-label", () => {
    renderCard();
    expect(screen.getByLabelText(`${upcomingMatch.homeTeam.name} flag`)).toBeInTheDocument();
    expect(screen.getByLabelText(`${upcomingMatch.awayTeam.name} flag`)).toBeInTheDocument();
  });

  it("exibe o badge 'Upcoming' para partida futura", () => {
    renderCard(upcomingMatch);
    expect(screen.getByLabelText("Match status: upcoming")).toBeInTheDocument();
  });

  it("exibe o badge 'Live' para partida ao vivo", () => {
    renderCard(liveMatch);
    expect(screen.getByLabelText("Match status: live")).toBeInTheDocument();
  });

  it("exibe o badge 'Final' para partida encerrada", () => {
    renderCard(finishedMatch);
    expect(screen.getByLabelText("Match status: finished")).toBeInTheDocument();
  });

  it("exibe o venue e cidade", () => {
    renderCard();
    expect(screen.getByText(new RegExp(upcomingMatch.venue))).toBeInTheDocument();
  });

  it("exibe o round da partida", () => {
    renderCard();
    expect(screen.getByText(upcomingMatch.round)).toBeInTheDocument();
  });

  it("possui link de detalhe acessível", () => {
    renderCard();
    const link = screen.getByRole("link", {
      name: new RegExp(
        `${upcomingMatch.homeTeam.shortName}.*${upcomingMatch.awayTeam.shortName}`,
        "i"
      ),
    });
    expect(link).toHaveAttribute("href", `/matches/${upcomingMatch.id}`);
  });
});
