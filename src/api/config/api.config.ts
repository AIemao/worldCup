/**
 * Configuração central da API.
 *
 * Em desenvolvimento e testes o MSW intercepta as requisições,
 * portanto qualquer base URL funciona.
 * Em produção, VITE_API_URL deve apontar para o backend real.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

/**
 * Timeout padrão em ms para todas as requisições HTTP.
 * Pode ser sobrescrito individualmente em httpClient({ timeout }).
 */
export const API_TIMEOUT_MS = 10_000;
