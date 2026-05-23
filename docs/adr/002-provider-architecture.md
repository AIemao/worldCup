# ADR 002 — Provider Architecture

**Status:** Aceito  
**Data:** 23/05/2026

---

## Contexto

SPAs React com múltiplos providers tendem a ter um `main.tsx` com "provider hell":

```tsx
<StrictMode>
  <QueryClientProvider>
    <RouterProvider>
      <ThemeProvider>
        <ToastProvider>
          <App />
```

Isso dificulta testes, manutenção e onboarding.

## Decisão

Centralizar todos os providers em **`src/app/providers.tsx`** como um único `<AppProviders>` component.

## Hierarquia de providers

```
StrictMode                    ← main.tsx (React interno)
  └── AppProviders            ← src/app/providers.tsx
        ├── QueryClientProvider   (React Query — server state)
        ├── ThemeProvider         (tema do sistema)
        └── RouterProvider        (roteamento)
              └── RootLayout      (ErrorBoundary + Suspense)
                    └── AppLayout (shell visual)
                          └── <pages>
```

## Por que RouterProvider dentro de AppProviders?

O `QueryClientProvider` e `ThemeProvider` precisam estar **fora** do router para:

1. Persistir o cache de dados entre navegações
2. Aplicar o tema antes da primeira renderização

## QueryClient defaults

```typescript
{
  staleTime: 5 * 60 * 1000,   // 5 min — dados de copa mudam pouco
  retry: 1,                    // retry 1x em erro de rede
  refetchOnWindowFocus: false, // sem refetch automático ao focar a janela
}
```

## Alternativas consideradas

| Alternativa                       | Motivo da rejeição                        |
| --------------------------------- | ----------------------------------------- |
| Providers diretamente em main.tsx | "Provider hell" — difícil manutenção      |
| Provider por feature              | Over-engineering para este estágio        |
| Zustand para tudo                 | Zustand é para UI state, não server state |

## Consequências

- ✅ `main.tsx` permanece limpo (uma linha)
- ✅ Fácil adicionar/remover providers
- ✅ `AppProviders` pode ser reutilizado em testes (`renderWithProviders`)
- ✅ Separação clara: server state (React Query) vs UI state (Zustand)
