// Components
export { GroupCard } from "./components/GroupCard";
export { GroupMatchCard } from "./components/GroupMatchCard";
export { GroupMatches } from "./components/GroupMatches";
export { GroupTable } from "./components/GroupTable";
export { GroupTableRow } from "./components/GroupTableRow";
export { GroupTabs } from "./components/GroupTabs";
export { QualificationBadge } from "./components/QualificationBadge";

// Hooks
export { useGroupMatches } from "./hooks/useGroupMatches";
export { useGroups } from "./hooks/useGroups";
export { useGroupStandings } from "./hooks/useGroupStandings";

// Pages
export { GroupDetailsPage } from "./pages/GroupDetailsPage";
export { GroupsPage } from "./pages/GroupsPage";

// Services
export { getGroupMatches, getGroups, getGroupStandings } from "./services";

// Types
export {
  GROUP_LETTERS,
  GroupLetterSchema,
  GroupListSchema,
  GroupMatchListSchema,
  GroupMatchSchema,
  GroupSchema,
  GroupStandingListSchema,
  GroupStandingSchema,
  QualificationStatusSchema,
  SPORTSDB_WC_LEAGUE_ID,
  SPORTSDB_WC_SEASON,
} from "./types/groups.types";
export type {
  Group,
  GroupLetter,
  GroupList,
  GroupMatch,
  GroupMatchList,
  GroupStanding,
  GroupStandingList,
  QualificationStatus,
} from "./types/groups.types";

// Adapters (TheSportsDB integration utilities)
export { mapSportsDbEventToGroupMatch, mapSportsDbStandingToGroupStanding } from "./adapters";
