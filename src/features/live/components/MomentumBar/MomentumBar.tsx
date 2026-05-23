import { cn } from "@/lib/utils";
import type { Momentum } from "../../types/live.types";

type MomentumBarProps = {
  momentum: Momentum;
  homeColor?: string;
  awayColor?: string;
  homeLabel?: string;
  awayLabel?: string;
  className?: string;
};

/**
 * Barra visual de momentum entre as duas equipes.
 *
 * Mostra a proporção de domínio de jogo em uma barra dividida,
 * com rótulos e percentuais para cada time.
 */
export function MomentumBar({
  momentum,
  homeColor = "#009C3B",
  awayColor = "#74ACDF",
  homeLabel = "Home",
  awayLabel = "Away",
  className,
}: MomentumBarProps) {
  return (
    <div
      className={cn("flex flex-col gap-2", className)}
      aria-label={`Momentum: ${homeLabel} ${momentum.home}%, ${awayLabel} ${momentum.away}%`}
    >
      <div className="text-foreground/60 flex items-center justify-between text-xs font-medium">
        <span>{homeLabel}</span>
        <span className="text-foreground/40 text-xs font-semibold tracking-wider uppercase">
          Momentum
        </span>
        <span>{awayLabel}</span>
      </div>

      <div className="bg-foreground/10 flex h-2 w-full overflow-hidden rounded-full">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{ width: `${momentum.home}%`, backgroundColor: homeColor }}
          aria-hidden="true"
        />
        <div
          className="h-full flex-1 transition-all duration-700 ease-out"
          style={{ backgroundColor: awayColor }}
          aria-hidden="true"
        />
      </div>

      <div className="flex items-center justify-between text-sm font-semibold">
        <span
          className={cn(
            momentum.trend === "rising_home" ? "text-foreground" : "text-foreground/50"
          )}
        >
          {momentum.home}%
        </span>
        <span
          className={cn(
            momentum.trend === "rising_away" ? "text-foreground" : "text-foreground/50"
          )}
        >
          {momentum.away}%
        </span>
      </div>
    </div>
  );
}
