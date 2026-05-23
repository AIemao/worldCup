import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Momentum } from "../../types/live.types";
import { MomentumBar } from "./MomentumBar";

afterEach(() => cleanup());

const balanced: Momentum = { home: 50, away: 50, trend: "neutral" };
const homeLeading: Momentum = { home: 65, away: 35, trend: "rising_home" };
const awayLeading: Momentum = { home: 38, away: 62, trend: "rising_away" };

describe("MomentumBar", () => {
  it("renderiza rótulo de acessibilidade correto", () => {
    render(<MomentumBar momentum={balanced} homeLabel="Brazil" awayLabel="Argentina" />);
    expect(screen.getByLabelText("Momentum: Brazil 50%, Argentina 50%")).toBeInTheDocument();
  });

  it("exibe percentual home", () => {
    render(<MomentumBar momentum={homeLeading} />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("exibe percentual away", () => {
    render(<MomentumBar momentum={homeLeading} />);
    expect(screen.getByText("35%")).toBeInTheDocument();
  });

  it("exibe os rótulos dos times", () => {
    render(<MomentumBar momentum={balanced} homeLabel="FRA" awayLabel="ENG" />);
    expect(screen.getByText("FRA")).toBeInTheDocument();
    expect(screen.getByText("ENG")).toBeInTheDocument();
  });

  it("exibe 'Momentum' como título central", () => {
    render(<MomentumBar momentum={balanced} />);
    expect(screen.getByText("Momentum")).toBeInTheDocument();
  });

  it("usa labels padrão Home/Away quando não fornecidos", () => {
    render(<MomentumBar momentum={balanced} />);
    expect(screen.getByLabelText(/Momentum: Home 50%, Away 50%/)).toBeInTheDocument();
  });

  it("aceita className adicional", () => {
    const { container } = render(<MomentumBar momentum={balanced} className="test-class" />);
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("renderiza para momentum away dominante", () => {
    render(<MomentumBar momentum={awayLeading} />);
    expect(screen.getByText("38%")).toBeInTheDocument();
    expect(screen.getByText("62%")).toBeInTheDocument();
  });
});
