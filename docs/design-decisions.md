# Design Decisions

Status: **Proposed — awaiting approval**
Last updated: 2026-11-20

Each decision has an ID (DD-xx), a status, and the findings it resolves (see `known-issues.md`).

Statuses:

- **Decided**: set by the project owner and recorded here.
- **Proposed**: recommended, waiting for approval.
- **Provisional**: used now, to be confirmed by design.

---

## DD-01 · The BPC Design System is the visual source of truth

- **Status:** Decided
- **Decision:** Visual values come from the Figma library _BPC CRM – DS V2.0.0_. When the CRM code and Figma disagree, Figma wins. Example: `Neutral/60` is `#b8b8b8` in Figma and `#8b8b8b` in the CRM's `colors.css`.
- **Consequence:** CRM styles are reused only where they match Figma. Shadows and primary button colors match exactly.

## DD-02 · The CRM is a reference only

- **Status:** Decided · resolves P0-08
- **Decision:** Neither the CRM repository nor its `apps/technician` prototype is modified or used as this app's source code. Small, self-contained CRM components may be _re-implemented_ following the same props API, with attribution in a comment, but they aren't copied over wholesale.
- **Consequence:** This repo has no imports from the CRM and no shared `node_modules`.

## DD-03 · Figma files are read-only

- **Status:** Decided
- **Decision:** We never modify the original Figma files. Problems found in them are reported to design.

## DD-04 · Provisional token values

- **Status:** Provisional · resolves P0-02 and P0-03
- **Decision:** Where Figma variables conflict, use the value bound on **published components** (Button, Input, Shadows, Mobile templates) and mark it provisional.

| Token                     | Conflicting values found                 | Provisional value | Taken from                   |
| ------------------------- | ---------------------------------------- | ----------------- | ---------------------------- |
| `space-xs`                | 2                                        | 2                 | All sources agree            |
| `space-sm`                | 4                                        | 4                 | All sources agree            |
| `space-md`                | 6                                        | 6                 | All sources agree            |
| `space-lg`                | 8                                        | 8                 | All sources agree            |
| `space-xl`                | 10 (docs) · 12 (components)              | **12**            | Button, Color page           |
| `space-2xl`               | 12 · 16                                  | **16**            | Button, Shadows, Home screen |
| `space-3xl`               | 16 (docs) · 24 (components)              | **24**            | Shadows, Dimensions frame    |
| `space-4xl`               | 20 (docs) · 32 (components)              | **32**            | Button                       |
| `space-6xl`               | 28 (docs) · 48 (components)              | **48**            | Color page                   |
| `radius-sm`               | 4 · 6 (docs)                             | **4**             | Button small                 |
| `radius-md`               | 6 · 8                                    | **6**             | Button base, Color swatches  |
| `radius-lg`               | 8 · 12 (docs)                            | **8**             | Button large, Home screen    |
| `radius-2xl`              | 24 (variable only)                       | **24**            | Color page                   |
| `radius-full`             | 9999                                     | 9999              | All sources agree            |
| `border-xs` / `border-sm` | 1 / 2 (docs call these sm / md)          | 1 / 2             | Button, Home screen          |
| Middle font weight        | "Semi Bold" (docs) · Medium 500 (styles) | **500**           | Published text styles        |
| Subtitle 2 line height    | 130% (style) · 150% (docs)               | **130%**          | Published text style         |
| Title letter spacing      | −1 (unit unclear)                        | **−0.01em**       | Docs page says −1%           |

- **Consequence:** `tokens.css` marks these values `/* provisional — DD-04 */`. One file changes when design confirms.

## DD-05 · Off-system variables map to existing tokens

- **Status:** Proposed · resolves P1-09

| Variable in the Technician file | Resolved value | Maps to DS token                                              |
| ------------------------------- | -------------- | ------------------------------------------------------------- |
| `Surface/Custom/1700`           | #0099fa        | `Surface/primary`                                             |
| `Text/Custom/700`               | #4eac53        | `Success/600`                                                 |
| `Surface/Custom/600`            | #eef8ef        | `Success/50`                                                  |
| `Surface/Custom/2100`           | #edeeee        | `Surface/default-dark` (`Neutral/30`)                         |
| `Text/Custom/300`               | #424343        | `Neutral/600`                                                 |
| `red/red-500`                   | #e34c4c        | `Danger/500`                                                  |
| `text/text-base`                | #161717        | `Text/default`                                                |
| `surface/surface-primary-light` | #e6f5ff        | `Surface/primary-light`                                       |
| `neutral/neutral-30`            | #edeeee        | `Neutral/30`                                                  |
| `xsmall/semibold` (11px, 600)   | —              | **Not on the scale.** Use Caption Medium (12px) provisionally |

## DD-06 · Mock data only for the prototype

- **Status:** Decided · resolves P0-05 and P1-10
- **Decision:**
  - No network calls.
  - Services expose typed async functions backed by in-memory fixtures in `src/mocks/`.
  - Login accepts any non-empty email and password and stores a fake session in a Zustand store.
  - All fixture names and addresses are fictional.
- **Consequence:** Switching to the real API later means replacing the service implementations; screens don't change.

## DD-07 · Routes are logical screens; frames are states

- **Status:** Proposed · resolves P0-06
- **Decision:**
  - One route per logical screen (see `component-mapping.md` §4).
  - These are component state, not routes: bottom sheets, overlays, toasts, accordions, clock states, and empty or filled form states.
- **Consequence:** About 35 routes in total, of which about 12 are in the MVP.

## DD-08 · Phone-first, no device chrome

- **Status:** Proposed · resolves P0-07 and P0-10
- **Decision:**
  - Design target is 440px.
  - Layout works from 360px to 440px.
  - Above 480px the app shows as a centered 440px column on a `Surface/page` background.
  - No status bar, home indicator or keyboard is drawn. The bottom navigation and sheets add `env(safe-area-inset-bottom)` padding.
- **Consequence:** Tablet layouts are deferred (P2-10).

## DD-09 · Touch-target deviation

- **Status:** Proposed · resolves P1-08
- **Decision:**
  - Buttons and inputs keep the Figma _visual_ sizes (24, 32 and 42px buttons; 33px input).
  - Interactive elements get a minimum 44×44px tap area through padding or a pseudo-element.
  - Input text is 16px on touch devices to stop iOS from zooming in.
- **Consequence:** A small visual difference from Figma inside inputs. Documented here so reviewers know it's intentional.

## DD-10 · Free Font Awesome icons only

- **Status:** Decided · resolves P0-01 · updated 2026-11-20
- **Decision:** Use `@fortawesome/fontawesome-svg-core`, `free-solid-svg-icons`, `free-regular-svg-icons` and `react-fontawesome`. There is no `.npmrc` for the Pro registry. If a Figma icon is Pro-only, use the nearest free icon and list the swap in `component-mapping.md` §3.
- **Update 2026-11-20:** A Font Awesome token was provided for Pro. `npm.fontawesome.com` rejected it with **401 Unauthorized**; it is probably an API token rather than a _Package_ token. The project therefore stays on Free. All icons go through `src/lib/icons.ts`, and Pro-only regular icons are marked "solid stand-in" there. Moving to Pro needs only a valid package token through `${FONTAWESOME_NPM_AUTH_TOKEN}` and a change to `icons.ts` (steps in README). The token is never written to the repo.

## DD-11 · Provisional interaction states

- **Status:** Provisional · resolves P1-01 and P1-03
- **Decision:**
  - **Pressed:** the `:hover` token color.
  - **Focus:** a 2px `Primary/300` outline, 2px offset.
  - **Loading:** spinner plus disabled, using the CRM `Button` `state="loading"` API.
  - **Empty:** the DS `main-content type=empty` pattern.
  - **Loading screens:** none for the demo, because mocks resolve immediately.
- **Consequence:** Replaced once design specifies these states.

## DD-12 · Demo-flow fixes for prototype dead ends

- **Status:** Proposed · resolves P1-04, P1-05 and P2-01
- **Decision:**
  - A successful password reset returns to Log In.
  - Confirming logout goes to Log In.
  - The Schedule screen highlights the Schedule tab.
  - Unlinked rows (Preferences, edit profile) open a "Not designed yet" placeholder.
- **Consequence:** Each deviation is listed in `known-issues.md` for design to review.

## DD-13 · Neutral branding placeholders

- **Status:** Proposed · resolves P1-06 and P1-07
- **Decision:**
  - The Service Agreement header uses a neutral "BPC" logo slot instead of the Beeline Pest Control artwork.
  - Maps are static placeholder images.
