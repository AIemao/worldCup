# Etapa 07 — Match Features Foundation

## Status

✅ Concluída

## Objetivo

Criar a fundação completa do domínio de **partidas** — desde os schemas Zod até as páginas renderizadas — seguindo a mesma arquitetura feature-based estabelecida nas etapas anteriores. A etapa entrega tipos, mocks, serviços, hooks, 10 componentes reutilizáveis, 2 páginas e cobertura de testes abrangente.

---

## Arquitetura do domínio

```
MatchesPage / MatchDetailsPage
  ↓
useFilteredMatches()       ← filtragem client-side
useMatchDetails(id)        ← partida individual
  ↓
useMatches()               ← lista completa
  ↓
getMatches() / getMatchById()   ← services com Zod
  ↓
httpClient<unknown>("/matches")
  ↓
MSW handler (dev/test)     ← retorna matchesMockData
  ↓ (produção)
Backend API
```

### Fluxo de filtragem

O filtro é **inteiramente client-side** — os dados são carregados uma vez pelo React Query e filtrados via `useMemo`. Isso evita re-fetches para cada combinação de filtro e mantém a UX responsiva.

```
useMatches()
  data: Match[]
     ↓
useFilteredMatches()
  ├── filters (useState)
  ├── matches = useMemo(filterMatches(data, filters))
  ├── updateFilters (useCallback)
  └── resetFilters (useCallback)
     ↓
MatchFilters → onChange
MatchesGrid  ← matches filtradas
```

---

## Estrutura de arquivos

```
src/features/matches/
├── types/
│   ├── match.types.ts          ← Zod schemas + tipos inferidos
│   └── index.ts
├── data/
│   ├── matches.mock.ts         ← 14 partidas (dev/test)
│   └── index.ts
├── services/
│   ├── matches.service.ts      ← getMatches, getMatchById
│   ├── matches.service.test.ts
│   └── index.ts
├── hooks/
│   ├── useMatches.ts
│   ├── useMatches.test.tsx
│   ├── useMatchDetails.ts
│   ├── useMatchDetails.test.tsx
│   ├── useFilteredMatches.ts
│   ├── useFilteredMatches.test.tsx
│   └── index.ts
├── components/
│   ├── MatchStatusBadge/       ← badge com pulse em live
│   ├── MatchScore/             ← placar ou "vs" conforme status
│   ├── MatchCard/              ← card compacto para grids
│   ├── MatchFilters/           ← filtros controlados
│   ├── MatchTimeline/          ← eventos cronológicos split layout
│   ├── MatchStats/             ← barras comparativas
│   ├── MatchHero/              ← header cinemático de detalhes
│   ├── MatchDetailsCard/       ← hero + stats + timeline
│   ├── MatchesGrid/            ← grid responsivo + skeleton
│   └── EmptyMatchesState/      ← estado vazio acessível
├── pages/
│   ├── MatchesPage/
│   ├── MatchDetailsPage/
│   └── index.ts
└── index.ts                    ← barrel export da feature
```

---

## Schemas Zod e Tipos (`match.types.ts`)

Todos os tipos são **inferidos dos schemas Zod** — nenhuma duplicação entre tipos estáticos e validação em runtime.

### Schemas principais

```ts
// Status e estágio
MatchStatusSchema; // "upcoming" | "live" | "finished" | "cancelled"
MatchStageSchema; // "group_a" … "final"

// Entidades
TeamRefSchema; // id, name, shortName, flagEmoji, primaryColor
MatchScoreSchema; // home, away (null até ter placar)
MatchEventSchema; // id, type, minute, teamId, playerName, assistName?
MatchStatsSchema; // possession, shots, shotsOnTarget, corners, fouls, yellowCards, redCards

// Agregadores
MatchSchema; // entidade completa
MatchListSchema; // z.array(MatchSchema) = Match[]
```

### Tipos inferidos exportados

```ts
type MatchStatus = z.infer<typeof MatchStatusSchema>;
type MatchStage = z.infer<typeof MatchStageSchema>;
type TeamRef = z.infer<typeof TeamRefSchema>;
type MatchScore = z.infer<typeof MatchScoreSchema>;
type MatchEvent = z.infer<typeof MatchEventSchema>;
type MatchStats = z.infer<typeof MatchStatsSchema>;
type Match = z.infer<typeof MatchSchema>;
type MatchList = Match[]; // z.array(MatchSchema)

// Filtros client-side (não vão para a API)
type MatchFilters = {
  status: MatchStatus | "all";
  stage: MatchStage | "all";
  team: string;
  search: string;
};
```

### Constantes auxiliares

```ts
DEFAULT_MATCH_FILTERS; // { status: "all", stage: "all", team: "", search: "" }
STAGE_LABELS; // Record<MatchStage, string> — para selects
STATUS_LABELS; // Record<MatchStatus, string>
```

**Nota sobre `MatchList`:** O schema é `z.array(MatchSchema)` — um array direto. Isso alinha com o padrão REST de retornar arrays, evita wrappers desnecessários e simplifica os services.

---

## Mock Data (`data/matches.mock.ts`)

14 partidas cobrindo todos os cenários de UI:

| ID            | Fase          | Status   | Detalhe                           |
| ------------- | ------------- | -------- | --------------------------------- |
| wc26-m01      | Group A       | finished | MEX 2–1 USA · com eventos e stats |
| wc26-m02      | Group B       | live     | BRA 1–0 ARG · minuto 67           |
| wc26-m03      | Group C       | upcoming | FRA vs MAR                        |
| wc26-m04      | Group D       | upcoming | ENG vs GER                        |
| wc26-m05      | Group E       | finished | NED 3–2 POR · com eventos         |
| wc26-m06      | Group F       | upcoming | ESP vs ITA                        |
| wc26-m07      | Group G       | finished | MAR 1–0 SEN                       |
| wc26-m08      | Group H       | upcoming | URU vs COL                        |
| wc26-r16-01   | Round of 16   | finished | BRA 2–1 ESP · com stats           |
| wc26-qf-01    | Quarter Final | upcoming | FRA vs ENG                        |
| wc26-sf-01    | Semi Final    | finished | FRA 2–0 MAR · com eventos         |
| wc26-sf-02    | Semi Final    | live     | BRA 1–1 NED · minuto 88 ET        |
| wc26-3rd-01   | Third Place   | upcoming | MAR vs ENG                        |
| wc26-final-01 | Final         | upcoming | TBD vs TBD                        |

---

## Services (`services/matches.service.ts`)

```ts
// Lista completa
export async function getMatches(): Promise<Match[]> {
  const raw = await httpClient<unknown>("/matches");
  return MatchListSchema.parse(raw);
}

// Partida individual — lança ApiError se não encontrada
export async function getMatchById(matchId: string): Promise<Match> {
  const raw = await httpClient<unknown>(`/matches/${matchId}`);
  return MatchSchema.parse(raw);
}
```

Mesma convenção da Etapa 06: `httpClient<unknown>()` + `Schema.parse()`. O `unknown` força a validação Zod explícita antes de qualquer uso do dado.

---

## Query Keys (`api/queries/query-keys.ts`)

```ts
matches: {
  all:    ["matches"]                          as const,
  lists:  () => [...all, "list"]               as const,
  list:   (filters?) => [...lists(), filters]  as const,
  detail: (id) => [...all, "detail", id]       as const,
}
```

- `matches.all` — invalida toda a feature
- `matches.lists()` — base para todas as listas (usado por `useMatches`)
- `matches.detail(id)` — partida individual, isolada por ID

---

## MSW Handlers (`mocks/handlers.ts`)

```ts
http.get("/matches", () => HttpResponse.json(matchesMockData)),

http.get("/matches/:matchId", ({ params }) => {
  const match = matchesMockData.find((m) => m.id === params.matchId);
  if (!match) return new HttpResponse(null, { status: 404 });
  return HttpResponse.json(match);
}),
```

O handler de detalhes retorna `404` para IDs inexistentes — o que faz `MatchSchema.parse()` falhar com `ZodError`, que o `MatchDetailsPage` trata como "not found".

---

## Hooks

### `useMatches`

```ts
function useMatches(): {
  data: Match[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};
```

Wrapper direto do `useQuery` com `queryKey: queryKeys.matches.lists()` e `queryFn: getMatches`. Interface estável — implementação pode evoluir para realtime sem alterar consumidores.

---

### `useMatchDetails`

```ts
function useMatchDetails(matchId: string | undefined): {
  data: Match | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};
```

Habilita a query apenas quando `matchId` é truthy (`enabled: Boolean(matchId)`). Sem `matchId` (rota não parametrizada), a query não executa — sem requests desnecessários.

---

### `useFilteredMatches`

```ts
function useFilteredMatches(): {
  matches: Match[]; // lista filtrada
  filters: MatchFilters;
  updateFilters: (updates: Partial<MatchFilters>) => void;
  resetFilters: () => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};
```

**Lógica interna:**

```ts
const [filters, setFilters] = useState(DEFAULT_MATCH_FILTERS);
const { data, ...queryState } = useMatches();

const matches = useMemo(() => (data ? filterMatches(data, filters) : []), [data, filters]);
```

A função `filterMatches` é **pura** (sem React), extraída fora do hook para testabilidade direta.

**Filtros aplicados em sequência:**

1. `status` — match exato
2. `stage` — match exato
3. `team` — busca por ID (`homeTeam.id === teamId || awayTeam.id === teamId`)
4. `search` — substring case-insensitive em nome, shortName, venue, cidade e round

`useCallback` em `updateFilters` e `resetFilters` estabiliza as referências para componentes otimizados.

---

## Componentes

### `MatchStatusBadge`

Badge com indicação visual de status. Usa **CVA** (`match-status-badge.variants.ts`) com 3 variantes:

| Status   | Visual                          |
| -------- | ------------------------------- |
| live     | verde + bolinha animada (pulse) |
| finished | muted, sem animação             |
| upcoming | azul/brand, sem animação        |

`aria-label="Match status: live"` para acessibilidade com screen readers.

---

### `MatchScore`

Exibe o placar ou estado dependendo do `status`:

| Status   | Exibição                          |
| -------- | --------------------------------- |
| upcoming | "vs" + horário formatado          |
| live     | `home – away` + minuto atual      |
| finished | `home – away` em tipografia maior |

---

### `MatchCard`

Card compacto para uso em grids. Composição:

```
GlassPanel (intensity=medium, glow=sm quando live)
├── Header: round + MatchStatusBadge
├── Teams: TeamDisplay (home) + MatchScore + TeamDisplay (away)
├── Venue: MapPin + localização
└── Link: /matches/:id
        aria-label="Match details: MEX vs USA"
```

O `aria-label` do link inclui "Match details:" para que `getByRole("link", { name: /match details/i })` funcione nos testes sem depender apenas do texto visível.

---

### `MatchFilters`

Painel de filtros **completamente controlado** — sem estado interno.

```tsx
<MatchFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />
```

Controles:

- Input `type="search"` — busca livre
- Select de status — All / Upcoming / Live / Final
- Select de stage — All Stages / Group A…H / R32 / R16 / QF / SF / 3rd / Final
- Botão "Clear" — exibido apenas quando `hasActiveFilters(filters)`

Acessibilidade: `role="search"` + `aria-label="Filter matches"` no container; todos os controles com `<label>` associado via `useId()`.

---

### `MatchTimeline`

Lista cronológica de eventos. Layout **split em 3 colunas**:

```
[evento da casa]  [minuto']  [evento do visitante]
```

Eventos da equipe errada ficam **não renderizados** (renderização condicional com `{isHome && ...}`). Isso evita que texto de jogadores apareça duplicado no DOM — um bug descoberto em testes onde `getByText("Vinicius Jr.")` encontrava 2 nós.

Ícones por tipo de evento: gol, cartão amarelo/vermelho, substituição, revisão VAR, pênalti salvo/perdido.

---

### `MatchStats`

Barras comparativas de estatísticas. Componente interno `StatBar`:

```
[55%]  Possession  [45%]
████████░░░░░░░░░░░░░░░░  ← role="meter" + aria-valuenow
```

`isPossession` controla se exibe o valor com `%` ou numérico.  
A linha de percentual redundante abaixo da barra foi removida — evitava que `getByText("55%")` encontrasse 2 elementos (o valor de posse E o percentual calculado da barra).

---

### `MatchHero`

Seção cinemática para a página de detalhes. Dois blobs de glow ambient posicionados nas cores das equipes via CSS inline (`primaryColor`). Layout central com:

```
[flag emoji]  NOME  vs  NOME  [flag emoji]
              MatchScore (grande)
              venue · cidade · round
              MatchStatusBadge
```

---

### `MatchDetailsCard`

Composição das três seções de detalhe:

```tsx
<article aria-label="Match details: MEX vs USA">
  <MatchHero match={match} />
  {match.stats && <MatchStats stats={match.stats} ... />}
  {match.events?.length > 0 && <MatchTimeline events={match.events} ... />}
</article>
```

`MatchStats` e `MatchTimeline` são opcionais — renderizados apenas quando os dados existem.

---

### `MatchesGrid`

Grid responsivo com skeleton loading:

```
Mobile:    1 coluna
sm:        2 colunas
lg:        3 colunas
2xl:       4 colunas
```

`isLoading=true` → exibe 8 cards skeleton (`animate-pulse`) com `aria-busy="true"` no container.

---

### `EmptyMatchesState`

```tsx
<div role="status" aria-live="polite">
  <CalendarX2 />
  <p>No matches</p>
  <p>{message}</p>
</div>
```

`aria-live="polite"` anuncia a mudança para screen readers quando os filtros resultam em lista vazia. `message` é configurável via prop (default: "No matches found for the selected filters.").

---

## Páginas

### `MatchesPage`

```
1. Hero — título "Matches" + contagem de resultados
2. MatchFilters — controles de filtragem
3. MatchesGrid — grid ou EmptyMatchesState
```

Usa `useFilteredMatches()`. `isLoading` retorna `PageSkeleton`; `isError` retorna `ErrorFallback` com `reset={refetch}`.

### `MatchDetailsPage`

```
1. Link ← "All Matches"
2. MatchDetailsCard (quando data carregada)
```

Usa `useParams<{ matchId: string }>()` + `useMatchDetails(matchId)`. Se a query falha (404 ou ZodError), exibe `ErrorFallback`. Sem `matchId` válido na URL, exibe "Match not found".

---

## Roteamento (`routes/router.tsx`)

```ts
{
  path: "/matches",
  lazy: () => import("@/features/matches/pages/MatchesPage"),
},
{
  path: "/matches/:matchId",
  lazy: () => import("@/features/matches/pages/MatchDetailsPage"),
},
```

Padrão `lazy:` nativo do React Router v7 — sem `React.lazy`, sem JSX no arquivo de rotas.

---

## Barrel export (`features/matches/index.ts`)

### Decisão: tipos com nome conflitante com componentes

`MatchFilters`, `MatchScore` e `MatchStats` existem como **tipos** (em `match.types.ts`) e como **componentes** (em `components/`). Exportar ambos do mesmo barrel causaria `TS2300: Duplicate identifier`.

**Solução:** os tipos conflitantes são omitidos do barrel. Consumidores que precisam dos tipos importam diretamente:

```ts
// De outros módulos da feature — use o barrel
import { MatchFilters } from "@/features/matches"; // ← componente

// Quando o tipo é necessário explicitamente
import type { MatchFilters } from "@/features/matches/types/match.types";
```

Os demais tipos sem conflito (`Match`, `MatchEvent`, `MatchList`, etc.) continuam exportados normalmente pelo barrel com `export type`.

---

## Estratégia de testes

### Suítes criadas

| Arquivo                       | Testes | Foco                                            |
| ----------------------------- | ------ | ----------------------------------------------- |
| `matches.service.test.ts`     | 6      | sucesso, Zod inválido, 404, 500, network        |
| `useMatches.test.tsx`         | 3      | loading, sucesso, erro                          |
| `useMatchDetails.test.tsx`    | 4      | loading, sucesso, não encontrado, desabilitado  |
| `useFilteredMatches.test.tsx` | 9      | filtros status/stage/search/team, reset         |
| `MatchStatusBadge.test.tsx`   | 6      | variantes visuais, pulse live, aria-label       |
| `MatchScore.test.tsx`         | 5      | upcoming/live/finished, minuto, horário         |
| `MatchCard.test.tsx`          | 8      | renderização, link acessível, glow live         |
| `MatchFilters.test.tsx`       | 8      | inputs, clear button, onChange, a11y            |
| `MatchTimeline.test.tsx`      | 6      | eventos, assistente, empty, aria-labels         |
| `MatchStats.test.tsx`         | 5      | valores, role meter, acessibilidade             |
| `MatchHero.test.tsx`          | 7      | flags, score, venue, aria-label                 |
| `MatchDetailsCard.test.tsx`   | 5      | hero, stats condicionais, aria article          |
| `MatchesGrid.test.tsx`        | 5      | cards, skeleton, aria-busy                      |
| `EmptyMatchesState.test.tsx`  | 4      | texto, role status, aria-live, custom message   |
| `MatchesPage.test.tsx`        | 6      | loading, heading, cards, erro, filtro, empty    |
| `MatchDetailsPage.test.tsx`   | 5      | carregamento, back link, erro, not found, stats |

**Total adicionado: +92 testes (252 total, de 160)**

---

### Padrões de teste utilizados

**Wrapper padrão para hooks/páginas:**

```ts
const qc = new QueryClient({
  defaultOptions: { queries: { retry: false, gcTime: 0 } },
});

function Wrapper({ children }) {
  return (
    <QueryClientProvider client={qc}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}
```

**Override de handler MSW por teste:**

```ts
server.use(http.get("/matches", () => new HttpResponse(null, { status: 500 })));
```

`afterEach(() => server.resetHandlers())` restaura os handlers padrão.

**`waitFor` para estado assíncrono:**

```ts
await waitFor(() =>
  expect(screen.getAllByRole("link", { name: /match details/i }).length).toBeGreaterThan(0)
);
```

---

### Decisões de teste notáveis

**`getByText` vs `getAllByText`:**  
`MatchStats` mostra o shortName dos times tanto no cabeçalho quanto em componentes filhos (MatchHero). `getByText("MEX")` encontraria múltiplos nós → erro. Solução: `getAllByText("MEX").length > 0` onde duplicatas são esperadas por design.

**`getByText("No matches")` — string exata:**  
`EmptyMatchesState` renderiza `"No matches"` E `"No matches found for the selected filters."`. `getByText(/no matches/i)` (regex) combinava os dois elementos → `waitFor` em loop. Solução: string exata `getByText("No matches")` que usa exact-match por padrão.

**`MatchTimeline` — renderização condicional:**  
O layout split original usava `className="invisible"` para ocultar o lado vazio, mantendo o texto no DOM. `getByText("Vinicius Jr.")` encontrava 2 nós (home visible + away invisible). Corrigido com `{isHome && ...}` / `{!isHome && ...}` — o lado errado não é montado.

---

## Validação final

| Comando                | Resultado                 |
| ---------------------- | ------------------------- |
| `npm run lint`         | ✅ 0 warnings             |
| `npm run format:check` | ✅ todos os arquivos OK   |
| `npm run typecheck`    | ✅ 0 erros                |
| `npm run test:run`     | ✅ 252 testes · 41 suites |
| `npm run build`        | ✅ 2404 módulos · 912ms   |

**Commit:** `1af48e3` — `feat(matches): implement match features foundation`
