<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: MIT
-->
# `.github/rulesets/` — branch protection, written down

`protect-main.json` is a snapshot of GitHub ruleset `21281544`, the one that
protects `main`. **The panel is the source of truth**; this file is a snapshot
so the setting can be read, diffed and reviewed in a pull request. A
difference means the panel is right and this file is stale.

## Refresh it, and check it

```bash
node machine/tools/ruleset-export.mjs           # rewrite the snapshot from the panel
node machine/tools/ruleset-export.mjs --check   # exit 1 if the snapshot has drifted
```

`--check` exits `0` when they agree, `1` when they differ — naming each
setting — and `2` when it cannot read the panel at all. Reading a ruleset
needs admin scope, which CI's token does not have, so this is a command a
person with the panel's own rights runs. Exit `2` is neither pass nor fail:
an unanswered question is not a clean result.

**Do not refresh with `gh api ... > protect-main.json`.** That was the
documented command and it is lossy in both directions: it writes five
transport fields that describe the HTTP answer rather than the configuration,
and it **drops `bypass_actors`** — the API omits the key when the list is
empty, so an absent key reads as *unknown* where the file said *nobody*. That
the list is empty is the most consequential sentence the file contains.

## What is enforced without a credential

`npm test` checks the file's shape on every run: `bypass_actors` is stated, no
transport noise, the id/target/enforcement still describe the ruleset this
file claims to document, and **every required GitHub Actions check names a job
that exists in `.github/workflows/`**. A required check that matches no job
never reports, so `main` waits on a result that will not arrive — protection
that looks strict and is inert.

What it cannot check is whether the file still equals the panel. That is
`--check`, and it is a person's job.

Moved here from `infra/github/` when two series without consumers were
retired: the folder held one file, and the repository's own machinery already
lives under `.github/`. Licence MIT (`REUSE.toml`), as for any code that
configures the repository.
