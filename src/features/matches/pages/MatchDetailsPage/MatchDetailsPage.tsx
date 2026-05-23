import { ErrorFallback } from "@/components/error/ErrorFallback";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { PageSkeleton } from "@/components/loading/PageSkeleton";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { MatchDetailsCard } from "../../components/MatchDetailsCard";
import { useMatchDetails } from "../../hooks/useMatchDetails";

/**
 * Página de detalhe de uma partida.
 *
 * Obtém o matchId via React Router params.
 * Estados: loading → skeleton | error → ErrorFallback | success → MatchDetailsCard.
 */
export function MatchDetailsPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const { data: match, isLoading, isError, error, refetch } = useMatchDetails(matchId);

  if (isLoading) {
    return (
      <PageWrapper title="Match Details — World Cup 2026">
        <PageSkeleton />
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper title="Match Details — World Cup 2026">
        <ErrorFallback error={error ?? null} reset={refetch} />
      </PageWrapper>
    );
  }

  if (!match) {
    return (
      <PageWrapper title="Match Not Found — World Cup 2026">
        <ErrorFallback
          error={new Error("Match not found. It may have been moved or deleted.")}
          reset={() => window.history.back()}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={`${match.homeTeam.shortName} vs ${match.awayTeam.shortName} — World Cup 2026`}
    >
      <Section spacing="md">
        <Container size="lg">
          {/* Back navigation */}
          <Link
            to="/matches"
            className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
            aria-label="Back to all matches"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All Matches
          </Link>

          <MatchDetailsCard match={match} />
        </Container>
      </Section>
    </PageWrapper>
  );
}
