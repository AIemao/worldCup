import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { TournamentStat } from "../../types/home.types";
import { StatsBar } from "./StatsBar";

const mockStats: TournamentStat[] = [
  { id: "teams", label: "Teams", value: 48 },
  { id: "nations", label: "Host Nations", value: 3 },
  { id: "matches", label: "Matches", value: 104 },
  { id: "venues", label: "Venues", value: 16 },
];

describe("StatsBar", () => {
  afterEach(() => cleanup());

  it("renderiza todas as estatísticas fornecidas", () => {
    render(<StatsBar stats={mockStats} />);
    expect(screen.getByText("Teams")).toBeInTheDocument();
    expect(screen.getByText("Host Nations")).toBeInTheDocument();
    expect(screen.getByText("Matches")).toBeInTheDocument();
    expect(screen.getByText("Venues")).toBeInTheDocument();
  });

  it("renderiza os valores numéricos", () => {
    render(<StatsBar stats={mockStats} />);
    expect(screen.getByText("48")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renderiza o valor com suffix quando fornecido", () => {
    const statsWithSuffix: TournamentStat[] = [
      { id: "days", label: "Days", value: 100, suffix: "+" },
    ];
    render(<StatsBar stats={statsWithSuffix} />);
    expect(screen.getByText("100+")).toBeInTheDocument();
  });

  it("tem role de section com label de acessibilidade", () => {
    render(<StatsBar stats={mockStats} />);
    expect(screen.getByRole("region", { name: "Tournament statistics" })).toBeInTheDocument();
  });

  it("não renderiza quando a lista de stats é vazia", () => {
    const { container } = render(<StatsBar stats={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
