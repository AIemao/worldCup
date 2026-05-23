import type { Match, MatchEvent, MatchStats, TeamRef } from "../types/match.types";

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

const GERMANY: TeamRef = {
  id: "ger",
  name: "Germany",
  shortName: "GER",
  flagEmoji: "🇩🇪",
  primaryColor: "#1D1D1B",
};

const FRANCE: TeamRef = {
  id: "fra",
  name: "France",
  shortName: "FRA",
  flagEmoji: "🇫🇷",
  primaryColor: "#002395",
};

const SPAIN: TeamRef = {
  id: "esp",
  name: "Spain",
  shortName: "ESP",
  flagEmoji: "🇪🇸",
  primaryColor: "#AA151B",
};

const ENGLAND: TeamRef = {
  id: "eng",
  name: "England",
  shortName: "ENG",
  flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  primaryColor: "#CF081F",
};

const NETHERLANDS: TeamRef = {
  id: "ned",
  name: "Netherlands",
  shortName: "NED",
  flagEmoji: "🇳🇱",
  primaryColor: "#FF4F00",
};

const PORTUGAL: TeamRef = {
  id: "por",
  name: "Portugal",
  shortName: "POR",
  flagEmoji: "🇵🇹",
  primaryColor: "#006600",
};

const MEXICO: TeamRef = {
  id: "mex",
  name: "Mexico",
  shortName: "MEX",
  flagEmoji: "🇲🇽",
  primaryColor: "#006847",
};

const USA: TeamRef = {
  id: "usa",
  name: "United States",
  shortName: "USA",
  flagEmoji: "🇺🇸",
  primaryColor: "#B22234",
};

const JAPAN: TeamRef = {
  id: "jpn",
  name: "Japan",
  shortName: "JPN",
  flagEmoji: "🇯🇵",
  primaryColor: "#BC002D",
};

const SOUTH_KOREA: TeamRef = {
  id: "kor",
  name: "South Korea",
  shortName: "KOR",
  flagEmoji: "🇰🇷",
  primaryColor: "#CD2E3A",
};

const MOROCCO: TeamRef = {
  id: "mar",
  name: "Morocco",
  shortName: "MAR",
  flagEmoji: "🇲🇦",
  primaryColor: "#C1272D",
};

const SENEGAL: TeamRef = {
  id: "sen",
  name: "Senegal",
  shortName: "SEN",
  flagEmoji: "🇸🇳",
  primaryColor: "#00853F",
};

const CANADA: TeamRef = {
  id: "can",
  name: "Canada",
  shortName: "CAN",
  flagEmoji: "🇨🇦",
  primaryColor: "#FF0000",
};

const AUSTRALIA: TeamRef = {
  id: "aus",
  name: "Australia",
  shortName: "AUS",
  flagEmoji: "🇦🇺",
  primaryColor: "#00843D",
};

// ─── Stats helpers ─────────────────────────────────────────────────────────────

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

// ─── Events helpers ────────────────────────────────────────────────────────────

let eventIdCounter = 1;
function makeGoal(
  minute: number,
  teamId: string,
  playerName: string,
  assistName?: string
): MatchEvent {
  return {
    id: `evt-${eventIdCounter++}`,
    minute,
    type: "goal",
    teamId,
    playerName,
    assistName,
  };
}
function makeYellow(minute: number, teamId: string, playerName: string): MatchEvent {
  return { id: `evt-${eventIdCounter++}`, minute, type: "yellow_card", teamId, playerName };
}
function makeRed(minute: number, teamId: string, playerName: string): MatchEvent {
  return { id: `evt-${eventIdCounter++}`, minute, type: "red_card", teamId, playerName };
}
function makeSub(minute: number, teamId: string, playerName: string, detail: string): MatchEvent {
  return {
    id: `evt-${eventIdCounter++}`,
    minute,
    type: "substitution",
    teamId,
    playerName,
    detail,
  };
}

// ─── Mock matches ──────────────────────────────────────────────────────────────

export const matchesMockData: Match[] = [
  // ── Group Stage ────────────────────────────────────────────────────────────

  {
    id: "wc26-m01",
    homeTeam: MEXICO,
    awayTeam: USA,
    scheduledAt: "2026-06-11T20:00:00Z",
    venue: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    status: "finished",
    stage: "group_a",
    round: "Group A — Matchday 1",
    score: { home: 2, away: 1 },
    attendance: 87523,
    events: [
      makeGoal(23, "mex", "H. Lozano", "A. Vega"),
      makeGoal(45, "usa", "C. Pulisic"),
      makeYellow(58, "usa", "T. Adams"),
      makeGoal(67, "mex", "R. Jimenez", "H. Lozano"),
      makeSub(74, "mex", "H. Lozano", "J. Corona"),
    ],
    stats: makeStats([52, 48], [14, 11], [6, 4], [7, 5], [12, 10], [2, 1], [0, 0]),
  },

  {
    id: "wc26-m02",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    scheduledAt: "2026-06-12T22:00:00Z",
    venue: "MetLife Stadium",
    city: "East Rutherford",
    country: "USA",
    status: "live",
    stage: "group_b",
    round: "Group B — Matchday 1",
    score: { home: 1, away: 0 },
    currentMinute: 73,
    events: [makeGoal(51, "bra", "Vinicius Jr.", "Rodrygo"), makeYellow(64, "arg", "L. Paredes")],
    stats: makeStats([58, 42], [9, 6], [4, 2], [5, 3], [8, 11], [1, 1], [0, 0]),
  },

  {
    id: "wc26-m03",
    homeTeam: GERMANY,
    awayTeam: FRANCE,
    scheduledAt: "2026-06-18T18:00:00Z",
    venue: "AT&T Stadium",
    city: "Arlington",
    country: "USA",
    status: "upcoming",
    stage: "group_c",
    round: "Group C — Matchday 1",
  },

  {
    id: "wc26-m04",
    homeTeam: SPAIN,
    awayTeam: ENGLAND,
    scheduledAt: "2026-06-19T21:00:00Z",
    venue: "SoFi Stadium",
    city: "Inglewood",
    country: "USA",
    status: "upcoming",
    stage: "group_d",
    round: "Group D — Matchday 1",
  },

  {
    id: "wc26-m05",
    homeTeam: NETHERLANDS,
    awayTeam: PORTUGAL,
    scheduledAt: "2026-06-14T15:00:00Z",
    venue: "Hard Rock Stadium",
    city: "Miami Gardens",
    country: "USA",
    status: "finished",
    stage: "group_e",
    round: "Group E — Matchday 1",
    score: { home: 3, away: 2 },
    attendance: 62321,
    events: [
      makeGoal(12, "ned", "C. Gakpo"),
      makeGoal(28, "por", "R. Leao", "B. Fernandes"),
      makeGoal(44, "ned", "D. Dumfries"),
      makeYellow(58, "por", "Pepe"),
      makeGoal(71, "por", "B. Fernandes"),
      makeGoal(85, "ned", "D. Malen", "C. Gakpo"),
    ],
    stats: makeStats([45, 55], [13, 16], [5, 7], [6, 8], [14, 9], [1, 2], [0, 0]),
  },

  {
    id: "wc26-m06",
    homeTeam: JAPAN,
    awayTeam: SOUTH_KOREA,
    scheduledAt: "2026-06-20T14:00:00Z",
    venue: "Levi's Stadium",
    city: "Santa Clara",
    country: "USA",
    status: "upcoming",
    stage: "group_f",
    round: "Group F — Matchday 1",
  },

  {
    id: "wc26-m07",
    homeTeam: MOROCCO,
    awayTeam: SENEGAL,
    scheduledAt: "2026-06-15T17:00:00Z",
    venue: "BC Place",
    city: "Vancouver",
    country: "Canada",
    status: "finished",
    stage: "group_g",
    round: "Group G — Matchday 1",
    score: { home: 1, away: 0 },
    attendance: 54500,
    events: [
      makeGoal(39, "mar", "Y. En-Nesyri"),
      makeYellow(52, "sen", "K. Coulibaly"),
      makeYellow(77, "mar", "A. Hakimi"),
    ],
    stats: makeStats([46, 54], [10, 12], [3, 5], [4, 6], [13, 11], [1, 1], [0, 0]),
  },

  {
    id: "wc26-m08",
    homeTeam: CANADA,
    awayTeam: AUSTRALIA,
    scheduledAt: "2026-06-21T16:00:00Z",
    venue: "BMO Field",
    city: "Toronto",
    country: "Canada",
    status: "upcoming",
    stage: "group_h",
    round: "Group H — Matchday 1",
  },

  // ── Knockout Stage ─────────────────────────────────────────────────────────

  {
    id: "wc26-r16-01",
    homeTeam: BRAZIL,
    awayTeam: SPAIN,
    scheduledAt: "2026-07-01T20:00:00Z",
    venue: "MetLife Stadium",
    city: "East Rutherford",
    country: "USA",
    status: "finished",
    stage: "round_of_16",
    round: "Round of 16",
    score: { home: 2, away: 1 },
    attendance: 82500,
    events: [
      makeGoal(31, "bra", "Raphinha", "Vinicius Jr."),
      makeGoal(56, "esp", "A. Morata"),
      makeYellow(68, "esp", "R. Le Normand"),
      makeGoal(82, "bra", "Rodrygo", "Raphinha"),
    ],
    stats: makeStats([54, 46], [16, 12], [7, 4], [8, 6], [10, 13], [2, 1], [0, 0]),
  },

  {
    id: "wc26-qf-01",
    homeTeam: GERMANY,
    awayTeam: ARGENTINA,
    scheduledAt: "2026-07-05T20:00:00Z",
    venue: "AT&T Stadium",
    city: "Arlington",
    country: "USA",
    status: "upcoming",
    stage: "quarter_final",
    round: "Quarter Final",
  },

  {
    id: "wc26-sf-01",
    homeTeam: FRANCE,
    awayTeam: MOROCCO,
    scheduledAt: "2026-07-08T20:00:00Z",
    venue: "Levi's Stadium",
    city: "Santa Clara",
    country: "USA",
    status: "finished",
    stage: "semi_final",
    round: "Semi Final",
    score: { home: 2, away: 0 },
    attendance: 68200,
    events: [
      makeGoal(34, "fra", "K. Mbappe", "A. Griezmann"),
      makeYellow(49, "mar", "S. Amrabat"),
      makeGoal(78, "fra", "A. Griezmann"),
      makeRed(88, "mar", "N. Mazraoui"),
    ],
    stats: makeStats([60, 40], [18, 7], [8, 2], [9, 3], [8, 15], [1, 3], [0, 1]),
  },

  {
    id: "wc26-sf-02",
    homeTeam: BRAZIL,
    awayTeam: NETHERLANDS,
    scheduledAt: "2026-07-09T20:00:00Z",
    venue: "MetLife Stadium",
    city: "East Rutherford",
    country: "USA",
    status: "live",
    stage: "semi_final",
    round: "Semi Final",
    score: { home: 1, away: 1 },
    currentMinute: 64,
    events: [
      makeGoal(22, "bra", "Vinicius Jr.", "Raphinha"),
      makeGoal(47, "ned", "C. Gakpo"),
      makeYellow(59, "bra", "Casemiro"),
    ],
    stats: makeStats([55, 45], [11, 9], [5, 3], [6, 4], [9, 10], [1, 1], [0, 0]),
  },

  {
    id: "wc26-3p",
    homeTeam: MOROCCO,
    awayTeam: NETHERLANDS,
    scheduledAt: "2026-07-12T16:00:00Z",
    venue: "Rose Bowl",
    city: "Pasadena",
    country: "USA",
    status: "upcoming",
    stage: "third_place",
    round: "Third Place Playoff",
  },

  {
    id: "wc26-final",
    homeTeam: BRAZIL,
    awayTeam: FRANCE,
    scheduledAt: "2026-07-19T20:00:00Z",
    venue: "MetLife Stadium",
    city: "East Rutherford",
    country: "USA",
    status: "upcoming",
    stage: "final",
    round: "FIFA World Cup Final",
  },
];
