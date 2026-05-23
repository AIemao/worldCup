import {
  MatchScoreSchema,
  MatchStatusSchema,
  TeamRefSchema,
} from "@/features/matches/types/match.types";
import { z } from "zod";

// ─── Group Letter ─────────────────────────────────────────────────────────────

export const GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

export const GroupLetterSchema = z.enum(["A", "B", "C", "D", "E", "F", "G", "H"]);
export type GroupLetter = z.infer<typeof GroupLetterSchema>;

// ─── Group ────────────────────────────────────────────────────────────────────

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(), // "Group A"
  letter: GroupLetterSchema, // "A"
});
export type Group = z.infer<typeof GroupSchema>;

export const GroupListSchema = z.array(GroupSchema);
export type GroupList = z.infer<typeof GroupListSchema>;

// ─── Qualification Status ─────────────────────────────────────────────────────

export const QualificationStatusSchema = z.enum(["qualified", "playoff", "eliminated", "pending"]);
export type QualificationStatus = z.infer<typeof QualificationStatusSchema>;

// ─── Group Standing ───────────────────────────────────────────────────────────

export const GroupStandingSchema = z.object({
  teamId: z.string(),
  teamName: z.string(),
  teamShortName: z.string(),
  teamFlagEmoji: z.string(),
  teamBadge: z.string().url(),

  played: z.number().int().min(0),
  wins: z.number().int().min(0),
  draws: z.number().int().min(0),
  losses: z.number().int().min(0),

  goalsFor: z.number().int().min(0),
  goalsAgainst: z.number().int().min(0),
  goalDifference: z.number().int(),

  points: z.number().int().min(0),

  position: z.number().int().min(1),

  qualificationStatus: QualificationStatusSchema,
});
export type GroupStanding = z.infer<typeof GroupStandingSchema>;

export const GroupStandingListSchema = z.array(GroupStandingSchema);
export type GroupStandingList = z.infer<typeof GroupStandingListSchema>;

// ─── Group Match ──────────────────────────────────────────────────────────────

export const GroupMatchSchema = z.object({
  id: z.string(),

  homeTeam: TeamRefSchema,
  awayTeam: TeamRefSchema,

  status: MatchStatusSchema,

  scheduledAt: z.string(),

  venue: z.string().optional(),

  score: MatchScoreSchema.optional(),

  currentMinute: z.number().int().min(0).max(120).optional(),

  isLive: z.boolean(),

  round: z.string(), // "Matchday 1"

  groupLetter: GroupLetterSchema,
});
export type GroupMatch = z.infer<typeof GroupMatchSchema>;

export const GroupMatchListSchema = z.array(GroupMatchSchema);
export type GroupMatchList = z.infer<typeof GroupMatchListSchema>;

// ─── TheSportsDB API constants ────────────────────────────────────────────────

/** FIFA World Cup league ID in TheSportsDB */
export const SPORTSDB_WC_LEAGUE_ID = "4429" as const;

/** World Cup 2026 season in TheSportsDB format */
export const SPORTSDB_WC_SEASON = "2025-2026" as const;
