/**
 * Feature flags — controla funcionalidades habilitadas/desabilitadas.
 *
 * VITE_API_MODE controla o modo de dados:
 *   "mock"   — tudo interceptado por MSW (padrão dev/test)
 *   "hybrid" — Teams via API real + resto mock
 *   "live"   — tudo via API real
 */
export type ApiMode = "mock" | "hybrid" | "live";

export const API_MODE: ApiMode =
  (import.meta.env["VITE_API_MODE"] as ApiMode | undefined) ?? "mock";

export const FEATURES = {
  /** Dados ao vivo via TheSportsDB API */
  liveApi: false as boolean,
  /** Dados de seleções via TheSportsDB API */
  teamApi: true as boolean,
  /** Conexão WebSocket para dados em tempo real */
  websocket: false as boolean,
} as const;
