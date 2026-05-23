# Etapa 05 — Homepage Composition Foundation

## Status

✅ Concluída

## Objetivo

Implementar a homepage composta com dados reais (mock), seções de conteúdo premium e a fundação de acesso a dados da feature `home`: tipos Zod, mock data, hook de dados e 5 componentes de seção com testes e Storybook stories.

---

## Correções de infraestrutura (pré-requisito)

### Extração de CVA variants para arquivos `.variants.ts`

**Problema**: Arquivos `.tsx` que exportavam simultaneamente um componente React **e** definições CVA ativavam o lint `react-refresh/only-export-components` — que exige que arquivos TSX exportem **apenas** componentes React.

**Solução**: Separar em dois arquivos por componente:

```
ComponentName/
├── component-name.variants.ts   ← CVA + VariantProps (TypeScript puro)
├── ComponentName.tsx            ← Apenas o componente React
└── index.ts                     ← Re-exporta ambos
```

Componentes refatorados:

| Componente   | Arquivo de variants criado |
| ------------ | -------------------------- |
| `Button`     | `button.variants.ts`       |
| `Badge`      | `badge.variants.ts`        |
| `Card`       | `card.variants.ts`         |
| `GlassPanel` | `glass-panel.variants.ts`  |
| `Grid`       | `grid.variants.ts`         |
| `Heading`    | `heading.variants.ts`      |
| `Text`       | `text.variants.ts`         |

### Refatoração do router (`src/routes/router.tsx`)

**Problema**: Usar `React.lazy()` + `element: <JSX />` dentro de `router.tsx` combinava exportação de componentes (`const HomePage = lazy(...)`) com exportação de valor (`export const router`) num mesmo arquivo TSX — ativando `react-refresh/only-export-components`.

**Solução**: React Router v7 oferece lazy loading nativo via propriedade `lazy:` no route object, sem precisar de `React.lazy` ou JSX no router:

```tsx
// ✅ Correto — sem JSX, sem React.lazy, sem false positives
export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            path: ROUTES.HOME,
            lazy: () => import("@/pages/HomePage").then((m) => ({ Component: m.HomePage })),
          },
        ],
      },
    ],
  },
]);
```

Arquivos adicionados:

| Arquivo                         | Conteúdo                                                 |
| ------------------------------- | -------------------------------------------------------- |
| `src/routes/router.tsx`         | Configuração central do router (sem JSX)                 |
| `src/routes/route.constants.ts` | Re-exporta `ROUTES` e `AppRoute` de `@/config/constants` |
| `src/routes/route.types.ts`     | `RouteHandle` type (`title`, `breadcrumb`, `showInNav`)  |

### Componente `AppNav`

Barra de navegação principal extraída do `AppLayout` para componente isolado testável.

```tsx
// src/components/navigation/AppNav/AppNav.tsx
export function AppNav({ className }: { className?: string }) {
  // Mapeia NAV_ITEMS sobre <NavLink> com active styling automático
}
```

- Usa `aria-label="Main navigation"` no elemento `<nav>`
- Suporta `className` customizado para responsividade (`hidden md:flex`)
- `AppLayout` usa `<AppNav className="hidden md:flex" />`
- Testado com `MemoryRouter` (3 testes: acessibilidade, links, className)

---

## Decisões de arquitetura

### Feature-based folder structure

Todo código relacionado à homepage vive em `src/features/home/`:

```
src/features/home/
├── index.ts                     ← Barrel público da feature
├── types/
│   └── home.types.ts            ← Zod schemas + TypeScript types
├── data/
│   └── home.mock.ts             ← Mock data (jogo de abertura MEX vs USA)
├── hooks/
│   └── useHomeData.ts           ← Hook de acesso a dados
└── components/
    ├── SectionHeader/
    ├── StatsBar/
    ├── HeroSection/
    ├── FeaturedMatchCard/
    └── CTABlock/
```

### Separação de responsabilidades

```
Dados → useHomeData → HomePage → Seções de UI
```

- `useHomeData` é a única fonte de dados para a homepage
- Hoje retorna mock; na Etapa 06 será substituído por `useQuery` + API service — **sem alterar a interface dos componentes**
- Componentes de seção são "burros" (dumb): recebem props, renderizam UI

### Schema-first com Zod

Todos os tipos da feature são inferidos de schemas Zod (`z.infer<typeof Schema>`), garantindo validação em runtime quando os dados vierem da API real.

---

## Data layer (`src/features/home/`)

### `home.types.ts`

| Schema                 | Tipo inferido    | Descrição                                                           |
| ---------------------- | ---------------- | ------------------------------------------------------------------- |
| `MatchStatusSchema`    | `MatchStatus`    | `"upcoming" \| "live" \| "finished"`                                |
| `TeamRefSchema`        | `TeamRef`        | id, name, shortName, flagEmoji, primaryColor                        |
| `MatchScoreSchema`     | `MatchScore`     | `{ home: number; away: number }`                                    |
| `FeaturedMatchSchema`  | `FeaturedMatch`  | Partida completa com equipes, venue, status                         |
| `TournamentStatSchema` | `TournamentStat` | `{ id, label, value: string\|number, suffix? }`                     |
| `HomeDataSchema`       | `HomeData`       | `{ featuredMatch: FeaturedMatch \| null; stats: TournamentStat[] }` |

### `home.mock.ts`

Partida de abertura do torneio:

```ts
featuredMatch: {
  id: "wc26-opening-match",
  homeTeam: { shortName: "MEX", flagEmoji: "🇲🇽", primaryColor: "#006847" },
  awayTeam: { shortName: "USA", flagEmoji: "🇺🇸", primaryColor: "#B22234" },
  scheduledAt: "2026-06-11T20:00:00Z",
  venue: "Estadio Azteca",
  city: "Mexico City",
  status: "upcoming",
  round: "Group Stage — Group A",
}

stats: [
  { id: "teams",        label: "Teams",        value: 48 },
  { id: "host-nations", label: "Host Nations",  value: 3  },
  { id: "matches",      label: "Matches",       value: 104 },
  { id: "venues",       label: "Venues",        value: 16 },
]
```

### `useHomeData.ts`

```ts
export function useHomeData(): { data: HomeData; isLoading: boolean; isError: boolean };
```

Interface estável: na Etapa 06 o corpo será trocado por `useQuery` sem quebrar consumidores.

---

## Componentes de seção

### `SectionHeader`

```tsx
type SectionHeaderProps = {
  label?: string; // eyebrow em brand color, uppercase
  title: string; // heading principal
  description?: string; // subtítulo opcional
  action?: ReactNode; // CTA slot opcional
  align?: "left" | "center";
  className?: string;
};
```

- `label` renderiza em `text-brand text-xs tracking-widest uppercase`
- `align="center"` ativa `items-center text-center`

### `StatsBar`

```tsx
type StatsBarProps = { stats: TournamentStat[] };
```

- `section` com `aria-label="Tournament statistics"`
- Grid `2 cols` (mobile) → `4 cols` (sm+)
- Valor numérico em `text-brand text-3xl font-extrabold`
- Envolto em `GlassPanel intensity="low"`
- `StaggerList` com `staggerDelay={0.08}` para entrada escalonada
- Retorna `null` quando `stats` é vazio

### `HeroSection`

Seção principal acima do fold — cinematic e imersiva:

- `min-h-[88vh]` com conteúdo centralizado
- Fundo com `radial-gradient` em azul elétrico (oklch brand) no rodapé
- Sequência de entrada animada com `FadeIn` + `SlideIn`:
  1. Badge "FIFA World Cup 2026" (`delay: 0.1`)
  2. Heading "WORLD CUP / **2026**" com `text-[clamp(3.5rem,10vw,8rem)]` (`delay: 0.25`)
  3. Host nations com `aria-label` (`delay: 0.45`)
  4. Descrição (`delay: 0.6`)
  5. Dois CTAs (`delay: 0.75`)
- `2026` tem `drop-shadow` de 40px em brand color para efeito glow
- CTAs: `Button variant="glow"` → `/matches` + `Button variant="outline"` → `/teams`
- `section` com `aria-label="World Cup 2026 hero"`

### `FeaturedMatchCard`

```tsx
type FeaturedMatchCardProps = { match: FeaturedMatch };
```

- Layout: `Card variant="glass"` com header, content e footer
- Header: round label (esquerda) + `MatchStatusBadge` (direita)
- Content: grid `1fr auto 1fr` — equipe casa | placar/vs | equipe visitante
- Status → variant do badge: `live` → `success` + `animate-pulse`, `upcoming` → `brand`, `finished` → `default`
- Placar tem `aria-label="Score: X - Y"` para acessibilidade
- Upcoming mostra "vs" + data/hora formatada via `Intl.DateTimeFormat`
- Footer: "View Match Details" button outline

### `CTABlock`

```tsx
type CTABlockProps = { title?: string; description?: string };
```

- Props têm defaults (não quebra sem props)
- `radial-gradient` sutil ao centro
- `FadeIn` no título e descrição + `SlideIn direction="up"` nos botões
- Dois CTAs: View Full Schedule → `/matches` · Explore Groups → `/groups`
- `section` com `aria-label="Call to action"`

---

## Composição da `HomePage`

```tsx
export function HomePage() {
  const { data } = useHomeData();

  return (
    <PageWrapper title="Home — World Cup 2026">
      <HeroSection />
      <StatsBar stats={data.stats} />
      <Section>
        <SectionHeader label="Opening Match" title="Featured Fixture" ... />
        <FeaturedMatchCard match={data.featuredMatch} />
      </Section>
      <CTABlock />
    </PageWrapper>
  );
}
```

---

## Testes

| Suite                        | Testes | Destaques                                                    |
| ---------------------------- | ------ | ------------------------------------------------------------ |
| `SectionHeader.test.tsx`     | —      | Renderização de label, title, description, action, align     |
| `StatsBar.test.tsx`          | 5      | Valores, suffix, aria-label, lista vazia retorna null        |
| `HeroSection.test.tsx`       | 7      | Heading, badge, host nations aria-label, links, region label |
| `FeaturedMatchCard.test.tsx` | 8      | Teams, flags, status badges, placar com aria-label, venue    |
| `CTABlock.test.tsx`          | 6      | Título padrão/custom, description, links, region label       |

**Total acumulado: 136 testes · 21 suites — todos passando**

---

## Convenções reforçadas

- `import type` obrigatório para importações type-only (TypeScript 6 `verbatimModuleSyntax`)
- Todos os componentes com `section` semântico usam `aria-label` descritivo
- Nenhum componente `.tsx` exporta CVA variants — apenas o componente React
- Testes usam `MemoryRouter` quando o componente contém `<Link>`
- Stories com `MemoryRouter` decorator quando necessário
- `afterEach(() => cleanup())` explícito em todos os test files (Vitest `globals: false`)
