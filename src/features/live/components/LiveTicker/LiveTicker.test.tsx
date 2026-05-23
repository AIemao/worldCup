import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { tickerMockData } from "../../data";
import { LiveTicker } from "./LiveTicker";

afterEach(() => cleanup());

describe("LiveTicker", () => {
  it("renderiza o label LIVE", () => {
    render(<LiveTicker items={tickerMockData} />);
    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });

  it("exibe o texto do primeiro item por padrão", () => {
    render(<LiveTicker items={tickerMockData} />);
    expect(screen.getByText(tickerMockData[0].text)).toBeInTheDocument();
  });

  it("tem aria-label de acessibilidade", () => {
    render(<LiveTicker items={tickerMockData} />);
    expect(screen.getByLabelText("Live match ticker")).toBeInTheDocument();
  });

  it("tem aria-live='polite' para leitores de tela", () => {
    render(<LiveTicker items={tickerMockData} />);
    const ticker = screen.getByLabelText("Live match ticker");
    expect(ticker).toHaveAttribute("aria-live", "polite");
  });

  it("não renderiza quando lista está vazia", () => {
    const { container } = render(<LiveTicker items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
