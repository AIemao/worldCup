import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getMatchById } from "../services";
import type { Match } from "../types/match.types";

type UseMatchDetailsResult = {
  data: Match | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Acessa o detalhe de uma partida específica via React Query.
 *
 * A query é habilitada apenas quando matchId é uma string não vazia.
 * Retorna isLoading=false e data=undefined enquanto matchId é falsy.
 */
export function useMatchDetails(matchId: string | undefined): UseMatchDetailsResult {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.matches.detail(matchId ?? ""),
    queryFn: () => getMatchById(matchId!),
    enabled: Boolean(matchId),
  });

  return { data, isLoading, isError, error, refetch };
}
