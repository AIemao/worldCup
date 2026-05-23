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
} as const;
