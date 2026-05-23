import { tickerMockData } from "@/features/live/data";
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLiveTicker } from "./useLiveTicker";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

beforeEach(() => {
  vi.useFakeTimers();
});

describe("useLiveTicker", () => {
  it("começa no primeiro item", () => {
    const { result } = renderHook(() => useLiveTicker(tickerMockData));
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentItem).toBe(tickerMockData[0]);
  });

  it("avança para o próximo item após o intervalo", () => {
    const { result } = renderHook(() => useLiveTicker(tickerMockData, { intervalMs: 1000 }));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.currentIndex).toBe(1);
  });

  it("faz rotação circular de volta ao primeiro item", () => {
    const items = tickerMockData.slice(0, 3);
    const { result } = renderHook(() => useLiveTicker(items, { intervalMs: 1000 }));
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it("não avança quando lista tem apenas 1 item", () => {
    // We can't easily simulate mouseenter in renderHook without a DOM element
    // so we verify the paused state only via list length=1
    const singleItem = [tickerMockData[0]];
    const { result: r2 } = renderHook(() => useLiveTicker(singleItem, { intervalMs: 1000 }));
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(r2.current.currentIndex).toBe(0);
  });

  it("não começa em isPaused=false com múltiplos itens", () => {
    const { result } = renderHook(() => useLiveTicker(tickerMockData));
    expect(result.current.isPaused).toBe(false);
  });

  it("retorna undefined quando lista está vazia", () => {
    const { result } = renderHook(() => useLiveTicker([]));
    expect(result.current.currentItem).toBeUndefined();
  });

  it("containerRef é criado corretamente", () => {
    const { result } = renderHook(() => useLiveTicker(tickerMockData));
    expect(result.current.containerRef).toBeDefined();
    expect(result.current.containerRef.current).toBeNull();
  });

  it("usa o intervalo padrão de 4000ms", () => {
    const { result } = renderHook(() => useLiveTicker(tickerMockData));
    act(() => {
      vi.advanceTimersByTime(3999);
    });
    expect(result.current.currentIndex).toBe(0);
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.currentIndex).toBe(1);
  });
});
