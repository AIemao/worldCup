import { Container } from "@/components/layout/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { ROUTES } from "@/config/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { TeamHero } from "../../components/TeamHero/TeamHero";
import { TeamResults } from "../../components/TeamResults/TeamResults";
import { TeamRoster } from "../../components/TeamRoster/TeamRoster";
import { TeamSchedule } from "../../components/TeamSchedule/TeamSchedule";
import { TeamStats } from "../../components/TeamStats/TeamStats";
import { useTeam } from "../../hooks/useTeam";
import { useTeamPlayers } from "../../hooks/useTeamPlayers";
import { useTeamResults } from "../../hooks/useTeamResults";
import { useTeamSchedule } from "../../hooks/useTeamSchedule";

type Tab = "squad" | "schedule" | "results";

const TABS: { id: Tab; label: string }[] = [
  { id: "squad", label: "Squad" },
  { id: "schedule", label: "Schedule" },
  { id: "results", label: "Results" },
];

/**
 * Página de detalhes de uma seleção — /teams/:teamId
 *
 * Exibe TeamHero, TeamStats e tabs de Elenco / Calendário / Resultados.
 */
export function TeamDetailsPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") ?? "squad") as Tab;

  const { data: team, isLoading: teamLoading, isError } = useTeam(teamId ?? "");
  const { data: players, isLoading: playersLoading } = useTeamPlayers(
    activeTab === "squad" ? (teamId ?? "") : ""
  );
  const { data: schedule, isLoading: scheduleLoading } = useTeamSchedule(
    activeTab === "schedule" ? (teamId ?? "") : ""
  );
  const { data: results, isLoading: resultsLoading } = useTeamResults(
    activeTab === "results" ? (teamId ?? "") : ""
  );

  function handleTabChange(tab: Tab) {
    setSearchParams({ tab });
  }

  if (isError) {
    return (
      <PageWrapper title="Team not found">
        <Container>
          <Section>
            <Link
              to={ROUTES.TEAMS}
              className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm transition-colors"
              aria-label="Back to Teams"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Teams
            </Link>
            <p className="text-muted-foreground text-sm">Team not found</p>
          </Section>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={team?.name ?? "Team Details"}>
      <Container>
        <FadeIn>
          {/* Back link */}
          <Section>
            <Link
              to={ROUTES.TEAMS}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
              aria-label="Back to Teams"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Teams
            </Link>
          </Section>

          {/* Hero */}
          <Section>
            {teamLoading ? (
              <div className="border-border/40 bg-card/40 h-48 animate-pulse rounded-2xl border" />
            ) : team ? (
              <TeamHero team={team} />
            ) : null}
          </Section>

          {/* Stats */}
          {team?.stats && (
            <Section>
              <h2 className="text-foreground mb-4 text-xl font-semibold">Statistics</h2>
              <TeamStats stats={team.stats} />
            </Section>
          )}

          {/* Tabs */}
          <Section>
            <div
              role="tablist"
              aria-label="Team information tabs"
              className="border-border/40 flex gap-1 border-b pb-0"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "text-foreground border-primary border-b-2"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab panels */}
            <div className="mt-4">
              <div
                id="tabpanel-squad"
                role="tabpanel"
                aria-labelledby="tab-squad"
                hidden={activeTab !== "squad"}
              >
                {activeTab === "squad" && (
                  <TeamRoster players={players} isLoading={playersLoading} />
                )}
              </div>

              <div
                id="tabpanel-schedule"
                role="tabpanel"
                aria-labelledby="tab-schedule"
                hidden={activeTab !== "schedule"}
              >
                {activeTab === "schedule" && (
                  <TeamSchedule matches={schedule} isLoading={scheduleLoading} />
                )}
              </div>

              <div
                id="tabpanel-results"
                role="tabpanel"
                aria-labelledby="tab-results"
                hidden={activeTab !== "results"}
              >
                {activeTab === "results" && (
                  <TeamResults matches={results} isLoading={resultsLoading} />
                )}
              </div>
            </div>
          </Section>
        </FadeIn>
      </Container>
    </PageWrapper>
  );
}
