import { ROUTES } from "@/config/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { Group, GroupStanding } from "../../types/groups.types";
import { QualificationBadge } from "../QualificationBadge";

type GroupCardProps = {
  group: Group;
  standings: GroupStanding[];
  className?: string;
};

/**
 * Card de visão geral de um grupo.
 *
 * Exibe o nome do grupo e mini-tabela com os 4 times.
 * Link para a página de detalhes do grupo.
 */
export function GroupCard({ group, standings, className }: GroupCardProps) {
  return (
    <Link
      to={`${ROUTES.GROUPS}/${group.letter.toLowerCase()}`}
      className={cn(
        "group border-border/40 bg-card/50 block rounded-xl border p-5 transition-all",
        "hover:border-brand/30 hover:bg-brand/5 focus-visible:ring-brand/50 focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      aria-label={`${group.name} standings — view details`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-foreground text-base font-bold tracking-tight">{group.name}</h3>
        <span className="text-muted-foreground text-xs opacity-0 transition-opacity group-hover:opacity-100">
          View →
        </span>
      </div>

      {/* Mini standings */}
      <div className="space-y-2">
        {standings.map((s) => (
          <div
            key={s.teamId}
            className={cn(
              "flex items-center gap-2",
              s.qualificationStatus === "eliminated" && "opacity-50"
            )}
          >
            <span className="text-muted-foreground w-4 text-center font-mono text-xs">
              {s.position}
            </span>
            <span className="text-base leading-none" role="img" aria-label={`${s.teamName} flag`}>
              {s.teamFlagEmoji}
            </span>
            <span className="text-foreground min-w-0 flex-1 truncate text-sm font-medium">
              {s.teamShortName}
            </span>
            <QualificationBadge status={s.qualificationStatus} compact />
            <span className="text-foreground w-6 text-right font-mono text-sm font-bold tabular-nums">
              {s.points}
            </span>
          </div>
        ))}
      </div>
    </Link>
  );
}
