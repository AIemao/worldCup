import { ErrorFallback } from "@/components/error/ErrorFallback";
import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { PageSkeleton } from "@/components/loading/PageSkeleton";
import {
  CTABlock,
  FeaturedMatchCard,
  HeroSection,
  SectionHeader,
  StatsBar,
  useHomeData,
} from "@/features/home";

export function HomePage() {
  const { data, isLoading, isError, error, refetch } = useHomeData();

  if (isLoading) {
    return (
      <PageWrapper title="Home — World Cup 2026">
        <PageSkeleton />
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper title="Home — World Cup 2026">
        <ErrorFallback error={error ?? null} reset={refetch} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Home — World Cup 2026">
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      {data?.stats && data.stats.length > 0 && <StatsBar stats={data.stats} />}

      {/* Featured Match */}
      {data?.featuredMatch && (
        <Section spacing="xl">
          <Container size="xl">
            <div className="flex flex-col gap-10">
              <SectionHeader
                label="Opening Match"
                title="Featured Fixture"
                description="The 2026 World Cup kicks off with a historic clash between North American rivals."
              />
              <FeaturedMatchCard match={data.featuredMatch} />
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <CTABlock />
    </PageWrapper>
  );
}
