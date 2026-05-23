import { MatchScoreSchema, TeamRefSchema } from "@/features/matches/types/match.types";
import { z } from "zod";

// ─── API Constants ─────────────────────────────────────────────────────────────

/** FIFA World Cup league ID in TheSportsDB */
export const SPORTSDB_WC_LEAGUE_ID = "4429" as const;

/** World Cup 2026 season in TheSportsDB format */
export const SPORTSDB_WC_SEASON = "2025-2026" as const;

// ─── Query Config ─────────────────────────────────────────────────────────────

/**
 * Configuração React Query para a feature Teams.
 * Minimiza rate-limit da API gratuita (30 req/min).
 */
export const TEAMS_QUERY_CONFIG = {
  staleTime: 5 * 60 * 1_000, // 5 min
  gcTime: 30 * 60 * 1_000, // 30 min
  retry: 1 as const,
} as const;

// ─── Player ───────────────────────────────────────────────────────────────────

export const PlayerPositionSchema = z.enum(["goalkeeper", "defender", "midfielder", "forward"]);
export type PlayerPosition = z.infer<typeof PlayerPositionSchema>;

export const MatchFormSchema = z.enum(["W", "D", "L"]);
export type MatchForm = z.infer<typeof MatchFormSchema>;

// ─── Team Stats ───────────────────────────────────────────────────────────────

export const TeamStatsSchema = z.object({
  matchesPlayed: z.number().int().min(0),
  wins: z.number().int().min(0),
  draws: z.number().int().min(0),
  losses: z.number().int().min(0),
  goalsFor: z.number().int().min(0),
  goalsAgainst: z.number().int().min(0),
  cleanSheets: z.number().int().min(0),
  form: z.array(MatchFormSchema).max(5),
});
export type TeamStats = z.infer<typeof TeamStatsSchema>;

// ─── Team ─────────────────────────────────────────────────────────────────────

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  country: z.string(),
  formedYear: z.string().optional(),
  sport: z.string().default("Soccer"),
  league: z.string(),
  description: z.string().optional(),
  badge: z.string().url(),
  jersey: z.string().url().optional(),
  banner: z.string().url().optional(),
  fanart: z.string().url().optional(),
  stadium: z.string().optional(),
  stadiumThumb: z.string().url().optional(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  gender: z.string().default("Male"),
  flagEmoji: z.string(),
  primaryColor: z.string(),
  groupLetter: z.string().optional(),
  stats: TeamStatsSchema.optional(),
});
export type Team = z.infer<typeof TeamSchema>;

export const TeamListSchema = z.array(TeamSchema);
export type TeamList = z.infer<typeof TeamListSchema>;

// ─── Player ───────────────────────────────────────────────────────────────────

export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  nationality: z.string(),
  position: PlayerPositionSchema,
  birthDate: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  cutout: z.string().url().optional(),
  thumb: z.string().url().optional(),
  fanart: z.string().url().optional(),
  description: z.string().optional(),
  teamId: z.string(),
  shirtNumber: z.string().optional(),
});
export type Player = z.infer<typeof PlayerSchema>;

export const PlayerListSchema = z.array(PlayerSchema);
export type PlayerList = z.infer<typeof PlayerListSchema>;

// ─── Schedule Match (upcoming) ────────────────────────────────────────────────

export const TeamScheduleMatchSchema = z.object({
  id: z.string(),
  homeTeam: TeamRefSchema,
  awayTeam: TeamRefSchema,
  status: z.literal("upcoming"),
  scheduledAt: z.string(),
  venue: z.string().optional(),
  round: z.string(),
  competition: z.string(),
});
export type TeamScheduleMatch = z.infer<typeof TeamScheduleMatchSchema>;

export const TeamScheduleListSchema = z.array(TeamScheduleMatchSchema);
export type TeamScheduleList = z.infer<typeof TeamScheduleListSchema>;

// ─── Result Match (finished) ──────────────────────────────────────────────────

export const TeamResultMatchSchema = z.object({
  id: z.string(),
  homeTeam: TeamRefSchema,
  awayTeam: TeamRefSchema,
  status: z.literal("finished"),
  scheduledAt: z.string(),
  venue: z.string().optional(),
  score: MatchScoreSchema,
  round: z.string(),
  competition: z.string(),
});
export type TeamResultMatch = z.infer<typeof TeamResultMatchSchema>;

export const TeamResultListSchema = z.array(TeamResultMatchSchema);
export type TeamResultList = z.infer<typeof TeamResultListSchema>;
