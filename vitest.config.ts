import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // jsdom simula o DOM do browser no Node.js para testes de componente
      environment: "jsdom",

      // imports explícitos de vitest (describe, it, expect) — compatível com TS6 strict
      globals: false,

      // arquivo executado antes de cada suite de testes
      setupFiles: ["./src/tests/setup.ts"],

      // desativa processamento de CSS no ambiente de teste (performance)
      css: false,

      // exclui testes E2E do Playwright — eles rodam via `npm run test:e2e`
      exclude: ["**/node_modules/**", "**/dist/**", "tests/e2e/**"],

      coverage: {
        provider: "v8",
        reporter: ["text", "lcov", "html"],
        exclude: [
          "node_modules/",
          "src/tests/",
          "src/mocks/",
          "**/*.stories.*",
          "**/*.config.*",
          "src/main.tsx",
        ],
      },
    },
  })
);
