import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { ErrorFallback } from "@/components/error/ErrorFallback";
import { PageSkeleton } from "@/components/loading/PageSkeleton";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

/**
 * Camada mais externa da árvore de rotas.
 * Fornece ErrorBoundary global e Suspense fallback para lazy routes.
 * O errorElement do React Router cuida de erros de loader/render de rota;
 * este ErrorBoundary cuida de erros em componentes filhos.
 */
export function RootLayout() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
