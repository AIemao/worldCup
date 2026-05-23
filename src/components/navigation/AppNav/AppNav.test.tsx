import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { AppNav } from "./AppNav";

function renderAppNav() {
  return render(
    <MemoryRouter>
      <AppNav />
    </MemoryRouter>
  );
}

describe("AppNav", () => {
  afterEach(() => cleanup());

  it("renderiza o elemento nav com label de acessibilidade", () => {
    renderAppNav();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
  });

  it("renderiza todos os links de navegação", () => {
    renderAppNav();
    expect(screen.getByRole("link", { name: "Matches" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Groups" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Teams" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Standings" })).toBeInTheDocument();
  });

  it("aceita className customizado", () => {
    render(
      <MemoryRouter>
        <AppNav className="custom-class" />
      </MemoryRouter>
    );
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("custom-class");
  });
});
