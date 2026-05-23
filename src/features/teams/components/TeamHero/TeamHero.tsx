import { cn } from "@/lib/utils";
import { ExternalLink, Globe } from "lucide-react";
import type { Team } from "../../types/teams.types";
import { TeamBadge } from "../TeamBadge/TeamBadge";

type TeamHeroProps = {
  team: Team;
  className?: string;
};

export function TeamHero({ team, className }: TeamHeroProps) {
  return (
    <section
      className={cn(
        "border-border/40 bg-card/40 relative overflow-hidden rounded-2xl border",
        className
      )}
      aria-label={`${team.name} national team`}
    >
      {team.banner && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img src={team.banner} alt="" className="h-full w-full object-cover opacity-10" />
          <div className="from-background/90 absolute inset-0 bg-linear-to-b to-transparent" />
        </div>
      )}

      <div className="relative px-6 py-8 md:px-8 md:py-10">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <TeamBadge team={team} size="xl" className="drop-shadow-lg" />

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {team.flagEmoji}
              </span>
              <h1 className="text-foreground truncate text-3xl font-black tracking-tight md:text-4xl">
                {team.name}
              </h1>
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span>{team.country}</span>
              {team.formedYear && <span>Est. {team.formedYear}</span>}
              {team.stadium && <span>{team.stadium}</span>}
            </div>

            {(team.website || team.twitter || team.instagram) && (
              <div className="mt-1 flex items-center gap-3">
                {team.website && (
                  <a
                    href={`https://${team.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${team.name} website`}
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
                {team.twitter && (
                  <a
                    href={`https://twitter.com/${team.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${team.name} Twitter`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {team.instagram && (
                  <a
                    href={`https://instagram.com/${team.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${team.name} Instagram`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
