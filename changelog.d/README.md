<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# changelog.d — one fragment per pull request

> **Summary:** A pull request records its changelog line here, never in `CHANGELOG.md`.
> **Epistemic:** The rule is mechanical: `machine/tools/cut.mjs` writes and folds; this file only explains it.
> **Pragmatic:** Run `node machine/tools/cut.mjs log <Kind> "<sentence>"` instead of editing the changelog.
> **Audience:** Agents · Oracles

`CHANGELOG.md` changed in more than half of recent commits, so pull requests
in a merge queue ejected each other. A fragment is a file only its own branch
touches, so they no longer collide.

## The rule

- One fragment per pull request: `changelog.d/<branch>.md`, the branch name
  with `/` written as `-`.
- Never edit `CHANGELOG.md` in a pull request. (An old branch that already did
  still passes `cut.mjs status`.)
- `node machine/tools/cut.mjs log <Kind> "<sentence>"` creates the fragment,
  or adds a line to it. It refuses an unknown kind or a line over 320 chars.
- `node machine/tools/cut.mjs fold` is run by whoever cuts or maintains the
  changelog, never in a pull request. It puts every line under
  `## [Unreleased]`, on the UTC day the fragment was first committed (today if
  git does not know it), newest first, opens the day heading if missing, and
  deletes the fragments.

## Format

A fragment has no front matter. It opens with the SPDX licence comment that
`cut.mjs log` writes (REUSE wants one in every file), then holds only entry
lines, exactly as they appear in `CHANGELOG.md`:

```
- **Fixed** secrets.yml cites the live rule STD-022 KEY-054 (MIS-280)
```

The kind is one of Added, Changed, Deprecated, Removed, Fixed, Security, Debt.
One line, at most 320 characters, the pull request or mission it belongs to.
Lines in a fragment run oldest to newest; `fold` puts the last one on top.
