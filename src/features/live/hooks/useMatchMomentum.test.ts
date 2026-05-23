import { liveMatchesMockData } from "@/features/live/data";
import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useMatchMomentum } from "./useMatchMomentum";

afterEach(() => cleanup());

describe("useMatchMomentum", () => {
  it("retorna 50/50 quando match é null", () => {
    const { result } = renderHook(() => useMatchMomentum(null));
    expect(result.current.home).toBe(50);
    expect(result.current.away).toBe(50);
    expect(result.current.trend).toBe("neutral");
  });

  it("retorna 50/50 quando match não tem stats", () => {
    const match = { ...liveMatchesMockData[0], stats: undefined };
    const { result } = renderHook(() => useMatchMomentum(match as never));
    expect(result.current.home).toBe(50);
    expect(result.current.away).toBe(50);
  });

  it("home + away é sempre igual a 100", () => {
    const match = liveMatchesMockData[0];
    const { result } = renderHook(() => useMatchMomentum(match));
    expect(result.current.home + result.current.away).toBe(100);
  });

  it("home e away estão entre 0 e 100", () => {
    for (const match of liveMatchesMockData) {
      const { result } = renderHook(() => useMatchMomentum(match));
      expect(result.current.home).toBeGreaterThanOrEqual(0);
      expect(result.current.home).toBeLessThanOrEqual(100);
      expect(result.current.away).toBeGreaterThanOrEqual(0);
      expect(result.current.away).toBeLessThanOrEqual(100);
    }
  });

  it("trend é 'rising_home' quando home domina por >= 10 pontos", () => {
    const match = {
      ...liveMatchesMockData[0],
      stats: {
        possession: { home: 70, away: 30 },
        shots: { home: 15, away: 3 },
        shotsOnTarget: { home: 8, away: 1 },
        corners: { home: 8, away: 1 },
        fouls: { home: 5, away: 8 },
        yellowCards: { home: 0, away: 1 },
        redCards: { home: 0, away: 0 },
      },
    };
    const { result } = renderHook(() => useMatchMomentum(match));
    expect(result.current.trend).toBe("rising_home");
  });

  it("trend é 'rising_away' quando away domina por >= 10 pontos", () => {
    const match = {
      ...liveMatchesMockData[0],
      stats: {
        possession: { home: 30, away: 70 },
        shots: { home: 3, away: 15 },
        shotsOnTarget: { home: 1, away: 8 },
        corners: { home: 1, away: 8 },
        fouls: { home: 8, away: 5 },
        yellowCards: { home: 1, away: 0 },
        redCards: { home: 0, away: 0 },
      },
    };
    const { result } = renderHook(() => useMatchMomentum(match));
    expect(result.current.trend).toBe("rising_away");
  });

  it("trend é 'neutral' para partidas equilibradas", () => {
    const match = {
      ...liveMatchesMockData[0],
      stats: {
        possession: { home: 50, away: 50 },
        shots: { home: 5, away: 5 },
        shotsOnTarget: { home: 2, away: 2 },
        corners: { home: 3, away: 3 },
        fouls: { home: 6, away: 6 },
        yellowCards: { home: 1, away: 1 },
        redCards: { home: 0, away: 0 },
      },
    };
    const { result } = renderHook(() => useMatchMomentum(match));
    expect(result.current.trend).toBe("neutral");
  });
});
