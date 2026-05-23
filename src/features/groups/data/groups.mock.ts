import type { TeamRef } from "@/features/matches/types/match.types";
import type { GroupList, GroupMatch, GroupStanding } from "../types/groups.types";

// ─── Teams ────────────────────────────────────────────────────────────────────

function team(
  id: string,
  name: string,
  shortName: string,
  flagEmoji: string,
  primaryColor: string
): TeamRef {
  return { id, name, shortName, flagEmoji, primaryColor };
}

// Group A
const BRA = team("bra", "Brazil", "BRA", "🇧🇷", "#009C3B");
const SUI = team("sui", "Switzerland", "SUI", "🇨🇭", "#D52B1E");
const SRB = team("srb", "Serbia", "SRB", "🇷🇸", "#C6363C");
const CMR = team("cmr", "Cameroon", "CMR", "🇨🇲", "#007A5E");

// Group B
const ENG = team("eng", "England", "ENG", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "#CF081F");
const USA = team("usa", "United States", "USA", "🇺🇸", "#B22234");
const IRN = team("irn", "Iran", "IRN", "🇮🇷", "#239F40");
const WAL = team("wal", "Wales", "WAL", "🏴󠁧󠁢󠁷󠁬󠁳󠁿", "#D01012");

// Group C
const ARG = team("arg", "Argentina", "ARG", "🇦🇷", "#74ACDF");
const POL = team("pol", "Poland", "POL", "🇵🇱", "#DC143C");
const MEX = team("mex", "Mexico", "MEX", "🇲🇽", "#006847");
const SAU = team("sau", "Saudi Arabia", "SAU", "🇸🇦", "#006C35");

// Group D
const FRA = team("fra", "France", "FRA", "🇫🇷", "#002395");
const AUS = team("aus", "Australia", "AUS", "🇦🇺", "#00843D");
const DEN = team("den", "Denmark", "DEN", "🇩🇰", "#C60C30");
const TUN = team("tun", "Tunisia", "TUN", "🇹🇳", "#E70013");

// Group E
const ESP = team("esp", "Spain", "ESP", "🇪🇸", "#AA151B");
const GER = team("ger", "Germany", "GER", "🇩🇪", "#1D1D1B");
const JPN = team("jpn", "Japan", "JPN", "🇯🇵", "#BC002D");
const CRC = team("crc", "Costa Rica", "CRC", "🇨🇷", "#002B7F");

// Group F
const BEL = team("bel", "Belgium", "BEL", "🇧🇪", "#EF3340");
const CRO = team("cro", "Croatia", "CRO", "🇭🇷", "#FF0000");
const MAR = team("mar", "Morocco", "MAR", "🇲🇦", "#C1272D");
const CAN = team("can", "Canada", "CAN", "🇨🇦", "#FF0000");

// Group G
const POR = team("por", "Portugal", "POR", "🇵🇹", "#006600");
const URU = team("uru", "Uruguay", "URU", "🇺🇾", "#5AAAD8");
const KOR = team("kor", "South Korea", "KOR", "🇰🇷", "#CD2E3A");
const GHA = team("gha", "Ghana", "GHA", "🇬🇭", "#006B3F");

// Group H
const NED = team("ned", "Netherlands", "NED", "🇳🇱", "#FF4F00");
const SEN = team("sen", "Senegal", "SEN", "🇸🇳", "#00853F");
const ECU = team("ecu", "Ecuador", "ECU", "🇪🇨", "#FFD100");
const QAT = team("qat", "Qatar", "QAT", "🇶🇦", "#8D1B3D");

// ─── Badge URL helper ─────────────────────────────────────────────────────────

function badge(id: string) {
  return `https://placehold.co/40x40/1a1a2e/ffffff?text=${id.toUpperCase()}`;
}

// ─── Standing helper ──────────────────────────────────────────────────────────

function standing(
  t: TeamRef,
  position: number,
  w: number,
  d: number,
  l: number,
  gf: number,
  ga: number,
  status: GroupStanding["qualificationStatus"]
): GroupStanding {
  return {
    teamId: t.id,
    teamName: t.name,
    teamShortName: t.shortName,
    teamFlagEmoji: t.flagEmoji,
    teamBadge: badge(t.id),
    played: w + d + l,
    wins: w,
    draws: d,
    losses: l,
    goalsFor: gf,
    goalsAgainst: ga,
    goalDifference: gf - ga,
    points: w * 3 + d,
    position,
    qualificationStatus: status,
  };
}

// ─── Match helper ─────────────────────────────────────────────────────────────

let _matchIdx = 0;

function finishedMatch(
  home: TeamRef,
  away: TeamRef,
  homeGoals: number,
  awayGoals: number,
  matchday: number,
  groupLetter: GroupMatch["groupLetter"],
  venue: string
): GroupMatch {
  _matchIdx++;
  return {
    id: `wc26-gm-${String(_matchIdx).padStart(3, "0")}`,
    homeTeam: home,
    awayTeam: away,
    status: "finished",
    scheduledAt: `2026-06-${String(10 + matchday).padStart(2, "0")}T15:00:00.000Z`,
    venue,
    score: { home: homeGoals, away: awayGoals },
    isLive: false,
    round: `Matchday ${matchday}`,
    groupLetter,
  };
}

function upcomingMatch(
  home: TeamRef,
  away: TeamRef,
  matchday: number,
  groupLetter: GroupMatch["groupLetter"],
  venue: string
): GroupMatch {
  _matchIdx++;
  return {
    id: `wc26-gm-${String(_matchIdx).padStart(3, "0")}`,
    homeTeam: home,
    awayTeam: away,
    status: "upcoming",
    scheduledAt: `2026-06-${String(18 + matchday).padStart(2, "0")}T18:00:00.000Z`,
    venue,
    isLive: false,
    round: `Matchday ${matchday}`,
    groupLetter,
  };
}

// ─── Groups list ──────────────────────────────────────────────────────────────

export const groupsMockData: GroupList = [
  { id: "group-a", name: "Group A", letter: "A" },
  { id: "group-b", name: "Group B", letter: "B" },
  { id: "group-c", name: "Group C", letter: "C" },
  { id: "group-d", name: "Group D", letter: "D" },
  { id: "group-e", name: "Group E", letter: "E" },
  { id: "group-f", name: "Group F", letter: "F" },
  { id: "group-g", name: "Group G", letter: "G" },
  { id: "group-h", name: "Group H", letter: "H" },
];

// ─── Standings ────────────────────────────────────────────────────────────────

export const groupStandingsMockData: Record<string, GroupStanding[]> = {
  A: [
    standing(BRA, 1, 3, 0, 0, 7, 0, "qualified"),
    standing(SUI, 2, 2, 0, 1, 4, 1, "qualified"),
    standing(SRB, 3, 1, 0, 2, 1, 5, "playoff"),
    standing(CMR, 4, 0, 0, 3, 0, 6, "eliminated"),
  ],
  B: [
    standing(ENG, 1, 2, 1, 0, 3, 0, "qualified"),
    standing(USA, 2, 2, 0, 1, 4, 1, "qualified"),
    standing(IRN, 3, 1, 1, 1, 2, 1, "playoff"),
    standing(WAL, 4, 0, 0, 3, 0, 7, "eliminated"),
  ],
  C: [
    standing(ARG, 1, 2, 1, 0, 5, 2, "qualified"),
    standing(POL, 2, 1, 1, 1, 3, 3, "qualified"),
    standing(MEX, 3, 1, 0, 2, 3, 5, "playoff"),
    standing(SAU, 4, 0, 2, 1, 1, 2, "eliminated"),
  ],
  D: [
    standing(FRA, 1, 3, 0, 0, 8, 2, "qualified"),
    standing(AUS, 2, 1, 1, 1, 3, 3, "qualified"),
    standing(DEN, 3, 1, 0, 2, 4, 6, "playoff"),
    standing(TUN, 4, 0, 1, 2, 2, 6, "eliminated"),
  ],
  E: [
    standing(ESP, 1, 2, 1, 0, 6, 2, "qualified"),
    standing(GER, 2, 2, 0, 1, 7, 4, "qualified"),
    standing(JPN, 3, 1, 0, 2, 5, 8, "playoff"),
    standing(CRC, 4, 0, 1, 2, 1, 5, "eliminated"),
  ],
  F: [
    standing(BEL, 1, 2, 1, 0, 5, 2, "qualified"),
    standing(CRO, 2, 1, 2, 0, 4, 4, "qualified"),
    standing(MAR, 3, 1, 1, 1, 3, 3, "playoff"),
    standing(CAN, 4, 0, 0, 3, 1, 4, "eliminated"),
  ],
  G: [
    standing(POR, 1, 2, 1, 0, 6, 3, "qualified"),
    standing(URU, 2, 1, 2, 0, 4, 3, "qualified"),
    standing(KOR, 3, 1, 0, 2, 4, 6, "playoff"),
    standing(GHA, 4, 0, 1, 2, 3, 5, "eliminated"),
  ],
  H: [
    standing(NED, 1, 3, 0, 0, 8, 2, "qualified"),
    standing(SEN, 2, 1, 1, 1, 4, 4, "qualified"),
    standing(ECU, 3, 1, 0, 2, 3, 5, "playoff"),
    standing(QAT, 4, 0, 1, 2, 2, 6, "eliminated"),
  ],
};

// ─── Matches ──────────────────────────────────────────────────────────────────

export const groupMatchesMockData: Record<string, GroupMatch[]> = {
  A: [
    finishedMatch(BRA, SRB, 3, 0, 1, "A", "MetLife Stadium"),
    finishedMatch(SUI, CMR, 2, 0, 1, "A", "Rose Bowl"),
    finishedMatch(BRA, CMR, 3, 0, 2, "A", "MetLife Stadium"),
    finishedMatch(SRB, SUI, 0, 1, 2, "A", "Rose Bowl"),
    finishedMatch(BRA, SUI, 1, 0, 3, "A", "SoFi Stadium"),
    finishedMatch(CMR, SRB, 0, 1, 3, "A", "Rose Bowl"),
  ],
  B: [
    finishedMatch(ENG, IRN, 0, 0, 1, "B", "AT&T Stadium"),
    finishedMatch(USA, WAL, 3, 0, 1, "B", "Mercedes-Benz Stadium"),
    finishedMatch(ENG, WAL, 2, 0, 2, "B", "AT&T Stadium"),
    finishedMatch(IRN, USA, 0, 1, 2, "B", "Mercedes-Benz Stadium"),
    finishedMatch(ENG, USA, 1, 0, 3, "B", "AT&T Stadium"),
    finishedMatch(WAL, IRN, 0, 2, 3, "B", "Mercedes-Benz Stadium"),
  ],
  C: [
    finishedMatch(ARG, SAU, 1, 1, 1, "C", "Levi's Stadium"),
    finishedMatch(POL, MEX, 0, 0, 1, "C", "Estadio Azteca"),
    finishedMatch(ARG, MEX, 2, 0, 2, "C", "Estadio Azteca"),
    finishedMatch(POL, SAU, 2, 0, 2, "C", "Levi's Stadium"),
    finishedMatch(ARG, POL, 2, 0, 3, "C", "Levi's Stadium"),
    finishedMatch(MEX, SAU, 3, 0, 3, "C", "Estadio Azteca"),
  ],
  D: [
    finishedMatch(FRA, AUS, 4, 1, 1, "D", "Allegiant Stadium"),
    finishedMatch(DEN, TUN, 0, 0, 1, "D", "Lumen Field"),
    finishedMatch(FRA, DEN, 2, 1, 2, "D", "Lumen Field"),
    finishedMatch(TUN, AUS, 1, 0, 2, "D", "Allegiant Stadium"),
    finishedMatch(AUS, DEN, 2, 1, 3, "D", "Allegiant Stadium"),
    finishedMatch(TUN, FRA, 1, 2, 3, "D", "Lumen Field"),
  ],
  E: [
    finishedMatch(ESP, CRC, 7, 0, 1, "E", "Hard Rock Stadium"),
    finishedMatch(GER, JPN, 1, 2, 1, "E", "NRG Stadium"),
    finishedMatch(ESP, GER, 1, 1, 2, "E", "NRG Stadium"),
    finishedMatch(JPN, CRC, 0, 1, 2, "E", "Hard Rock Stadium"),
    finishedMatch(JPN, ESP, 2, 1, 3, "E", "Hard Rock Stadium"),
    finishedMatch(CRC, GER, 2, 4, 3, "E", "NRG Stadium"),
  ],
  F: [
    finishedMatch(BEL, CAN, 1, 0, 1, "F", "Lincoln Financial Field"),
    finishedMatch(MAR, CRO, 0, 0, 1, "F", "Camping World Stadium"),
    finishedMatch(BEL, MAR, 2, 0, 2, "F", "Lincoln Financial Field"),
    finishedMatch(CRO, CAN, 4, 1, 2, "F", "Camping World Stadium"),
    finishedMatch(CRO, BEL, 0, 0, 3, "F", "Camping World Stadium"),
    finishedMatch(CAN, MAR, 1, 2, 3, "F", "Lincoln Financial Field"),
  ],
  G: [
    finishedMatch(POR, GHA, 3, 2, 1, "G", "Bank of America Stadium"),
    finishedMatch(URU, KOR, 0, 0, 1, "G", "Arrowhead Stadium"),
    finishedMatch(POR, URU, 2, 0, 2, "G", "Bank of America Stadium"),
    finishedMatch(KOR, GHA, 2, 3, 2, "G", "Arrowhead Stadium"),
    finishedMatch(GHA, URU, 0, 2, 3, "G", "Bank of America Stadium"),
    finishedMatch(KOR, POR, 2, 1, 3, "G", "Arrowhead Stadium"),
  ],
  H: [
    upcomingMatch(NED, SEN, 1, "H", "Gillette Stadium"),
    upcomingMatch(ECU, QAT, 1, "H", "Highmark Stadium"),
    upcomingMatch(QAT, NED, 2, "H", "Gillette Stadium"),
    upcomingMatch(SEN, ECU, 2, "H", "Highmark Stadium"),
    upcomingMatch(NED, ECU, 3, "H", "Gillette Stadium"),
    upcomingMatch(QAT, SEN, 3, "H", "Highmark Stadium"),
  ],
};
