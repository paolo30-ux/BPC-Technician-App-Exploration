---
name: bpc-figma-to-code
description: Implement BPC Technician App screens and components in React from the BPC Figma files (BPC CRM – DS V2.0.0 design system and BPC Technician App designs). Use whenever the user asks to build, implement, update or match a Figma frame, screen, flow, component or design token in this repo; when they paste a figma.com link to file Vg3xTJzSC89ASDPlkDiu8t or eQsrTzf059xBW4h76G9zUY; or when they ask to check the app against Figma.
---

# BPC Figma → React

Turns BPC Figma designs into React code in this repository, one screen at a time. Every visual value comes from approved tokens and every component is reused before a new one is created.

Sources of truth, in this order:

1. The user's explicit instructions for the task.
2. Figma: library **BPC CRM – DS V2.0.0** (`Vg3xTJzSC89ASDPlkDiu8t`) for visuals; **BPC Technician App (Copy)** (`eQsrTzf059xBW4h76G9zUY`) for screens and flows.
3. This repo's decisions: `docs/design-decisions.md` (DD-xx), `docs/known-issues.md`, `docs/component-mapping.md`, `src/styles/tokens.css`.
4. The BPC CRM (`../bpc_crm`): **reference only**, for props APIs and behavior patterns. Never copy it wholesale, never modify it.

## Reference files (load when needed)

| File                                                                   | Load when                                                                            |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [references/figma-sources.md](references/figma-sources.md)             | Finding a frame, its route, its states; using the Figma MCP tools; known Figma traps |
| [references/design-tokens.md](references/design-tokens.md)             | Writing any CSS; a value isn't in `tokens.css`; you hit a provisional value          |
| [references/component-map.md](references/component-map.md)             | Before creating, extending or naming a component                                     |
| [references/interactions-and-qa.md](references/interactions-and-qa.md) | Wiring navigation, sheets, forms and states; final quality check and report          |

## Non-negotiables

- **Read-only Figma.** Never call a mutating `use_figma` script and never edit the Figma files. Read-only Plugin API scripts are allowed for data the read tools don't expose, such as prototype `reactions`.
- **Tokens only.** No hex, rgb or pixel literals for color, spacing, radius, shadow or font size in component CSS. Use `var(--…)` from `src/styles/tokens.css`.
- **Don't resolve design conflicts silently.** `PROVISIONAL` and `UNRESOLVED` tokens stay as they are. Report the discrepancy instead of "fixing" it.
- **Frames are states, not pages** (DD-07). One route per logical screen. Sheets, overlays, toasts, accordions, clock states and empty or filled variants are component state.
- **Mock data only** (DD-06): typed services in `src/services/` backed by fictional fixtures in `src/mocks/`. No CRM authentication or API calls.
- **Icons only via `src/lib/icons.ts`.** Font Awesome Free; regular icons that are Pro-only use a solid stand-in (DD-10).
- **Phone first** (DD-08): 360–440px, no device chrome (status bar, home indicator, keyboard), 44px minimum hit area (DD-09).
- **One screen per task.** Don't build neighboring screens "while you're there". List them as follow-ups instead.

## Workflow

Copy this checklist into your working notes and tick items off.

```
- [ ] 1. Identify the target
- [ ] 2. Inspect the frame in Figma
- [ ] 3. Plan the components (reuse / extend / create)
- [ ] 4. Check the tokens
- [ ] 5. Implement the screen
- [ ] 6. Wire interactions and states
- [ ] 7. Verify (checks + visual comparison)
- [ ] 8. Report
```

### 1. Identify the target

- Get the Figma URL or node ID. Convert the URL form `node-id=123-456` to `123:456`.
- If the user names a screen instead, look it up in `docs/component-mapping.md` §4 and `references/figma-sources.md`.
- Confirm **one** logical screen and list the state frames that belong to it (for example Home has Default, Clock in, Break and Stop).
- If the target is ambiguous, or the screen isn't in the approved scope (`docs/implementation-plan.md` §4), ask before coding.

### 2. Inspect the frame in Figma (before writing any code)

Follow `references/figma-sources.md` › "Inspection recipe". At minimum:

1. `create_session` once per task, then reuse its `sessionId`.
2. `get_screenshot` of the main frame **and** each state frame. Download and look at each one.
3. `get_metadata` on the **frame**, not the page; pages are often too large to return. Record the frame size, section order, component instance names and hidden layers.
4. `get_variable_defs` on the frame to see which tokens it uses. Note any variables outside the design system.
5. For implementation details, load the `figma-design-to-code` guidance and then call `get_design_context`. Treat its code as a **reference**, never as final code.
6. Record the prototype interactions for the frame (see "Prototype reactions" in figma-sources.md).

Write a short **frame spec** before coding: sections top to bottom, components used, states, interactions, dimensions, and open questions.

### 3. Plan the components

For each Figma instance, follow `references/component-map.md`:

1. Search `src/components/**` for an existing component. Check `docs/component-mapping.md` §2 for its planned name.
2. Decide **reuse**, **extend** (add a variant or prop) or **create**, using the decision rules there.
3. Name new components after the Figma component (`main-header` → `MainHeader`, `bottom-sheets` → `BottomSheet`) and put them in the right layer (`base`, `shared`, `features`).

Never create a second component for something that already exists under another name.

### 4. Check the tokens

Map every color, text style, spacing, radius, border and shadow from step 2 to `tokens.css` (lookup table in `references/design-tokens.md`).

If a value has no token, follow "Missing token procedure" in that file. **Don't** invent a new token when an existing one is within the Figma intent.

### 5. Implement the screen

- Build in order: route entry in `src/routes.tsx` → page in `src/pages/` → feature components → mock service and fixtures → styles.
- Match the Figma **hierarchy**: section order, grouping, which element is sticky (header, bottom nav), and which part scrolls.
- Use semantic HTML: `header`, `main`, `nav`, `section`, `h1` per screen, `button` for actions, `a` or `NavLink` for navigation, and `label`s for every input.
- Keep the Figma visual sizes and add hit-area padding where it's below 44px.
- Include every state frame found in step 2 (empty, filled, error, toast and so on), driven by mock data or local state.

### 6. Wire interactions and states

Follow `references/interactions-and-qa.md` › "Interaction rules". Use documented prototype links only. If a link is missing or ends nowhere, apply the matching DD-12 fix or ask the user; never guess a destination silently.

### 7. Verify

- `npm run check` (typecheck, lint, format check, tests) must pass, plus `npm run build`.
- Add or extend tests for routing, states and key interactions. Query by role or label.
- Run the visual comparison and the responsive and accessibility checks in `references/interactions-and-qa.md` › "Quality control".

### 8. Report

Finish with the report template in `references/interactions-and-qa.md`:

- what was built;
- the Figma frames covered;
- the components reused, extended or created;
- tokens used and any token gaps;
- **visual discrepancies**;
- deviations taken (DD-xx);
- open questions;
- follow-up screens.

If any new finding came up, add it to `docs/known-issues.md`.
