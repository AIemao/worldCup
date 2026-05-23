# World Cup 2026 AI Experience

> Uma SPA cinematográfica e imersiva para a Copa do Mundo 2026 — estética de broadcast esportivo premium, animações fluidas e experiência em tempo real.

[![CI](https://github.com/AIemao/world-cup-2026-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/AIemao/world-cup-2026-ai/actions/workflows/ci.yml)
[![E2E](https://github.com/AIemao/world-cup-2026-ai/actions/workflows/e2e.yml/badge.svg)](https://github.com/AIemao/world-cup-2026-ai/actions/workflows/e2e.yml)
[![Storybook](https://github.com/AIemao/world-cup-2026-ai/actions/workflows/storybook.yml/badge.svg)](https://github.com/AIemao/world-cup-2026-ai/actions/workflows/storybook.yml)

---

## Screenshots

> Em breve — à medida que as features visuais forem implementadas.

---

## Stack

| Camada           | Tecnologia                               |
| ---------------- | ---------------------------------------- |
| Framework        | React 19 + TypeScript 6                  |
| Build            | Vite 8                                   |
| Estilização      | TailwindCSS v4 + shadcn/ui               |
| Animações        | Framer Motion 12                         |
| Roteamento       | React Router v7                          |
| Estado global    | Zustand v5                               |
| Estado servidor  | TanStack Query v5                        |
| Validação        | Zod v4                                   |
| Testes unitários | Vitest v4 + Testing Library              |
| Testes E2E       | Playwright                               |
| Mocking          | MSW v2                                   |
| Storybook        | Storybook 10                             |
| Linting          | ESLint 10 + typescript-eslint            |
| Formatação       | Prettier 3 + prettier-plugin-tailwindcss |
| Git hooks        | Husky + lint-staged                      |

---

## Arquitetura

```
src/
├── app/            # Providers globais (QueryClient, ThemeProvider, Router)
├── assets/         # Imagens, ícones, fontes estáticas
├── components/     # Design system — primitivos reutilizáveis
│   ├── ui/         # Button, Badge, Card, GlassPanel, Separator
│   ├── typography/ # Heading, Text
│   ├── motion/     # FadeIn, SlideIn, ScaleIn, StaggerList
│   ├── layout/     # Grid
│   ├── loading/    # Skeleton, PageSkeleton
│   ├── navigation/ # NavLink
│   ├── error/      # ErrorBoundary, ErrorFallback
│   └── theme/      # ThemeProvider
├── config/         # Constantes globais (APP_NAME, ROUTES, THEME_STORAGE_KEY)
├── features/       # Features por domínio (matches, groups, teams, standings)
├── hooks/          # Custom hooks reutilizáveis
├── layouts/        # RootLayout, AppLayout
├── pages/          # HomePage, NotFoundPage, ErrorPage
├── routes/         # Configuração do React Router
├── services/       # Camada de API centralizada
├── store/          # Zustand stores (themeStore)
├── styles/         # CSS global (index.css com tokens TailwindCSS v4)
├── tests/          # Setup de testes (MSW, mocks)
├── types/          # Tipos TypeScript compartilhados
└── utils/          # Utilitários puros
```

### Layouts aninhados

```
RootLayout        ← ErrorBoundary global + Suspense
  AppLayout       ← Header glassmorphism + page transitions (AnimatePresence)
    Page          ← conteúdo da rota
```

### Tokens de design

- **Brand color**: `oklch(0.65 0.26 264)` — electric blue WC26
- **Glow shadows**: `shadow-glow-sm` / `shadow-glow` / `shadow-glow-lg` / `shadow-glow-xl`
- **Dark mode**: via classe `.dark` no `<html>` — nunca `prefers-color-scheme` no CSS

---

## Setup

### Requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
git clone https://github.com/AIemao/world-cup-2026-ai.git
cd worldCup
npm install
```

### Variáveis de ambiente

O projeto não requer variáveis de ambiente para desenvolvimento local. Para integrações futuras (APIs FIFA, WebSockets), as variáveis serão documentadas em `.env.example`.

| Variável | Descrição                       | Obrigatório |
| -------- | ------------------------------- | ----------- |
| —        | Nenhuma necessária por enquanto | —           |

---

## Scripts

```bash
# Desenvolvimento
npm run dev              # Inicia o servidor de desenvolvimento (localhost:5173)
npm run preview          # Serve o build de produção localmente

# Build
npm run build            # TypeScript check + Vite build para produção

# Qualidade de código
npm run typecheck        # TypeScript sem emissão de arquivos
npm run lint             # ESLint (zero warnings tolerados)
npm run lint:fix         # ESLint com auto-fix
npm run format           # Prettier — formata todos os arquivos
npm run format:check     # Prettier — só verifica, não altera

# Testes
npm run test             # Vitest em modo watch
npm run test:run         # Vitest — execução única
npm run test:coverage    # Vitest com relatório de cobertura (lcov + html)
npm run test:ui          # Vitest UI (interface visual no browser)
npm run test:e2e         # Playwright E2E
npm run test:e2e:ui      # Playwright com UI interativa

# Storybook
npm run storybook        # Storybook em modo dev (localhost:6006)
npm run build-storybook  # Build estático do Storybook
```

---

## Testes

### Estratégia

| Tipo       | Framework                      | Escopo                                            |
| ---------- | ------------------------------ | ------------------------------------------------- |
| Unitários  | Vitest + Testing Library       | Utilities, hooks, stores, serviços                |
| Integração | Vitest + Testing Library + MSW | Componentes, features, fluxos de usuário          |
| E2E        | Playwright                     | Jornadas críticas, responsividade, acessibilidade |

### Executar testes

```bash
# Testes unitários + integração (com coverage)
npm run test:coverage

# E2E (requer server — Playwright inicia automaticamente)
npm run test:e2e
```

### Cobertura

O relatório HTML de coverage é gerado em `coverage/index.html` após `npm run test:coverage`.

---

## Design System

O design system é documentado no **Storybook**. Execute `npm run storybook` e acesse `localhost:6006`.

### Componentes disponíveis

| Categoria  | Componentes                                          |
| ---------- | ---------------------------------------------------- |
| UI         | `Button`, `Badge`, `Card`, `GlassPanel`, `Separator` |
| Tipografia | `Heading`, `Text`                                    |
| Motion     | `FadeIn`, `SlideIn`, `ScaleIn`, `StaggerList`        |
| Layout     | `Grid`                                               |
| Loading    | `Skeleton`                                           |
| Navegação  | `NavLink`                                            |

### Variantes de Button

```tsx
<Button variant="primary" size="md">Action</Button>
<Button variant="glow">Glow CTA</Button>
<Button variant="outline" asChild><Link to="/matches">Matches</Link></Button>
```

### Glassmorphism

```tsx
<GlassPanel intensity="high" glow="md">
  Conteúdo premium
</GlassPanel>
```

---

## ADRs

Decisões de arquitetura documentadas em [`docs/adr/`](docs/adr/):

| ADR                                          | Decisão                                |
| -------------------------------------------- | -------------------------------------- |
| [001](docs/adr/001-routing-strategy.md)      | React Router v7 com Data Router API    |
| [002](docs/adr/002-provider-architecture.md) | Composição de providers                |
| [003](docs/adr/003-theme-architecture.md)    | Dark mode via classe `.dark` + Zustand |
| [004](docs/adr/004-layout-strategy.md)       | 3 camadas de layout + 3 primitivos     |

---

## Etapas do projeto

| Etapa | Descrição                                                             | Status |
| ----- | --------------------------------------------------------------------- | ------ |
| 01    | TailwindCSS v4 + shadcn/ui setup                                      | ✅     |
| 02    | Tooling (ESLint, Prettier, Husky, Vitest, Playwright, MSW, Storybook) | ✅     |
| 03    | App shell + routing foundation                                        | ✅     |
| 04    | Design system foundation                                              | ✅     |
| 04.5  | Repository & CI foundation                                            | ✅     |
| 05    | Navigation & Hero section                                             | ✅     |
| 06    | Data layer (MSW handlers, React Query hooks, Zod schemas)             | ✅     |
| 07    | Match features foundation                                             | ✅     |
| 08    | Teams & Standings                                                     | 🔜     |

---

## Contribuindo

Leia o guia completo em [`docs/contributing.md`](docs/contributing.md).
