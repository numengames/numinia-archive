<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: MIT
-->

# DESIGN.md — pablofm.com

> **SUPERSEDED (2026-08-18, Oracle order):** the Design System v5.0.0 rules —
> master at `standards/2026_08_18-Sistema_de_Diseno-v5.0.0.md`, living guide
> at https://numinia.org/diseno. This site wears the **Velo register** (§2.7)
> with the §19.3 canonical palette; the old local palette (teal `#2DD4BF`,
> terracota, ocre) is closed drift (MIS-092). What follows is kept as a
> historical reference of the viewer's layout/spacing conventions only —
> where it contradicts the system, the system wins.

**Version:** v0.1.0
**Format:** Google Stitch DESIGN.md (extended)
**Last updated:** 2026-04-04
**Author:** Centinela-01

> Drop this file into any project and tell your AI agent: "Build me a page that looks like pablofm.com" — it will understand the full design system instantly.

---

## 1. Visual Theme & Atmosphere

**Identity:** Personal brand site for Pablo FM — entrepreneur, co-founder, investor, creator.

**Mood:** Void-black canvas with subtle warmth. Serious but human. Technical precision with editorial soul. Like a terminal that learned to feel.

**Design philosophy:**
- Dark-first, always dark. No light mode.
- Minimal surface, maximum signal. Nothing decorative that doesn't earn its place.
- Craft in the details: noise texture, teal grid, glow — felt subconsciously, never noticed consciously.
- The Veil aesthetic: a subtle nod to Numinia's digital city (teal grid + bottom-left glow suggests a cityscape behind the void).

**Density:** Low. Generous whitespace. Content breathes.

**Personality:** Sharp, warm, honest. Not corporate. Not startup-bro. Quietly confident.

---

## 2. Color Palette & Roles

### Core palette

| Token | Hex | RGB | Role |
|---|---|---|---|
| `background` | `#000000` | 0 0 0 | Page background — pure black |
| `card` | `#0a0a0c` | 10 10 12 | Card surfaces, elevated containers |
| `card-hover` | `#12121a` | 18 18 22 | Card hover state |
| `border` | `#27272a` | 39 39 42 | Subtle borders, dividers |
| `foreground` | `#fafafa` | 250 250 250 | Primary text |
| `muted-foreground` | `#a1a1aa` | 161 161 170 | Secondary text, descriptions |
| `dim` | `#71717a` | 113 113 122 | Tertiary text, labels, timestamps |

### Accent

| Token | Hex | Role |
|---|---|---|
| `accent` | `#f97316` | Primary CTA, links, active states, highlights |
| `accent-glow` | `rgba(249,115,22,0.15)` | Radial glow from top-right — warmth |

### Veil palette (Numinia-inspired)

| Token | Value | Role |
|---|---|---|
| `veil-teal` | `rgba(166,218,213,0.025)` | Subtle grid lines — 40px grid |
| `veil-glow` | `rgba(1,142,161,0.06)` | Bottom-left radial glow — fog of the Veil |

### Semantic colors

| Token | Hex | Use |
|---|---|---|
| `green` | `#22c55e` | Active status, success states |
| `red` | `#ef4444` | Error, danger |
| `yellow` | `#eab308` | Warning |
| `blue` | `#3b82f6` | Info |
| `purple` | `#a855f7` | Special, premium |

---

## 3. Typography Rules

### Font families

| Role | Family | Fallback |
|---|---|---|
| Display / Headings | Instrument Serif | Georgia, serif |
| Body / UI | DM Sans | system-ui, sans-serif |
| Monospace / Labels | JetBrains Mono | ui-monospace, monospace |

**Load:** Google Fonts — `Instrument Serif` (ital 0,1), `DM Sans` (opsz 9-40, wght 300-700), `JetBrains Mono` (wght 400,500)

### Type hierarchy

| Level | Font | Size | Weight | Use |
|---|---|---|---|---|
| Hero H1 | Instrument Serif | 5xl–8xl (responsive) | Normal | Page titles, hero name |
| H2 | Instrument Serif | 3xl–4xl | Normal | Section titles |
| H3 | DM Sans | xl | Semibold | Card titles |
| Body | DM Sans | sm–base | Regular (400) | Content, descriptions |
| Label / Tag | JetBrains Mono | 0.65–0.75rem | Regular | Uppercase tracking-wide labels |
| Caption | JetBrains Mono | xs | Regular | Meta info, timestamps, dims |

### Display rules
- Hero uses `tracking-tight` with Instrument Serif — editorial feel
- Labels always `uppercase` + `tracking-[0.15–0.2em]` + `font-mono`
- Accent italic within Instrument Serif (`<em class="text-accent">`) for brand name emphasis

---

## 4. Component Stylings

### Buttons

**Primary (CTA):**
```
bg-accent text-background rounded-lg h-11 px-6 text-sm font-semibold
hover:bg-accent/90 transition-colors
inline-flex items-center gap-2
```

**Secondary (outline):**
```
border border-border text-foreground rounded-lg h-11 px-6 text-sm font-semibold
hover:bg-card hover:text-accent transition-colors
```

**Ghost (nav link):**
```
rounded-full px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em]
border border-transparent text-muted-foreground
hover:border-border hover:bg-card hover:text-foreground
Active: border-accent bg-accent/10 text-accent
```

### Cards

**Standard card:**
```
rounded-lg border border-border bg-card p-6
transition-all hover:border-border/80 hover:bg-card-hover
```

**Featured/highlighted card:**
```
rounded-xl border border-border bg-card p-8
```

### Tags / Badges

**Skill tag:**
```
rounded-full border border-border bg-background px-2.5 py-0.5
font-mono text-[0.6rem] text-dim
```

**Status badge:**
```
inline-flex rounded-full px-2 py-0.5 font-mono text-[0.65rem] font-medium
Active: bg-green/10 text-green
Past: bg-muted text-muted-foreground
Upcoming: bg-accent/10 text-accent
```

**Section label:**
```
font-mono text-[0.75rem] uppercase tracking-[0.2em] text-accent opacity-0 animate-slide-up
```

### Navigation

```
sticky top-0 z-50
border-b border-border/50 bg-background/85 backdrop-blur-xl
h-14
```

- Brand: `font-display text-xl` — "Pablo <em class='text-accent'>FM</em>"
- Links: ghost style (see above)
- Mobile: hamburger button `h-9 w-9 rounded-lg border border-border`

### Inputs / Form fields

```
w-full rounded-lg border border-border bg-card px-4 py-2.5
text-sm text-foreground placeholder:text-dim
focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent
transition-colors
```

Labels: `font-mono text-[0.7rem] uppercase tracking-[0.15em] text-dim mb-1.5`

### Highlight box

```
rounded-lg border border-border/50 bg-card/50 p-4 (or p-6)
```
Used for pull quotes, philosophy statements, key messages.

---

## 5. Layout Principles

### Container
```
mx-auto max-w-[1100px] px-6
```

### Sections
- Top padding: `pt-20 sm:pt-32` (hero) / `py-16` (standard) / `py-20` (CTA)
- Bottom padding: `pb-16` to `pb-20`
- Dividers: `border-t border-border`

### Grid
- Projects: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`
- Contact: `grid gap-12 lg:grid-cols-5` (3+2 split)
- Timeline: single column, `max-w-2xl`

### Spacing scale
- Gap between sections: `py-16` → `border-t` → `py-16`
- Internal card spacing: `p-6` standard, `p-8` featured
- Stack spacing: `space-y-3` to `space-y-8`

---

## 6. Depth & Elevation

### Background layers (bottom to top)
1. **Pure black** (`#000`) — base
2. **Veil grid** — `::before` — teal lines at 40px, 2.5% opacity — z-index: 0
3. **Content** — z-index: 1+
4. **Noise texture** — `::after` — fractal noise at 5% opacity — z-index: 9999

### Accent glows
- **Top-right warmth:** `radial-gradient(ellipse 60% 40% at 70% -10%, rgba(249,115,22,0.15), transparent)` — fixed, full viewport
- **Bottom-left veil fog:** `radial-gradient(ellipse 80% 60% at 0% 100%, rgba(1,142,161,0.06), transparent)` — part of Veil grid layer

### Shadow system
```
shadow-accent-sm: 0 0 12px rgba(249,115,22,0.15)
shadow-accent-md: 0 0 24px rgba(249,115,22,0.15)
```

---

## 7. Do's and Don'ts

### ✅ Do's
- Use `font-mono uppercase tracking-wide` for ALL section labels and metadata
- Always use `text-accent` for the "FM" in "Pablo FM" — never plain text
- Keep cards minimal — one clear piece of information, one action
- Use `backdrop-blur-xl` on sticky/overlapping surfaces
- Add `transition-colors` to all interactive elements
- Use `animate-slide-up` with staggered delays for hero entrance animations
- Keep CTAs in pairs: primary (accent) + secondary (outline)

### ❌ Don'ts
- No light mode. Ever.
- No gradients except the defined glows
- No rounded corners above `rounded-xl` (0.75rem radius system)
- Don't mix Instrument Serif and DM Sans at the same hierarchy level
- Don't use color for decoration — only for semantic meaning
- Don't add borders heavier than `border-border` — the palette is already high contrast
- No more than 2 CTAs per section

---

## 8. Responsive Behavior

### Breakpoints (Tailwind defaults)
| Breakpoint | Width | Key changes |
|---|---|---|
| mobile (default) | < 640px | Single column, hamburger nav |
| sm | ≥ 640px | Desktop nav appears, 2-col grids |
| lg | ≥ 1024px | 3-col grids, 5-col contact layout |

### Mobile specifics
- Nav collapses to hamburger at `< sm`
- Hero H1: `text-5xl` → `sm:text-7xl` → `lg:text-8xl`
- Touch targets: minimum `h-9 w-9` (36px)
- All grids: single column on mobile

### Collapse strategy
- Navigation: hamburger with animated slide-down menu
- Project grid: 1 → 2 → 3 columns
- Contact layout: stacked → 3+2 split

---

## 9. Animation System

### Entrance animations
```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Classes with staggered delays:
```
animate-slide-up   → 0.6s ease-out
animate-slide-up-1 → 0.7s ease-out 0.1s
animate-slide-up-2 → 0.7s ease-out 0.2s
animate-slide-up-3 → 0.7s ease-out 0.3s
animate-slide-up-4 → 0.7s ease-out 0.4s
```
All use `opacity-0` initial state + `both` fill mode.

---

## 10. Agent Prompt Guide

### Quick color reference
```
Background: #000000
Card: #0a0a0c
Border: #27272a
Text: #fafafa
Muted: #a1a1aa
Dim: #71717a
Accent (orange): #f97316
Green: #22c55e
```

### Ready-to-use prompts

**New section:**
> "Add a [section name] section following the pablofm.com design system: pure black background, max-w-[1100px] container, py-16 padding, border-t divider from previous section, section label in JetBrains Mono uppercase, Instrument Serif h2, DM Sans body text."

**New card:**
> "Create a card in the pablofm.com style: rounded-lg border border-border bg-card p-6, hover:bg-card-hover transition, Instrument Serif title with text-accent hover, DM Sans description in text-muted-foreground."

**New CTA:**
> "Add a primary CTA button: bg-accent text-background h-11 px-6 rounded-lg font-semibold text-sm hover:bg-accent/90, with a secondary outline button beside it."

**Full page:**
> "Build a new page for pablofm.com. Use the DESIGN.md system: void-black background (#000), orange accent (#f97316), Instrument Serif for headings, DM Sans for body, JetBrains Mono for labels. The page should feel like a personal brand site — editorial, minimal, technically precise."

---

*Generated by Centinela-01 from source code analysis of pablofm-web — 2026-04-04*
*Format based on Google Stitch DESIGN.md spec + VoltAgent/awesome-design-md extensions*
