// Types (MatchFilters, MatchScore, MatchStats omitted here because
// they share names with same-named components — import types directly
// from "@/features/matches/types/match.types" when needed)
export type {
  Match,
  MatchEvent,
  MatchEventType,
  MatchList,
  MatchStage,
  MatchStatus,
  TeamRef,
} from "./types/match.types";

export {
  DEFAULT_MATCH_FILTERS,
  MatchListSchema,
  MatchSchema,
  MatchStageSchema,
  MatchStatusSchema,
  STAGE_LABELS,
  STATUS_LABELS,
} from "./types/match.types";

// Mock data
export { matchesMockData } from "./data";

// Services
export { getMatchById, getMatches } from "./services";

// Hooks
export { useFilteredMatches } from "./hooks/useFilteredMatches";
export { useMatchDetails } from "./hooks/useMatchDetails";
export { useMatches } from "./hooks/useMatches";

// Components
export { EmptyMatchesState } from "./components/EmptyMatchesState";
export { MatchCard } from "./components/MatchCard";
export { MatchDetailsCard } from "./components/MatchDetailsCard";
export { MatchesGrid } from "./components/MatchesGrid";
export { MatchFilters } from "./components/MatchFilters";
export { MatchHero } from "./components/MatchHero";
export { MatchScore } from "./components/MatchScore";
export { MatchStats } from "./components/MatchStats";
export { MatchStatusBadge } from "./components/MatchStatusBadge";
export { MatchTimeline } from "./components/MatchTimeline";

// Pages
export { MatchDetailsPage } from "./pages/MatchDetailsPage";
export { MatchesPage } from "./pages/MatchesPage";
