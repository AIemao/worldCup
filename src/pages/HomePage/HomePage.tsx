import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import {
  CTABlock,
  FeaturedMatchCard,
  HeroSection,
  SectionHeader,
  StatsBar,
  useHomeData,
} from "@/features/home";

export function HomePage() {
  const { data } = useHomeData();

  return (
    <PageWrapper title="Home — World Cup 2026">
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      {data.stats && <StatsBar stats={data.stats} />}

      {/* Featured Match */}
      <Section spacing="xl">
        <Container size="xl">
          <div className="flex flex-col gap-10">
            <SectionHeader
              label="Opening Match"
              title="Featured Fixture"
              description="The 2026 World Cup kicks off with a historic clash between North American rivals."
            />
            {data.featuredMatch && <FeaturedMatchCard match={data.featuredMatch} />}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTABlock />
    </PageWrapper>
  );
}
