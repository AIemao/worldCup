import { AnimatePresence, motion } from "framer-motion";
import { tickerMockData } from "../../data";
import { useLiveTicker } from "../../hooks/useLiveTicker";
import type { TickerItem } from "../../types/live.types";

type LiveTickerProps = {
  items?: TickerItem[];
};

function TickerIcon({ type }: { type: TickerItem["type"] }) {
  const map: Record<TickerItem["type"], string> = {
    goal: "⚽",
    score_update: "📊",
    yellow_card: "🟨",
    red_card: "🟥",
    substitution: "🔄",
    kick_off: "🏁",
    half_time: "⏸",
    full_time: "🏆",
    var_review: "📺",
    penalty: "⚽",
  };
  return <span aria-hidden="true">{map[type]}</span>;
}

/**
 * Ticker horizontal de eventos ao vivo.
 *
 * Rotaciona automaticamente entre os itens com animação suave.
 * Pausa no hover/focus para acessibilidade.
 * Respeita prefers-reduced-motion.
 */
export function LiveTicker({ items = tickerMockData }: LiveTickerProps) {
  const { currentItem, containerRef } = useLiveTicker(items, { intervalMs: 4_000 });

  if (!currentItem) {
    return null;
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="flex items-center gap-3 overflow-hidden rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2"
      aria-label="Live match ticker"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="shrink-0 text-xs font-bold tracking-widest text-red-400 uppercase">
        LIVE
      </span>
      <span className="h-3 w-px shrink-0 bg-red-500/30" aria-hidden="true" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="text-foreground/80 flex min-w-0 items-center gap-2 text-sm"
        >
          <TickerIcon type={currentItem.type} />
          <span className="truncate">{currentItem.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
