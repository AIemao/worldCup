import { ErrorFallback } from "@/components/error/ErrorFallback";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { PageSkeleton } from "@/components/loading/PageSkeleton";
import { FadeIn } from "@/components/motion/FadeIn";
import { ROUTES } from "@/config/constants";
import { Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { LiveBadge } from "../../components/LiveBadge";
import { LiveTicker } from "../../components/LiveTicker";
import { tickerMockData } from "../../data";
import { useLiveMatches } from "../../hooks/useLiveMatches";
import type { LiveMatch } from "../../types/live.types";

function LiveMatchCard({ match }: { match: LiveMatch }) {
  return (
    <Link
      to={`${ROUTES.LIVE}/${match.id}`}
      className="group flex flex-col gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-5 transition-all hover:border-red-500/40 hover:bg-red-500/10 focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:outline-none"
      aria-label={`Live match: ${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`}
    >
      <div className="flex items-center justify-between">
        <LiveBadge size="sm" minute={match.currentMinute} />
        <span className="text-muted-foreground text-xs">{match.round}</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col items-start gap-1">
          <span className="text-2xl leading-none">{match.homeTeam.flagEmoji}</span>
          <span className="text-sm font-bold">{match.homeTeam.shortName}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span
            className="text-foreground font-mono text-3xl font-black tabular-nums"
            aria-label={`Score: ${match.score.home} to ${match.score.away}`}
          >
            {match.score.home}
            <span className="text-foreground/30 mx-1">–</span>
            {match.score.away}
          </span>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-2xl leading-none">{match.awayTeam.flagEmoji}</span>
          <span className="text-sm font-bold">{match.awayTeam.shortName}</span>
        </div>
      </div>

      <div className="text-muted-foreground text-xs">
        {match.venue}, {match.city}
      </div>
    </Link>
  );
}

/**
 * Página central de partidas ao vivo — Live Center.
 *
 * Composição:
 * 1. LiveTicker — barra de eventos em tempo real
 * 2. Hero header com contagem de partidas ao vivo
 * 3. Grid de LiveMatchCard — partidas em andamento
 * 4. Empty state quando não há partidas ao vivo
 */
export function LiveCenterPage() {
  const { data: matches, isLoading, isError, error, refetch } = useLiveMatches();

  if (isLoading) {
    return (
      <PageWrapper title="Live — World Cup 2026">
        <PageSkeleton />
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper title="Live — World Cup 2026">
        <ErrorFallback error={error ?? null} reset={refetch} />
      </PageWrapper>
    );
  }

  const count = matches?.length ?? 0;

  return (
    <PageWrapper title="Live — World Cup 2026">
      {/* Ticker */}
      <Section spacing="sm" className="border-border/30 border-b">
        <Container size="xl">
          <LiveTicker items={tickerMockData} />
        </Container>
      </Section>

      {/* Hero header */}
      <Section spacing="md" className="border-border/30 border-b">
        <Container size="xl">
          <FadeIn>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Radio className="h-7 w-7 text-red-400" aria-hidden="true" />
                <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Live Now
                </h2>
                {count > 0 && (
                  <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-sm font-bold text-red-400">
                    {count}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground max-w-lg text-sm">
                Real-time scores, stats and AI insights for every match in progress.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Live matches grid */}
      <Section spacing="md" className="flex-1">
        <Container size="xl">
          {count === 0 ? (
            <FadeIn>
              <div
                className="flex flex-col items-center gap-4 py-20 text-center"
                aria-label="No live matches"
              >
                <Radio className="text-foreground/20 h-12 w-12" aria-hidden="true" />
                <p className="text-foreground/50 text-lg font-semibold">
                  No live matches right now
                </p>
                <p className="text-foreground/30 text-sm">
                  Check back when a match is in progress.
                </p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <div
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                aria-label="Live matches grid"
              >
                {matches?.map((match) => (
                  <LiveMatchCard key={match.id} match={match} />
                ))}
              </div>
            </FadeIn>
          )}
        </Container>
      </Section>
    </PageWrapper>
  );
}
