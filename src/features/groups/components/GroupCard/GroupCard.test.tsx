import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { groupsMockData, groupStandingsMockData } from "../../data";
import { GroupCard } from "./GroupCard";

afterEach(() => cleanup());

const group = groupsMockData[0]; // Group A
const standings = groupStandingsMockData["A"];

function renderCard() {
  return render(
    <MemoryRouter>
      <GroupCard group={group} standings={standings} />
    </MemoryRouter>
  );
}

describe("GroupCard", () => {
  it("exibe o nome do grupo", () => {
    renderCard();
    expect(screen.getByText("Group A")).toBeInTheDocument();
  });

  it("exibe os 4 times", () => {
    renderCard();
    expect(screen.getByText("BRA")).toBeInTheDocument();
    expect(screen.getByText("SUI")).toBeInTheDocument();
    expect(screen.getByText("SRB")).toBeInTheDocument();
    expect(screen.getByText("CMR")).toBeInTheDocument();
  });

  it("é um link para a página de detalhes", () => {
    renderCard();
    const link = screen.getByRole("link", { name: /Group A standings/i });
    expect(link).toHaveAttribute("href", "/groups/a");
  });

  it("exibe os pontos de cada time", () => {
    renderCard();
    expect(screen.getByText("9")).toBeInTheDocument(); // BRA: 9 pts
  });

  it("exibe badges de qualificação", () => {
    renderCard();
    expect(screen.getAllByLabelText("Qualified for knockout stage")).toHaveLength(2);
    expect(screen.getByLabelText("Playoff spot")).toBeInTheDocument();
  });

  it("tem aria-label no link", () => {
    renderCard();
    expect(screen.getByLabelText(/Group A standings — view details/i)).toBeInTheDocument();
  });
});
