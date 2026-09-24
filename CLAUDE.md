<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**`AGENTS.md` is the canonical agent context (AGT-001); this file is the Claude Code adapter.** Read `AGENTS.md` first: the branch audit, the transition regime, the repository map, the root commands and the rules that govern work here live there and are not restated below. What follows is only what is specific to `web/`, the Astro viewer that serves numinia.org.

## Stack (`web/`)

Astro 7, `output: "static"`, no adapter — fully static, deployed to Cloudflare Workers as static assets (`web/wrangler.toml`, worker `numinia-nwos`, domain `numinia.org`). React 19 islands only where a `client:` directive is used. Tailwind 4 as a Vite plugin (`@tailwindcss/vite`): there is no `tailwind.config.mjs`, the theme is an `@theme` block in `web/src/styles/global.css`, and the RGB triplets in `:root` remain the source every hand-written rule reads. shadcn/ui in `web/src/components/ui/`. Path alias `@/*` → `web/src/*`. Dark-only design system in `web/DESIGN.md`; accent teal `#2DD4BF`, fonts Geist/Geist Mono.

- **Routes**: `web/src/pages/`. Dynamic routes map over TS modules in `web/src/data/` with `getStaticPaths()`.
- **Corpus data**: the repository's own folders are the source, read at build time through Astro's Content Layer (`web/src/content.config.ts`). No index file, no client-side GitHub calls — a document added to `missions/` or `standards/` appears because the folder changed.

## Commands (inside `web/`)

- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — production build to `web/dist/`; runs the licence guard and the share-card generator first
- `npm run type-check` — `astro check`
- `npm run check:responsive` — the responsive ratchet
- Deploy: `npm run build`, then `npx wrangler deploy`. CI runs the build only.

There is no `build:pdf`. It was documented here and in `OPS-008` as part of the deploy flow, and neither the script nor the `/print/*` routes it printed exist in the tree — `machine/templates/MIS-TEMPLATE-EXAMPLE.md` already noted it never runs.

## Engineering standard

`STD-005` is this repository's own operative standard, not a copy of anyone else's, and `PRO-016` is how it is applied to a task. Numinia is NWOS's first client: a practice is proven here and only then offered to `nwos-workspace-template` as a proposal other organisations may adopt and then govern themselves. There is no upstream — a change to `STD-005` is a local ADR and PR in `decisions/`, never routed elsewhere, and the mould's copy diverging is adoption, not drift (`ADR-001`).

## Licensing

`STD-010` is the rule and `CAN-005` is the reasoning; neither is restated here. Read `STD-010` before adding a dependency, changing a `LICENSE`, `LICENSES/` or `REUSE.toml`, or making anything public — it says what each directory emits, which licences may be consumed, how the strongest copyleft in the distributed tree sets the outbound floor, and which acts stop for the Oracle.

Until 2026-09-22 this file carried a hand-copied summary of that standard. `DBT-020` records what it cost: `reuse lint` reported the same two defects twice, once per copy. One rule, one home.
