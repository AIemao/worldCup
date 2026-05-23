import { useCallback, useMemo, useState } from "react";
import type { Match, MatchFilters } from "../types/match.types";
import { DEFAULT_MATCH_FILTERS } from "../types/match.types";
import { useMatches } from "./useMatches";

type UseFilteredMatchesResult = {
  matches: Match[];
  filters: MatchFilters;
  updateFilters: (updates: Partial<MatchFilters>) => void;
  resetFilters: () => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Aplica filtros client-side sobre a lista de partidas retornada por useMatches.
 *
 * Filtros suportados:
 * - status: "all" | "upcoming" | "live" | "finished"
 * - stage:  "all" | MatchStage
 * - search: texto livre (busca em nomes de equipes, venue, cidade)
 * - team:   ID da equipe (casa ou visitante)
 *
 * Usa useMemo para evitar re-filtragem desnecessária.
 * Usa useCallback para estabilizar referências das funções de setter.
 */
export function useFilteredMatches(): UseFilteredMatchesResult {
  const [filters, setFilters] = useState<MatchFilters>(DEFAULT_MATCH_FILTERS);
  const { data: allMatches, isLoading, isError, error, refetch } = useMatches();

  const matches = useMemo(() => {
    if (!allMatches) return [];
    return filterMatches(allMatches, filters);
  }, [allMatches, filters]);

  const updateFilters = useCallback((updates: Partial<MatchFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_MATCH_FILTERS);
  }, []);

  return { matches, filters, updateFilters, resetFilters, isLoading, isError, error, refetch };
}

// ─── Pure filter logic ────────────────────────────────────────────────────────

function filterMatches(matches: Match[], filters: MatchFilters): Match[] {
  let result = matches;

  if (filters.status !== "all") {
    result = result.filter((m) => m.status === filters.status);
  }

  if (filters.stage !== "all") {
    result = result.filter((m) => m.stage === filters.stage);
  }

  if (filters.team) {
    const teamId = filters.team.toLowerCase();
    result = result.filter(
      (m) => m.homeTeam.id.toLowerCase() === teamId || m.awayTeam.id.toLowerCase() === teamId
    );
  }

  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    result = result.filter(
      (m) =>
        m.homeTeam.name.toLowerCase().includes(query) ||
        m.homeTeam.shortName.toLowerCase().includes(query) ||
        m.awayTeam.name.toLowerCase().includes(query) ||
        m.awayTeam.shortName.toLowerCase().includes(query) ||
        m.venue.toLowerCase().includes(query) ||
        m.city.toLowerCase().includes(query) ||
        m.round.toLowerCase().includes(query)
    );
  }

  return result;
}
