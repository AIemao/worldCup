import { FadeIn } from "@/components/motion/FadeIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { FeaturedMatch, MatchStatus } from "../../types/home.types";

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<MatchStatus, string> = {
  upcoming: "Upcoming",
  live: "Live",
  finished: "Final",
};

function MatchStatusBadge({ status }: { status: MatchStatus }) {
  return (
    <Badge
      variant={status === "live" ? "success" : status === "upcoming" ? "brand" : "default"}
      className={cn(status === "live" && "animate-pulse")}
    >
      {status === "live" && <span aria-hidden="true">●</span>}
      {STATUS_LABELS[status]}
    </Badge>
  );
}

// ─── Team slot ────────────────────────────────────────────────────────────────

type TeamSlotProps = {
  name: string;
  shortName: string;
  flagEmoji: string;
  side: "home" | "away";
};

function TeamSlot({ name, shortName, flagEmoji, side }: TeamSlotProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", side === "away" && "items-center")}>
      <span className="text-5xl leading-none" role="img" aria-label={`${name} flag`}>
        {flagEmoji}
      </span>
      <span className="text-foreground text-sm font-bold tracking-wider uppercase">
        {shortName}
      </span>
    </div>
  );
}

// ─── Score display ────────────────────────────────────────────────────────────

function ScoreDisplay({ match }: { match: FeaturedMatch }) {
  if (match.status === "upcoming") {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
          vs
        </span>
        <span className="text-muted-foreground/50 text-xs">
          {formatMatchTime(match.scheduledAt)}
        </span>
      </div>
    );
  }

  const score = match.score ?? { home: 0, away: 0 };
  return (
    <div className="flex items-center gap-2" aria-label={`Score: ${score.home} - ${score.away}`}>
      <span className="text-foreground text-3xl font-extrabold tabular-nums">{score.home}</span>
      <span className="text-muted-foreground text-xl font-bold">-</span>
      <span className="text-foreground text-3xl font-extrabold tabular-nums">{score.away}</span>
    </div>
  );
}

// ─── Utils ────────────────────────────────────────────────────────────────────

function formatMatchTime(isoString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(isoString));
}

// ─── Component ────────────────────────────────────────────────────────────────

type FeaturedMatchCardProps = {
  match: FeaturedMatch;
};

export function FeaturedMatchCard({ match }: FeaturedMatchCardProps) {
  return (
    <FadeIn>
      <Card variant="glass" className="mx-auto w-full max-w-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              {match.round}
            </span>
            <MatchStatusBadge status={match.status} />
          </div>
        </CardHeader>

        <CardContent className="py-4">
          {/* Teams + score */}
          <div
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-4"
            aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
          >
            <TeamSlot
              name={match.homeTeam.name}
              shortName={match.homeTeam.shortName}
              flagEmoji={match.homeTeam.flagEmoji}
              side="home"
            />
            <ScoreDisplay match={match} />
            <TeamSlot
              name={match.awayTeam.name}
              shortName={match.awayTeam.shortName}
              flagEmoji={match.awayTeam.flagEmoji}
              side="away"
            />
          </div>

          {/* Venue info */}
          <div className="mt-5 space-y-0.5 text-center">
            <p className="text-muted-foreground text-sm">
              {match.venue} · {match.city}
            </p>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button variant="outline" size="sm" className="w-full">
            View Match Details
          </Button>
        </CardFooter>
      </Card>
    </FadeIn>
  );
}
