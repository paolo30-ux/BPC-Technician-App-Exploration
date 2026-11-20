# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

An independent, mobile-first web prototype of the BPC Technician App. It uses mock data only. Read `docs/implementation-plan.md` before starting a feature, and check `docs/known-issues.md` for open decisions.

## Hard rules

- **Never modify** the BPC CRM repo (`../bpc_crm`) or the original Figma files. Both are read-only references.
- **Don't copy CRM source wholesale.** Re-implement small patterns (props APIs, behavior) and credit them in a comment.
- **No CRM authentication or API calls.** Data comes from typed services in `src/services/` backed by fixtures in `src/mocks/`. Fixtures must be fictional; never use real customer data.
- **Never commit secrets.** That includes the Font Awesome token, `.env*` files and `.npmrc` with a literal token. Reference `${FONTAWESOME_NPM_AUTH_TOKEN}` instead.
- Don't commit or push unless the user asks.

## Design system rules

- The visual source of truth is the Figma library _BPC CRM – DS V2.0.0_ (`Vg3xTJzSC89ASDPlkDiu8t`). Screens are in _BPC Technician App (Copy)_ (`eQsrTzf059xBW4h76G9zUY`). Frame IDs for each route are in `docs/component-mapping.md` §4.
- Use the tokens in `src/styles/tokens.css`. **No hex, rgb or pixel literals for color, spacing or radius in component CSS.** If a value is missing, add a token (with its Figma source) rather than hard-coding it.
- Values marked `PROVISIONAL` or `UNRESOLVED` are open decisions. Don't change them to "fix" a screen; raise it and record it in `docs/design-decisions.md`.
- Figma frames are **states, not pages** (DD-07). Sheets, overlays, toasts and clock states are component state, not routes.
- Phone first, 360–440px (DD-08). Don't render device chrome. Interactive elements need a hit area of at least 44px (`--touch-target-min`) even when the visual size follows Figma.
- Icons: import only from `src/lib/icons.ts`, never directly from `@fortawesome/*` in components.

## Code conventions (aligned with the CRM)

- Component folders are lowercase (`components/shared/bottomnav/`); component files are PascalCase (`BottomNav.tsx`) with a co-located `.css`.
- Use named exports. Hooks are `useX.ts`; Zustand stores are `lib/stores/useXStore.ts`; services are `xService.ts`.
- `components/base` = primitives, `components/shared` = app-level, `components/features` = domain. Base and shared components must not import from features.
- Use the `@/` alias for `src/`.
- Tests are `*.test.ts(x)` next to the code they test, using Testing Library. Query by role or label, not by class.
- Prettier formats the code (single quotes, semicolons, trailing commas, 80 columns).

## Commands

```bash
nvm use            # Node 24
npm ci
npm run dev        # http://localhost:5180
npm run check      # typecheck + lint + format:check + test, run before finishing a task
npm run build
```
