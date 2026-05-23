import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";

// Placeholder — conteúdo real será implementado nas etapas seguintes
export function HomePage() {
  return (
    <PageWrapper title="Home — World Cup 2026">
      <Section spacing="lg">
        <Container size="xl">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              Coming Soon
            </p>
            <h2 className="text-foreground text-3xl font-bold tracking-tight">World Cup 2026</h2>
            <p className="text-muted-foreground">48 teams. 3 host countries. 104 matches.</p>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
