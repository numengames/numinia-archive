---
id: "STD-010"
uid: ""
title: "Licensing"
type: documentation
subtype: standard
status: draft
version: "2.1.0"
created: "2026-09-07T10:30:00+02:00"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [licensing, legal, REUSE, SPDX]
threshold: governed
series_change: "2.1.0 — 2026-09-25: written in plain words, at the Oracle's word in session. No licence code, acronym or file name in the reading, from the card to the last rule: each licence is described by what it lets people do, and a table at the foot pairs every description with its exact name, every rule with its plate, source and check. No obligation added or dropped. 2.0.0 — 2026-09-25: the licensing standard takes in the three outside standards it rests on — SPDX, REUSE and the Developer Certificate of Origin — which leave STD-011. They were already here in our own words (every repository declares, one file one regime, contributions covered); now each rule names the outside standard it follows. Rules read aloud with no code or path in the way; plates and sources wait in one table at the foot. No obligation added or dropped. At the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Licensing

> **Summary:** Everything we make says under which terms others may use it.
> Programs that run our services are open, and whoever improves them must
> share the improvement. Tools are open with no conditions. Art, data and
> the world's stories belong to everyone. Texts may be reused if we are
> credited. The brand stays ours.
> **Epistemic:** Which terms each kind of piece gets, how a file says so,
> and what we may build on.
> **Pragmatic:** Choose the licence for something new, or check an old one,
> without asking a lawyer. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** every repository of Numen Games and Numinia.
**Does not bind:** work we generate for a client, or material from others,
which keeps its own terms.

## Rules

### What we may publish, and under which terms

**Only what is ours is published.** A piece must not be published unless we
can show it is ours: a contract, a commission, a transfer of rights, or an
origin that allows it.

**The terms follow the kind of piece.** A program that runs one of our
services is open, and anyone who changes it and offers it to others must
share their changes. A tool, library or script is open with no conditions.
Images, models, data, design, the canon, the agents and the world's stories
belong to everyone, for good. Explanatory texts may be reused by anyone who
credits us. The brand and early prototypes stay ours.

**Sharing obligations flow down, never up.** A tool that is open with no
conditions must not include a program that obliges sharing, or it would
inherit the obligation. The strictest terms among what we ship decide for
the whole; what is used only to build does not count, and two programs that
only talk over the network are two separate works.

**Someone else's obligations stay apart.** An outside engine that obliges
sharing lives in a repository of its own, so its terms never spread to ours.

**Work made for a client belongs to the client.** Our templates keep our
terms; what they generate for a client must carry all rights reserved, in
the client's name.

### What we may build on

**We only build on what is allowed.** Before adding someone else's code, its
terms must be on our list of accepted terms. If the terms are missing or
unclear, nothing is added until someone reads them.

**Having is not shipping.** Code with forbidden terms may sit in a
repository only if it never reaches what we ship, the debt is written down
with a way out, and a check inspects what ships. A program that obliges
sharing may never carry extra restrictions.

### How a file says its terms

**Each repository says its terms in the common format.** Every repository
must carry its main licence, the full text of every licence it uses, a
single file covering what cannot speak for itself, and a note on the brand,
all in English, and pass the automatic check on every change.

**Each file says its own terms.** Every text file must open with two short
lines, who owns it and under which licence, in the format every open-source
tool reads. A document's header must say the same. Only a file that cannot
hold those lines, like an image or a font, is listed in the shared file, by
its exact name.

**Media carries its terms inside.** An image, a model or a sound carries its
licence in its own metadata. An avatar we give to everyone must lift the
restrictions its format sets by default.

**We say how a piece was made.** Every piece states whether a person made
it, a person made it with help from AI, or AI generated it. What we publish
as ours shows a person's hand.

**Giving away is only giving away our part.** Before we give an image,
video or voice to everyone, we check where its samples came from, get
written consent from anyone who can be recognised, strip the photo's hidden
data, and make sure we hold the rights behind any video or cloned voice.

### Who may contribute

**Every contribution comes with permission.** Where a repository holds a
program that obliges sharing, contributors sign an agreement with us. Where
it holds only open tools or texts, each change carries a one-line
certificate that the author has the right to give it. Art is given to
everyone explicitly, in the change that brings it.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today. Then every kind of piece with the
exact name of its licence.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| LIC-001 | Only what is ours is published | — | by hand, at the pull request |
| LIC-002 | The terms follow the kind of piece | [SPDX licence list](https://spdx.org/licenses/) | by hand, at the pull request |
| LIC-003 | Sharing obligations flow down, never up | [AGPL 3.0](https://www.gnu.org/licenses/agpl-3.0.html) | nothing yet: the direction check is described, not built (`DBT-020`) |
| LIC-004 | Someone else's obligations stay apart | — | by hand, at the pull request |
| LIC-010 | Work made for a client belongs to the client | — | by hand, at the pull request |
| LIC-005 | We only build on what is allowed | accepted terms in `STD-013` | `license-check` in CI — not yet in this repository |
| LIC-006 | Having is not shipping | — | nothing yet: the shipped-artifact inspector is described, not built (`DBT-020`) |
| LIC-007 | Each repository says its terms in the common format | [REUSE 3.3](https://reuse.software/spec-3.3/) | `reuse lint` in CI, all four repositories; `machine/guards/rules/std-010-licensing.mjs` |
| LIC-008 | Each file says its own terms | [SPDX](https://spdx.dev/) | `machine/guards/rules/std-010-licensing.mjs` (also `HDR-008`, `HDR-043`) |
| LIC-009 | Media carries its terms inside | metadata fields in `STD-013` | by hand, at the pull request |
| LIC-011 | We say how a piece was made | — | by hand, at the pull request |
| LIC-012 | Giving away is only giving away our part | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | by hand, at the pull request |
| LIC-013 | Every contribution comes with permission | [Developer Certificate of Origin](https://developercertificate.org/) | nothing yet: between 0 and 7 of the last 30 commits are signed, per repository (`DBT-020`) |

| Kind of piece | In the reading | Licence |
|---|---|---|
| A program that runs a service (`apps/*`) | open, changes must be shared | `AGPL-3.0-only` |
| A tool, library, SDK, token set, script, CI step (`machine/packages/*`) | open, no conditions | `MIT` |
| Images, models, data, design, canon, agents (`agents/*`), lore | belongs to everyone | `CC0-1.0` |
| Explanatory texts | reusable with credit | `CC-BY-4.0` |
| Brand, prototypes | stays ours | all rights reserved |
| Work generated for a client | the client's | all rights reserved, in the client's name |

## Why

Every piece starts under the most closed terms that make sense and is opened
on purpose, because opening cannot be undone. What runs our services obliges
sharing, so improvements come back to us; what others build with is open
with no conditions, so it spreads; what we publish belongs to everyone, so
nobody has to ask. Saying it in the format the whole open-source world
already reads means any tool can check us without asking.

## References

| ID | Title | Relation |
|---|---|---|
| `CAN-005` | Opening is an act | why; where this and the canon disagree, one is wrong and is corrected |
| `STD-013` | Licence allowlist and fields | what the accepted-terms and media rules check against |
| `STD-014` | Publishing gates | the two irreversible acts and their checks |
| `DBT-020` | Declared automatic, executed by nobody | the checks still missing |
