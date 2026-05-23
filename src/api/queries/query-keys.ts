/**
 * Fábrica centralizada de query keys.
 *
 * Regras:
 * - Nenhuma query key inline em hooks ou componentes
 * - Sempre usar as constantes daqui para invalidação, prefetch e cache
 * - Estrutura hierárquica: feature.all → feature.sub() → feature.detail(id)
 */
export const queryKeys = {
  home: {
    /** Invalida tudo relacionado à feature home */
    all: ["home"] as const,
    /** Dados completos da homepage (featured match + stats) */
    data: () => [...queryKeys.home.all, "data"] as const,
  },
  matches: {
    /** Invalida tudo relacionado à feature matches */
    all: ["matches"] as const,
    /** Todas as listas de matches (qualquer filtro) */
    lists: () => [...queryKeys.matches.all, "list"] as const,
    /** Lista de matches com filtros específicos */
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.matches.lists(), filters ?? {}] as const,
    /** Detalhe de um match específico */
    detail: (id: string) => [...queryKeys.matches.all, "detail", id] as const,
  },
} as const;
