---
id: "ADR-067"
uid: ""
title: "The archive names its own things with the industry's words"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-03T20:30:00+02:00"
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Knowledge and quality"
tags: [decisions, adr, vocabulary, conventions, lexicon, renames]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "Every word the archive uses to name its own structures follows the convention of the industry that word belongs to; where the archive's word means something else in that industry, or the industry has a word and the archive a house word, the archive's word is replaced everywhere, and the lexicon records each word with the convention it follows."
amends: ["STD-001", "STD-004", "STD-026"]
related: ["ADR-066", "STD-027", "STD-030"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# ADR-067 — The archive names its own things with the industry's words

> **Summary:** A technical term follows its industry's convention, in every
> place at once; house words survive only where the industry has none, and
> the lexicon says which convention each word follows.
> **Epistemic:** The Oracle, 2026-10-03: "lo que digan las convenciones";
> coherence is not "we say it this way here", and a wrong term in one place
> is fixed in all.
> **Pragmatic:** Twenty-nine words change, in cuts ordered by cost; the
> lexicon gains a convention per entry.
> **Audience:** Agents · Oracles

---

## 1. Context

An audit of the archive's own vocabulary (2026-10-03, on `5629c75`) read
fifty-five words the archive uses for its structures — series, header
fields, lifecycle states, the machinery — against the convention of the
industry each belongs to: ISO 15489 and the Australian business
classification scheme for records; ISO 9000 and the policy → standard →
procedure → guideline hierarchy for governing documents; Nygard and MADR for
decision records; Dublin Core, PROV-O and IPTC for the header; SemVer and
RFC 3339 for versions and dates.

| Verdict | Words |
|---|---|
| already the convention | 18 |
| house word with no industry word | 8 |
| house word where the industry has one | 22 |
| wrong: means something else in its industry | 7 |

The seven wrong words: *protocol* (a message-exchange rule in software;
ISO 9000 says *procedure*, and the archive's own lexicon already offered
it), *documentation* as the type of a standard (a norm is normative, not
documentation), *biological agent* (a micro-organism hazard in occupational
safety law), *provenance* for "made by a person or by AI" (custody history
in Dublin Core; `STD-004` already confessed the clash), *fond* (the
archival term is *fonds*), *semaforo* (Spanish, and unused) and
*instrument* for the machinery (in law and finance an instrument is a
document, the opposite). `ADR-066` had just corrected one more of the same
kind: the viewer called a folder a *section*.

---

## 2. Decision

A word the archive uses to name one of its own things follows the
convention of the industry that word belongs to. When the archive's word
means something else in that industry, or the industry has a settled word
and the archive a house word, the archive's word is replaced — in folders,
addresses, header fields, values, code identifiers and prose, in one cut
per word or per folder. A house word stays only where the industry has
none, and the lexicon (`STD-026`) says so.

Every entry of the lexicon names the convention its word follows, with
the source; the sentence "sources are left out on purpose" is withdrawn.

The words of the narrative layer (mission, guild, rank, adventure, Oracle)
are not house words for structures: they are the Numinia stop of the dial,
translated to the business word by `STD-030`, and they stay.

The cuts, in order:

| Cut | Words | Addresses change |
|---|---|---|
| 1 | *fonds*; `semaforo` retired; `provenance` → `digital_source_type`; `type_execution: biological` → `executor: human`; `type: documentation` → `type: standard` for `standards/`; *instrument* → tooling/check; *mould* → template; *axis* → the normative documents; *plate* → rule ID; *guard* → check in prose; `ratified_by` → `approved_by`; `frozen` → `on-hold`; *threshold* → approval level; *retired* → deprecated; *ring* → core and extension fields; the lexicon with a convention per word | no |
| 2 | `protocols/` → `procedures/`, `type: protocol` → `procedure`, prefix `PRO-` kept | 28 |
| 3 | `canon/` → `principles/`, `type: seminal` → `principle`, prefix `CAN-` → `PRI-` | 14 |
| 4 | `blueprints/` → `designs/`, `type: blueprint` → `design`, prefix `BLU-` → `DSN-` | 12 |
| 5 | `machine/guards/` → `machine/checks/`, `npm run guards` → `npm run checks` | none public |

Binds from the merge of each cut. `STD-001`, `STD-004` and `STD-026` are
active; their changes are the Oracle's, by his decision of 2026-10-03.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Keep the house words and translate them at the business stop of the dial | The dial translates what a reader sees, not what an author types or an agent greps; a folder named `protocols/` is wrong in every clone. |
| Fix only the seven wrong words | Leaves twenty-two words a newcomer must learn for no return; the rule is the convention, not the damage. |
| Fix everything in one cut | Folder renames change addresses and need redirects; a mistake in one would hide in the noise of the others. |
| Keep *canon* and *blueprint* as the house's voice | The Oracle chose the convention over the voice; *canon* keeps its place in the game and at the Numinia stop. |

---

## 4. Consequences

**Obliges.** The lexicon is the place a word is looked up before it is
written; each entry carries its convention and source. A new structure
takes the industry's word first, and a house word only with a lexicon
entry saying the industry has none. The address guard learns the new
folders; the old addresses redirect to the new while they lead to the
document that answers the question (`STD-028`).

**Costs.** Five pull requests; about fifty-four addresses redirected;
`STD-001`, `STD-004`, `STD-017`, `STD-024`, `STD-026`, `STD-027` and the
moulds change; code identifiers in the viewer and the checks; every
document that cites a renamed folder or prefix; telemetry regenerated per
cut.

**Unchanged.** The content of every record; the function and series model
(`ADR-046`); the narrative words and their translation (`STD-030`); the
legal *policies* of `legal/`, which are the sector's word.

---

## 5. Status

Proposed on 2026-10-03, pending the Oracle's acceptance on the pull
request of cut 1.
