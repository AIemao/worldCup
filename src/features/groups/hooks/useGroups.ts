import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../services";
import type { GroupList } from "../types/groups.types";

type UseGroupsResult = {
  data: GroupList | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

/**
 * Acessa a lista de todos os grupos do torneio (A–H).
 *
 * Dados de grupos são estáticos durante o torneio —
 * staleTime padrão do QueryClient (2 min) é suficiente.
 */
export function useGroups(): UseGroupsResult {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.groups.lists(),
    queryFn: getGroups,
  });

  return { data, isLoading, isError, error };
}
