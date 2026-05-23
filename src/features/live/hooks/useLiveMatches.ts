import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getLiveMatches } from "../services";
import type { LiveMatchList } from "../types/live.types";

/** Polling interval for live data (5 seconds) */
const LIVE_REFETCH_INTERVAL_MS = 5_000;

type UseLiveMatchesResult = {
  data: LiveMatchList | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Acessa a lista de partidas ao vivo com polling automático.
 *
 * Faz refetch a cada 5 segundos para simular atualizações em tempo real.
 * Em produção, pode ser substituído por WebSocket/SSE sem afetar componentes.
 */
export function useLiveMatches(): UseLiveMatchesResult {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.live.lists(),
    queryFn: getLiveMatches,
    refetchInterval: LIVE_REFETCH_INTERVAL_MS,
  });

  return { data, isLoading, isError, error, refetch };
}
