---
id: "STD-010"
uid: ""
title: "Licensing"
type: documentation
subtype: standard
status: draft
version: "2.2.0"
created: "2026-09-07T10:30:00+02:00"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [licensing, legal, REUSE, SPDX]
threshold: governed
series_change: "2.2.0 — 2026-09-25: the rules on ownership, accepted terms, the common format, file headers and contributions now say what their outside standards make us do (the Developer Certificate of Origin, the OpenChain licence-compliance standards, REUSE) and whether the law or our choice requires it, a minor move because every change now carries the sign-off, at the Oracle's word in session."
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

**Only what is ours is published.** A piece MUST NOT be published unless we
can show it is ours: a contract, a commission, a transfer of rights, or an
origin that allows it. We follow the Developer Certificate of Origin, the
common one-line promise that the author has the right to give a change, and
the review of what goes out that the international licence-compliance
standard asks for. Anyone can then trace every piece to someone who vouched
for it. The law requires this: copyright law forbids publishing what is not
ours.

**The terms follow the kind of piece.** A program that runs one of our
services is open, and anyone who changes it and offers it to others must
share their changes. A tool, library or script is open with no conditions.
Images, models, data, design, the canon, the agents and the world's stories
belong to everyone, for good. Explanatory texts may be reused by anyone who
credits us. The brand and early prototypes stay ours.

**Sharing obligations flow down, never up.** A tool that is open with no
conditions MUST NOT include a program that obliges sharing, or it would
inherit the obligation. The strictest terms among what we ship decide for
the whole; what is used only to build does not count, and two programs that
only talk over the network are two separate works.

**Someone else's obligations stay apart.** An outside engine that obliges
sharing lives in a repository of its own, so its terms never spread to ours.

**Work made for a client belongs to the client.** Our templates keep our
terms; what they generate for a client MUST carry all rights reserved, in
the client's name.

### What we may build on

**We only build on what is allowed.** We follow the international standards
for licence compliance and for open-source security, which ask for a
written list of accepted licences checked against every dependency, and a
review of each new dependency that refuses anything off the list. We can
then prove, for any release, that nothing in it carries terms we did not
accept. Before adding someone else's code, its terms MUST be on our list of
accepted terms; if they are missing or unclear, nothing is added until
someone reads them. The law requires respecting the terms; the list is our
choice.

**Having is not shipping.** Code with forbidden terms MAY sit in a
repository only if it never reaches what we ship, the debt is written down
with a way out, and a check inspects what ships. A program that obliges
sharing may never carry extra restrictions.

### How a file says its terms

**Each repository says its terms in the common format.** We follow the REUSE
specification, the common way for a repository to say its licences: the
full text of every licence used sits in one folder, every file is covered,
and the specification's own linter proves it on every change. Any tool,
auditor or reuser can then read the terms of every file without asking us.
Our addition: every repository MUST also carry its main licence and a note
on the brand, all in English. Our choice.

**Each file says its own terms.** We follow the same specification's comment
header: every text file MUST open with two short lines, who owns it and
under which licence, which every open-source tool reads. A document's
header MUST say the same. Our addition, stricter than the specification:
only a file that cannot hold those lines, like an image or a font, is listed
in the shared file, by its exact name and never by a whole folder, so no
file is covered by accident. Our choice.

**Media carries its terms inside.** An image, a model or a sound carries its
licence in its own metadata. An avatar we give to everyone MUST lift the
restrictions its format sets by default.

**We say how a piece was made.** Every piece states whether a person made
it, a person made it with help from AI, or AI generated it. What we publish
as ours shows a person's hand.

**Giving away is only giving away our part.** Before we give an image,
video or voice to everyone, we check where its samples came from, get
written consent from anyone who can be recognised, strip the photo's hidden
data, and make sure we hold the rights behind any video or cloned voice.
The law requires this: giving away our copyright leaves a person's rights
over their own image, voice and privacy untouched.

### Who may contribute

**Every contribution comes with permission.** We follow the Developer
Certificate of Origin, the common one-line sign-off in which the author
certifies that they wrote the change, or have the right to submit it, under
the repository's licence; the best practices badge asks for it at its silver
level. Every change then carries its own proof of permission. Each change
MUST carry that sign-off. Our addition: where a repository holds a program
that obliges sharing, contributors also sign an agreement with us, and art
is given to everyone explicitly in the change that brings it. Our choice.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today. Then every kind of piece with the
exact name of its licence.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| LIC-001 | Only what is ours is published | [Developer Certificate of Origin 1.1, clauses (a) to (c)](https://developercertificate.org/); [ISO/IEC 5230 OpenChain, clause 3.3 review and approval](https://github.com/OpenChain-Project/License-Compliance-Specification) | by hand, at the pull request |
| LIC-002 | The terms follow the kind of piece | [SPDX licence list](https://spdx.org/licenses/) | by hand, at the pull request |
| LIC-003 | Sharing obligations flow down, never up | [AGPL 3.0](https://www.gnu.org/licenses/agpl-3.0.html) | nothing yet: the direction check is described, not built (`DBT-020`) |
| LIC-004 | Someone else's obligations stay apart | — | by hand, at the pull request |
| LIC-010 | Work made for a client belongs to the client | — | by hand, at the pull request |
| LIC-005 | We only build on what is allowed | [ISO/IEC 5230 OpenChain](https://github.com/OpenChain-Project/License-Compliance-Specification) and [ISO/IEC 18974 OpenChain Security Assurance](https://github.com/OpenChain-Project/Security-Assurance-Specification); accepted terms in `STD-013` | the dependency review action with `allow-licenses` in CI — not yet in this repository |
| LIC-006 | Having is not shipping | — | nothing yet: the shipped-artifact inspector is described, not built (`DBT-020`) |
| LIC-007 | Each repository says its terms in the common format | [REUSE 3.3](https://reuse.software/spec-3.3/) | `reuse lint` in CI, all four repositories; `machine/guards/rules/std-010-licensing.mjs`; absorbs register row ARC-003 |
| LIC-008 | Each file says its own terms | [REUSE 3.3, comment headers](https://reuse.software/spec-3.3/); [SPDX](https://spdx.dev/) | `machine/guards/rules/std-010-licensing.mjs` (also `HDR-008`, `HDR-043`); ours is stricter than REUSE: no folder globs in `REUSE.toml` |
| LIC-009 | Media carries its terms inside | metadata fields in `STD-013` | by hand, at the pull request |
| LIC-011 | We say how a piece was made | — ; candidate: [IPTC Digital Source Type](https://cv.iptc.org/newscodes/digitalsourcetype/) | by hand, at the pull request |
| LIC-012 | Giving away is only giving away our part | [CC0 1.0, clause 4(b)](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en): publicity and privacy rights are not waived | by hand, at the pull request |
| LIC-013 | Every contribution comes with permission | [Developer Certificate of Origin 1.1](https://developercertificate.org/); [OpenSSF Best Practices Badge, silver, dco](https://www.bestpractices.dev/en/criteria/1#1.dco) | nothing yet: between 0 and 7 of the last 30 commits are signed, per repository (`DBT-020`); absorbs register row OSS-003 |

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
