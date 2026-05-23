import { httpClient } from "@/api/client";
import {
  GroupListSchema,
  GroupMatchListSchema,
  GroupStandingListSchema,
  type GroupList,
  type GroupMatchList,
  type GroupStandingList,
} from "../types/groups.types";

/**
 * Fetches the list of all World Cup groups (A–H).
 *
 * Production equivalent (TheSportsDB):
 *   GET /lookuptable.php?l=4429&s=2025-2026
 *   — then extract unique strGroup values
 */
export async function getGroups(): Promise<GroupList> {
  const raw = await httpClient<unknown>("/groups");
  return GroupListSchema.parse(raw);
}

/**
 * Fetches the standings for a specific group.
 *
 * @param groupLetter - "A" through "H"
 *
 * Production equivalent (TheSportsDB):
 *   GET /lookuptable.php?l=4429&s=2025-2026
 *   — then filter by strGroup === `Group ${groupLetter}`
 *   — then apply mapSportsDbStandingToGroupStanding
 */
export async function getGroupStandings(groupLetter: string): Promise<GroupStandingList> {
  const raw = await httpClient<unknown>(`/groups/${groupLetter}/standings`);
  return GroupStandingListSchema.parse(raw);
}

/**
 * Fetches the matches for a specific group.
 *
 * @param groupLetter - "A" through "H"
 *
 * Production equivalent (TheSportsDB):
 *   GET /eventsseason.php?id=4429&s=2025-2026
 *   — then filter by strGroup === `Group ${groupLetter}`
 *   — then apply mapSportsDbEventToGroupMatch
 */
export async function getGroupMatches(groupLetter: string): Promise<GroupMatchList> {
  const raw = await httpClient<unknown>(`/groups/${groupLetter}/matches`);
  return GroupMatchListSchema.parse(raw);
}
