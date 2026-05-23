import { ErrorFallback } from "@/components/error/ErrorFallback";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { PageSkeleton } from "@/components/loading/PageSkeleton";
import { FadeIn } from "@/components/motion/FadeIn";
import { EmptyMatchesState } from "../../components/EmptyMatchesState";
import { MatchFilters } from "../../components/MatchFilters";
import { MatchesGrid } from "../../components/MatchesGrid";
import { useFilteredMatches } from "../../hooks/useFilteredMatches";

/**
 * Página de listagem de partidas.
 *
 * Composição:
 * 1. Hero header com título e contagem
 * 2. MatchFilters — controles de filtragem
 * 3. MatchesGrid — grid responsivo de partidas ou skeleton
 * 4. EmptyMatchesState — quando não há resultados
 */
export function MatchesPage() {
  const { matches, filters, updateFilters, resetFilters, isLoading, isError, error, refetch } =
    useFilteredMatches();

  if (isLoading) {
    return (
      <PageWrapper title="Matches — World Cup 2026">
        <PageSkeleton />
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper title="Matches — World Cup 2026">
        <ErrorFallback error={error ?? null} reset={refetch} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Matches — World Cup 2026">
      {/* Hero */}
      <Section spacing="md" className="border-border/30 border-b">
        <Container size="xl">
          <FadeIn>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Matches
                </h2>
                <span className="text-muted-foreground text-sm font-medium tabular-nums">
                  {matches.length} result{matches.length !== 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-muted-foreground max-w-lg text-sm">
                All 104 FIFA World Cup 2026 matches — live scores, upcoming fixtures and final
                results.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Filters */}
      <Section spacing="sm">
        <Container size="xl">
          <MatchFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />
        </Container>
      </Section>

      {/* Grid */}
      <Section spacing="sm" className="flex-1">
        <Container size="xl">
          {matches.length === 0 ? <EmptyMatchesState /> : <MatchesGrid matches={matches} />}
        </Container>
      </Section>
    </PageWrapper>
  );
}
