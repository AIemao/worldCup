import { Skeleton } from "@/components/loading/Skeleton";
import { cn } from "@/lib/utils";
import type { GroupMatch } from "../../types/groups.types";
import { GroupMatchCard } from "../GroupMatchCard";

type GroupMatchesProps = {
  matches: GroupMatch[];
  isLoading?: boolean;
  className?: string;
};

function groupByRound(matches: GroupMatch[]): Record<string, GroupMatch[]> {
  return matches.reduce<Record<string, GroupMatch[]>>((acc, match) => {
    const round = match.round;
    if (!acc[round]) acc[round] = [];
    acc[round].push(match);
    return acc;
  }, {});
}

/**
 * Lista de partidas de um grupo, organizadas por rodada.
 *
 * Mostra skeleton em loading.
 * Mostra empty state se não houver partidas.
 */
export function GroupMatches({ matches, isLoading = false, className }: GroupMatchesProps) {
  if (isLoading) {
    return (
      <div className={cn("space-y-3", className)} aria-busy="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className={cn("border-border/40 rounded-xl border p-8 text-center", className)}>
        <p className="text-muted-foreground text-sm">No matches scheduled yet.</p>
      </div>
    );
  }

  const grouped = groupByRound(matches);

  return (
    <div className={cn("space-y-6", className)} role="list" aria-label="Group matches by round">
      {Object.entries(grouped).map(([round, roundMatches]) => (
        <section key={round} role="listitem" aria-label={round}>
          <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
            {round}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {roundMatches.map((match) => (
              <GroupMatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
