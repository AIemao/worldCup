import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { liveMatchesMockData } from "../../data";
import type { Momentum } from "../../types/live.types";
import { LiveMatchHero } from "./LiveMatchHero";

afterEach(() => cleanup());

const match = liveMatchesMockData[0];
const momentum: Momentum = { home: 65, away: 35, trend: "rising_home" };

describe("LiveMatchHero", () => {
  it("renderiza com aria-label da partida ao vivo", () => {
    render(<LiveMatchHero match={match} />);
    expect(
      screen.getByLabelText(`Live: ${match.homeTeam.name} vs ${match.awayTeam.name}`)
    ).toBeInTheDocument();
  });

  it("exibe o badge LIVE com o minuto atual", () => {
    render(<LiveMatchHero match={match} />);
    expect(screen.getByLabelText(`Live match, minute ${match.currentMinute}`)).toBeInTheDocument();
  });

  it("exibe o placar da partida", () => {
    render(<LiveMatchHero match={match} />);
    expect(
      screen.getByLabelText(`Score: ${match.score.home} to ${match.score.away}`)
    ).toBeInTheDocument();
  });

  it("exibe o shortName dos dois times", () => {
    render(<LiveMatchHero match={match} />);
    expect(screen.getByText(match.homeTeam.shortName)).toBeInTheDocument();
    expect(screen.getByText(match.awayTeam.shortName)).toBeInTheDocument();
  });

  it("exibe o round da partida", () => {
    render(<LiveMatchHero match={match} />);
    expect(screen.getByText(match.round)).toBeInTheDocument();
  });

  it("exibe o venue e a cidade", () => {
    render(<LiveMatchHero match={match} />);
    expect(screen.getByText(`${match.venue}, ${match.city}`)).toBeInTheDocument();
  });

  it("exibe a barra de momentum quando fornecida", () => {
    render(<LiveMatchHero match={match} momentum={momentum} />);
    expect(screen.getByText("Momentum")).toBeInTheDocument();
  });

  it("não exibe a barra de momentum quando não fornecida", () => {
    render(<LiveMatchHero match={match} />);
    expect(screen.queryByText("Momentum")).not.toBeInTheDocument();
  });
});
