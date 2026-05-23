# ADR 007 — Feature Architecture

**Status:** Aceito  
**Data:** 23/05/2026

---

## Contexto

Com múltiplas features crescendo em paralelo (matches, live, groups, teams, standings), precisamos de uma arquitetura de organização de código que:

- Escale sem conflitos entre times/features
- Torne o domínio de cada feature auto-contido
- Evite importações circulares e acoplamento entre features
- Facilite deleção de features sem efeitos colaterais
- Mantenha os componentes reutilizáveis separados dos específicos de feature

## Decisão

**Feature-based architecture** com camadas internas padronizadas.

---

## Estrutura de diretórios

```
src/
├── app/                  ← bootstrap (providers, root)
├── assets/               ← imagens, fonts, ícones estáticos
├── components/           ← componentes GLOBAIS reutilizáveis
│   ├── error/            ← ErrorFallback
│   ├── layout/           ← Container, Section, PageWrapper
│   ├── loading/          ← Skeleton, PageSkeleton
│   ├── motion/           ← FadeIn, SlideIn, ScaleIn, StaggerList
│   ├── navigation/       ← AppNav, NavLink
│   ├── typography/       ← Heading, Text
│   └── ui/               ← Badge, GlassPanel, Separator
├── config/               ← constantes, ROUTES, APP_NAME
├── features/             ← features de domínio
│   ├── home/
│   ├── matches/
│   ├── live/
│   ├── groups/           ← futuro
│   ├── teams/            ← futuro
│   └── standings/        ← futuro
├── hooks/                ← hooks globais (useMediaQuery, etc.)
├── layouts/              ← AppLayout, RootLayout
├── lib/                  ← utils (cn, formatters)
├── mocks/                ← MSW handlers + server
├── pages/                ← páginas genéricas (HomePage, NotFoundPage, ErrorPage)
├── routes/               ← router.tsx + route.constants.ts
├── store/                ← Zustand stores globais
├── styles/               ← globals.css (Tailwind + tokens)
├── tests/                ← setup.ts, test utils
├── types/                ← tipos globais (api.types.ts, etc.)
└── api/
    ├── client/           ← httpClient, ApiError
    ├── config/           ← QueryClient
    └── queries/          ← queryKeys factory
```

---

## Estrutura interna de uma feature

```
src/features/<nome>/
├── types/
│   ├── <nome>.types.ts   ← Zod schemas + tipos inferidos (FONTE DA VERDADE)
│   └── index.ts
├── data/
│   ├── <nome>.mock.ts    ← dados para dev/test
│   └── index.ts
├── services/
│   ├── <nome>.service.ts        ← funções de API (sem React)
│   ├── <nome>.service.test.ts
│   └── index.ts
├── hooks/
│   ├── use<Nome>.ts             ← hooks React Query
│   ├── use<Nome>.test.tsx
│   └── index.ts
├── components/
│   └── <ComponentName>/
│       ├── <ComponentName>.tsx
│       ├── <ComponentName>.test.tsx
│       ├── <ComponentName>.stories.tsx
│       ├── <component-name>.variants.ts  ← CVA (se aplicável)
│       └── index.ts
├── pages/
│   └── <PageName>/
│       ├── <PageName>.tsx
│       ├── <PageName>.test.tsx
│       └── index.ts
└── index.ts              ← barrel export da feature
```

---

## Regras de importação

### ✅ Permitido

```ts
// Feature importa de components/ globais
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FadeIn } from "@/components/motion/FadeIn";

// Feature importa de outra feature apenas os tipos públicos
// (quando há relação genuína de domínio)
import type { MatchEvent } from "@/features/matches/types/match.types";

// Feature importa do próprio barrel
import { LiveMatch } from "../types";
import { useLiveMatches } from "../hooks";
```

### ❌ Proibido

```ts
// Feature importar componentes internos de outra feature diretamente
import { MatchCard } from "@/features/matches/components/MatchCard/MatchCard";

// Importação circular
// live/hooks/useLiveMatch.ts → matches/hooks/useMatches.ts → live/...

// Componentes de página importando services diretamente
// (deve passar pelo hook)
import { getLiveMatches } from "../services"; // em um componente .tsx
```

---

## CVA — Variants em arquivo separado

Componentes com variantes CVA **obrigatoriamente** separam as variantes em arquivo `.variants.ts`:

```ts
// ❌ Proibido: variants no .tsx
// Viola a regra react-refresh/only-export-components

// ✅ Obrigatório
// live-badge.variants.ts
export const liveBadgeVariants = cva("...", { variants: {...} });

// LiveBadge.tsx
import { liveBadgeVariants } from "./live-badge.variants";
```

**Motivo:** A regra ESLint `react-refresh/only-export-components` proíbe exportar não-componentes de arquivos `.tsx`. CVA variants são funções, não componentes.

---

## Barrel exports

Cada pasta com múltiplos arquivos exporta via `index.ts`:

```ts
// src/features/live/index.ts
export { LiveBadge } from "./components/LiveBadge";
export { useLiveMatches } from "./hooks/useLiveMatches";
export type { LiveMatch } from "./types";
```

**Regra para `export type` vs `export`:**

- Usar `export type` para tipos/interfaces
- Usar `export` para valores (funções, componentes, constantes)
- Nunca misturar no mesmo statement quando há conflito de nome

---

## Componentes vs. Páginas

|                  | Componentes                         | Páginas                              |
| ---------------- | ----------------------------------- | ------------------------------------ |
| **Localização**  | `features/<nome>/components/`       | `features/<nome>/pages/`             |
| **Reutilização** | Podem ser usados em outras features | Não são reutilizadas                 |
| **Storybook**    | Obrigatório                         | Não requerido                        |
| **Props**        | Props explícitas (sem `useParams`)  | Pode usar `useParams`, `useNavigate` |
| **Router**       | Não conhecem o router               | Integradas ao router                 |

---

## Alternativas consideradas

| Alternativa                                                 | Motivo da rejeição                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------- |
| Organização por tipo (`components/`, `hooks/`, `services/`) | Escala mal; features relacionadas ficam espalhadas            |
| Monorepo por feature (packages)                             | Over-engineering para este porte                              |
| Atomic Design                                               | Mistura UI com domínio; não mapeia bem para features          |
| Colocation total (tudo no mesmo arquivo)                    | Viola o limite de 250 linhas por componente; dificulta testes |

## Consequências

- ✅ Feature deletável sem efeitos colaterais em outras features
- ✅ Onboarding rápido — estrutura previsível
- ✅ Sem importações circulares por convenção
- ✅ Componentes reutilizáveis claramente separados dos específicos de feature
- ⚠️ Features com relação de domínio real (ex: `live` importa tipos de `matches`) precisam de cuidado para não criar acoplamento excessivo
