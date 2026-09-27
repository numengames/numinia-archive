<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# Contributing to the archive

> **Summary:** How a change reaches this repository: a branch, a pull request, the Oracle's review.
> **Epistemic:** How do I propose a change here?
> **Pragmatic:** The steps to open a pull request, and where the rules you are held to live.
> **Audience:** Agents · Oracles · outside contributors

---

This repository is the archive of Numen Games and Numinia: its rules, its
decisions, its world and the site that publishes them at numinia.org.

## Read two things first

- **[What binds today](https://numinia.org/binding)** — which rules are in
  force and which are still draft. A draft describes a practice; it binds
  nobody.
- **`AGENTS.md`** — the working rules for anyone changing this repository,
  person or agent: what still holds while most rules are draft, the commands
  to run, and a map of the folders.

This file does not repeat either. If they disagree with it, they win.

## Proposing a change

1. Branch from `main`.
2. Make the change. Commit messages are in English.
3. Run `npm test` and `npm run guards -- --rules`; if you touched `web/`,
   run its build too.
4. Open a pull request that says what changed and why.
5. The Oracle reviews and merges. Nobody merges their own pull request.

One pull request per change. Never commit credentials, tokens or private
addresses; `standards/STD-022-secrets.md` says how to handle them.

## What needs the Oracle first

- **The canon** (`canon/`) changes, but only after the Oracle has agreed in
  conversation, before the branch exists.
- **The legal texts** (`legal/`), sales records and the brand mark are
  reserved: propose, do not edit.
- **Licences, visibility and secrets** of any repository.

Outside contributors are welcome to open issues and pull requests; the same
review applies.
