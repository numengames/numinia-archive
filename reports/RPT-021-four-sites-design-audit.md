---
id: "RPT-021"
uid: ""
title: "Only numinia.com serves day and night; three sites paint outside the palette, the scale or the type"
type: report
subtype: audit
status: active
version: "1.0.0"
created: "2026-09-24T19:00:00+02:00"
updated: "2026-09-24T19:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Product"
tags: [report, audit, design-system, four-sites, day-night]
license: "CC-BY-4.0"
visibility: "public"
scope: "The sixteen yes-or-no rules of the design tokens standard against the source and the served home of numinia.org, numinia.com, numen.games and nwos.numen.games. Not examined: pages other than each home when served; a browser-rendered contrast run."
evidence_head: "numinia-archive 7e70ac1 · numinia-web 05a9d4f · numengames-web fc03071 · nwos-deploy 77665f7"
related: ["MIS-154"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# RPT-021 — Only numinia.com serves day and night; three sites paint outside the palette, the scale or the type

> **Summary:** On 2026-09-24 numinia.com holds most of the sixteen design
> rules; numinia.org, numen.games and nwos.numen.games lack day and night,
> and each breaks at least two more rules a visitor can see.
> **Epistemic:** Where each site stands against each design rule, measured
> in its source and on its served home.
> **Pragmatic:** The order of the fixes the mission `MIS-154` (bring the four
> sites to the design system) runs, one pull request per site.
> **Audience:** Agents · Oracles

---

## 1. Scope and method

The rules are the sixteen of `standards/STD-008-design-tokens.md` (the
yes-or-no rules of the design system), read with their closed lists in
`STD-023` (the values: palette, radii, icons, animations, footer, share card)
and the switch recipe in `BLU-009` (the web pieces).

Two instruments, both re-runnable:

- **Source.** A script greps each site's source folder (`web/src`,
  `apps/store/src`, `src`, `src`), tests, fixtures and legal copies excluded:
  every six-digit hex compared with the 36 values of
  `machine/packages/design-kit/sistema.tokens.json`; radii; `@keyframes` and
  animation classes; icon libraries; font declarations; every
  `localStorage`/cookie key; third-party scripts; `data-modo`; the CI
  workflows for the checks the standard's table names.
- **Served home.** `curl` of each home on the same day: `<html>` attributes,
  head meta, icons, footer links, the `/legal/cookies` status.

Contrast (DSN-005, DSN-011) was not measured in a browser in this pass; the
verdict comes from the checks each repository already runs.

**Measured at:** the four heads in the header, 2026-09-24.

---

## 2. Findings — the table

✅ holds · ❌ fails · ⚠️ partly · ❔ cannot tell from this pass

| Rule | numinia.org | numinia.com | numen.games | nwos.numen.games |
|---|---|---|---|---|
| **DSN-016** Day and night | ❌ no switch; `<html class="dark">`, `global.css:178` fixes `#14110F`; `data-modo` only on `/design` | ✅ switch in the bar (`SiteHeader.astro:51`), moon-stars / sun, follows the OS until chosen, `numinia-modo`, pre-paint script (`BaseLayout.astro:58`), e2e `preferences.spec.ts` | ❌ no switch, no `data-modo` in source or served home | ❌ no switch; `<html class="dark">` |
| **DSN-001** Palette closed | ⚠️ 144 of 147 hexes in the palette; 3 foreign in `lib/agents.ts:126,133,140` (`#E08BB5`, `#7FC4B8`, `#B0B7C3`) | ⚠️ 74 of 76; `#E4D6C4` in `styles/codex.css:50,1110` | ❌ 18 of 24; `tokens.css` is a hand-built draft palette (`#1F9CAC`, `#DF6A72`, `#C62B37`, `#998D84`, `#C8B6A2`) that says itself it is "not the brand palette" | ✅ 40 of 40 |
| **DSN-002** Type self-hosted | ✅ Geist / Geist Mono from `@fontsource-variable` | ✅ Geist woff2 from the build, preloaded | ❌ no house type: Georgia and system fonts (`tokens.css:68-70`) | ✅ Geist from `@fontsource-variable` |
| **DSN-003** Space and radii on the scale | ❌ radius base `0.75rem` = 12 px (`global.css:160`); `rounded-xl` ×70, `rounded-2xl` ×10, `3px`, `0.6rem` | ⚠️ radii through `--radio-control`/`--radio-marco`; strays `10px` (`codex.css:637,665,845`), `4px`, `1px` | ❌ `--radius: 4px` (`tokens.css:98`) on every piece | ⚠️ `--radius` 8 / control 6 from the kit; strays `3px` (`global.css:173`) |
| **DSN-004** One icon family | ⚠️ Phosphor, self-hosted, but 70 glyphs where the house subset is 31 (e.g. `robot`, `brain`, `bank`, `confetti`) | ✅ Phosphor from the subset (`chrome/Icon.astro`) | ✅ no icons in use (`astro-icon` declared, unused) | ❌ two hand-drawn stroke SVGs (`Navigation.astro:51,102`), not Phosphor |
| **DSN-005** Contrast AA | ❔ no contrast check in CI | ✅ axe in both modes (`e2e/a11y.spec.ts:52`) | ⚠️ `scripts/check-contrast.mjs` in `pnpm test`, but over its own draft palette | ❔ no contrast check |
| **DSN-006** Never colour alone | ❔ visual review pending | ❔ | ❔ | ❔ |
| **DSN-007** Integer pixels | ❔ | ❔ | ❔ | ❔ |
| **DSN-008** Text before motion | ✅ `prefers-reduced-motion` ×14 | ✅ ×10 | ✅ ×2 (little motion) | ⚠️ ×3; the loading spinners do not stop |
| **DSN-009** Kit installed | ❌ not installed; hand copy `web/public/design/kit/sistema.css` differs from the source | ❌ not installed; `packages/ui/src/sistema.css` is a v5.0.0 copy | ❌ not installed; own `tokens.css` | ⚠️ installed, but pinned to kit 6.0.0 — the source is at 6.2.0 and has no 6.2.0 release |
| **DSN-010** A value exists | ⚠️ as DSN-001 + DSN-003 | ⚠️ as DSN-001 | ❌ as DSN-001 + DSN-003 | ✅ except the `3px` |
| **DSN-011** Routes pass AA | ❔ no gate | ✅ axe gate on public routes, both modes | ❔ no gate | ❔ no gate |
| **DSN-012** Motion catalogued | ⚠️ `slideUp` 0.6–0.7 s (the catalogue's reveal is 320 ms); the sky `twinkle` CSS keyframe beside the canvas sky | ✅ only `trazo` (no. 13) | ✅ no animation | ❌ `animate-spin`, `animate-pulse` (not in the fifteen; the catalogue has the lunar phase and waiting dots), `slideUp`, `twinkle` |
| **DSN-013** House footer | ⚠️ holds, but the licence link opens `LICENSE`, not `REUSE.toml` | ⚠️ holds, but the commit prints `dev` in production (no SHA) | ✅ (no Cookies link — see DSN-015) | ✅ (no Cookies link) |
| **DSN-014** Link presents itself | ⚠️ scarab ×3 and card, but the home `description` ("The archive where Numinia's source of truth lives…") differs from the line fixed in `STD-023` | ✅ | ✅ | ⚠️ `description` ("…for organizations that need alignment, memory…") differs from the fixed line |
| **DSN-015** Says what it stores | ✅ stores nothing | ❌ writes three keys the cookie policy `OPS-010` does not name: `numinia-lap-hidden` (`lap/SettingsPage.astro:230`), `numinia-codex-modo` and `numinia-codex-tam` (`scripts/codex-reader.ts:20-21`); the other four are named | ⚠️ stores nothing, but `/legal/cookies` is 404 | ⚠️ stores nothing, `/legal/cookies` 404 |

**Which checks run where** (the standard's check table against the four CI
files): the version bump (DSN-013) and the share-card check (DSN-014) run in
all four. The storage check `check-storage` (DSN-015) runs in none. The
design-kit identity check (DSN-009) runs in none of the consumers. Playwright
with axe in both modes (DSN-005, DSN-011, DSN-016) runs only in numinia.com.

## 3. Fails per site, in the order a visitor notices them

**numen.games** — 1. no day mode; 2. wrong type (Georgia/system instead of
Geist) and wrong palette (a draft of its own): the site looks like another
company's; 3. radii of 4 px everywhere; 4. no kit installed.

**nwos.numen.games** — 1. no day mode; 2. spinners and pulses outside the
catalogue; 3. two non-Phosphor icons in the navigation; 4. kit pinned one
release behind (the source has no newer release to take).

**numinia.org** — 1. no day mode; the styles are written for night only
(`global.css` fixes the colours, `class="dark"` on `<html>`); 2. radii of 12
and 16 px on cards; 3. entrance animation slower than the catalogue's
reveal; 4. three foreign agent colours; 5. 70 icons where the subset has 31;
6. footer licence link to `LICENSE`.

**numinia.com** — 1. commit `dev` in the footer on the live site; 2. three
browser-storage keys (reader mode, reader size, hidden player-area items)
not named in the cookie policy; 3. one foreign hex and three stray radii in
the codex; 4. kit copied at v5.0.0, not installed.

## 4. Findings for the Oracle (rules, not sites)

0. **numinia.org leads the design (the Oracle, 2026-09-24).** It is the most
   advanced of the four, and some of what this table marks against it may be
   what the system should recover rather than what the site should lose —
   its radii, its entrance motion and its wider icon set among them. No fix
   on numinia.org flattens it to the written rule without the Oracle's word;
   each such case is put to him first, one by one.

1. **The icon subset.** numinia.org serves 70 Phosphor glyphs; the subset
   names 31. Either the subset grows or the site drops glyphs — a decision,
   not a fix.
2. **The kit has no current release.** Source 6.2.0, latest release 6.0.0:
   no site can install what the source says today.
3. **Footer legal column.** numen.games and nwos.numen.games do not link a
   cookie policy, though the cookie policy `OPS-010` covers the four sites.

---

## 5. What this report did NOT examine

- Contrast in a real browser for numinia.org, numen.games and
  nwos.numen.games (DSN-005, DSN-011): marked ❔, to be run with each PR.
- DSN-006 and DSN-007 need a visual review of rendered pages: ❔ everywhere.
- Pages beyond each home when served; the source scan covers all pages.
- Space (the 4 px gap scale) beyond radii: Tailwind spacing is on the 4 px
  scale by construction; hand-written gaps were not listed.
