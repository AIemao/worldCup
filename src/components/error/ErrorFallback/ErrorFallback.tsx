import type { Nullable } from "@/types/common";
import { AlertCircle, RotateCcw } from "lucide-react";

type ErrorFallbackProps = {
  error: Nullable<Error>;
  reset: () => void;
};

// Fallback genérico para uso com <ErrorBoundary fallback={ErrorFallback} />
export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-full">
        <AlertCircle className="text-destructive h-6 w-6" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="text-foreground text-lg font-semibold">Something went wrong</h2>
        {error?.message && (
          <p className="text-muted-foreground max-w-sm text-sm">{error.message}</p>
        )}
      </div>

      <button
        onClick={reset}
        className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
