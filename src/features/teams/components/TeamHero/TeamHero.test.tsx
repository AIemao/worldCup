import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { teamsMockData } from "../../data";
import { TeamHero } from "./TeamHero";

const brazil = teamsMockData.find((t) => t.id === "bra")!;

afterEach(() => cleanup());

describe("TeamHero", () => {
  it("renderiza o nome da seleção", () => {
    render(<TeamHero team={brazil} />);
    const headings = screen.getAllByRole("heading", { name: /Brazil/i });
    expect(headings.length).toBeGreaterThan(0);
  });

  it("contém aria-label da seleção", () => {
    render(<TeamHero team={brazil} />);
    expect(screen.getByRole("region", { name: /Brazil national team/i })).toBeDefined();
  });

  it("exibe o flag emoji", () => {
    render(<TeamHero team={brazil} />);
    expect(screen.getByText("🇧🇷")).toBeDefined();
  });

  it("exibe o país", () => {
    render(<TeamHero team={brazil} />);
    expect(screen.getAllByText("Brazil").length).toBeGreaterThan(0);
  });

  it("exibe o estádio quando fornecido", () => {
    render(<TeamHero team={brazil} />);
    expect(screen.getByText("Maracanã")).toBeDefined();
  });

  it("exibe o ano de fundação", () => {
    render(<TeamHero team={brazil} />);
    expect(screen.getByText(/1914/i)).toBeDefined();
  });
});
