import type { TeamRef } from "@/features/matches/types/match.types";
import type {
  MatchForm,
  Player,
  PlayerPosition,
  Team,
  TeamResultMatch,
  TeamScheduleMatch,
  TeamStats,
} from "../types/teams.types";

// ─── Helper functions ─────────────────────────────────────────────────────────

function badge(id: string): string {
  return `https://www.thesportsdb.com/images/media/team/badge/${id}.png`;
}

function pthumb(id: string): string {
  return `https://www.thesportsdb.com/images/media/player/thumb/${id}.jpg`;
}

function mkStats(
  played: number,
  wins: number,
  draws: number,
  losses: number,
  gf: number,
  ga: number,
  cs: number,
  form: MatchForm[]
): TeamStats {
  return {
    matchesPlayed: played,
    wins,
    draws,
    losses,
    goalsFor: gf,
    goalsAgainst: ga,
    cleanSheets: cs,
    form,
  };
}

function mkTeam(
  id: string,
  name: string,
  short: string,
  country: string,
  flag: string,
  color: string,
  group: string,
  formed: string,
  stadium?: string,
  stats?: TeamStats
): Team {
  return {
    id,
    name,
    shortName: short,
    country,
    formedYear: formed,
    sport: "Soccer",
    league: "FIFA World Cup 2026",
    badge: badge(id),
    flagEmoji: flag,
    primaryColor: color,
    groupLetter: group,
    gender: "Male",
    ...(stadium ? { stadium } : {}),
    ...(stats ? { stats } : {}),
  };
}

function mkPlayer(
  id: string,
  name: string,
  teamId: string,
  nationality: string,
  position: PlayerPosition,
  num: string,
  born?: string
): Player {
  return {
    id,
    name,
    teamId,
    nationality,
    position,
    shirtNumber: num,
    ...(born ? { birthDate: born } : {}),
    thumb: pthumb(id),
  };
}

function ref(t: Team): TeamRef {
  return {
    id: t.id,
    name: t.name,
    shortName: t.shortName,
    flagEmoji: t.flagEmoji,
    primaryColor: t.primaryColor,
  };
}

function mkSchedule(
  id: string,
  home: Team,
  away: Team,
  scheduledAt: string,
  venue: string,
  round: string
): TeamScheduleMatch {
  return {
    id,
    homeTeam: ref(home),
    awayTeam: ref(away),
    status: "upcoming",
    scheduledAt,
    venue,
    round,
    competition: "FIFA World Cup 2026",
  };
}

function mkResult(
  id: string,
  home: Team,
  away: Team,
  hs: number,
  as_: number,
  scheduledAt: string,
  venue: string,
  round: string
): TeamResultMatch {
  return {
    id,
    homeTeam: ref(home),
    awayTeam: ref(away),
    status: "finished",
    score: { home: hs, away: as_ },
    scheduledAt,
    venue,
    round,
    competition: "FIFA World Cup 2026",
  };
}

// ─── Teams ────────────────────────────────────────────────────────────────────

// Group A
export const BRA = mkTeam(
  "bra",
  "Brazil",
  "BRA",
  "Brazil",
  "🇧🇷",
  "#009C3B",
  "A",
  "1914",
  "Maracanã",
  mkStats(3, 3, 0, 0, 7, 1, 2, ["W", "W", "W"])
);
export const SUI = mkTeam(
  "sui",
  "Switzerland",
  "SUI",
  "Switzerland",
  "🇨🇭",
  "#D52B1E",
  "A",
  "1895",
  undefined,
  mkStats(3, 2, 0, 1, 5, 3, 1, ["W", "W", "L"])
);
export const SRB = mkTeam(
  "srb",
  "Serbia",
  "SRB",
  "Serbia",
  "🇷🇸",
  "#C6363C",
  "A",
  "1919",
  undefined,
  mkStats(3, 1, 0, 2, 3, 6, 0, ["L", "W", "L"])
);
export const CMR = mkTeam(
  "cmr",
  "Cameroon",
  "CMR",
  "Cameroon",
  "🇨🇲",
  "#007A5E",
  "A",
  "1959",
  undefined,
  mkStats(3, 0, 0, 3, 2, 7, 0, ["L", "L", "L"])
);

// Group B
export const ENG = mkTeam(
  "eng",
  "England",
  "ENG",
  "England",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "#CF081F",
  "B",
  "1863",
  "Wembley Stadium",
  mkStats(3, 2, 1, 0, 6, 2, 1, ["W", "D", "W"])
);
export const USA = mkTeam(
  "usa",
  "United States",
  "USA",
  "United States",
  "🇺🇸",
  "#B22234",
  "B",
  "1913",
  "MetLife Stadium",
  mkStats(3, 1, 1, 1, 3, 4, 1, ["D", "W", "L"])
);
export const IRN = mkTeam(
  "irn",
  "Iran",
  "IRN",
  "Iran",
  "🇮🇷",
  "#239F40",
  "B",
  "1920",
  undefined,
  mkStats(3, 1, 0, 2, 2, 4, 1, ["L", "W", "L"])
);
export const WAL = mkTeam(
  "wal",
  "Wales",
  "WAL",
  "Wales",
  "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  "#D01012",
  "B",
  "1876",
  undefined,
  mkStats(3, 0, 2, 1, 1, 3, 1, ["L", "D", "D"])
);

// Group C
export const ARG = mkTeam(
  "arg",
  "Argentina",
  "ARG",
  "Argentina",
  "🇦🇷",
  "#74ACDF",
  "C",
  "1893",
  "Estadio Monumental",
  mkStats(3, 3, 0, 0, 6, 0, 3, ["W", "W", "W"])
);
export const POL = mkTeam(
  "pol",
  "Poland",
  "POL",
  "Poland",
  "🇵🇱",
  "#DC143C",
  "C",
  "1919",
  undefined,
  mkStats(3, 2, 0, 1, 5, 4, 0, ["W", "L", "W"])
);
export const MEX = mkTeam(
  "mex",
  "Mexico",
  "MEX",
  "Mexico",
  "🇲🇽",
  "#006847",
  "C",
  "1927",
  "Estadio Azteca",
  mkStats(3, 1, 1, 1, 3, 3, 1, ["W", "D", "L"])
);
export const SAU = mkTeam(
  "sau",
  "Saudi Arabia",
  "SAU",
  "Saudi Arabia",
  "🇸🇦",
  "#006C35",
  "C",
  "1956",
  undefined,
  mkStats(3, 0, 1, 2, 2, 9, 0, ["D", "L", "L"])
);

// Group D
export const FRA = mkTeam(
  "fra",
  "France",
  "FRA",
  "France",
  "🇫🇷",
  "#002395",
  "D",
  "1919",
  "Parc des Princes",
  mkStats(3, 3, 0, 0, 8, 2, 1, ["W", "W", "W"])
);
export const AUS = mkTeam(
  "aus",
  "Australia",
  "AUS",
  "Australia",
  "🇦🇺",
  "#00843D",
  "D",
  "1961",
  undefined,
  mkStats(3, 2, 0, 1, 5, 5, 0, ["W", "W", "L"])
);
export const DEN = mkTeam(
  "den",
  "Denmark",
  "DEN",
  "Denmark",
  "🇩🇰",
  "#C60C30",
  "D",
  "1889",
  undefined,
  mkStats(3, 1, 1, 1, 3, 4, 1, ["L", "D", "W"])
);
export const TUN = mkTeam(
  "tun",
  "Tunisia",
  "TUN",
  "Tunisia",
  "🇹🇳",
  "#E70013",
  "D",
  "1956",
  undefined,
  mkStats(3, 0, 1, 2, 1, 6, 1, ["L", "L", "D"])
);

// Group E
export const ESP = mkTeam(
  "esp",
  "Spain",
  "ESP",
  "Spain",
  "🇪🇸",
  "#AA151B",
  "E",
  "1913",
  "Santiago Bernabéu",
  mkStats(3, 3, 0, 0, 7, 1, 2, ["W", "W", "W"])
);
export const GER = mkTeam(
  "ger",
  "Germany",
  "GER",
  "Germany",
  "🇩🇪",
  "#1D1D1B",
  "E",
  "1900",
  "Allianz Arena",
  mkStats(3, 2, 0, 1, 6, 3, 0, ["W", "W", "L"])
);
export const JPN = mkTeam(
  "jpn",
  "Japan",
  "JPN",
  "Japan",
  "🇯🇵",
  "#BC002D",
  "E",
  "1921",
  undefined,
  mkStats(3, 1, 1, 1, 3, 4, 1, ["L", "W", "D"])
);
export const CRC = mkTeam(
  "crc",
  "Costa Rica",
  "CRC",
  "Costa Rica",
  "🇨🇷",
  "#002B7F",
  "E",
  "1921",
  undefined,
  mkStats(3, 0, 1, 2, 2, 8, 0, ["D", "L", "L"])
);

// Group F
export const BEL = mkTeam(
  "bel",
  "Belgium",
  "BEL",
  "Belgium",
  "🇧🇪",
  "#EF3340",
  "F",
  "1895",
  undefined,
  mkStats(3, 2, 1, 0, 5, 2, 1, ["W", "D", "W"])
);
export const CRO = mkTeam(
  "cro",
  "Croatia",
  "CRO",
  "Croatia",
  "🇭🇷",
  "#FF0000",
  "F",
  "1912",
  undefined,
  mkStats(3, 1, 1, 1, 3, 3, 1, ["W", "D", "L"])
);
export const MAR = mkTeam(
  "mar",
  "Morocco",
  "MAR",
  "Morocco",
  "🇲🇦",
  "#C1272D",
  "F",
  "1955",
  undefined,
  mkStats(3, 1, 1, 1, 2, 2, 2, ["L", "D", "W"])
);
export const CAN = mkTeam(
  "can",
  "Canada",
  "CAN",
  "Canada",
  "🇨🇦",
  "#FF0000",
  "F",
  "1912",
  undefined,
  mkStats(3, 0, 1, 2, 1, 3, 0, ["L", "L", "D"])
);

// Group G
export const POR = mkTeam(
  "por",
  "Portugal",
  "POR",
  "Portugal",
  "🇵🇹",
  "#006600",
  "G",
  "1914",
  "Estádio do Sport Lisboa",
  mkStats(3, 3, 0, 0, 9, 2, 1, ["W", "W", "W"])
);
export const URU = mkTeam(
  "uru",
  "Uruguay",
  "URU",
  "Uruguay",
  "🇺🇾",
  "#5AAAD8",
  "G",
  "1900",
  undefined,
  mkStats(3, 2, 0, 1, 5, 4, 0, ["W", "W", "L"])
);
export const KOR = mkTeam(
  "kor",
  "South Korea",
  "KOR",
  "South Korea",
  "🇰🇷",
  "#CD2E3A",
  "G",
  "1928",
  undefined,
  mkStats(3, 1, 1, 1, 3, 4, 1, ["L", "D", "W"])
);
export const GHA = mkTeam(
  "gha",
  "Ghana",
  "GHA",
  "Ghana",
  "🇬🇭",
  "#006B3F",
  "G",
  "1957",
  undefined,
  mkStats(3, 0, 1, 2, 2, 9, 0, ["L", "L", "D"])
);

// Group H — all matches upcoming
export const NED = mkTeam(
  "ned",
  "Netherlands",
  "NED",
  "Netherlands",
  "🇳🇱",
  "#FF4F00",
  "H",
  "1889",
  undefined,
  mkStats(0, 0, 0, 0, 0, 0, 0, [])
);
export const SEN = mkTeam(
  "sen",
  "Senegal",
  "SEN",
  "Senegal",
  "🇸🇳",
  "#00853F",
  "H",
  "1960",
  undefined,
  mkStats(0, 0, 0, 0, 0, 0, 0, [])
);
export const ECU = mkTeam(
  "ecu",
  "Ecuador",
  "ECU",
  "Ecuador",
  "🇪🇨",
  "#FFD100",
  "H",
  "1925",
  undefined,
  mkStats(0, 0, 0, 0, 0, 0, 0, [])
);
export const QAT = mkTeam(
  "qat",
  "Qatar",
  "QAT",
  "Qatar",
  "🇶🇦",
  "#8D153A",
  "H",
  "1960",
  undefined,
  mkStats(0, 0, 0, 0, 0, 0, 0, [])
);

export const teamsMockData: Team[] = [
  BRA,
  SUI,
  SRB,
  CMR,
  ENG,
  USA,
  IRN,
  WAL,
  ARG,
  POL,
  MEX,
  SAU,
  FRA,
  AUS,
  DEN,
  TUN,
  ESP,
  GER,
  JPN,
  CRC,
  BEL,
  CRO,
  MAR,
  CAN,
  POR,
  URU,
  KOR,
  GHA,
  NED,
  SEN,
  ECU,
  QAT,
];

// ─── Players ──────────────────────────────────────────────────────────────────

export const teamPlayersMockData: Record<string, Player[]> = {
  bra: [
    mkPlayer("bra-gk1", "Ederson", "bra", "Brazil", "goalkeeper", "1", "1993-08-17"),
    mkPlayer("bra-df1", "Marquinhos", "bra", "Brazil", "defender", "5", "1994-05-14"),
    mkPlayer("bra-mf1", "Casemiro", "bra", "Brazil", "midfielder", "18", "1992-02-23"),
    mkPlayer("bra-mf2", "Rodrygo", "bra", "Brazil", "midfielder", "26", "2001-01-09"),
    mkPlayer("bra-fw1", "Vinícius Júnior", "bra", "Brazil", "forward", "7", "2000-07-12"),
  ],
  eng: [
    mkPlayer("eng-gk1", "Jordan Pickford", "eng", "England", "goalkeeper", "1", "1994-03-07"),
    mkPlayer("eng-df1", "Kyle Walker", "eng", "England", "defender", "2", "1990-05-28"),
    mkPlayer("eng-mf1", "Jude Bellingham", "eng", "England", "midfielder", "10", "2003-06-29"),
    mkPlayer("eng-mf2", "Bukayo Saka", "eng", "England", "midfielder", "7", "2001-09-05"),
    mkPlayer("eng-fw1", "Harry Kane", "eng", "England", "forward", "9", "1993-07-28"),
  ],
  arg: [
    mkPlayer("arg-gk1", "Emiliano Martínez", "arg", "Argentina", "goalkeeper", "23", "1992-09-02"),
    mkPlayer("arg-df1", "Cristian Romero", "arg", "Argentina", "defender", "13", "1998-04-27"),
    mkPlayer("arg-mf1", "Rodrigo De Paul", "arg", "Argentina", "midfielder", "7", "1994-05-24"),
    mkPlayer("arg-fw1", "Lautaro Martínez", "arg", "Argentina", "forward", "22", "1997-08-22"),
  ],
  fra: [
    mkPlayer("fra-gk1", "Mike Maignan", "fra", "France", "goalkeeper", "16", "1995-07-03"),
    mkPlayer("fra-df1", "Dayot Upamecano", "fra", "France", "defender", "5", "1998-10-27"),
    mkPlayer("fra-mf1", "Aurélien Tchouaméni", "fra", "France", "midfielder", "8", "2000-01-16"),
    mkPlayer("fra-fw1", "Kylian Mbappé", "fra", "France", "forward", "10", "1998-12-20"),
  ],
  esp: [
    mkPlayer("esp-gk1", "Unai Simón", "esp", "Spain", "goalkeeper", "23", "1997-06-11"),
    mkPlayer("esp-mf1", "Pedri", "esp", "Spain", "midfielder", "16", "2002-11-25"),
    mkPlayer("esp-mf2", "Lamine Yamal", "esp", "Spain", "midfielder", "19", "2007-07-13"),
    mkPlayer("esp-fw1", "Álvaro Morata", "esp", "Spain", "forward", "7", "1992-10-23"),
  ],
  ger: [
    mkPlayer("ger-gk1", "Manuel Neuer", "ger", "Germany", "goalkeeper", "1", "1986-03-27"),
    mkPlayer("ger-df1", "Antonio Rüdiger", "ger", "Germany", "defender", "2", "1993-03-03"),
    mkPlayer("ger-mf1", "Joshua Kimmich", "ger", "Germany", "midfielder", "6", "1995-02-08"),
    mkPlayer("ger-fw1", "Kai Havertz", "ger", "Germany", "forward", "29", "1999-06-11"),
  ],
  por: [
    mkPlayer("por-gk1", "Diogo Costa", "por", "Portugal", "goalkeeper", "1", "1999-09-19"),
    mkPlayer("por-df1", "Rúben Dias", "por", "Portugal", "defender", "3", "1997-05-14"),
    mkPlayer("por-mf1", "Bernardo Silva", "por", "Portugal", "midfielder", "10", "1994-08-10"),
    mkPlayer("por-fw1", "Cristiano Ronaldo", "por", "Portugal", "forward", "7", "1985-02-05"),
  ],
  ned: [
    mkPlayer("ned-gk1", "Bart Verbruggen", "ned", "Netherlands", "goalkeeper", "1", "2002-08-18"),
    mkPlayer("ned-df1", "Virgil van Dijk", "ned", "Netherlands", "defender", "4", "1991-07-08"),
    mkPlayer("ned-mf1", "Frenkie de Jong", "ned", "Netherlands", "midfielder", "21", "1997-05-12"),
    mkPlayer("ned-fw1", "Cody Gakpo", "ned", "Netherlands", "forward", "11", "1999-05-07"),
  ],
  sui: [
    mkPlayer("sui-gk1", "Yann Sommer", "sui", "Switzerland", "goalkeeper", "1", "1988-12-17"),
    mkPlayer("sui-mf1", "Granit Xhaka", "sui", "Switzerland", "midfielder", "10", "1992-09-27"),
    mkPlayer("sui-fw1", "Breel Embolo", "sui", "Switzerland", "forward", "7", "1997-02-14"),
  ],
  srb: [
    mkPlayer("srb-gk1", "Predrag Rajković", "srb", "Serbia", "goalkeeper", "1", "1995-10-31"),
    mkPlayer("srb-mf1", "Dušan Tadić", "srb", "Serbia", "midfielder", "10", "1988-11-20"),
    mkPlayer("srb-fw1", "Aleksandar Mitrović", "srb", "Serbia", "forward", "9", "1994-09-16"),
  ],
  cmr: [
    mkPlayer("cmr-gk1", "André Onana", "cmr", "Cameroon", "goalkeeper", "1", "1996-04-02"),
    mkPlayer("cmr-mf1", "Ngolo Kante", "cmr", "Cameroon", "midfielder", "7", "1991-03-29"),
    mkPlayer("cmr-fw1", "Vincent Aboubakar", "cmr", "Cameroon", "forward", "10", "1992-01-22"),
  ],
  usa: [
    mkPlayer("usa-gk1", "Matt Turner", "usa", "United States", "goalkeeper", "1", "1994-06-24"),
    mkPlayer("usa-mf1", "Tyler Adams", "usa", "United States", "midfielder", "4", "1999-02-14"),
    mkPlayer("usa-fw1", "Christian Pulisic", "usa", "United States", "forward", "10", "1998-09-18"),
  ],
  irn: [
    mkPlayer("irn-gk1", "Alireza Beiranvand", "irn", "Iran", "goalkeeper", "1", "1992-09-21"),
    mkPlayer("irn-mf1", "Saeid Ezatolahi", "irn", "Iran", "midfielder", "8", "1996-10-01"),
    mkPlayer("irn-fw1", "Sardar Azmoun", "irn", "Iran", "forward", "9", "1995-01-01"),
  ],
  wal: [
    mkPlayer("wal-gk1", "Danny Ward", "wal", "Wales", "goalkeeper", "1", "1993-06-22"),
    mkPlayer("wal-mf1", "Aaron Ramsey", "wal", "Wales", "midfielder", "8", "1990-12-26"),
    mkPlayer("wal-fw1", "Gareth Bale", "wal", "Wales", "forward", "11", "1989-07-16"),
  ],
  pol: [
    mkPlayer("pol-gk1", "Wojciech Szczęsny", "pol", "Poland", "goalkeeper", "1", "1990-04-18"),
    mkPlayer("pol-mf1", "Piotr Zieliński", "pol", "Poland", "midfielder", "20", "1994-05-20"),
    mkPlayer("pol-fw1", "Robert Lewandowski", "pol", "Poland", "forward", "9", "1988-08-21"),
  ],
  mex: [
    mkPlayer("mex-gk1", "Guillermo Ochoa", "mex", "Mexico", "goalkeeper", "1", "1985-07-13"),
    mkPlayer("mex-mf1", "Héctor Herrera", "mex", "Mexico", "midfielder", "16", "1990-04-19"),
    mkPlayer("mex-fw1", "Hirving Lozano", "mex", "Mexico", "forward", "22", "1995-07-30"),
  ],
  sau: [
    mkPlayer(
      "sau-gk1",
      "Mohammed Al-Owais",
      "sau",
      "Saudi Arabia",
      "goalkeeper",
      "1",
      "1991-11-27"
    ),
    mkPlayer(
      "sau-mf1",
      "Salem Al-Dawsari",
      "sau",
      "Saudi Arabia",
      "midfielder",
      "10",
      "1991-08-19"
    ),
    mkPlayer("sau-fw1", "Firas Al-Buraikan", "sau", "Saudi Arabia", "forward", "9", "1999-05-14"),
  ],
  aus: [
    mkPlayer("aus-gk1", "Mathew Ryan", "aus", "Australia", "goalkeeper", "1", "1992-04-08"),
    mkPlayer("aus-mf1", "Aaron Mooy", "aus", "Australia", "midfielder", "13", "1990-09-15"),
    mkPlayer("aus-fw1", "Mathew Leckie", "aus", "Australia", "forward", "7", "1991-02-04"),
  ],
  den: [
    mkPlayer("den-gk1", "Kasper Schmeichel", "den", "Denmark", "goalkeeper", "1", "1986-11-05"),
    mkPlayer("den-mf1", "Christian Eriksen", "den", "Denmark", "midfielder", "10", "1992-02-14"),
    mkPlayer("den-fw1", "Andreas Cornelius", "den", "Denmark", "forward", "9", "1993-03-16"),
  ],
  tun: [
    mkPlayer("tun-gk1", "Aymen Dahmen", "tun", "Tunisia", "goalkeeper", "1", "1997-09-09"),
    mkPlayer("tun-mf1", "Wahbi Khazri", "tun", "Tunisia", "midfielder", "10", "1991-02-08"),
    mkPlayer("tun-fw1", "Youssef Msakni", "tun", "Tunisia", "forward", "9", "1990-10-28"),
  ],
  jpn: [
    mkPlayer("jpn-gk1", "Shuichi Gonda", "jpn", "Japan", "goalkeeper", "1", "1989-03-03"),
    mkPlayer("jpn-mf1", "Takumi Minamino", "jpn", "Japan", "midfielder", "10", "1995-01-16"),
    mkPlayer("jpn-fw1", "Daichi Kamada", "jpn", "Japan", "forward", "9", "1996-08-05"),
  ],
  crc: [
    mkPlayer("crc-gk1", "Keylor Navas", "crc", "Costa Rica", "goalkeeper", "1", "1986-12-15"),
    mkPlayer("crc-mf1", "Bryan Ruiz", "crc", "Costa Rica", "midfielder", "10", "1985-08-18"),
    mkPlayer("crc-fw1", "Joel Campbell", "crc", "Costa Rica", "forward", "9", "1992-06-26"),
  ],
  bel: [
    mkPlayer("bel-gk1", "Thibaut Courtois", "bel", "Belgium", "goalkeeper", "1", "1992-05-11"),
    mkPlayer("bel-mf1", "Kevin De Bruyne", "bel", "Belgium", "midfielder", "7", "1991-06-28"),
    mkPlayer("bel-fw1", "Romelu Lukaku", "bel", "Belgium", "forward", "9", "1993-05-13"),
  ],
  cro: [
    mkPlayer("cro-gk1", "Dominik Livaković", "cro", "Croatia", "goalkeeper", "1", "1995-01-09"),
    mkPlayer("cro-mf1", "Luka Modrić", "cro", "Croatia", "midfielder", "10", "1985-09-09"),
    mkPlayer("cro-fw1", "Ivan Perišić", "cro", "Croatia", "forward", "4", "1989-02-02"),
  ],
  mar: [
    mkPlayer("mar-gk1", "Yassine Bounou", "mar", "Morocco", "goalkeeper", "1", "1991-04-05"),
    mkPlayer("mar-mf1", "Sofiane Boufal", "mar", "Morocco", "midfielder", "19", "1993-09-17"),
    mkPlayer("mar-fw1", "Youssef En-Nesyri", "mar", "Morocco", "forward", "19", "1997-06-01"),
  ],
  can: [
    mkPlayer("can-gk1", "Milan Borjan", "can", "Canada", "goalkeeper", "1", "1987-10-23"),
    mkPlayer("can-mf1", "Jonathan David", "can", "Canada", "midfielder", "20", "2000-01-14"),
    mkPlayer("can-fw1", "Alphonso Davies", "can", "Canada", "forward", "3", "2000-11-02"),
  ],
  uru: [
    mkPlayer("uru-gk1", "Fernando Muslera", "uru", "Uruguay", "goalkeeper", "1", "1986-06-16"),
    mkPlayer("uru-mf1", "Federico Valverde", "uru", "Uruguay", "midfielder", "15", "1998-07-22"),
    mkPlayer("uru-fw1", "Darwin Núñez", "uru", "Uruguay", "forward", "9", "2001-06-24"),
  ],
  kor: [
    mkPlayer("kor-gk1", "Kim Seung-gyu", "kor", "South Korea", "goalkeeper", "1", "1990-09-30"),
    mkPlayer("kor-mf1", "Lee Jae-sung", "kor", "South Korea", "midfielder", "10", "1992-08-10"),
    mkPlayer("kor-fw1", "Son Heung-min", "kor", "South Korea", "forward", "7", "1992-07-08"),
  ],
  gha: [
    mkPlayer("gha-gk1", "Lawrence Ati-Zigi", "gha", "Ghana", "goalkeeper", "1", "1997-11-07"),
    mkPlayer("gha-mf1", "Thomas Partey", "gha", "Ghana", "midfielder", "5", "1993-06-13"),
    mkPlayer("gha-fw1", "Jordan Ayew", "gha", "Ghana", "forward", "11", "1991-09-11"),
  ],
  sen: [
    mkPlayer("sen-gk1", "Édouard Mendy", "sen", "Senegal", "goalkeeper", "1", "1992-03-01"),
    mkPlayer("sen-mf1", "Idrissa Gueye", "sen", "Senegal", "midfielder", "17", "1989-09-26"),
    mkPlayer("sen-fw1", "Sadio Mané", "sen", "Senegal", "forward", "10", "1992-04-10"),
  ],
  ecu: [
    mkPlayer("ecu-gk1", "Hernán Galíndez", "ecu", "Ecuador", "goalkeeper", "1", "1987-03-30"),
    mkPlayer("ecu-mf1", "Carlos Gruezo", "ecu", "Ecuador", "midfielder", "16", "1995-04-19"),
    mkPlayer("ecu-fw1", "Enner Valencia", "ecu", "Ecuador", "forward", "13", "1989-11-04"),
  ],
  qat: [
    mkPlayer("qat-gk1", "Meshaal Barsham", "qat", "Qatar", "goalkeeper", "1", "1999-07-17"),
    mkPlayer("qat-mf1", "Abdulaziz Hatem", "qat", "Qatar", "midfielder", "8", "1990-12-05"),
    mkPlayer("qat-fw1", "Almoez Ali", "qat", "Qatar", "forward", "19", "1996-08-19"),
  ],
};

// ─── Schedules (upcoming WC matches) ─────────────────────────────────────────

const VENUES = {
  metlife: "MetLife Stadium, East Rutherford, NJ",
  sofi: "SoFi Stadium, Inglewood, CA",
  att: "AT&T Stadium, Arlington, TX",
  levis: "Levi's Stadium, Santa Clara, CA",
  mercedes: "Mercedes-Benz Stadium, Atlanta, GA",
  gillette: "Gillette Stadium, Foxborough, MA",
  rose: "Rose Bowl, Pasadena, CA",
  nrg: "NRG Stadium, Houston, TX",
};

export const teamScheduleMockData: Record<string, TeamScheduleMatch[]> = {
  bra: [
    mkSchedule("sch-bra-1", BRA, SUI, "2026-06-11T20:00:00Z", VENUES.metlife, "Matchday 1"),
    mkSchedule("sch-bra-2", BRA, CMR, "2026-06-16T20:00:00Z", VENUES.metlife, "Matchday 2"),
    mkSchedule("sch-bra-3", SRB, BRA, "2026-06-25T20:00:00Z", VENUES.att, "Matchday 3"),
  ],
  sui: [
    mkSchedule("sch-sui-1", BRA, SUI, "2026-06-11T20:00:00Z", VENUES.metlife, "Matchday 1"),
    mkSchedule("sch-sui-2", SUI, SRB, "2026-06-16T22:00:00Z", VENUES.sofi, "Matchday 2"),
    mkSchedule("sch-sui-3", SUI, CMR, "2026-06-25T16:00:00Z", VENUES.levis, "Matchday 3"),
  ],
  srb: [
    mkSchedule("sch-srb-1", SRB, CMR, "2026-06-11T16:00:00Z", VENUES.gillette, "Matchday 1"),
    mkSchedule("sch-srb-2", SUI, SRB, "2026-06-16T22:00:00Z", VENUES.sofi, "Matchday 2"),
    mkSchedule("sch-srb-3", SRB, BRA, "2026-06-25T20:00:00Z", VENUES.att, "Matchday 3"),
  ],
  cmr: [
    mkSchedule("sch-cmr-1", SRB, CMR, "2026-06-11T16:00:00Z", VENUES.gillette, "Matchday 1"),
    mkSchedule("sch-cmr-2", BRA, CMR, "2026-06-16T20:00:00Z", VENUES.metlife, "Matchday 2"),
    mkSchedule("sch-cmr-3", SUI, CMR, "2026-06-25T16:00:00Z", VENUES.levis, "Matchday 3"),
  ],
  eng: [
    mkSchedule("sch-eng-1", ENG, IRN, "2026-06-12T20:00:00Z", VENUES.sofi, "Matchday 1"),
    mkSchedule("sch-eng-2", ENG, USA, "2026-06-17T20:00:00Z", VENUES.att, "Matchday 2"),
    mkSchedule("sch-eng-3", ENG, WAL, "2026-06-26T16:00:00Z", VENUES.mercedes, "Matchday 3"),
  ],
  usa: [
    mkSchedule("sch-usa-1", USA, WAL, "2026-06-12T17:00:00Z", VENUES.att, "Matchday 1"),
    mkSchedule("sch-usa-2", ENG, USA, "2026-06-17T20:00:00Z", VENUES.att, "Matchday 2"),
    mkSchedule("sch-usa-3", IRN, USA, "2026-06-26T20:00:00Z", VENUES.nrg, "Matchday 3"),
  ],
  irn: [
    mkSchedule("sch-irn-1", ENG, IRN, "2026-06-12T20:00:00Z", VENUES.sofi, "Matchday 1"),
    mkSchedule("sch-irn-2", IRN, WAL, "2026-06-17T16:00:00Z", VENUES.levis, "Matchday 2"),
    mkSchedule("sch-irn-3", IRN, USA, "2026-06-26T20:00:00Z", VENUES.nrg, "Matchday 3"),
  ],
  wal: [
    mkSchedule("sch-wal-1", USA, WAL, "2026-06-12T17:00:00Z", VENUES.att, "Matchday 1"),
    mkSchedule("sch-wal-2", IRN, WAL, "2026-06-17T16:00:00Z", VENUES.levis, "Matchday 2"),
    mkSchedule("sch-wal-3", ENG, WAL, "2026-06-26T16:00:00Z", VENUES.mercedes, "Matchday 3"),
  ],
  arg: [
    mkSchedule("sch-arg-1", ARG, SAU, "2026-06-13T14:00:00Z", VENUES.levis, "Matchday 1"),
    mkSchedule("sch-arg-2", ARG, POL, "2026-06-18T20:00:00Z", VENUES.nrg, "Matchday 2"),
    mkSchedule("sch-arg-3", ARG, MEX, "2026-06-26T16:00:00Z", VENUES.rose, "Matchday 3"),
  ],
  pol: [
    mkSchedule("sch-pol-1", POL, MEX, "2026-06-13T17:00:00Z", VENUES.rose, "Matchday 1"),
    mkSchedule("sch-pol-2", ARG, POL, "2026-06-18T20:00:00Z", VENUES.nrg, "Matchday 2"),
    mkSchedule("sch-pol-3", POL, SAU, "2026-06-26T20:00:00Z", VENUES.sofi, "Matchday 3"),
  ],
  mex: [
    mkSchedule("sch-mex-1", POL, MEX, "2026-06-13T17:00:00Z", VENUES.rose, "Matchday 1"),
    mkSchedule("sch-mex-2", MEX, SAU, "2026-06-18T14:00:00Z", VENUES.att, "Matchday 2"),
    mkSchedule("sch-mex-3", ARG, MEX, "2026-06-26T16:00:00Z", VENUES.rose, "Matchday 3"),
  ],
  sau: [
    mkSchedule("sch-sau-1", ARG, SAU, "2026-06-13T14:00:00Z", VENUES.levis, "Matchday 1"),
    mkSchedule("sch-sau-2", MEX, SAU, "2026-06-18T14:00:00Z", VENUES.att, "Matchday 2"),
    mkSchedule("sch-sau-3", POL, SAU, "2026-06-26T20:00:00Z", VENUES.sofi, "Matchday 3"),
  ],
  fra: [
    mkSchedule("sch-fra-1", FRA, AUS, "2026-06-13T20:00:00Z", VENUES.mercedes, "Matchday 1"),
    mkSchedule("sch-fra-2", FRA, DEN, "2026-06-19T20:00:00Z", VENUES.metlife, "Matchday 2"),
    mkSchedule("sch-fra-3", FRA, TUN, "2026-06-27T16:00:00Z", VENUES.sofi, "Matchday 3"),
  ],
  aus: [
    mkSchedule("sch-aus-1", FRA, AUS, "2026-06-13T20:00:00Z", VENUES.mercedes, "Matchday 1"),
    mkSchedule("sch-aus-2", AUS, TUN, "2026-06-19T14:00:00Z", VENUES.gillette, "Matchday 2"),
    mkSchedule("sch-aus-3", DEN, AUS, "2026-06-27T20:00:00Z", VENUES.nrg, "Matchday 3"),
  ],
  den: [
    mkSchedule("sch-den-1", DEN, TUN, "2026-06-14T14:00:00Z", VENUES.nrg, "Matchday 1"),
    mkSchedule("sch-den-2", FRA, DEN, "2026-06-19T20:00:00Z", VENUES.metlife, "Matchday 2"),
    mkSchedule("sch-den-3", DEN, AUS, "2026-06-27T20:00:00Z", VENUES.nrg, "Matchday 3"),
  ],
  tun: [
    mkSchedule("sch-tun-1", DEN, TUN, "2026-06-14T14:00:00Z", VENUES.nrg, "Matchday 1"),
    mkSchedule("sch-tun-2", AUS, TUN, "2026-06-19T14:00:00Z", VENUES.gillette, "Matchday 2"),
    mkSchedule("sch-tun-3", FRA, TUN, "2026-06-27T16:00:00Z", VENUES.sofi, "Matchday 3"),
  ],
  esp: [
    mkSchedule("sch-esp-1", ESP, CRC, "2026-06-14T20:00:00Z", VENUES.rose, "Matchday 1"),
    mkSchedule("sch-esp-2", ESP, GER, "2026-06-20T20:00:00Z", VENUES.levis, "Matchday 2"),
    mkSchedule("sch-esp-3", ESP, JPN, "2026-06-28T16:00:00Z", VENUES.att, "Matchday 3"),
  ],
  ger: [
    mkSchedule("sch-ger-1", JPN, GER, "2026-06-14T17:00:00Z", VENUES.gillette, "Matchday 1"),
    mkSchedule("sch-ger-2", ESP, GER, "2026-06-20T20:00:00Z", VENUES.levis, "Matchday 2"),
    mkSchedule("sch-ger-3", GER, CRC, "2026-06-28T20:00:00Z", VENUES.metlife, "Matchday 3"),
  ],
  jpn: [
    mkSchedule("sch-jpn-1", JPN, GER, "2026-06-14T17:00:00Z", VENUES.gillette, "Matchday 1"),
    mkSchedule("sch-jpn-2", JPN, CRC, "2026-06-20T14:00:00Z", VENUES.nrg, "Matchday 2"),
    mkSchedule("sch-jpn-3", ESP, JPN, "2026-06-28T16:00:00Z", VENUES.att, "Matchday 3"),
  ],
  crc: [
    mkSchedule("sch-crc-1", ESP, CRC, "2026-06-14T20:00:00Z", VENUES.rose, "Matchday 1"),
    mkSchedule("sch-crc-2", JPN, CRC, "2026-06-20T14:00:00Z", VENUES.nrg, "Matchday 2"),
    mkSchedule("sch-crc-3", GER, CRC, "2026-06-28T20:00:00Z", VENUES.metlife, "Matchday 3"),
  ],
  bel: [
    mkSchedule("sch-bel-1", BEL, CAN, "2026-06-15T20:00:00Z", VENUES.att, "Matchday 1"),
    mkSchedule("sch-bel-2", BEL, MAR, "2026-06-20T17:00:00Z", VENUES.rose, "Matchday 2"),
    mkSchedule("sch-bel-3", BEL, CRO, "2026-06-28T16:00:00Z", VENUES.sofi, "Matchday 3"),
  ],
  cro: [
    mkSchedule("sch-cro-1", CRO, MAR, "2026-06-15T14:00:00Z", VENUES.sofi, "Matchday 1"),
    mkSchedule("sch-cro-2", CAN, CRO, "2026-06-20T20:00:00Z", VENUES.mercedes, "Matchday 2"),
    mkSchedule("sch-cro-3", BEL, CRO, "2026-06-28T16:00:00Z", VENUES.sofi, "Matchday 3"),
  ],
  mar: [
    mkSchedule("sch-mar-1", CRO, MAR, "2026-06-15T14:00:00Z", VENUES.sofi, "Matchday 1"),
    mkSchedule("sch-mar-2", BEL, MAR, "2026-06-20T17:00:00Z", VENUES.rose, "Matchday 2"),
    mkSchedule("sch-mar-3", MAR, CAN, "2026-06-28T20:00:00Z", VENUES.levis, "Matchday 3"),
  ],
  can: [
    mkSchedule("sch-can-1", BEL, CAN, "2026-06-15T20:00:00Z", VENUES.att, "Matchday 1"),
    mkSchedule("sch-can-2", CAN, CRO, "2026-06-20T20:00:00Z", VENUES.mercedes, "Matchday 2"),
    mkSchedule("sch-can-3", MAR, CAN, "2026-06-28T20:00:00Z", VENUES.levis, "Matchday 3"),
  ],
  por: [
    mkSchedule("sch-por-1", POR, GHA, "2026-06-15T17:00:00Z", VENUES.levis, "Matchday 1"),
    mkSchedule("sch-por-2", KOR, POR, "2026-06-21T20:00:00Z", VENUES.metlife, "Matchday 2"),
    mkSchedule("sch-por-3", POR, URU, "2026-06-29T20:00:00Z", VENUES.att, "Matchday 3"),
  ],
  uru: [
    mkSchedule("sch-uru-1", URU, KOR, "2026-06-15T14:00:00Z", VENUES.mercedes, "Matchday 1"),
    mkSchedule("sch-uru-2", GHA, URU, "2026-06-21T14:00:00Z", VENUES.nrg, "Matchday 2"),
    mkSchedule("sch-uru-3", POR, URU, "2026-06-29T20:00:00Z", VENUES.att, "Matchday 3"),
  ],
  kor: [
    mkSchedule("sch-kor-1", URU, KOR, "2026-06-15T14:00:00Z", VENUES.mercedes, "Matchday 1"),
    mkSchedule("sch-kor-2", KOR, POR, "2026-06-21T20:00:00Z", VENUES.metlife, "Matchday 2"),
    mkSchedule("sch-kor-3", KOR, GHA, "2026-06-29T16:00:00Z", VENUES.sofi, "Matchday 3"),
  ],
  gha: [
    mkSchedule("sch-gha-1", POR, GHA, "2026-06-15T17:00:00Z", VENUES.levis, "Matchday 1"),
    mkSchedule("sch-gha-2", GHA, URU, "2026-06-21T14:00:00Z", VENUES.nrg, "Matchday 2"),
    mkSchedule("sch-gha-3", KOR, GHA, "2026-06-29T16:00:00Z", VENUES.sofi, "Matchday 3"),
  ],
  ned: [
    mkSchedule("sch-ned-1", NED, SEN, "2026-06-16T14:00:00Z", VENUES.gillette, "Matchday 1"),
    mkSchedule("sch-ned-2", QAT, NED, "2026-06-21T17:00:00Z", VENUES.levis, "Matchday 2"),
    mkSchedule("sch-ned-3", NED, ECU, "2026-06-29T16:00:00Z", VENUES.rose, "Matchday 3"),
  ],
  sen: [
    mkSchedule("sch-sen-1", NED, SEN, "2026-06-16T14:00:00Z", VENUES.gillette, "Matchday 1"),
    mkSchedule("sch-sen-2", SEN, QAT, "2026-06-21T20:00:00Z", VENUES.mercedes, "Matchday 2"),
    mkSchedule("sch-sen-3", ECU, SEN, "2026-06-29T20:00:00Z", VENUES.nrg, "Matchday 3"),
  ],
  ecu: [
    mkSchedule("sch-ecu-1", ECU, QAT, "2026-06-16T17:00:00Z", VENUES.nrg, "Matchday 1"),
    mkSchedule("sch-ecu-2", SEN, QAT, "2026-06-21T20:00:00Z", VENUES.mercedes, "Matchday 2"),
    mkSchedule("sch-ecu-3", NED, ECU, "2026-06-29T16:00:00Z", VENUES.rose, "Matchday 3"),
  ],
  qat: [
    mkSchedule("sch-qat-1", ECU, QAT, "2026-06-16T17:00:00Z", VENUES.nrg, "Matchday 1"),
    mkSchedule("sch-qat-2", QAT, NED, "2026-06-21T17:00:00Z", VENUES.levis, "Matchday 2"),
    mkSchedule("sch-qat-3", SEN, QAT, "2026-06-29T20:00:00Z", VENUES.mercedes, "Matchday 3"),
  ],
};

// ─── Stub opponents (for pre-WC friendlies, not in WC32) ─────────────────────────

const ITA_stub = mkTeam("ita", "Italy", "ITA", "Italy", "🇮🇹", "#009246", "N/A", "1910");
const NZL_stub = mkTeam("nzl", "New Zealand", "NZL", "New Zealand", "🇳🇿", "#000000", "N/A", "1891");
const CZE_stub = mkTeam(
  "cze",
  "Czech Republic",
  "CZE",
  "Czech Republic",
  "🇨🇿",
  "#D7141A",
  "N/A",
  "1922"
);
const EGY_stub = mkTeam("egy", "Egypt", "EGY", "Egypt", "🇪🇬", "#CE1126", "N/A", "1921");
const JOR_stub = mkTeam("jor", "Jordan", "JOR", "Jordan", "🇯🇴", "#007A3D", "N/A", "1949");
const BOL_stub = mkTeam("bol", "Bolivia", "BOL", "Bolivia", "🇧🇴", "#D52B1E", "N/A", "1925");
const VEN_stub = mkTeam("ven", "Venezuela", "VEN", "Venezuela", "🇻🇪", "#CF142B", "N/A", "1926");
const UAE_stub = mkTeam("uae", "UAE", "UAE", "UAE", "🇦🇪", "#009639", "N/A", "1971");
const IRQ_stub = mkTeam("irq", "Iraq", "IRQ", "Iraq", "🇮🇶", "#CE1126", "N/A", "1948");
const BIH_stub = mkTeam(
  "bih",
  "Bosnia & Herz.",
  "BIH",
  "Bosnia and Herzegovina",
  "🇧🇦",
  "#002395",
  "N/A",
  "1992"
);

// ─── Results (pre-WC friendlies) ──────────────────────────────────────────────

export const teamResultsMockData: Record<string, TeamResultMatch[]> = {
  bra: [
    mkResult(
      "res-bra-1",
      BRA,
      ARG,
      2,
      1,
      "2026-03-25T22:00:00Z",
      VENUES.metlife,
      "International Friendly"
    ),
    mkResult(
      "res-bra-2",
      BRA,
      FRA,
      3,
      1,
      "2026-04-01T22:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
    mkResult(
      "res-bra-3",
      ESP,
      BRA,
      0,
      1,
      "2026-05-10T20:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
  ],
  eng: [
    mkResult(
      "res-eng-1",
      ENG,
      GER,
      2,
      0,
      "2026-03-26T20:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
    mkResult(
      "res-eng-2",
      ENG,
      NED,
      1,
      1,
      "2026-04-02T20:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-eng-3",
      ITA_stub,
      ENG,
      0,
      2,
      "2026-05-11T20:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
  ],
  arg: [
    mkResult(
      "res-arg-1",
      ARG,
      URU,
      3,
      0,
      "2026-03-25T22:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
    mkResult(
      "res-arg-2",
      BRA,
      ARG,
      1,
      2,
      "2026-04-01T22:00:00Z",
      VENUES.metlife,
      "International Friendly"
    ),
    mkResult(
      "res-arg-3",
      ARG,
      ESP,
      2,
      1,
      "2026-05-10T20:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
  ],
  fra: [
    mkResult(
      "res-fra-1",
      FRA,
      POR,
      2,
      0,
      "2026-03-26T21:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
    mkResult(
      "res-fra-2",
      BRA,
      FRA,
      3,
      1,
      "2026-04-01T22:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
    mkResult(
      "res-fra-3",
      FRA,
      ENG,
      2,
      1,
      "2026-05-11T20:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
  ],
  esp: [
    mkResult(
      "res-esp-1",
      ESP,
      BEL,
      3,
      0,
      "2026-03-25T20:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-esp-2",
      ARG,
      ESP,
      1,
      2,
      "2026-04-01T22:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
    mkResult(
      "res-esp-3",
      ESP,
      BRA,
      0,
      1,
      "2026-05-10T20:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
  ],
  ger: [
    mkResult(
      "res-ger-1",
      ENG,
      GER,
      2,
      0,
      "2026-03-26T20:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
    mkResult(
      "res-ger-2",
      GER,
      NED,
      3,
      2,
      "2026-04-02T19:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-ger-3",
      FRA,
      GER,
      1,
      1,
      "2026-05-12T20:00:00Z",
      VENUES.metlife,
      "International Friendly"
    ),
  ],
  por: [
    mkResult(
      "res-por-1",
      FRA,
      POR,
      0,
      2,
      "2026-03-26T21:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
    mkResult(
      "res-por-2",
      POR,
      ARG,
      1,
      3,
      "2026-04-02T22:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
    mkResult(
      "res-por-3",
      POR,
      BEL,
      2,
      0,
      "2026-05-11T20:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
  ],
  ned: [
    mkResult(
      "res-ned-1",
      ENG,
      NED,
      1,
      1,
      "2026-03-26T20:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-ned-2",
      GER,
      NED,
      3,
      2,
      "2026-04-02T19:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-ned-3",
      NED,
      BEL,
      2,
      0,
      "2026-05-12T20:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
  ],
  sui: [
    mkResult(
      "res-sui-1",
      SUI,
      SRB,
      2,
      0,
      "2026-03-25T19:00:00Z",
      VENUES.gillette,
      "International Friendly"
    ),
    mkResult(
      "res-sui-2",
      GER,
      SUI,
      0,
      1,
      "2026-04-01T19:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
    mkResult(
      "res-sui-3",
      SUI,
      POL,
      1,
      1,
      "2026-05-10T19:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
  ],
  srb: [
    mkResult(
      "res-srb-1",
      SUI,
      SRB,
      0,
      2,
      "2026-03-25T19:00:00Z",
      VENUES.gillette,
      "International Friendly"
    ),
    mkResult(
      "res-srb-2",
      SRB,
      URU,
      1,
      0,
      "2026-04-02T20:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
    mkResult(
      "res-srb-3",
      CRO,
      SRB,
      0,
      1,
      "2026-05-12T19:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
  ],
  cmr: [
    mkResult(
      "res-cmr-1",
      CMR,
      GHA,
      1,
      1,
      "2026-03-26T18:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
    mkResult(
      "res-cmr-2",
      SEN,
      CMR,
      2,
      0,
      "2026-04-01T20:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-cmr-3",
      CMR,
      TUN,
      0,
      1,
      "2026-05-11T18:00:00Z",
      VENUES.gillette,
      "International Friendly"
    ),
  ],
  usa: [
    mkResult(
      "res-usa-1",
      USA,
      CAN,
      2,
      0,
      "2026-03-25T20:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
    mkResult(
      "res-usa-2",
      USA,
      MEX,
      1,
      0,
      "2026-04-02T20:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
    mkResult(
      "res-usa-3",
      CAN,
      USA,
      0,
      1,
      "2026-05-10T22:00:00Z",
      VENUES.metlife,
      "International Friendly"
    ),
  ],
  irn: [
    mkResult(
      "res-irn-1",
      IRN,
      SAU,
      1,
      0,
      "2026-03-26T17:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-irn-2",
      JPN,
      IRN,
      2,
      1,
      "2026-04-01T14:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
    mkResult(
      "res-irn-3",
      IRN,
      WAL,
      0,
      0,
      "2026-05-12T17:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
  ],
  wal: [
    mkResult(
      "res-wal-1",
      WAL,
      ENG,
      0,
      2,
      "2026-03-25T19:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-wal-2",
      IRN,
      WAL,
      0,
      0,
      "2026-04-01T17:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-wal-3",
      DEN,
      WAL,
      1,
      0,
      "2026-05-11T18:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
  ],
  pol: [
    mkResult(
      "res-pol-1",
      POL,
      CZE_stub,
      2,
      1,
      "2026-03-26T19:00:00Z",
      VENUES.metlife,
      "International Friendly"
    ),
    mkResult(
      "res-pol-2",
      SUI,
      POL,
      1,
      1,
      "2026-04-02T19:00:00Z",
      VENUES.gillette,
      "International Friendly"
    ),
    mkResult(
      "res-pol-3",
      POL,
      KOR,
      2,
      0,
      "2026-05-10T20:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
  ],
  mex: [
    mkResult(
      "res-mex-1",
      USA,
      MEX,
      0,
      1,
      "2026-03-25T22:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
    mkResult(
      "res-mex-2",
      MEX,
      CAN,
      2,
      0,
      "2026-04-01T22:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-mex-3",
      MEX,
      URU,
      1,
      2,
      "2026-05-12T22:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
  ],
  sau: [
    mkResult(
      "res-sau-1",
      IRN,
      SAU,
      0,
      1,
      "2026-03-26T17:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-sau-2",
      SAU,
      EGY_stub,
      2,
      0,
      "2026-04-02T17:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-sau-3",
      SAU,
      JOR_stub,
      3,
      0,
      "2026-05-11T17:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
  ],
  aus: [
    mkResult(
      "res-aus-1",
      AUS,
      JPN,
      2,
      1,
      "2026-03-25T12:00:00Z",
      VENUES.gillette,
      "International Friendly"
    ),
    mkResult(
      "res-aus-2",
      NZL_stub,
      AUS,
      0,
      2,
      "2026-04-01T12:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
    mkResult(
      "res-aus-3",
      AUS,
      KOR,
      1,
      1,
      "2026-05-10T14:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
  ],
  den: [
    mkResult(
      "res-den-1",
      DEN,
      NED,
      2,
      1,
      "2026-03-26T19:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
    mkResult(
      "res-den-2",
      DEN,
      WAL,
      1,
      0,
      "2026-04-02T18:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-den-3",
      NED,
      DEN,
      2,
      2,
      "2026-05-11T20:00:00Z",
      VENUES.metlife,
      "International Friendly"
    ),
  ],
  tun: [
    mkResult(
      "res-tun-1",
      CMR,
      TUN,
      0,
      1,
      "2026-03-25T18:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
    mkResult(
      "res-tun-2",
      TUN,
      MAR,
      1,
      1,
      "2026-04-01T18:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-tun-3",
      TUN,
      SEN,
      0,
      2,
      "2026-05-12T18:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
  ],
  jpn: [
    mkResult(
      "res-jpn-1",
      AUS,
      JPN,
      2,
      1,
      "2026-03-25T12:00:00Z",
      VENUES.gillette,
      "International Friendly"
    ),
    mkResult(
      "res-jpn-2",
      JPN,
      IRN,
      2,
      1,
      "2026-04-01T14:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
    mkResult(
      "res-jpn-3",
      POL,
      JPN,
      2,
      0,
      "2026-05-10T14:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
  ],
  crc: [
    mkResult(
      "res-crc-1",
      CRC,
      MEX,
      0,
      1,
      "2026-03-26T22:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
    mkResult(
      "res-crc-2",
      USA,
      CRC,
      2,
      0,
      "2026-04-02T22:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-crc-3",
      CRC,
      ECU,
      1,
      1,
      "2026-05-11T22:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
  ],
  bel: [
    mkResult(
      "res-bel-1",
      ESP,
      BEL,
      0,
      3,
      "2026-03-25T20:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-bel-2",
      NED,
      BEL,
      0,
      2,
      "2026-04-01T20:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
    mkResult(
      "res-bel-3",
      POR,
      BEL,
      0,
      2,
      "2026-05-11T20:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
  ],
  cro: [
    mkResult(
      "res-cro-1",
      CRO,
      SRB,
      0,
      1,
      "2026-03-25T19:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
    mkResult(
      "res-cro-2",
      CRO,
      BIH_stub,
      2,
      0,
      "2026-04-02T19:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-cro-3",
      NED,
      CRO,
      1,
      1,
      "2026-05-12T20:00:00Z",
      VENUES.metlife,
      "International Friendly"
    ),
  ],
  mar: [
    mkResult(
      "res-mar-1",
      TUN,
      MAR,
      1,
      1,
      "2026-03-26T18:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-mar-2",
      MAR,
      SEN,
      1,
      0,
      "2026-04-01T18:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
    mkResult(
      "res-mar-3",
      MAR,
      GHA,
      2,
      0,
      "2026-05-11T18:00:00Z",
      VENUES.gillette,
      "International Friendly"
    ),
  ],
  can: [
    mkResult(
      "res-can-1",
      USA,
      CAN,
      0,
      2,
      "2026-03-25T22:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
    mkResult(
      "res-can-2",
      MEX,
      CAN,
      2,
      0,
      "2026-04-01T22:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-can-3",
      CAN,
      USA,
      0,
      1,
      "2026-05-10T22:00:00Z",
      VENUES.metlife,
      "International Friendly"
    ),
  ],
  uru: [
    mkResult(
      "res-uru-1",
      ARG,
      URU,
      0,
      3,
      "2026-03-25T22:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
    mkResult(
      "res-uru-2",
      URU,
      KOR,
      2,
      1,
      "2026-04-01T22:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
    mkResult(
      "res-uru-3",
      MEX,
      URU,
      1,
      2,
      "2026-05-12T22:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
  ],
  kor: [
    mkResult(
      "res-kor-1",
      URU,
      KOR,
      1,
      2,
      "2026-03-25T22:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
    mkResult(
      "res-kor-2",
      JPN,
      KOR,
      0,
      1,
      "2026-04-02T14:00:00Z",
      VENUES.gillette,
      "International Friendly"
    ),
    mkResult(
      "res-kor-3",
      AUS,
      KOR,
      1,
      1,
      "2026-05-10T14:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
  ],
  gha: [
    mkResult(
      "res-gha-1",
      CMR,
      GHA,
      1,
      1,
      "2026-03-26T18:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
    mkResult(
      "res-gha-2",
      GHA,
      SEN,
      0,
      2,
      "2026-04-01T20:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-gha-3",
      MAR,
      GHA,
      2,
      0,
      "2026-05-11T18:00:00Z",
      VENUES.gillette,
      "International Friendly"
    ),
  ],
  sen: [
    mkResult(
      "res-sen-1",
      SEN,
      CMR,
      2,
      0,
      "2026-03-25T20:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-sen-2",
      GHA,
      SEN,
      0,
      2,
      "2026-04-01T20:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-sen-3",
      TUN,
      SEN,
      0,
      2,
      "2026-05-12T18:00:00Z",
      VENUES.levis,
      "International Friendly"
    ),
  ],
  ecu: [
    mkResult(
      "res-ecu-1",
      CRC,
      ECU,
      1,
      1,
      "2026-03-25T22:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
    mkResult(
      "res-ecu-2",
      ECU,
      BOL_stub,
      3,
      0,
      "2026-04-02T22:00:00Z",
      VENUES.sofi,
      "International Friendly"
    ),
    mkResult(
      "res-ecu-3",
      ECU,
      VEN_stub,
      2,
      0,
      "2026-05-11T22:00:00Z",
      VENUES.rose,
      "International Friendly"
    ),
  ],
  qat: [
    mkResult(
      "res-qat-1",
      QAT,
      SAU,
      1,
      0,
      "2026-03-26T17:00:00Z",
      VENUES.att,
      "International Friendly"
    ),
    mkResult(
      "res-qat-2",
      QAT,
      UAE_stub,
      2,
      1,
      "2026-04-01T17:00:00Z",
      VENUES.mercedes,
      "International Friendly"
    ),
    mkResult(
      "res-qat-3",
      QAT,
      IRQ_stub,
      2,
      0,
      "2026-05-12T17:00:00Z",
      VENUES.nrg,
      "International Friendly"
    ),
  ],
};
