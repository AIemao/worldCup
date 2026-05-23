import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LiveStatCard } from "./LiveStatCard";

afterEach(() => cleanup());

describe("LiveStatCard", () => {
  it("exibe o rótulo da estatística", () => {
    render(<LiveStatCard label="Shots" homeValue={12} awayValue={7} />);
    expect(screen.getByText("Shots")).toBeInTheDocument();
  });

  it("exibe o valor home", () => {
    render(<LiveStatCard label="Shots" homeValue={12} awayValue={7} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("exibe o valor away", () => {
    render(<LiveStatCard label="Shots" homeValue={12} awayValue={7} />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("tem aria-label correto", () => {
    render(<LiveStatCard label="Possession" homeValue="58%" awayValue="42%" />);
    expect(screen.getByLabelText("Possession: home 58%, away 42%")).toBeInTheDocument();
  });

  it("não renderiza barra quando percentuais não são fornecidos", () => {
    const { container } = render(<LiveStatCard label="Shots" homeValue={5} awayValue={3} />);
    const bar = container.querySelector(".bg-brand\\/70");
    expect(bar).not.toBeInTheDocument();
  });

  it("renderiza barra quando percentuais são fornecidos", () => {
    const { container } = render(
      <LiveStatCard
        label="Possession"
        homeValue="58%"
        awayValue="42%"
        homePercent={58}
        awayPercent={42}
      />
    );
    const bar = container.querySelector("[style*='width']");
    expect(bar).toBeInTheDocument();
  });

  it("aceita valores string", () => {
    render(<LiveStatCard label="Possession" homeValue="58%" awayValue="42%" />);
    expect(screen.getByText("58%")).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
  });
});
