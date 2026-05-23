# ADR 005 — State Management Strategy

**Status:** Aceito  
**Data:** 23/05/2026

---

## Contexto

O projeto tem dois tipos de estado com ciclos de vida completamente distintos:

1. **Server state** — dados vindos de APIs (partidas, grupos, times, standings). Têm ciclo de vida gerenciado pelo servidor: cache, stale time, refetch, retry.
2. **UI state** — preferências e controles da interface (tema, filtros ativos, sidebar aberta). Pertencem ao cliente e nunca são sincronizados com o servidor.

Misturar os dois em uma única solução (Redux/Zustand para tudo, ou React Query para tudo) gera acoplamento desnecessário e código mais complexo de manter.

## Decisão

**Separação rígida por tipo de estado:**

| Tipo de estado              | Ferramenta                          | Localização                        |
| --------------------------- | ----------------------------------- | ---------------------------------- |
| Server state (dados de API) | **React Query (TanStack Query v5)** | `src/api/queries/` + feature hooks |
| UI state (cliente)          | **Zustand**                         | `src/store/`                       |
| Local component state       | `useState` / `useReducer`           | No próprio componente              |

### React Query — server state

```ts
// Query keys centralizadas — nunca inline
export const queryKeys = {
  matches: {
    all: ["matches"],
    lists: () => [...queryKeys.matches.all, "list"],
    list: (filters?) => [...queryKeys.matches.lists(), filters ?? {}],
    detail: (id) => [...queryKeys.matches.all, "detail", id],
  },
  live: {
    all: ["live"],
    lists: () => [...queryKeys.live.all, "list"],
    detail: (id) => [...queryKeys.live.all, "detail", id],
    insights: (id) => [...queryKeys.live.all, "insights", id],
  },
};

// Defaults globais do QueryClient
{
  staleTime: 5 * 60 * 1000,     // 5 min
  retry: 1,
  refetchOnWindowFocus: false,
}

// Live data usa refetchInterval para simular realtime
useQuery({ refetchInterval: 5_000 })  // partidas ao vivo
useQuery({ refetchInterval: 15_000 }) // insights (mais estático)
```

### Zustand — UI state

```ts
// Permitido no Zustand
useThemeStore; // dark/light/system + persist
useFiltersStore; // filtros de lista client-side (se global)

// Proibido no Zustand
// ❌ dados de API
// ❌ estado derivado de server data
// ❌ loading / error states (esses pertencem ao React Query)
```

### useState / useReducer — local state

Preferir para estado que:

- Pertence exclusivamente a um componente
- Não precisa ser compartilhado entre rotas
- Tem lógica de transição bem definida (ex: `useLiveTicker` usa `useReducer`)

## Alternativas consideradas

| Alternativa                      | Motivo da rejeição                                                        |
| -------------------------------- | ------------------------------------------------------------------------- |
| Redux Toolkit para tudo          | Over-engineering; boilerplate excessivo para este porte                   |
| Zustand para server state também | Perde cache automático, stale-while-revalidate, retry, devtools           |
| Context API para UI state        | Re-renders desnecessários sem `memo` manual; Zustand já instalado         |
| SWR em vez de React Query        | React Query tem mais features (query keys, mutations, optimistic updates) |

## Regra de ouro

> Se o dado vem de um servidor ou será enviado a um servidor, use React Query.  
> Se o dado existe apenas no cliente, use Zustand.  
> Se o dado existe apenas em um componente, use useState.

## Consequências

- ✅ Server state com cache, invalidação e retry automáticos
- ✅ Dados de API nunca ficam desatualizados sem necessidade
- ✅ UI state leve, sem boilerplate
- ✅ Polling de live data isolado nos hooks da feature
- ✅ Testabilidade — hooks de server state são testados com MSW, Zustand com renderHook
- ⚠️ Desenvolvedores precisam entender a separação para não colocar server data no Zustand
