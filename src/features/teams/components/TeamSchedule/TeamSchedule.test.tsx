import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { teamScheduleMockData } from "../../data";
import { TeamSchedule } from "./TeamSchedule";

const matches = teamScheduleMockData["bra"];

afterEach(() => cleanup());

describe("TeamSchedule", () => {
  it("renderiza partidas agendadas", () => {
    render(<TeamSchedule matches={matches} />);
    expect(screen.getByLabelText(/Upcoming matches/i)).toBeDefined();
  });

  it("exibe todos os adversários", () => {
    render(<TeamSchedule matches={matches} />);
    expect(screen.getByText("Switzerland")).toBeDefined();
  });

  it("exibe skeleton durante loading", () => {
    render(<TeamSchedule matches={[]} isLoading />);
    expect(screen.queryByLabelText(/Upcoming matches/i)).toBeNull();
  });

  it("exibe empty state quando sem partidas", () => {
    render(<TeamSchedule matches={[]} />);
    expect(screen.getByText(/No upcoming matches/i)).toBeDefined();
  });

  it("exibe 'VS' entre os times", () => {
    render(<TeamSchedule matches={[matches[0]]} />);
    expect(screen.getByText("VS")).toBeDefined();
  });
});
