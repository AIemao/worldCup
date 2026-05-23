import { cn } from "@/lib/utils";
import { CalendarX2 } from "lucide-react";

type EmptyMatchesStateProps = {
  message?: string;
  className?: string;
};

/**
 * Estado vazio para quando não há partidas correspondentes aos filtros ativos.
 */
export function EmptyMatchesState({
  message = "No matches found for the selected filters.",
  className,
}: EmptyMatchesStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-4 py-16 text-center", className)}
      role="status"
      aria-live="polite"
    >
      <div className="bg-secondary flex h-14 w-14 items-center justify-center rounded-full">
        <CalendarX2 className="text-muted-foreground h-7 w-7" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <p className="text-foreground text-sm font-medium">No matches</p>
        <p className="text-muted-foreground max-w-xs text-sm">{message}</p>
      </div>
    </div>
  );
}
