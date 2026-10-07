---
id: "MIS-155"
uid: ""
title: "Give Kairos its own GitHub App, installed on the feed only, and take the feed out of Ursa's"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-07T21:57:34+02:00"
updated: "2026-10-07T21:57:34+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [agents, identity, github-app, feed, radar]
license: "CC0-1.0"

priority: medium
effort: S
executor: hybrid
assigned_to: null
completed: null

requires_oracle_approval: true
context: "2026-10-07T21:57:34+02:00"
paths: [agents/kairos/, procedures/PRO-035-watching-for-opportunities.md]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-155 — Give Kairos its own GitHub App, installed on the feed only, and take the feed out of Ursa's

> **Summary:** The radar's publication to `numinia-archive-feed` is Kairos's
> work, and today it signs as Ursa. Kairos gets its own GitHub App, installed
> on the feed alone with write access to its contents and nothing else, and
> the feed leaves Ursa's installation.
> **Epistemic:** Who writes to the feed, under which identity, with which
> permission.
> **Pragmatic:** Each agent signs its own work, and cutting one agent's access
> leaves the other running.
> **Audience:** Agents · People responsible

---

## 1. Scope

- A GitHub App for Kairos in the `numengames` organisation, created by the
  person responsible: installable only on this account; repository
  permission *Contents: Read and write* and nothing else; webhook off;
  installed on `numinia-archive-feed` only.
- The radar's publisher on the machine that runs Kairos mints its one-hour
  token from Kairos's App instead of Ursa's, and still writes through the
  contents API, so GitHub signs each commit.
- `numinia-archive-feed` is removed from the installation of Ursa's App
  (`ursa-da-numinia`).
- `agents/kairos/` names the App, its installation and its single permission;
  never a key or a token.

Out of scope: the radar's filter and procedure (`PRO-035`), and any other
agent's identity.

---

## 2. Acceptance criteria

- [ ] A token minted from Kairos's installation lists exactly one repository,
  `numengames/numinia-archive-feed`, and exactly the permissions `contents:
  write` and `metadata: read` (`GET /installation/repositories`; the token
  response's `permissions`). Today: Kairos has no App.
- [ ] The newest radar commit on the feed's `main` is authored by Kairos's
  bot and GitHub marks it Verified (`GET
  /repos/numengames/numinia-archive-feed/commits?path=radar/board.json&per_page=1`).
  Today: authored by `ursa-numinia`, unsigned.
- [ ] A token minted from Ursa's installation does not list
  `numengames/numinia-archive-feed`. Today: it does.
- [ ] `agents/kairos/` names Kairos's App and its one permission, and
  `git grep -nE 'BEGIN .*PRIVATE KEY|ghs_|github_pat_' -- agents/` returns
  nothing. Today: `agents/kairos/` names no App.

---

## 3. Closure

*(Fill when the mission closes.)*
