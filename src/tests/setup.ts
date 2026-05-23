// Estende os matchers do Vitest com as assertions do jest-dom
// Ex: expect(el).toBeInTheDocument(), toHaveClass(), toBeVisible()
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "../mocks/server";

// Mock de window.matchMedia para componentes que usam Framer Motion (useReducedMotion)
// e o ThemeStore (prefers-color-scheme). jsdom não implementa matchMedia por padrão.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Inicia o MSW interceptor antes de todos os testes
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Cleanup do Testing Library (necessário com globals: false — sem auto-cleanup)
// Reseta handlers MSW após cada teste
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Encerra o server após todos os testes
afterAll(() => server.close());
