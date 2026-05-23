# Etapa 02 — Foundation Layer

**Status:** ✅ Concluída  
**Data:** 23/05/2026

---

## Objetivo

Configurar toda a camada de tooling e qualidade do projeto: formatação, linting, hooks de commit, testes (unitários, integração, E2E) e documentação de componentes.

---

## Ferramentas Instaladas

| Ferramenta                  | Versão | Papel                                             |
| --------------------------- | ------ | ------------------------------------------------- |
| Prettier                    | latest | Formatação de código                              |
| prettier-plugin-tailwindcss | latest | Ordenação automática de classes Tailwind          |
| eslint-config-prettier      | latest | Desativa regras ESLint que conflitam com Prettier |
| Husky                       | v9     | Git hooks automáticos                             |
| lint-staged                 | latest | Lint apenas nos arquivos staged                   |
| Vitest                      | v4     | Test runner (compatível com Vite)                 |
| @vitest/coverage-v8         | latest | Coverage via engine V8 nativa                     |
| jsdom                       | latest | Simulação de DOM para testes de componente        |
| @testing-library/react      | latest | Testes de componente orientados ao usuário        |
| @testing-library/user-event | latest | Simulação de eventos do usuário                   |
| @testing-library/jest-dom   | latest | Matchers DOM (toBeInTheDocument, etc.)            |
| @playwright/test            | latest | Testes E2E                                        |
| MSW                         | v2     | Mock de APIs (Node + Browser)                     |
| Storybook                   | v10    | Documentação visual de componentes                |
| @storybook/react-vite       | v10    | Framework Storybook para Vite 8                   |
| @storybook/addon-a11y       | v10    | Validação de acessibilidade                       |

---

## Arquivos Criados

| Arquivo                                | Papel                                                 |
| -------------------------------------- | ----------------------------------------------------- |
| `.prettierrc`                          | Config do Prettier (semi, singleQuote, plugins)       |
| `.prettierignore`                      | Arquivos ignorados pelo Prettier                      |
| `eslint.config.js`                     | Atualizado com `eslint-config-prettier`               |
| `vitest.config.ts`                     | Config do Vitest (mergeConfig + jsdom)                |
| `playwright.config.ts`                 | Config do Playwright (E2E, chromium, webServer)       |
| `.storybook/main.ts`                   | Config do Storybook (framework, addons, stories glob) |
| `.storybook/preview.tsx`               | Preview global (dark mode, backgrounds, decorators)   |
| `.husky/pre-commit`                    | Hook de pre-commit: roda lint-staged                  |
| `.lintstagedrc.json`                   | Regras do lint-staged por tipo de arquivo             |
| `src/tests/setup.ts`                   | Setup do Vitest (jest-dom + MSW server)               |
| `src/mocks/handlers.ts`                | Handlers MSW centralizados                            |
| `src/mocks/server.ts`                  | MSW server para Node.js (Vitest)                      |
| `src/mocks/browser.ts`                 | MSW worker para browser (Storybook/dev)               |
| `public/mockServiceWorker.js`          | Service worker do MSW (gerado via `msw init`)         |
| `src/lib/utils.test.ts`                | Exemplo mínimo de teste unitário                      |
| `src/stories/DesignTokens.stories.tsx` | Exemplo mínimo de Storybook story                     |
| `tests/e2e/smoke.spec.ts`              | Exemplo mínimo de teste E2E                           |

---

## Decisões Arquiteturais

### Vitest separado do vite.config

`vitest.config.ts` usa `mergeConfig` para herdar plugins e aliases do Vite sem duplicar config. O `css: false` desabilita CSS no teste (performance). Arquivo separado permite divergências futuras entre build e test.

### Vitest sem globals

`globals: false` = imports explícitos de `vitest`. Mais explícito, sem poluição do namespace TypeScript. Compatível com `erasableSyntaxOnly` do TS6.

### MSW 3 arquivos

- `handlers.ts` — regras (compartilhado entre Node e Browser)
- `server.ts` — `msw/node` para Vitest
- `browser.ts` — `msw/browser` para Storybook/dev

### Storybook 10 (Vite 8 support)

Storybook v10 (`@storybook/react-vite@10.3+`) adicionou suporte explícito ao Vite 8. `@storybook/addon-interactions` e `@storybook/test` ainda não têm v10 estável — serão adicionados quando disponíveis.

### Playwright excluído do Vitest

`exclude: ["tests/e2e/**"]` no `vitest.config.ts` impede que Vitest colete os testes E2E do Playwright (eles usam APIs incompatíveis).

---

## Problemas Encontrados

### Storybook versões fragmentadas

- `storybook@latest` = `10.4.1`
- `@storybook/addon-interactions@latest` = `8.6.14` (travado no v8)
- `@storybook/test@latest` = `8.6.15` (travado no v8)
- **Solução:** instalar apenas os pacotes v10 compatíveis, excluir v8-only addons por ora.

---

## Comandos

```bash
npm run typecheck       # TypeScript sem erros
npm run lint            # ESLint (zero warnings)
npm run format          # Prettier no projeto inteiro
npm run test:run        # Vitest (run mode, sem watch)
npm run test:coverage   # Vitest com cobertura
npm run test:e2e        # Playwright (requer npx playwright install)
npm run storybook       # Storybook dev em localhost:6006
```

### Primeiro uso do Playwright (instalar browsers)

```bash
npx playwright install chromium
```

---

## Validação

```bash
typecheck → sem erros
test:run  → 4/4 testes passando
build     → ✓ 174ms, sem erros
```

---

## Próxima etapa

→ Etapa 03: estrutura de pastas, roteamento (React Router) e layout base da aplicação
