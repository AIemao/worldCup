import { Skeleton } from "@/components/loading/Skeleton";
import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import type { TeamResultMatch } from "../../types/teams.types";

type TeamResultsProps = {
  matches: TeamResultMatch[];
  isLoading?: boolean;
  className?: string;
};

function formatDate(scheduledAt: string): string {
  return new Date(scheduledAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function TeamResults({ matches, isLoading = false, className }: TeamResultsProps) {
  if (isLoading) {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="border-border/40 space-y-2 rounded-xl border p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div
        className={cn(
          "border-border/40 flex flex-col items-center justify-center rounded-xl border py-16",
          className
        )}
      >
        <p className="text-muted-foreground text-sm">No recent results</p>
      </div>
    );
  }

  return (
    <div aria-label="Recent results" className={cn("space-y-3", className)}>
      {matches.map((match) => (
        <div
          key={match.id}
          className="border-border/40 bg-card/40 hover:border-border flex items-center gap-4 rounded-xl border p-4 transition-all"
        >
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="text-foreground text-sm font-semibold">
                {match.homeTeam.flagEmoji}
              </span>
              <span className="text-foreground min-w-0 truncate text-sm font-semibold">
                {match.homeTeam.shortName}
              </span>
            </div>

            <div className="border-border/60 bg-background shrink-0 rounded-lg border px-3 py-1 text-center">
              <span className="text-foreground text-sm font-black tabular-nums">
                {match.score.home} – {match.score.away}
              </span>
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
              <span className="text-foreground min-w-0 truncate text-sm font-semibold">
                {match.awayTeam.shortName}
              </span>
              <span className="text-foreground text-sm font-semibold">
                {match.awayTeam.flagEmoji}
              </span>
            </div>
          </div>

          <div className="text-muted-foreground hidden shrink-0 flex-col items-end gap-1 text-xs sm:flex">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(match.scheduledAt)}
            </span>
            {match.venue && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="max-w-[180px] truncate">{match.venue}</span>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
