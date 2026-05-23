import type { TeamRef } from "@/features/matches/types/match.types";
import type { LiveInsights, LiveMatch, MatchStats, TickerItem } from "../types/live.types";

// ─── Teams ────────────────────────────────────────────────────────────────────

const BRAZIL: TeamRef = {
  id: "bra",
  name: "Brazil",
  shortName: "BRA",
  flagEmoji: "🇧🇷",
  primaryColor: "#009C3B",
};

const ARGENTINA: TeamRef = {
  id: "arg",
  name: "Argentina",
  shortName: "ARG",
  flagEmoji: "🇦🇷",
  primaryColor: "#74ACDF",
};

const FRANCE: TeamRef = {
  id: "fra",
  name: "France",
  shortName: "FRA",
  flagEmoji: "🇫🇷",
  primaryColor: "#002395",
};

const ENGLAND: TeamRef = {
  id: "eng",
  name: "England",
  shortName: "ENG",
  flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  primaryColor: "#CF081F",
};

// ─── Stats helpers ────────────────────────────────────────────────────────────

function makeStats(
  possession: [number, number],
  shots: [number, number],
  shotsOnTarget: [number, number],
  corners: [number, number],
  fouls: [number, number],
  yellowCards: [number, number],
  redCards: [number, number]
): MatchStats {
  return {
    possession: { home: possession[0], away: possession[1] },
    shots: { home: shots[0], away: shots[1] },
    shotsOnTarget: { home: shotsOnTarget[0], away: shotsOnTarget[1] },
    corners: { home: corners[0], away: corners[1] },
    fouls: { home: fouls[0], away: fouls[1] },
    yellowCards: { home: yellowCards[0], away: yellowCards[1] },
    redCards: { home: redCards[0], away: redCards[1] },
  };
}

// ─── Live Matches ─────────────────────────────────────────────────────────────

export const liveMatchesMockData: LiveMatch[] = [
  {
    id: "wc26-live-01",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    scheduledAt: "2026-06-14T17:00:00.000Z",
    venue: "SoFi Stadium",
    city: "Los Angeles",
    country: "USA",
    status: "live",
    stage: "semi_final",
    round: "Semi Final",
    score: { home: 2, away: 1 },
    currentMinute: 67,
    elapsedPhase: "second_half",
    attendance: 70240,
    events: [
      {
        id: "e01",
        minute: 14,
        type: "goal",
        teamId: "bra",
        playerName: "Vinicius Jr.",
        assistName: "Rodrygo",
      },
      {
        id: "e02",
        minute: 38,
        type: "yellow_card",
        teamId: "arg",
        playerName: "De Paul",
      },
      {
        id: "e03",
        minute: 52,
        type: "goal",
        teamId: "arg",
        playerName: "Messi",
        assistName: "Di Maria",
      },
      {
        id: "e04",
        minute: 61,
        type: "goal",
        teamId: "bra",
        playerName: "Rodrygo",
        assistName: "Vinicius Jr.",
      },
    ],
    stats: makeStats([58, 42], [12, 7], [5, 3], [6, 3], [8, 11], [1, 2], [0, 0]),
  },
  {
    id: "wc26-live-02",
    homeTeam: FRANCE,
    awayTeam: ENGLAND,
    scheduledAt: "2026-06-14T21:00:00.000Z",
    venue: "MetLife Stadium",
    city: "East Rutherford",
    country: "USA",
    status: "live",
    stage: "semi_final",
    round: "Semi Final",
    score: { home: 0, away: 0 },
    currentMinute: 23,
    elapsedPhase: "first_half",
    attendance: 82500,
    events: [
      {
        id: "e05",
        minute: 7,
        type: "var_review",
        teamId: "fra",
        playerName: "Mbappé",
        detail: "Goal disallowed — offside confirmed by VAR",
      },
      {
        id: "e06",
        minute: 19,
        type: "yellow_card",
        teamId: "eng",
        playerName: "Rice",
      },
    ],
    stats: makeStats([52, 48], [5, 4], [2, 1], [3, 2], [5, 4], [0, 1], [0, 0]),
  },
];

// ─── Ticker Items ─────────────────────────────────────────────────────────────

export const tickerMockData: TickerItem[] = [
  {
    id: "t01",
    type: "goal",
    matchId: "wc26-live-01",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    score: { home: 2, away: 1 },
    minute: 61,
    text: "GOAL! Rodrygo (BRA) — 61' — BRA 2–1 ARG",
  },
  {
    id: "t02",
    type: "score_update",
    matchId: "wc26-live-02",
    homeTeam: FRANCE,
    awayTeam: ENGLAND,
    score: { home: 0, away: 0 },
    minute: 23,
    text: "FRA 0–0 ENG — 23' — Semi Final",
  },
  {
    id: "t03",
    type: "var_review",
    matchId: "wc26-live-02",
    homeTeam: FRANCE,
    awayTeam: ENGLAND,
    minute: 7,
    text: "VAR: Mbappé goal DISALLOWED — offside",
  },
  {
    id: "t04",
    type: "goal",
    matchId: "wc26-live-01",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    score: { home: 1, away: 1 },
    minute: 52,
    text: "GOAL! Messi (ARG) — 52' — BRA 1–1 ARG",
  },
  {
    id: "t05",
    type: "goal",
    matchId: "wc26-live-01",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    score: { home: 1, away: 0 },
    minute: 14,
    text: "GOAL! Vinicius Jr. (BRA) — 14' — BRA 1–0 ARG",
  },
  {
    id: "t06",
    type: "yellow_card",
    matchId: "wc26-live-01",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    minute: 38,
    text: "YELLOW CARD: De Paul (ARG) — 38'",
  },
];

// ─── Live Insights ────────────────────────────────────────────────────────────

export const liveInsightsMockData: LiveInsights = {
  matchId: "wc26-live-01",
  generatedAt: "2026-06-14T18:07:00.000Z",
  insights: [
    {
      id: "i01",
      type: "stat",
      text: "Brazil dominating possession with 58% in the second half.",
      confidence: 0.95,
      teamId: "bra",
    },
    {
      id: "i02",
      type: "tactical",
      text: "Vinicius Jr. creating danger on the left flank — 4 key actions since the 60th minute.",
      confidence: 0.81,
      teamId: "bra",
    },
    {
      id: "i03",
      type: "prediction",
      text: "Based on current momentum, Brazil has a 74% probability of winning.",
      confidence: 0.74,
    },
    {
      id: "i04",
      type: "historical",
      text: "Argentina have scored in the last 8 consecutive knockout stage matches.",
      confidence: 0.88,
      teamId: "arg",
    },
  ],
};
