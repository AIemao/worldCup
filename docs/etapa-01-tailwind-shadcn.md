# Etapa 01 — TailwindCSS v4 + shadcn/ui

**Status:** ✅ Concluída  
**Data:** 23/05/2026

---

## Objetivo

Configurar a fundação visual do projeto: TailwindCSS v4 e shadcn/ui sobre Vite + React + TypeScript 6, sem criar componentes de negócio.

---

## O que foi feito

### 1. TailwindCSS v4

- Instalado `tailwindcss` + `@tailwindcss/vite`
- Plugin adicionado ao `vite.config.ts` (sem PostCSS, sem `tailwind.config.ts`)
- CSS entry via `@import "tailwindcss"` no `src/index.css`
- Design tokens definidos via `@theme inline` (OKLCH color space)

### 2. Path alias `@/`

- Configurado em `vite.config.ts` → `resolve.alias: { '@': './src' }`
- Configurado em `tsconfig.app.json` → `paths: { "@/*": ["./src/*"] }`
- Nota: `baseUrl` removido — TypeScript 6 o deprecou

### 3. shadcn/ui

- `components.json` criado manualmente (CLI incompatível com TypeScript 6)
  - style: `new-york`
  - baseColor: `zinc`
  - cssVariables: `true`
- Dependências instaladas manualmente:
  - `class-variance-authority` — sistema de variantes
  - `clsx` — classnames condicionais
  - `tailwind-merge` — merge de classes Tailwind sem conflito
  - `lucide-react` — ícones
  - `@radix-ui/react-slot` — composição via `asChild`
- `src/lib/utils.ts` criado com a função `cn()`

### 4. Dark mode first

- Classe `.dark` aplicada no `<html>` via `src/main.tsx`
- Paleta zinc escuro definida no bloco `.dark { }` do `src/index.css`

---

## Arquivos relevantes

| Arquivo             | Papel                                  |
| ------------------- | -------------------------------------- |
| `vite.config.ts`    | Plugin Tailwind + alias `@/`           |
| `tsconfig.app.json` | Paths TypeScript                       |
| `src/index.css`     | Tokens de design + entrada do Tailwind |
| `components.json`   | Config do shadcn/ui                    |
| `src/lib/utils.ts`  | Utilitário `cn()`                      |
| `src/main.tsx`      | Aplica `.dark` no `<html>`             |

---

## Problema encontrado

O shadcn CLI (v4.7 e v4.8) falha ao carregar o workspace config com TypeScript 6.0.  
**Causa:** opções novas do TS6 (`erasableSyntaxOnly`, `verbatimModuleSyntax`) são desconhecidas ao parser interno do CLI.  
**Solução:** setup manual das dependências e arquivos de configuração.

> Ao adicionar componentes com `npx shadcn add <component>`, testar se o CLI funciona. Caso não, copiar o código diretamente de [ui.shadcn.com](https://ui.shadcn.com).

---

## Validação

```bash
npx tsc -p tsconfig.app.json --noEmit  # sem erros
npm run build                          # build em 154ms, sem erros
```

---

## Próxima etapa

→ Etapa 02: estrutura de pastas, roteamento e layout base
