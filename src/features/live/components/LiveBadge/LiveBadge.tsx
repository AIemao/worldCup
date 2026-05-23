import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import type { LiveBadgeVariants } from "./live-badge.variants";
import { liveBadgeVariants } from "./live-badge.variants";

type LiveBadgeProps = HTMLAttributes<HTMLSpanElement> &
  LiveBadgeVariants & {
    minute?: number;
  };

/**
 * Indicador visual de partida ao vivo.
 *
 * Exibe o texto "LIVE" com um ponto pulsando em vermelho.
 * Opcionalmente mostra o minuto atual (ex: "LIVE · 67'").
 */
export function LiveBadge({ size, variant, minute, className, ...props }: LiveBadgeProps) {
  return (
    <span
      className={cn(liveBadgeVariants({ size, variant }), className)}
      aria-label={minute !== undefined ? `Live match, minute ${minute}` : "Live match"}
      role="status"
      {...props}
    >
      <span
        className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500"
        aria-hidden="true"
      />
      <span>LIVE</span>
      {minute !== undefined && (
        <>
          <span className="opacity-50" aria-hidden="true">
            ·
          </span>
          <span>{minute}&apos;</span>
        </>
      )}
    </span>
  );
}
