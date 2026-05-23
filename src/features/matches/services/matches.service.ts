import { httpClient } from "@/api/client";
import { MatchListSchema, MatchSchema, type Match, type MatchList } from "@/features/matches/types";

/**
 * Busca a lista completa de partidas.
 *
 * Responsabilidades:
 * - Chamar httpClient (nunca fetch diretamente)
 * - Validar a resposta com MatchListSchema.parse() em runtime
 * - Retornar MatchList tipado e validado
 */
export async function getMatches(): Promise<MatchList> {
  const raw = await httpClient<unknown>("/matches");
  return MatchListSchema.parse(raw);
}

/**
 * Busca o detalhe de uma partida pelo ID.
 *
 * Lança ApiError com status 404 se a partida não for encontrada.
 */
export async function getMatchById(matchId: string): Promise<Match> {
  const raw = await httpClient<unknown>(`/matches/${matchId}`);
  return MatchSchema.parse(raw);
}
