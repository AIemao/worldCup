import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });

  it("applies outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border", "bg-transparent");
  });

  it("applies ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-white/5");
  });

  it("applies glow variant", () => {
    render(<Button variant="glow">Glow</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-brand", "shadow-glow");
  });

  it("applies destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });

  it("applies sm size", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8", "px-3");
  });

  it("applies lg size", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-11", "px-6");
  });

  it("applies icon size", () => {
    render(
      <Button size="icon" aria-label="icon">
        ★
      </Button>
    );
    expect(screen.getByRole("button")).toHaveClass("h-9", "w-9");
  });

  it("calls onClick when clicked", async () => {
    const handler = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handler}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const handler = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={handler}>
        Disabled
      </Button>
    );
    await user.click(screen.getByRole("button"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("applies disabled styles when disabled", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toHaveClass("disabled:opacity-40");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    expect(screen.getByRole("link", { name: "Link Button" })).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<Button className="custom-class">Styled</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("forwards aria attributes", () => {
    render(<Button aria-label="close dialog">×</Button>);
    expect(screen.getByRole("button", { name: "close dialog" })).toBeInTheDocument();
  });
});
