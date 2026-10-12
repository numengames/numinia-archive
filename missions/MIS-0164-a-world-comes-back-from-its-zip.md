---
id: "MIS-164"
uid: ""
title: "A world comes back from its zip: an Oracle uploads a world's copy from the room and a fleet machine brings it up with its data"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T13:11:36+02:00"
updated: "2026-10-12T13:11:36+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, portability, import, upload-security, alchemists-tower]
license: "CC0-1.0"

priority: high
effort: L
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-163"]
requires_oracle_approval: true
context: "2026-10-12T13:04:00+02:00"
paths: [principles/PRI-012-what-is-yours-stays-with-you.md, system/SYS-014-the-worlds-fleet-as-wired.md]
related: ["MIS-158", "MIS-160", "MIS-163", "PRI-012", "SYS-014", "ADR-069"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-164 — A world comes back from its zip

> **Summary:** Since site v0.77.0 a world can leave the fleet as a zip
> (*Download*), but it cannot come back: no request carries a world, and a
> machine's door reads at most 16 KB per request. This mission adds the way
> back, one signed `ImportWorld`, so the copies the house already holds — the
> Alchemists' Tower's backups, the five worlds of the hand-run server, any
> world downloaded from the fleet — come up on a fleet machine, to be turned
> on and off and tested.
> **Epistemic:** Which of the house's old worlds run on today's engine build,
> and what a copy may and may not bring with it.
> **Pragmatic:** Closes `PRI-012`'s round trip for worlds — what leaves can
> come back — and gives the fleet its restore path when a machine is lost.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **What comes in:** a zip whose `world/` folder holds the world's
  `db.sqlite` and its files. The fleet's own copy (`numinia-world-copy/1`,
  with a SHA-256 per file in its `world.json`) and the Tower's backup share
  that shape; a bare zip of a world's folder is accepted too, which is how
  the hand-run server's worlds get packed.
- **What the machine keeps from it:** the database and the files, nothing
  else. The zip's `.env`, `docker-compose.yml`, guides and engine image are
  never used: the machine makes the keys, the compose entry comes from the
  signed request, and the engine build is the one the Oracle signs.
- **What it checks before writing anything outside the upload folder:** size
  caps (the zip, each file, the unpacked total, the compression ratio); no
  absolute path, no `..`, no link or device, only the expected names; the
  database opens, passes SQLite's integrity check and has the engine's
  tables; when a manifest is there, every file matches its SHA-256. A
  refusal names its rule.
- **The request:** `ImportWorld`, signed like CreateWorld and also carrying
  the zip's size and SHA-256. The door answers with an upload slot, the
  browser sends the zip there, and the door stops at the signed size and
  checks the signed fingerprint; the reconciler unpacks, makes the keys and
  starts the world. An import counts against the machine's room like a
  creation (`MIS-163`), before the upload starts.
- **The room:** *Bring back a world* beside *New world* — the zip, a name,
  the machine and the address, a progress bar, one signature.
- **The hand-run server's five worlds:** a guide to pack each one once on
  that server (reading its data changes nothing there) and bring it up under
  a new name on open-1. Moving their addresses is a DNS step outside this
  mission.
- The machine README's table of what a theft gives gains the import: an
  imported world's scripts run like any world's, inside its container.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| Large uploads | a zip of hundreds of megabytes from a browser | one streamed upload with a size cap; tus 1.0.0 resumable uploads (core, creation and checksum); S3-style multipart |
| Upload safety | what a hostile zip can do | OWASP File Upload Cheat Sheet; Zip Slip (Snyk); decompression-bomb limits |
| Integrity | the zip that arrives is the one signed | its SHA-256 inside the EIP-712 request; tus's checksum extension |

The choice and its reason go in this mission's execution log; the real size
of the house's copies (the Tower's `world.json` records it) sets the caps.

Out of scope: an import by link — a machine fetching a copy from another
machine, or the Tower's copies from the house's S3 (`MIS-160`); moving a
world between machines in one act; worlds of another engine; several zips
at once.

---

## 2. Acceptance criteria

- [ ] A copy made by the fleet's *Download*, brought back from the room
  under a new name, opens at its address with the same scene: the same rows
  of blueprints and entities as the copy's database, and every file equal to
  its manifest's SHA-256. Today: no request brings a world back, and the door
  reads at most 16 KB per request.
- [ ] A Tower backup zip comes up the same way on the fleet's default engine
  build. Today: no way in.
- [ ] One of the hand-run server's worlds, packed once with the guide, comes
  up on open-1 under a new name. Today: no guide and no way in.
- [ ] Zips carrying `../`, an absolute path, a link, a file over its cap or a
  compression ratio over its cap are refused before anything is written
  outside the upload folder, each naming its rule; the machine's tests hold
  one hostile zip per rule. Today: no importer.
- [ ] The world's keys are the machine's, not the zip's: a test imports a
  zip carrying a hostile `.env` and `docker-compose.yml` and finds neither
  used. Today: no importer.
- [ ] An import that does not fit its machine is refused `no-room` before
  its upload starts. Today: there is no count (`MIS-163`).

---

## 3. Closure

*(Fill when the mission closes.)*
