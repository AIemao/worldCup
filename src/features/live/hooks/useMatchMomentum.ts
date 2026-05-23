import { useMemo } from "react";
import type { LiveMatch } from "../types/live.types";
import { MOMENTUM_WEIGHTS, NULL_STATS, type Momentum } from "../types/live.types";

/**
 * Calcula o momentum das equipes com base nas estatísticas da partida.
 *
 * Pesos aplicados:
 * - Finalizações: 30%
 * - Posse de bola: 25%
 * - Finalizações no alvo: 25%
 * - Escanteios: 20%
 *
 * O resultado é normalizado para que home + away = 100.
 */
export function useMatchMomentum(match: LiveMatch | null): Momentum {
  return useMemo((): Momentum => {
    if (!match?.stats) {
      return { home: 50, away: 50, trend: "neutral" };
    }

    const s = match.stats ?? NULL_STATS;

    function homeWeighted(home: number, away: number, weight: number): number {
      const total = home + away;
      if (total === 0) return 50 * weight;
      return (home / total) * 100 * weight;
    }

    const shotsHome = homeWeighted(s.shots.home, s.shots.away, MOMENTUM_WEIGHTS.shots);
    const posHome = homeWeighted(s.possession.home, s.possession.away, MOMENTUM_WEIGHTS.possession);
    const sotHome = homeWeighted(
      s.shotsOnTarget.home,
      s.shotsOnTarget.away,
      MOMENTUM_WEIGHTS.shotsOnTarget
    );
    const cornersHome = homeWeighted(s.corners.home, s.corners.away, MOMENTUM_WEIGHTS.corners);

    const home = Math.round(shotsHome + posHome + sotHome + cornersHome);
    const away = 100 - home;

    let trend: Momentum["trend"];
    const diff = home - away;
    if (diff >= 10) trend = "rising_home";
    else if (diff <= -10) trend = "rising_away";
    else trend = "neutral";

    return { home, away, trend };
  }, [match]);
}
