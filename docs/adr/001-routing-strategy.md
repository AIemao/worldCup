# ADR 001 — Routing Strategy

**Status:** Aceito  
**Data:** 23/05/2026

---

## Contexto

O projeto é uma SPA (Single Page Application) sem SSR. Precisamos de:

- Navegação client-side com URLs amigáveis
- Code splitting por rota (performance)
- Tratamento de erros por rota
- Layouts aninhados
- Preparação para data loaders futuros (match fixtures, standings)

## Decisão

Usar **React Router v7** com `createBrowserRouter` (Data Router API).

## Estrutura de rotas

```
/                  → HomePage         (AppLayout)
/groups            → GroupsPage       (AppLayout) — Etapa futura
/matches           → MatchesPage      (AppLayout) — Etapa futura
/teams/:id         → TeamPage         (AppLayout) — Etapa futura
/standings         → StandingsPage    (AppLayout) — Etapa futura
/*                 → NotFoundPage
```

## Lazy loading

Cada página é carregada com `React.lazy()` + `Suspense`. O `PageSkeleton` é exibido durante o carregamento. Isso garante:

- Bundle inicial menor (somente o shell carrega)
- Code splitting automático pelo Vite

## Arquitetura de layouts aninhados

```
createBrowserRouter
  └── RootLayout          (ErrorBoundary global + Suspense)
        ├── AppLayout     (Header + AnimatePresence + Outlet)
        │     └── páginas individuais (lazy)
        └── NotFoundPage  (sem AppLayout)
```

## Alternativas consideradas

| Alternativa              | Motivo da rejeição                                    |
| ------------------------ | ----------------------------------------------------- |
| React Router v6 (legado) | v7 é o atual; v6 não tem `createBrowserRouter` nativo |
| TanStack Router          | Excelente, mas mudança de ecossistema desnecessária   |
| Next.js App Router       | SSR não é necessário; aumentaria complexidade         |
| Wouter                   | Sem suporte a layouts aninhados nativos               |

## Consequências

- ✅ Suporte nativo a layouts aninhados
- ✅ `errorElement` por rota (sem crash global)
- ✅ Preparado para loaders de dados futuros
- ✅ Code splitting automático
- ⚠️ API de loaders ainda não utilizada (adicionada em etapas futuras)
