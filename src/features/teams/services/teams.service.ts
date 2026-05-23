import { httpClient } from "@/api/client";
import {
  PlayerListSchema,
  TeamListSchema,
  TeamResultListSchema,
  TeamScheduleListSchema,
  TeamSchema,
  type PlayerList,
  type Team,
  type TeamList,
  type TeamResultList,
  type TeamScheduleList,
} from "../types/teams.types";

/**
 * Fetches the list of all 32 World Cup teams.
 *
 * Production equivalent (TheSportsDB):
 *   GET /search_all_teams.php?l=FIFA%20World%20Cup&s=Soccer
 */
export async function getTeams(): Promise<TeamList> {
  const raw = await httpClient<unknown>("/teams");
  return TeamListSchema.parse(raw);
}

/**
 * Fetches details for a single team by ID.
 *
 * @param teamId - team identifier (e.g. "bra")
 *
 * Production equivalent (TheSportsDB):
 *   GET /lookupteam.php?id={teamId}
 */
export async function getTeam(teamId: string): Promise<Team> {
  const raw = await httpClient<unknown>(`/teams/${teamId}`);
  return TeamSchema.parse(raw);
}

/**
 * Fetches the player roster for a team.
 *
 * @param teamId - team identifier
 *
 * Production equivalent (TheSportsDB):
 *   GET /lookup_all_players.php?id={teamId}
 */
export async function getTeamPlayers(teamId: string): Promise<PlayerList> {
  const raw = await httpClient<unknown>(`/teams/${teamId}/players`);
  return PlayerListSchema.parse(raw);
}

/**
 * Fetches upcoming scheduled matches for a team.
 *
 * @param teamId - team identifier
 *
 * Production equivalent (TheSportsDB):
 *   GET /eventsnext.php?id={teamId}
 */
export async function getTeamSchedule(teamId: string): Promise<TeamScheduleList> {
  const raw = await httpClient<unknown>(`/teams/${teamId}/schedule`);
  return TeamScheduleListSchema.parse(raw);
}

/**
 * Fetches past match results for a team.
 *
 * @param teamId - team identifier
 *
 * Production equivalent (TheSportsDB):
 *   GET /eventslast.php?id={teamId}
 */
export async function getTeamResults(teamId: string): Promise<TeamResultList> {
  const raw = await httpClient<unknown>(`/teams/${teamId}/results`);
  return TeamResultListSchema.parse(raw);
}
