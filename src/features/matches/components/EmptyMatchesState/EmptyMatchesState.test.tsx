import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EmptyMatchesState } from "./EmptyMatchesState";

afterEach(() => cleanup());

describe("EmptyMatchesState", () => {
  it("exibe a mensagem padrão", () => {
    render(<EmptyMatchesState />);
    expect(screen.getByText(/no matches found/i)).toBeInTheDocument();
  });

  it("exibe uma mensagem customizada", () => {
    render(<EmptyMatchesState message="Nenhuma partida ao vivo agora." />);
    expect(screen.getByText("Nenhuma partida ao vivo agora.")).toBeInTheDocument();
  });

  it("tem role status com aria-live", () => {
    render(<EmptyMatchesState />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("exibe o título 'No matches'", () => {
    render(<EmptyMatchesState />);
    expect(screen.getByText("No matches")).toBeInTheDocument();
  });
});
