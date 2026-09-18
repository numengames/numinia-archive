# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**First instruction (AGT-001): audit the current branch state before assuming anything.** Never trust that the repo matches this file, a README, or a mission brief — read what is actually there first.

**Second instruction: `AGENTS.md` § Transition regime applies.** While the protocols are `draft` they describe, they do not bind — no mission card, no activation commit, no ADR for a chat decision, no task classification, no load score. What still holds is listed there (one PR per repo, CI green, `/updates` entry + version, CHANGELOG entry, reserved regimes untouched).

## Engineering standards (ours, proven here)

`standards/STD-005-engineering-baseline.md` is **this repository's own operative standard**, not a copy of anyone else's. Agents MUST follow `protocols/PRO-016-applying-the-engineering-standard.md`: classify every task as cosmetic or irreversible; when in doubt it is irreversible and needs Oracle sign-off. Never change LICENSE/SPDX/REUSE structure, repo visibility, or secrets autonomously; never weaken a check to make a task pass. Reference practice IDs (e.g. `SEC-007`, `ARC-003`) in commits that touch them. Numinia is NWOS's first client: practices are proven here and only then promoted to `numen-games-nwos-orgs/nwos-workspace-template` as a starting proposal that other organizations may adopt and then govern themselves (G-12). There is no upstream — changes to that document are a **local ADR + PR** in `decisions/`; never route them elsewhere. The mould's copy may diverge: that is adoption, not drift, and it is not to be synced (ADR-001 (formerly ADR-003)). Scorecard checks in scope here: all except those requiring org-level settings (tracked in MIS-070).

## Repository layout

This is the Numinia NWOS workspace: canon, lore, missions, protocols and operations live in the root directories (`canon/`, `missions/`, `protocols/`, `operations/`, …). The public viewer for that canon is an Astro app in `web/`, extracted from `numinia-nwos-viewer`.

## Commands (run inside `web/`)

- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — production build to `web/dist/`
- `npm run build:pdf` — after build: prints every `/print/*` page to `web/dist/pdf/*.pdf` with Chromium and removes `dist/print/` (MIS-088). Deploy flow is build → build:pdf → `npx wrangler deploy`; CI runs build only.

CI (`.github/workflows/ci.yml`) runs on every push/PR: `npm run guards -- --rules` (every guard registered in `scripts/blind-spots.json` — `guards/rules/std-NNN-*.mjs` on the R2 contract, one per standard, plus `scripts/check-templates.mjs`, which reads the moulds against five standards at once and stays its own guard), `npm test` (`scripts/test/*.test.mjs` + `guards/test/*.test.mjs`), the web build, then `npm run guards -- --build` (the ratchets that need `web/dist`). OpenSSF Scorecard runs weekly. Node ≥ 22.12 required.

## Stack & architecture (`web/`)

Astro 5, `output: "static"`, no adapter — fully static, deployed to Cloudflare Workers as static assets (`web/wrangler.toml`, worker `numinia-nwos`, domain `numinia.org`). React 19 islands only where a `client:` directive is used. Tailwind 3 with tokens as CSS vars in `web/src/styles/global.css`, shadcn/ui in `web/src/components/ui/`. Path alias `@/*` → `web/src/*`. Dark-only design system documented in `web/DESIGN.md` (its layout/spacing rules apply; accent is teal `#2DD4BF`, fonts are Geist/Geist Mono).

- **Routes**: `web/src/pages/`, mostly static `.astro` pages in Spanish (`misiones`, `decisiones`, `planos`, `reportes`, `archive`, etc.). Dynamic routes (`[id].astro`) map over hardcoded TS modules in `web/src/data/` with `getStaticPaths()`; `archive/[fondo].astro` keeps its data inline in the page.
- **Mission data**: `/missions` (board and detail) builds entirely at build time from this repo's flat `missions/` folder via Astro's Content Layer (`web/src/content.config.ts`, glob loader with base `../missions`). The `status:` frontmatter field is the only state surface — no status directories, no index file, no client-side GitHub API calls (MIS-066). `/misiones` and `/misiones/[id]` are redirects to `/missions` kept for old URLs (`astro.config.mjs`).

## Environment variables

None. The viewer needs no secrets to build or run.

## Licensing — from Numinia STD-010 (source of truth; do not edit here)

**Emit:** `packages/*` — library/SDK/types/tokens/script/CI/infra → `MIT` ·
`apps/*` — deployable app that *decides* (identity, progression, billing) →
`AGPL-3.0-only` · code on a third-party strong-copyleft engine, **separate repo** →
the engine's · assets/data/metadata/design tokens → `CC0-1.0` · docs/ADRs/specs →
`CC-BY-4.0` · lore/brand/unpublished → none, all rights reserved.

A monorepo may mix these: declare per directory in `REUSE.toml`. Dependencies MUST
flow apps → packages, never the reverse. **One file, one regime:** never write an
`AND` expression mixing an open license with reserved — that is an unsatisfiable
permission. Split the content out into its own file instead.

**Generators:** a generator never propagates its own license to what it generates. The
template is ours (usually MIT); the generated work belongs to whoever commissioned it,
and the template MUST emit a reserved-rights `LICENSE` in the client's name — never its
own, never none. Reserved means a `LICENSE` that says so; silence does not declare.

Every code file starts with:
<!-- REUSE-IgnoreStart -->
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT   (or the applicable ID)
<!-- REUSE-IgnoreEnd -->

**Consume:** MIT · ISC · BSD · Apache-2.0 · 0BSD · CC0-1.0 · CC-BY-4.0 freely.
MPL-2.0 · EPL-2.0 · LGPL-3.0 with isolation. **Third-party** GPL/AGPL only in a
separate repo with a signed decision. NEVER: BUSL, SSPL, Elastic, Commons Clause,
proprietary, CC-NC, CC-ND. Resolve every dependency's SPDX from the registry BEFORE
adding it — never from memory.

**Present is not distributed.** A forbidden transitive dependency that tree-shaking
keeps out of the artifact does NOT block work, but MUST be logged as a `debt/` entry tagged `legal` (`LIC-006`, `STD-010`)
with an **exit threshold** (a condition, not a date, evaluated by CI on every build)
and guarded by a check that inspects the artifact's **contents** — bundler metafile or
module paths, never comment strings, which minifiers strip. Hard limit: **if that
licence imposes additional restrictions and the artifact is AGPL, no exception is
possible** — the result is unsatisfiable, not merely undesirable. A missing `license`
field is a hygiene signal, not a breach on its own: it blocks while the terms are
unknown and clears once you read the package's LICENSE and document them.

**Floor rule:** the strongest copyleft in the distributed tree sets the minimum
outbound license — one GPL import excludes MIT output. devDependencies and build tools
don't count; whatever ships in the client bundle does.

**Contributions:** any repo containing AGPL code requires a CLA (per repo, not per
path); MIT-only repos and docs use DCO (`git commit -s`); asset PRs need an explicit
CC0 declaration.

**Header exception:** never edit pinned third-party kits, vendored code, generated
artifacts or metadata-less binaries to insert an SPDX header — declare them in
`REUSE.toml` or an adjacent `.license` file.

**Repo skeleton on creation:** `LICENSE` · `LICENSES/` · `REUSE.toml` ·
`TRADEMARKS.md` · `NOTICE` if Apache-2.0 ships · `license` field in every
package.json. CI runs `license-check`: error on `.com`, warning on `.store`.

**Stop and ask — never proceed alone:**
- **Turning any repository public** — that IS the grant, before any `npm publish`.
  Gated and signed off, like Arweave. Verify the sensitive directories against a real
  listing, never a hand-written list.
- Publishing anything CC0 to Arweave (irreversible; gated; requires sign-off)
- Ownership of a piece is unclear or undocumented
- Files containing people, voices, or personal data — CC0 waives our rights, never
  someone else's
- Any license outside the lists above

**CI severity defaults to error.** Warning is the listed exception, for surfaces that
neither deploy to production nor publish. Severity follows exposure, not directory or
domain names; if exposure can't be determined, error.

Why we license this way: `CAN-005`. What must be done: `STD-010`. This block is
authoritative for day-to-day work; when it is silent, ask rather than infer.
