import { httpClient } from "@/api/client";
import { HomeDataSchema, type HomeData } from "@/features/home/types/home.types";

/**
 * Busca os dados da homepage no servidor.
 *
 * Responsabilidades:
 * - Chamar httpClient (nunca fetch diretamente)
 * - Validar a resposta com HomeDataSchema.parse() em runtime
 * - Retornar HomeData tipado e validado
 *
 * Sem imports React — services são funções TypeScript puras.
 */
export async function getHomeData(): Promise<HomeData> {
  const raw = await httpClient<unknown>("/home");
  return HomeDataSchema.parse(raw);
}
