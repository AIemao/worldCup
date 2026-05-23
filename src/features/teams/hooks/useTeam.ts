import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getTeam } from "../services/teams.service";
import { TEAMS_QUERY_CONFIG } from "../types/teams.types";

export function useTeam(teamId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.teams.detail(teamId),
    queryFn: () => getTeam(teamId),
    enabled: Boolean(teamId),
    staleTime: TEAMS_QUERY_CONFIG.staleTime,
    gcTime: TEAMS_QUERY_CONFIG.gcTime,
    retry: TEAMS_QUERY_CONFIG.retry,
  });

  return { data, isLoading, isError, error };
}
