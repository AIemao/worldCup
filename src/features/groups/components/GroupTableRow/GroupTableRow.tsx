import { cn } from "@/lib/utils";
import type { GroupStanding } from "../../types/groups.types";
import { QualificationBadge } from "../QualificationBadge";

type GroupTableRowProps = {
  standing: GroupStanding;
  isHighlighted?: boolean;
};

const POSITION_COLORS: Record<number, string> = {
  1: "text-emerald-400",
  2: "text-emerald-400",
  3: "text-amber-400",
  4: "text-muted-foreground",
};

/**
 * Linha da tabela de classificação do grupo.
 *
 * Top 2 (qualified): borda esquerda verde + position destacada em verde.
 * 3º (playoff): position em amarelo.
 * 4º (eliminated): opacidade reduzida.
 */
export function GroupTableRow({ standing, isHighlighted = false }: GroupTableRowProps) {
  const positionColor = POSITION_COLORS[standing.position] ?? "text-muted-foreground";
  const isEliminated = standing.qualificationStatus === "eliminated";
  const isQualified = standing.qualificationStatus === "qualified";

  return (
    <tr
      className={cn(
        "group border-border/20 border-b transition-colors last:border-0",
        "hover:bg-white/[0.02]",
        isEliminated && "opacity-50",
        isHighlighted && "bg-white/[0.02]"
      )}
      aria-label={`${standing.teamName}: position ${standing.position}, ${standing.points} points`}
    >
      {/* Position */}
      <td className="py-3 pr-2 pl-4 text-center">
        <span className={cn("font-mono text-sm font-bold", positionColor)}>
          {standing.position}
        </span>
        {isQualified && (
          <span
            className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle"
            aria-hidden="true"
          />
        )}
      </td>

      {/* Team */}
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2.5">
          <span
            className="text-xl leading-none"
            role="img"
            aria-label={`${standing.teamName} flag`}
          >
            {standing.teamFlagEmoji}
          </span>
          <div className="min-w-0">
            <span className="text-foreground block truncate text-sm font-semibold">
              {standing.teamShortName}
            </span>
            <span className="text-muted-foreground hidden truncate text-xs sm:block">
              {standing.teamName}
            </span>
          </div>
        </div>
      </td>

      {/* Stats */}
      <td className="text-muted-foreground px-2 py-3 text-center font-mono text-sm tabular-nums">
        {standing.played}
      </td>
      <td className="text-muted-foreground px-2 py-3 text-center font-mono text-sm tabular-nums">
        {standing.wins}
      </td>
      <td className="text-muted-foreground hidden px-2 py-3 text-center font-mono text-sm tabular-nums sm:table-cell">
        {standing.draws}
      </td>
      <td className="text-muted-foreground hidden px-2 py-3 text-center font-mono text-sm tabular-nums sm:table-cell">
        {standing.losses}
      </td>
      <td className="text-muted-foreground hidden px-2 py-3 text-center font-mono text-sm tabular-nums md:table-cell">
        {standing.goalsFor}
      </td>
      <td className="text-muted-foreground hidden px-2 py-3 text-center font-mono text-sm tabular-nums md:table-cell">
        {standing.goalsAgainst}
      </td>
      <td
        className={cn(
          "hidden px-2 py-3 text-center font-mono text-sm tabular-nums md:table-cell",
          standing.goalDifference > 0 ? "text-emerald-400" : "text-muted-foreground"
        )}
      >
        {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
      </td>

      {/* Points */}
      <td className="px-3 py-3 text-center">
        <span className="text-foreground font-mono text-sm font-bold tabular-nums">
          {standing.points}
        </span>
      </td>

      {/* Qualification */}
      <td className="hidden px-4 py-3 text-right sm:table-cell">
        <QualificationBadge status={standing.qualificationStatus} compact />
      </td>
    </tr>
  );
}
