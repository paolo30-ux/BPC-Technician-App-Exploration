# Design tokens: rules, lookup and missing-token procedure

Token file: `src/styles/tokens.css`. That file is authoritative; this page explains how to use it. If the two disagree, trust `tokens.css` and report the mismatch.

## Rules

1. **Every visual value is a token.** Color, font size, weight, line height, spacing, radius, border width and shadow in component CSS all use `var(--…)`. Component-specific _sizes_ (an avatar's 40px, the nav's 32px indicator) may be literals when no size token exists; prefer adding a `--size-*` token if the size repeats.
2. **Use semantic tokens before palette tokens.** Write `--color-text-subtext`, not `--palette-neutral-90`. Use `--palette-*` only when the Figma layer is bound to a Brand palette variable with no alias (status chips, schedule card colors).
3. **Don't invent tokens** when an existing one matches the Figma value or intent.
4. **Leave `PROVISIONAL` / `UNRESOLVED` values alone.** Don't change them to make one screen match; report the frame and the values instead.
5. **Preserve the design.** If a token would visibly change the Figma result, stop and report it; don't nudge the value.
6. **Bootstrap** is themed through `src/styles/global.css` (`--bs-*` → tokens). Bootstrap utilities are fine for layout (`d-flex`, `gap-*` only where they equal a token); don't use Bootstrap colors directly.

## Figma variable → CSS token

### Color (semantic)

| Figma variable                         | Value                       | CSS token                                                       |
| -------------------------------------- | --------------------------- | --------------------------------------------------------------- |
| Text/default                           | #161717                     | `--color-text-default`                                          |
| Text/subtext                           | #8f8f8f                     | `--color-text-subtext`                                          |
| Text/placeholder                       | #9e9e9e                     | `--color-text-placeholder`                                      |
| Text/disabled                          | #828282                     | `--color-text-disabled`                                         |
| Text/primary                           | #0099fa                     | `--color-text-primary`                                          |
| Text/danger                            | #e34c4c                     | `--color-text-danger`                                           |
| Text/default-white                     | #ffffff                     | `--color-text-on-fill`                                          |
| Surface/default                        | #ffffff                     | `--color-surface-default`                                       |
| Surface/page                           | #fafafa                     | `--color-surface-page`                                          |
| Surface/default-light                  | #f5f5f5                     | `--color-surface-light`                                         |
| Surface/default-dark                   | #edeeee                     | `--color-surface-dark`                                          |
| Surface/disabled                       | #edeeee                     | `--color-surface-disabled`                                      |
| Surface/primary · :hover · -light      | #0099fa · #008be4 · #e6f5ff | `--color-surface-primary` · `-primary-hover` · `-primary-light` |
| Surface/danger · :hover · -light       | #e34c4c · #cf4545 · #fceded | `--color-surface-danger` · `-danger-hover` · `-danger-light`    |
| Surface/success · :hover               | #56bd5b · #4eac53           | `--color-surface-success` · `-success-hover`                    |
| Warning/500 (alias)                    | #f7b422                     | `--color-surface-warning`                                       |
| Border/default · default-dark          | #e0e0e0 · #9e9e9e           | `--color-border-default` · `--color-border-strong`              |
| Border/primary · danger                | #0099fa · #e34c4c           | `--color-border-primary` · `--color-border-danger`              |
| Icons/default · subicon · disabled     | #232424 · #8f8f8f · #828282 | `--color-icon-default` · `-subtle` · `-disabled`                |
| Icons/primary · danger · default-light | #0099fa · #e34c4c · #ffffff | `--color-icon-primary` · `-danger` · `-on-fill`                 |

**Off-system variables in the Technician file (DD-05).** Map them; never add them as tokens:

| Figma                           | CSS token                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `Surface/Custom/1700`           | `--color-surface-primary`                                                         |
| `Text/Custom/700`               | `--color-text-success`                                                            |
| `Surface/Custom/600`            | `--color-surface-success-light`                                                   |
| `Surface/Custom/2100`           | `--color-surface-dark`                                                            |
| `Text/Custom/300`               | `--palette-neutral-600`                                                           |
| `red/red-500`                   | `--color-surface-danger` (fill) or `--color-text-danger` (text)                   |
| `text/text-base`                | `--color-text-default`                                                            |
| `surface/surface-primary-light` | `--color-surface-primary-light`                                                   |
| `neutral/neutral-30`            | `--palette-neutral-30`                                                            |
| `xsmall/semibold` (11px)        | Caption: `--font-size-caption` + `--font-weight-medium` (report the substitution) |

### Typography (Inter only)

| Figma style | Size / line height       | Tokens                                                                 | Helper class       |
| ----------- | ------------------------ | ---------------------------------------------------------------------- | ------------------ |
| Title 1     | 32 / 1.3 / −1%           | `--font-size-title-1`, `--line-height-tight`, `--letter-spacing-title` | `.text-title-1`    |
| Title 2     | 24 / 1.3 / −1%           | `--font-size-title-2` …                                                | `.text-title-2`    |
| Subtitle 1  | 20 / 1.3                 | `--font-size-subtitle-1`                                               | `.text-subtitle-1` |
| Subtitle 2  | 16 / **1.3 provisional** | `--font-size-subtitle-2`, `--line-height-subtitle-2`                   | `.text-subtitle-2` |
| Body        | 14 / 1.5                 | `--font-size-body`, `--line-height-body`                               | `.text-body`       |
| Caption     | 12 / 1.5                 | `--font-size-caption`                                                  | `.text-caption`    |

Weights: `regular` 400, `medium` **500 (provisional)**, `bold` 700. The docs page says "Semi Bold", but the published styles are Medium. Helpers: `.weight-regular`, `.weight-medium`, `.weight-bold`.

### Spacing, radius, borders, shadows, sizes

| Figma                                   | CSS                                                             | Status                                              |
| --------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------- |
| Padding & Spacing xs/sm/md/lg           | `--space-xs` 2 / `-sm` 4 / `-md` 6 / `-lg` 8                    | Agreed                                              |
| xl / 2xl / 3xl / 4xl / 6xl              | `--space-xl` 12 / `-2xl` 16 / `-3xl` 24 / `-4xl` 32 / `-6xl` 48 | **Provisional** (docs page: 10 / 12 / 16 / 20 / 28) |
| 5xl, 7xl–12xl, negatives                | —                                                               | **Unresolved**: not defined                         |
| Border Radius sm / md / lg / 2xl / full | `--radius-sm` 4 / `-md` 6 / `-lg` 8 / `-2xl` 24 / `-full`       | sm, md, lg **provisional** (docs: 6 / 8 / 12)       |
| Border Radius xl (docs 20)              | —                                                               | **Unresolved**                                      |
| Border/xs, Border/sm (widths)           | `--border-width-xs` 1 / `-sm` 2                                 | Naming unresolved (docs call them sm / md)          |
| Drop Shadow/default · lg                | `--shadow-default` · `--shadow-lg`                              | Agreed (identical to the CRM)                       |
| Button small / base / large             | `--size-button-sm` 24 / `-base` 32 / `-lg` 42                   | From Figma                                          |
| Input                                   | `--size-input` 33                                               | From Figma                                          |
| —                                       | `--touch-target-min` 44                                         | App rule (DD-09)                                    |
| —                                       | `--layout-gutter` 16, `--layout-max-width` 440                  | App rule (DD-08)                                    |

Breakpoints can't be custom properties inside `@media`; use literals with a comment: `360px` (min), `440px` (design), `481px` (centered desktop column).

## Missing token procedure

When a Figma value has no matching token:

1. **Re-check the binding.** Run `get_variable_defs` on the exact layer's frame. If Figma binds a variable, map it through the tables above.
2. **Check for a close match.** If an existing token matches the value exactly, or is clearly the Figma intent (for example 15px vs `--space-2xl` 16px on an obviously unbound layer, as in the 441 unbound values the Drift Report found), use the token and note "unbound in Figma → snapped to `--space-2xl`".
3. **Is it a real design value?** If it's bound to a DS variable that `tokens.css` lacks (for example a palette step), add it to `tokens.css` in the right section, with a comment naming the Figma variable.
4. **Is it off-system?** If it's an off-system variable or an unbound literal with no close token, **don't** add a token. Use the nearest token, and record it in the task report and in `docs/known-issues.md` as a design question.
5. **Is it a conflict?** If the same Figma variable has two values, keep the current `PROVISIONAL` value and record the frame and both values in the report.
6. **Is it app-only?** Implementation needs with no Figma equivalent (z-index, motion, backdrop) go into the `APP` sections of `tokens.css` with a comment.

Never put a raw value in component CSS "for now".
