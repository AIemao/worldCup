import {
  MatchSchema,
  MatchScoreSchema,
  MatchStatsSchema,
  TeamRefSchema,
} from "@/features/matches/types/match.types";
import { z } from "zod";

// ─── Elapsed Phase ────────────────────────────────────────────────────────────

export const ElapsedPhaseSchema = z.enum([
  "first_half",
  "half_time",
  "second_half",
  "extra_time_1",
  "extra_time_2",
  "penalties",
]);
export type ElapsedPhase = z.infer<typeof ElapsedPhaseSchema>;

// ─── Live Match ───────────────────────────────────────────────────────────────

/**
 * LiveMatch extends Match with fields required only during live matches.
 *
 * Differences from Match:
 * - status is literal "live" (not a union)
 * - score is required (not optional)
 * - currentMinute is required (not optional)
 * - elapsedPhase is required (new field)
 */
export const LiveMatchSchema = MatchSchema.omit({
  status: true,
  score: true,
  currentMinute: true,
}).extend({
  status: z.literal("live"),
  score: MatchScoreSchema,
  currentMinute: z.number().int().min(0).max(120),
  elapsedPhase: ElapsedPhaseSchema,
});
export type LiveMatch = z.infer<typeof LiveMatchSchema>;

export const LiveMatchListSchema = z.array(LiveMatchSchema);
export type LiveMatchList = z.infer<typeof LiveMatchListSchema>;

// ─── Momentum ────────────────────────────────────────────────────────────────

export const MomentumTrendSchema = z.enum(["rising_home", "rising_away", "neutral"]);
export type MomentumTrend = z.infer<typeof MomentumTrendSchema>;

export const MomentumSchema = z.object({
  home: z.number().min(0).max(100),
  away: z.number().min(0).max(100),
  trend: MomentumTrendSchema,
});
export type Momentum = z.infer<typeof MomentumSchema>;

// ─── Ticker ───────────────────────────────────────────────────────────────────

export const TickerItemTypeSchema = z.enum([
  "score_update",
  "goal",
  "yellow_card",
  "red_card",
  "substitution",
  "kick_off",
  "half_time",
  "full_time",
  "var_review",
  "penalty",
]);
export type TickerItemType = z.infer<typeof TickerItemTypeSchema>;

export const TickerItemSchema = z.object({
  id: z.string(),
  type: TickerItemTypeSchema,
  matchId: z.string(),
  homeTeam: TeamRefSchema,
  awayTeam: TeamRefSchema,
  score: MatchScoreSchema.optional(),
  minute: z.number().int().min(0).max(120).optional(),
  text: z.string(),
});
export type TickerItem = z.infer<typeof TickerItemSchema>;

// ─── Live Insights ────────────────────────────────────────────────────────────

export const InsightTypeSchema = z.enum([
  "momentum",
  "prediction",
  "tactical",
  "historical",
  "stat",
]);
export type InsightType = z.infer<typeof InsightTypeSchema>;

export const LiveInsightSchema = z.object({
  id: z.string(),
  type: InsightTypeSchema,
  text: z.string(),
  confidence: z.number().min(0).max(1),
  teamId: z.string().optional(),
});
export type LiveInsight = z.infer<typeof LiveInsightSchema>;

export const LiveInsightsSchema = z.object({
  matchId: z.string(),
  insights: z.array(LiveInsightSchema),
  generatedAt: z.string().datetime(),
});
export type LiveInsights = z.infer<typeof LiveInsightsSchema>;

// ─── Re-export stats type for local use ───────────────────────────────────────

export type { MatchStats } from "@/features/matches/types/match.types";

// ─── Momentum weights (used in calculations) ─────────────────────────────────

/** Weights used in momentum calculation — exported for test visibility */
export const MOMENTUM_WEIGHTS = {
  shots: 0.3,
  possession: 0.25,
  shotsOnTarget: 0.25,
  corners: 0.2,
} as const;

// ─── Null-safe stats helpers ──────────────────────────────────────────────────

export const NULL_STATS: z.infer<typeof MatchStatsSchema> = {
  possession: { home: 50, away: 50 },
  shots: { home: 0, away: 0 },
  shotsOnTarget: { home: 0, away: 0 },
  corners: { home: 0, away: 0 },
  fouls: { home: 0, away: 0 },
  yellowCards: { home: 0, away: 0 },
  redCards: { home: 0, away: 0 },
};
