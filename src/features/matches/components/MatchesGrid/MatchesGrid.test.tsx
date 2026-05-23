import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { matchesMockData } from "../../data";
import { MatchesGrid } from "./MatchesGrid";

function renderGrid(matches = matchesMockData.slice(0, 3), isLoading = false) {
  return render(
    <MemoryRouter>
      <MatchesGrid matches={matches} isLoading={isLoading} />
    </MemoryRouter>
  );
}

afterEach(() => cleanup());

describe("MatchesGrid", () => {
  it("renderiza os cards de partidas", () => {
    renderGrid();
    const links = screen.getAllByRole("link", { name: /match details/i });
    expect(links).toHaveLength(3);
  });

  it("exibe skeletons durante loading", () => {
    const { container } = renderGrid([], true);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("não renderiza cards durante loading", () => {
    renderGrid(matchesMockData.slice(0, 3), true);
    expect(screen.queryAllByRole("link", { name: /match details/i })).toHaveLength(0);
  });

  it("renderiza zero cards para lista vazia", () => {
    renderGrid([]);
    expect(screen.queryAllByRole("link", { name: /match details/i })).toHaveLength(0);
  });

  it("tem aria-busy=true durante loading", () => {
    const { container } = renderGrid([], true);
    const busy = container.querySelector("[aria-busy='true']");
    expect(busy).toBeInTheDocument();
  });
});
