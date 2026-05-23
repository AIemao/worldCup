import { cn } from "@/lib/utils";
import type { MatchScore as MatchScoreData, MatchStatus } from "../../types/match.types";

type MatchScoreProps = {
  status: MatchStatus;
  score?: MatchScoreData;
  scheduledAt: string;
  currentMinute?: number;
  className?: string;
};

function formatKickoffTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  });
}

/**
 * Exibe o placar ou "vs" dependendo do status da partida.
 *
 * - upcoming:         "vs" + horário de início
 * - live:             placar em tempo real + minuto atual
 * - finished:         placar final (+ pênaltis se aplicável)
 */
export function MatchScore({
  status,
  score,
  scheduledAt,
  currentMinute,
  className,
}: MatchScoreProps) {
  if (status === "upcoming") {
    return (
      <div className={cn("flex flex-col items-center gap-0.5", className)}>
        <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          vs
        </span>
        <span className="text-muted-foreground/60 text-xs tabular-nums">
          {formatKickoffTime(scheduledAt)} UTC
        </span>
      </div>
    );
  }

  const s = score ?? { home: 0, away: 0 };

  return (
    <div
      className={cn("flex flex-col items-center gap-0.5", className)}
      aria-label={`Score: ${s.home} - ${s.away}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-foreground text-xl leading-none font-extrabold tabular-nums">
          {s.home}
        </span>
        <span className="text-muted-foreground font-bold">-</span>
        <span className="text-foreground text-xl leading-none font-extrabold tabular-nums">
          {s.away}
        </span>
      </div>

      {s.homePenalties !== undefined && s.awayPenalties !== undefined && (
        <span className="text-muted-foreground text-xs">
          ({s.homePenalties} – {s.awayPenalties}) pens
        </span>
      )}

      {status === "live" && currentMinute !== undefined && (
        <span className="text-xs font-semibold text-emerald-400 tabular-nums">
          {currentMinute}&apos;
        </span>
      )}
    </div>
  );
}
