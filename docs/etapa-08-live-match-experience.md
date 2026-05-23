# Etapa 08 — Live Match Experience & Realtime UI Foundation

## Status

✅ Concluída

## Objetivo

Construir a fundação completa da feature **Live** — experiência de partidas ao vivo com atualização em tempo real (via polling), indicadores visuais de momentum, feed de eventos, insights de IA e ticker de eventos rolante. A etapa entrega a arquitetura completa para suportar WebSocket no futuro sem alterar nenhum componente.

---

## Arquitetura da feature

```
LiveCenterPage / LiveMatchPage
  ↓
useLiveMatches()          ← lista com polling 5s
useLiveMatch(id)          ← detalhe com polling 5s
useLiveInsights(id)       ← insights com polling 15s
useMatchMomentum(match)   ← cálculo puro com useMemo
useLiveTicker(items)      ← rotação local com useReducer
  ↓
getLiveMatches()
getLiveMatchById(id)       ← services com Zod
getLiveInsights(id)
  ↓
httpClient<unknown>("/live/...")
  ↓
MSW handlers (dev/test)   ← retorna liveMatchesMockData
  ↓ (produção futura)
Backend API / WebSocket
```

### Diagrama de componentes da LiveMatchPage

```
LiveMatchPage
├── LiveMatchHero            ← hero cinemático com badge + placar + momentum
│   ├── LiveBadge (bright)   ← LIVE pulsante com minuto
│   └── MomentumBar          ← barra proporcional home/away
├── LiveStatCard × 6         ← possession, shots, on target, corners, fouls, cards
├── LiveEventFeed            ← feed cronológico split (home esq / away dir)
└── LiveInsightsPanel        ← painel de IA com confidence pills
```

---

## Estrutura de arquivos

```
src/features/live/
├── types/
│   ├── live.types.ts          ← Zod schemas + tipos + MOMENTUM_WEIGHTS
│   └── index.ts
├── data/
│   ├── live.mock.ts           ← 2 partidas, 6 ticker items, 4 insights
│   └── index.ts
├── services/
│   ├── live.service.ts        ← getLiveMatches, getLiveMatchById, getLiveInsights
│   ├── live.service.test.ts   ← 12 testes
│   └── index.ts
├── hooks/
│   ├── useLiveMatches.ts
│   ├── useLiveMatches.test.tsx ← 9 testes (inclui useLiveMatch)
│   ├── useLiveMatch.ts
│   ├── useLiveInsights.ts
│   ├── useLiveTicker.ts
│   ├── useLiveTicker.test.ts  ← 8 testes
│   ├── useMatchMomentum.ts
│   ├── useMatchMomentum.test.ts ← 7 testes
│   └── index.ts
├── components/
│   ├── LiveBadge/             ← 3 variants: default, bright, subtle | 3 sizes
│   ├── LiveTicker/            ← ticker horizontal com AnimatePresence
│   ├── MomentumBar/           ← barra proporcional + labels + percentuais
│   ├── LiveStatCard/          ← card de estatística com barra opcional
│   ├── LiveEventFeed/         ← feed split home/away + empty state
│   ├── LiveMatchHero/         ← hero com glows + momentum
│   └── LiveInsightsPanel/     ← painel IA com ícones e confidence
├── pages/
│   ├── LiveCenterPage/        ← grid + ticker + empty state
│   ├── LiveMatchPage/         ← hero + stats + events + insights
│   └── index.ts
└── index.ts                   ← barrel export completo
```

---

## Schemas Zod e Tipos (`live.types.ts`)

Todos os tipos são **inferidos dos schemas Zod** — nenhuma duplicação.

### Schemas novos

```ts
ElapsedPhaseSchema; // "first_half" | "half_time" | "second_half" | "extra_time_1" | "extra_time_2" | "penalties"
MomentumTrendSchema; // "rising_home" | "rising_away" | "neutral"
MomentumSchema; // { home: 0-100, away: 0-100, trend }
TickerItemTypeSchema; // "goal" | "score_update" | "yellow_card" | ... (10 tipos)
TickerItemSchema; // { id, type, matchId, homeTeam, awayTeam, score?, minute?, text }
InsightTypeSchema; // "momentum" | "prediction" | "tactical" | "historical" | "stat"
LiveInsightSchema; // { id, type, text, confidence(0-1), teamId? }
LiveInsightsSchema; // { matchId, insights, generatedAt }
```

### LiveMatchSchema — extensão de MatchSchema

```ts
// Diferenças em relação a Match:
// - status:        z.literal("live")    (não união — sempre "live")
// - score:         MatchScoreSchema     (obrigatório — não opcional)
// - currentMinute: z.number(0-120)      (obrigatório — não opcional)
// - elapsedPhase:  ElapsedPhaseSchema   (campo novo)

const LiveMatchSchema = MatchSchema.omit({
  status: true,
  score: true,
  currentMinute: true,
}).extend({
  status: z.literal("live"),
  score: MatchScoreSchema,
  currentMinute: z.number().int().min(0).max(120),
  elapsedPhase: ElapsedPhaseSchema,
});
```

---

## Hooks

### `useLiveMatches` e `useLiveMatch`

Polling via `refetchInterval` do React Query. Interface estável — migração para WebSocket não altera consumidores.

```ts
// polling automático a cada 5s
const { data, isLoading, isError, refetch } = useLiveMatches();
const { data, isLoading, isError } = useLiveMatch(matchId);
```

### `useLiveInsights`

```ts
// polling 15s — insights são mais estáticos que o placar
const { data } = useLiveInsights(matchId);
```

### `useMatchMomentum`

Cálculo puro com `useMemo`. Nunca faz fetch — deriva momentum dos stats já carregados.

```ts
// Pesos aplicados
const MOMENTUM_WEIGHTS = {
  shots: 0.3, // 30%
  possession: 0.25, // 25%
  shotsOnTarget: 0.25, // 25%
  corners: 0.2, // 20%
};

// home + away = 100 sempre
// trend = "rising_home" quando diff >= 10 pontos
// trend = "rising_away" quando diff <= -10 pontos
const momentum = useMatchMomentum(match); // → { home: 65, away: 35, trend: "rising_home" }
```

### `useLiveTicker`

Rotação de items com `useReducer` + `setInterval`. Sem fetch — apresentacional.

```ts
const { currentItem, currentIndex, isPaused, containerRef } = useLiveTicker(items, {
  intervalMs: 4_000,
});

// Recursos de acessibilidade:
// - Pausa em mouseenter e focusin (containerRef)
// - Não inicia rotação se prefers-reduced-motion: reduce
// - isPaused: false por padrão (sem prefers-reduced-motion)
```

---

## Componentes

### `LiveBadge`

Badge LIVE com dot pulsante vermelho. Exibe minuto opcionalmente.

```tsx
<LiveBadge />                          // "● LIVE"
<LiveBadge minute={67} />              // "● LIVE · 67'"
<LiveBadge variant="bright" />         // fundo vermelho sólido com glow
<LiveBadge variant="subtle" size="sm" />
```

**Variantes:** `default` | `bright` | `subtle`  
**Sizes:** `sm` | `md` | `lg`

### `LiveTicker`

Barra horizontal rotativa com `AnimatePresence` (modo `wait`).

```tsx
<LiveTicker items={tickerItems} />
// aria-live="polite" aria-atomic="true"
// Pausa em hover — containerRef no div externo
```

### `MomentumBar`

```tsx
<MomentumBar
  momentum={{ home: 65, away: 35, trend: "rising_home" }}
  homeColor="#009C3B"
  awayColor="#74ACDF"
  homeLabel="BRA"
  awayLabel="ARG"
/>
```

Barra dividida com transição `duration-700`. Percentual dominante é destacado.

### `LiveStatCard`

```tsx
<LiveStatCard label="Possession" homeValue="58%" awayValue="42%" homePercent={58} awayPercent={42} />
<LiveStatCard label="Shots" homeValue={12} awayValue={7} />  // sem barra
```

### `LiveEventFeed`

```tsx
<LiveEventFeed events={match.events} homeTeamId="bra" />
// Eventos do home: lado esquerdo
// Eventos do away: lado direito (flex-row-reverse)
// Ordenado cronologicamente decrescente (mais recente primeiro)
// Empty state: "No events yet"
```

Suporta todos os 9 tipos de `MatchEventType`: `goal`, `own_goal`, `yellow_card`, `second_yellow`, `red_card`, `substitution`, `var_review`, `penalty_saved`, `penalty_missed`.

### `LiveMatchHero`

```tsx
<LiveMatchHero match={liveMatch} momentum={momentum} />
// Ambient glow blobs com cores dos times
// LiveBadge bright + minuto
// Placar em fonte mono tabular
// MapPin venue + cidade
// MomentumBar (opcional)
```

### `LiveInsightsPanel`

```tsx
<LiveInsightsPanel insights={insights} />
// Brain icon + "AI Insights" header
// Lista com ícone por tipo + texto + ConfidencePill
// Confidence >= 80%: verde | >= 60%: amarelo | < 60%: neutro
// Empty state com Brain icon + "No AI insights yet"
```

---

## Páginas

### `LiveCenterPage` (`/live`)

```
LiveTicker                     ← barra de eventos ao vivo
Section: "Live Now" + contador ← Radio icon + badge vermelho com contagem
Grid de LiveMatchCard × N      ← links para /live/:matchId
Empty state                    ← quando não há partidas ao vivo
```

### `LiveMatchPage` (`/live/:matchId`)

```
Link: "← Live Center"
LiveMatchHero                  ← hero com momentum
  Stats grid (2-col)           ← 6 LiveStatCard
  LiveEventFeed                ← coluna esquerda (2/3)
LiveInsightsPanel              ← coluna direita (1/3)
```

---

## Dados mockados

### Partidas ao vivo

| ID             | Home   | Away   | Placar | Minuto | Fase        |
| -------------- | ------ | ------ | ------ | ------ | ----------- |
| `wc26-live-01` | BRA 🇧🇷 | ARG 🇦🇷 | 2–1    | 67'    | second_half |
| `wc26-live-02` | FRA 🇫🇷 | ENG 🏴󠁧󠁢󠁥󠁮󠁧󠁿 | 0–0    | 23'    | first_half  |

### Ticker items (6)

Cobrem gols, score_updates, var_review e yellow_card das duas partidas.

### AI Insights (4, para `wc26-live-01`)

| Tipo       | Confidence |
| ---------- | ---------- |
| stat       | 95%        |
| tactical   | 81%        |
| prediction | 74%        |
| historical | 88%        |

---

## MSW Handlers adicionados

```ts
GET /live              → liveMatchesMockData (array)
GET /live/:matchId     → match específico ou 404
GET /live/:matchId/insights → insights do match ou { insights: [] }
```

---

## Router

```ts
// src/routes/router.tsx
{ path: ROUTES.LIVE,              lazy: () => import(".../LiveCenterPage") }
{ path: `${ROUTES.LIVE}/:matchId`, lazy: () => import(".../LiveMatchPage") }
```

Ambas as rotas usam `lazy:` nativo do React Router v7 — código splitting automático.

---

## Acessibilidade

| Elemento            | Atributo                                              |
| ------------------- | ----------------------------------------------------- |
| `LiveBadge`         | `role="status"` + `aria-label="Live match, minute X"` |
| `LiveTicker`        | `aria-live="polite"` + `aria-atomic="true"`           |
| `LiveMatchHero`     | `aria-label="Live: HomeTeam vs AwayTeam"`             |
| `LiveEventFeed`     | `aria-label="Match events"` (lista)                   |
| `LiveInsightsPanel` | `aria-label="AI insights panel"`                      |
| `ConfidencePill`    | `aria-label="Confidence: XX%"`                        |
| `MomentumBar`       | `aria-label="Momentum: BRA 65%, ARG 35%"`             |
| `LiveStatCard`      | `aria-label="Possession: home 58%, away 42%"`         |
| Dot pulsante        | `aria-hidden="true"`                                  |
| Emojis de evento    | `aria-hidden="true"`                                  |

O `useLiveTicker` pausa a rotação automática em `mouseenter` e `focusin` (via `containerRef`), e não inicia quando `prefers-reduced-motion: reduce` está ativo.

---

## Testes

| Arquivo                      | Testes                  |
| ---------------------------- | ----------------------- |
| `live.service.test.ts`       | 12                      |
| `useLiveMatches.test.tsx`    | 9 (inclui useLiveMatch) |
| `useLiveTicker.test.ts`      | 8                       |
| `useMatchMomentum.test.ts`   | 7                       |
| `LiveBadge.test.tsx`         | 8                       |
| `LiveTicker.test.tsx`        | 5                       |
| `MomentumBar.test.tsx`       | 8                       |
| `LiveStatCard.test.tsx`      | 7                       |
| `LiveEventFeed.test.tsx`     | 7                       |
| `LiveMatchHero.test.tsx`     | 8                       |
| `LiveInsightsPanel.test.tsx` | 7                       |
| `LiveCenterPage.test.tsx`    | 8                       |
| `LiveMatchPage.test.tsx`     | 8                       |
| **Total Etapa 08**           | **102**                 |
| **Total acumulado**          | **353**                 |

---

## Decisões arquiteturais documentadas

- [ADR 005 — State Management Strategy](./adr/005-state-management-strategy.md)
- [ADR 006 — Testing Strategy](./adr/006-testing-strategy.md)
- [ADR 007 — Feature Architecture](./adr/007-feature-architecture.md)
- [ADR 008 — Live Data & Realtime Strategy](./adr/008-live-data-realtime-strategy.md)

---

## Próximas etapas sugeridas

- **Etapa 09** — Groups Feature: tabelas de grupos, confrontos, classificação
- **Etapa 10** — Teams Feature: perfis de times, elencos, estatísticas históricas
- **Etapa 11** — Standings Feature: tabela geral do torneio
- **Etapa 12** — WebSocket integration: migrar `useLiveMatch` e `useLiveMatches` para transporte real
- **Etapa 13** — E2E com Playwright: fluxos críticos Live, navegação, responsivo
