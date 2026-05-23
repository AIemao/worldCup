import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    const { container } = render(<Card>Default</Card>);
    expect(container.firstChild).toHaveClass("bg-card", "border-border");
  });

  it("applies glass variant", () => {
    const { container } = render(<Card variant="glass">Glass</Card>);
    expect(container.firstChild).toHaveClass("backdrop-blur-md");
  });

  it("applies elevated variant", () => {
    const { container } = render(<Card variant="elevated">Elevated</Card>);
    expect(container.firstChild).toHaveClass("shadow-lg");
  });

  it("applies hoverable styles", () => {
    const { container } = render(<Card hoverable>Hoverable</Card>);
    expect(container.firstChild).toHaveClass("cursor-pointer");
  });

  it("renders CardHeader with correct padding", () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    expect(container.firstChild).toHaveClass("p-6");
  });

  it("renders CardTitle as h3", () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByRole("heading", { level: 3, name: "Title" })).toBeInTheDocument();
  });

  it("renders CardDescription", () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("renders CardContent", () => {
    render(<CardContent>Main content</CardContent>);
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("renders CardFooter with items-center", () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(container.firstChild).toHaveClass("items-center");
  });

  it("renders full compound card", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Match Preview</CardTitle>
          <CardDescription>Group Stage</CardDescription>
        </CardHeader>
        <CardContent>Match details</CardContent>
        <CardFooter>
          <button>Watch</button>
        </CardFooter>
      </Card>
    );
    expect(screen.getByRole("heading", { name: "Match Preview" })).toBeInTheDocument();
    expect(screen.getByText("Group Stage")).toBeInTheDocument();
    expect(screen.getByText("Match details")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Watch" })).toBeInTheDocument();
  });
});
