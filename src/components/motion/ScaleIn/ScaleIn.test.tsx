import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScaleIn } from "./ScaleIn";

describe("ScaleIn", () => {
  it("renders children", () => {
    render(<ScaleIn>Scale content</ScaleIn>);
    expect(screen.getByText("Scale content")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<ScaleIn className="scale-class">Content</ScaleIn>);
    expect(container.firstChild).toHaveClass("scale-class");
  });

  it("renders nested interactive content", () => {
    render(
      <ScaleIn>
        <a href="/match">View Match</a>
      </ScaleIn>
    );
    expect(screen.getByRole("link", { name: "View Match" })).toBeInTheDocument();
  });
});
