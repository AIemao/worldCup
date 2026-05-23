# Etapa 03 — Application Shell & Routing Foundation

## Status

✅ Concluída

## Objetivo

Construir o shell da aplicação com roteamento, gerenciamento de estado de tema, providers globais, layouts, páginas base e componentes de infraestrutura (loading, error, layout primitives).

## Pacotes instalados

```
react-router-dom
zustand
@tanstack/react-query
framer-motion
zod
```

## Arquitetura criada

### Configuração

| Arquivo                   | Propósito                                                             |
| ------------------------- | --------------------------------------------------------------------- |
| `src/config/constants.ts` | Constantes globais (`APP_NAME`, `THEME_STORAGE_KEY`, `ROUTES`)        |
| `src/types/common.ts`     | Tipos compartilhados (`Theme`, `ResolvedTheme`, `WithChildren`, etc.) |

### Store

| Arquivo                   | Propósito                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `src/store/themeStore.ts` | Zustand + persist. Gerencia tema (`dark/light/system`) e sincroniza `.dark` no DOM |

### Componentes de Layout (primitives)

| Componente    | Propósito                                                                  |
| ------------- | -------------------------------------------------------------------------- |
| `Container`   | Wrapper com max-width e padding horizontal responsivo. `size` e `as` props |
| `Section`     | Espaçamento vertical semântico via `<section>`. `spacing` prop             |
| `PageWrapper` | `<main>` com `<h1 aria-hidden>` para screen readers                        |

### Componentes de Loading

| Componente     | Propósito                                                                |
| -------------- | ------------------------------------------------------------------------ |
| `Spinner`      | SVG animado com `animate-spin`. Props: `size`, `label`, `className`      |
| `PageSkeleton` | Skeleton de página completa com `animate-pulse`. Exibido pelo `Suspense` |

### Componentes de Error

| Componente      | Propósito                                                            |
| --------------- | -------------------------------------------------------------------- |
| `ErrorBoundary` | Class component com `getDerivedStateFromError` + `componentDidCatch` |
| `ErrorFallback` | UI de fallback para `ErrorBoundary`. Props: `error`, `reset`         |

### Componentes de Tema

| Componente      | Propósito                                                                      |
| --------------- | ------------------------------------------------------------------------------ |
| `ThemeProvider` | Sincroniza o store com DOM no mount. Escuta mudanças de `prefers-color-scheme` |

### Layouts

| Layout       | Propósito                                                                     |
| ------------ | ----------------------------------------------------------------------------- |
| `RootLayout` | Camada externa — `ErrorBoundary` + `Suspense` + `<Outlet />`                  |
| `AppLayout`  | Shell visual — header glassmorphism + `AnimatePresence` para page transitions |

### Páginas

| Página         | Propósito                                             |
| -------------- | ----------------------------------------------------- |
| `HomePage`     | Placeholder da home. Usa layout primitives            |
| `NotFoundPage` | 404. Link de volta para home                          |
| `ErrorPage`    | `errorElement` do React Router. Usa `useRouteError()` |

### App

| Arquivo                 | Propósito                                                  |
| ----------------------- | ---------------------------------------------------------- |
| `src/routes/index.tsx`  | `createBrowserRouter` com lazy loading das páginas         |
| `src/app/providers.tsx` | `QueryClientProvider` + `ThemeProvider` + `RouterProvider` |

## Decisões técnicas

### Anti-FOUC

Script inline no `index.html` aplica `.dark` ao `<html>` antes do React renderizar.
Lê `localStorage['wc26-theme']` com o formato do Zustand persist (`state.theme`).
`ThemeProvider` sincroniza o store após o mount sem piscar.

### Dark mode via classe

`.dark` no `<html>` (não `prefers-color-scheme`). Permite controle explícito pelo usuário.

### Page transitions

`AnimatePresence mode="wait"` + `motion.div` keyed por `location.pathname`.
Transição: `opacity + y` em 180ms para sensação premium sem ser excessiva.

### Code splitting

Páginas em `lazy()`. Cada página gera um chunk separado no build.
Fallback via `Suspense` com `PageSkeleton`.

### ErrorBoundary vs errorElement

- `ErrorBoundary` (React): captura erros de render em componentes filhos
- `errorElement` (React Router): captura erros de loaders e erros de render na rota

Ambos estão configurados: `RootLayout` contém o `ErrorBoundary`, e a rota raiz tem `errorElement: <ErrorPage />`.

## Validação

```
npx tsc -p tsconfig.app.json --noEmit  ✅ sem erros
npm run build                           ✅ 2229 módulos, code splitting OK
npx vitest run                          ✅ 4/4 testes passando
```

## Build output

```
dist/assets/HomePage-*.js        0.62 kB
dist/assets/NotFoundPage-*.js    0.89 kB
dist/assets/index-*.js         472.43 kB (vendors: react, router, query, framer-motion)
```

## Próxima etapa

**Etapa 04** — Feature shell: Navigation, Hero section, dados mockados, componentes de feature.
