import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { teamPlayersMockData } from "../../data";
import { TeamRoster } from "./TeamRoster";

const players = teamPlayersMockData["bra"];

afterEach(() => cleanup());

describe("TeamRoster", () => {
  it("renderiza lista de jogadores", () => {
    render(<TeamRoster players={players} />);
    expect(screen.getByRole("list", { name: /Team roster/i })).toBeDefined();
  });

  it("exibe todos os jogadores", () => {
    render(<TeamRoster players={players} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(players.length);
  });

  it("exibe skeleton durante loading", () => {
    render(<TeamRoster players={[]} isLoading />);
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("exibe empty state quando sem jogadores", () => {
    render(<TeamRoster players={[]} />);
    expect(screen.getByText(/No players available/i)).toBeDefined();
  });

  it("não exibe empty state quando há jogadores", () => {
    render(<TeamRoster players={players} />);
    expect(screen.queryByText(/No players available/i)).toBeNull();
  });
});
