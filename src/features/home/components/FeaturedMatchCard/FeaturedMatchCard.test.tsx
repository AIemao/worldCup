import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { FeaturedMatch } from "../../types/home.types";
import { FeaturedMatchCard } from "./FeaturedMatchCard";

const upcomingMatch: FeaturedMatch = {
  id: "wc26-opening",
  homeTeam: {
    id: "mex",
    name: "Mexico",
    shortName: "MEX",
    flagEmoji: "🇲🇽",
    primaryColor: "#006847",
  },
  awayTeam: {
    id: "usa",
    name: "United States",
    shortName: "USA",
    flagEmoji: "🇺🇸",
    primaryColor: "#B22234",
  },
  scheduledAt: "2026-06-11T20:00:00Z",
  venue: "Estadio Azteca",
  city: "Mexico City",
  status: "upcoming",
  round: "Group Stage — Group A",
};

const liveMatch: FeaturedMatch = {
  ...upcomingMatch,
  id: "wc26-live",
  status: "live",
  score: { home: 1, away: 0 },
};

const finishedMatch: FeaturedMatch = {
  ...upcomingMatch,
  id: "wc26-finished",
  status: "finished",
  score: { home: 2, away: 1 },
};

describe("FeaturedMatchCard", () => {
  afterEach(() => cleanup());

  it("renderiza os nomes abreviados das equipes", () => {
    render(<FeaturedMatchCard match={upcomingMatch} />);
    expect(screen.getByText("MEX")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();
  });

  it("renderiza as emojis de bandeira", () => {
    render(<FeaturedMatchCard match={upcomingMatch} />);
    expect(screen.getByLabelText("Mexico flag")).toBeInTheDocument();
    expect(screen.getByLabelText("United States flag")).toBeInTheDocument();
  });

  it("exibe badge Upcoming para partida futura", () => {
    render(<FeaturedMatchCard match={upcomingMatch} />);
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("exibe badge Live para partida ao vivo", () => {
    render(<FeaturedMatchCard match={liveMatch} />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("exibe o placar para partida ao vivo", () => {
    render(<FeaturedMatchCard match={liveMatch} />);
    expect(screen.getByLabelText("Score: 1 - 0")).toBeInTheDocument();
  });

  it("exibe badge Final para partida encerrada", () => {
    render(<FeaturedMatchCard match={finishedMatch} />);
    expect(screen.getByText("Final")).toBeInTheDocument();
  });

  it("renderiza o round da partida", () => {
    render(<FeaturedMatchCard match={upcomingMatch} />);
    expect(screen.getByText("Group Stage — Group A")).toBeInTheDocument();
  });

  it("renderiza o venue e cidade", () => {
    render(<FeaturedMatchCard match={upcomingMatch} />);
    expect(screen.getByText(/Estadio Azteca/)).toBeInTheDocument();
    expect(screen.getByText(/Mexico City/)).toBeInTheDocument();
  });
});
