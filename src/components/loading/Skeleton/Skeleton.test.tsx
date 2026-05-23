import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders with animate-pulse", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("has bg-muted class", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("bg-muted");
  });

  it("is aria-hidden", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-8 w-48" />);
    expect(container.firstChild).toHaveClass("h-8", "w-48");
  });

  it("forwards HTML attributes", () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    expect(container.firstChild).toHaveAttribute("data-testid", "skeleton");
  });
});
