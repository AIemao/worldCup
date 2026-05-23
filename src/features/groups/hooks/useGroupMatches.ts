import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getGroupMatches } from "../services";
import type { GroupMatchList } from "../types/groups.types";

type UseGroupMatchesResult = {
  data: GroupMatchList | undefined;
  isLoading: boolean;
  isError: boolean;
};

/**
 * Acessa as partidas de um grupo específico.
 *
 * @param groupLetter - "A" através de "H"
 *
 * Desativado automaticamente se groupLetter estiver vazio.
 */
export function useGroupMatches(groupLetter: string): UseGroupMatchesResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.groups.matches(groupLetter),
    queryFn: () => getGroupMatches(groupLetter),
    enabled: Boolean(groupLetter),
  });

  return { data, isLoading, isError };
}
