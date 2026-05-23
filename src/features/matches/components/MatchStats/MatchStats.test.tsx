import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { MatchStats as MatchStatsData, TeamRef } from "../../types/match.types";
import { MatchStats } from "./MatchStats";

const homeTeam: TeamRef = {
  id: "bra",
  name: "Brazil",
  shortName: "BRA",
  flagEmoji: "🇧🇷",
  primaryColor: "#009C3B",
};

const awayTeam: TeamRef = {
  id: "ned",
  name: "Netherlands",
  shortName: "NED",
  flagEmoji: "🇳🇱",
  primaryColor: "#FF4F00",
};

const stats: MatchStatsData = {
  possession: { home: 55, away: 45 },
  shots: { home: 11, away: 9 },
  shotsOnTarget: { home: 5, away: 3 },
  corners: { home: 6, away: 4 },
  fouls: { home: 9, away: 10 },
  yellowCards: { home: 1, away: 1 },
  redCards: { home: 0, away: 0 },
};

afterEach(() => cleanup());

describe("MatchStats", () => {
  it("renderiza os nomes abreviados das equipes", () => {
    render(<MatchStats stats={stats} homeTeam={homeTeam} awayTeam={awayTeam} />);
    expect(screen.getByText("BRA")).toBeInTheDocument();
    expect(screen.getByText("NED")).toBeInTheDocument();
  });

  it("exibe os valores de posse de bola", () => {
    render(<MatchStats stats={stats} homeTeam={homeTeam} awayTeam={awayTeam} />);
    expect(screen.getByText("55%")).toBeInTheDocument();
    expect(screen.getByText("45%")).toBeInTheDocument();
  });

  it("exibe os valores de chutes", () => {
    render(<MatchStats stats={stats} homeTeam={homeTeam} awayTeam={awayTeam} />);
    expect(screen.getByText("11")).toBeInTheDocument();
    // "9" appears in both shots.away and fouls.home — use getAllByText
    expect(screen.getAllByText("9").length).toBeGreaterThan(0);
  });

  it("tem role de section acessível", () => {
    render(<MatchStats stats={stats} homeTeam={homeTeam} awayTeam={awayTeam} />);
    expect(screen.getByRole("region", { name: /match statistics/i })).toBeInTheDocument();
  });

  it("as barras têm role meter acessível", () => {
    render(<MatchStats stats={stats} homeTeam={homeTeam} awayTeam={awayTeam} />);
    const meters = screen.getAllByRole("meter");
    expect(meters.length).toBeGreaterThan(0);
  });
});
