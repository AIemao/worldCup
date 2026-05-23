import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { liveInsightsMockData } from "../../data";
import { LiveInsightsPanel } from "./LiveInsightsPanel";

afterEach(() => cleanup());

const insights = liveInsightsMockData.insights;

describe("LiveInsightsPanel", () => {
  it("renderiza com aria-label do painel", () => {
    render(<LiveInsightsPanel insights={insights} />);
    expect(screen.getByLabelText("AI insights panel")).toBeInTheDocument();
  });

  it("exibe o título 'AI Insights'", () => {
    render(<LiveInsightsPanel insights={insights} />);
    expect(screen.getByText("AI Insights")).toBeInTheDocument();
  });

  it("renderiza todos os insights", () => {
    render(<LiveInsightsPanel insights={insights} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(insights.length);
  });

  it("exibe o texto de cada insight", () => {
    render(<LiveInsightsPanel insights={insights} />);
    expect(screen.getByText(insights[0].text)).toBeInTheDocument();
  });

  it("exibe a confidence como percentual", () => {
    render(<LiveInsightsPanel insights={insights} />);
    const pct = Math.round(insights[0].confidence * 100);
    expect(screen.getAllByText(`${pct}%`).length).toBeGreaterThan(0);
  });

  it("exibe o estado vazio quando não há insights", () => {
    render(<LiveInsightsPanel insights={[]} />);
    expect(screen.getByLabelText("No insights available")).toBeInTheDocument();
    expect(screen.getByText("No AI insights yet")).toBeInTheDocument();
  });

  it("cada item tem aria-label com o tipo", () => {
    render(<LiveInsightsPanel insights={insights} />);
    expect(screen.getByLabelText(`${insights[0].type} insight`)).toBeInTheDocument();
  });
});
