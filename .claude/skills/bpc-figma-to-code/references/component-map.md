# Component map: reuse, extend or create

The full mapping with priorities lives in `docs/component-mapping.md`. This file is the working guide for deciding what to do with each Figma instance.

**Always check the current code first.** The list below shows status as of 2026-11-20 and goes out of date. Before deciding, run:

```bash
ls -R src/components src/layouts
grep -rn "export function" src/components src/layouts
```

## Layers

| Folder                              | Holds                                                                                                                             | May import          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `src/components/base/`              | Primitives, mostly 1:1 with DS atoms (Button, Input, Badge, Checkbox, Spinner)                                                    | tokens, `lib/icons` |
| `src/components/shared/`            | App-level building blocks (BottomNav, MainHeader, Card, ListItem, BottomSheet, Toast, Tabs, Accordion, EmptyState, Avatar, Alert) | base                |
| `src/components/features/<domain>/` | Domain parts (appointment, service, inventory, signature, photo …)                                                                | base, shared        |
| `src/layouts/`                      | Route shells (MobileLayout)                                                                                                       | shared              |
| `src/pages/`                        | One file per route                                                                                                                | everything          |

Base and shared components must never import from features or pages.

## Figma → React

| Figma component (DS)                                           | React component                              | Path                            | Status          | Notes                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------- | -------------------------------------------- | ------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Mobile Navigation Bar / `.mobile-nav-tab`                      | `BottomNav`                                  | `shared/bottomnav/`             | **Exists**      | Tabs come from `navItems.ts`; `messageBadgeCount` prop                                                                                                                                                                                                 |
| (screen frame)                                                 | `MobileLayout`                               | `layouts/`                      | **Exists**      | Content scrolls; nav at the bottom; centered 440 column                                                                                                                                                                                                |
| `main-content type=empty`                                      | `PlaceholderPage` (temporary) → `EmptyState` | `pages/` → `shared/emptystate/` | Partial         | Extract `EmptyState` when the first real empty state is built                                                                                                                                                                                          |
| Primary / Secondary / Tertiary / Danger / Success (8 sets)     | `Button`                                     | `base/button/`                  | Planned         | Props: `intent` (`primary`, `secondary`, `tertiary`, `danger`, `success`), `variant` (`default`, `outlined`, `base`), `size` (`sm`, `base`, `lg`), `state` (`default`, `disabled`, `loading`), `icon`, `trailingIcon`. API modeled on the CRM `Button` |
| Icon Button                                                    | `IconButton`                                 | `base/button/`                  | Planned         | Wraps `Button`; 42×42 in headers; needs `aria-label`                                                                                                                                                                                                   |
| Input Field (`type`: label / input / placeholder × 7 states)   | `Input`                                      | `base/input/`                   | Planned         | Floating label; `error`, `helperText`; 16px text on touch (DD-09)                                                                                                                                                                                      |
| Dropdown Field / Combo box                                     | `SelectField` (opens a `BottomSheet` picker) | `base/select/`                  | Planned (P2)    | Don't port the CRM's 979-line `Select`                                                                                                                                                                                                                 |
| Checkbox / Radio / Switch / Radio Card                         | `Checkbox`, `Radio`, `Switch`, `RadioCard`   | `base/…`                        | Planned         |                                                                                                                                                                                                                                                        |
| Labeled / Labeled-muted / Status / Custom Status / Non-labeled | `Badge`                                      | `base/badge/`                   | Planned         | `variant` (`labeled`, `muted`, `status`, `dot`) + `tone` (`primary`, `success`, `warning`, `danger`, `neutral`)                                                                                                                                        |
| `main-header` (+ `.timer`)                                     | `MainHeader`, `ClockTimer`                   | `shared/mainheader/`            | Planned         | Header variants: greeting (avatar, name, ID, bell) and title (back, title, actions). Timer states: default, clocked-in, break, out                                                                                                                     |
| `bottom-sheets`                                                | `BottomSheet`                                | `shared/bottomsheet/`           | Planned         | react-bootstrap `Offcanvas placement="bottom"`, restyled; handle, title, subtitle, content, 1–2 actions                                                                                                                                                |
| Toast Alert                                                    | `Toast` + `useToastStore`                    | `shared/toast/`, `lib/stores/`  | Planned         | Auto-dismiss (Figma after-delay); store pattern modeled on the CRM                                                                                                                                                                                     |
| `container` / `.header-container`                              | `Card`, `CardHeader`                         | `shared/card/`                  | Planned         | Header row 58px plus divider                                                                                                                                                                                                                           |
| `item` (Default / empty), Notification-item, item-messages     | `ListItem`, `MessageListItem`                | `shared/listitem/`              | Planned         | 56px rows; chevron variant for settings                                                                                                                                                                                                                |
| Accordion                                                      | `Accordion`                                  | `shared/accordion/`             | Planned         | Grid-row height animation (as in the CRM `CollapseCard`)                                                                                                                                                                                               |
| Tab Group Mobile                                               | `Tabs`                                       | `shared/tabs/`                  | Planned         | Behavior modeled on the CRM `Tabs` (context, `withCounter`)                                                                                                                                                                                            |
| Counter                                                        | `Counter`                                    | `base/counter/`                 | Planned         | −/value/+ with 44px hit areas                                                                                                                                                                                                                          |
| Avatar                                                         | `Avatar`                                     | `shared/avatar/`                | Planned         | Initials fallback; free icons                                                                                                                                                                                                                          |
| Alert (banner)                                                 | `Alert`                                      | `shared/alert/`                 | Planned         | "Previous appointment not closed"                                                                                                                                                                                                                      |
| Signature overlay / Signing Pad                                | `SignaturePad`                               | `features/signature/`           | Planned         | Canvas approach modeled on the CRM prototype `SigningPadModal`                                                                                                                                                                                         |
| Image Upload / Add Picture                                     | `PhotoUpload`                                | `features/photo/`               | Planned         | `<input type="file" accept="image/*" capture>`                                                                                                                                                                                                         |
| location-container (map)                                       | `RouteMapPreview`                            | `features/appointment/`         | Planned         | Static image (DD-13)                                                                                                                                                                                                                                   |
| Appointment Cards                                              | `AppointmentCard`                            | `features/schedule/`            | Planned (P2)    |                                                                                                                                                                                                                                                        |
| Chat Bubble                                                    | `ChatBubble`                                 | `features/messages/`            | Planned (P2)    |                                                                                                                                                                                                                                                        |
| Status bar, home indicator, `.keyboard`                        | —                                            | —                               | **Never build** | DD-08                                                                                                                                                                                                                                                  |

## Decision rules

Ask these in order and stop at the first "yes":

1. **Does a component already render this Figma component?** Then **reuse** it. Pass props; don't fork it.
2. **Is it the same Figma component in a different variant or state** (for example Button `size=large`, Input `:error`, header with timer)? Then **extend** the existing component with a prop that matches the Figma variant property. Don't create `LargeButton` or `ErrorInput`.
3. **Is it a layout of existing parts on one screen only?** Then compose it inside the page or a `features/<domain>/` component. Don't promote it to shared.
4. **Is it a Figma DS component used on two or more screens with no React equivalent?** Then **create** it in `base/` or `shared/`, following the table above.
5. **Is it a one-off domain block** (Service Agreement terms, Inventory product row)? Then **create** it in `features/<domain>/`.

Avoiding duplicates:

- Search by Figma name _and_ by role (`grep -rni "sheet\|drawer\|offcanvas" src/`) before creating.
- If two components converge, merge them into the one with the Figma name and update imports in the same task.
- Domain wrappers (`features/…`) compose shared components; they never re-style them with copied CSS.

## Naming

- **Component name = the Figma component name in PascalCase**, with DS punctuation dropped: `main-header` → `MainHeader`, `bottom-sheets` → `BottomSheet` (singular), `.timer` → `ClockTimer`. Where a clearer domain name helps, use it and note the Figma name in a JSDoc comment (`/** Figma: "Mobile Navigation Bar" */`).
- **Props mirror Figma variant properties.** `size`, `state` and `type` keep their Figma names and values in camelCase (`size="lg"` ↔ Figma `size=large` is the one documented abbreviation set: `sm`, `base`, `lg`).
- **Files:** lowercase folder, PascalCase `.tsx`, co-located `.css` and `.test.tsx`, named exports only.
- **CSS classes:** BEM-like, prefixed with the component (`bottom-nav__link--active`). Don't use Bootstrap color classes.

## CRM reference (read, don't copy)

Useful patterns in `../bpc_crm/frontend/src/components/`:

- `button/Button.tsx`: intent, variant, size and state API.
- `inputfield/Input.tsx`: label, error and icon slots.
- `tabs/`: context-based tabs.
- `collapsecard/CollapseCard.tsx`: grid-row animation.
- `toast/` + `lib/stores/useToastStore.ts`: toast store.
- `avatar/Avatar.tsx`: initials and color helper.
- `../apps/technician/src/components/SigningPadModal.tsx`: canvas signature.

Many of these import Font Awesome **Pro** icons and hard-coded hex values. Re-implement them with `lib/icons.ts` and tokens.

## Built so far (update as components land)

As of 2026-11-20, these exist after the Home / Appointment / Site Verification screens. **Reuse them.**

| Figma                                                     | React                                                                                    | Path                                |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------- |
| Primary / Secondary / Success / Tertiary buttons          | `Button`, `ButtonLink`, `ButtonAnchor`                                                   | `base/button/`                      |
| Tertiary – Base, Icon Button                              | `IconButton`, `IconLink` (`variant` ghost \| outlined)                                   | `base/iconbutton/`                  |
| Labeled, Status, Custom Status, Chip                      | `Badge` (`variant` count \| status \| chip; `tone`)                                      | `base/badge/`                       |
| (loading, provisional)                                    | `Spinner`                                                                                | `base/spinner/`                     |
| main-header                                               | `MainHeader` (title, subtitle, leading, actions, children)                               | `shared/mainheader/`                |
| .timer                                                    | `ClockTimer` + `useClockStore`                                                           | `shared/clocktimer/`, `lib/stores/` |
| container / .header-container                             | `Card`, `AccordionCard`                                                                  | `shared/card/`                      |
| item, item-messages                                       | `ListItem`, `MessageListItem`                                                            | `shared/listitem/`                  |
| Inline Alert (danger)                                     | `InlineAlert`                                                                            | `shared/inlinealert/`               |
| main-content type=empty                                   | `EmptyState`                                                                             | `shared/emptystate/`                |
| bottom-sheets                                             | `BottomSheet`                                                                            | `shared/bottomsheet/`               |
| Mobile Navigation Bar                                     | `BottomNav`                                                                              | `shared/bottomnav/`                 |
| location-container (map, route)                           | `RouteMapPreview`, `LocationRoute`                                                       | `features/map/`                     |
| Appointment detail block, progress dropdown, notes, Table | `AppointmentSummary`, `AppointmentProgress`, `DatedNotes`/`BulletNotes`, `ServicesTable` | `features/appointment/`             |
| Image Upload, Photo Verification Overlay                  | `PhotoUploadArea`, `PhotoVerificationSheet`                                              | `features/photo/`                   |
