# Etapa 04 — Design System Foundation

## Status

✅ Concluída

## Objetivo

Criar a fundação do design system: tokens visuais de marca, primitivos de UI reutilizáveis, sistema tipográfico, glassmorphism, motion primitives, navegação e grid responsivo — todos com CVA, Storybook stories e testes.

---

## Tokens adicionados (`src/index.css`)

### Brand color

```css
/* @theme inline */
--color-brand: var(--brand);
--color-brand-foreground: var(--brand-foreground);

/* :root + .dark */
--brand: oklch(0.65 0.26 264); /* electric blue WC26 */
--brand-foreground: oklch(0.985 0 0); /* branco */
```

Gera as utilities `bg-brand`, `text-brand`, `border-brand`, `fill-brand`, etc.

### Glow shadows

```css
/* @theme */
--shadow-glow-sm: 0 0 12px oklch(0.65 0.26 264 / 0.4);
--shadow-glow: 0 0 24px oklch(0.65 0.26 264 / 0.5);
--shadow-glow-lg: 0 0 40px oklch(0.65 0.26 264 / 0.6);
--shadow-glow-xl: 0 0 60px oklch(0.65 0.26 264 / 0.7);
```

Gera as utilities `shadow-glow-sm`, `shadow-glow`, `shadow-glow-lg`, `shadow-glow-xl`.

---

## Correção de infraestrutura de testes (`src/tests/setup.ts`)

**Problema**: `@testing-library/react` não faz auto-cleanup quando `globals: false` no Vitest,
porque depende de `globalThis.afterEach` para se registrar — que não existe sem globals.

**Solução**: Importar `cleanup` explicitamente e chamar em `afterEach`:

```ts
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  server.resetHandlers();
});
```

---

## Componentes criados

### UI Primitives (`src/components/ui/`)

#### `Button`

| Prop      | Valores                                                 | Default   |
| --------- | ------------------------------------------------------- | --------- |
| `variant` | `primary` `outline` `ghost` `glow` `destructive` `link` | `primary` |
| `size`    | `sm` `md` `lg` `icon`                                   | `md`      |
| `asChild` | `boolean`                                               | `false`   |

- Usa CVA + `@radix-ui/react-slot` (padrão `asChild`)
- `glow` variant usa `bg-brand + shadow-glow`
- `link` variant usa compound variant para sobrescrever dimensões de size (`h-auto p-0`)
- `[&_svg]:size-4` — ícones SVG filhos recebem tamanho padrão automaticamente
- `active:scale-[0.98]` em variantes interativas — feedback tátil sutil

#### `Badge`

| Prop      | Valores                                                                 | Default   |
| --------- | ----------------------------------------------------------------------- | --------- |
| `variant` | `default` `primary` `brand` `success` `warning` `destructive` `outline` | `default` |

- Extends `HTMLAttributes<HTMLSpanElement>`
- Variantes de status usam bg com 15% de opacidade + borda com 25% — legível no dark mode

#### `Card`

Compound component — 6 exports:

| Export            | Elemento | Propósito                           |
| ----------------- | -------- | ----------------------------------- |
| `Card`            | `div`    | Container com variants              |
| `CardHeader`      | `div`    | Área de cabeçalho com padding `p-6` |
| `CardTitle`       | `h3`     | Título semântico da card            |
| `CardDescription` | `p`      | Subtítulo/descrição                 |
| `CardContent`     | `div`    | Conteúdo principal com `p-6 pt-0`   |
| `CardFooter`      | `div`    | Rodapé com `items-center gap-3`     |

| `variant` de Card | Estilo                              |
| ----------------- | ----------------------------------- |
| `default`         | `bg-card border-border`             |
| `glass`           | `bg-background/60 backdrop-blur-md` |
| `elevated`        | `bg-card shadow-lg`                 |
| `ghost`           | `bg-transparent border-border/30`   |

Prop `hoverable: boolean` — adiciona `cursor-pointer hover:bg-card/80`.

#### `Separator`

| Prop          | Valores                 | Default      |
| ------------- | ----------------------- | ------------ |
| `orientation` | `horizontal` `vertical` | `horizontal` |
| `decorative`  | `boolean`               | `true`       |

- `decorative=true` → `role="none"` (sem semântica para screen readers)
- `decorative=false` → `role="separator"` + `aria-orientation`

#### `GlassPanel`

| Prop        | Valores               | Default  |
| ----------- | --------------------- | -------- |
| `intensity` | `low` `medium` `high` | `medium` |
| `glow`      | `none` `sm` `md` `lg` | `none`   |

| `intensity` | Classes aplicadas                   |
| ----------- | ----------------------------------- |
| `low`       | `bg-background/80 backdrop-blur-sm` |
| `medium`    | `bg-background/60 backdrop-blur-md` |
| `high`      | `bg-background/40 backdrop-blur-xl` |

---

### Typography (`src/components/typography/`)

#### `Heading`

| Prop     | Valores                              | Default   |
| -------- | ------------------------------------ | --------- |
| `as`     | `h1` `h2` `h3` `h4` `h5` `h6`        | `h2`      |
| `size`   | `xs` `sm` `md` `lg` `xl` `2xl` `3xl` | `lg`      |
| `intent` | `default` `muted` `brand` `gradient` | `default` |

- `gradient` intent: `bg-gradient-to-br from-foreground to-foreground/40 bg-clip-text text-transparent`
- `3xl` size: `text-5xl font-extrabold lg:text-6xl xl:text-7xl` — escala cinematográfica

#### `Text`

| Prop      | Valores                                        | Default   |
| --------- | ---------------------------------------------- | --------- |
| `as`      | `p` `span` `div` `label` `strong` `em` `small` | `p`       |
| `size`    | `xs` `sm` `base` `lg` `xl`                     | `base`    |
| `intent`  | `default` `muted` `brand` `destructive`        | `default` |
| `weight`  | `normal` `medium` `semibold` `bold`            | `normal`  |
| `leading` | `tight` `normal` `relaxed`                     | `normal`  |

---

### Motion (`src/components/motion/`)

Todos os componentes de motion usam `useReducedMotion()` do Framer Motion. Quando o usuário tem `prefers-reduced-motion: reduce`, a animação é pulada completamente (`initial={false}`).

#### `FadeIn`

```tsx
<FadeIn duration={0.4} delay={0}>
  {children}
</FadeIn>
```

- `opacity: 0 → 1`
- `ease: "easeOut"`

#### `SlideIn`

```tsx
<SlideIn direction="up" distance={16} duration={0.4} delay={0}>
  {children}
</SlideIn>
```

| `direction` | Movimento visual                          |
| ----------- | ----------------------------------------- |
| `up`        | Elemento surge de baixo e sobe (y: +16→0) |
| `down`      | Elemento surge de cima e desce (y: -16→0) |
| `left`      | Surge da direita e vai para esquerda      |
| `right`     | Surge da esquerda e vai para direita      |

- `ease: [0.22, 1, 0.36, 1]` — cubic-bezier "snappy"

#### `ScaleIn`

```tsx
<ScaleIn initialScale={0.95} duration={0.3} delay={0}>
  {children}
</ScaleIn>
```

- `scale: 0.95 → 1` + `opacity: 0 → 1`

#### `StaggerList`

```tsx
<StaggerList staggerDelay={0.06} initialDelay={0} className="grid gap-4">
  <Card />
  <Card />
  <Card />
</StaggerList>
```

- Envolve cada filho em `motion.div` com `itemVariants`
- Container usa `staggerChildren` para orquestrar a sequência
- Com `prefers-reduced-motion`: renderiza `div` estático sem animação

**Decisão de design**: StaggerList sempre renderiza como `div` (não suporta `as="ul"` diretamente) porque cada filho é envolto em `motion.div`, o que quebraria a semântica de `ul > li`. Para listas com semântica correta, use `FadeIn` ou `SlideIn` diretamente em cada `motion.li`.

---

### Layout (`src/components/layout/`)

#### `Grid`

| Prop   | Valores                          | Default |
| ------ | -------------------------------- | ------- |
| `cols` | `"1"` `"2"` `"3"` `"4"` `"auto"` | `"1"`   |
| `gap`  | `none` `sm` `md` `lg` `xl`       | `md`    |
| `as`   | qualquer `ElementType`           | `div`   |

- `cols="auto"` usa `grid-cols-[repeat(auto-fill,minmax(280px,1fr))]`
- Colunas 2/3/4 são responsivas: `grid-cols-1` em mobile, expanding em sm/lg

---

### Loading (`src/components/loading/`)

#### `Skeleton`

```tsx
<Skeleton className="h-8 w-48" />
```

- `animate-pulse bg-muted rounded-md`
- `aria-hidden="true"` — não anunciado para screen readers
- `PageSkeleton` atualizado para importar `Skeleton` deste módulo

---

### Navigation (`src/components/navigation/`)

#### `NavLink`

```tsx
<NavLink to="/matches">Matches</NavLink>
```

- Wrapper sobre `NavLink` do react-router-dom
- `isActive=true` → `text-foreground`
- `isActive=false` → `text-muted-foreground`
- `hover:text-foreground` em todos os estados

---

## Storybook — Títulos

| Componente  | Título no Storybook  |
| ----------- | -------------------- |
| Button      | `UI/Button`          |
| Badge       | `UI/Badge`           |
| Card        | `UI/Card`            |
| Separator   | `UI/Separator`       |
| GlassPanel  | `UI/GlassPanel`      |
| Heading     | `Typography/Heading` |
| Text        | `Typography/Text`    |
| FadeIn      | `Motion/FadeIn`      |
| SlideIn     | `Motion/SlideIn`     |
| ScaleIn     | `Motion/ScaleIn`     |
| StaggerList | `Motion/StaggerList` |
| Grid        | `Layout/Grid`        |
| Skeleton    | `Loading/Skeleton`   |
| NavLink     | `Navigation/NavLink` |

**Nota**: Storybook 10 exige `args` explícito em cada story. Para componentes com `children: ReactNode` required, foi adicionado `args: { children: null }` no `meta` como valor default — satisfaz o tipo sem afetar os `render` stories.

---

## Decisões de arquitetura

### CVA para todos os variants

`class-variance-authority` garante type-safety em tempo de compilação. O tipo `VariantProps<typeof xyzVariants>` transforma erros de typo em erros de TypeScript, eliminando valores inválidos em runtime.

### Compound exports para Card

Named exports (`Card`, `CardHeader`, `CardTitle`…) em vez de `Object.assign` ou dot notation (`Card.Header`). Mais tree-shakeable e compatível com `verbatimModuleSyntax` do TypeScript 6.

### Motion como wrappers opt-in

Os componentes de motion não substituem o Framer Motion — são atalhos para os casos mais comuns. Features que precisam de controle fino (ex: AnimatePresence, gestures) continuam usando Framer Motion diretamente.

### Glassmorphism como primitivo

`GlassPanel` centraliza a linguagem visual de glass. Outros componentes (Card `variant="glass"`, header do AppLayout) usam as mesmas classes para consistência. Não é um visual theme — é um bloco construtivo.

---

## Validação final

```
npx tsc -p tsconfig.app.json --noEmit   ✅ zero erros
npm run build                            ✅ 2231 módulos | CSS 38kB
npx vitest run                           ✅ 100/100 testes | 15 test files
```
