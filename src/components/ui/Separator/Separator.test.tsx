import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders a horizontal separator by default", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveClass("h-px", "w-full");
  });

  it("renders a vertical separator", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveClass("h-full", "w-px");
  });

  it("is decorative by default (no role)", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveAttribute("role", "none");
  });

  it("has separator role when not decorative", () => {
    const { container } = render(<Separator decorative={false} />);
    expect(container.firstChild).toHaveAttribute("role", "separator");
  });

  it("applies aria-orientation when not decorative", () => {
    const { container } = render(<Separator decorative={false} orientation="vertical" />);
    expect(container.firstChild).toHaveAttribute("aria-orientation", "vertical");
  });

  it("merges custom className", () => {
    const { container } = render(<Separator className="my-4" />);
    expect(container.firstChild).toHaveClass("my-4");
  });
});
