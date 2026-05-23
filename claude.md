# Project Context

World Cup 2026 AI Experience SPA.

A futuristic football experience inspired by:

- WC26.io
- Vercel
- Linear
- Stripe
- Modern sports broadcast interfaces

The application must feel cinematic, immersive, realtime and premium.

---

# Main Goals

- Create a premium Single Page Application (SPA)
- Deliver immersive sports experience
- Focus on animations and realtime feeling
- Build highly reusable components
- Maintain scalability and clean architecture
- Achieve production-grade quality
- Reduce manual QA through strong automated testing

---

# Stack

## Core

- React
- TypeScript
- Vite

## Styling & UI

- TailwindCSS
- shadcn/ui
- Lucide React

## Animations

- Framer Motion

## State Management

- Zustand

## Data Fetching

- React Query

## Validation

- Zod

## Testing

- Vitest
- Testing Library
- Playwright
- MSW (Mock Service Worker)

## Documentation

- Storybook

---

# UI Technology Decisions

## Styling Strategy

Use:

- TailwindCSS
- shadcn/ui

Do NOT use:

- styled-components
- emotion
- stitches

Reason:

- Better ecosystem support
- Better compatibility with modern React ecosystem
- Better Claude/Sonnet code generation quality
- Better performance and maintainability

---

# Architecture Rules

- Prefer feature-based architecture
- Use TypeScript strictly
- Avoid prop drilling
- Components must be reusable
- Prefer composition over inheritance
- Keep components small and isolated
- Extract reusable logic into hooks
- Avoid duplicated logic
- Prefer declarative code
- Separate business logic from UI
- Use centralized configuration files
- Use constants instead of hardcoded values

---

# Folder Structure

src/
app/
assets/
components/
config/
features/
hooks/
layouts/
pages/
routes/
services/
store/
styles/
tests/
types/
utils/

---

# Component Rules

- One component per folder
- Always export from index.ts
- Prefer named exports
- Avoid components larger than 250 lines
- Extract hooks when component logic grows
- Separate UI from business logic
- Reusable components must be generic
- Avoid unnecessary abstractions
- Prefer composition patterns
- Use accessibility attributes by default

---

# TypeScript Rules

- Strict mode enabled
- Avoid any
- Prefer type over interface
- Type all API responses
- Type all component props
- Use zod for schema validation
- Never ignore TypeScript errors
- Avoid unsafe casting
- Prefer inferred types when readable

---

# API Rules

- Centralize API calls
- Never fetch directly inside components
- Use React Query for async state
- Handle loading states
- Handle error states
- Use retry strategies carefully
- Use React Query cache properly
- Mock APIs in tests
- Normalize API data when needed

---

# State Management Rules

Use Zustand only for:

- UI state
- theme
- filters
- user preferences
- temporary client state

Avoid global state for:

- server state
- fetched data

Server state must use React Query.

---

# UI Rules

- Dark mode first
- Glassmorphism
- Smooth animations
- Responsive design
- Accessibility required
- Cinematic sports broadcast aesthetic
- Premium dashboard feeling
- Realtime visual feedback
- Large typography
- Strong visual hierarchy
- Dynamic layouts
- Neon glow effects
- Minimal but immersive UI
- Avoid cluttered interfaces

---

# Animation Rules

- Use Framer Motion only
- Prefer spring animations
- Animations must feel premium
- Avoid excessive animations
- Use stagger animations in lists
- Use page transitions
- Use skeleton loaders
- Use subtle hover effects
- Optimize animation performance
- Avoid layout shift animations

---

# Responsive Rules

- Mobile first
- Tablet support required
- Ultrawide support required
- Responsive typography required
- Avoid layout breaking
- Avoid CLS (Cumulative Layout Shift)
- Components must adapt gracefully

---

# Accessibility Rules

- Accessibility is mandatory
- Use semantic HTML
- Support keyboard navigation
- Maintain visible focus states
- Add aria-labels where needed
- Ensure contrast accessibility
- Test screen-reader compatibility
- Avoid inaccessible animations

---

# Performance Rules

- Use lazy loading
- Use code splitting
- Optimize bundle size
- Memoize expensive components
- Avoid unnecessary re-renders
- Optimize animations
- Optimize images
- Use React Query cache properly
- Use dynamic imports when appropriate

---

# Storybook Rules

Storybook is mandatory for reusable UI components.

- Every reusable component must have stories
- Include loading states
- Include error states
- Include empty states
- Include responsive examples
- Include dark mode support
- Include interaction examples
- Include accessibility notes
- Document component props
- Keep stories isolated and reusable

---

# Testing Rules

Testing is a critical part of the project.

Goal:
Reduce dependency on manual QA by maximizing automated testing reliability.

## General Rules

- Every component must have tests
- Use Vitest and Testing Library
- Prefer integration tests over shallow unit tests
- Mock external services
- Test loading states
- Test error states
- Test accessibility
- Maintain high test coverage
- Critical flows must have E2E tests

## Unit Tests

Test:

- utilities
- hooks
- stores
- services
- pure functions

## Integration Tests

Test:

- user flows
- feature interactions
- forms
- API integration behavior
- component interaction

## E2E Tests

Use Playwright for:

- navigation flows
- responsive validation
- critical user journeys
- realtime UI behavior
- accessibility validation

---

# Visual Identity

The application aesthetic should feel like:

- modern sports TV broadcast
- futuristic football analytics
- premium streaming platforms
- AI-native product interfaces

Visual inspirations:

- WC26.io
- Linear
- Vercel
- Stripe
- Apple event presentations

---

# Code Quality Rules

- Clean code required
- Readability over cleverness
- Avoid duplicated logic
- Prefer reusable components
- Prefer maintainability
- Keep naming consistent
- Use descriptive variable names
- Avoid dead code
- Avoid large files
- Use eslint and prettier
- All PRs must pass tests

---

# Git & CI Rules

- Use conventional commits
- Pull requests must pass CI
- Lint required
- Tests required
- Typecheck required
- Build validation required

CI pipeline:

- lint
- typecheck
- tests
- coverage
- build

---

# Documentation Rules

- Components must be documented
- Complex logic must be explained
- Storybook required for reusable UI
- Important architecture decisions should be documented
- Keep README updated

---

# Future Integrations

Possible integrations:

- WC26 MCP
- FIFA APIs
- WebSocket realtime updates
- AI predictions
- Match simulation engine
- Live statistics
- Realtime dashboards

---

# Commands

## Development

npm run dev

## Build

npm run build

## Preview

npm run preview

## Tests

npm run test

## Coverage

npm run test:coverage

## E2E

npm run test:e2e

## Storybook

npm run storybook

---

# Final Project Vision

The project should represent:

- Senior/Staff frontend architecture
- Modern React ecosystem mastery
- Premium UX/UI quality
- Strong testing culture
- AI-ready architecture
- Production-grade maintainability
- Realtime sports experience
- High visual quality
- Scalable frontend engineering
