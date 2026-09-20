---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-151"
uid: ""
title: "One normative home for the accessibility gate — ARC-010, ADR-037, DBT-013"
status: done
priority: medium
effort: S
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-02T13:49:58Z"
completed: "2026-09-08"

# REGISTRO
type: mission
version: "1.1.0"
created: "2026-09-02T13:49:58Z"
created_source: "git:e4b94e7"
created_confidence: exact
updated: "2026-09-08T20:30:00Z"
author: "ursa"
owner: "oracle"
tags: [standards, accessibility, wcag, arc-10, adr, debt, dispersion]
license: "CC0-1.0"

paths:
  - standards/STD-005-engineering-standards.md
  - decisions/ADR-037-accessibility-gate-single-home.md
  - debt/DBT-013-design-system-filename-not-frozen.md
---
# MIS-151 — One normative home for the accessibility gate

> **Summary:** the same code-accessibility rule (WCAG AA) was asserted in
> three places — `numinia-web/CLAUDE.md`, the Design System §1.2, and an
> unattributed comment in `a11y.spec.ts` — with none citing the others.
> This mission gives it one ID, `ARC-010` in `STD-005`, ratified by
> `ADR-037`, and points the two code-facing documents at it.
> **Epistemic:** the Oracle asked where accessibility is documented and
> found it scattered without a single point of truth — this mission is the
> record of the audit and the fix, not a new capability.
> **Pragmatic:** anyone asking "does this repo require WCAG AA, and what
> actually checks it" now has one ID to cite, with the gate's real
> (partial) coverage stated where the rule lives, not buried in a comment.
> **Audience:** Agents · Oracles

---

## Context

Triggered by the Oracle's question, during the `numinia.org` SpeechPlayer
accessibility follow-up (after `MIS-152`): *"¿está en algún protocolo, en
alguna decisión o en algún estándar? ¿dónde hablamos de esto?"* — followed
by *"se me antoja que está un poco dispersada esa información"*.

Verified against the repo: the WCAG AA / accessibility requirement existed
in three places with no cross-reference between them —

1. `numinia-web/CLAUDE.md` — prose in "Code standards", no rule ID.
2. `STD-008` (then `standards/STD-008-design-system`, its §1.2/§12; now DSN-005, DSN-011) — correctly
   scoped to design (contrast, focus color, tap targets), not the same
   sujeto as the code gate, but read as duplication before closer reading.
3. `numinia-web/apps/store/e2e/a11y.spec.ts` — the actual CI gate
   (axe-core + Playwright, WCAG 2.0/2.1 A+AA, 28 platform routes, a
   dedicated tab-order test on the home nav). Its header comment cited
   *"the constitution's 'Semantic HTML. WCAG AA'"* — a phrase that no
   longer verbatim-matches either repo's `CLAUDE.md` (`git log -S`
   confirmed no hit), so the citation was unverifiable.

No `standards/` document had ever registered this as a numbered practice
(`STD-005` (now `STD-015`) lists `ARC-001`..`ARC-009` for other code-quality practices;
accessibility had no entry there at all).

**Second finding, out of this mission's scope by the Oracle's explicit
instruction:** the Design System standard, then named for the date
2026_08_18 with a v5.1.0 suffix, carries
a dated frozen-artifact filename while functioning as a living, revised
standard (already superseded one prior version; declares a six-month
review cadence). `PRO-010` (legacy dated names) (`MIS-125` ruling) currently forbids
renaming it, citing 71 incoming citations and a URL derived from the
filename. The Oracle's position: *the ruling's coherence work stands, but
a citation count does not make a wrong name right* — filed as `DBT-013`,
to be resolved in the Oracle's own dedicated pass. **Not executed here.**

## Scope

- `standards/STD-005-engineering-standards.md` §2.2 — add `ARC-010`: WCAG
  2.2 AA on every public route, tab order matches visual order, focus ring
  visible. `Check` column names the real gate
  (`numinia-web/apps/store/e2e/a11y.spec.ts`) and its real, partial
  coverage (platform chrome, not `/corpus/**` document routes).
- `decisions/ADR-037-accessibility-gate-single-home.md` — new ADR
  ratifying `ARC-010` as the single normative anchor; records why the
  Design System §12 is left untouched (different subject); records the
  Oracle's instruction to treat the filename question as deferred, not
  resolved, here.
- `debt/DBT-013-design-system-filename-not-frozen.md` — new debt entry
  registering the naming defect, owner Oracle, not executed.
- `numinia-web/CLAUDE.md` — new "Accessibility" subsection under Code
  standards, citing `ARC-010` instead of independent prose.
- `numinia-web/apps/store/e2e/a11y.spec.ts` — header comment corrected to
  cite `ARC-010`/`ADR-037` instead of the unattributed "constitution" quote.

**Out of scope:** renaming the Design System document (`DBT-013`);
amending or reversing `PRO-010` (legacy dated names) / `MIS-125`; closing the corpus
tab-order coverage gap itself (`ARC-010`'s check column states it, closing
it is future audit work, tracked loosely against `MIS-152`); any change to
`STD-005`'s own `Status: Proposal` vs. `status: active` frontmatter
mismatch, noticed in passing and not part of this mission.

## Acceptance criteria

Falsifiable at base commit `e4b94e7`:

```
✓  grep -n "ARC-010" standards/STD-005-engineering-standards.md
   matches                                   (today, pre-mission: 0 matches)
✓  test -f decisions/ADR-037-accessibility-gate-single-home.md
✓  test -f debt/DBT-013-design-system-filename-not-frozen.md
✓  grep -n "ARC-010" numinia-web/CLAUDE.md
   matches
✓  grep -n "ARC-010\|ADR-037" numinia-web/apps/store/e2e/a11y.spec.ts
   matches
✓  grep -n "the constitution's" numinia-web/apps/store/e2e/a11y.spec.ts
   no matches                                (today, pre-mission: 1 match)
✓  node machine/scripts/lint-frontmatter.mjs && node machine/scripts/lint-naming.mjs \
   && node machine/scripts/check-references.mjs      exit 0, no new violations
✓  cd numinia-web && npx tsc --noEmit -p apps/store/tsconfig.json \
   | grep a11y.spec                          no new errors
✗  Design System document renamed             (out of scope — DBT-013)
```

- [x] Verifiable by someone who did not do the work
- [x] False at the base commit — say what it returns today
- [x] Phrased as a final state, not as a delta
- [x] PRs opened and merged (deliberately left to the Oracle — not this
      agent's role to decide when a mission executes or merges)

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:** `ARC-010` added to `STD-005`; `ADR-037` and `DBT-013`
  written; `numinia-web/CLAUDE.md` and `a11y.spec.ts` updated to cite
  `ARC-010`. Committed on `decision/ADR-037-a11y-single-home`
  (`numinia-nwos`) and `docs/ARC-10-reference` (`numinia-web`), both
  pushed, neither PR opened — Oracle decides merge timing.
- **What diverged, and why:** none yet — mission written after the work
  landed, documenting it retroactively per the Oracle's explicit
  instruction ("ojo esto debe estar en una mision reflejado"). This is
  itself a process note: the mission should have preceded the commits,
  not followed them — noted so the pattern is not repeated.
- **Evidence:** commits on both branches above; linter output (3/3 clean).
- **Renumbered 2026-09-04:** this mission was drafted as 140 and its
  companion as 141. Both numbers were taken while the branch sat unmerged —
  `MIS-0140-publish-coverage-guard` and `MIS-0141-telemetry-view` are in
  `main`. They move to 151 and 152, the first free pair, verified against
  every remote branch and every open PR. `depends_on` and the cross
  references in `ADR-037` and `DBT-013` moved with them. Nothing else
  changed: same scope, same criteria, same closure text. *(The old numbers
  are named here without the `MIS-` prefix where they refer to this
  mission's own past identifiers, so the reference lint does not read them
  as citations of the documents that now hold them.)*
- **Merged / opened 2026-09-08:** `numinia-nwos` side merged as #245
  (ADR-037, ARC-010 in `STD-005`, DBT-013). `numinia-web` side: the branch
  `docs/ARC-10-reference` sat pushed without a PR since 2026-09-02; opened
  today as numengames/numinia-web#2 (2 files, 0 behind main). Merge timing
  there remains the Oracle's.
- **Closed:** 2026-09-08 · **by:** Oracle (instruction), executed by Ursa.

## Version history

- v1.0.0 (2026-09-02) — created.
- v1.1.0 (2026-09-08) — closed; numinia-web PR opened (#2); last checkbox ticked.
