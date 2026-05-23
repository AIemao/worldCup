import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { groupStandingsMockData } from "../../data";
import { GroupTable } from "./GroupTable";

afterEach(() => cleanup());

const standings = groupStandingsMockData["A"];

describe("GroupTable", () => {
  it("exibe o cabeçalho com colunas corretas", () => {
    render(<GroupTable standings={standings} groupLetter="A" />);
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Pts")).toBeInTheDocument();
  });

  it("exibe os 4 times do grupo", () => {
    render(<GroupTable standings={standings} groupLetter="A" />);
    expect(screen.getByText("BRA")).toBeInTheDocument();
    expect(screen.getByText("SUI")).toBeInTheDocument();
    expect(screen.getByText("SRB")).toBeInTheDocument();
    expect(screen.getByText("CMR")).toBeInTheDocument();
  });

  it("tem aria-label de acessibilidade", () => {
    render(<GroupTable standings={standings} groupLetter="A" />);
    expect(screen.getByRole("region", { name: /Group A standings/i })).toBeInTheDocument();
  });

  it("exibe skeleton em loading", () => {
    const { container } = render(<GroupTable standings={[]} groupLetter="A" isLoading />);
    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(4);
  });

  it("exibe legenda de classificação", () => {
    render(<GroupTable standings={standings} groupLetter="A" />);
    expect(screen.getByText("Knockout stage")).toBeInTheDocument();
    expect(screen.getByText("Playoff")).toBeInTheDocument();
  });

  it("exibe tabela com role correto", () => {
    render(<GroupTable standings={standings} groupLetter="A" />);
    expect(screen.getByRole("table", { name: /Group A table/i })).toBeInTheDocument();
  });
});
