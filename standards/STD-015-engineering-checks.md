---
id: "STD-015"
uid: ""
title: "Engineering checks"
type: documentation
subtype: register
status: draft
version: "1.6.1"
created: "2026-08-17T21:55:38+02:00"
updated: "2026-09-25T13:00:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards, engineering, ci, register, practices]
license: "CC0-1.0"
series_change: "1.6.1 — 2026-09-25: the card and the prose around the tables read aloud in plain words, at the Oracle's word in session; the kinds of commit are said to follow Conventional Commits and are listed in a table, as are the files kept identical across repositories. No row, plate or check changed."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Engineering checks

> **Summary:** The 56 practices the engineering baseline requires, grouped
> by what they protect, each with how strongly it is required and what checks
> it. A practice checked by hand is debt, and a row marked as owed is one we
> once called automatic that nothing runs.

| Profile | Plate | Practice | Level | Check |
|---|---|---|---|---|
| Security | SEC-001 | 2FA enforced at organisation level | MUST | `[AUTO: scorecard Maintained]` |
| Security | SEC-002 | Secret scanning and push protection on every repository | MUST | `[AUTO: github repos/numengames/numinia-archive]` |
| Security | SEC-003 | Dependabot alerts and security updates on; merge only on green CI | MUST | `[AUTO: github repos/numengames/numinia-archive/dependabot/alerts]` |
| Security | SEC-004 | No secret files in git history; secrets in GitHub Environments scoped `pre`/`prod` | MUST | `[DEBT: no gitleaks in the tree; push protection unverified — oracle, 2026-09-11]` |
| Security | SEC-005 | Cloud deploy auth via OIDC, no long-lived tokens | MUST | `[DEBT: no Terraform in the tree, no OIDC policy to read — oracle, 2026-09-11]` |
| Security | SEC-006 | Personal access tokens fine-grained, minimum scope, expiring, one per purpose | MUST | `[AUTO: github orgs/numengames]` |
| Security | SEC-007 | Third-party Actions pinned by commit SHA | MUST | `[AUTO: scorecard Pinned-Dependencies]` |
| Security | SEC-008 | Workflow tokens read-only by default; write granted per job | MUST | `[AUTO: scorecard Token-Permissions]` |
| Security | SEC-009 | `SECURITY.md` with disclosure policy in every public repository | MUST | `[AUTO: scorecard Security-Policy]` |
| Security | SEC-010 | CODEOWNERS covering `LICENSE*`, `.github/workflows/`, auth packages | MUST | `[AUTO: machine/tools/check-register.mjs]` |
| Security | SEC-011 | Organisation base permission read; admin per repository, per need | MUST | `[AUTO: github orgs/numengames]` |
| Security | SEC-012 | Commits to `main` verified | SHOULD | `[AUTO: github repos/numengames/numinia-archive/commits]` |
| Architecture | ARC-001 | Identical CI pipeline everywhere: `type-check → lint → test → build`; exceptions live in rule severity, never in steps | MUST | `[AUTO: .github/workflows/ci.yml]` |
| Architecture | ARC-002 | Branch protection on `main`: pull request and status checks required, no force push | MUST | `[AUTO: scorecard Branch-Protection]` |
| Architecture | ARC-003 | Licence per the `STD-010` trichotomy; REUSE 3.3 compliance | MUST | `[AUTO: machine/guards/rules/std-010-licensing.mjs]` |
| Architecture | ARC-004 | Executable README: clone to green tests in under five minutes; CI and coverage badges | MUST | `[DEBT: no smoke script, no CI or coverage badge in README.md — oracle, 2026-09-11]` |
| Architecture | ARC-005 | ADRs in `docs/decisions/`, one decision per file | MUST | `[DEBT: no guard reads decisions/ for one-decision-per-file — oracle, 2026-09-11]` |
| Architecture | ARC-006 | Conventional commits, semver tags, GitHub Releases with notes | MUST | `[DEBT: no commitlint — oracle, 2026-09-11]` |
| Architecture | ARC-007 | Infrastructure declarative only: Terraform and containers | MUST | `[DEBT: no Terraform in the tree, no drift detection — oracle, 2026-09-11]` |
| Architecture | ARC-008 | Shared base config (tsconfig, eslint, prettier) imported from one package, never copied | MUST | `[DEBT: no knip and no shared base config package — oracle, 2026-09-11]` |
| Architecture | ARC-009 | Dependencies reviewed before adoption: maintained, compatibly licensed, Scorecard consulted | SHOULD | `[GATE: github repos/numengames/numinia-archive/dependabot/alerts → a person adopts the dependency]` |
| Architecture | ARC-010 | WCAG 2.2 AA on every public route; tab order matches visual order; focus ring visible | MUST | `[DEBT: no axe-core in web/package.json — oracle, 2026-09-11]` |
| Traceability | TRC-001 | Repository "About" complete: description, website, topics | MUST | `[AUTO: github repos/numengames/numinia-archive]` |
| Traceability | TRC-002 | Issue templates and a pull request template with a Definition of Done | MUST | `[AUTO: machine/tools/check-register.mjs]` |
| Traceability | TRC-003 | Labels standardised across repositories | SHOULD | `[DEBT: no label-sync workflow — oracle, 2026-09-11]` |
| Traceability | TRC-004 | `CHANGELOG.md` or releases generated from conventional commits | MUST | `[DEBT: CHANGELOG.md is written by hand, no release workflow — oracle, 2026-09-11]` |
| Traceability | TRC-005 | Roadmap or TODO as a file in the repository (`STD-006`) | MUST | `[DEBT: no roadmap or TODO file in the tree — oracle, 2026-09-11]` |
| Traceability | TRC-006 | A guard is verified by its step in the job, never by the run's colour: a green run and a workflow missing the guard are indistinguishable from the conclusion | MUST | `[AUTO: machine/tools/check-register.mjs]` |
| Traceability | TRC-007 | Every guard declares what it does not look at, on success as on failure (`machine/scripts/blind-spots.json`); a guard that validates what is present cannot detect what is missing | MUST | `[AUTO: machine/scripts/test/blindness.test.mjs]` |
| Traceability | TRC-008 | Every published address is its series and its identifier, once, in English; a retired address leads to the document that answers its question or it is removed (`STD-028`) | MUST | `[AUTO: machine/scripts/check-url-shape.mjs]` |
| Ergonomics | DEV-001 | `.env.example` exhaustive and in sync with the env schema | MUST | `[DEBT: no .env.example and no env schema to compare it to — oracle, 2026-09-11]` |
| Ergonomics | DEV-002 | `dev`, `build`, `test`, `lint` mean the same in every repository | MUST | `[AUTO: npm test]` |
| Ergonomics | DEV-003 | `.editorconfig` and shared editor settings committed | SHOULD | `[DEBT: no .editorconfig — oracle, 2026-09-11]` |
| Ergonomics | DEV-004 | Pre-commit hooks under five seconds; CI stays the authority | MUST | `[DEBT: no pre-commit hooks — oracle, 2026-09-11]` |
| Ergonomics | DEV-005 | Comments in English explaining *why*; TSDoc on every exported API | MUST | `[AUTO: machine/scripts/test/prose-in-code.test.mjs]` |
| Ergonomics | DEV-006 | Small pull requests with what, why and how to verify | SHOULD | `[GATE: .github/PULL_REQUEST_TEMPLATE.md → a reviewer approves the pull request]` |
| Ergonomics | DEV-007 | At least one approval before `main` | MUST | `[AUTO: .github/rulesets/protect-main.json]` |
| Ergonomics | DEV-008 | The test that describes a change is written, run and seen to fail before the code; the pull request shows the test commit before the code commit | MUST | `[GATE: .github/PULL_REQUEST_TEMPLATE.md → the reviewer reads the commit order before approving]` |
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
| Agents | AGT-001 | `AGENTS.md` at the root; first instruction: audit the branch before assuming anything | MUST | `[AUTO: machine/tools/check-register.mjs]` |
| Agents | AGT-002 | Deterministic naming and paths, so an agent never invents structure | MUST | `[AUTO: machine/guards/lib/naming.mjs]` |
| Agents | AGT-003 | Everything normative also machine-readable: SPDX, DTCG, JSON Schema | MUST | `[DEBT: no check that normative documents ship machine-readable form — oracle, 2026-09-11]` |
| Agents | AGT-004 | CI is the agent's feedback loop (Principle 1) | MUST | `[DEBT: Principle 1 is stated, nothing verifies CI is the agent's loop — oracle, 2026-09-11]` |
| Agents | AGT-005 | Mission briefs in the standard format; a mission that produces software carries Gherkin acceptance criteria | MUST | `[DEBT: no guard reads missions/ for the standard format or Gherkin — oracle, 2026-09-11]` |
| Agents | AGT-006 | AI stance per repository in `AGENTS.md`: autonomous versus Oracle sign-off | MUST | `[DEBT: AGENTS.md states the stance, no check reads it — oracle, 2026-09-11]` |
| Legal | LEG-001 | Making a repository public is a gated Oracle act: licence correct, REUSE green, no secrets in history, `SECURITY.md` present | MUST | `[GATE: machine/guards/rules/std-010-licensing.mjs → the Oracle makes the repository public]` |

**How a commit says its kind.** A commit opens with its kind, in the form
Conventional Commits sets out, and there are seven, nothing invented: a
feature, a fix, documentation, a chore, a refactoring, a test, or a change to
the automatic checks. In brackets after the kind comes the area touched, in
lower case, usually the folder. Kinds we used to write stay valid in old
history only.

**What a new repository is born with.** A security score, run every week and
on every change to the main line, aiming at seven out of ten or better on a
public repository, with each repository saying which of its checks apply;
the shared pipeline, where too little test coverage is a failure and every
file's licence is checked; one step that checks the required files are
present — the agent instructions, the security policy, the contribution
guide, the list of owners, the templates, the example settings and the
repository's description; and local hooks that are a courtesy, may be
skipped, and never decide.

| Kind of commit | Written |
|---|---|
| a feature | `feat` |
| a fix | `fix` |
| documentation | `docs` |
| a chore | `chore` |
| a refactoring | `refactor` |
| a test | `test` |
| a change to the automatic checks | `ci` |
| retired, valid in old history only | `session`, `qa`, `standards`, `canon`, `debt`, `audit` |

## The family pipeline

Five repositories run the same guards: the four that each serve a site —
this archive, the Numinia site, the Numen Games site and the workspace
deployer — and the store of shared resources, which serves none. A guard is
a step, or a script, that says whether something is wrong with the change
under review. There are two kinds, told apart by the baseline's rule on when
a guard bites:

| Kind | Steps, in this order | Fails the build? |
|---|---|---|
| Artefact | install → type-check → lint → test → build → share card (`web/scripts/share-card.mjs --check`) → version bump (`machine/scripts/check-version-bump.mjs`) | Yes. A page that does not build, a test that fails, a favicon that is missing or a version that did not move is a broken artefact whatever any standard says. |
| Rule | presence of the files named above · REUSE lint · OpenSSF Scorecard · dependency audit | No, while this register is `draft`. The step runs on every pull request, prints every finding in the log and the job summary, and exits 0. Promoting this register to `active` is what turns them into failures. |

- **One required check, and it is called build.** The protection on the
  main line, copied to every repository, can only require a check by its
  name, so the name means the same everywhere. Where the work is split into
  several jobs, build is the job that passes only if every artefact job
  passed; it never waits on a job that only reports. Renaming it leaves the
  required check pending for ever and blocks every merge; requiring no
  check lets a red run merge. Both were measured before this was written.
- **The store of resources has no site.** It builds nothing: its artefact
  guards are its own checks that every file declares its licence, with the
  tests that prove a missing declaration is refused, and build passes only
  when all of them do.
- **Some files are kept identical across the five, by hand until a shared
  package carries them.** They are listed in the table below; comparing two
  copies shows their paths and nothing else.
- **Every workflow, every step:** outside actions pinned to one exact
  version (SEC-007); read-only permissions at the top of the file, with
  write granted only to the job that needs it (SEC-008); no secret read by a
  build, since publishing is connected in the hosting provider's own panel
  and never through a token in a workflow (SEC-004); and above each step, in
  English, a comment saying what it checks and how to fix it when it fails
  (DEV-005).

| Kept identical in the five | What it does |
|---|---|
| `machine/scripts/check-version-bump.mjs` | refuses a change to a site that does not raise its version; only its two path settings differ |
| `web/scripts/share-card.mjs` | draws the card shown when a link is shared |
| `.github/dependabot.yml` | asks for dependency updates |
| `.github/workflows/dependabot-auto-merge.yml` | merges those updates once the checks pass |
| `.github/workflows/scorecard.yml` | runs the weekly security score |
