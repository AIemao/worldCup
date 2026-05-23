import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { liveMatchesMockData } from "../../data";
import { LiveEventFeed } from "./LiveEventFeed";

afterEach(() => cleanup());

const match = liveMatchesMockData[0];
const events = match.events ?? [];

describe("LiveEventFeed", () => {
  it("renderiza a lista de eventos", () => {
    render(<LiveEventFeed events={events} homeTeamId={match.homeTeam.id} />);
    expect(screen.getByRole("list", { name: "Match events" })).toBeInTheDocument();
  });

  it("exibe o nome do jogador para cada evento", () => {
    render(<LiveEventFeed events={events} homeTeamId={match.homeTeam.id} />);
    expect(screen.getByText("Vinicius Jr.")).toBeInTheDocument();
    expect(screen.getByText("Messi")).toBeInTheDocument();
  });

  it("exibe o minuto de cada evento", () => {
    render(<LiveEventFeed events={events} homeTeamId={match.homeTeam.id} />);
    expect(screen.getByText("14'")).toBeInTheDocument();
    expect(screen.getByText("52'")).toBeInTheDocument();
  });

  it("exibe o nome do assistente quando disponível", () => {
    render(<LiveEventFeed events={events} homeTeamId={match.homeTeam.id} />);
    expect(screen.getByText("ass. Rodrygo")).toBeInTheDocument();
  });

  it("exibe o estado vazio quando não há eventos", () => {
    render(<LiveEventFeed events={[]} homeTeamId="bra" />);
    expect(screen.getByText("No events yet")).toBeInTheDocument();
  });

  it("o estado vazio tem aria-label correto", () => {
    render(<LiveEventFeed events={[]} homeTeamId="bra" />);
    expect(screen.getByLabelText("No match events yet")).toBeInTheDocument();
  });

  it("renderiza eventos em ordem cronológica decrescente", () => {
    render(<LiveEventFeed events={events} homeTeamId={match.homeTeam.id} />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(events.length);
  });
});
