import { Skeleton } from "@/components/loading/Skeleton";
import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import type { TeamScheduleMatch } from "../../types/teams.types";

type TeamScheduleProps = {
  matches: TeamScheduleMatch[];
  isLoading?: boolean;
  className?: string;
};

function formatDate(scheduledAt: string): string {
  return new Date(scheduledAt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TeamSchedule({ matches, isLoading = false, className }: TeamScheduleProps) {
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
        <p className="text-muted-foreground text-sm">No upcoming matches</p>
      </div>
    );
  }

  return (
    <div aria-label="Upcoming matches" className={cn("space-y-3", className)}>
      {matches.map((match) => (
        <div
          key={match.id}
          className="border-border/40 bg-card/40 hover:border-border flex items-center gap-4 rounded-xl border p-4 transition-all"
        >
          <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-foreground text-sm font-semibold">
                {match.homeTeam.flagEmoji}
              </span>
              <span className="text-foreground min-w-0 truncate text-sm font-semibold">
                {match.homeTeam.name}
              </span>
            </div>
            <span className="text-muted-foreground shrink-0 text-xs font-bold">VS</span>
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-foreground min-w-0 truncate text-sm font-semibold">
                {match.awayTeam.name}
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
                <span className="max-w-[200px] truncate">{match.venue}</span>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
