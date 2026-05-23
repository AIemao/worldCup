import { useCallback, useEffect, useReducer, useRef } from "react";
import type { TickerItem } from "../types/live.types";

type TickerOptions = {
  /** Intervalo entre trocas de item, em ms. Padrão: 4000 */
  intervalMs?: number;
};

type TickerState = {
  currentIndex: number;
  isPaused: boolean;
};

type TickerAction = { type: "NEXT"; total: number } | { type: "PAUSE" } | { type: "RESUME" };

function tickerReducer(state: TickerState, action: TickerAction): TickerState {
  switch (action.type) {
    case "NEXT":
      if (state.isPaused) return state;
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % action.total,
      };
    case "PAUSE":
      return { ...state, isPaused: true };
    case "RESUME":
      return { ...state, isPaused: false };
  }
}

type UseLiveTickerResult = {
  currentItem: TickerItem | undefined;
  currentIndex: number;
  isPaused: boolean;
  /** Registra o elemento container para pausar no hover/focus */
  containerRef: React.RefObject<HTMLElement | null>;
};

/**
 * Controla a rotação automática de itens de ticker ao vivo.
 *
 * - Pausa automaticamente em hover e focus para acessibilidade
 * - Respeita `prefers-reduced-motion` — sem rotação automática
 * - Mantém estado via useReducer para lógica testável
 */
export function useLiveTicker(
  items: TickerItem[],
  options: TickerOptions = {}
): UseLiveTickerResult {
  const { intervalMs = 4_000 } = options;
  const containerRef = useRef<HTMLElement | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const [state, dispatch] = useReducer(tickerReducer, {
    currentIndex: 0,
    isPaused: prefersReducedMotion,
  });

  useEffect(() => {
    if (items.length <= 1 || prefersReducedMotion) return;

    const interval = setInterval(() => {
      dispatch({ type: "NEXT", total: items.length });
    }, intervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [items.length, intervalMs, prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => dispatch({ type: "PAUSE" }), []);
  const handleMouseLeave = useCallback(() => dispatch({ type: "RESUME" }), []);
  const handleFocus = useCallback(() => dispatch({ type: "PAUSE" }), []);
  const handleBlur = useCallback(() => dispatch({ type: "RESUME" }), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("focusin", handleFocus);
    el.addEventListener("focusout", handleBlur);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("focusin", handleFocus);
      el.removeEventListener("focusout", handleBlur);
    };
  }, [handleMouseEnter, handleMouseLeave, handleFocus, handleBlur]);

  return {
    currentItem: items[state.currentIndex],
    currentIndex: state.currentIndex,
    isPaused: state.isPaused,
    containerRef,
  };
}
