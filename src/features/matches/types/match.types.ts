import { z } from "zod";

// ─── Status & Stage ───────────────────────────────────────────────────────────

export const MatchStatusSchema = z.enum(["upcoming", "live", "finished"]);
export type MatchStatus = z.infer<typeof MatchStatusSchema>;

export const MatchStageSchema = z.enum([
  "group_a",
  "group_b",
  "group_c",
  "group_d",
  "group_e",
  "group_f",
  "group_g",
  "group_h",
  "round_of_32",
  "round_of_16",
  "quarter_final",
  "semi_final",
  "third_place",
  "final",
]);
export type MatchStage = z.infer<typeof MatchStageSchema>;

// ─── Team ─────────────────────────────────────────────────────────────────────

export const TeamRefSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  flagEmoji: z.string(),
  primaryColor: z.string(),
});
export type TeamRef = z.infer<typeof TeamRefSchema>;

// ─── Score ────────────────────────────────────────────────────────────────────

export const MatchScoreSchema = z.object({
  home: z.number().int().min(0),
  away: z.number().int().min(0),
  homePenalties: z.number().int().min(0).optional(),
  awayPenalties: z.number().int().min(0).optional(),
});
export type MatchScore = z.infer<typeof MatchScoreSchema>;

// ─── Events ───────────────────────────────────────────────────────────────────

export const MatchEventTypeSchema = z.enum([
  "goal",
  "own_goal",
  "yellow_card",
  "second_yellow",
  "red_card",
  "substitution",
  "var_review",
  "penalty_saved",
  "penalty_missed",
]);
export type MatchEventType = z.infer<typeof MatchEventTypeSchema>;

export const MatchEventSchema = z.object({
  id: z.string(),
  minute: z.number().int().min(0).max(120),
  extraTime: z.number().int().min(0).optional(),
  type: MatchEventTypeSchema,
  teamId: z.string(),
  playerName: z.string(),
  assistName: z.string().optional(),
  detail: z.string().optional(),
});
export type MatchEvent = z.infer<typeof MatchEventSchema>;

// ─── Stats ────────────────────────────────────────────────────────────────────

const StatPairSchema = z.object({
  home: z.number(),
  away: z.number(),
});

export const MatchStatsSchema = z.object({
  possession: StatPairSchema,
  shots: StatPairSchema,
  shotsOnTarget: StatPairSchema,
  corners: StatPairSchema,
  fouls: StatPairSchema,
  yellowCards: StatPairSchema,
  redCards: StatPairSchema,
});
export type MatchStats = z.infer<typeof MatchStatsSchema>;

// ─── Match ────────────────────────────────────────────────────────────────────

export const MatchSchema = z.object({
  id: z.string(),
  homeTeam: TeamRefSchema,
  awayTeam: TeamRefSchema,
  scheduledAt: z.string().datetime(),
  venue: z.string(),
  city: z.string(),
  country: z.string(),
  status: MatchStatusSchema,
  stage: MatchStageSchema,
  round: z.string(),
  /** Defined for live and finished matches */
  score: MatchScoreSchema.optional(),
  /** Defined for live and finished matches */
  events: z.array(MatchEventSchema).optional(),
  /** Defined for finished matches and live (partial) */
  stats: MatchStatsSchema.optional(),
  attendance: z.number().int().optional(),
  /** Current minute — defined only for live matches */
  currentMinute: z.number().int().min(0).max(120).optional(),
});
export type Match = z.infer<typeof MatchSchema>;

export const MatchListSchema = z.array(MatchSchema);
export type MatchList = z.infer<typeof MatchListSchema>;

// ─── Filters ──────────────────────────────────────────────────────────────────

export type MatchFilters = {
  status: MatchStatus | "all";
  stage: MatchStage | "all";
  search: string;
  team: string;
};

export const DEFAULT_MATCH_FILTERS: MatchFilters = {
  status: "all",
  stage: "all",
  search: "",
  team: "",
};

// ─── Stage display labels ─────────────────────────────────────────────────────

export const STAGE_LABELS: Record<MatchStage, string> = {
  group_a: "Group A",
  group_b: "Group B",
  group_c: "Group C",
  group_d: "Group D",
  group_e: "Group E",
  group_f: "Group F",
  group_g: "Group G",
  group_h: "Group H",
  round_of_32: "Round of 32",
  round_of_16: "Round of 16",
  quarter_final: "Quarter Final",
  semi_final: "Semi Final",
  third_place: "Third Place",
  final: "Final",
};

export const STATUS_LABELS: Record<MatchStatus, string> = {
  upcoming: "Upcoming",
  live: "Live",
  finished: "Final",
};
