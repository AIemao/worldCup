import { ErrorFallback } from "@/components/error/ErrorFallback";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { PageSkeleton } from "@/components/loading/PageSkeleton";
import { FadeIn } from "@/components/motion/FadeIn";
import { ROUTES } from "@/config/constants";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { LiveEventFeed } from "../../components/LiveEventFeed";
import { LiveInsightsPanel } from "../../components/LiveInsightsPanel";
import { LiveMatchHero } from "../../components/LiveMatchHero";
import { LiveStatCard } from "../../components/LiveStatCard";
import { useLiveInsights } from "../../hooks/useLiveInsights";
import { useLiveMatch } from "../../hooks/useLiveMatch";
import { useMatchMomentum } from "../../hooks/useMatchMomentum";

/**
 * Página de detalhe de uma partida ao vivo.
 *
 * Composição:
 * 1. LiveMatchHero — placar em tempo real, badge LIVE, momentum
 * 2. Stats grid — estatísticas principais da partida
 * 3. LiveEventFeed — feed de eventos em ordem cronológica
 * 4. LiveInsightsPanel — análises de IA em tempo real
 */
export function LiveMatchPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const { data: match, isLoading, isError, error, refetch } = useLiveMatch(matchId ?? "");
  const { data: insightsData } = useLiveInsights(matchId ?? "");
  const momentum = useMatchMomentum(match ?? null);

  if (isLoading) {
    return (
      <PageWrapper title="Live Match — World Cup 2026">
        <PageSkeleton />
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper title="Live Match — World Cup 2026">
        <ErrorFallback error={error ?? null} reset={refetch} />
      </PageWrapper>
    );
  }

  if (!match) {
    return (
      <PageWrapper title="Match Not Found — World Cup 2026">
        <ErrorFallback
          error={new Error("Live match not found.")}
          reset={() => window.history.back()}
        />
      </PageWrapper>
    );
  }

  const stats = match.stats;

  return (
    <PageWrapper
      title={`LIVE: ${match.homeTeam.shortName} ${match.score.home}–${match.score.away} ${match.awayTeam.shortName} — World Cup 2026`}
    >
      <Section spacing="md">
        <Container size="xl">
          {/* Back navigation */}
          <Link
            to={ROUTES.LIVE}
            className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
            aria-label="Back to live center"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Live Center
          </Link>

          {/* Hero */}
          <LiveMatchHero match={match} momentum={momentum} />
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Stats + Events */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              {/* Stats */}
              {stats && (
                <FadeIn>
                  <div className="flex flex-col gap-3" aria-label="Match statistics">
                    <h3 className="text-foreground/50 text-sm font-semibold tracking-wider uppercase">
                      Statistics
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <LiveStatCard
                        label="Possession"
                        homeValue={`${stats.possession.home}%`}
                        awayValue={`${stats.possession.away}%`}
                        homePercent={stats.possession.home}
                        awayPercent={stats.possession.away}
                      />
                      <LiveStatCard
                        label="Shots"
                        homeValue={stats.shots.home}
                        awayValue={stats.shots.away}
                      />
                      <LiveStatCard
                        label="On Target"
                        homeValue={stats.shotsOnTarget.home}
                        awayValue={stats.shotsOnTarget.away}
                      />
                      <LiveStatCard
                        label="Corners"
                        homeValue={stats.corners.home}
                        awayValue={stats.corners.away}
                      />
                      <LiveStatCard
                        label="Fouls"
                        homeValue={stats.fouls.home}
                        awayValue={stats.fouls.away}
                      />
                      <LiveStatCard
                        label="Yellow Cards"
                        homeValue={stats.yellowCards.home}
                        awayValue={stats.yellowCards.away}
                      />
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Event Feed */}
              <FadeIn>
                <div className="flex flex-col gap-3">
                  <h3 className="text-foreground/50 text-sm font-semibold tracking-wider uppercase">
                    Events
                  </h3>
                  <LiveEventFeed events={match.events ?? []} homeTeamId={match.homeTeam.id} />
                </div>
              </FadeIn>
            </div>

            {/* Right: AI Insights */}
            <div className="lg:col-span-1">
              <FadeIn>
                <LiveInsightsPanel insights={insightsData?.insights ?? []} />
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
