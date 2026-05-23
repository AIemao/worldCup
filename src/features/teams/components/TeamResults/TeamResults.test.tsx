import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { teamResultsMockData } from "../../data";
import { TeamResults } from "./TeamResults";

const matches = teamResultsMockData["bra"];

afterEach(() => cleanup());

describe("TeamResults", () => {
  it("renderiza resultados recentes", () => {
    render(<TeamResults matches={matches} />);
    expect(screen.getByLabelText(/Recent results/i)).toBeDefined();
  });

  it("exibe placar do primeiro resultado", () => {
    render(<TeamResults matches={[matches[0]]} />);
    const scoreEl = screen.getByText(/\d+ – \d+/);
    expect(scoreEl).toBeDefined();
  });

  it("exibe skeleton durante loading", () => {
    render(<TeamResults matches={[]} isLoading />);
    expect(screen.queryByLabelText(/Recent results/i)).toBeNull();
  });

  it("exibe empty state quando sem resultados", () => {
    render(<TeamResults matches={[]} />);
    expect(screen.getByText(/No recent results/i)).toBeDefined();
  });

  it("exibe abreviações dos times", () => {
    render(<TeamResults matches={[matches[0]]} />);
    expect(screen.getByText("BRA")).toBeDefined();
  });
});
