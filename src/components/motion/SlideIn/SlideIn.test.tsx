import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SlideIn } from "./SlideIn";

describe("SlideIn", () => {
  it("renders children", () => {
    render(<SlideIn>Slide content</SlideIn>);
    expect(screen.getByText("Slide content")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<SlideIn className="slide-class">Content</SlideIn>);
    expect(container.firstChild).toHaveClass("slide-class");
  });

  it("renders with different directions", () => {
    const { rerender } = render(<SlideIn direction="left">Left</SlideIn>);
    expect(screen.getByText("Left")).toBeInTheDocument();

    rerender(<SlideIn direction="right">Right</SlideIn>);
    expect(screen.getByText("Right")).toBeInTheDocument();

    rerender(<SlideIn direction="down">Down</SlideIn>);
    expect(screen.getByText("Down")).toBeInTheDocument();
  });
});
