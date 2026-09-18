---
id: "STD-015"
uid: ""
title: "Engineering checks"
type: documentation
subtype: register
status: draft
version: "1.3.0"
created: "2026-08-17T21:55:38+02:00"
updated: "2026-09-18T16:04:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards, engineering, ci, register, practices]
license: "CC0-1.0"
series_change: "1.3.0 — the family pipeline: a section names the five repositories that run the same guards (the four sites and the resource depot), the steps in order, which of them fail a build and which only report while this register is draft (ENG-067), the literal job name the ruleset requires, the files kept identical across repositories and the security rules every workflow obeys. Measured on 2026-09-18 before the change: one repository required no status check at all, one wrote its pipeline in Spanish, one lacked lint, two lacked Scorecard, three lacked a REUSE step. Minor under VER-022: the register says what it already required, in a form a diff can check; no practice reversed. Oracle instruction, 2026-09-18: the guards look but do not bite while the standards are draft. 1.2.0 — the Check column becomes machine-checkable and `[MANUAL]` is retired. Four forms replace it, each verifiable by tools/check-register.mjs: `[AUTO: <mechanism>]`, `[GATE: <machine evidence> → <the human act>]`, and `[DEBT: <what is missing> — <owner>, <date>]`. Measured before the change: of 29 rows claiming AUTO, 7 named a mechanism absent from the tree (no gitleaks, no knip, no .env.example, no .editorconfig, no eslint config, no roadmap file, no code of conduct), and 3 rows claimed MANUAL for work a guard already did (ARC-003 std-010-licensing, AGT-002 guards/lib/naming.mjs, DEV-005 prose-in-code.test.mjs) — a hand-written register drifts in both directions. Rows now stand at 23 AUTO, 4 GATE, 27 DEBT; the summary said 52 practices for a table of 54. TRC-006 is mechanical: an unregistered rule guard never runs and the run is green for not looking. Minor under VER-022: what the register requires of its own rows changed, no practice was reversed. The retirement of MANUAL reads as a reversal (VER-023) and is left for the Oracle to rank."
---

# Engineering checks

> **Summary:** The 54 practices `STD-005` requires, by profile, each with its
> level and the machine that checks it. `[MANUAL]` is debt; a `[MANUAL]` row
> naming `DBT-020` is declared automatic and executed by nobody.

| Profile | Plate | Practice | Level | Check |
|---|---|---|---|---|
| Security | SEC-001 | 2FA enforced at organisation level | MUST | `[AUTO: scorecard Maintained]` |
| Security | SEC-002 | Secret scanning and push protection on every repository | MUST | `[AUTO: github repos/numengames/numinia-nwos]` |
| Security | SEC-003 | Dependabot alerts and security updates on; merge only on green CI | MUST | `[AUTO: github repos/numengames/numinia-nwos/dependabot/alerts]` |
| Security | SEC-004 | No secret files in git history; secrets in GitHub Environments scoped `pre`/`prod` | MUST | `[DEBT: no gitleaks in the tree; push protection unverified — oracle, 2026-09-11]` |
| Security | SEC-005 | Cloud deploy auth via OIDC, no long-lived tokens | MUST | `[DEBT: no Terraform in the tree, no OIDC policy to read — oracle, 2026-09-11]` |
| Security | SEC-006 | Personal access tokens fine-grained, minimum scope, expiring, one per purpose | MUST | `[AUTO: github orgs/numengames]` |
| Security | SEC-007 | Third-party Actions pinned by commit SHA | MUST | `[AUTO: scorecard Pinned-Dependencies]` |
| Security | SEC-008 | Workflow tokens read-only by default; write granted per job | MUST | `[AUTO: scorecard Token-Permissions]` |
| Security | SEC-009 | `SECURITY.md` with disclosure policy in every public repository | MUST | `[AUTO: scorecard Security-Policy]` |
| Security | SEC-010 | CODEOWNERS covering `LICENSE*`, `.github/workflows/`, auth packages | MUST | `[AUTO: tools/check-register.mjs]` |
| Security | SEC-011 | Organisation base permission read; admin per repository, per need | MUST | `[AUTO: github orgs/numengames]` |
| Security | SEC-012 | Commits to `main` verified | SHOULD | `[AUTO: github repos/numengames/numinia-nwos/commits]` |
| Architecture | ARC-001 | Identical CI pipeline everywhere: `type-check → lint → test → build`; exceptions live in rule severity, never in steps | MUST | `[AUTO: .github/workflows/ci.yml]` |
| Architecture | ARC-002 | Branch protection on `main`: pull request and status checks required, no force push | MUST | `[AUTO: scorecard Branch-Protection]` |
| Architecture | ARC-003 | Licence per the `STD-010` trichotomy; REUSE 3.3 compliance | MUST | `[AUTO: guards/rules/std-010-licensing.mjs]` |
| Architecture | ARC-004 | Executable README: clone to green tests in under five minutes; CI and coverage badges | MUST | `[DEBT: no smoke script, no CI or coverage badge in README.md — oracle, 2026-09-11]` |
| Architecture | ARC-005 | ADRs in `docs/decisions/`, one decision per file | MUST | `[DEBT: no guard reads decisions/ for one-decision-per-file — oracle, 2026-09-11]` |
| Architecture | ARC-006 | Conventional commits, semver tags, GitHub Releases with notes | MUST | `[DEBT: no commitlint — oracle, 2026-09-11]` |
| Architecture | ARC-007 | Infrastructure declarative only: Terraform and containers | MUST | `[DEBT: no Terraform in the tree, no drift detection — oracle, 2026-09-11]` |
| Architecture | ARC-008 | Shared base config (tsconfig, eslint, prettier) imported from one package, never copied | MUST | `[DEBT: no knip and no shared base config package — oracle, 2026-09-11]` |
| Architecture | ARC-009 | Dependencies reviewed before adoption: maintained, compatibly licensed, Scorecard consulted | SHOULD | `[GATE: github repos/numengames/numinia-nwos/dependabot/alerts → a person adopts the dependency]` |
| Architecture | ARC-010 | WCAG 2.2 AA on every public route; tab order matches visual order; focus ring visible | MUST | `[DEBT: no axe-core in web/package.json — oracle, 2026-09-11]` |
| Traceability | TRC-001 | Repository "About" complete: description, website, topics | MUST | `[AUTO: github repos/numengames/numinia-nwos]` |
| Traceability | TRC-002 | Issue templates and a pull request template with a Definition of Done | MUST | `[AUTO: tools/check-register.mjs]` |
| Traceability | TRC-003 | Labels standardised across repositories | SHOULD | `[DEBT: no label-sync workflow — oracle, 2026-09-11]` |
| Traceability | TRC-004 | `CHANGELOG.md` or releases generated from conventional commits | MUST | `[DEBT: CHANGELOG.md is written by hand, no release workflow — oracle, 2026-09-11]` |
| Traceability | TRC-005 | Roadmap or TODO as a file in the repository (`STD-006`) | MUST | `[DEBT: no roadmap or TODO file in the tree — oracle, 2026-09-11]` |
| Traceability | TRC-006 | A guard is verified by its step in the job, never by the run's colour: a green run and a workflow missing the guard are indistinguishable from the conclusion | MUST | `[AUTO: tools/check-register.mjs]` |
| Traceability | TRC-007 | Every guard declares what it does not look at, on success as on failure (`scripts/blind-spots.json`); a guard that validates what is present cannot detect what is missing | MUST | `[AUTO: scripts/test/blindness.test.mjs]` |
| Ergonomics | DEV-001 | `.env.example` exhaustive and in sync with the env schema | MUST | `[DEBT: no .env.example and no env schema to compare it to — oracle, 2026-09-11]` |
| Ergonomics | DEV-002 | `dev`, `build`, `test`, `lint` mean the same in every repository | MUST | `[AUTO: npm test]` |
| Ergonomics | DEV-003 | `.editorconfig` and shared editor settings committed | SHOULD | `[DEBT: no .editorconfig — oracle, 2026-09-11]` |
| Ergonomics | DEV-004 | Pre-commit hooks under five seconds; CI stays the authority | MUST | `[DEBT: no pre-commit hooks — oracle, 2026-09-11]` |
| Ergonomics | DEV-005 | Comments in English explaining *why*; TSDoc on every exported API | MUST | `[AUTO: scripts/test/prose-in-code.test.mjs]` |
| Ergonomics | DEV-006 | Small pull requests with what, why and how to verify | SHOULD | `[GATE: .github/PULL_REQUEST_TEMPLATE.md → a reviewer approves the pull request]` |
| Ergonomics | DEV-007 | At least one approval before `main` | MUST | `[AUTO: .github/rulesets/protect-main.json]` |
| Operations | SRE-001 | Documented, rehearsed rollback for every deployable | MUST | `[DEBT: no rehearsal job and no documented rollback — oracle, 2026-09-11]` |
| Operations | SRE-002 | Health-check endpoint on every deployed service | MUST | `[DEBT: no health endpoint and no post-deploy probe — oracle, 2026-09-11]` |
| Operations | SRE-003 | Structured JSON logs; no `console.log` in production | MUST | `[DEBT: no eslint configuration in the tree — oracle, 2026-09-11]` |
| Operations | SRE-004 | Runbook per service: deploy, rollback, common failures | MUST | `[DEBT: no runbook for the deployed service — oracle, 2026-09-11]` |
| Operations | SRE-005 | Deploy reproducible from a clean clone | MUST | `[DEBT: CI builds but never deploys from a clean clone — oracle, 2026-09-11]` |
| Operations | SRE-006 | Blameless postmortem per production incident | MUST | `[GATE: .github/ISSUE_TEMPLATE/task.md → a person writes the postmortem]` |
| Community | OSS-001 | `CONTRIBUTING.md` a stranger can follow | MUST (public) | `[AUTO: scorecard Contributing]` |
| Community | OSS-002 | Code of conduct present | MUST (public) | `[DEBT: no code of conduct at the repository root — oracle, 2026-09-11]` |
| Community | OSS-003 | DCO or CLA per the licence regime (`STD-010`) | MUST | `[DEBT: no DCO or CLA bot — oracle, 2026-09-11]` |
| Community | OSS-004 | Issue triage cadence declared | SHOULD | `[DEBT: triage cadence is declared nowhere a machine can read — oracle, 2026-09-11]` |
| Community | OSS-005 | Social preview image set | SHOULD | `[DEBT: social preview image unset and unread — oracle, 2026-09-11]` |
| Agents | AGT-001 | `CLAUDE.md` at the root; first instruction: audit the branch before assuming anything | MUST | `[AUTO: tools/check-register.mjs]` |
| Agents | AGT-002 | Deterministic naming and paths, so an agent never invents structure | MUST | `[AUTO: guards/lib/naming.mjs]` |
| Agents | AGT-003 | Everything normative also machine-readable: SPDX, DTCG, JSON Schema | MUST | `[DEBT: no check that normative documents ship machine-readable form — oracle, 2026-09-11]` |
| Agents | AGT-004 | CI is the agent's feedback loop (Principle 1) | MUST | `[DEBT: Principle 1 is stated, nothing verifies CI is the agent's loop — oracle, 2026-09-11]` |
| Agents | AGT-005 | Mission briefs in the standard format; a mission that produces software carries Gherkin acceptance criteria (`STD-011`) | MUST | `[DEBT: no guard reads missions/ for the standard format or Gherkin — oracle, 2026-09-11]` |
| Agents | AGT-006 | AI stance per repository in `CLAUDE.md`: autonomous versus Oracle sign-off | MUST | `[DEBT: CLAUDE.md states the stance, no check reads it — oracle, 2026-09-11]` |
| Legal | LEG-001 | Making a repository public is a gated Oracle act: licence correct, REUSE green, no secrets in history, `SECURITY.md` present | MUST | `[GATE: guards/rules/std-010-licensing.mjs → the Oracle makes the repository public]` |

**ARC-006 convention.** Seven types, nothing bespoke: `feat`, `fix`, `docs`,
`chore`, `refactor`, `test`, `ci`. Scope is the domain, lowercase, usually the
folder. Retired types (`session`, `qa`, `standards`, `canon`, `debt`, `audit`)
stay valid in old history only.

**What a repository born from the mould ships with.** OpenSSF Scorecard weekly
and on push to `main` (target ≥ 7 on public repositories; each `CLAUDE.md`
declares which checks are in scope); the shared CI workflow with coverage
thresholds as failures and a REUSE step; one presence job for `CLAUDE.md`,
`SECURITY.md`, `CONTRIBUTING.md`, CODEOWNERS, templates, `.env.example` and
About fields; local hooks that are courtesy, skippable, never the authority.

## The family pipeline

Five repositories run the same guards: the four that each serve a site —
`numinia-archive` (its `web/`, numinia.org), `numinia-web` (numinia.com),
`numengames-web` (numen.games), `nwos-deploy` (nwos.numen.games) — and the
resource depot `numinia-assets`. A guard is a CI step or a script that says
whether something is wrong with the change under review. Two kinds, told
apart by ENG-067:

| Kind | Steps, in this order | Fails the build? |
|---|---|---|
| Artefact | install → type-check → lint → test → build → share card (`scripts/share-card.mjs --check`) → version bump (`scripts/check-version-bump.mjs`) | Yes. A page that does not build, a test that fails, a favicon that is missing or a version that did not move is a broken artefact whatever any standard says. |
| Rule | presence of the files named above · REUSE lint · OpenSSF Scorecard · dependency audit | No, while this register is `draft`. The step runs on every pull request, prints every finding in the log and the job summary, and exits 0. Promoting this register to `active` is what turns them into failures. |

- **One required check, literally named `build`.** The branch ruleset
  (`.github/rulesets/protect-main.json`, copied to every repository) can
  only require a check by name, so the name means the same everywhere.
  Where the work is split across jobs, `build` is a job that depends on
  the artefact jobs and passes only if all of them did; it never depends
  on a job that only reports. Renaming it leaves the required check
  pending forever and blocks every merge; a ruleset that requires no
  check lets a red run merge — both were measured before this section.
- **A depot has no site.** `numinia-assets` builds nothing: its artefact
  guards are its own declaration checks (REUSE lint over every file, the
  tests that prove a missing declaration is refused), and `build` is their
  conjunction.
- **Kept identical across the five, by hand until a package carries
  them:** `scripts/check-version-bump.mjs` (only the two path constants
  differ), `scripts/share-card.mjs`, `.github/dependabot.yml`,
  `.github/workflows/dependabot-auto-merge.yml`,
  `.github/workflows/scorecard.yml`. A `diff` between two copies shows the
  paths and nothing else.
- **Every workflow, every step:** third-party actions pinned by commit SHA
  (SEC-007); `permissions: read-all` at the top of the file and write
  granted per job to the job that needs it (SEC-008); no secret read by a
  build (SEC-004 — publication is Cloudflare's, connected in its panel,
  never a token in a workflow); and a comment above each step saying what
  it checks and how to fix a red (DEV-005), in English.
