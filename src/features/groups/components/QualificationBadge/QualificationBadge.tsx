import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import type { QualificationStatus } from "../../types/groups.types";
import { qualificationBadgeVariants } from "./qualification-badge.variants";

const STATUS_LABELS: Record<QualificationStatus, string> = {
  qualified: "Qualified",
  playoff: "Playoff",
  eliminated: "Eliminated",
  pending: "Pending",
};

const STATUS_ARIA: Record<QualificationStatus, string> = {
  qualified: "Qualified for knockout stage",
  playoff: "Playoff spot",
  eliminated: "Eliminated from tournament",
  pending: "Qualification pending",
};

type QualificationBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  status: QualificationStatus;
  compact?: boolean;
};

/**
 * Badge que indica o status de classificação de um time no grupo.
 *
 * Variants:
 * - qualified → verde (top 2 do grupo)
 * - playoff → amarelo (3º lugar em disputa de repescagem)
 * - eliminated → cinza opaco (4º lugar)
 * - pending → neutro (fase ainda em andamento)
 */
export function QualificationBadge({
  status,
  compact = false,
  className,
  ...props
}: QualificationBadgeProps) {
  return (
    <span
      className={cn(qualificationBadgeVariants({ status }), className)}
      aria-label={STATUS_ARIA[status]}
      {...props}
    >
      {compact ? status[0].toUpperCase() : STATUS_LABELS[status]}
    </span>
  );
}
