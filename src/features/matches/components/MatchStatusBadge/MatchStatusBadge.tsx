import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import type { MatchStatus } from "../../types/match.types";
import { matchStatusBadgeVariants } from "./match-status-badge.variants";

type MatchStatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  status: MatchStatus;
};

/**
 * Badge visual do status de uma partida.
 *
 * - upcoming: azul/brand
 * - live:     verde pulsando com indicador ●
 * - finished: cinza neutro (Final)
 */
export function MatchStatusBadge({ status, className, ...props }: MatchStatusBadgeProps) {
  return (
    <span
      className={cn(matchStatusBadgeVariants({ status }), className)}
      aria-label={`Match status: ${status}`}
      {...props}
    >
      {status === "live" && (
        <span
          className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
          aria-hidden="true"
        />
      )}
      {status === "upcoming" ? "Upcoming" : status === "live" ? "Live" : "Final"}
    </span>
  );
}
