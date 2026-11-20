# Implementation Plan — BPC Technician App Prototype

Status: **Proposed — awaiting approval**
Last updated: 2026-11-20

Related documents:

- [`known-issues.md`](known-issues.md): every finding, with its priority.
- [`design-decisions.md`](design-decisions.md): decision records (DD-xx).
- [`component-mapping.md`](component-mapping.md): Figma → CRM → app mapping, and screen routes.

## 1. Objective

Build an independent, mobile-first web prototype of the BPC Technician App. It uses:

- the same technology as the BPC CRM;
- the BPC Design System (Figma) as the visual source of truth;
- the Technician App Figma prototype as the flow reference;
- mock data only.

The prototype runs locally for a demo. It doesn't connect to the CRM backend.

## 2. Constraints

| #   | Constraint                                                           | Record |
| --- | -------------------------------------------------------------------- | ------ |
| 1   | Don't modify the CRM repository.                                     | DD-02  |
| 2   | Don't modify the original Figma files.                               | DD-03  |
| 3   | The BPC Design System is the visual source of truth.                 | DD-01  |
| 4   | Conflicting token values are provisional until design confirms them. | DD-04  |
| 5   | No Font Awesome Pro unless a private token is provided.              | DD-10  |
| 6   | Mock data only.                                                      | DD-06  |
| 7   | The CRM's `apps/technician` is a reference, not source code.         | DD-02  |

## 3. Technology (aligned with the CRM)

Versions match what is installed in the CRM (`bpc_crm/frontend/node_modules`). Approval needed: P0-04.

| Area            | Choice                                                                            | Version                  |
| --------------- | --------------------------------------------------------------------------------- | ------------------------ |
| Runtime         | Node (pinned with `.nvmrc` and `engines`)                                         | 24                       |
| Package manager | npm (lockfile v3)                                                                 | 11                       |
| UI              | react, react-dom                                                                  | ^19.2.6                  |
| Language        | typescript (strict, same `tsconfig` flags as the CRM)                             | ~5.8.3                   |
| Build           | vite, @vitejs/plugin-react                                                        | ^7.3.6, ^5.2.0           |
| Routing         | react-router-dom (`RouteObject[]` + layout route)                                 | ^7.18.3                  |
| State           | zustand                                                                           | ^5.0.13                  |
| Data            | swr over typed mock services (no axios until there's a real API)                  | ^2.4.1                   |
| Styling         | bootstrap (CSS and utilities) + react-bootstrap (Modal, Offcanvas) + `tokens.css` | ^5.3.8, ^2.10.10         |
| Icons           | @fortawesome core + free-solid + free-regular + react-fontawesome                 | ^7.3.1, ^3.3.1           |
| Font            | Inter (Google Fonts)                                                              | —                        |
| Quality         | eslint 9 (flat config), prettier 3 (CRM `.prettierrc`), typescript-eslint         | —                        |
| Tests           | vitest, @testing-library/react, jest-dom, happy-dom                               | ^4.1, ^16.3, ^6.9, ^20.9 |

**Left out of the prototype:** AG Grid, PrimeReact, amCharts, Quill/Tiptap, SweetAlert2, react-select, react-datepicker, moment-timezone, NMI, laravel-echo/pusher, mapbox-gl, Storybook.

## 4. Minimum viable scope for the local demo

The demo covers **one complete technician job**, plus the app frame around it. This is the path the prototype itself highlights with its flows "Start: Appointment", "Site Verification", "Start Service", "Service List (Unit)" and "Complete Service".

### In scope (MVP)

| #   | Screen / feature                                                         | States included                                                                                                                             |
| --- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **App frame:** main header, bottom navigation (5 tabs), safe-area layout | Active tab, message badge                                                                                                                   |
| 2   | **Log In** (mock)                                                        | Empty, filled, sign-in; "Remember me" shown but not saved                                                                                   |
| 3   | **Home**                                                                 | Clock timer: default → clocked in → break → stopped. Next Schedule card (static map), Recent Messages list                                  |
| 4   | **Appointment**                                                          | Customer details, status pill, "previous appointment not closed" banner, Notes and Details accordions, previous / next arrows               |
| 5   | **Site Verification**                                                    | Static map, addresses, photo upload with preview, "no photo" empty state                                                                    |
| 6   | **Start Service**                                                        | Service summary, confirm                                                                                                                    |
| 7   | **Service List**                                                         | Units with Start/Stop, + Image (file input), + Signature, Notes bottom sheet, Instructions and Office Notes accordions, unit / service tabs |
| 8   | **Service Agreement**                                                    | Customer details (read-only), suggested services, terms, Signing Pad sheet → Signed state                                                   |
| 9   | **Thank You**                                                            | Completion screen → back to Home                                                                                                            |
| 10  | **Toasts**                                                               | Success toast after Notes saved and service completed                                                                                       |
| 11  | **Placeholders** for Inventory, Schedule, Messages                       | DS empty-state pattern: "Coming in a later iteration"                                                                                       |

### Stretch (only if time allows)

- **Review Inventory**: Products accordion, Supplies and Equipment counters, Verify Inventory, success toast.

### Not in the MVP

Reset password, Notifications, Settings, Truck Inventory / Order List / exchanges, Schedule and Add Appointment, Messages and Chat, Payment, Unit Details, tablet layouts.

### Demo success criteria

1. `npm ci && npm run dev` runs on a clean machine with Node 24 and **no private tokens**.
2. A presenter can go Log In → Home (clock in) → Appointment → Site Verification → Start Service → Service List (notes, photo, signature) → Service Agreement (sign) → Thank You → Home with no dead ends.
3. Every color, type style, radius and shadow comes from `tokens.css`; there are no hex literals in component CSS.
4. Layout is correct at 360, 390 and 440px wide, and centered on desktop.
5. `npm run lint`, `npm run typecheck` and `npm run test` pass.

## 5. Proposed project structure

```
BPC-Technician-App-Exploration/
├─ docs/                         # these documents
├─ .nvmrc  .prettierrc  eslint.config.js
├─ index.html  vite.config.ts  package.json
├─ tsconfig.json  tsconfig.app.json  tsconfig.node.json
└─ src/
   ├─ main.tsx  App.tsx  routes.tsx
   ├─ styles/        tokens.css · global.css
   ├─ layouts/       MobileLayout.tsx
   ├─ components/
   │  ├─ base/       Button · Input · Checkbox · Badge · Spinner
   │  ├─ shared/     MainHeader · ClockTimer · BottomNav · Card · ListItem
   │  │              Accordion · Tabs · BottomSheet · Toast · EmptyState · Avatar · Alert
   │  └─ features/   appointment/ · service/ · signature/ · photo/
   ├─ pages/         Login · Home · Appointment · SiteVerification · StartService
   │                 ServiceList · ServiceAgreement · ThankYou · Placeholder
   ├─ services/      appointmentService.ts · sessionService.ts …   # typed, mock-backed
   ├─ mocks/         fixtures (fictional data only)
   ├─ lib/stores/    useSessionStore · useClockStore · useToastStore
   ├─ hooks/  utils/  types/
   └─ test/setup.ts
```

Naming follows the CRM:

- PascalCase component files in lowercase folders;
- `useXStore.ts` for stores;
- `xService.ts` for services;
- `*.test.tsx` files next to the code they test;
- named exports;
- Prettier settings copied from the CRM.

## 6. Phases

| Phase                 | Output                                                                                                        | Exit criterion                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **0. Approval**       | These four documents approved; P0 items resolved                                                              | Sign-off on P0-02, P0-03, P0-04, P0-06, P0-07, P0-09 |
| **1. Scaffold**       | Vite + React + TypeScript project; lint, format, test and typecheck scripts; `.nvmrc`; empty routes           | `npm ci && npm run dev` works without tokens         |
| **2. Foundations**    | `tokens.css` (DD-04, DD-05), global styles, Inter, MobileLayout, BottomNav, MainHeader + ClockTimer           | Home frame matches Figma at 440px                    |
| **3. Primitives**     | Button, Input, Badge, Card, ListItem, Accordion, Tabs, BottomSheet, Toast, EmptyState, Avatar, Alert, Spinner | Unit tests for state variants                        |
| **4. MVP screens**    | Screens 2–11 from §4, with mock services                                                                      | The demo path in §4 works end to end                 |
| **5. Demo hardening** | P1 items resolved or recorded; visual check against Figma                                                     | Demo success criteria met                            |
| **6. Stretch**        | Review Inventory                                                                                              | Optional                                             |

Each phase is reviewed before the next starts. Nothing is committed or pushed without approval.

## 7. Findings by priority (summary)

Details are in `known-issues.md`.

- **P0 (before the first local prototype):**
  - P0-01: free icons only
  - P0-02 and P0-03: provisional tokens
  - P0-04: stack approval
  - P0-05: mock data
  - P0-06: routes vs states
  - P0-07: phone-only
  - P0-08: CRM is reference only
  - P0-09: MVP scope
  - P0-10: no device chrome
- **P1 (before the first demo):**
  - P1-01: missing button states
  - P1-02: primary contrast
  - P1-03: no loading or error designs
  - P1-04: prototype dead ends
  - P1-05: wrong active tab
  - P1-06: agreement branding
  - P1-07: static maps
  - P1-08: touch targets
  - P1-09: off-system variables
  - P1-10: fictional data
- **P2 (during later screens):**
  - unlinked settings rows
  - unresolved overlay links
  - validation rules
  - inventory exchanges
  - error patterns
  - combo box
  - tertiary variants
  - payment states
  - messaging states
  - tablet
  - naming typos
- **P3 (production):**
  - real login and CORS
  - API URL normalization
  - push notifications
  - live maps
  - realtime
  - offline
  - accessibility audit
  - Font Awesome Pro licensing
  - error monitoring
  - deployment
  - design-system drift
  - Storybook
  - stale CRM clone

## 8. Approvals requested

| #   | Item                                | Finding / decision   |
| --- | ----------------------------------- | -------------------- |
| 1   | Technology stack and versions (§3)  | P0-04                |
| 2   | Provisional token values            | P0-02, P0-03 / DD-04 |
| 3   | Mapping of off-system variables     | P1-09 / DD-05        |
| 4   | Route model: frames are states      | P0-06 / DD-07        |
| 5   | Phone-only for the prototype        | P0-07 / DD-08        |
| 6   | MVP scope and success criteria (§4) | P0-09                |
| 7   | Touch-target deviation              | P1-08 / DD-09        |
| 8   | Provisional interaction states      | P1-01, P1-03 / DD-11 |
| 9   | Demo-flow fixes for dead ends       | P1-04, P1-05 / DD-12 |
| 10  | Neutral branding and static maps    | P1-06, P1-07 / DD-13 |

Items 2, 3, 7, 8, 9 and 10 also need **design confirmation** later. The prototype can go ahead on the provisional values.
