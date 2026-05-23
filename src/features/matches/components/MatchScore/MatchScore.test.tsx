import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MatchScore } from "./MatchScore";

afterEach(() => cleanup());

describe("MatchScore", () => {
  it("exibe 'vs' para partida upcoming", () => {
    render(<MatchScore status="upcoming" scheduledAt="2026-06-18T18:00:00Z" />);
    expect(screen.getByText("vs")).toBeInTheDocument();
  });

  it("exibe o placar para partida finished", () => {
    render(
      <MatchScore
        status="finished"
        score={{ home: 2, away: 1 }}
        scheduledAt="2026-06-11T20:00:00Z"
      />
    );
    expect(screen.getByLabelText("Score: 2 - 1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("exibe o minuto atual para partida live", () => {
    render(
      <MatchScore
        status="live"
        score={{ home: 1, away: 0 }}
        scheduledAt="2026-06-12T22:00:00Z"
        currentMinute={73}
      />
    );
    expect(screen.getByText("73'")).toBeInTheDocument();
  });

  it("exibe pênaltis quando aplicável", () => {
    render(
      <MatchScore
        status="finished"
        score={{ home: 1, away: 1, homePenalties: 4, awayPenalties: 3 }}
        scheduledAt="2026-07-05T20:00:00Z"
      />
    );
    expect(screen.getByText("(4 – 3) pens")).toBeInTheDocument();
  });

  it("exibe o horário UTC para partida upcoming", () => {
    render(<MatchScore status="upcoming" scheduledAt="2026-06-18T18:00:00Z" />);
    expect(screen.getByText("18:00 UTC")).toBeInTheDocument();
  });
});
