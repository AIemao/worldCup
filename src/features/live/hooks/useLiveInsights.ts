import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getLiveInsights } from "../services";
import type { LiveInsights } from "../types/live.types";

type UseLiveInsightsResult = {
  data: LiveInsights | undefined;
  isLoading: boolean;
  isError: boolean;
};

/**
 * Acessa os insights de IA para uma partida ao vivo.
 *
 * Faz refetch a cada 15 segundos — insights são mais estáticos que o placar.
 */
export function useLiveInsights(matchId: string): UseLiveInsightsResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.live.insights(matchId),
    queryFn: () => getLiveInsights(matchId),
    refetchInterval: 15_000,
    enabled: Boolean(matchId),
  });

  return { data, isLoading, isError };
}
