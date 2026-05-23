import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { CTABlock } from "./CTABlock";

function renderCTABlock(props?: { title?: string; description?: string }) {
  return render(
    <MemoryRouter>
      <CTABlock {...props} />
    </MemoryRouter>
  );
}

describe("CTABlock", () => {
  afterEach(() => cleanup());

  it("renderiza o título padrão", () => {
    renderCTABlock();
    expect(screen.getByRole("heading", { name: "The 2026 World Cup Awaits" })).toBeInTheDocument();
  });

  it("renderiza título customizado quando fornecido", () => {
    renderCTABlock({ title: "Start Your Journey" });
    expect(screen.getByRole("heading", { name: "Start Your Journey" })).toBeInTheDocument();
  });

  it("renderiza a description padrão", () => {
    renderCTABlock();
    expect(screen.getByText(/Follow every match/)).toBeInTheDocument();
  });

  it("renderiza o link View Full Schedule", () => {
    renderCTABlock();
    expect(screen.getByRole("link", { name: "View Full Schedule" })).toBeInTheDocument();
  });

  it("renderiza o link Explore Groups", () => {
    renderCTABlock();
    expect(screen.getByRole("link", { name: "Explore Groups" })).toBeInTheDocument();
  });

  it("tem role de section com label de acessibilidade", () => {
    renderCTABlock();
    expect(screen.getByRole("region", { name: "Call to action" })).toBeInTheDocument();
  });
});
