---
id: "readme-main"
uid:
title: "numinia-nwos"
type: documentation
status: active
version: "2.0.2"
created: "2026-04-07T22:30:00Z"
updated: "2026-09-09T15:10:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# numinia-nwos

> The reference instance of the Narrative Work OS — the system that was used
> to build itself.

This is not documentation *about* a system. It is the system: the archive an
organisation of humans and digital agents actually runs on. Missions are
executed from here, decisions are recorded here, and the agents read these
files to know who they are.

If that sounds like a claim, check it against [`debt/`](debt/) — the register
of everything this archive knows it is missing.

---

## Start here

**Agents** open with [`PRO-001`](protocols/PRO-001-agent-session.md), then read
[`CLAUDE.md`](CLAUDE.md). One path, no menu.

**Humans** read [`STD-001`](standards/STD-001-the-series.md) — what each folder holds
and what every field means — then whichever series they came for.

---

## Where things live

Each folder answers one question, and the folders group into six **functions**
(`STD-027`). [`STD-001`](standards/STD-001-the-series.md) is the full
definition; this is only the map.

| Function | Series | Answers |
|---|---|---|
| **Governance** | [`canon/`](canon/) | What the system **is** — foundational documents |
| | [`standards/`](standards/) | What an artifact must **comply with** |
| | [`protocols/`](protocols/) | What an actor **executes**, step by step |
| | [`decisions/`](decisions/) | **Why** something was chosen |
| **Production** | [`blueprints/`](blueprints/) | What **could** be — designs not yet executed |
| | [`missions/`](missions/) | The **work**: promised, done, and with what evidence |
| **Assurance** | [`reports/`](reports/) | What was **observed**, on a date, by someone |
| | [`debt/`](debt/) | What we know is **missing** |
| **Agency** | [`agents/`](agents/) | **Who** acts — one folder per digital agent |
| **Creation** | [`lore/`](lore/) | The **fiction** and the game — a second fond |
| **Administration** | [`operations/`](operations/) | What **sustains** the business — legal, security |
| | [`system/`](system/) | How the machine is **wired** |
| — | [`machine/`](machine/) | The **instruments**: guards, tools, scripts, moulds, telemetry |
| — | [`web/`](web/) | **This folder serves [numinia.org](https://numinia.org)** |

`machine/` is not a series. What verifies, measures, moulds or packages the
archive carries no identifier and binds nobody: a short-lived record, cited
only as evidence of what it measured (`STD-027` CLS-002) — which is why it
is filed apart from the documents.

That last row is the one people miss. The public site is built from this
repository on every deploy — the mission board, the decision log and the corpus
reader all read these files directly. There is no separate content system.

---

## Its place among the repositories

| Repository | Relation |
|---|---|
| `nwos-workspace-template` | The upstream mould this instance was cast from |
| **`numinia-nwos`** | **This one — the reference instance** |
| `numinia-web` · `numengames-web` | Artifact repos: products built by the work recorded here |
| `numinia-ops` | Operational data, private by design |

**What is public here is structural and methodological**: the archive's shape,
its vocabulary, its decisions and its procedures. **What is not public is
operational**: credentials, client data, contracts — anything with a real
person or a real invoice on the other side of it.

A reader who does not know that split concludes the repository is incomplete.
It is not incomplete — it is scoped.

---

## The mission system

Missions live in one flat folder. **State is a frontmatter field, never a
path** — `missions/MIS-NNNN-english-slug.md`, and `status:` is the only surface
that says where a mission stands. Signalling state by moving files between
folders was tried and deliberately undone.

The live board is [numinia.org/missions](https://numinia.org/missions), built
from `missions/` on every deploy. The states a mission may hold are declared in
[`STD-016`](standards/STD-016-header-fields.md); the cycle that moves them, in
[`PRO-003`](protocols/PRO-003-mission-cycle.md).

---

## Agents

Every agent is a folder under [`agents/`](agents/) holding `SOUL.md` (identity),
`OPERATOR.md` (rules), `STATUS.md` (state) and `MEMORY.md`; the roster is
[`agents/INDEX.md`](agents/INDEX.md).

Digital agents here are not tooling. They hold roles, belong to guilds, execute
missions and accumulate memory across sessions — which is why their identity
documents are archived under the same rules as everything else.

---

## Licensing

The licence is the file's, never the folder's. Every text file declares its own
in an SPDX comment in its first lines; files that cannot carry one (images,
fonts, JSON) are named one by one in [`REUSE.toml`](REUSE.toml). Two files in
the same folder may carry different licences. REUSE 3.3.

See [`LICENSE`](LICENSE) and [`CAN-005`](canon/CAN-005-licensing.md) — do not infer
a licence from a neighbouring file.

---

## What is verified, and what is not

One rule in this repository is enforced by a machine: a document's `license:`
header must match the SPDX declaration in the same file, checked by
[`machine/guards/rules/std-010-licensing.mjs`](machine/guards/rules/std-010-licensing.mjs)
on every push through [`.github/workflows/ci.yml`](.github/workflows/ci.yml).
The site build runs in the same pipeline, so a structural change that breaks
[numinia.org](https://numinia.org) fails before it merges.

**Naming, vocabularies, and identifiers now have guards; the states a
mission may hold do not.** `machine/guards/rules/std-004-the-header.mjs` and `machine/guards/rules/std-018-one-identifier.mjs` run
on every push (closed `debt/D-001`, 2026-08-31). Register `debt/` was
retired in full 2026-09-04 (Oracle instruction, `MIS-0127` absorbs what
remains): the archive describes four levels of change control, and git
enforces one.

Stating this is not modesty. An archive that claims more verification than it
performs is the failure mode this repository exists to avoid.

---

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`standards/STD-009-which-rule-wins.md`](standards/STD-009-which-rule-wins.md) and the standards it points at.
Work enters through pull requests; the Oracle signs what changes the shape of
the archive. The repository is written in English
([`ADR-023`](decisions/ADR-023-canon-vocabulary.md)).

---

*Numen Games — Narrative Work OS · licensed per file, see [LICENSE](LICENSE)*
