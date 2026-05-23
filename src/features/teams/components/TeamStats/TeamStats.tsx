import { cn } from "@/lib/utils";
import type { TeamStats } from "../../types/teams.types";
import { TeamFormBadge } from "../TeamFormBadge/TeamFormBadge";

type TeamStatsProps = {
  stats: TeamStats;
  className?: string;
};

type StatCardProps = {
  label: string;
  value: string | number;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="border-border/40 bg-card/40 flex flex-col items-center gap-1 rounded-xl border p-4 text-center">
      <span className="text-foreground text-2xl font-black tabular-nums">{value}</span>
      <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

export function TeamStats({ stats, className }: TeamStatsProps) {
  return (
    <div role="region" aria-label="Team statistics" className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Matches" value={stats.matchesPlayed} />
        <StatCard label="Wins" value={stats.wins} />
        <StatCard label="Draws" value={stats.draws} />
        <StatCard label="Losses" value={stats.losses} />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Goals For" value={stats.goalsFor} />
        <StatCard label="Goals Against" value={stats.goalsAgainst} />
        <StatCard
          label="Goal Diff"
          value={`${stats.goalsFor - stats.goalsAgainst >= 0 ? "+" : ""}${stats.goalsFor - stats.goalsAgainst}`}
        />
        <StatCard label="Clean Sheets" value={stats.cleanSheets} />
      </div>
      {stats.form.length > 0 && (
        <div className="border-border/40 bg-card/40 flex items-center justify-between rounded-xl border p-4">
          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Recent Form
          </span>
          <TeamFormBadge form={stats.form} />
        </div>
      )}
    </div>
  );
}
