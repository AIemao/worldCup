import { httpClient } from "@/api/client";
import {
  LiveInsightsSchema,
  LiveMatchListSchema,
  LiveMatchSchema,
  type LiveInsights,
  type LiveMatch,
  type LiveMatchList,
} from "../types/live.types";

/**
 * Busca todas as partidas ao vivo.
 *
 * Valida com LiveMatchListSchema — garante que apenas partidas com
 * status="live" e todos os campos obrigatórios sejam aceitas.
 */
export async function getLiveMatches(): Promise<LiveMatchList> {
  const raw = await httpClient<unknown>("/live");
  return LiveMatchListSchema.parse(raw);
}

/**
 * Busca uma partida ao vivo pelo ID.
 *
 * Lança ApiError 404 se a partida não existir ou não estiver ao vivo.
 */
export async function getLiveMatchById(matchId: string): Promise<LiveMatch> {
  const raw = await httpClient<unknown>(`/live/${matchId}`);
  return LiveMatchSchema.parse(raw);
}

/**
 * Busca os insights de IA para uma partida ao vivo.
 *
 * Os insights são gerados deterministicamente a partir do estado atual
 * da partida. Em produção, serão gerados por um modelo de linguagem.
 */
export async function getLiveInsights(matchId: string): Promise<LiveInsights> {
  const raw = await httpClient<unknown>(`/live/${matchId}/insights`);
  return LiveInsightsSchema.parse(raw);
}
