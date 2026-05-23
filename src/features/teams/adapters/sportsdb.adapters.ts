import type { Player, Team, TeamResultMatch, TeamScheduleMatch } from "../types/teams.types";

// ─── DTO types from TheSportsDB ───────────────────────────────────────────────

export type SportsDbTeam = {
  idTeam: string;
  strTeam: string;
  strTeamShort: string;
  strCountry: string;
  strSport: string;
  strGender: string;
  strLeague: string;
  strDescriptionEN?: string;
  intFormedYear?: string;
  strBadge?: string;
  strJersey?: string;
  strBanner?: string;
  strFanart1?: string;
  strStadium?: string;
  strStadiumThumb?: string;
  strWebsite?: string;
  strFacebook?: string;
  strInstagram?: string;
  strTwitter?: string;
};

export type SportsDbPlayer = {
  idPlayer: string;
  strPlayer: string;
  strNationality: string;
  strPosition: string;
  dateBorn?: string;
  strHeight?: string;
  strWeight?: string;
  strCutout?: string;
  strThumb?: string;
  strDescriptionEN?: string;
  idTeam: string;
  strNumber?: string;
};

export type SportsDbEvent = {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  idHomeTeam: string;
  idAwayTeam: string;
  intHomeScore?: string | null;
  intAwayScore?: string | null;
  dateEvent: string;
  strTime?: string;
  strVenue?: string;
  strRound?: string;
  strLeague?: string;
  strStatus?: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
};

// ─── Mapper functions ──────────────────────────────────────────────────────────

const FLAG_MAP: Record<string, string> = {
  Brazil: "🇧🇷",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Argentina: "🇦🇷",
  France: "🇫🇷",
  Spain: "🇪🇸",
  Germany: "🇩🇪",
  Portugal: "🇵🇹",
  Netherlands: "🇳🇱",
};

const POSITION_MAP: Record<string, "goalkeeper" | "defender" | "midfielder" | "forward"> = {
  Goalkeeper: "goalkeeper",
  Defender: "defender",
  Midfielder: "midfielder",
  Forward: "forward",
  Attacker: "forward",
  "Centre-Forward": "forward",
  "Centre-Back": "defender",
  "Right Back": "defender",
  "Left Back": "defender",
  "Defensive Midfielder": "midfielder",
  "Central Midfielder": "midfielder",
  "Attacking Midfielder": "midfielder",
};

function mapPosition(raw: string): "goalkeeper" | "defender" | "midfielder" | "forward" {
  return POSITION_MAP[raw] ?? "midfielder";
}

export function mapSportsDbTeamToTeam(dto: SportsDbTeam): Team {
  return {
    id: dto.idTeam,
    name: dto.strTeam,
    shortName: dto.strTeamShort,
    country: dto.strCountry,
    formedYear: dto.intFormedYear,
    sport: dto.strSport,
    league: dto.strLeague,
    description: dto.strDescriptionEN,
    badge: dto.strBadge ?? `https://www.thesportsdb.com/images/media/team/badge/${dto.idTeam}.png`,
    jersey: dto.strJersey,
    banner: dto.strBanner,
    fanart: dto.strFanart1,
    stadium: dto.strStadium,
    stadiumThumb: dto.strStadiumThumb,
    website: dto.strWebsite,
    facebook: dto.strFacebook,
    instagram: dto.strInstagram,
    twitter: dto.strTwitter,
    gender: dto.strGender,
    flagEmoji: FLAG_MAP[dto.strCountry] ?? "🏳️",
    primaryColor: "#1a1a2e",
  };
}

export function mapSportsDbPlayerToPlayer(dto: SportsDbPlayer): Player {
  return {
    id: dto.idPlayer,
    name: dto.strPlayer,
    nationality: dto.strNationality,
    position: mapPosition(dto.strPosition),
    birthDate: dto.dateBorn,
    height: dto.strHeight,
    weight: dto.strWeight,
    cutout: dto.strCutout,
    thumb: dto.strThumb,
    description: dto.strDescriptionEN,
    teamId: dto.idTeam,
    shirtNumber: dto.strNumber,
  };
}

export function mapSportsDbEventToScheduleMatch(dto: SportsDbEvent): TeamScheduleMatch {
  return {
    id: dto.idEvent,
    homeTeam: {
      id: dto.idHomeTeam,
      name: dto.strHomeTeam,
      shortName: dto.strHomeTeam.substring(0, 3).toUpperCase(),
      flagEmoji: FLAG_MAP[dto.strHomeTeam] ?? "🏳️",
      primaryColor: "#1a1a2e",
    },
    awayTeam: {
      id: dto.idAwayTeam,
      name: dto.strAwayTeam,
      shortName: dto.strAwayTeam.substring(0, 3).toUpperCase(),
      flagEmoji: FLAG_MAP[dto.strAwayTeam] ?? "🏳️",
      primaryColor: "#1a1a2e",
    },
    status: "upcoming",
    scheduledAt: dto.strTime ? `${dto.dateEvent}T${dto.strTime}Z` : `${dto.dateEvent}T20:00:00Z`,
    venue: dto.strVenue,
    round: dto.strRound ?? "Matchday",
    competition: dto.strLeague ?? "FIFA World Cup 2026",
  };
}

export function mapSportsDbEventToResultMatch(dto: SportsDbEvent): TeamResultMatch {
  return {
    id: dto.idEvent,
    homeTeam: {
      id: dto.idHomeTeam,
      name: dto.strHomeTeam,
      shortName: dto.strHomeTeam.substring(0, 3).toUpperCase(),
      flagEmoji: FLAG_MAP[dto.strHomeTeam] ?? "🏳️",
      primaryColor: "#1a1a2e",
    },
    awayTeam: {
      id: dto.idAwayTeam,
      name: dto.strAwayTeam,
      shortName: dto.strAwayTeam.substring(0, 3).toUpperCase(),
      flagEmoji: FLAG_MAP[dto.strAwayTeam] ?? "🏳️",
      primaryColor: "#1a1a2e",
    },
    status: "finished",
    scheduledAt: dto.strTime ? `${dto.dateEvent}T${dto.strTime}Z` : `${dto.dateEvent}T20:00:00Z`,
    venue: dto.strVenue,
    score: {
      home: parseInt(dto.intHomeScore ?? "0", 10),
      away: parseInt(dto.intAwayScore ?? "0", 10),
    },
    round: dto.strRound ?? "Matchday",
    competition: dto.strLeague ?? "FIFA World Cup 2026",
  };
}
