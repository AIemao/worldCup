import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { groupMatchesMockData } from "../../data";
import { GroupMatches } from "./GroupMatches";

afterEach(() => cleanup());

const matchesA = groupMatchesMockData["A"];

function renderMatches(matches: typeof matchesA, isLoading = false) {
  return render(
    <MemoryRouter>
      <GroupMatches matches={matches} isLoading={isLoading} />
    </MemoryRouter>
  );
}

describe("GroupMatches", () => {
  it("exibe as rodadas agrupadas", () => {
    renderMatches(matchesA);
    // Use getAllByText because the round name also appears inside each GroupMatchCard
    expect(screen.getAllByText("Matchday 1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Matchday 2").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Matchday 3").length).toBeGreaterThan(0);
  });

  it("exibe todas as 6 partidas do grupo A", () => {
    renderMatches(matchesA);
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("exibe skeleton em loading", () => {
    const { container } = renderMatches([], true);
    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(3);
  });

  it("exibe empty state quando sem partidas", () => {
    renderMatches([]);
    expect(screen.getByText(/No matches scheduled yet/i)).toBeInTheDocument();
  });

  it("tem aria-label na lista", () => {
    renderMatches(matchesA);
    expect(screen.getByRole("list", { name: /Group matches by round/i })).toBeInTheDocument();
  });

  it("cada rodada tem role='listitem'", () => {
    renderMatches(matchesA);
    expect(screen.getAllByRole("listitem")).toHaveLength(3); // 3 matchdays
  });
});
