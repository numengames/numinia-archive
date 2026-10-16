---
id: "ADR-079"
uid: ""
title: "A world's content lives in its own files, the service lives on the platform, secrets and people stay on the machine; the web edits a world by writing into its files"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-16T14:30:00+00:00"
updated: "2026-10-16T14:30:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, engine, file-over-app, data, portability]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "Everything about a Numinia engine world falls into one of three drawers. Content (what the world is: what is built, its adventure, its environment, its roles, who may build, whether it has voice, its AI inhabitants and agents, its name, description and cover) lives in the world's own files and travels in its archive. Service (the bond with the house: the organisation it belongs to, who pays, the machine, the address, the balance) lives on the platform. Secrets and people (keys, the administration code, who came in, who uploaded what) stay on the machine and never travel. When numinia.com changes a world's content it writes it into the world's files through the world's door and keeps no copy of its own as the truth; the world's own settings write the same files."
amends: ["ADR-074", "ADR-069"]
related: ["ADR-070", "ADR-075", "ADR-080", "PRI-012", "STD-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-079 — Content in the world's files, service on the platform, secrets on the machine

> **Summary:** A world's content lives in its own files and travels in its
> archive; the service lives on numinia.com; secrets and records of people
> stay on the machine. The web edits content by writing into the world's
> files, so editing from the web or from inside the world gives the same
> result, and a world run from its archive on a laptop loses nothing.
> **Epistemic:** The Oracle's ruling of 2026-10-16: an AI is added to a world
> either from the platform or from the world's own settings, also in a world
> downloaded as a zip and run locally, and «tiene que ser file over app». The
> inventory is Ursa's, read the same day in numinia-engine and numinia-web.
> The principle is Steph Ango's «File over app» (2023): «Apps are ephemeral,
> but your files have a chance to last».
> **Pragmatic:** Before a setting ships, name its drawer. Content goes in a
> text file of the world with a format and a version (`ADR-074`); nothing of
> the content is kept only in an environment variable, a database of the
> platform or an installer's flag.
> **Audience:** Agents · Oracles

---

## 1. Context

`ADR-074` made a world a folder of text files that downloads whole and runs
on another server or a laptop. On 2026-10-16 the Oracle asked that an AI can
be added to a world both from numinia.com and from inside the world, and that
this be «file over app». Reading what a world is today showed the engine
nearly there, with three gaps: who may build was set by a variable of the
machine and re-applied at every start, so a world run from its archive lost
it; voice on or off was the same; the archive did not know the world's own
name, because the name lived only in the world's card in the archive
(`ADR-069`) and on its page on numinia.com; and the model and daily cap of an
AI inhabitant were set by the installer, not by the world.

Some things about a world are not the world's, though: the organisation it
belongs to (only the house places it), who pays for it (`ADR-070`), the
machine, the address. A laptop running an archive has no use for them, and
editing an archive must never be a way to change them.

## 2. Decision

1. **Three drawers.** Every setting and record of a world belongs to exactly
   one:
   - **Content** — what the world is: placed objects and uploads, the
     adventure (quests, people of the world, things, AI inhabitants, AI
     agents from outside), the environment, the world's roles and owners and
     bans, whether visitors may build, whether voice is on, the world's
     name, description and cover. It lives in the world's own text files
     and travels in its archive.
   - **Service** — the world's bond with the house: its organisation, who
     pays and its balance, the machine that runs it, its address, the
     engine version it runs. It lives on the platform (numinia.com, the
     till, the fleet).
   - **Secrets and people** — the server's keys, the administration code,
     model keys, who came in and who uploaded what. They stay on the machine
     that runs the world and never enter the archive nor the platform
     (`STD-022`).
2. **The web writes into the world.** When numinia.com changes a world's
   content — its name, its cover, who may build, its AIs — it sends the
   change to the world through the world's door, and the world writes its
   own files. numinia.com reads the content back from the world to show it
   and keeps no copy of its own as the truth. The settings inside the world
   write the same files, so both ways give the same result.
3. **The machine only seeds.** A variable of the machine or a flag of the
   installer may set a content setting for a world that has never had it;
   from then on the world's files decide, and a restart does not change them.
4. **The name is the world's.** The world's name, description and cover live
   in a text file of the world. The world's card in the archive (`ADR-069`)
   keeps what is the house's — address, plan, owner when named — and shows
   the world's own name, read from the world.

## 3. Alternatives considered

- **The platform as the truth, the archive as an export.** Simpler for the
  web, but a world run from its archive would lose whatever was only on the
  platform, against `PRI-012` and `ADR-074`; rejected.
- **Everything in the world, the service too.** An archive could then carry
  who pays or which organisation owns it, and editing a file would change
  them; rejected: the service is a contract with the house, not content.
- **Keep the name only in the card.** One place less to keep in step, but a
  world downloaded as a zip would not know what it is called; rejected.

## 4. Consequences

- The engine moves who may build, voice on or off, the world's name,
  description and cover, and an AI inhabitant's model and daily cap into the
  world's files; the machine's variables only seed them.
- AI agents from outside are listed in the world's files with their public
  key (`ADR-080`), so a world carries its AIs without carrying a secret.
- numinia.com's world settings, when built, write through the world's door;
  a world that is not running cannot be edited from the web until it is.
- The world's card in the archive stops being the only place of its name;
  `ADR-069` keeps the card for what is the house's.
- A world may carry, as content, a text file of rules for any AI that
  enters it (what may be built, the style, what not to touch).

## 5. Status

Decided by the Oracle on 2026-10-16. Prepared in numinia-engine on a local
branch the same day: who may build, voice, the world's name file and the
inhabitant's model and cap move into the world's files. Not yet published.
Recorded here on 2026-10-16, pending the Oracle's acceptance on the pull
request.
