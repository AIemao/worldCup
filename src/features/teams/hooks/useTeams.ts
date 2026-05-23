import { queryKeys } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../services/teams.service";
import { TEAMS_QUERY_CONFIG } from "../types/teams.types";

export function useTeams() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.teams.lists(),
    queryFn: getTeams,
    staleTime: TEAMS_QUERY_CONFIG.staleTime,
    gcTime: TEAMS_QUERY_CONFIG.gcTime,
    retry: TEAMS_QUERY_CONFIG.retry,
  });

  return { data: data ?? [], isLoading, isError, error };
}
