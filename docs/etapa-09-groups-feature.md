# Etapa 09 — Groups Feature

## Status

✅ Concluída

## Objetivo

Construir a feature completa de **Grupos** da Copa do Mundo — exibição das 8 chaves (A a H), tabelas de classificação com indicador de qualificação, confrontos por rodada e integração com a API TheSportsDB. A etapa entrega adaptadores para o payload real da API, mock data completo com 32 seleções e roteamento lazy para ambas as páginas.

---

## Arquitetura da feature

```
GroupsPage (/groups?group=A)        GroupDetailsPage (/groups/:groupId)
  ↓                                   ↓
useGroups()                         useGroupStandings(letter)
useGroupStandings(letter)           useGroupMatches(letter)
useGroupMatches(letter)
  ↓
getGroups()
getGroupStandings(letter)           ← services com Zod
getGroupMatches(letter)
  ↓
httpClient<unknown>("/groups/...")
  ↓
MSW handlers (dev/test)             ← retorna groupsMockData / groupStandingsMockData / groupMatchesMockData
  ↓ (produção futura)
Backend API → TheSportsDB (via adapters)
```

### Diagrama de componentes

```
GroupsPage
├── GroupTabs (A–H)             ← tablist com URL sync (?group=X)
├── GroupTable                  ← tabela de classificação completa
│   └── GroupTableRow × 4      ← linha com posição, bandeira, stats, QualificationBadge
└── GroupMatches                ← confrontos agrupados por rodada
    └── GroupMatchCard × 6     ← card com status finished/live/upcoming

GroupDetailsPage
├── Link "← Back to Groups"
├── GroupTable
└── GroupMatches
```

---

## Estrutura de arquivos

```
src/features/groups/
├── types/
│   ├── groups.types.ts          ← Zod schemas + tipos + constantes
│   └── index.ts
├── data/
│   ├── groups.mock.ts           ← 8 grupos, 32 times, 48 confrontos
│   └── index.ts
├── adapters/
│   ├── sportsdb.adapters.ts     ← mapeia payload TheSportsDB → tipos internos
│   └── index.ts
├── services/
│   ├── groups.service.ts        ← getGroups, getGroupStandings, getGroupMatches
│   ├── groups.service.test.ts   ← 18 testes
│   └── index.ts
├── hooks/
│   ├── useGroups.ts
│   ├── useGroupStandings.ts
│   ├── useGroupMatches.ts
│   ├── useGroups.test.tsx       ← 12 testes (cobre os 3 hooks)
│   └── index.ts
├── components/
│   ├── QualificationBadge/      ← badge qualified/playoff/eliminated/pending
│   ├── GroupTableRow/           ← linha de classificação
│   ├── GroupTable/              ← tabela completa com skeleton e legenda
│   ├── GroupMatchCard/          ← card de confronto
│   ├── GroupMatches/            ← lista agrupada por rodada
│   ├── GroupCard/               ← card resumo de grupo (mini tabela + link)
│   └── GroupTabs/               ← tabs A–H com aria completo
├── pages/
│   ├── GroupsPage/              ← /groups?group=A
│   ├── GroupDetailsPage/        ← /groups/:groupId
│   └── index.ts
└── index.ts                     ← barrel export completo
```

---

## Schemas Zod e Tipos (`groups.types.ts`)

Todos os tipos são **inferidos dos schemas Zod** — nenhuma duplicação.

### Constantes

```ts
GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;
SPORTSDB_WC_LEAGUE_ID = "4429"; // FIFA World Cup
SPORTSDB_WC_SEASON = "2025-2026";
```

### Schemas principais

```ts
GroupLetterSchema; // z.enum(["A"..."H"])
GroupSchema; // { id, name, letter }
GroupListSchema; // z.array(GroupSchema)

QualificationStatusSchema; // "qualified" | "playoff" | "eliminated" | "pending"

GroupStandingSchema; // {
//   teamId, teamName, teamShortName,
//   teamFlagEmoji, teamBadge(url),
//   played, wins, draws, losses,
//   goalsFor, goalsAgainst, goalDifference,
//   points, position, qualificationStatus
// }

GroupMatchSchema; // {
//   id, homeTeam(TeamRef), awayTeam(TeamRef),
//   status(MatchStatus), scheduledAt,
//   venue?, score?, currentMinute?,
//   isLive, round, groupLetter
// }
```

---

## Adapters TheSportsDB (`sportsdb.adapters.ts`)

Camada de tradução entre o payload bruto da API e os tipos internos.
Permite trocar a fonte de dados sem alterar nenhum componente ou hook.

```ts
// Tabela de classificação
mapSportsDbStandingToGroupStanding(row: SportsDbTableRow): GroupStanding

// Eventos (partidas)
mapSportsDbEventToGroupMatch(event: SportsDbEvent): GroupMatch
```

**Endpoints TheSportsDB utilizados:**

| Endpoint                                | Dados                 |
| --------------------------------------- | --------------------- |
| `/lookuptable.php?l=4429&s=2025-2026`   | Standings por liga    |
| `/eventsseason.php?id=4429&s=2025-2026` | Partidas da temporada |

---

## Hooks

### `useGroups`

```ts
const { data, isLoading, isError } = useGroups();
// queryKey: ["groups", "list"]
// sem polling — dados estáticos de estrutura
```

### `useGroupStandings`

```ts
const { data, isLoading, isError } = useGroupStandings(groupLetter);
// queryKey: ["groups", "standings", "A"]
// enabled: Boolean(groupLetter)
```

### `useGroupMatches`

```ts
const { data, isLoading, isError } = useGroupMatches(groupLetter);
// queryKey: ["groups", "matches", "A"]
// enabled: Boolean(groupLetter)
```

---

## Componentes

### `QualificationBadge`

Badge de status de classificação com variante compacta.

```tsx
<QualificationBadge status="qualified" />   // "Qualified for knockout stage"
<QualificationBadge status="playoff" />     // "Playoff spot"
<QualificationBadge status="eliminated" />  // "Eliminated"
<QualificationBadge status="pending" />     // "Pending"
<QualificationBadge status="qualified" compact />  // "Q" (letra única)
```

**Variantes CVA (em `qualification-badge.variants.ts`):**

| Status       | Visual                       |
| ------------ | ---------------------------- |
| `qualified`  | Verde sólido                 |
| `playoff`    | Amarelo/âmbar                |
| `eliminated` | Cinza com opacidade reduzida |
| `pending`    | Neutro                       |

### `GroupTableRow`

Linha individual da tabela de classificação.

```tsx
<GroupTableRow standing={standing} position={1} />
// Exibe: posição (colorida), bandeira emoji, nome curto, J/V/E/D/GP/GC/SG/Pts, QualificationBadge compact
// Posição 1-2: texto primary | Posição 3: texto amarelo | Posição 4: texto muted
```

### `GroupTable`

Tabela completa de classificação.

```tsx
<GroupTable groupLetter="A" />
// Header sticky com colunas Pos/Time/J/V/E/D/GP/GC/SG/Pts/Status
// Skeleton: 4 × <Skeleton className="h-12"> quando isLoading=true
// Legenda de qualificação abaixo da tabela
// role="region" aria-label="Group A Standings"
```

### `GroupMatchCard`

Card de confronto individual.

```tsx
<GroupMatchCard match={match} />
// finished: placar + "FT" + venue
// live:     placar + LiveBadge com minuto + venue
// upcoming: "-" + data/hora formatada + venue
// aria-label no placar: "Score: 3 to 0"
```

### `GroupMatches`

Lista de confrontos agrupados por rodada.

```tsx
<GroupMatches groupLetter="A" />
// Agrupa matches por match.round
// Skeleton: 3 × <Skeleton className="h-24"> quando isLoading=true
// Empty state: "No matches scheduled for this group"
```

### `GroupCard`

Card de resumo do grupo (usado na página de visão geral futura).

```tsx
<GroupCard group={group} standings={standings} />
// Mini tabela: Time / Pts (4 linhas)
// QualificationBadge compact por posição
// Link "/groups/a" → "Group A standings — view details"
```

### `GroupTabs`

Tabs A–H com acessibilidade completa.

```tsx
<GroupTabs activeGroup="A" onGroupChange={setActiveGroup} />
// role="tablist" aria-label="World Cup Groups"
// Cada button: role="tab" + aria-selected + aria-controls + aria-label="Group X"
// Tab ativa: visual destacado + border-bottom
```

---

## Páginas

### `GroupsPage` (`/groups?group=A`)

```
GroupTabs                    ← tabs A–H sincronizadas com ?group= na URL
  ↓ tabpanel
GroupTable (activeGroup)     ← classificação do grupo ativo
GroupMatches (activeGroup)   ← confrontos do grupo ativo
```

- `useSearchParams` para leitura/escrita de `?group=X`
- `useEffect` inicializa URL com `?group=A` na primeira renderização
- `aria-labelledby` no tabpanel aponta para o tab ativo

### `GroupDetailsPage` (`/groups/:groupId`)

```
Link: "← Groups"
h1: "Group A"                ← derivado do :groupId param
GroupTable (groupLetter)
GroupMatches (groupLetter)
```

- `GroupLetterSchema.safeParse(letter)` valida o param — redireciona para `/groups` se inválido
- Título `PageWrapper title={`Group ${groupLetter}`}` para `<h1 className="sr-only">`

---

## Dados mockados (`groups.mock.ts`)

### Grupos e seleções

| Grupo | Times (ShortName)  |
| ----- | ------------------ |
| A     | BRA, SUI, SRB, CMR |
| B     | ENG, USA, IRN, WAL |
| C     | ARG, POL, MEX, SAU |
| D     | FRA, AUS, DEN, TUN |
| E     | ESP, GER, JPN, CRC |
| F     | BEL, CRO, MAR, CAN |
| G     | POR, URU, KOR, GHA |
| H     | NED, SEN, ECU, QAT |

### Classificações (groupStandingsMockData)

4 posições por grupo com status de qualificação completo:

- Posição 1: `qualified` | Posição 2: `qualified` | Posição 3: `playoff` | Posição 4: `eliminated`

### Confrontos (groupMatchesMockData)

6 partidas por grupo (3 rodadas × 2 jogos):

| Grupos | Status   | Placar           |
| ------ | -------- | ---------------- |
| A – G  | finished | Resultados reais |
| H      | upcoming | Sem placar       |

---

## MSW Handlers adicionados

```ts
GET /groups                        → groupsMockData (array de 8 grupos)
GET /groups/:letter/standings      → groupStandingsMockData[letter] ou []
GET /groups/:letter/matches        → groupMatchesMockData[letter] ou []
```

---

## Query Keys

```ts
queryKeys.groups.all(); // ["groups"]
queryKeys.groups.lists(); // ["groups", "list"]
queryKeys.groups.standings("A"); // ["groups", "standings", "A"]
queryKeys.groups.matches("A"); // ["groups", "matches", "A"]
```

---

## Router

```ts
// src/routes/router.tsx
{ path: ROUTES.GROUPS,                 lazy: () => import(".../GroupsPage") }
{ path: `${ROUTES.GROUPS}/:groupId`,   lazy: () => import(".../GroupDetailsPage") }
```

Ambas as rotas usam `lazy:` nativo do React Router v7 — code splitting automático.

---

## Acessibilidade

| Elemento             | Atributo                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| `GroupTabs`          | `role="tablist"` + `aria-label="World Cup Groups"`                        |
| Cada tab button      | `role="tab"` + `aria-selected` + `aria-controls` + `aria-label="Group X"` |
| Tabpanel             | `role="tabpanel"` + `aria-labelledby="group-tab-X"`                       |
| `GroupTable`         | `role="region"` + `aria-label="Group A Standings"`                        |
| `QualificationBadge` | `aria-label` descritivo (e.g. "Qualified for knockout stage")             |
| Placar no card       | `aria-label="Score: 3 to 0"`                                              |
| `GroupCard` link     | `aria-label="Group A standings — view details"`                           |
| Bandeiras emoji      | `aria-hidden="true"` nos contextos decorativos                            |

---

## Testes

| Arquivo                       | Testes  |
| ----------------------------- | ------- |
| `groups.service.test.ts`      | 18      |
| `useGroups.test.tsx`          | 12      |
| `QualificationBadge.test.tsx` | 7       |
| `GroupTableRow.test.tsx`      | 7       |
| `GroupTable.test.tsx`         | 6       |
| `GroupMatchCard.test.tsx`     | 8       |
| `GroupMatches.test.tsx`       | 6       |
| `GroupCard.test.tsx`          | 6       |
| `GroupTabs.test.tsx`          | 6       |
| `GroupsPage.test.tsx`         | 8       |
| `GroupDetailsPage.test.tsx`   | 8       |
| **Total Etapa 09**            | **92**  |
| **Total acumulado**           | **444** |

---

## Decisões arquiteturais

### Adapter pattern para TheSportsDB

Os adapters em `src/features/groups/adapters/` isolam o formato da API externa dos tipos internos. O backend pode enriquecer o payload (ex.: adicionar `teamFlagEmoji`) ou trocar a fonte de dados sem impactar nenhum componente.

### URL sync com `useSearchParams`

`GroupsPage` usa `?group=A` na URL em vez de estado local. Isso permite:

- Compartilhar links diretos para um grupo específico
- Preservar estado ao navegar para `GroupDetailsPage` e voltar (`/groups?group=B`)
- Histórico de navegação com o botão Voltar

### `GroupLetterSchema.safeParse` na rota de detalhe

`GroupDetailsPage` valida o parâmetro `:groupId` com `safeParse` em vez de deixar um erro de runtime. Se o parâmetro for inválido (ex.: `/groups/z`), o componente redireciona para `/groups`.

---

## Próximas etapas sugeridas

- **Etapa 10** — Teams Feature: perfis de seleções, elencos, estatísticas históricas
- **Etapa 11** — Standings Feature: tabela geral do torneio com todas as fases
- **Etapa 12** — WebSocket integration: migrar partidas ao vivo para transporte real
- **Etapa 13** — E2E com Playwright: fluxos críticos Groups, navegação, responsivo
