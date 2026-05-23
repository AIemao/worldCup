import { cn } from "@/lib/utils";
import type { MatchForm } from "../../types/teams.types";
import { teamFormResultVariants } from "./team-form-badge.variants";

type TeamFormBadgeProps = {
  form: MatchForm[];
  className?: string;
};

export function TeamFormBadge({ form, className }: TeamFormBadgeProps) {
  if (form.length === 0) {
    return <span className={cn("text-muted-foreground text-xs", className)}>—</span>;
  }

  return (
    <div className={cn("flex items-center gap-1", className)} aria-label="Recent form">
      {form.map((result, i) => (
        <span
          key={i}
          className={teamFormResultVariants({ result })}
          aria-label={result === "W" ? "Win" : result === "D" ? "Draw" : "Loss"}
        >
          {result}
        </span>
      ))}
    </div>
  );
}
