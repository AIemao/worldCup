import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GlassPanel } from "./GlassPanel";

describe("GlassPanel", () => {
  it("renders children", () => {
    render(<GlassPanel>Panel content</GlassPanel>);
    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("applies medium intensity by default", () => {
    const { container } = render(<GlassPanel>Content</GlassPanel>);
    expect(container.firstChild).toHaveClass("backdrop-blur-md");
  });

  it("applies low intensity", () => {
    const { container } = render(<GlassPanel intensity="low">Low</GlassPanel>);
    expect(container.firstChild).toHaveClass("backdrop-blur-sm");
  });

  it("applies high intensity", () => {
    const { container } = render(<GlassPanel intensity="high">High</GlassPanel>);
    expect(container.firstChild).toHaveClass("backdrop-blur-xl");
  });

  it("applies glow shadow", () => {
    const { container } = render(<GlassPanel glow="md">Glow</GlassPanel>);
    expect(container.firstChild).toHaveClass("shadow-glow");
  });

  it("merges custom className", () => {
    const { container } = render(<GlassPanel className="p-6">Panel</GlassPanel>);
    expect(container.firstChild).toHaveClass("p-6");
  });

  it("forwards HTML attributes", () => {
    const { container } = render(<GlassPanel data-testid="panel">Content</GlassPanel>);
    expect(container.firstChild).toHaveAttribute("data-testid", "panel");
  });
});
