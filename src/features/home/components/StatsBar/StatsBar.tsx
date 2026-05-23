import { Container } from "@/components/layout/Container";
import { StaggerList } from "@/components/motion/StaggerList";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { TournamentStat } from "../../types/home.types";

type StatsBarProps = {
  stats: TournamentStat[];
};

function StatItem({ stat }: { stat: TournamentStat }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-brand text-3xl leading-none font-extrabold tabular-nums lg:text-4xl">
        {stat.value}
        {stat.suffix}
      </span>
      <span className="text-muted-foreground text-sm font-medium">{stat.label}</span>
    </div>
  );
}

export function StatsBar({ stats }: StatsBarProps) {
  if (stats.length === 0) return null;

  return (
    <section aria-label="Tournament statistics" className="border-border/30 border-y py-8">
      <Container size="xl">
        <GlassPanel intensity="low" className="px-8 py-6">
          <StaggerList
            className="grid grid-cols-2 gap-6 sm:grid-cols-4"
            staggerDelay={0.08}
            initialDelay={0.1}
          >
            {stats.map((stat) => (
              <StatItem key={stat.id} stat={stat} />
            ))}
          </StaggerList>
        </GlassPanel>
      </Container>
    </section>
  );
}
