import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getLiveMatchById } from "../services";
import type { LiveMatch } from "../types/live.types";

const LIVE_REFETCH_INTERVAL_MS = 5_000;

type UseLiveMatchResult = {
  data: LiveMatch | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Acessa o detalhe de uma partida ao vivo pelo ID com polling automático.
 */
export function useLiveMatch(matchId: string): UseLiveMatchResult {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.live.detail(matchId),
    queryFn: () => getLiveMatchById(matchId),
    refetchInterval: LIVE_REFETCH_INTERVAL_MS,
    enabled: Boolean(matchId),
  });

  return { data, isLoading, isError, error, refetch };
}
