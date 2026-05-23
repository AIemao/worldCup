# ADR 006 — Testing Strategy

**Status:** Aceito  
**Data:** 23/05/2026

---

## Contexto

O projeto tem como meta **reduzir a dependência de QA manual** através de testes automatizados confiáveis. Isso exige:

- Testes rápidos que rodem em CI a cada PR
- Cobertura de fluxos de usuário reais (não apenas lógica isolada)
- API mocking determinístico sem servidor real
- Suporte a testes de componentes React com renderização real do DOM
- Compatibilidade com TypeScript strict e ESM

## Decisão

**Stack de testes em três camadas:**

| Camada             | Ferramenta                   | O que testa                                 |
| ------------------ | ---------------------------- | ------------------------------------------- |
| Unit + Integration | **Vitest + Testing Library** | Componentes, hooks, services, utils         |
| API mocking        | **MSW v2**                   | Intercepta fetch real no jsdom              |
| E2E                | **Playwright**               | Fluxos críticos, responsive, acessibilidade |

---

## Regras invioláveis

### 1. Sem globals do Vitest

```ts
// ✅ Sempre importar explicitamente
import { describe, it, expect, afterEach, vi } from "vitest";

// ❌ Nunca depender de globals (globals: false no vite.config.ts)
describe("...", () => { ... }) // ReferenceError se globals: false
```

### 2. Cleanup manual obrigatório

```ts
// ✅ Cleanup explícito — garante isolamento entre testes
afterEach(() => {
  cleanup(); // limpa DOM do Testing Library
  server.resetHandlers(); // restaura handlers MSW ao estado padrão
});
```

### 3. QueryClient de teste isolado

```ts
// ✅ Sem cache compartilhado entre testes
function createWrapper() {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
}
```

### 4. Fake timers com act()

```ts
// ✅ Padrão para hooks com setInterval / setTimeout
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

act(() => {
  vi.advanceTimersByTime(1000);
});
```

### 5. Handlers MSW centralizados

```ts
// src/mocks/handlers.ts — fonte única de verdade
// Overrides por teste: server.use(http.get("/endpoint", () => ...))
// Nunca mockar fetch diretamente (vi.spyOn(globalThis, 'fetch'))
```

---

## Pirâmide de testes aplicada

```
          ┌───────────┐
          │    E2E    │  ← Playwright (navegação, responsive, a11y)
          │  Playwright│
         ┌┴───────────┴┐
         │ Integration │  ← Componentes com queries reais + MSW
         │  (Testing   │  ← Hooks com QueryClient real
         │   Library)  │
        ┌┴─────────────┴┐
        │     Unit      │  ← utils, hooks puros, services, Zod schemas
        │   (Vitest)    │
        └───────────────┘
```

**Preferência por integration tests sobre shallow unit tests.** Testar o componente como o usuário o usa, não sua implementação interna.

---

## O que DEVE ser testado

### Componentes

- Renderização correta para cada prop/estado relevante
- Acessibilidade: `aria-label`, `role`, contraste mínimo
- Estados: loading, error, empty, success
- Interatividade: click, hover, form submit

### Hooks

- Estado inicial
- Transições de estado (loading → success → error)
- Efeitos colaterais (timers, eventos DOM)
- Comportamento com boundary conditions (null, undefined, vazio)

### Services

- Parse correto com Zod
- Propagação de erros HTTP (404, 500)
- Rejeição de schemas inválidos (ZodError)

### Stores Zustand

- Estado inicial
- Cada action
- Persistência quando aplicável

---

## O que NÃO testar

- Implementação interna de componentes (classes CSS, estrutura DOM específica)
- Detalhes de animação (Framer Motion)
- Estilo visual (cobertura por Storybook/visual regression)
- Código gerado por bibliotecas (shadcn/ui internals)

---

## MSW — Mock Service Worker

```ts
// Setup em src/mocks/server.ts
// Activado em src/tests/setup.ts (beforeAll/afterAll/afterEach)

// Handler padrão: retorna mock data determinístico
http.get("/matches", () => HttpResponse.json(matchesMockData));

// Override por teste — não afeta outros testes
server.use(http.get("/matches", () => new HttpResponse(null, { status: 500 })));
```

**Por que MSW e não vi.mock?**

- Testa o `httpClient` real (parsing, error handling, headers)
- Funciona com qualquer lib de HTTP (fetch, axios)
- Mais próximo do comportamento real de produção

---

## Alternativas consideradas

| Alternativa                           | Motivo da rejeição                                                         |
| ------------------------------------- | -------------------------------------------------------------------------- |
| Jest                                  | Configuração complexa com ESM/TypeScript; Vitest mais rápido e nativo Vite |
| Enzyme / shallow render               | Testa implementação, não comportamento; descontinuado                      |
| `vi.mock('axios')` para API           | Não testa o httpClient real; frágil a refatorações                         |
| globals: true no Vitest               | Viola `verbatimModuleSyntax`; imports explícitos são mais legíveis         |
| RTL sem `@testing-library/user-event` | `fireEvent` não simula comportamento real do browser                       |

## Consequências

- ✅ Testes rápidos (Vitest com jsdom — sem browser real)
- ✅ Cobertura real de fluxos de usuário
- ✅ CI confiável — MSW elimina dependência de API real
- ✅ Refactoring seguro — testes testam comportamento, não implementação
- ⚠️ Requer discipline nos imports explícitos do Vitest
- ⚠️ `cleanup()` manual obrigatório (pode ser esquecido)
