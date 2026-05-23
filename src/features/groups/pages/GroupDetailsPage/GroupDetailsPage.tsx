import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { ROUTES } from "@/config/constants";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { GroupMatches } from "../../components/GroupMatches";
import { GroupTable } from "../../components/GroupTable";
import { useGroupMatches } from "../../hooks/useGroupMatches";
import { useGroupStandings } from "../../hooks/useGroupStandings";
import { GroupLetterSchema } from "../../types/groups.types";

/**
 * Página de detalhes de um grupo — /groups/:groupId
 *
 * Exibe classificação completa + calendário de partidas do grupo.
 */
export function GroupDetailsPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const letter = groupId?.toUpperCase() ?? "A";
  const parsedLetter = GroupLetterSchema.safeParse(letter);
  const groupLetter = parsedLetter.success ? parsedLetter.data : "A";

  const { data: standings, isLoading: standingsLoading } = useGroupStandings(groupLetter);
  const { data: matches, isLoading: matchesLoading } = useGroupMatches(groupLetter);

  return (
    <PageWrapper title={`Group ${groupLetter}`}>
      <main>
        <Container>
          <FadeIn>
            {/* Back link */}
            <Section>
              <Link
                to={`${ROUTES.GROUPS}?group=${groupLetter}`}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
                aria-label="Back to Group Stage overview"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Group Stage
              </Link>
            </Section>

            {/* Page heading */}
            <Section>
              <div className="flex items-center gap-3">
                <div className="bg-brand/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <LayoutGrid className="text-brand h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
                    Group {groupLetter}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Standings &amp; Fixtures — World Cup 2026
                  </p>
                </div>
              </div>
            </Section>

            {/* Standings */}
            <Section>
              <h2 className="text-foreground mb-4 text-xl font-semibold">Standings</h2>
              <GroupTable
                standings={standings ?? []}
                groupLetter={groupLetter}
                isLoading={standingsLoading}
              />
            </Section>

            {/* Matches */}
            <Section>
              <h2 className="text-foreground mb-4 text-xl font-semibold">All Fixtures</h2>
              <GroupMatches matches={matches ?? []} isLoading={matchesLoading} />
            </Section>
          </FadeIn>
        </Container>
      </main>
    </PageWrapper>
  );
}
