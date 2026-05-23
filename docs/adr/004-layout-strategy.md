# ADR 004 — Layout Strategy

**Status:** Aceito  
**Data:** 23/05/2026

---

## Contexto

O projeto tem uma estética broadcast esportiva com:

- Layout fluido responsivo (mobile → ultrawide)
- Hierarquia visual forte (seções bem definidas)
- Header fixo com glassmorphism
- Transições de página cinematográficas

Precisamos de uma camada de layout composable que não force estilos nas páginas.

## Decisão

**3 camadas de layout** + **3 primitivos de composição**.

### Camadas de layout

```
RootLayout     ← ErrorBoundary global + Suspense
  AppLayout    ← Header fixo + AnimatePresence (transições de página)
    Page       ← conteúdo da rota
```

### Primitivos de composição

```tsx
<Container size="xl">    // max-width wrapper (sem padding vertical)
<Section spacing="lg">   // padding vertical semântico + <section>
<PageWrapper title="..."> // wrapper de página (main semântico + title sr-only)
```

## Uso típico de uma página

```tsx
export function MatchesPage() {
  return (
    <PageWrapper title="Matches">
      <Section spacing="lg">
        <Container size="xl">{/* conteúdo */}</Container>
      </Section>
    </PageWrapper>
  );
}
```

## Container sizes

| Size   | Max-width | Uso                  |
| ------ | --------- | -------------------- |
| `sm`   | 672px     | Formulários, artigos |
| `md`   | 896px     | Conteúdo editorial   |
| `lg`   | 1024px    | Layout padrão        |
| `xl`   | 1280px    | Dashboard principal  |
| `2xl`  | 1536px    | Suporte ultrawide    |
| `full` | 100%      | Full-bleed           |

## Transições de página

Framer Motion com `AnimatePresence` + `motion.main` no `AppLayout`. Keyado pelo `location.pathname`. Spring animation suave (200ms, `easeOut`).

## Header

`sticky top-0` com `backdrop-blur-md` e `bg-background/80`. Efeito glassmorphism que faz o conteúdo "passar por baixo" ao scrollar.

## Alternativas consideradas

| Alternativa                   | Motivo da rejeição                       |
| ----------------------------- | ---------------------------------------- |
| Layout único monolítico       | Sem flexibilidade; difícil escalar       |
| Grid CSS de 12 colunas manual | Tailwind já fornece grid utilities       |
| CSS Modules por layout        | Tailwind elimina a necessidade           |
| Radix Themes                  | Over-engineering; conflito com shadcn/ui |

## Consequências

- ✅ Fácil criar novas páginas com layout consistente
- ✅ Primitivos genéricos reutilizáveis em todo o app
- ✅ Transições premium sem código custom por página
- ✅ Header glassmorphism escalável
- ⚠️ AnimatePresence pode causar re-mount de children — monitorar performance
