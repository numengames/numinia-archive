---
name: numinia-nwos-pr
description: "Use when opening a pull request in numengames/numinia-archive. One PR at a time, guards before push, telemetry last, fixed reviewers; canon is discussed before any branch."
title: "SKILL — numinia-nwos-pr"
type: agent
status: active
version: "1.0.0"
created: "2026-09-10T08:00:00+02:00"
updated: "2026-09-10T08:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [agents, skill, pull-request]
license: "CC0-1.0"
registration: exempt
registration_reason: "a cross-agent skill is identified by its folder name, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# numinia-nwos PR cycle

The repository is the only source of truth. A chat summary, a compacted
context or a memory note is background, never a plan: re-measure the tree
before acting (`git fetch && git log -1 origin/main`, `gh pr list --state open`).

## Modes

- **Unattended** (the Oracle says "desatendido"): open the PR, watch
  `gh pr view N --json state` in the background, and on `MERGED` take a fresh
  `main` and open the next one. **Never self-merge**: merging is the Oracle's
  signature (`AUT-006`).
- **Unattended covers the normative axis only** — standards, protocols,
  decisions. **Canon is out**: it is `governed`, it has other authors, and each
  canon cut is discussed in conversation *before* a branch exists. A proposal
  written inside the PR body does not count as discussion.
- A phase the Oracle declares ("solo ideas", "no implementar") is binding.

## Cycle — one PR is one cut

1. `git checkout main && git pull && git branch -D <old-branch>`. Read and
   measure the document and its citers: `grep -rn <ID> --include=*.md`, plus
   `web/src/lib/corpus.ts`, `web/astro.config.mjs`, `REUSE.toml`,
   `scripts/*.mjs`.
2. Write the document. Keep the original header fields (`guild`, `territory`,
   `threshold`, `supersedes_record_of`, `license`); bump from the version that
   is actually in the file; keep the SPDX comment equal to `license:`.
3. `git checkout -b <series>/<id>-shape`.
4. `npm test` at the root — every suite.
5. Guards, all of them: `npm run guards` at the root; then `cd web && npm run
   build` and `node scripts/check-url-lifecycle.mjs`. A guard prints every
   finding on the tree and exits 1 only when its rule's holder is `active`
   (ENG-067); there is no baseline to refresh.
6. Commit as the agent that did the work (`-c user.name=<Agent>
   -c user.email=<agent>@numinia.org`), with a long message that says what
   went out and where it now lives.
7. **Telemetry last**: `node scripts/telemetry.mjs && git add telemetry` in its
   own commit; `node scripts/telemetry.mjs --check` must report OK on HEAD.
   Never regenerate before an amend (`RUP-005`).
8. `git push -u origin <branch>`; `gh pr create --base main --body-file`;
   `gh pr edit N --add-reviewer PabloFMM,Christian-Numen,MariaGarciaJordan`;
   `sleep 80; gh pr checks N`.

## PR body

Base SHA · before/after table on `DOC-00x` · what went out and where it lives
· what was *not* done · a `Verified` line with every guard's figure · `Next`.

## Pitfalls

- Force-push is not available from the agent's environment: open a `-v2`
  branch from fresh `main` and close the old PR as superseded.
- `git stash` / `stash pop` puts a `git rm`'d file back into the index and
  the licence guard (`std-010-licensing`) fails with ENOENT. Run `git rm --cached` again.
- the reference guard (`std-020-git-is-the-archive`) reserves `DEC` as a legacy id prefix: never mint
  `DEC-NNN` plates.
- `std-021-evidence-and-citation` (CIT-050) also walks active reports (`RPT-017`). When
  sections are renumbered, either keep the cited number (say why in the
  heading) or correct the citing report in place with a patch bump.
- Deleting a document: `absorbs:` line in the current weekly `RPT`; redirects
  for `en`/`es` and legacy slugs in `astro.config.mjs`; remove it from the
  curated order in `corpus.ts`; re-point living citers to the concrete plate.
  Closed records (`done` missions, old ADRs) are photographs (`CIT-053`) and
  stay as written.
- `std-007-one-page` hands **form** failures to the regime; budget
  overruns are reported, never enforced. Report both figures.
- Plates migrated from `CORE-NN` keep their number under the new prefix.
