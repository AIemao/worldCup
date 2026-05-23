# Etapa 04.5 — Repository & CI Foundation

## Status

✅ Concluída

## Objetivo

Configurar a automação do repositório e a fundação de CI/CD: workflows do GitHub Actions, templates de issue e PR, documentação de contribuição, CODEOWNERS e README profissional.

---

## Decisões de arquitetura

### Separação de workflows

3 workflows independentes em vez de um monolítico:

| Workflow        | Trigger                     | Justificativa                                                  |
| --------------- | --------------------------- | -------------------------------------------------------------- |
| `ci.yml`        | push/PR → `main`, `develop` | Validação principal — roda em toda mudança                     |
| `e2e.yml`       | push/PR → `main`            | Playwright é pesado (~300MB browsers) — só na branch principal |
| `storybook.yml` | push/PR → `main`, `develop` | Valida que o Storybook compila — separado do CI funcional      |

### Paralelismo de jobs no CI

```
lint ──────┐
typecheck ─┼──→ build
test ──────┘
```

Lint, typecheck e test rodam em paralelo — o build só dispara após os três passarem. Reduz o tempo total do pipeline comparado a uma cadeia sequencial.

### Cache de dependências

`actions/setup-node@v4` com `cache: 'npm'` usa o hash do `package-lock.json` como chave. Cache automático — sem `actions/cache@v4` extra para node_modules.

Para o Playwright, `actions/cache@v4` separado para `~/.cache/ms-playwright` (os binários dos browsers não fazem parte do npm cache).

### Concurrency cancellation

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

Cancela o run anterior do mesmo branch/PR quando novos commits chegam. Evita desperdício de minutos de CI em commits intermediários de um mesmo PR.

---

## Workflows criados

### `ci.yml` — CI principal

**Trigger**: push para `main`/`develop` + PRs para `main`/`develop`

Jobs:

| Job         | Depende de              | Passos                              |
| ----------- | ----------------------- | ----------------------------------- |
| `lint`      | —                       | ESLint + Prettier check             |
| `typecheck` | —                       | `tsc --noEmit`                      |
| `test`      | —                       | Vitest coverage + upload artifact   |
| `build`     | lint + typecheck + test | `vite build` + upload dist artifact |

**Artefatos gerados**:

- `coverage-report` — relatório lcov/html (7 dias)
- `dist` — build de produção (1 dia)

### `e2e.yml` — E2E Playwright

**Trigger**: push para `main` + PRs para `main`

- Cache de browsers do Playwright em `~/.cache/ms-playwright`
- Instala apenas `chromium` (suficiente para CI — outros browsers em testes locais)
- Upload do `playwright-report/` apenas em falha (não polui artefatos em sucesso)
- `CI=true` garante que `playwright.config.ts` sobe um servidor fresh (`reuseExistingServer: false`)

### `storybook.yml` — Build do Storybook

**Trigger**: push/PR → `main`, `develop`

- Executa `build-storybook`
- Upload do `storybook-static/` como artefato (7 dias)
- Falha se qualquer story tiver erro de compilação

---

## Templates criados

### `.github/ISSUE_TEMPLATE/bug_report.md`

Campos: Descrição, comportamento esperado, comportamento atual, passos para reproduzir, screenshots, ambiente (OS/browser/resolução/Node), possível solução.

Labels padrão: `bug`, `needs-triage`.

### `.github/ISSUE_TEMPLATE/feature_request.md`

Campos: Resumo, problema que resolve, solução proposta, alternativas consideradas, impacto visual/UX, critérios de aceitação, etapa do projeto.

Labels padrão: `enhancement`, `needs-triage`.

### `.github/PULL_REQUEST_TEMPLATE.md`

Seções obrigatórias:

- **Changes** — lista das mudanças
- **Screenshots** — before/after com tabela
- **Tests** — checkboxes por tipo
- **Checklist** — typecheck, lint, testes, build, acessibilidade, responsividade, branch correta

### `.github/CODEOWNERS`

Ownership por camada:

| Padrão                                              | Escopo                                  |
| --------------------------------------------------- | --------------------------------------- |
| `*`                                                 | Proprietário global (todos os arquivos) |
| `.github/workflows/`                                | Mudanças em CI têm alto impacto         |
| `src/components/`                                   | Design system — afeta toda a UI         |
| `vite.config.ts`, `tsconfig*.json`, `src/index.css` | Configs críticas                        |
| `docs/adr/`                                         | Decisões de arquitetura                 |

---

## README profissional

Seções:

1. **Badges** — CI, E2E, Storybook (shields via GitHub Actions)
2. **Screenshots** — placeholder para futuras capturas
3. **Stack** — tabela completa com versões
4. **Arquitetura** — árvore de pastas + layouts aninhados + tokens de design
5. **Setup** — requisitos, instalação, variáveis de ambiente
6. **Scripts** — todos os comandos com descrição
7. **Testes** — estratégia, como executar, cobertura
8. **Design system** — componentes disponíveis + exemplos de uso
9. **ADRs** — links para cada decisão
10. **Etapas** — roadmap com status
11. **Contributing** — link para `docs/contributing.md`

> **Ação necessária**: Substitua `YOUR_USERNAME` nos badges por seu usuário do GitHub.

---

## `docs/contributing.md`

Documento completo de contribuição cobrindo:

### Branch strategy

```
main
├── develop
│   ├── feature/wc26-{issue}-{description}
│   └── hotfix/wc26-{issue}-{description} (fix em develop)
└── hotfix/wc26-{issue}-{description} (fix crítico em produção)
```

Regra principal: PRs sempre apontam para `develop`, nunca para `main` diretamente (exceto hotfixes críticos e releases).

### Commit conventions

**Conventional Commits** com scopes específicos do projeto:

```
feat(match): add MatchCard component with live score
fix(standings): correct goal difference calculation
test(card): add Card glassmorphism variant tests
ci(workflows): add Playwright browser cache
```

Breaking changes com `!` e `BREAKING CHANGE:` footer.

### Pull Request Process

- Checklist local antes de abrir (`typecheck` + `lint` + `format:check` + `test:run` + `build`)
- PRs < 400 linhas de mudança
- Squash and merge para features, merge commit para releases
- Screenshots obrigatórios para mudanças visuais

### Code Standards

- TypeScript strict: `import type`, sem `any`, sem `namespace`/`const enum`
- CVA para variantes, `cn()` para composição
- `useReducedMotion()` obrigatório em todos os componentes de motion

### Testing Requirements

Tabela de o que testar com o quê e onde, mais exemplos de código com `globals: false`.

### Design System Rules

7 regras para criação/modificação de componentes do design system.
