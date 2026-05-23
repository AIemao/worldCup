import { http, HttpResponse } from "msw";

/**
 * Handlers MSW centralizados.
 * Cada feature adiciona seus handlers aqui (ou via server.use() em testes individuais).
 *
 * Exemplo:
 *   http.get('/api/matches', () => HttpResponse.json({ matches: [] }))
 */
export const handlers = [
    // handlers serão adicionados conforme as features forem criadas
    http.get("/api/health", () => HttpResponse.json({ status: "ok" })),
];
