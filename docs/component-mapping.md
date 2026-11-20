# Component Mapping

Status: **Proposed — awaiting approval**
Last updated: 2026-11-20

This document maps Figma design-system components and tokens to the CRM implementation and to what the Technician App needs. Priorities match `known-issues.md`; MVP means the component is needed for the local demo (`implementation-plan.md` §4).

## Classification

| Classification | Meaning                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Reusable**   | The CRM implementation matches Figma; re-implement it following the same API and values. |
| **Adapt**      | The CRM has it, but values, API or behavior differ from Figma.                           |
| **Missing**    | Figma defines it; the CRM has no equivalent. Build it new.                               |
| **Unclear**    | Figma contradicts itself or is silent; needs design input. Use a provisional value.      |

## 1. Tokens

| Figma token                                                 | CRM implementation                                        | Technician App requirement           | Recommendation                                         | Class    | Priority |
| ----------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------ | -------- | -------- |
| Brand palette, 11 hues × 50–900                             | Partial `--<hue>-<step>` in `index.css`; no pink or brown | Status colors, chips, schedule cards | Generate the full palette from Figma variables         | Adapt    | MVP · P0 |
| Alias tokens (`Surface/*`, `Text/*`, `Border/*`, `Icons/*`) | Almost none                                               | Every component                      | Create semantic CSS variables with the Figma names     | Missing  | MVP · P0 |
| `Neutral/30` #edeeee, `Neutral/60` #b8b8b8                  | `colors.css` #eeeeee / #8b8b8b                            | Borders, disabled fills              | Use the Figma values                                   | Adapt    | MVP · P0 |
| Type scale: 32 / 24 / 20 / 16 / 14 / 12, Inter              | Inter, 14px base, `.fs-*` utilities                       | All text                             | Type tokens per style; weights 400 / 500 / 700 (DD-04) | Adapt    | MVP · P0 |
| Spacing scale                                               | Bootstrap spacers                                         | Layout                               | Provisional tokens (DD-04)                             | Unclear  | MVP · P0 |
| Radius scale                                                | Mixed 4 / 6 / 8px literals                                | Buttons, cards, inputs               | Provisional tokens (DD-04)                             | Unclear  | MVP · P0 |
| Drop Shadow/default, /lg                                    | `.dropshadow-default`, `.dropshadow-lg` (identical)       | Header, cards, sheets                | `--shadow-default`, `--shadow-lg`                      | Reusable | MVP · P0 |
| Off-system variables in the app file                        | —                                                         | Home and other screens               | Map to DS tokens (DD-05)                               | Unclear  | MVP · P1 |

## 2. Components

| Figma component                                                        | CRM implementation                                               | Technician App requirement                   | Recommendation                                                         | Class    | Priority                          |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------- | -------- | --------------------------------- |
| Primary – Default / Outlined                                           | `Button` intent primary, solid / outline; same #0099fa / #008be4 | Main actions                                 | Re-implement the `Button` API; sizes small 24 / base 32 / large 42     | Reusable | MVP · P0                          |
| Secondary                                                              | `Button` intent secondary                                        | Cancel, sheet buttons                        | Read the exact styling from Figma                                      | Adapt    | MVP · P1                          |
| Tertiary – Default / Base                                              | `Button` variant ghost / link                                    | Header back, icon buttons (42×42)            | Confirm the difference with design (P2-07)                             | Unclear  | MVP · P1                          |
| Danger – Default / Outlined, Success                                   | `Button` intent danger / success                                 | Clock In / Stop / Break                      | Re-implement; verify the Success color #56bd5b                         | Adapt    | MVP · P0                          |
| Button states (only default / hover / disabled in Figma)               | `state` includes loading and active                              | Touch feedback, async actions                | Provisional pressed / focus / loading (DD-11)                          | Unclear  | MVP · P1                          |
| Grouped CTA (48px), floating-button                                    | —                                                                | Sheet footers; Schedule +                    | Build                                                                  | Missing  | P2                                |
| Input Field: label / input / placeholder × 7 states                    | `Input` (label above, error, icons, 38px)                        | Login, notes                                 | Floating label; 33px visual size, 44px tap area, 16px text (DD-09)     | Adapt    | MVP · P0                          |
| Dropdown Field / Combo box                                             | `Select` (979 lines, desktop popover)                            | Schedule › Add Appointment                   | Bottom-sheet picker (P2-06)                                            | Adapt    | P2                                |
| Checkbox, Radio, Switch                                                | `Checkbox`, `Radio`, `Toggle`                                    | Remember me, payment options                 | Restyle to the tokens                                                  | Reusable | MVP (Checkbox) · P2               |
| Radio Card                                                             | —                                                                | Payment method                               | Build                                                                  | Missing  | P2                                |
| Badges: Labeled, Labeled-muted, Status, Custom Status, Non-labeled dot | `Chip` (inline colors)                                           | Status pills, quantity tags, unread dots     | Token-based `Badge` with named variants                                | Adapt    | MVP · P0                          |
| Tab Group Mobile                                                       | `Tabs` / `TabList` / `TabPanel`                                  | Service List unit / service; Truck Inventory | Reuse the behavior, restyle                                            | Adapt    | MVP · P1                          |
| Mobile Navigation Bar (5 tabs, badge)                                  | CRM prototype `tech-nav` (unicode icons, extra Security link)    | Global navigation                            | Rebuild from Figma; drop the Security link                             | Adapt    | MVP · P0                          |
| main-header + `.timer` (default / clock in / break / out)              | —                                                                | Home, Settings, list screens                 | `MainHeader` + `ClockTimer`, clock-state store                         | Missing  | MVP · P0                          |
| Title header (back button + title + actions)                           | —                                                                | Appointment, Service List, Site Verification | Variant of `MainHeader`                                                | Missing  | MVP · P0                          |
| bottom-sheets                                                          | Custom desktop off-canvas                                        | Notes, item details, add items               | `BottomSheet` (react-bootstrap `Offcanvas` placement bottom, restyled) | Missing  | MVP · P0                          |
| Toast Alert                                                            | `Toast` + `useToastStore` (Pro icons)                            | ~15 confirmation toasts                      | Re-implement the store pattern with free icons; auto-dismiss           | Adapt    | MVP · P1                          |
| container / .header-container / item / main-content                    | `DynamicCard`, `CollapseCard`                                    | Every card and list                          | `Card`, `CardHeader`, `ListItem`, `PageContent`                        | Missing  | MVP · P0                          |
| main-content type=empty                                                | `EmptyState` (title, description)                                | Empty lists                                  | Add the icon circle                                                    | Adapt    | MVP · P1                          |
| Accordion                                                              | `CollapseCard`                                                   | Notes, Details, Products, Instructions       | `Accordion` using the CSS grid-row animation                           | Adapt    | MVP · P0                          |
| Counter (+/− stepper)                                                  | —                                                                | Supplies and equipment quantities            | Build                                                                  | Missing  | P2 (MVP if Inventory is included) |
| Notification-item, item-messages                                       | —                                                                | Home recent messages, notifications, inbox   | `MessageListItem`                                                      | Missing  | MVP (Home) · P2                   |
| Chat Bubble                                                            | —                                                                | Chat                                         | Build                                                                  | Missing  | P2                                |
| Avatar                                                                 | `Avatar` (Pro icons, `colorUtils`)                               | Header, messages                             | Re-implement with free icons                                           | Reusable | MVP · P0                          |
| Alert / warning banner                                                 | —                                                                | "Previous appointment has not been closed"   | Use the DS Alert styling                                               | Missing  | MVP · P1                          |
| location-container / map                                               | `mapbox-gl`                                                      | Home, Site Verification                      | Static image (DD-13)                                                   | Unclear  | MVP · P1                          |
| Signature overlay / Signing Pad                                        | CRM prototype `SigningPadModal` (canvas)                         | Service Agreement                            | Re-implement the canvas approach in a bottom sheet                     | Adapt    | MVP · P0                          |
| Image Upload / Add Picture                                             | `imagepicker` (desktop)                                          | Site Verification, unit photos               | `<input type="file" accept="image/*" capture>` + preview               | Adapt    | MVP · P1                          |
| Appointment Cards / day timeline                                       | Desktop scheduler                                                | Schedule                                     | Build                                                                  | Missing  | P2                                |
| Status bar, home indicator, keyboard                                   | —                                                                | —                                            | Don't build (DD-08)                                                    | —        | —                                 |

## 3. Icons (free Font Awesome)

| Figma icon                             | Free package                             | Note                                                     |
| -------------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| `fa-regular/house`                     | free-solid `faHouse`                     | Regular style may be Pro; verify, and fall back to solid |
| `fa-regular/box-open`                  | free-solid `faBoxOpen`                   | Same                                                     |
| `fa-regular/calendar`                  | free-regular `faCalendar`                | Expected free; verify                                    |
| `fa-regular/clipboard-list`            | free-solid `faClipboardList`             | Regular style may be Pro; verify                         |
| `fa-regular/message`                   | free-regular `faMessage`                 | Expected free; verify                                    |
| `fa-regular/bell`                      | free-regular `faBell`                    | Expected free; verify                                    |
| `fa-regular/clock`                     | free-regular `faClock`                   | Expected free; verify                                    |
| `fa-regular/location-arrow`            | free-solid `faLocationArrow`             | Regular style may be Pro; verify                         |
| `fa-regular/angle-right`, `angle-down` | free-solid `faAngleRight`, `faAngleDown` | Regular style may be Pro; verify                         |
| `fa-solid/play`, `pause`, `stop`       | free-solid                               | Available free                                           |
| `fa-regular/xmark`                     | free-solid `faXmark`                     | Regular style may be Pro; verify                         |

Which icons are in the free sets is checked at install time; this table is updated with the result.

## 4. Screens to routes

| Logical screen               | Route                             | Main Figma frame | MVP         |
| ---------------------------- | --------------------------------- | ---------------- | ----------- |
| Log In                       | `/login`                          | 9001:225834      | ✅          |
| Reset password               | `/login/reset`                    | 9001:225960      | —           |
| Home (4 clock states)        | `/home`                           | 9001:226677      | ✅          |
| Notifications (+ item sheet) | `/notifications`                  | 9001:227918      | —           |
| Settings and sub-pages       | `/settings`, `/settings/:section` | 9001:228944      | —           |
| Review Inventory             | `/inventory`                      | 9001:230421      | Stretch     |
| Truck Inventory              | `/inventory/truck`                | 9001:231299      | —           |
| Order List                   | `/inventory/orders`               | 9001:233437      | —           |
| Exchange requests            | `/inventory/requests`             | 9001:233739      | —           |
| Schedule                     | `/schedule`                       | 9001:253266      | Placeholder |
| Add Appointment              | `/schedule/new`                   | 9001:253434      | —           |
| Appointment                  | `/appointments/:id`               | 9001:262230      | ✅          |
| Site Verification            | `/appointments/:id/site`          | 9001:262696      | ✅          |
| Start Service (review)       | `/appointments/:id/start`         | 9001:263653      | ✅          |
| Service List                 | `/appointments/:id/services`      | 9001:258181      | ✅          |
| Unit Details                 | `/appointments/:id/units/:unitId` | 9001:258085      | —           |
| Service Agreement + signing  | `/appointments/:id/agreement`     | 9001:259335      | ✅          |
| Payment                      | `/appointments/:id/payment`       | 9001:262017      | —           |
| Thank You                    | `/appointments/:id/complete`      | 9001:264842      | ✅          |
| Messages                     | `/messages`                       | 9001:289312      | Placeholder |
| Chat                         | `/messages/:threadId`             | 9001:290041      | —           |
