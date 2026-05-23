import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Match } from "../../types/match.types";
import { MatchScore } from "../MatchScore";
import { MatchStatusBadge } from "../MatchStatusBadge";

type MatchCardProps = {
  match: Match;
  className?: string;
};

type TeamDisplayProps = {
  name: string;
  shortName: string;
  flagEmoji: string;
  side: "home" | "away";
};

function TeamDisplay({ name, shortName, flagEmoji, side }: TeamDisplayProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center gap-1.5",
        side === "away" && "items-center"
      )}
    >
      <span className="text-4xl leading-none select-none" role="img" aria-label={`${name} flag`}>
        {flagEmoji}
      </span>
      <span className="text-foreground truncate text-xs font-bold tracking-wider uppercase">
        {shortName}
      </span>
    </div>
  );
}

/**
 * Card compacto de uma partida.
 *
 * Inclui: equipes, placar/vs, badge de status, venue e horário.
 * Navega para /matches/:id ao clicar no botão de detalhe.
 */
export function MatchCard({ match, className }: MatchCardProps) {
  return (
    <GlassPanel
      intensity="medium"
      glow={match.status === "live" ? "sm" : "none"}
      className={cn(
        "hover:border-border flex flex-col gap-4 p-4 transition-all duration-200",
        match.status === "live" && "border-emerald-500/30",
        className
      )}
    >
      {/* Header: stage + status */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground truncate text-xs">{match.round}</span>
        <MatchStatusBadge status={match.status} />
      </div>

      {/* Teams + score */}
      <div
        className="flex items-center justify-between gap-3"
        aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
      >
        <TeamDisplay {...match.homeTeam} side="home" />

        <MatchScore
          status={match.status}
          score={match.score}
          scheduledAt={match.scheduledAt}
          currentMinute={match.currentMinute}
          className="flex-1"
        />

        <TeamDisplay {...match.awayTeam} side="away" />
      </div>

      {/* Venue */}
      <div className="flex items-center gap-1.5">
        <MapPin className="text-muted-foreground h-3 w-3 shrink-0" aria-hidden="true" />
        <span className="text-muted-foreground truncate text-xs">
          {match.venue}, {match.city}
        </span>
      </div>

      {/* CTA */}
      <Link
        to={`/matches/${match.id}`}
        className="text-brand border-brand/30 hover:bg-brand/10 mt-auto flex w-full items-center justify-center rounded-md border py-1.5 text-xs font-medium transition-colors"
        aria-label={`Match details: ${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`}
      >
        Match Details
      </Link>
    </GlassPanel>
  );
}
