import { cn } from "@/lib/utils";
import { BarChart3, Brain, TrendingUp, Trophy, Zap } from "lucide-react";
import type { InsightType, LiveInsight } from "../../types/live.types";

type LiveInsightsPanelProps = {
  insights: LiveInsight[];
  className?: string;
};

const insightIcons: Record<InsightType, React.ComponentType<{ className?: string }>> = {
  momentum: TrendingUp,
  prediction: Trophy,
  tactical: Zap,
  historical: Brain,
  stat: BarChart3,
};

const insightColors: Record<InsightType, string> = {
  momentum: "text-blue-400",
  prediction: "text-yellow-400",
  tactical: "text-purple-400",
  historical: "text-orange-400",
  stat: "text-green-400",
};

function ConfidencePill({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  return (
    <span
      className={cn(
        "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
        pct >= 80
          ? "bg-green-500/15 text-green-400"
          : pct >= 60
            ? "bg-yellow-500/15 text-yellow-400"
            : "bg-foreground/10 text-foreground/40"
      )}
      aria-label={`Confidence: ${pct}%`}
    >
      {pct}%
    </span>
  );
}

/**
 * Painel de insights de IA para partidas ao vivo.
 *
 * Exibe previsões, análises táticas, momentum e estatísticas
 * geradas em tempo real por IA durante a partida.
 */
export function LiveInsightsPanel({ insights, className }: LiveInsightsPanelProps) {
  if (insights.length === 0) {
    return (
      <div
        className={cn(
          "border-foreground/10 bg-foreground/5 flex flex-col items-center gap-3 rounded-xl border py-10 text-center",
          className
        )}
        aria-label="No insights available"
      >
        <Brain className="text-foreground/20 h-8 w-8" aria-hidden="true" />
        <p className="text-foreground/40 text-sm">No AI insights yet</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1", className)} aria-label="AI insights panel">
      <div className="mb-3 flex items-center gap-2">
        <Brain className="text-brand h-4 w-4" aria-hidden="true" />
        <h3 className="text-foreground/60 text-sm font-semibold tracking-wider uppercase">
          AI Insights
        </h3>
      </div>

      <ul className="flex flex-col gap-2">
        {insights.map((insight) => {
          const Icon = insightIcons[insight.type];
          const colorClass = insightColors[insight.type];

          return (
            <li
              key={insight.id}
              className="border-foreground/5 bg-foreground/5 hover:bg-foreground/8 flex items-start gap-3 rounded-lg border p-3 transition-colors"
              aria-label={`${insight.type} insight`}
            >
              <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", colorClass)} aria-hidden="true" />
              <p className="text-foreground/75 flex-1 text-sm leading-relaxed">{insight.text}</p>
              <ConfidencePill confidence={insight.confidence} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
