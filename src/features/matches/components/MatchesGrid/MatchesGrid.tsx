import { Skeleton } from "@/components/loading/Skeleton";
import { StaggerList } from "@/components/motion/StaggerList";
import { cn } from "@/lib/utils";
import type { Match } from "../../types/match.types";
import { MatchCard } from "../MatchCard";

type MatchesGridProps = {
  matches: Match[];
  isLoading?: boolean;
  className?: string;
};

function MatchCardSkeleton() {
  return (
    <div className="border-border/50 flex flex-col gap-4 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col items-center gap-1.5">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="h-6 w-12" />
        <div className="flex flex-col items-center gap-1.5">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-7 w-full rounded-md" />
    </div>
  );
}

/**
 * Grid responsivo de partidas.
 *
 * - Skeleton loading: 8 cards enquanto carrega
 * - Renderiza MatchCard para cada partida com animações em stagger
 * - Responsivo: 1 col mobile → 2 col tablet → 3 col desktop → 4 col ultrawide
 */
export function MatchesGrid({ matches, isLoading = false, className }: MatchesGridProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
          className
        )}
        aria-busy="true"
        aria-label="Loading matches"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <MatchCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div aria-label={`${matches.length} match${matches.length !== 1 ? "es" : ""}`}>
      <StaggerList
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
          className
        )}
      >
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </StaggerList>
    </div>
  );
}
