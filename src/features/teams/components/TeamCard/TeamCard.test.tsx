import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { teamsMockData } from "../../data";
import { TeamCard } from "./TeamCard";

const brazil = teamsMockData.find((t) => t.id === "bra")!;

function renderCard() {
  return render(
    <MemoryRouter>
      <TeamCard team={brazil} />
    </MemoryRouter>
  );
}

afterEach(() => cleanup());

describe("TeamCard", () => {
  it("renderiza o nome da seleção", () => {
    renderCard();
    expect(screen.getAllByText("Brazil").length).toBeGreaterThan(0);
  });

  it("renderiza o país", () => {
    renderCard();
    expect(screen.getAllByText("Brazil").length).toBeGreaterThan(0);
  });

  it("exibe o grupo", () => {
    renderCard();
    expect(screen.getByText("A")).toBeDefined();
  });

  it("link aponta para /teams/bra", () => {
    renderCard();
    const link = screen.getByRole("link", { name: /Brazil — view team details/i });
    expect(link.getAttribute("href")).toBe("/teams/bra");
  });

  it("aria-label correto para acessibilidade", () => {
    renderCard();
    const link = screen.getByRole("link", { name: /Brazil — view team details/i });
    expect(link).toBeDefined();
  });
});
