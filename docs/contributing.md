# Contributing

Guia para contribuir com o **World Cup 2026 AI Experience**.

---

## Índice

- [Branch Strategy](#branch-strategy)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Design System Rules](#design-system-rules)

---

## Branch Strategy

```
main
│
├── develop              ← branch de integração
│   │
│   ├── feature/wc26-123-match-card     ← nova feature
│   ├── feature/wc26-456-standings-table
│   │
│   └── hotfix/wc26-789-score-display   ← fix urgente (parte de develop)
│
└── hotfix/wc26-999-critical-fix        ← fix crítico em produção (parte de main)
```

### Regras por branch

| Branch      | Propósito             | Merge para         | Proteção                     |
| ----------- | --------------------- | ------------------ | ---------------------------- |
| `main`      | Código em produção    | —                  | ✅ PR obrigatório + CI verde |
| `develop`   | Integração contínua   | `main` (release)   | ✅ PR obrigatório            |
| `feature/*` | Nova funcionalidade   | `develop`          | —                            |
| `hotfix/*`  | Fix crítico em prod   | `main` + `develop` | —                            |
| `release/*` | Preparação de release | `main` + `develop` | —                            |

### Nomenclatura de branches

```
feature/wc26-{issue-number}-{kebab-case-description}
hotfix/wc26-{issue-number}-{kebab-case-description}
release/v{semver}

# Exemplos
feature/wc26-42-match-card-component
feature/wc26-87-group-standings-table
hotfix/wc26-103-score-display-crash
release/v0.2.0
```

### Fluxo típico de feature

```bash
# 1. Partir sempre de develop atualizado
git checkout develop
git pull origin develop

# 2. Criar branch de feature
git checkout -b feature/wc26-42-match-card-component

# 3. Desenvolver com commits semânticos
git commit -m "feat(match): add MatchCard component"
git commit -m "test(match): add MatchCard unit tests"
git commit -m "docs(storybook): add MatchCard stories"

# 4. Abrir PR para develop (nunca direto para main)
gh pr create --base develop --title "feat(match): MatchCard component"
```

---

## Commit Conventions

O projeto segue o padrão **[Conventional Commits](https://www.conventionalcommits.org/)**.

### Formato

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Tipos

| Tipo       | Uso                                           |
| ---------- | --------------------------------------------- |
| `feat`     | Nova funcionalidade                           |
| `fix`      | Correção de bug                               |
| `refactor` | Refatoração sem impacto funcional ou visual   |
| `test`     | Adição ou correção de testes                  |
| `docs`     | Documentação (README, ADRs, comments)         |
| `style`    | Formatação, espaçamento (sem lógica alterada) |
| `ci`       | Mudanças em workflows de CI/CD                |
| `chore`    | Manutenção geral (deps, configs, scripts)     |
| `perf`     | Otimização de performance                     |
| `revert`   | Reversão de commit anterior                   |

### Scopes sugeridos

```
feat(match): ...         # feature de partida
feat(groups): ...        # grupos da copa
feat(teams): ...         # times
feat(standings): ...     # classificação
feat(nav): ...           # navegação
feat(design-system): ... # componentes UI
fix(button): ...         # fix em componente específico
ci(e2e): ...             # CI de testes E2E
docs(adr): ...           # nova ADR
```

### Exemplos válidos

```bash
feat(match): add MatchCard component with live score
fix(standings): correct goal difference calculation
refactor(button): extract buttonVariants to separate file
test(card): add Card glassmorphism variant tests
docs(adr): add ADR 005 — data fetching strategy
ci(workflows): add Playwright browser cache
chore(deps): upgrade framer-motion to 12.41.0
```

### Breaking changes

Para mudanças que quebram a API de um componente:

```bash
feat(button)!: rename variant "default" to "primary"

BREAKING CHANGE: The "default" variant was renamed to "primary" to align
with the design system naming convention. Update all usages of
variant="default" to variant="primary".
```

---

## Pull Request Process

### Antes de abrir a PR

Execute o checklist local:

```bash
npm run typecheck       # zero erros TypeScript
npm run lint            # zero warnings ESLint
npm run format:check    # código formatado com Prettier
npm run test:run        # todos os testes passando
npm run build           # build sem erros
```

### Ao abrir a PR

1. Use o **[PR template](.github/PULL_REQUEST_TEMPLATE.md)** — ele aparece automaticamente
2. Aponte sempre para `develop`, nunca para `main` diretamente
3. Adicione screenshots para mudanças visuais
4. Linke a issue relacionada (`Closes #42`)
5. Aguarde o CI ficar verde antes de solicitar review

### Tamanho ideal de PR

- **< 400 linhas** de mudança por PR (exceto geração automática de código)
- PRs grandes devem ser quebradas em PRs menores e sequenciais
- Uma PR = um assunto coeso

### Merge strategy

- **Squash and merge** para features (`feature/*`) — mantém `develop` limpo
- **Merge commit** para releases e hotfixes — preserva o histórico de release

---

## Code Standards

### TypeScript

- Strict mode habilitado — sem `any`, sem `@ts-ignore` sem justificativa
- `import type` obrigatório para imports de tipo (TypeScript 6 `verbatimModuleSyntax`)
- Sem `namespace` ou `const enum` (TypeScript 6 `erasableSyntaxOnly`)
- Tipos com `type`, não `interface` (preferência do projeto)
- Validação de dados externos sempre com Zod

```typescript
// ✅ Correto
import type { ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";

// ❌ Errado
import { ReactNode } from "react";
```

### Componentes React

- Um componente por pasta: `ComponentName/ComponentName.tsx` + `ComponentName/index.ts`
- Exports nomeados — sem `export default` em componentes de design system
- Máximo 250 linhas por componente
- Props tipadas com `type ComponentNameProps = ...`
- Acessibilidade obrigatória: `aria-*`, `role`, navegação por teclado

```typescript
// ✅ Estrutura correta de componente
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", ...props }: ButtonProps) {
  // ...
}
```

### Estilização

- TailwindCSS v4 — sem styled-components, emotion ou stitches
- CVA (`class-variance-authority`) para variantes — type-safe em tempo de compilação
- `cn()` (clsx + tailwind-merge) para composição de classes condicionais
- Dark mode via classe `.dark` — nunca `prefers-color-scheme` no CSS

### Animações

- Framer Motion exclusivamente — sem CSS transitions em interações complexas
- `useReducedMotion()` obrigatório — respeitar acessibilidade
- Arrays de ease como `const`: `[0.22, 1, 0.36, 1] as const` (não `as number[]`)

### Estado

- **Zustand** apenas para estado de UI (tema, filtros, preferências)
- **TanStack Query** para todo estado de servidor (dados da API)
- Sem `useState` para dados que vêm de API

---

## Testing Requirements

Todo código novo deve incluir testes correspondentes.

### O que testar

| O que              | Com o quê                | Onde                                           |
| ------------------ | ------------------------ | ---------------------------------------------- |
| Componentes UI     | Vitest + Testing Library | `ComponentName.test.tsx` ao lado do componente |
| Hooks customizados | Vitest + `renderHook`    | `hooks/__tests__/useHookName.test.ts`          |
| Stores Zustand     | Vitest                   | `store/__tests__/storeName.test.ts`            |
| Utilitários puros  | Vitest                   | `utils/__tests__/utilName.test.ts`             |
| Serviços de API    | Vitest + MSW             | `services/__tests__/serviceName.test.ts`       |
| Fluxos críticos    | Playwright               | `tests/e2e/flowName.spec.ts`                   |

### Padrões de teste

```typescript
// ✅ Importar describe/it/expect explicitamente (globals: false)
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

describe("Button", () => {
  afterEach(() => cleanup());

  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });
});
```

### Storybook

Todo componente de design system deve ter stories:

- Estado default
- Todas as variantes
- Estado loading (se aplicável)
- Estado de erro (se aplicável)
- Exemplo responsivo
- Exemplo de acessibilidade

---

## Design System Rules

Ao criar ou modificar componentes do design system (`src/components/`):

1. **Pasta própria** com `ComponentName.tsx` + `index.ts`
2. **CVA** para variantes — sem `if/else` para classes CSS
3. **Export nomeado** — sem `export default`
4. **Testes** — mínimo de cobertura para todos os variants
5. **Stories** — uma story por variante significativa
6. **Acessibilidade** — `aria-label`, `role`, `tabIndex` onde necessário
7. **`as` prop** para polimorfismo quando o elemento pode variar (ex: `Heading`, `Text`, `Grid`)

```typescript
// ✅ Estrutura de componente do design system
export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    hoverable?: boolean;
  };

export function Card({ variant, hoverable, className, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, hoverable }), className)}
      {...props}
    />
  );
}
```
