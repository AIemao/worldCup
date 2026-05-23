import { ROUTES } from "@/config/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { Team } from "../../types/teams.types";
import { TeamBadge } from "../TeamBadge/TeamBadge";

type TeamCardProps = {
  team: Team;
  className?: string;
};

export function TeamCard({ team, className }: TeamCardProps) {
  return (
    <Link
      to={`${ROUTES.TEAMS}/${team.id}`}
      aria-label={`${team.name} — view team details`}
      className={cn(
        "border-border/40 bg-card/60 hover:border-border hover:bg-card group focus-visible:ring-ring flex flex-col items-center gap-3 rounded-xl border p-4 transition-all duration-200 hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      <TeamBadge team={team} size="lg" />
      <div className="min-w-0 text-center">
        <p className="text-foreground line-clamp-1 text-sm font-semibold">{team.name}</p>
        <p className="text-muted-foreground line-clamp-1 text-xs">{team.country}</p>
        {team.groupLetter && (
          <p className="text-muted-foreground mt-1 text-xs">
            Group <span className="text-foreground font-medium">{team.groupLetter}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
