import { Skeleton } from "@/components/loading/Skeleton";
import { cn } from "@/lib/utils";
import type { Player } from "../../types/teams.types";
import { TeamPlayerCard } from "../TeamPlayerCard/TeamPlayerCard";

type TeamRosterProps = {
  players: Player[];
  isLoading?: boolean;
  className?: string;
};

export function TeamRoster({ players, isLoading = false, className }: TeamRosterProps) {
  if (isLoading) {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="border-border/40 space-y-2 rounded-xl border p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div
        className={cn(
          "border-border/40 flex flex-col items-center justify-center rounded-xl border py-16",
          className
        )}
      >
        <p className="text-muted-foreground text-sm">No players available</p>
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-label="Team roster"
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        className
      )}
    >
      {players.map((player) => (
        <div key={player.id} role="listitem">
          <TeamPlayerCard player={player} />
        </div>
      ))}
    </div>
  );
}
