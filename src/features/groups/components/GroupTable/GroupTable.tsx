import { Skeleton } from "@/components/loading/Skeleton";
import { cn } from "@/lib/utils";
import type { GroupStanding } from "../../types/groups.types";
import { GroupTableRow } from "../GroupTableRow";

type GroupTableProps = {
  standings: GroupStanding[];
  groupLetter: string;
  isLoading?: boolean;
  className?: string;
};

const HEADERS = [
  { label: "#", className: "w-10 text-center pl-4" },
  { label: "Team", className: "text-left" },
  { label: "P", className: "w-10 text-center", title: "Played" },
  { label: "W", className: "w-10 text-center", title: "Wins" },
  { label: "D", className: "hidden w-10 text-center sm:table-cell", title: "Draws" },
  { label: "L", className: "hidden w-10 text-center sm:table-cell", title: "Losses" },
  { label: "GF", className: "hidden w-10 text-center md:table-cell", title: "Goals For" },
  { label: "GA", className: "hidden w-10 text-center md:table-cell", title: "Goals Against" },
  { label: "GD", className: "hidden w-10 text-center md:table-cell", title: "Goal Difference" },
  { label: "Pts", className: "w-12 text-center font-bold", title: "Points" },
  { label: "Status", className: "hidden text-right pr-4 sm:table-cell" },
];

/**
 * Tabela completa de classificação de um grupo.
 *
 * - Cabeçalho com tooltips das colunas
 * - Linhas zebra + hover
 * - Indicador de classificação na borda esquerda (top 2)
 * - Skeleton em loading
 */
export function GroupTable({
  standings,
  groupLetter,
  isLoading = false,
  className,
}: GroupTableProps) {
  if (isLoading) {
    return (
      <div className={cn("border-border/40 space-y-2 rounded-xl border p-4", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("border-border/40 overflow-hidden rounded-xl border", className)}
      role="region"
      aria-label={`Group ${groupLetter} standings`}
    >
      {/* Qualification indicator legend */}
      <div className="border-border/20 flex items-center gap-4 border-b px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-muted-foreground text-xs">Knockout stage</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
          <span className="text-muted-foreground text-xs">Playoff</span>
        </div>
      </div>

      <table className="w-full border-collapse" aria-label={`Group ${groupLetter} table`}>
        <thead>
          <tr className="border-border/20 border-b">
            {HEADERS.map(({ label, className: hCls, title }) => (
              <th
                key={label}
                scope="col"
                title={title}
                className={cn(
                  "text-muted-foreground py-2.5 text-xs font-medium tracking-wide uppercase",
                  hCls
                )}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, i) => (
            <GroupTableRow key={standing.teamId} standing={standing} isHighlighted={i % 2 === 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
