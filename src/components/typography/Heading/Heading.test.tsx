import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders as h2 by default", () => {
    render(<Heading>World Cup 2026</Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "World Cup 2026" })).toBeInTheDocument();
  });

  it("renders as h1 when as='h1'", () => {
    render(<Heading as="h1">Title</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders as h3 when as='h3'", () => {
    render(<Heading as="h3">Subtitle</Heading>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("applies size variant", () => {
    render(<Heading size="3xl">Hero</Heading>);
    expect(screen.getByRole("heading")).toHaveClass("text-5xl", "font-extrabold");
  });

  it("applies muted intent", () => {
    render(<Heading intent="muted">Muted</Heading>);
    expect(screen.getByRole("heading")).toHaveClass("text-muted-foreground");
  });

  it("applies brand intent", () => {
    render(<Heading intent="brand">Brand</Heading>);
    expect(screen.getByRole("heading")).toHaveClass("text-brand");
  });

  it("applies gradient intent", () => {
    render(<Heading intent="gradient">Gradient</Heading>);
    expect(screen.getByRole("heading")).toHaveClass("bg-clip-text", "text-transparent");
  });

  it("merges custom className", () => {
    render(<Heading className="uppercase">Label</Heading>);
    expect(screen.getByRole("heading")).toHaveClass("uppercase");
  });

  it("forwards id attribute", () => {
    render(<Heading id="main-title">Title</Heading>);
    expect(screen.getByRole("heading")).toHaveAttribute("id", "main-title");
  });
});
