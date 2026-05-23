import { LiveBadge } from "@/features/live/components/LiveBadge";
import { cn } from "@/lib/utils";
import { CalendarDays, MapPin } from "lucide-react";
import type { GroupMatch } from "../../types/groups.types";

type GroupMatchCardProps = {
  match: GroupMatch;
  className?: string;
};

function formatDate(scheduledAt: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date(scheduledAt));
  } catch {
    return scheduledAt;
  }
}

/**
 * Card de partida dentro de um grupo.
 *
 * Estados:
 * - finished: exibe placar final
 * - live: exibe placar com LiveBadge e minuto atual
 * - upcoming: exibe data/hora
 */
export function GroupMatchCard({ match, className }: GroupMatchCardProps) {
  const isFinished = match.status === "finished";
  const isUpcoming = match.status === "upcoming";

  return (
    <div
      className={cn(
        "border-border/40 bg-card/50 flex flex-col gap-3 rounded-xl border p-4 transition-colors",
        match.isLive && "border-red-500/30 bg-red-500/5",
        className
      )}
      role="article"
      aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}, ${match.round}`}
    >
      {/* Header: round + status indicator */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium">{match.round}</span>
        {match.isLive && <LiveBadge size="sm" minute={match.currentMinute} />}
        {isFinished && (
          <span className="text-muted-foreground rounded bg-white/5 px-1.5 py-0.5 text-xs">FT</span>
        )}
        {isUpcoming && (
          <span className="text-muted-foreground text-xs">
            <CalendarDays className="mr-1 inline h-3 w-3" aria-hidden="true" />
            {formatDate(match.scheduledAt)}
          </span>
        )}
      </div>

      {/* Teams and score */}
      <div className="flex items-center justify-between gap-2">
        {/* Home team */}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span
            className="text-2xl leading-none"
            role="img"
            aria-label={`${match.homeTeam.name} flag`}
          >
            {match.homeTeam.flagEmoji}
          </span>
          <div className="min-w-0">
            <span className="text-foreground block truncate text-sm font-semibold">
              {match.homeTeam.shortName}
            </span>
            <span className="text-muted-foreground hidden truncate text-xs sm:block">
              {match.homeTeam.name}
            </span>
          </div>
        </div>

        {/* Score / vs */}
        <div className="flex-shrink-0 text-center">
          {match.score ? (
            <span
              className={cn(
                "font-mono text-xl font-black tabular-nums",
                match.isLive ? "text-foreground" : "text-foreground/80"
              )}
              aria-label={`Score: ${match.score.home} to ${match.score.away}`}
            >
              {match.score.home}
              <span className="text-foreground/30 mx-1.5">–</span>
              {match.score.away}
            </span>
          ) : (
            <span className="text-muted-foreground text-sm font-medium">vs</span>
          )}
        </div>

        {/* Away team */}
        <div className="flex min-w-0 flex-1 flex-row-reverse items-center gap-2">
          <span
            className="text-2xl leading-none"
            role="img"
            aria-label={`${match.awayTeam.name} flag`}
          >
            {match.awayTeam.flagEmoji}
          </span>
          <div className="min-w-0 text-right">
            <span className="text-foreground block truncate text-sm font-semibold">
              {match.awayTeam.shortName}
            </span>
            <span className="text-muted-foreground hidden truncate text-xs sm:block">
              {match.awayTeam.name}
            </span>
          </div>
        </div>
      </div>

      {/* Venue */}
      {match.venue && (
        <div className="flex items-center gap-1.5">
          <MapPin className="text-muted-foreground h-3 w-3 flex-shrink-0" aria-hidden="true" />
          <span className="text-muted-foreground truncate text-xs">{match.venue}</span>
        </div>
      )}
    </div>
  );
}
