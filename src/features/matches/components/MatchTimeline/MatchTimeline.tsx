import { cn } from "@/lib/utils";
import { AlertCircle, Goal, Repeat2, Shield, Zap } from "lucide-react";
import type { MatchEvent, MatchEventType } from "../../types/match.types";

type MatchTimelineProps = {
  events: MatchEvent[];
  homeTeamId: string;
  className?: string;
};

type EventIconProps = { type: MatchEventType };

function EventIcon({ type }: EventIconProps) {
  switch (type) {
    case "goal":
    case "penalty_saved":
      return <Goal className="h-3.5 w-3.5" aria-hidden="true" />;
    case "own_goal":
      return <Goal className="text-destructive h-3.5 w-3.5" aria-hidden="true" />;
    case "yellow_card":
    case "second_yellow":
      return (
        <span className="inline-block h-3.5 w-2.5 rounded-sm bg-amber-400" aria-hidden="true" />
      );
    case "red_card":
      return (
        <span className="bg-destructive inline-block h-3.5 w-2.5 rounded-sm" aria-hidden="true" />
      );
    case "substitution":
      return <Repeat2 className="h-3.5 w-3.5" aria-hidden="true" />;
    case "var_review":
      return <Zap className="h-3.5 w-3.5" aria-hidden="true" />;
    case "penalty_missed":
      return <AlertCircle className="text-destructive h-3.5 w-3.5" aria-hidden="true" />;
    default:
      return <Shield className="h-3.5 w-3.5" aria-hidden="true" />;
  }
}

function eventAriaLabel(event: MatchEvent): string {
  const base = `Minute ${event.minute}: ${event.type.replace(/_/g, " ")} — ${event.playerName}`;
  return event.assistName ? `${base} (assist: ${event.assistName})` : base;
}

/**
 * Timeline cronológica dos eventos de uma partida.
 *
 * Layout split: eventos da equipe da casa à esquerda, visitante à direita.
 * Ordenado por minuto crescente.
 */
export function MatchTimeline({ events, homeTeamId, className }: MatchTimelineProps) {
  if (events.length === 0) {
    return (
      <p className={cn("text-muted-foreground py-6 text-center text-sm", className)}>
        No events recorded yet.
      </p>
    );
  }

  const sorted = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <ol className={cn("flex flex-col gap-1", className)} aria-label="Match timeline">
      {sorted.map((event) => {
        const isHome = event.teamId === homeTeamId;
        return (
          <li
            key={event.id}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
            aria-label={eventAriaLabel(event)}
          >
            {/* Home side */}
            <div className={cn("flex items-center gap-2", isHome && "justify-end")}>
              {isHome && (
                <>
                  <span className="text-foreground truncate text-right text-sm">
                    {event.playerName}
                    {event.assistName && (
                      <span className="text-muted-foreground text-xs"> ({event.assistName})</span>
                    )}
                  </span>
                  <div className="text-foreground shrink-0">
                    <EventIcon type={event.type} />
                  </div>
                </>
              )}
            </div>

            {/* Minute */}
            <div className="text-muted-foreground bg-secondary flex h-6 w-9 items-center justify-center rounded-full text-xs font-semibold tabular-nums">
              {event.minute}&apos;
            </div>

            {/* Away side */}
            <div className={cn("flex items-center gap-2", !isHome && "justify-start")}>
              {!isHome && (
                <>
                  <div className="text-foreground shrink-0">
                    <EventIcon type={event.type} />
                  </div>
                  <span className="text-foreground truncate text-sm">
                    {event.playerName}
                    {event.assistName && (
                      <span className="text-muted-foreground text-xs"> ({event.assistName})</span>
                    )}
                  </span>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
