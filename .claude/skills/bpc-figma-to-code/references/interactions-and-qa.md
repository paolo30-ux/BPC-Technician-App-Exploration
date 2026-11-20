# Interaction rules, quality control and report template

## Interaction rules

**Follow the prototype, not intuition.** Implement only the interactions documented in the Figma prototype (`New Prototype ✅`, `5581:2595`). Read them with the read-only reaction script in `figma-sources.md`.

| Figma prototype action                                                         | Implementation                                                                                                                                                       |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NAVIGATE` to a screen frame                                                   | Route change: `<Link>`/`<NavLink>` for navigation, `useNavigate()` after an action. Destination = the route of the _logical_ screen (`docs/component-mapping.md` §4) |
| `NAVIGATE` to a _state_ frame of the same screen (e.g. Home → Home (Clock in)) | Local or store state change, **not** a route                                                                                                                         |
| `OVERLAY` (Notes, Add Picture, Signature, Photo Verification, Dropdown List)   | `BottomSheet`, or a react-bootstrap `Modal` for centered dialogs. Focus trap, Escape and backdrop close, restore focus on close                                      |
| Bottom-sheet frames drawn full-screen (Inventory, Notification item)           | Still a `BottomSheet`, not a route                                                                                                                                   |
| `CHANGE_TO` (variant swap)                                                     | Component state: accordion open, tab selected, counter value, Start ↔ Stop, checkbox                                                                                 |
| `SWAP` (Add Picture empty ↔ filled)                                            | State inside the overlay                                                                                                                                             |
| `AFTER_TIMEOUT` (toasts)                                                       | `Toast` auto-dismiss (the timeout value isn't exposed through MCP; use 3000ms and mark it provisional)                                                               |
| `BACK`                                                                         | `navigate(-1)`; fall back to the parent route when there's no history                                                                                                |
| `CLOSE`                                                                        | Close the overlay or toast                                                                                                                                           |
| `SCROLL_TO`                                                                    | `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` (respects reduced motion)                                                                           |
| `ON_DRAG` (carousels, payment selection)                                       | Horizontal scroll with `scroll-snap`; also keyboard and button operable                                                                                              |
| `ON_HOVER`                                                                     | Hover styles only; never the only way to reach anything (touch first)                                                                                                |

### Navigation

- The bottom nav uses `NavLink`; the active tab follows the route. On sub-routes the parent tab stays active (Appointment tab active on `/appointments/:id/site`).
- Header bell → `/notifications`; avatar or name → `/settings`; back button → `BACK` rule.
- Missing or dead-end links: apply DD-12 if listed. Otherwise ask the user, or render the control disabled with a `title`/tooltip "Not designed yet", and report it.

### Forms

- Use the DS `Input` states: `:default`, `:hover`, `:focus`, `:error`, `:error-focus`, `:disabled`, `:update`.
- Validate on submit, then on change for fields that already have errors. Error text goes in the Input's supporting text, linked with `aria-describedby`.
- Only Login has designed validation ("No Email Address", password hint). For other forms use generic messages ("Required") and list them as open questions (P2-03).
- Mock submission: resolve after a short delay _only if_ a loading state is designed; otherwise resolve immediately (P1-03).

### Data and states

- Data comes from `src/services/*Service.ts` (async, typed) reading `src/mocks/*` fixtures. Pages never import fixtures directly.
- Use fictional names and addresses only, never copied from the CRM or its SQL dump.
- Implement every designed state for the screen: empty, filled, error, success toast, clock states, and so on.
- No loading or error screens are designed (P1-03). Don't invent full-screen versions; use the provisional `Spinner` and `EmptyState` (DD-11) and report the gap.
- Global UI state (session, clock, toasts) goes in Zustand stores in `src/lib/stores/`; everything else in component state.

## Quality control

Do all of this before reporting a screen as done.

### 1. Automated checks

```bash
npm run check   # typecheck + lint + format:check + tests
npm run build
```

Tests to add for each screen:

- the route renders its heading;
- each designed state can be reached;
- the primary interactions (navigation target, sheet opens and closes, toast appears).

### 2. Visual comparison against Figma

1. `npm run dev` (http://localhost:5180), viewport **440×956** (the Figma frame size).
2. Capture the browser screenshot. Use a browser or automation tool if one is available in the session. Otherwise ask the user for a screenshot, or describe the result from the DOM and computed styles, and say plainly that no visual capture was made.
3. Put it next to the Figma `get_screenshot` of the same frame and state.
4. Compare, region by region:
   - section order and hierarchy;
   - spacing between and inside cards;
   - text styles and weights;
   - colors;
   - radius and shadow;
   - icon choice and size;
   - alignment;
   - truncation and wrapping;
   - sticky header and nav;
   - which area scrolls.
5. Repeat for each state frame.

### 3. Responsive

- **360px:** nothing overflows horizontally, long names wrap or truncate as Figma shows, tap targets stay ≥ 44px.
- **390px and 440px:** the layout matches Figma.
- **≥ 481px:** a centered 440px column with a framed background (MobileLayout).
- Safe areas: content clears the notch and home indicator (`env(safe-area-inset-*)`); the nav doesn't cover the last list item.

### 4. Accessibility and keyboard

- One `h1` per screen; a logical heading order.
- All actions are `button`s; all navigation is links. No clickable `div`s.
- Icon-only buttons have `aria-label`; decorative icons are `aria-hidden`.
- Inputs have visible labels (the floating label counts) and errors linked with `aria-describedby`.
- **Keyboard:** Tab order follows the visual order, focus is visible (the provisional ring, DD-11), Escape closes sheets and modals, focus returns to the trigger, and the skip link works.
- Status changes (toasts, clock state) are announced (`role="status"` / `aria-live="polite"`).
- Contrast: report known failures (primary button 3.03:1, P1-02) but don't change DS colors.
- Reduced motion: animations use the `--duration-*` tokens, which drop to 0 under `prefers-reduced-motion`.

### 5. Discrepancy log

Record every visible difference in the report, including intended ones.

| #   | Region / element  | Figma                     | Browser                    | Cause                     | Action           |
| --- | ----------------- | ------------------------- | -------------------------- | ------------------------- | ---------------- |
| 1   | e.g. Input height | 33px                      | 33px visual, 44px hit area | DD-09 touch rule          | Intended         |
| 2   | e.g. Card padding | 12px (`2xl` on doc frame) | 16px                       | Provisional `--space-2xl` | Report to design |

Cause categories:

- **intended** (cite DD-xx)
- **provisional token**
- **design conflict**
- **missing design**
- **implementation bug** (fix before reporting)

## Report template (end of every task)

```markdown
## <Screen name> — implementation report

**Figma:** <file key> · frames <id (state)>, <id (state)> …
**Route:** /path · **Files:** <list>

### Components

- Reused: …
- Extended: … (prop/variant added)
- Created: … (layer, Figma name)

### Tokens

- Used: …
- Gaps / substitutions: … (per missing-token procedure)

### Interactions implemented

- <trigger> → <result> (Figma action)

### States covered

- …

### Checks

- npm run check: pass/fail · build: pass/fail
- Viewports checked: 360 / 390 / 440 / desktop
- Visual comparison: done with <tool> | not captured (reason)

### Discrepancies

| # | Element | Figma | Browser | Cause | Action |

### Deviations (DD-xx) and open questions

- …

### Follow-ups (not built in this task)

- …
```

Add any new finding to `docs/known-issues.md` with priority, source, impact, action, approval and blocking fields.
