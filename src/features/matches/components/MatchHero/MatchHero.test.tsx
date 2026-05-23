import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { matchesMockData } from "../../data";
import { MatchHero } from "./MatchHero";

const upcomingMatch = matchesMockData.find((m) => m.status === "upcoming")!;
const liveMatch = matchesMockData.find((m) => m.status === "live")!;
const finishedMatch = matchesMockData.find((m) => m.status === "finished")!;

afterEach(() => cleanup());

describe("MatchHero", () => {
  it("renderiza as emojis de bandeira das equipes", () => {
    render(<MatchHero match={upcomingMatch} />);
    expect(screen.getByLabelText(`${upcomingMatch.homeTeam.name} flag`)).toBeInTheDocument();
    expect(screen.getByLabelText(`${upcomingMatch.awayTeam.name} flag`)).toBeInTheDocument();
  });

  it("renderiza o nome abreviado das equipes", () => {
    render(<MatchHero match={upcomingMatch} />);
    expect(screen.getByText(upcomingMatch.homeTeam.shortName)).toBeInTheDocument();
    expect(screen.getByText(upcomingMatch.awayTeam.shortName)).toBeInTheDocument();
  });

  it("renderiza o venue e cidade", () => {
    render(<MatchHero match={upcomingMatch} />);
    expect(screen.getByText(new RegExp(upcomingMatch.venue))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(upcomingMatch.city))).toBeInTheDocument();
  });

  it("renderiza o round da partida", () => {
    render(<MatchHero match={upcomingMatch} />);
    expect(screen.getByText(upcomingMatch.round)).toBeInTheDocument();
  });

  it("exibe badge Live para partida ao vivo", () => {
    render(<MatchHero match={liveMatch} />);
    expect(screen.getByLabelText("Match status: live")).toBeInTheDocument();
  });

  it("exibe placar para partida encerrada", () => {
    render(<MatchHero match={finishedMatch} />);
    const score = finishedMatch.score!;
    expect(screen.getByLabelText(`Score: ${score.home} - ${score.away}`)).toBeInTheDocument();
  });

  it("tem section com aria-label das equipes", () => {
    render(<MatchHero match={upcomingMatch} />);
    expect(
      screen.getByRole("region", {
        name: `${upcomingMatch.homeTeam.name} vs ${upcomingMatch.awayTeam.name}`,
      })
    ).toBeInTheDocument();
  });
});
