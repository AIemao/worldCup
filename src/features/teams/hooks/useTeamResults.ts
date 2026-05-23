import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getTeamResults } from "../services/teams.service";
import { TEAMS_QUERY_CONFIG } from "../types/teams.types";

export function useTeamResults(teamId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.teams.results(teamId),
    queryFn: () => getTeamResults(teamId),
    enabled: Boolean(teamId),
    staleTime: TEAMS_QUERY_CONFIG.staleTime,
    gcTime: TEAMS_QUERY_CONFIG.gcTime,
    retry: TEAMS_QUERY_CONFIG.retry,
  });

  return { data: data ?? [], isLoading, isError, error };
}
