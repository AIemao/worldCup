import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getMatches } from "../services";
import type { MatchList } from "../types/match.types";

type UseMatchesResult = {
  data: MatchList | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Acessa a lista completa de partidas via React Query.
 *
 * Interface pública estável — a implementação pode evoluir
 * (mock → API real → realtime) sem alterar os componentes consumidores.
 */
export function useMatches(): UseMatchesResult {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.matches.lists(),
    queryFn: getMatches,
  });

  return { data, isLoading, isError, error, refetch };
}
