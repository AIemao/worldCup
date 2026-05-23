import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LiveBadge } from "./LiveBadge";

afterEach(() => cleanup());

describe("LiveBadge", () => {
  it("exibe o texto LIVE", () => {
    render(<LiveBadge />);
    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });

  it("tem role='status' para acessibilidade", () => {
    render(<LiveBadge />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("tem aria-label 'Live match' sem minuto", () => {
    render(<LiveBadge />);
    expect(screen.getByLabelText("Live match")).toBeInTheDocument();
  });

  it("tem aria-label com minuto quando minute é fornecido", () => {
    render(<LiveBadge minute={67} />);
    expect(screen.getByLabelText("Live match, minute 67")).toBeInTheDocument();
  });

  it("exibe o minuto quando fornecido", () => {
    render(<LiveBadge minute={45} />);
    expect(screen.getByText("45'")).toBeInTheDocument();
  });

  it("não exibe minuto quando não fornecido", () => {
    render(<LiveBadge />);
    expect(screen.queryByText(/'/)).not.toBeInTheDocument();
  });

  it("exibe o indicador pulsante vermelho", () => {
    const { container } = render(<LiveBadge />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("aceita className adicional", () => {
    const { container } = render(<LiveBadge className="extra-class" />);
    expect(container.firstChild).toHaveClass("extra-class");
  });
});
