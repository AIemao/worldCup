import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import type { Match } from "../../types/match.types";
import { MatchScore } from "../MatchScore";
import { MatchStatusBadge } from "../MatchStatusBadge";

type MatchHeroProps = {
  match: Match;
  className?: string;
};

type HeroTeamProps = {
  name: string;
  shortName: string;
  flagEmoji: string;
};

function HeroTeam({ name, shortName, flagEmoji }: HeroTeamProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className="text-7xl leading-none select-none sm:text-8xl"
        role="img"
        aria-label={`${name} flag`}
      >
        {flagEmoji}
      </span>
      <span className="text-foreground text-lg font-bold tracking-wider uppercase sm:text-xl">
        {shortName}
      </span>
      <span className="text-muted-foreground hidden text-sm sm:block">{name}</span>
    </div>
  );
}

/**
 * Seção hero cinematográfica da página de detalhe da partida.
 *
 * Exibe: equipes em destaque, placar central, status, round e venue.
 * Design inspirado em broadcasts de futebol de alta qualidade.
 */
export function MatchHero({ match, className }: MatchHeroProps) {
  return (
    <FadeIn>
      <section
        aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent px-6 py-10 sm:py-14",
          match.status === "live" && "shadow-glow-sm border-emerald-500/20",
          className
        )}
      >
        {/* Ambient glow blobs */}
        <div
          className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: match.homeTeam.primaryColor }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: match.awayTeam.primaryColor }}
          aria-hidden="true"
        />

        {/* Stage + status row */}
        <div className="relative mb-8 flex flex-col items-center gap-2">
          <MatchStatusBadge status={match.status} />
          <p className="text-muted-foreground text-sm font-medium">{match.round}</p>
        </div>

        {/* Teams + score */}
        <div className="relative flex items-center justify-between gap-4 sm:gap-8">
          <HeroTeam {...match.homeTeam} />

          <MatchScore
            status={match.status}
            score={match.score}
            scheduledAt={match.scheduledAt}
            currentMinute={match.currentMinute}
            className="flex-1 scale-125"
          />

          <HeroTeam {...match.awayTeam} />
        </div>

        {/* Venue */}
        <div className="relative mt-8 flex items-center justify-center gap-1.5">
          <MapPin className="text-muted-foreground h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-muted-foreground text-sm">
            {match.venue} · {match.city}, {match.country}
          </span>
        </div>
      </section>
    </FadeIn>
  );
}
