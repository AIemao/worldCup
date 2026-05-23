import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { groupMatchesMockData } from "../../data";
import { GroupMatchCard } from "./GroupMatchCard";

afterEach(() => cleanup());

const finishedMatch = groupMatchesMockData["A"][0]; // BRA 3-0 SRB, finished
const upcomingMatch = groupMatchesMockData["H"][0]; // NED vs SEN, upcoming

function renderCard(match: typeof finishedMatch) {
  return render(
    <MemoryRouter>
      <GroupMatchCard match={match} />
    </MemoryRouter>
  );
}

describe("GroupMatchCard", () => {
  it("exibe os nomes abreviados dos times", () => {
    renderCard(finishedMatch);
    expect(screen.getByText("BRA")).toBeInTheDocument();
    expect(screen.getByText("SRB")).toBeInTheDocument();
  });

  it("exibe o placar para partidas terminadas", () => {
    renderCard(finishedMatch);
    expect(screen.getByLabelText(/Score: 3 to 0/i)).toBeInTheDocument();
  });

  it("exibe 'vs' para partidas a disputar (sem placar)", () => {
    renderCard(upcomingMatch);
    expect(screen.getByText("vs")).toBeInTheDocument();
  });

  it("exibe o nome da rodada", () => {
    renderCard(finishedMatch);
    expect(screen.getByText("Matchday 1")).toBeInTheDocument();
  });

  it("exibe 'FT' para partidas terminadas", () => {
    renderCard(finishedMatch);
    expect(screen.getByText("FT")).toBeInTheDocument();
  });

  it("exibe o venue quando disponível", () => {
    renderCard(finishedMatch);
    expect(screen.getByText("MetLife Stadium")).toBeInTheDocument();
  });

  it("tem role='article' com aria-label", () => {
    renderCard(finishedMatch);
    expect(screen.getByRole("article", { name: /Brazil vs Serbia/i })).toBeInTheDocument();
  });

  it("exibe emojis de bandeira com aria-label", () => {
    renderCard(finishedMatch);
    expect(screen.getByLabelText("Brazil flag")).toBeInTheDocument();
    expect(screen.getByLabelText("Serbia flag")).toBeInTheDocument();
  });
});
