import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { TeamFormBadge } from "./TeamFormBadge";

afterEach(() => cleanup());

describe("TeamFormBadge", () => {
  it("renderiza 3 pílulas para form [W, D, L]", () => {
    render(<TeamFormBadge form={["W", "D", "L"]} />);
    expect(screen.getByLabelText("Win")).toBeDefined();
    expect(screen.getByLabelText("Draw")).toBeDefined();
    expect(screen.getByLabelText("Loss")).toBeDefined();
  });

  it("exibe '—' para form vazio", () => {
    render(<TeamFormBadge form={[]} />);
    expect(screen.getByText("—")).toBeDefined();
  });

  it("pílula W tem classe verde", () => {
    render(<TeamFormBadge form={["W"]} />);
    const pill = screen.getByLabelText("Win");
    expect(pill.className).toContain("emerald");
  });

  it("pílula L tem classe vermelha", () => {
    render(<TeamFormBadge form={["L"]} />);
    const pill = screen.getByLabelText("Loss");
    expect(pill.className).toContain("red");
  });
});
