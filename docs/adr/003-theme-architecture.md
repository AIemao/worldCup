# ADR 003 — Theme Architecture

**Status:** Aceito  
**Data:** 23/05/2026

---

## Contexto

O projeto é **dark mode first**. Precisamos de:

- Dark mode por padrão
- Possibilidade de alternar para light
- Sem flash de tema errado no carregamento (FOUC)
- Persistência da preferência do usuário
- Respeito à preferência do sistema (`prefers-color-scheme`)

## Decisão

**TailwindCSS v4** com estratégia de classe `.dark` no `<html>`. **Zustand** com `persist` para armazenar a preferência. **Inline script** no `index.html` para anti-FOUC.

## Fluxo de inicialização

```
1. Browser carrega index.html
2. Inline script executa ANTES do React:
   - Lê localStorage['wc26-theme']
   - Aplica .dark ou .light no <html>
3. React inicializa, Zustand rehydrata do localStorage
4. ThemeProvider sincroniza store com o DOM
```

## Por que inline script e não CSS?

CSS `prefers-color-scheme` com `color-scheme: light dark` causaria:

- Flash duplo ao trocar manualmente (CSS vs classe)
- Conflito entre preferência do sistema e preferência salva

## Store de tema

```typescript
type Theme = 'dark' | 'light' | 'system'

// Zustand + persist (localStorage key: 'wc26-theme')
useThemeStore: {
  theme: Theme           // preferência salva
  resolvedTheme: 'dark' | 'light'  // valor efetivo
  setTheme(theme): void  // aplica no DOM + persiste
}
```

## Estratégia de classe

```css
/* tokens light: :root */
/* tokens dark:  .dark { } */

/* Aplicado em <html class="dark"> por padrão */
```

## Alternativas consideradas

| Alternativa                       | Motivo da rejeição                                  |
| --------------------------------- | --------------------------------------------------- |
| `prefers-color-scheme` CSS apenas | Sem override manual; conflito com preferência salva |
| `next-themes`                     | Dependência extra; projeto não usa Next.js          |
| CSS custom property toggle        | Mais complexo que classe + Tailwind                 |
| Context API                       | Zustand já instalado; evita wrapper extra           |

## Consequências

- ✅ Zero FOUC (inline script executa antes do React)
- ✅ Preferência persistida entre sessões
- ✅ Respeita `prefers-color-scheme` quando `theme === 'system'`
- ✅ Simples de testar (só mudar a classe no elemento)
- ⚠️ Inline script no HTML precisa ser mantido em sync com a chave do localStorage
