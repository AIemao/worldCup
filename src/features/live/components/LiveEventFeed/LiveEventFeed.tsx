import type { MatchEvent } from "@/features/matches/types/match.types";
import { cn } from "@/lib/utils";

type LiveEventFeedProps = {
  events: MatchEvent[];
  homeTeamId: string;
  className?: string;
};

const eventTypeLabel: Record<MatchEvent["type"], string> = {
  goal: "Goal",
  own_goal: "Own Goal",
  yellow_card: "Yellow Card",
  second_yellow: "2nd Yellow",
  red_card: "Red Card",
  substitution: "Sub",
  var_review: "VAR",
  penalty_saved: "Penalty Saved",
  penalty_missed: "Penalty Missed",
};

const eventTypeEmoji: Record<MatchEvent["type"], string> = {
  goal: "⚽",
  own_goal: "⚽",
  yellow_card: "🟨",
  second_yellow: "🟨🟥",
  red_card: "🟥",
  substitution: "🔄",
  var_review: "📺",
  penalty_saved: "🧤",
  penalty_missed: "❌",
};

function EventRow({ event, isHome }: { event: MatchEvent; isHome: boolean }) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 py-2 text-sm",
        isHome ? "flex-row" : "flex-row-reverse"
      )}
      aria-label={`${event.minute}' — ${eventTypeLabel[event.type]}: ${event.playerName}`}
    >
      <span className="text-foreground/50 w-8 shrink-0 text-center text-xs font-bold">
        {event.minute}&apos;
      </span>
      <span aria-hidden="true">{eventTypeEmoji[event.type]}</span>
      <div className={cn("flex flex-col", isHome ? "items-start" : "items-end")}>
        <span className="text-foreground/90 font-medium">{event.playerName}</span>
        {event.assistName && (
          <span className="text-foreground/50 text-xs">ass. {event.assistName}</span>
        )}
        {event.detail && <span className="text-foreground/50 text-xs">{event.detail}</span>}
      </div>
    </li>
  );
}

/**
 * Feed de eventos ao vivo de uma partida.
 *
 * Exibe gols, cartões, substituições e revisões VAR em ordem cronológica.
 * Eventos do time da casa ficam à esquerda, visitantes à direita.
 */
export function LiveEventFeed({ events, homeTeamId, className }: LiveEventFeedProps) {
  if (events.length === 0) {
    return (
      <div
        className={cn(
          "text-foreground/40 flex items-center justify-center py-8 text-sm",
          className
        )}
        aria-label="No match events yet"
      >
        No events yet
      </div>
    );
  }

  const sorted = [...events].sort((a, b) => b.minute - a.minute);

  return (
    <ul className={cn("divide-foreground/5 divide-y", className)} aria-label="Match events">
      {sorted.map((event) => (
        <EventRow key={event.id} event={event} isHome={event.teamId === homeTeamId} />
      ))}
    </ul>
  );
}
