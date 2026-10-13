---
id: "MIS-175"
uid: ""
title: "Changing a world's code leaves no one its administrator: the machine sets every administrator of that world back to visitor while it is down, and the room says so"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T22:13:00+02:00"
updated: "2026-10-12T22:13:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, admin-code, ranks, numinia-assets, numinia-web]
license: "CC0-1.0"

priority: high
effort: S
executor: agent
assigned_to: null
completed: null

requires_oracle_approval: true
context: "2026-10-12T22:13:00+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md, debt/DBT-025-the-worlds-fleet-runs-on-unreviewed-shortcuts.md]
related: ["MIS-170", "DBT-025", "MIS-159"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-175 — Changing a world's code leaves no one its administrator

> **Summary:** A world's admin code makes whoever types it an
> administrator, and the engine keeps that rank in the world's own
> database: changing the code (`MIS-170`) stops the old one working but
> demotes nobody. This mission makes a change of code take the rank back
> too — the machine sets every administrator of that world back to visitor
> while the world is down — and has the room say so.
> **Epistemic:** Who is still an administrator of a world after its code
> changes.
> **Pragmatic:** A code that leaked, or a person who should no longer
> administer a world, is shut out with one signature, rank included.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **The machine (numinia-assets):** on a signed `RotateWorldCode`, every
  user of that world whose rank is administrator — 2 in the world's own
  database, table `users`; the engine's ranks are visitor 0, builder 1,
  administrator 2 — goes back to visitor, while the world is down: inside
  the restart for a running world, after its next save and before it
  starts again; at once for a stopped one, which stays stopped. Every world
  of the fleet, the house's and a client's alike. No other rank changes,
  and no log line names a person or a code.
- **The room (numinia-web):** the change-of-code dialog says that every
  administrator of the world goes back to visitor and becomes one again
  only by typing the new code, in its five languages.
- The engine is not touched: it still reads each rank from its database and
  `ADMIN_CODE` from the world's environment.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| What a changed secret takes back | the rank a world's old code granted | OWASP ASVS 4.0.3 V3.3.3 (end every other session after a credential changes); ISO/IEC 27002:2022 controls 5.17 (authentication information) and 5.18 (access rights, removed when no longer due) |

The choice and its reason go in this mission's execution log.

Out of scope: builders — the Oracle named administrators only, so a builder
keeps that rank; administrators named as wallets, whom no change of code
could remove (`MIS-159`, and a change in the engine, `DBT-025`); who may
sign a change of code on a client's world (`MIS-176`).

---

## 2. Acceptance criteria

- [ ] After a signed `RotateWorldCode` on a running world, no user of that
  world has rank 2 in its `users` table, every other rank is as it was,
  and the world runs again with the new code; the machine's tests hold it
  on a copy of a world's database. Today: the change of code rewrites the
  key file's `ADMIN_CODE` line and restarts the world, and never opens its
  database — numinia-assets `reconcile.py` at `2ca8e2c` names neither
  `users` nor a rank (`grep -c users` and `grep -ci rank` both return 0).
- [ ] The reset happens while the world is down: after its next save and
  before it starts again for a running world, at once for a stopped one,
  which stays stopped; the machine's tests hold the order of the steps.
  Today: a running world is restarted by one
  `docker compose up -d --force-recreate --no-deps <id>`, with no step
  between its stop and its start (`reconcile.py`, `apply`), and a stopped
  world only gets its new key file.
- [ ] On open-1, after the Oracle changes a world's code, a browser that
  was administrator of that world before the change is a visitor after it,
  and `/admin <new code>` makes it administrator again. Today: whoever used
  the old code stays administrator — the engine at `0e20453` writes the
  rank to `users` when `/admin <code>` is typed and reads it back at each
  entry, and its players list offers a rank button only for someone who is
  not an administrator.
- [ ] The room's change-of-code dialog says, in its five languages, that
  every administrator of the world goes back to visitor. Today: it says
  that whoever already became an admin with the current code stays one,
  "the world remembers" (numinia-web `apps/store/src/i18n/worlds.ts` at
  `080f176`, `rotateIntro` and `rotateStopped`).

---

## 3. Closure

*(Fill when the mission closes.)*
