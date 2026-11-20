# Figma sources, inspection recipe and known traps

Verified 2026-11-20 through the Figma MCP (read-only).

## Files

| File                      | Key                      | Purpose                                                     |
| ------------------------- | ------------------------ | ----------------------------------------------------------- |
| BPC CRM – DS V2.0.0       | `Vg3xTJzSC89ASDPlkDiu8t` | Design-system library: tokens, components, mobile templates |
| BPC Technician App (Copy) | `eQsrTzf059xBW4h76G9zUY` | Screens, states, prototype                                  |

The app file uses the DS library: instance component keys match _BPC CRM – DS V2.0.0_. `get_libraries` lists only community kits (Material 3, Simple Design System, iOS 18), so **don't** read that list as "not linked". The exceptions are local copies of `Mobile Navigation Bar` and `main-header`, which carry the prototype links.

## Design-system pages worth knowing

| Page              | ID           | Contents                                                                                                                                                                   |
| ----------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Color             | `1:312`      | Brand frame `405:14823`, Alias frame `407:18490`, Drift Report `1731:48`                                                                                                   |
| Typography        | `1:313`      | Type scale `978:395`; audit note `1738:2414`                                                                                                                               |
| Dimensions        | `1:315`      | Border width, radius and spacing docs `984:330` (the docs table disagrees with component variables)                                                                        |
| Shadows           | `1:316`      | `44:80`                                                                                                                                                                    |
| Button            | `6:2`        | Variants `7:92`; audit note `1738:2415`                                                                                                                                    |
| Input Field       | `78:2403`    | Variants `101:30552`                                                                                                                                                       |
| Mobile Navigation | `1049:12375` | Bar variants `1049:12694`, tab on/off `1049:12685`                                                                                                                         |
| Main Header       | `1049:13499` | `main-header` `1055:1966`, `.timer` states `1055:1933`                                                                                                                     |
| Bottom Sheet      | `1055:1608`  | `bottom-sheets` `1056:2729`                                                                                                                                                |
| Containers        | `1056:3144`  | container, `.header-container`, item, `main-content` (with / without padding, empty) `1061:4839`, location-container                                                       |
| Also              | —            | Badge `101:31062`, Tabs `116:192`, Chips `1301:5662`, Accordion `338:2913`, Dialog Box `175:8794`, Dropdown `175:2872`, Notification-item `1056:2519`, Counter `1056:2883` |

Page names end in 🟢 or 🟠. The meaning isn't documented (probably done / in progress). All mobile templates are 🟠.

## Technician App pages

| Page             | ID            | Notes                                                                      |
| ---------------- | ------------- | -------------------------------------------------------------------------- |
| Log in           | `4867:106562` | 9 frames                                                                   |
| Home             | `34:12020`    | 4 clock states                                                             |
| Notification     | `4874:105807` | List + item-details sheet                                                  |
| Settings         | `4874:105808` | 11 frames                                                                  |
| Inventory        | `3:2681`      | 76 frames                                                                  |
| Schedule         | `0:1`         | 11 frames                                                                  |
| Appointments     | `3:20178`     | About 150 frames, including "NOT for Prototype / viewing only" long frames |
| Messages         | `9001:289284` | 11 frames                                                                  |
| New Prototype ✅ | `5581:2595`   | 322 frames: copies of every flow, wired together, plus overlay components  |

The frame ID for each route is in `docs/component-mapping.md` §4. All phone frames are **440×956**.

## Screen anatomy (all main screens)

| Region     | Figma                                                                                      | Web implementation                              |
| ---------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| Status bar | 62px `status bar - iPhone`                                                                 | **Don't build.** Use `env(safe-area-inset-top)` |
| Header     | `main-header`: 74px title-only, about 158px with `.timer`; `Drop Shadow/lg`; bottom radius | `MainHeader` (planned), sticky                  |
| Content    | `main-content`, 16px gutters, cards 408 wide                                               | Scrolls in `MobileLayout`                       |
| Bottom nav | 109px including the 29px home indicator                                                    | `BottomNav` (80px + safe-area inset)            |

Screens without a bottom nav: Login, Settings and its sub-pages, the Service Agreement document, Signing Pad, Thank You.

## Inspection recipe

1. `create_session({ fileKey, description })` once; pass `sessionId` to every later call.
2. `get_screenshot({ fileKey, nodeId, maxDimension: 640–1024 })` returns a short-lived URL.
   - Download each image with its own `curl -sfL -o <file> "<url>"` command.
   - If the download fails, check the HTTP status first (the URL may not be ready yet).
   - **zsh trap:** `set -- $var` doesn't split words in zsh. Don't build URL loops that way.
3. `get_metadata({ fileKey, nodeId: <frame id> })`. Calling it on a **page** usually exceeds the output limit and is saved to a file. Parse that file locally (JSON array of `{type, text}` holding XML) with `python3 -I`. Don't read it whole.
4. `get_variable_defs({ fileKey, nodeId })` returns the resolved variables used under that node.
   - It returns **resolved values only**: no collections or modes.
   - The same name can resolve differently on different frames; this is a known conflict, covered in design-tokens.md.
5. `get_design_context`: load the `figma-design-to-code` guidance first (skill or `skill://figma/figma-design-to-code/SKILL.md` through `get_figma_skill`). Adapt its output to this repo's tokens and components.
6. `search_design_system({ fileKey: 'Vg3xTJzSC89ASDPlkDiu8t', queries: [{ entity: 'component', query: '…' }] })` finds published components, variant sets and keys.

### Prototype reactions (read-only Plugin API)

The read tools don't expose prototype links. Use `use_figma` with a **read-only** script, after loading `figma-use` guidance (`skillNames: "resource:figma-use"`). The script must only read (`reactions`, `flowStartingPoints`, `getMainComponentAsync`) and must never set properties. Keep returns under 48 KB: aggregate per frame, and split by section if needed.

```js
// READ-ONLY. Outgoing links from one frame on the prototype page.
const page = await figma.getNodeByIdAsync('5581:2595');
await figma.setCurrentPageAsync(page);
const frame = await figma.getNodeByIdAsync('<prototype-page frame id>');
const out = [];
for (const n of frame.findAll((n) => 'reactions' in n && n.reactions.length)) {
  for (const r of n.reactions)
    for (const a of r.actions || []) {
      if (!a || a.navigation === 'CHANGE_TO') continue; // variant swaps = component state
      const dest = a.destinationId
        ? await figma.getNodeByIdAsync(a.destinationId)
        : null;
      out.push([
        n.name,
        r.trigger?.type,
        a.type,
        a.navigation || '',
        dest?.name || a.type,
      ]);
    }
}
return out;
```

Frame IDs on the prototype page are **different** from the flow-page IDs. Find the copy by name inside the matching section.

## Prototype facts already established

- **10 flows:** Login Flow 1, Truck Inventory, Site Verification, Service List (Unit), Service Done, Start: Appointment, Start Service (Incomplete Use Case), Start Service, Completed Start Service, Complete Service.
- **2,210 interactions:**
  - navigate 1,196
  - overlay 463
  - change-to (component state) 506
  - swap 17
  - scroll-to 10
  - back 14
  - close 4
  - after-delay 26 (toasts)
  - drag 11
- **Bottom nav:** Home → Home (Default), Inventory → **Review Inventory**, Schedule → Schedule, Appointment → Appointment, Message → Message.
- **Header:** bell → Notifications; avatar or name → Settings; timer buttons → clock states.

## Known Figma traps

| Trap                                                                                                  | What to do                                                                        |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Schedule frame highlights the **Inventory** tab                                                       | Treat as a design error; highlight Schedule (DD-12)                               |
| Reset password screens and "Reset password failed" have no way forward; logout confirm only goes Back | Apply DD-12 (return to Log In) and report                                         |
| Settings › Preferences and the profile edit button aren't linked                                      | Placeholder "Not designed yet" (DD-12)                                            |
| About 110 links point at nodes that aren't screens (mostly Service Details / Service List overlays)   | Check against the overlay components in "Prototype Components"; ask if unresolved |
| "NOT for Prototype / For viewing only" frames (440×1874–5308)                                         | Use for full scroll content only, not as separate screens                         |
| Tablet overlays 872–996px wide; "Review (Tablet)" labels                                              | Out of scope (phone only, DD-08) unless the user says otherwise                   |
| Service Agreement shows _Beeline Pest Control_ artwork                                                | Neutral BPC logo slot (DD-13)                                                     |
| Maps with routes (Home, Site Verification)                                                            | Static image (DD-13)                                                              |
| Lock-screen notification frames                                                                       | OS-level push; render as an in-app banner if needed                               |
| Misspellings ("Exchamge", "Danger – Outined", `showDropdwon`)                                         | Spell correctly in code                                                           |
