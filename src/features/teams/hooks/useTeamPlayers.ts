import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getTeamPlayers } from "../services/teams.service";
import { TEAMS_QUERY_CONFIG } from "../types/teams.types";

export function useTeamPlayers(teamId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.teams.players(teamId),
    queryFn: () => getTeamPlayers(teamId),
    enabled: Boolean(teamId),
    staleTime: TEAMS_QUERY_CONFIG.staleTime,
    gcTime: TEAMS_QUERY_CONFIG.gcTime,
    retry: TEAMS_QUERY_CONFIG.retry,
  });

  return { data: data ?? [], isLoading, isError, error };
}
