import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getGroupStandings } from "../services";
import type { GroupStandingList } from "../types/groups.types";

type UseGroupStandingsResult = {
  data: GroupStandingList | undefined;
  isLoading: boolean;
  isError: boolean;
};

/**
 * Acessa a classificação de um grupo específico.
 *
 * @param groupLetter - "A" através de "H"
 *
 * Desativado automaticamente se groupLetter estiver vazio.
 */
export function useGroupStandings(groupLetter: string): UseGroupStandingsResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.groups.standings(groupLetter),
    queryFn: () => getGroupStandings(groupLetter),
    enabled: Boolean(groupLetter),
  });

  return { data, isLoading, isError };
}
