import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { QualificationBadge } from "./QualificationBadge";

afterEach(() => cleanup());

describe("QualificationBadge", () => {
  it("exibe 'Qualified' para status qualified", () => {
    render(<QualificationBadge status="qualified" />);
    expect(screen.getByText("Qualified")).toBeInTheDocument();
  });

  it("exibe 'Playoff' para status playoff", () => {
    render(<QualificationBadge status="playoff" />);
    expect(screen.getByText("Playoff")).toBeInTheDocument();
  });

  it("exibe 'Eliminated' para status eliminated", () => {
    render(<QualificationBadge status="eliminated" />);
    expect(screen.getByText("Eliminated")).toBeInTheDocument();
  });

  it("exibe 'Pending' para status pending", () => {
    render(<QualificationBadge status="pending" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("exibe letra inicial quando compact=true", () => {
    render(<QualificationBadge status="qualified" compact />);
    expect(screen.getByText("Q")).toBeInTheDocument();
  });

  it("tem aria-label descritivo", () => {
    render(<QualificationBadge status="qualified" />);
    expect(screen.getByLabelText("Qualified for knockout stage")).toBeInTheDocument();
  });

  it("aceita className adicional", () => {
    const { container } = render(<QualificationBadge status="qualified" className="extra" />);
    expect(container.firstChild).toHaveClass("extra");
  });
});
