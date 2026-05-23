import { cn } from "@/lib/utils";
import type { MatchStats as MatchStatsData, TeamRef } from "../../types/match.types";

type MatchStatsPanelProps = {
  stats: MatchStatsData;
  homeTeam: TeamRef;
  awayTeam: TeamRef;
  className?: string;
};

type StatBarProps = {
  label: string;
  home: number;
  away: number;
  isPossession?: boolean;
};

function StatBar({ label, home, away, isPossession = false }: StatBarProps) {
  const total = home + away;
  const homePercent = total > 0 ? Math.round((home / total) * 100) : 50;

  const displayHome = isPossession ? `${home}%` : String(home);
  const displayAway = isPossession ? `${away}%` : String(away);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-foreground font-semibold tabular-nums">{displayHome}</span>
        <span className="text-muted-foreground text-center">{label}</span>
        <span className="text-foreground font-semibold tabular-nums">{displayAway}</span>
      </div>
      <div
        className="bg-secondary flex h-1.5 overflow-hidden rounded-full"
        role="meter"
        aria-label={`${label}: ${displayHome} vs ${displayAway}`}
        aria-valuenow={homePercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="bg-brand h-full rounded-l-full transition-all duration-500"
          style={{ width: `${homePercent}%` }}
        />
        <div className="bg-secondary h-full flex-1 rounded-r-full" />
      </div>
    </div>
  );
}

/**
 * Painel de estatísticas comparativas da partida.
 *
 * Exibe barras de comparação para posse, chutes, escanteios, faltas e cartões.
 */
export function MatchStats({ stats, homeTeam, awayTeam, className }: MatchStatsPanelProps) {
  return (
    <section aria-label="Match statistics" className={cn("flex flex-col gap-4", className)}>
      {/* Team headers */}
      <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true">{homeTeam.flagEmoji}</span>
          {homeTeam.shortName}
        </span>
        <span className="text-muted-foreground">Stats</span>
        <span className="flex items-center gap-1.5">
          {awayTeam.shortName}
          <span aria-hidden="true">{awayTeam.flagEmoji}</span>
        </span>
      </div>

      {/* Stat bars */}
      <StatBar
        label="Possession"
        home={stats.possession.home}
        away={stats.possession.away}
        isPossession
      />
      <StatBar label="Shots" home={stats.shots.home} away={stats.shots.away} />
      <StatBar label="On Target" home={stats.shotsOnTarget.home} away={stats.shotsOnTarget.away} />
      <StatBar label="Corners" home={stats.corners.home} away={stats.corners.away} />
      <StatBar label="Fouls" home={stats.fouls.home} away={stats.fouls.away} />
      <StatBar label="Yellow Cards" home={stats.yellowCards.home} away={stats.yellowCards.away} />
    </section>
  );
}
