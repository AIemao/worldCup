import { z } from "zod";

// ─── Match ───────────────────────────────────────────────────────────────────

export const MatchStatusSchema = z.enum(["upcoming", "live", "finished"]);
export type MatchStatus = z.infer<typeof MatchStatusSchema>;

export const TeamRefSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  flagEmoji: z.string(),
  primaryColor: z.string(),
});
export type TeamRef = z.infer<typeof TeamRefSchema>;

export const MatchScoreSchema = z.object({
  home: z.number().int().min(0),
  away: z.number().int().min(0),
});
export type MatchScore = z.infer<typeof MatchScoreSchema>;

export const FeaturedMatchSchema = z.object({
  id: z.string(),
  homeTeam: TeamRefSchema,
  awayTeam: TeamRefSchema,
  scheduledAt: z.string().datetime(),
  venue: z.string(),
  city: z.string(),
  status: MatchStatusSchema,
  score: MatchScoreSchema.optional(),
  round: z.string(),
});
export type FeaturedMatch = z.infer<typeof FeaturedMatchSchema>;

// ─── Stats ───────────────────────────────────────────────────────────────────

export const TournamentStatSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  suffix: z.string().optional(),
});
export type TournamentStat = z.infer<typeof TournamentStatSchema>;

// ─── Page data ───────────────────────────────────────────────────────────────

export const HomeDataSchema = z.object({
  featuredMatch: FeaturedMatchSchema.nullable(),
  stats: z.array(TournamentStatSchema),
});
export type HomeData = z.infer<typeof HomeDataSchema>;
