# ADR 008 — Live Data & Realtime Strategy

**Status:** Aceito  
**Data:** 23/05/2026

---

## Contexto

A feature Live (Etapa 08) precisa exibir dados que mudam durante a partida: placar, minuto atual, eventos (gols, cartões), estatísticas e insights de IA. As opções técnicas para "realtime" são:

1. **WebSocket** — conexão persistente bidirecional
2. **Server-Sent Events (SSE)** — stream unidirecional do servidor
3. **Polling** — requisições HTTP periódicas
4. **Mock-driven** — dados estáticos sem atualização real (para development/MVP)

O projeto está em fase de **MVP com dados mockados**. Não há backend real com suporte a WebSocket ou SSE. A decisão precisa ser tomada levando em conta:

- Simplicidade de implementação com MSW
- Caminho de migração para produção real
- Experiência do usuário (latência tolerável para dados de futebol)

## Decisão

**Polling via `refetchInterval` do React Query**, com arquitetura preparada para substituição por WebSocket.

---

## Estratégia por tipo de dado

| Dado                                  | Intervalo | Justificativa                                         |
| ------------------------------------- | --------- | ----------------------------------------------------- |
| Lista de partidas ao vivo (`/live`)   | **5s**    | Novas partidas aparecem raramente; economiza requests |
| Detalhe da partida (`/live/:id`)      | **5s**    | Placar e minuto mudam frequentemente                  |
| Insights de IA (`/live/:id/insights`) | **15s**   | Análises são mais estáticas que o placar              |

---

## Implementação atual (polling)

```ts
// hooks/useLiveMatches.ts
useQuery({
  queryKey: queryKeys.live.lists(),
  queryFn: getLiveMatches,
  refetchInterval: 5_000, // 5 segundos
});

// hooks/useLiveInsights.ts
useQuery({
  queryKey: queryKeys.live.insights(matchId),
  queryFn: () => getLiveInsights(matchId),
  refetchInterval: 15_000, // 15 segundos
});
```

O `refetchInterval` é gerenciado pelo React Query internamente. Ele:

- Para automaticamente quando a aba está em background (`refetchIntervalInBackground: false` por padrão)
- Reinicia ao focar a janela
- Não faz polling quando a query está em erro

---

## Caminho de migração para WebSocket

A arquitetura foi desenhada para que a migração para WebSocket **não altere os componentes**. Apenas os hooks precisam mudar:

```ts
// Hoje (polling)
export function useLiveMatch(matchId: string) {
  return useQuery({
    queryKey: queryKeys.live.detail(matchId),
    queryFn: () => getLiveMatchById(matchId),
    refetchInterval: 5_000,
  });
}

// Futuro (WebSocket) — mesmo retorno, mesma interface
export function useLiveMatch(matchId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(`wss://api.wc26.io/live/${matchId}`);
    ws.onmessage = (event) => {
      const data = LiveMatchSchema.parse(JSON.parse(event.data));
      queryClient.setQueryData(queryKeys.live.detail(matchId), data);
    };
    return () => ws.close();
  }, [matchId, queryClient]);

  return useQuery({
    queryKey: queryKeys.live.detail(matchId),
    queryFn: () => getLiveMatchById(matchId), // fallback inicial
    staleTime: Infinity, // WebSocket mantém fresco
  });
}
```

**Componentes não mudam.** `useLiveMatch(id)` continua retornando `{ data, isLoading, isError }`.

---

## LiveTicker — estado local com useReducer

O `useLiveTicker` que rotaciona eventos na barra de ticker usa **estado local** (`useReducer`), não React Query:

```ts
type TickerAction = { type: "NEXT"; total: number } | { type: "PAUSE" } | { type: "RESUME" };

// setInterval para avançar item, sem fetch
// Pausa em mouseenter/focusin — acessibilidade
// Respeita prefers-reduced-motion — sem rotação automática
```

Isso porque o ticker é **apresentacional** — rota sobre dados já carregados, não busca dados novos.

---

## Mock-driven development

Durante o desenvolvimento, o MSW intercepta todas as chamadas:

```ts
// src/mocks/handlers.ts
http.get("/live", () => HttpResponse.json(liveMatchesMockData))
http.get("/live/:matchId", ({ params }) => { ... })
http.get("/live/:matchId/insights", ({ params }) => { ... })
```

Os dados mockados incluem:

- **2 partidas ao vivo** com stats, eventos e placar reais
- **6 ticker items** cobrindo gols, cartões e VAR
- **4 AI insights** com confidence entre 0–1

---

## Por que não WebSocket no MVP?

| Fator                           | WebSocket                       | Polling                     |
| ------------------------------- | ------------------------------- | --------------------------- |
| Complexidade de implementação   | Alta (server + client)          | Baixa                       |
| Compatibilidade com MSW         | Parcial (msw-socket-io-handler) | Nativa                      |
| Latência mínima                 | ~50ms                           | ~500ms–5s                   |
| Latência tolerável para futebol | —                               | ✅ (placar muda a cada min) |
| Fallback automático             | Manual                          | React Query nativo          |
| Migração futura                 | Transparente para componentes   | —                           |

Para dados de futebol ao vivo, um intervalo de 5 segundos é aceitável — gols e cartões não mudam em sub-segundo. O polling simplifica radicalmente o desenvolvimento e o teste.

---

## Alternativas consideradas

| Alternativa                                   | Motivo da rejeição                                            |
| --------------------------------------------- | ------------------------------------------------------------- |
| WebSocket (fase MVP)                          | Requer backend real; incompatível com MSW puro                |
| SSE (Server-Sent Events)                      | Suporte parcial no MSW; sem vantagem sobre polling no MVP     |
| React Query + `staleTime: 0` (refetch manual) | Sem atualização automática — UX ruim                          |
| SWR `refreshInterval`                         | React Query já instalado; sem motivo para adicionar outra lib |

## Consequências

- ✅ Desenvolvimento 100% com MSW — sem backend real necessário
- ✅ Componentes desacoplados do mecanismo de transporte
- ✅ Migração para WebSocket transparente (apenas hooks mudam)
- ✅ React Query gerencia o ciclo de vida do polling automaticamente
- ⚠️ Latência de 5s — aceitável para futebol, inaceitável para bolsa/trading
- ⚠️ Polling gera tráfego mesmo sem mudanças (sem delta updates)
