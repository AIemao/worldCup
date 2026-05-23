import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  afterEach(() => cleanup());

  it("renderiza o título obrigatório", () => {
    render(<SectionHeader title="Featured Matches" />);
    expect(screen.getByRole("heading", { name: "Featured Matches" })).toBeInTheDocument();
  });

  it("renderiza o label eyebrow quando fornecido", () => {
    render(<SectionHeader title="Matches" label="Schedule" />);
    expect(screen.getByText("Schedule")).toBeInTheDocument();
  });

  it("não renderiza o label quando ausente", () => {
    render(<SectionHeader title="Matches" />);
    expect(screen.queryByText(/schedule/i)).not.toBeInTheDocument();
  });

  it("renderiza a description quando fornecida", () => {
    render(<SectionHeader title="Matches" description="All group stage matches" />);
    expect(screen.getByText("All group stage matches")).toBeInTheDocument();
  });

  it("não renderiza a description quando ausente", () => {
    const { container } = render(<SectionHeader title="Matches" />);
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  it("renderiza o action slot quando fornecido", () => {
    render(<SectionHeader title="Matches" action={<button>View All</button>} />);
    expect(screen.getByRole("button", { name: "View All" })).toBeInTheDocument();
  });

  it("aplica text-center quando align=center", () => {
    const { container } = render(<SectionHeader title="Matches" align="center" />);
    expect(container.firstChild).toHaveClass("items-center", "text-center");
  });
});
