import { GlassPanel } from "@/components/ui/GlassPanel";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";
import type { Match } from "../../types/match.types";
import { MatchHero } from "../MatchHero";
import { MatchStats } from "../MatchStats";
import { MatchTimeline } from "../MatchTimeline";

type MatchDetailsCardProps = {
  match: Match;
  className?: string;
};

/**
 * Card completo de detalhe de partida.
 *
 * Estrutura:
 * 1. MatchHero — seção cinematográfica com equipes e placar
 * 2. MatchStats — estatísticas comparativas (se disponíveis)
 * 3. MatchTimeline — eventos cronológicos (se disponíveis)
 */
export function MatchDetailsCard({ match, className }: MatchDetailsCardProps) {
  const hasStats = Boolean(match.stats);
  const hasEvents = Boolean(match.events?.length);

  return (
    <article
      aria-label={`Match details: ${match.homeTeam.name} vs ${match.awayTeam.name}`}
      className={cn("flex flex-col gap-6", className)}
    >
      <MatchHero match={match} />

      {hasStats && (
        <GlassPanel intensity="low" className="p-5">
          <h2 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
            Match Statistics
          </h2>
          <MatchStats stats={match.stats!} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
        </GlassPanel>
      )}

      {hasEvents && (
        <GlassPanel intensity="low" className="p-5">
          <h2 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
            Timeline
          </h2>
          <Separator className="mb-4" />
          <MatchTimeline events={match.events!} homeTeamId={match.homeTeam.id} />
        </GlassPanel>
      )}

      {!hasStats && !hasEvents && (
        <GlassPanel intensity="low" className="flex items-center justify-center p-8">
          <p className="text-muted-foreground text-sm">
            {match.status === "upcoming"
              ? "Match details will be available once the game starts."
              : "No match data available."}
          </p>
        </GlassPanel>
      )}
    </article>
  );
}
