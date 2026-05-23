import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { HeroSection } from "./HeroSection";

function renderHeroSection() {
  return render(
    <MemoryRouter>
      <HeroSection />
    </MemoryRouter>
  );
}

describe("HeroSection", () => {
  afterEach(() => cleanup());

  it("renderiza o heading principal", () => {
    renderHeroSection();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("contém o texto WORLD CUP e 2026", () => {
    renderHeroSection();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("WORLD CUP");
    expect(heading.textContent).toContain("2026");
  });

  it("renderiza o badge FIFA World Cup 2026", () => {
    renderHeroSection();
    expect(screen.getByText(/FIFA World Cup 2026/i)).toBeInTheDocument();
  });

  it("renderiza os países anfitriões com aria-label correto", () => {
    renderHeroSection();
    expect(screen.getByLabelText("Host nations: USA, Canada, Mexico")).toBeInTheDocument();
  });

  it("renderiza o link View Schedule", () => {
    renderHeroSection();
    expect(screen.getByRole("link", { name: "View Schedule" })).toBeInTheDocument();
  });

  it("renderiza o link Explore Teams", () => {
    renderHeroSection();
    expect(screen.getByRole("link", { name: "Explore Teams" })).toBeInTheDocument();
  });

  it("tem role de section com label de acessibilidade", () => {
    renderHeroSection();
    expect(screen.getByRole("region", { name: "World Cup 2026 hero" })).toBeInTheDocument();
  });
});
