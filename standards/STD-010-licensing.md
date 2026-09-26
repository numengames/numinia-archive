---
id: "STD-010"
uid: ""
title: "Licensing"
type: documentation
subtype: standard
status: draft
version: "2.3.3"
created: "2026-09-07T10:30:00+02:00"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [licensing, legal, REUSE, SPDX]
threshold: governed
absorbs: ["STD-013"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Licensing

> **Summary:** Everything we make states its terms. Service programs are
> open; whoever improves them shares back. Tools are open, unconditionally. Art, data and the world's stories belong to everyone.
> Texts are reusable with credit. The brand stays ours.
> **Epistemic:** Under which terms is each piece published?
> **Pragmatic:** Choose the licence for something new, or check an old one,
> without asking a lawyer. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** every repository of Numen Games and Numinia.

## Rules

### What we may publish, and under which terms

**Only what is ours is published.** A piece MUST NOT be published unless we
can show it is ours: by contract, commission, transfer of rights, or an
origin that allows it. We follow the Developer Certificate of Origin, a
one-line promise that the author may give the change. We also run the review
of outgoing work that the international licence-compliance standard asks
for. Every piece then traces back to someone who vouched for it.

**The terms follow the kind of piece.** A program that runs one of our
services is open, and anyone who changes it and offers it to others must
share the changes. A tool, library or script is open with no conditions.
Images, models, data, design, the canon, the agents and the world's stories
belong to everyone, for good. Anyone may reuse an explanatory text if they
credit us. The brand and early prototypes stay ours.

**Sharing obligations flow down, never up.** A tool that is open with no
conditions MUST NOT include a program that obliges sharing, or it inherits
the obligation. The strictest terms among what we ship decide for the whole.
What is used only to build does not count. Two programs that only talk over
the network are two separate works.

**Someone else's obligations stay apart.** An outside engine that obliges
sharing lives in its own repository, so its terms never spread to ours.

**Work made for a client belongs to the client.** Our templates keep our
terms. What they generate for a client MUST carry all rights reserved, in
the client's name.

### What we may build on

**We only build on what is allowed.** The international standards for
licence compliance and open-source security ask for a written list of
accepted licences. Every dependency is checked against it, and a review
refuses any new dependency off the list. So for any release we can prove
that nothing in it carries terms we did not accept. Someone else's code MUST
have its terms on our accepted list before we add it. If the terms are
missing or unclear, nothing is added until someone reads them.

**Having is not shipping.** Code with forbidden terms MAY sit in a
repository only if three things hold: it never reaches what we ship, the
debt is written down with a way out, and a check inspects what ships. A
program that obliges sharing never carries extra restrictions.

### How a file says its terms

**Each repository says its terms in the common format.** We follow the REUSE
specification, the common way for a repository to state its licences. The
full text of every licence used sits in one folder. Every file is covered,
and the specification's linter proves it on every change. Any tool, auditor
or reuser can read the terms of any file without asking us. Every repository
MUST also carry its main licence and a note on the brand, all in English.

**Each file says its own terms.** Every text file MUST open with the
specification's two-line comment header: who owns it, and under which
licence. Every open-source tool reads those lines. A document's header MUST
say the same. A file that cannot hold the lines, like an image or a font, is
listed in the shared file by its exact name. We never list a whole folder,
so no file is covered by accident.

**Media carries its terms inside.** An image, a model or a sound carries its
licence in its own metadata. An avatar we give to everyone MUST lift the
restrictions its format sets by default.

**We say how a piece was made.** Every piece states who made it: a person, a
person helped by AI, or AI alone. What we publish as ours shows a person's
hand.

**Giving away is only giving away our part.** Before we give an image, video
or voice to everyone, we check where its samples came from. We get written
consent from anyone who can be recognised, strip the photo's hidden data,
and confirm we hold the rights behind any video or cloned voice. Giving away
our copyright leaves each person's rights over their image, voice and
privacy untouched.

### Who may contribute

**Every contribution comes with permission.** In the Developer Certificate
of Origin, the author signs off in one line that they wrote the change, or
may submit it, under the repository's licence. The best practices badge asks
for this at its silver level. Each change MUST carry that sign-off, so it
carries its own proof of permission. Where a repository holds a program that
obliges sharing, contributors also sign an agreement with us. Art is given
to everyone explicitly, in the change that brings it.

## Check

Each rule, its code, its source and its check. Then every kind of piece with
the exact name of its licence, the licences we may build on, where each kind
of file carries its terms, and where each licence's text is read.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| LIC-001 | Only what is ours is published | [Developer Certificate of Origin 1.1, clauses (a) to (c)](https://developercertificate.org/); [ISO/IEC 5230 OpenChain, clause 3.3 review and approval](https://github.com/OpenChain-Project/License-Compliance-Specification) | by hand, at the pull request |
| LIC-002 | The terms follow the kind of piece | [SPDX licence list](https://spdx.org/licenses/) | by hand, at the pull request |
| LIC-003 | Sharing obligations flow down, never up | [AGPL 3.0](https://www.gnu.org/licenses/agpl-3.0.html) | nothing yet: the direction check is described, not built (`DBT-020`) |
| LIC-004 | Someone else's obligations stay apart | — | by hand, at the pull request |
| LIC-010 | Work made for a client belongs to the client | — | by hand, at the pull request |
| LIC-005 | We only build on what is allowed | [ISO/IEC 5230 OpenChain](https://github.com/OpenChain-Project/License-Compliance-Specification) and [ISO/IEC 18974 OpenChain Security Assurance](https://github.com/OpenChain-Project/Security-Assurance-Specification); accepted terms in the allowlist below | the dependency review action with `allow-licenses` in CI — not yet in this repository |
| LIC-006 | Having is not shipping | — | nothing yet: the shipped-artifact inspector is described, not built (`DBT-020`) |
| LIC-007 | Each repository says its terms in the common format | [REUSE 3.3](https://reuse.software/spec-3.3/) | `reuse lint` in CI, all four repositories; `machine/guards/rules/std-010-licensing.mjs`; absorbs register row ARC-003 |
| LIC-008 | Each file says its own terms | [REUSE 3.3, comment headers](https://reuse.software/spec-3.3/); [SPDX](https://spdx.dev/) | `machine/guards/rules/std-010-licensing.mjs` (also `HDR-008`, `HDR-043`); stricter than REUSE: no folder globs in `REUSE.toml` |
| LIC-009 | Media carries its terms inside | the fields table below | by hand, at the pull request |
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

**What we may build on.**

| Tier | Licences | Condition |
|---|---|---|
| Freely | `MIT` `ISC` `BSD-2-Clause` `BSD-3-Clause` `Apache-2.0` `0BSD` `CC0-1.0` `CC-BY-4.0` · `OFL-1.1` | OFL for fonts only |
| With isolation | `MPL-2.0` `EPL-2.0` `LGPL-3.0-only` `LGPL-3.0-or-later` | file-level boundary kept |
| With a signed decision | `GPL-3.0-only` `GPL-3.0-or-later` `AGPL-3.0-only` `AGPL-3.0-or-later` | isolated and declared; separate repository if a third party's |
| Never | `BUSL-1.1` `SSPL-1.0` `Elastic-2.0` · Commons Clause · proprietary · `CC-BY-NC-*` `CC-BY-ND-*` · any package without a `license` field | the *never* tier applies to what is distributed or served (`LIC-006`) |

Code may be pulled in one direction only: from the licences with no
conditions, through Apache, into the licences that oblige sharing — never
back.

| From | To |
|---|---|
| `MIT` · `BSD-2-Clause` · `BSD-3-Clause` · `ISC` | `Apache-2.0` → `GPL-3.0-only` → `AGPL-3.0-only` |

**Where a file carries its terms.**

| Format | Field |
|---|---|
| glTF / GLB | `asset.copyright` |
| VRM | `VRMC_vrm.meta` — `licenseUrl`, `otherLicenseUrl`, permissions; for CC0: `otherLicenseUrl` to CC0, `avatarPermission: everyone`, `commercialUsage: corporation`, `creditNotation: unnecessary`, `allowRedistribution: true`, `modification: allowModificationRedistribution` |
| MP3 | ID3v2 `TCOP` + `TXXX:LICENSE` |
| WAV / FLAC / OGG | Vorbis comments `LICENSE`, `COPYRIGHT` |
| JPEG / PNG / WebP | XMP `xmpRights:WebStatement` + `cc:license`; EXIF `Copyright` |
| MP4 / MOV | embedded XMP |
| SVG | RDF with `dc:rights` and `cc:license` |
| text file (Markdown, code, YAML, TOML) | an SPDX comment in its first lines: the copyright holder and the licence identifier, in the comment syntax of the format |
| file that cannot hold a comment (JSON, image, font, generated or pinned copy) | its exact path in `REUSE.toml` — one entry per file, never a folder glob |

**Where each licence is read.**

| Licence | SPDX | Official text |
|---|---|---|
| CC0 1.0 Universal | `CC0-1.0` | <https://creativecommons.org/publicdomain/zero/1.0/legalcode.en> |
| CC Attribution 4.0 | `CC-BY-4.0` | <https://creativecommons.org/licenses/by/4.0/> |
| MIT | `MIT` | <https://spdx.org/licenses/MIT.html> |
| Apache License 2.0 | `Apache-2.0` | <https://www.apache.org/licenses/LICENSE-2.0> |
| Mozilla Public License 2.0 | `MPL-2.0` | <https://www.mozilla.org/MPL/2.0/> |
| GNU GPL v3 | `GPL-3.0-only` | <https://www.gnu.org/licenses/gpl-3.0.html> |
| GNU AGPL v3 | `AGPL-3.0-only` | <https://www.gnu.org/licenses/agpl-3.0.html> |
| SIL Open Font License 1.1 | `OFL-1.1` | <https://openfontlicense.org/open-font-license-official-text/> |
| Free Cultural Works | — | <https://freedomdefined.org/Definition/Es> |
| Identifiers | SPDX | <https://spdx.org/licenses/> |
| Declaration | REUSE 3.3 | <https://reuse.software/spec-3.3/> |
| VRM 1.0 · meta | — | <https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/meta.md> |

## Why

Every piece starts under the most closed terms that make sense and opens on
purpose, because opening cannot be undone. What runs our services obliges
sharing, so improvements come back to us. What others build with has no
conditions, so it spreads. What we publish belongs to everyone, so nobody
has to ask. We state it in the format the open-source world already reads,
so any tool can check us.

## References

| ID | Title | Relation |
|---|---|---|
| `CAN-005` | Opening is an act | why; where this and the canon disagree, one is wrong and is corrected |
| `STD-014` | Publishing gates | the two irreversible acts and their checks |
