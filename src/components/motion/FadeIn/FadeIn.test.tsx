import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FadeIn } from "./FadeIn";

describe("FadeIn", () => {
  it("renders children", () => {
    render(<FadeIn>Fade content</FadeIn>);
    expect(screen.getByText("Fade content")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<FadeIn className="test-class">Content</FadeIn>);
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("renders children accessible after animation", () => {
    render(
      <FadeIn>
        <button>Click me</button>
      </FadeIn>
    );
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });
});
