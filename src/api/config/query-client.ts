import { QueryClient } from "@tanstack/react-query";

/**
 * QueryClient singleton da aplicação.
 *
 * Estratégia de cache:
 * - staleTime: 2 min — dados da mesma sessão são reutilizados sem re-fetch,
 *   reduzindo requests desnecessários em navegações rápidas.
 * - gcTime: 10 min — dados inativos ficam em memória para re-uso imediato
 *   ao retornar a uma página (antes de serem re-buscados em background).
 * - retry: 2 — tenta 3x ao todo antes de marcar como erro;
 *   adequado para APIs que podem ter falhas transitórias.
 * - refetchOnWindowFocus: false — evita refetch ao trocar de aba
 *   (relevante para dados que mudam pouco como fixtures do torneio).
 * - refetchOnReconnect: true — atualiza dados ao reconectar à internet,
 *   garantindo dados frescos após perda de conectividade.
 *
 * Para testes, crie um QueryClient isolado com retry: false para
 * evitar flakiness e timeouts desnecessários.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 min
      gcTime: 1000 * 60 * 10, // 10 min
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});
