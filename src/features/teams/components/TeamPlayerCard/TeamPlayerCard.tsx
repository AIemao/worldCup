import { cn } from "@/lib/utils";
import type { Player } from "../../types/teams.types";

type TeamPlayerCardProps = {
  player: Player;
  className?: string;
};

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

const POSITION_LABELS: Record<string, string> = {
  goalkeeper: "GK",
  defender: "DEF",
  midfielder: "MID",
  forward: "FWD",
};

const POSITION_COLORS: Record<string, string> = {
  goalkeeper: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  defender: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  midfielder: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  forward: "text-red-400 bg-red-400/10 border-red-400/20",
};

export function TeamPlayerCard({ player, className }: TeamPlayerCardProps) {
  const age = player.birthDate ? calculateAge(player.birthDate) : null;

  return (
    <div
      role="article"
      aria-label={`${player.name}, ${player.position}`}
      className={cn(
        "border-border/40 bg-card/40 hover:border-border group flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-200",
        className
      )}
    >
      <div className="relative">
        {player.thumb ? (
          <img
            src={player.thumb}
            alt={player.name}
            className="h-16 w-16 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full text-2xl">
            👤
          </div>
        )}
        {player.shirtNumber && (
          <span className="bg-background border-border absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border text-xs font-bold tabular-nums">
            {player.shirtNumber}
          </span>
        )}
      </div>

      <div className="min-w-0 text-center">
        <p className="text-foreground line-clamp-1 text-sm font-semibold">{player.name}</p>
        <p className="text-muted-foreground text-xs">{player.nationality}</p>
        {age !== null && <p className="text-muted-foreground text-xs">{age} years</p>}
      </div>

      <span
        className={cn(
          "rounded border px-2 py-0.5 text-xs font-medium",
          POSITION_COLORS[player.position]
        )}
      >
        {POSITION_LABELS[player.position]}
      </span>
    </div>
  );
}
