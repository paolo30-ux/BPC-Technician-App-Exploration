# BPC Technician App — Exploration

An independent, mobile-first web prototype of the BPC Technician App.

- **Visual source of truth:** the BPC Design System in Figma (_BPC CRM – DS V2.0.0_).
- **Technology:** the same stack as the BPC CRM frontend.
- **Data:** mock data only. No CRM authentication and no CRM APIs.

> Status: **foundation only.** The routes show placeholder screens. See
> [`docs/implementation-plan.md`](docs/implementation-plan.md) for scope and phases.

## Requirements

- **Node 24** (`.nvmrc`; `engines` requires ≥ 24). Run `nvm use` before installing.
- **npm 11** (comes with Node 24).
- No private registry tokens are needed. Font Awesome **Free** is used (see below).

## Getting started

```bash
nvm use
npm ci
npm run dev        # http://localhost:5180
```

Open it in a mobile viewport (360–440px). On wider screens the app shows as a centered 440px column.

## Scripts

| Script                            | What it does                               |
| --------------------------------- | ------------------------------------------ |
| `npm run dev`                     | Start the Vite dev server                  |
| `npm run build`                   | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview`                 | Serve the production build                 |
| `npm run typecheck`               | TypeScript project build, no output        |
| `npm run lint`                    | ESLint (flat config)                       |
| `npm run format` / `format:check` | Prettier write / check                     |
| `npm run test` / `test:watch`     | Vitest (happy-dom)                         |
| `npm run check`                   | Typecheck, lint, format check and tests    |

## Stack

React 19 · TypeScript 5.8 (strict) · Vite 7 · React Router 7 · Zustand 5 · Bootstrap 5.3 + React Bootstrap 2 · Font Awesome 7 (Free) · Vitest 4 + Testing Library · ESLint 9 + Prettier 3.
Exact versions are in `package.json` and `package-lock.json`.

## Project structure

```
src/
├─ main.tsx            Entry: Bootstrap CSS → tokens.css → global.css → <App/>
├─ App.tsx             Router provider
├─ routes.tsx          Route table (one route per logical screen — DD-07)
├─ styles/
│  ├─ tokens.css       Design tokens from Figma (provisional values marked)
│  └─ global.css       Bootstrap variable bridge, base styles, type helpers
├─ layouts/            MobileLayout (scrolling content + bottom navigation)
├─ components/
│  ├─ base/            Primitives (Button, Input, Badge…), not built yet
│  ├─ shared/          App-level components (BottomNav, …)
│  └─ features/        Domain components (appointment, service, …)
├─ pages/              Route screens (PlaceholderPage for now)
├─ services/           Typed, mock-backed data access
├─ mocks/              Fixtures (fictional data only)
├─ lib/                icons.ts (single icon registry), stores/ (Zustand)
├─ hooks/  utils/  types/
└─ test/setup.ts       Vitest setup
```

## Design tokens

`src/styles/tokens.css` holds every color, type style, spacing step, radius, border width, shadow, size, touch target and breakpoint.

- Values come from the Figma variables bound on published components.
- Where Figma contradicts itself, the value is marked **PROVISIONAL** or **UNRESOLVED** with an explanation (see `docs/design-decisions.md`, DD-04).
- Components must use the variables. Don't put hex values in component CSS.

## Font Awesome

The project uses `@fortawesome/free-solid-svg-icons` and `free-regular-svg-icons`. Every icon is imported in one place, `src/lib/icons.ts`.

The Figma designs use Font Awesome _regular_ icons, and some of those are Pro-only. Those currently use the solid style as a stand-in, marked in `icons.ts`.

To switch to Pro later:

1. Get a **Package token** from fontawesome.com → Account → Tokens. The npm registry rejected the token provided on 2026-11-20 with `401`; it may be a Font Awesome _API_ token rather than a package token.
2. Make it available without committing it: `export FONTAWESOME_NPM_AUTH_TOKEN=…`, or put it in a git-ignored `.env.local` / CI secret.
3. Add a project `.npmrc` that references the variable, not the value:
   ```
   @fortawesome:registry=https://npm.fontawesome.com/
   //npm.fontawesome.com/:_authToken=${FONTAWESOME_NPM_AUTH_TOKEN}
   ```
4. Install `@fortawesome/pro-regular-svg-icons` and update the imports in `src/lib/icons.ts`.

## Ground rules

- Don't modify the BPC CRM repository or the original Figma files.
- The CRM's `apps/technician` is a reference, not source code to copy.
- Mock data only; no CRM login or API calls.
- Never commit tokens or `.env` files.

## Documentation

- [`docs/implementation-plan.md`](docs/implementation-plan.md): scope, stack, phases, approvals
- [`docs/design-decisions.md`](docs/design-decisions.md): decision records (DD-xx)
- [`docs/component-mapping.md`](docs/component-mapping.md): Figma → CRM → app mapping, routes
- [`docs/known-issues.md`](docs/known-issues.md): findings register (P0–P3)
