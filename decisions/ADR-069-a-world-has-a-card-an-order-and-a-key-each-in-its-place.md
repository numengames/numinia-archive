---
id: "ADR-069"
uid: ""
title: "A 3D world has a card in the archive, an order the servers read and keys only on its server; public and private worlds never share a fleet"
type: adr
status: draft
version: "0.2.0"
created: "2026-10-09T17:30:00+02:00"
updated: "2026-10-12T11:53:57+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, hosting, fleet, gitops, secrets, single-source-of-truth]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "Each 3D world the house runs has three parts, each kept once: its card in objects/, its order on the machine that runs it, and its keys on that machine. Public and private worlds run on separate fleets and separate servers. The first fleet is public; its machines obey requests an Oracle's wallet signs, and their recipe lives, for the trial, in a folder named open-worlds in numinia-assets."
related: ["ADR-068", "SYS-013", "SYS-014", "SYS-005", "STD-017", "STD-022", "STD-027", "STD-014", "MIS-156", "DBT-025"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# ADR-069 — A world has a card, an order and a key, each in its place

> **Summary:** Every 3D world has three parts, each kept once. The card that
> says what the world is goes in the archive. The order that says where and
> how it runs is kept by the machine that runs it. Its keys live only on
> that machine. Public and private worlds never share a fleet or a server.
> **Epistemic:** `ADR-068` left the 3D worlds fleet open. Most of its
> questions turned out to be answered already by the standards on secrets,
> automation and classification. What was left was where the orders live,
> and whether public and private worlds mix.
> **Pragmatic:** The first public world can be brought up without a new
> repository. The card is filed where the archive already catalogues things.
> The machines' recipe sits in numinia-assets until it outgrows it.
> **Audience:** Agents · Oracles

---

## 1. Context

The house runs 3D worlds that open in the browser, for itself and for
clients. Two earlier setups exist: a large one on AWS, paused for cost, and
one hand-run server whose list of worlds is kept by hand. Neither is
described in this archive, and `SYS-013` lists the fleet as *not wired*.

`ADR-068` left four questions open about the fleet:

- whether it needs its own repository;
- whether that repository is public or private;
- where its secrets live;
- whether the world records live in this archive.

When the standards were read against them, three were already settled:

- **Secrets.** Secrets are read from the environment where the program runs,
  never from a repository (`STD-022` KEY-057).
- **Reports.** What a program finds or makes on its own goes to a feed,
  never straight into the archive (`STD-017` AUT-069).
- **Records.** What the house holds as memory is plain text in its public
  archive (`PRI-009`). Things are already catalogued in `objects/`: an entity
  card says what a thing is and points to its copies elsewhere (`STD-027`,
  the Cataloguing activity).

Two questions remained. The first was where the order book lives: the
machine-readable list of which world runs on which server, with which engine
version, under which domain. The second was whether one fleet could hold
both public and private worlds.

Size today: the trial expects five to eight worlds, all public.
numinia-assets weighs about 600 KB.

---

## 2. Decision

1. **A world has three parts, each kept once.**
   - **The card** says what the world is: its name, its address, its plan,
     and its owner if the owner has agreed in writing to be named. It is an
     entity card in `objects/` with `entity: world`, beside the objects and
     agents already catalogued there. It never holds a server, an IP
     address, a key or the world's live state.
   - **The order** says where and how the world runs: the card's id, the
     server, the domain, the exact engine image and the limits. It is kept
     by the machine that runs the world and points to the card by id; it
     never copies the card.
   - **The keys** are made by that machine when the world is created and
     stay on it. They never enter git, encrypted or not. A secret manager
     replaces this when there are several servers.
2. **Public and private worlds never share a fleet.** Each kind has its own
   order book and its own servers. A private world's order is never written
   to a public repository, because making something public cannot be undone
   (`STD-014`).
3. **The first fleet is public, and for its trial its recipe lives in
   numinia-assets**, in a folder named open-worlds, outside the depot's
   resource content and declared CC0 in the depot's licence map. Each
   machine keeps its own book of orders; the orders the trial first wrote
   in that folder are adopted once by the machine they name.
   - The recipe moves to a repository of its own as soon as any of these is
     true: the depot holds heavy files that every server would have to
     download, the trial passes eight worlds, or the trial ends.
   - The private fleet gets its own private repository with the first
     private world.
4. **Changes go by a request an Oracle signs.** The console on numinia.com
   writes each request — create, stop, start, download, delete — and the
   Oracle's wallet signs it. The machine checks the signature against its
   own list of Oracles and does the work. The console holds no key to any
   machine and writes nothing; it reads what each machine publishes.
5. **The servers report; they do not write.** Each world runs in its own
   container on servers in France. A nightly copy goes to object storage in
   the EU and is kept 14 days. A daily summary goes to
   numinia-archive-feed, written by an automation that cannot write to the
   fleet. No server holds a credential that writes to GitHub.
6. **The earlier setups are left as they are.** The new fleet runs beside
   them. Neither the AWS setup nor the hand-run server's list is migrated,
   reused or retired by this decision.

This decision answers the fleet questions of `ADR-068`. It binds from the
merge, for every 3D world the house runs for itself or for a client.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| A new series of world records in this archive | It would be a second series for the activity `objects/` already files (Cataloguing). A world is an entity like an avatar or an agent: a card that points to its copies. |
| A `numinia-fleet` repository from the start | It means a new repository, with its own CI, rulesets and permissions, for five to eight worlds. `ADR-068` makes repositories expensive and folders cheap, and the move later is one setting on each server. |
| The order book as the only record of a world | The machines' file would become the house's memory, and a world would vanish from the archive when its server did (`PRI-009`). |
| One fleet with a public or private flag per world | One wrong flag would publish a private world's order to a public history that cannot be withdrawn (`STD-014`). |
| Secrets encrypted inside the fleet repository | The fleet is public. A key that is encrypted today becomes readable the day its passphrase leaks, and history keeps it forever. `STD-022` keeps secrets out of repositories. |
| Reusing the hand-run server's list | That list belongs to a setup that keeps working. Changing it would mean reworking a running system instead of building beside it. |
| The order book as a public folder, changed by reviewed pull request (this record's first version) | A world could not be born without a person merging, and nothing could reach a world's files to copy them. A hosting console is, by convention, a control plane that talks to an agent on each host; here that agent is the machine's door, and the console holds no key at all. |

---

## 4. Consequences

**Obliges.**

- A world gets its card before its order. The fleet's check warns when an
  order names a card that does not exist.
- numinia-assets widens its scope: its README and licence map name the
  folder, and its media checks leave it alone.
- `SYS-013` records numinia-assets as the home of the public fleet's
  recipe.
- The supplier cards for the server host and for the object storage are
  written before the first world opens.

**Costs.**

- For a while the depot mixes resources with the machines' recipe.
- An Oracle's wallet is the key to every machine that lists it: a stolen
  wallet acts on all of them.
- A public world's domain and engine version are visible in each machine's
  public window. They are already visible in DNS and in the world itself.
- The keys are made by the machine, once per world. If a machine is lost,
  they are made again, which logs players out.

**Reversal.** Any of the conditions in point 3 moves the recipe to its own
repository without contradicting this record. A secret manager replaces the
keys kept on each machine without touching the cards or the orders.

---

## 5. Status

Proposed on 2026-10-09, pending the Oracle's acceptance on the pull request.
Changed on 2026-10-12 (0.2.0), at the Oracle's request: each machine keeps
its own book and obeys requests the Oracle's wallet signs, and the pull
request path of points 3 and 4 is gone. How the fleet runs is `SYS-014`;
what it still lacks, `DBT-025`.
