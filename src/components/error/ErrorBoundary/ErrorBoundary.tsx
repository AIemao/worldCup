import type { Nullable } from "@/types/common";
import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

type ErrorFallbackComponent = React.ComponentType<{
  error: Nullable<Error>;
  reset: () => void;
}>;

type Props = {
  children: ReactNode;
  fallback?: ErrorFallbackComponent;
};

type State = {
  hasError: boolean;
  error: Nullable<Error>;
};

// Componente de classe — único mecanismo estável para capturar erros de render no React
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // ponto de extensão: adicionar Sentry/DataDog aqui em produção
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback;
        return <Fallback error={this.state.error} reset={this.reset} />;
      }

      // fallback mínimo inline se nenhum for fornecido
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8">
          <p className="text-muted-foreground text-sm">Something went wrong.</p>
          <button
            onClick={this.reset}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
