# Etapa 06 — Data Layer & Server State Foundation

## Status

✅ Concluída

## Objetivo

Migrar a aplicação de estado local (mock) para uma arquitetura de server-state production-grade usando **TanStack Query v5**, com camada de serviço tipada, validação Zod em runtime, client HTTP customizado e testes de integração com MSW.

---

## Por que TanStack Query?

| Necessidade                     | Solução do React Query                                         |
| ------------------------------- | -------------------------------------------------------------- |
| Cache automático de respostas   | `staleTime` + `gcTime` — evita re-fetches desnecessários       |
| Estado de loading/error/success | `isLoading`, `isError`, `data` — sem useState/useEffect manual |
| Retry automático                | `retry: 2` — absorve falhas transitórias do servidor           |
| Invalidação por feature         | Query key factory hierárquico                                  |
| Devtools integradas             | `ReactQueryDevtools` — inspeção visual de cache em dev         |
| Separação de concerns           | Hooks consomem, services buscam, cache gerencia estado         |

---

## Arquitetura implementada

```
UI (HomePage)
  ↓
useHomeData()                    ← hook: React Query state
  ↓
getHomeData()                    ← service: sem React, sem estado
  ↓
httpClient<unknown>("/home")     ← client HTTP tipado
  ↓
MSW handler (dev/test)           ← intercepta, retorna homeMockData
  ↓ (produção)
Backend API
```

### Separação de responsabilidades

| Camada       | Localização               | Responsabilidade                              |
| ------------ | ------------------------- | --------------------------------------------- |
| Hook         | `features/home/hooks/`    | Expõe estado React Query (data/loading/error) |
| Service      | `api/services/home/`      | Fetch + validação Zod; sem imports React      |
| HTTP Client  | `api/client/`             | fetch tipado, timeout, normalização de erros  |
| Query Keys   | `api/queries/`            | Fábrica centralizada — sem inline keys        |
| Query Client | `api/config/`             | Singleton com defaults globais da app         |
| Provider     | `providers/QueryProvider` | Injeta QueryClient + Devtools na árvore React |

---

## Estrutura de arquivos

```
src/
├── api/
│   ├── client/
│   │   ├── api-error.ts          ← classe ApiError estruturada
│   │   ├── http-client.ts        ← fetch wrapper tipado
│   │   ├── http-client.test.ts   ← testes do client + ApiError
│   │   └── index.ts
│   ├── config/
│   │   ├── api.config.ts         ← API_BASE_URL, API_TIMEOUT_MS
│   │   ├── query-client.ts       ← QueryClient singleton
│   │   └── index.ts
│   ├── queries/
│   │   ├── query-keys.ts         ← fábrica de query keys
│   │   ├── query-defaults.ts     ← testQueryOptions()
│   │   └── index.ts
│   └── services/
│       └── home/
│           ├── home.service.ts   ← getHomeData()
│           ├── home.service.test.ts
│           └── index.ts
├── providers/
│   └── QueryProvider/
│       ├── QueryProvider.tsx     ← provider isolado + devtools
│       ├── QueryProvider.test.tsx
│       ├── QueryProvider.stories.tsx
│       └── index.ts
└── hooks/
    ├── useApiError.ts            ← normaliza erro para UI
    └── index.ts
```

---

## HTTP Client (`api/client/http-client.ts`)

Fetch wrapper tipado — único ponto de saída de todas as chamadas HTTP.

**Funcionalidades:**

- `httpClient<T>(input, init?)` — genérico, retorna `Promise<T>`
- Timeout via `AbortController` — default `API_TIMEOUT_MS` (10s), sobrescrevível
- Combina signal externo + signal de timeout via `AbortSignal.any()`
- Headers padrão: `Content-Type: application/json`, `Accept: application/json`
- Suporte a `API_BASE_URL` — concatena automaticamente para paths relativos
- Resposta vazia (204) retorna `undefined as T`
- Normaliza **todos** os erros para `ApiError`

**Fluxo de erros:**

```
4xx/5xx            → ApiError(status, response)
JSON malformado    → ApiError(code: "INVALID_JSON")
Timeout            → ApiError(status: 408, code: "TIMEOUT")
Abort explícito    → ApiError(code: "ABORTED")
Falha de rede      → ApiError(status: 0, code: "NETWORK_ERROR")
```

**Nota sobre timeout em testes (jsdom/MSW):**
O `fetch` abortado em Node.js/jsdom pode lançar `TypeError` em vez de `DOMException`. Por isso, o check de timeout verifica `timeoutController.signal.aborted` **antes** do tipo do erro, garantindo `code: "TIMEOUT"` correto em todos os ambientes.

---

## ApiError (`api/client/api-error.ts`)

```ts
class ApiError extends Error {
  readonly status: number; // 0 = rede, 408 = timeout, 4xx, 5xx
  readonly code?: string; // "TIMEOUT" | "ABORTED" | "NETWORK_ERROR" | "INVALID_JSON"
  readonly cause?: unknown; // erro original (para debugging)
  readonly response?: Response;

  get isClientError(): boolean; // 400–499
  get isServerError(): boolean; // 500+
  get isNetworkError(): boolean; // status === 0
  get isTimeout(): boolean; // code === "TIMEOUT"
}
```

---

## Estratégia de cache (QueryClient)

```ts
queries: {
  staleTime: 1000 * 60 * 2,   // 2 min — reutiliza dados da mesma sessão
  gcTime: 1000 * 60 * 10,     // 10 min — mantém em memória para re-uso
  retry: 2,                    // 3 tentativas totais (transient failures)
  refetchOnWindowFocus: false, // torneio muda lentamente — evita ruído
  refetchOnReconnect: true,    // atualiza após reconectar à internet
}
```

**Por que staleTime 2 min?**
Dados do torneio (fixtures, grupos) mudam raramente durante uma sessão típica de navegação. 2 minutos equilibra frescor e volume de requests.

**Por que gcTime 10 min?**
Permite que o usuário navegue entre páginas e retorne com dados instantaneamente do cache, sem flickering, antes do background refetch.

---

## Query Key Factory (`api/queries/query-keys.ts`)

```ts
export const queryKeys = {
  home: {
    all: ["home"] as const,
    data: () => [...queryKeys.home.all, "data"] as const,
  },
} as const;
```

**Regras:**

- Nenhuma query key inline em hooks ou componentes
- Estrutura hierárquica: `all` para invalidar tudo da feature, `data()` para o endpoint específico
- `as const` garante inferência literal de tipo pelo TypeScript

---

## Service Layer (`api/services/home/home.service.ts`)

```ts
// Sem imports React — funções TypeScript puras
export async function getHomeData(): Promise<HomeData> {
  const raw = await httpClient<unknown>("/home");
  return HomeDataSchema.parse(raw); // Zod runtime validation
}
```

**Por que validação Zod em runtime no service?**

A API externa pode retornar dados inesperados (campo renomeado, tipo incorreto, servidor diferente). Validar no service garante que:

1. O hook nunca recebe dados mal-formados
2. Os erros de contrato são detectados próximos da fonte
3. Os tipos TypeScript são garantidos por dados reais, não apenas inferência estática

Se `parse()` falhar, lança `ZodError` → React Query captura → `isError: true` na UI.

---

## Migração do `useHomeData`

**Antes (Etapa 05):**

```ts
return { data: homeMockData, isLoading: false, isError: false };
```

**Depois (Etapa 06):**

```ts
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: queryKeys.home.data(),
  queryFn: getHomeData,
});
return { data, isLoading, isError, error, refetch };
```

A interface pública permanece compatível: `data`, `isLoading`, `isError` — sem alterar nenhum componente de UI. `error` e `refetch` foram adicionados para suportar o estado de erro na `HomePage`.

---

## QueryProvider (`providers/QueryProvider/QueryProvider.tsx`)

```tsx
export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
```

- Usa o `queryClient` singleton de `api/config`
- `ReactQueryDevtools` carregados apenas em `DEV` — zero custo em produção
- Isolado em `src/providers/` para testabilidade e separation of concerns
- `app/providers.tsx` substituiu o `QueryClientProvider` inline pelo `QueryProvider`

---

## Tratamento de erros na HomePage

```tsx
const { data, isLoading, isError, error, refetch } = useHomeData();

if (isLoading)
  return (
    <PageWrapper>
      <PageSkeleton />
    </PageWrapper>
  );
if (isError)
  return (
    <PageWrapper>
      <ErrorFallback error={error} reset={refetch} />
    </PageWrapper>
  );
// success: data é HomeData
```

- `isLoading` usa `PageSkeleton` existente (Etapa 04)
- `isError` usa `ErrorFallback` existente com `reset={refetch}` para retry
- `data?.featuredMatch` permanece com null check (pode ser null na API real)

---

## Storybook — QueryClient para stories

`preview.tsx` agora adiciona um `QueryClientProvider` global para stories que usam hooks React Query:

```tsx
(Story) => {
  const qc = makeStorybookQueryClient(); // instância fresca por story
  return (
    <QueryClientProvider client={qc}>
      <Story />
    </QueryClientProvider>
  );
};
```

- Instância **isolada por story** — evita contaminação de cache entre stories
- `retry: false, staleTime: Infinity` — comportamento determinístico em stories

---

## Estratégia de testes

### Cenários cobertos

| Arquivo                      | Cenários                                                              |
| ---------------------------- | --------------------------------------------------------------------- |
| `http-client.test.ts`        | 200 OK, 4xx, 5xx, network error, JSON inválido, timeout               |
| `api-error` (em http-client) | isClientError, isServerError, isNetworkError, isTimeout, name/message |
| `home.service.test.ts`       | sucesso, schema inválido, 500, 404, JSON malformado, network error    |
| `QueryProvider.test.tsx`     | renderiza children, fornece QueryClient context                       |
| `useHomeData.test.tsx`       | loading inicial, sucesso, erro de servidor, schema inválido, refetch  |

### QueryClient em testes

```ts
// Padrão obrigatório para testes com React Query
const qc = new QueryClient({
  defaultOptions: { queries: { retry: false, gcTime: 0 } },
});
```

- `retry: false` — erro imediato, sem tentar 3x
- `gcTime: 0` — sem cache residual entre testes

### MSW em service/hook tests

Os testes sobrescrevem handlers via `server.use()` dentro de cada caso:

```ts
server.use(http.get("/home", () => HttpResponse.json(homeMockData)));
```

`afterEach(() => server.resetHandlers())` restaura os handlers padrão.

---

## Validação final

| Comando             | Resultado                 |
| ------------------- | ------------------------- |
| `npm run lint`      | ✅ 0 warnings             |
| `npm run typecheck` | ✅ 0 erros                |
| `npm run test:run`  | ✅ 160 testes · 25 suites |
| `npm run build`     | ✅ build em 600ms         |

**Testes adicionados nesta etapa: +24 (160 total, de 136)**
