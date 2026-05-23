import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Live</Badge>);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("bg-secondary");
  });

  it("applies brand variant", () => {
    render(<Badge variant="brand">Brand</Badge>);
    expect(screen.getByText("Brand")).toHaveClass("bg-brand/15", "text-brand");
  });

  it("applies success variant", () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText("Active")).toHaveClass("text-emerald-400");
  });

  it("applies warning variant", () => {
    render(<Badge variant="warning">Pending</Badge>);
    expect(screen.getByText("Pending")).toHaveClass("text-amber-400");
  });

  it("applies destructive variant", () => {
    render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error")).toHaveClass("text-destructive");
  });

  it("applies outline variant", () => {
    render(<Badge variant="outline">Draft</Badge>);
    expect(screen.getByText("Draft")).toHaveClass("border-border");
  });

  it("merges custom className", () => {
    render(<Badge className="uppercase">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveClass("uppercase");
  });
});
