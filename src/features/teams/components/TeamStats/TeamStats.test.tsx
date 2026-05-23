import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { teamsMockData } from "../../data";
import { TeamStats } from "./TeamStats";

const brazil = teamsMockData.find((t) => t.id === "bra")!;
const stats = brazil.stats!;

afterEach(() => cleanup());

describe("TeamStats", () => {
  it("tem role=region com aria-label 'Team statistics'", () => {
    render(<TeamStats stats={stats} />);
    expect(screen.getByRole("region", { name: /Team statistics/i })).toBeDefined();
  });

  it("exibe partidas jogadas", () => {
    render(<TeamStats stats={stats} />);
    expect(screen.getAllByText(String(stats.matchesPlayed)).length).toBeGreaterThan(0);
  });

  it("exibe vitórias", () => {
    render(<TeamStats stats={stats} />);
    expect(screen.getAllByText(String(stats.wins)).length).toBeGreaterThan(0);
  });

  it("exibe gols a favor", () => {
    render(<TeamStats stats={stats} />);
    expect(screen.getByText(String(stats.goalsFor))).toBeDefined();
  });

  it("exibe o componente TeamFormBadge para form não vazio", () => {
    render(<TeamStats stats={stats} />);
    expect(screen.getByLabelText(/Recent form/i)).toBeDefined();
  });
});
