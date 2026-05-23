import type { UseQueryOptions } from "@tanstack/react-query";

/**
 * Opções padrão para queries de testes.
 *
 * Desabilita retry para evitar flakiness e timeouts
 * em testes unitários/integração.
 */
export function testQueryOptions<T>(): Partial<UseQueryOptions<T>> {
  return {
    retry: false,
    gcTime: 0,
    staleTime: 0,
  };
}
