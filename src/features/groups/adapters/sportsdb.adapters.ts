import type { MatchStatus } from "@/features/matches/types/match.types";
import type {
  GroupLetter,
  GroupMatch,
  GroupStanding,
  QualificationStatus,
} from "../types/groups.types";

// ─── TheSportsDB Response Types ───────────────────────────────────────────────

/**
 * Row returned by TheSportsDB /lookuptable.php endpoint.
 * Reference: https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=4429&s=2025-2026
 */
export type SportsDbTableRow = {
  idLeague: string;
  idTeam: string;
  strTeam: string;
  strTeamShort?: string;
  strTeamBadge: string;
  intPlayed: number;
  intWin: number;
  intDraw: number;
  intLoss: number;
  intGoalsFor: number;
  intGoalsAgainst: number;
  intGoalDifference: number;
  intPoints: number;
  intRank: number;
  strGroup: string;
  strDescription?: string;
};

export type SportsDbTableResponse = {
  table: SportsDbTableRow[] | null;
};

/**
 * Event returned by TheSportsDB /eventsseason.php endpoint.
 * Reference: https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=4429&s=2025-2026
 */
export type SportsDbEvent = {
  idEvent: string;
  idLeague: string;
  idHomeTeam: string;
  idAwayTeam: string;
  strHomeTeam: string;
  strAwayTeam: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  strHomeTeamShort?: string;
  strAwayTeamShort?: string;
  intHomeScore: number | string | null;
  intAwayScore: number | string | null;
  strStatus: string; // "NS" | "1H" | "HT" | "2H" | "FT" | "AET" | "PEN"
  dateEvent: string; // "2026-06-11"
  strTime: string; // "18:00:00"
  strVenue?: string;
  strRound?: string;
  strGroup?: string;
  intProgress?: string;
};

export type SportsDbEventsResponse = {
  events: SportsDbEvent[] | null;
};

// ─── Status mapping ───────────────────────────────────────────────────────────

const LIVE_STATUSES = new Set(["1H", "HT", "2H", "ET", "P", "LIVE"]);
const FINISHED_STATUSES = new Set(["FT", "AET", "PEN"]);

function mapSportsDbStatus(strStatus: string): MatchStatus {
  if (LIVE_STATUSES.has(strStatus)) return "live";
  if (FINISHED_STATUSES.has(strStatus)) return "finished";
  return "upcoming";
}

// ─── Qualification mapping ────────────────────────────────────────────────────

function mapSportsDbDescription(strDescription?: string): QualificationStatus {
  const d = (strDescription ?? "").toLowerCase();
  if (d.includes("qualified") || d.includes("champion") || d.includes("promoted")) {
    return "qualified";
  }
  if (d.includes("playoff") || d.includes("play-off") || d.includes("promotion playoff")) {
    return "playoff";
  }
  if (d.includes("relegated") || d.includes("eliminated")) {
    return "eliminated";
  }
  return "pending";
}

// ─── Group letter extraction ──────────────────────────────────────────────────

function extractGroupLetter(strGroup: string): GroupLetter {
  const match = /Group\s+([A-H])/i.exec(strGroup);
  return (match?.[1]?.toUpperCase() as GroupLetter) ?? "A";
}

// ─── Adapters ─────────────────────────────────────────────────────────────────

/**
 * Maps a TheSportsDB table row to our internal GroupStanding schema.
 *
 * Note: TheSportsDB does not provide flag emojis — use teamBadge URL instead.
 * The teamFlagEmoji field will be populated from our own team registry if available.
 */
export function mapSportsDbStandingToGroupStanding(
  row: SportsDbTableRow,
  positionOverride?: number
): GroupStanding {
  return {
    teamId: row.idTeam,
    teamName: row.strTeam,
    teamShortName: row.strTeamShort ?? row.strTeam.slice(0, 3).toUpperCase(),
    teamFlagEmoji: "🏳️",
    teamBadge: row.strTeamBadge,
    played: Number(row.intPlayed),
    wins: Number(row.intWin),
    draws: Number(row.intDraw),
    losses: Number(row.intLoss),
    goalsFor: Number(row.intGoalsFor),
    goalsAgainst: Number(row.intGoalsAgainst),
    goalDifference: Number(row.intGoalDifference),
    points: Number(row.intPoints),
    position: positionOverride ?? Number(row.intRank),
    qualificationStatus: mapSportsDbDescription(row.strDescription),
  };
}

/**
 * Maps a TheSportsDB event to our internal GroupMatch schema.
 *
 * Note: Flag emojis and primaryColors are not available from TheSportsDB.
 * Downstream enrichment from team registry is recommended.
 */
export function mapSportsDbEventToGroupMatch(event: SportsDbEvent): GroupMatch {
  const status = mapSportsDbStatus(event.strStatus);
  const isLive = status === "live";

  const homeScore =
    event.intHomeScore !== null && event.intHomeScore !== ""
      ? Number(event.intHomeScore)
      : undefined;
  const awayScore =
    event.intAwayScore !== null && event.intAwayScore !== ""
      ? Number(event.intAwayScore)
      : undefined;

  return {
    id: event.idEvent,
    homeTeam: {
      id: event.idHomeTeam,
      name: event.strHomeTeam,
      shortName: event.strHomeTeamShort ?? event.strHomeTeam.slice(0, 3).toUpperCase(),
      flagEmoji: "🏳️",
      primaryColor: "#ffffff",
    },
    awayTeam: {
      id: event.idAwayTeam,
      name: event.strAwayTeam,
      shortName: event.strAwayTeamShort ?? event.strAwayTeam.slice(0, 3).toUpperCase(),
      flagEmoji: "🏳️",
      primaryColor: "#ffffff",
    },
    status,
    scheduledAt: `${event.dateEvent}T${event.strTime}Z`,
    venue: event.strVenue,
    score:
      homeScore !== undefined && awayScore !== undefined
        ? { home: homeScore, away: awayScore }
        : undefined,
    isLive,
    round: event.strRound ?? "Matchday",
    groupLetter: extractGroupLetter(event.strGroup ?? "A"),
  };
}
