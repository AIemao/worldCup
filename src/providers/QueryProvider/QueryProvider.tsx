import { queryClient } from "@/api/config/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

type QueryProviderProps = {
  children: ReactNode;
};

/**
 * Provider isolado de React Query.
 *
 * - Usa o QueryClient singleton da aplicação (api/config/query-client)
 * - ReactQueryDevtools carregados apenas em development
 * - Isolado em src/providers para testabilidade independente
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
