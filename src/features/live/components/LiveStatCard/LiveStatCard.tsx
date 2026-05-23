import { cn } from "@/lib/utils";

type LiveStatCardProps = {
  label: string;
  homeValue: number | string;
  awayValue: number | string;
  homePercent?: number;
  awayPercent?: number;
  className?: string;
};

/**
 * Card de estatística individual para uma partida ao vivo.
 *
 * Mostra o valor de home e away com barra proporcional opcional.
 */
export function LiveStatCard({
  label,
  homeValue,
  awayValue,
  homePercent,
  awayPercent,
  className,
}: LiveStatCardProps) {
  const hasBar = homePercent !== undefined && awayPercent !== undefined;

  return (
    <div
      className={cn("bg-foreground/5 flex flex-col gap-2 rounded-lg p-3", className)}
      aria-label={`${label}: home ${homeValue}, away ${awayValue}`}
    >
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-foreground/90">{homeValue}</span>
        <span className="text-foreground/40 text-xs font-medium tracking-wider uppercase">
          {label}
        </span>
        <span className="text-foreground/90">{awayValue}</span>
      </div>

      {hasBar && (
        <div className="bg-foreground/10 flex h-1 w-full overflow-hidden rounded-full">
          <div
            className="bg-brand/70 h-full rounded-full transition-all duration-500"
            style={{ width: `${homePercent}%` }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
