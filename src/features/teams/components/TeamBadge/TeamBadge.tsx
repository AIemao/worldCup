import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Team } from "../../types/teams.types";
import { teamBadgeVariants, type TeamBadgeVariants } from "./team-badge.variants";

type TeamBadgeProps = {
  team: Pick<Team, "badge" | "name" | "flagEmoji">;
  className?: string;
} & TeamBadgeVariants;

export function TeamBadge({ team, size, className }: TeamBadgeProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <span
        className={cn(
          teamBadgeVariants({ size }),
          "flex items-center justify-center text-2xl",
          className
        )}
        aria-label={`${team.name} flag`}
        role="img"
      >
        {team.flagEmoji}
      </span>
    );
  }

  return (
    <img
      src={team.badge}
      alt={`${team.name} badge`}
      className={cn(teamBadgeVariants({ size }), className)}
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}
