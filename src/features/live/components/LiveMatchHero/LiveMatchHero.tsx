import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import type { LiveMatch, Momentum } from "../../types/live.types";
import { LiveBadge } from "../LiveBadge";
import { MomentumBar } from "../MomentumBar";

type LiveMatchHeroProps = {
  match: LiveMatch;
  momentum?: Momentum;
  className?: string;
};

function HeroTeam({
  name,
  shortName,
  flagEmoji,
}: {
  name: string;
  shortName: string;
  flagEmoji: string;
}) {
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
 * Seção hero cinematográfica para partidas ao vivo.
 *
 * Exibe badge LIVE com minuto, equipes, placar em tempo real,
 * round/venue e barra de momentum opcional.
 */
export function LiveMatchHero({ match, momentum, className }: LiveMatchHeroProps) {
  return (
    <FadeIn>
      <section
        aria-label={`Live: ${match.homeTeam.name} vs ${match.awayTeam.name}`}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-red-500/20 bg-linear-to-b from-red-500/5 to-transparent px-6 py-10 shadow-[0_0_40px_--theme(--color-red-500/10%)] sm:py-14",
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

        {/* Live badge + round */}
        <div className="relative mb-8 flex flex-col items-center gap-2">
          <LiveBadge variant="bright" minute={match.currentMinute} />
          <p className="text-muted-foreground text-sm font-medium">{match.round}</p>
        </div>

        {/* Teams + Score */}
        <div className="relative flex items-center justify-between gap-4">
          <HeroTeam
            name={match.homeTeam.name}
            shortName={match.homeTeam.shortName}
            flagEmoji={match.homeTeam.flagEmoji}
          />

          <div className="flex flex-col items-center gap-2">
            <span
              className="text-foreground font-mono text-5xl font-black tracking-tight tabular-nums sm:text-6xl"
              aria-label={`Score: ${match.score.home} to ${match.score.away}`}
            >
              {match.score.home}
              <span className="text-foreground/30 mx-2">–</span>
              {match.score.away}
            </span>
          </div>

          <HeroTeam
            name={match.awayTeam.name}
            shortName={match.awayTeam.shortName}
            flagEmoji={match.awayTeam.flagEmoji}
          />
        </div>

        {/* Venue */}
        <div className="text-foreground/40 relative mt-6 flex items-center justify-center gap-1.5 text-xs">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          <span>
            {match.venue}, {match.city}
          </span>
        </div>

        {/* Momentum bar */}
        {momentum && (
          <div className="relative mt-6">
            <MomentumBar
              momentum={momentum}
              homeColor={match.homeTeam.primaryColor}
              awayColor={match.awayTeam.primaryColor}
              homeLabel={match.homeTeam.shortName}
              awayLabel={match.awayTeam.shortName}
            />
          </div>
        )}
      </section>
    </FadeIn>
  );
}
