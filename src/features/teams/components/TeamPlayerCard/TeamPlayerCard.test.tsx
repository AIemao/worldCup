import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { teamPlayersMockData } from "../../data";
import { TeamPlayerCard } from "./TeamPlayerCard";

const ederson = teamPlayersMockData["bra"][0];

afterEach(() => cleanup());

describe("TeamPlayerCard", () => {
  it("renderiza o nome do jogador", () => {
    render(<TeamPlayerCard player={ederson} />);
    expect(screen.getByText("Ederson")).toBeDefined();
  });

  it("tem role=article com aria-label correto", () => {
    render(<TeamPlayerCard player={ederson} />);
    expect(screen.getByRole("article", { name: /Ederson, goalkeeper/i })).toBeDefined();
  });

  it("exibe a posição abreviada", () => {
    render(<TeamPlayerCard player={ederson} />);
    expect(screen.getByText("GK")).toBeDefined();
  });

  it("exibe a nacionalidade", () => {
    render(<TeamPlayerCard player={ederson} />);
    expect(screen.getByText("Brazil")).toBeDefined();
  });

  it("exibe a idade quando birthDate está disponível", () => {
    render(<TeamPlayerCard player={ederson} />);
    expect(screen.getByText(/\d+ years/i)).toBeDefined();
  });
});
