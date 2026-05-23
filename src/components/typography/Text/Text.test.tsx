import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders as p by default", () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText("Hello world").tagName).toBe("P");
  });

  it("renders as span when as='span'", () => {
    render(<Text as="span">Inline</Text>);
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
  });

  it("renders as label when as='label'", () => {
    render(<Text as="label">Field label</Text>);
    expect(screen.getByText("Field label").tagName).toBe("LABEL");
  });

  it("applies muted intent", () => {
    render(<Text intent="muted">Muted text</Text>);
    expect(screen.getByText("Muted text")).toHaveClass("text-muted-foreground");
  });

  it("applies brand intent", () => {
    render(<Text intent="brand">Brand text</Text>);
    expect(screen.getByText("Brand text")).toHaveClass("text-brand");
  });

  it("applies sm size", () => {
    render(<Text size="sm">Small</Text>);
    expect(screen.getByText("Small")).toHaveClass("text-sm");
  });

  it("applies bold weight", () => {
    render(<Text weight="bold">Bold</Text>);
    expect(screen.getByText("Bold")).toHaveClass("font-bold");
  });

  it("applies relaxed leading", () => {
    render(<Text leading="relaxed">Relaxed</Text>);
    expect(screen.getByText("Relaxed")).toHaveClass("leading-relaxed");
  });

  it("merges custom className", () => {
    render(<Text className="uppercase">Styled</Text>);
    expect(screen.getByText("Styled")).toHaveClass("uppercase");
  });
});
