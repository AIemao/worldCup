import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/loading/Skeleton";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";
import { Search, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { TeamCard } from "../../components/TeamCard/TeamCard";
import { useTeams } from "../../hooks/useTeams";
import type { Team } from "../../types/teams.types";

const GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;
type GroupLetter = (typeof GROUP_LETTERS)[number];

function TeamsGrid({ teams }: { teams: Team[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}

function TeamsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {Array.from({ length: 32 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  );
}

/**
 * Página de Seleções — /teams
 *
 * Grid de todas as 32 seleções com busca e filtro por grupo.
 */
export function TeamsPage() {
  const { data: teams, isLoading } = useTeams();
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState<GroupLetter | null>(null);

  const filteredTeams = useMemo(() => {
    let result = teams;

    if (groupFilter) {
      result = result.filter((t) => t.groupLetter === groupFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.country.toLowerCase().includes(q) ||
          t.shortName.toLowerCase().includes(q)
      );
    }

    return result;
  }, [teams, search, groupFilter]);

  function handleGroupToggle(letter: GroupLetter) {
    setGroupFilter((prev) => (prev === letter ? null : letter));
  }

  return (
    <PageWrapper title="World Cup Teams">
      <Container>
        <FadeIn>
          <Section>
            <div className="flex items-center gap-3">
              <Trophy className="text-primary h-8 w-8" aria-hidden="true" />
              <h1 className="text-foreground text-3xl font-black tracking-tight md:text-4xl">
                World Cup Teams
              </h1>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              All 32 nations competing in the FIFA World Cup 2026
            </p>
          </Section>

          {/* Filters */}
          <Section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search teams…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-border/60 bg-background text-foreground placeholder:text-muted-foreground focus:border-border focus:ring-ring w-full rounded-lg border py-2 pr-4 pl-9 text-sm focus:ring-1 focus:outline-none"
                  aria-label="Search teams"
                />
              </div>

              {/* Group filter */}
              <div
                className="flex flex-wrap items-center gap-1.5"
                role="group"
                aria-label="Filter by group"
              >
                <button
                  onClick={() => setGroupFilter(null)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                    groupFilter === null
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  aria-pressed={groupFilter === null}
                >
                  All
                </button>
                {GROUP_LETTERS.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleGroupToggle(letter)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                      groupFilter === letter
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    aria-pressed={groupFilter === letter}
                    aria-label={`Group ${letter}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          {/* Grid */}
          <Section>
            {isLoading ? (
              <TeamsGridSkeleton />
            ) : filteredTeams.length > 0 ? (
              <TeamsGrid teams={filteredTeams} />
            ) : (
              <div className="border-border/40 flex flex-col items-center justify-center rounded-xl border py-20">
                <p className="text-muted-foreground text-sm">No teams found</p>
              </div>
            )}
          </Section>
        </FadeIn>
      </Container>
    </PageWrapper>
  );
}
