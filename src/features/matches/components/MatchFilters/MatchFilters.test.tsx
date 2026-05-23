import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_MATCH_FILTERS } from "../../types/match.types";
import { MatchFilters } from "./MatchFilters";

afterEach(() => cleanup());

describe("MatchFilters", () => {
  it("renderiza o campo de busca", () => {
    const onChange = vi.fn();
    render(<MatchFilters filters={DEFAULT_MATCH_FILTERS} onChange={onChange} onReset={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("renderiza o select de status", () => {
    render(<MatchFilters filters={DEFAULT_MATCH_FILTERS} onChange={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByLabelText(/filter by match status/i)).toBeInTheDocument();
  });

  it("renderiza o select de stage", () => {
    render(<MatchFilters filters={DEFAULT_MATCH_FILTERS} onChange={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByLabelText(/filter by match stage/i)).toBeInTheDocument();
  });

  it("não exibe botão de limpar quando filtros estão no padrão", () => {
    render(<MatchFilters filters={DEFAULT_MATCH_FILTERS} onChange={vi.fn()} onReset={vi.fn()} />);
    expect(screen.queryByLabelText(/clear all filters/i)).not.toBeInTheDocument();
  });

  it("exibe botão de limpar quando há filtro ativo", () => {
    render(
      <MatchFilters
        filters={{ ...DEFAULT_MATCH_FILTERS, status: "live" }}
        onChange={vi.fn()}
        onReset={vi.fn()}
      />
    );
    expect(screen.getByLabelText(/clear all filters/i)).toBeInTheDocument();
  });

  it("chama onChange ao digitar na busca", async () => {
    const onChange = vi.fn();
    render(<MatchFilters filters={DEFAULT_MATCH_FILTERS} onChange={onChange} onReset={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, "Brazil");
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ search: expect.any(String) }));
  });

  it("chama onReset ao clicar em Clear", async () => {
    const onReset = vi.fn();
    render(
      <MatchFilters
        filters={{ ...DEFAULT_MATCH_FILTERS, status: "live" }}
        onChange={vi.fn()}
        onReset={onReset}
      />
    );
    await userEvent.click(screen.getByLabelText(/clear all filters/i));
    expect(onReset).toHaveBeenCalledOnce();
  });

  it("tem role search acessível", () => {
    render(<MatchFilters filters={DEFAULT_MATCH_FILTERS} onChange={vi.fn()} onReset={vi.fn()} />);
    expect(screen.getByRole("search", { name: /filter matches/i })).toBeInTheDocument();
  });
});
