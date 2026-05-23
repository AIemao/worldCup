import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { LayoutGrid } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { GroupMatches } from "../../components/GroupMatches";
import { GroupTable } from "../../components/GroupTable";
import { GroupTabs } from "../../components/GroupTabs";
import { useGroupMatches } from "../../hooks/useGroupMatches";
import { useGroupStandings } from "../../hooks/useGroupStandings";
import { GROUP_LETTERS, type GroupLetter } from "../../types/groups.types";

function isGroupLetter(value: string | null): value is GroupLetter {
  return GROUP_LETTERS.includes(value as GroupLetter);
}

/**
 * Página principal de Grupos — /groups
 *
 * Tabs A–H com querystring sync (?group=A).
 * Exibe a tabela de classificação e partidas do grupo selecionado.
 */
export function GroupsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawGroup = searchParams.get("group")?.toUpperCase() ?? null;
  const activeGroup: GroupLetter = isGroupLetter(rawGroup) ? rawGroup : "A";

  // Sync default group to URL on first render
  useEffect(() => {
    if (!isGroupLetter(searchParams.get("group")?.toUpperCase() ?? null)) {
      setSearchParams({ group: "A" }, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGroupChange = useCallback(
    (letter: GroupLetter) => {
      setSearchParams({ group: letter });
    },
    [setSearchParams]
  );

  const { data: standings, isLoading: standingsLoading } = useGroupStandings(activeGroup);
  const { data: matches, isLoading: matchesLoading } = useGroupMatches(activeGroup);

  return (
    <PageWrapper title="World Cup Groups">
      <main>
        <Container>
          <FadeIn>
            {/* Page heading */}
            <Section>
              <div className="flex items-center gap-3">
                <div className="bg-brand/10 flex h-10 w-10 items-center justify-center rounded-xl">
                  <LayoutGrid className="text-brand h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                    Group Stage
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    World Cup 2026 — Group Phase Standings & Fixtures
                  </p>
                </div>
              </div>
            </Section>

            {/* Tabs */}
            <Section>
              <GroupTabs activeGroup={activeGroup} onGroupChange={handleGroupChange} />
            </Section>

            {/* Content panel */}
            <div
              id={`group-panel-${activeGroup}`}
              role="tabpanel"
              aria-labelledby={`group-tab-${activeGroup}`}
            >
              <Section>
                <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
                  {/* Standings table */}
                  <div className="min-w-0">
                    <h2 className="text-foreground mb-4 text-lg font-semibold">
                      Group {activeGroup} Standings
                    </h2>
                    <GroupTable
                      standings={standings ?? []}
                      groupLetter={activeGroup}
                      isLoading={standingsLoading}
                    />
                  </div>

                  {/* Matches */}
                  <div className="lg:w-[420px]">
                    <h2 className="text-foreground mb-4 text-lg font-semibold">
                      Group {activeGroup} Fixtures
                    </h2>
                    <GroupMatches matches={matches ?? []} isLoading={matchesLoading} />
                  </div>
                </div>
              </Section>
            </div>
          </FadeIn>
        </Container>
      </main>
    </PageWrapper>
  );
}
