import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { MatchEvent } from "../../types/match.types";
import { MatchTimeline } from "./MatchTimeline";

const homeTeamId = "bra";

const events: MatchEvent[] = [
  {
    id: "evt-1",
    minute: 22,
    type: "goal",
    teamId: "bra",
    playerName: "Vinicius Jr.",
    assistName: "Rodrygo",
  },
  {
    id: "evt-2",
    minute: 47,
    type: "goal",
    teamId: "ned",
    playerName: "C. Gakpo",
  },
  {
    id: "evt-3",
    minute: 59,
    type: "yellow_card",
    teamId: "bra",
    playerName: "Casemiro",
  },
];

afterEach(() => cleanup());

describe("MatchTimeline", () => {
  it("renderiza todos os eventos", () => {
    render(<MatchTimeline events={events} homeTeamId={homeTeamId} />);
    expect(screen.getByText("Vinicius Jr.")).toBeInTheDocument();
    expect(screen.getByText("C. Gakpo")).toBeInTheDocument();
    expect(screen.getByText("Casemiro")).toBeInTheDocument();
  });

  it("renderiza os minutos dos eventos", () => {
    render(<MatchTimeline events={events} homeTeamId={homeTeamId} />);
    expect(screen.getByText("22'")).toBeInTheDocument();
    expect(screen.getByText("47'")).toBeInTheDocument();
    expect(screen.getByText("59'")).toBeInTheDocument();
  });

  it("renderiza o nome do assistente", () => {
    render(<MatchTimeline events={events} homeTeamId={homeTeamId} />);
    expect(screen.getByText("(Rodrygo)")).toBeInTheDocument();
  });

  it("exibe mensagem vazia quando não há eventos", () => {
    render(<MatchTimeline events={[]} homeTeamId={homeTeamId} />);
    expect(screen.getByText(/no events/i)).toBeInTheDocument();
  });

  it("tem aria-label de timeline", () => {
    render(<MatchTimeline events={events} homeTeamId={homeTeamId} />);
    expect(screen.getByRole("list", { name: /match timeline/i })).toBeInTheDocument();
  });

  it("tem aria-label em cada evento", () => {
    render(<MatchTimeline events={events} homeTeamId={homeTeamId} />);
    expect(screen.getByLabelText(/Minute 22/i)).toBeInTheDocument();
  });
});
