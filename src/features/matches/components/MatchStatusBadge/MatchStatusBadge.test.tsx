import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MatchStatusBadge } from "./MatchStatusBadge";

afterEach(() => cleanup());

describe("MatchStatusBadge", () => {
  it("exibe 'Upcoming' para status upcoming", () => {
    render(<MatchStatusBadge status="upcoming" />);
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("exibe 'Live' para status live", () => {
    render(<MatchStatusBadge status="live" />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("exibe 'Final' para status finished", () => {
    render(<MatchStatusBadge status="finished" />);
    expect(screen.getByText("Final")).toBeInTheDocument();
  });

  it("tem aria-label com o status", () => {
    render(<MatchStatusBadge status="live" />);
    expect(screen.getByLabelText("Match status: live")).toBeInTheDocument();
  });

  it("exibe indicador pulsante apenas para live", () => {
    const { container } = render(<MatchStatusBadge status="live" />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("não exibe indicador pulsante para upcoming", () => {
    const { container } = render(<MatchStatusBadge status="upcoming" />);
    expect(container.querySelector(".animate-pulse")).not.toBeInTheDocument();
  });
});
