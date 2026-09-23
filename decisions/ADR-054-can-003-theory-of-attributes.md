---
id: "ADR-054"
uid: ""
title: "CAN-003 keeps the theory of attributes; the sheet and the rank specs go to their homes"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T22:00:00+02:00"
updated: "2026-09-23T22:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, attributes, ranks, lore]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-003 keeps the six attributes and the dimension each arises from, and loses the character sheet, which the codex holds complete, and the rank list, which the platform standard holds with permissions. The Vernacular and Archon specifications move to that standard, where a promoter reads them."
related: ["CAN-003", "STD-003", "ADR-036", "ADR-049"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-054 — CAN-003 keeps the theory of attributes

> **Summary:** The canon of attributes holds its theory and stops carrying a
> character sheet and a rank list that live, better, elsewhere.
> **Epistemic:** A canon that ends in a filled-in example has stopped stating
> what is true and started demonstrating it — and the demonstration goes stale
> first.
> **Pragmatic:** One place to learn what an agent is composed of; one place to
> read a sheet; one place to see what a rank grants.
> **Audience:** Agents · Oracles

---

## 1. Context

`CAN-003` answers a question nothing else in the corpus answers: what an agent
is made of. Six categories — personal traits, profile, position, identity,
role, rank — each defined by the stance towards the environment it arises
from: the profile **observes** (epistemological), the position **defines**
(semantic), the identity **interprets** (semiotic), the role **interacts**
(pragmatic). That structure is the document's contribution, and it holds.

Around it sat three things that were not it.

| | |
|---|---|
| body words | 1 640 |
| of those, in a filled-in character sheet | ~330 |
| card fields still holding the template's example text | 3 of 3 |
| documents stating the same six ranks | 3 (`CAN-003`, `CAN-004`, `STD-003`) |

**The card was never written.** Summary read *"NWOS system document —
Compendium of Attributes and Ranks in Numinia"*, Epistemic *"What you learn by
reading this document"*, Pragmatic *"What you can do with this document"* —
the template's own example text, published live for months. The same defect
`CAN-001` carried until `ADR-048`.

**The character sheet is the codex's.** `lore/codex/hoja-de-personaje.md` is a
field-by-field transcription of the printed sheet, in the manual's language,
with fields the canon's copy never had — Umbral, Desequilibrio, Aliento del
Velo, Puntos de Prestigio, relics, treasures — and a note on which competences
the interactive sheet enables. The canon carried a thinner, older version of a
document that already exists.

**The ranks are the platform standard's.** `STD-003` holds the six with what
earns each, where each is read from, and what each may do. But the
specifications of the top two — and the design note that technical depth does
not make an Archon — existed **only in `CAN-003`**, separated from the ranks
they qualify, where nobody promoting anyone would look.

## 2. Decision

**`CAN-003` keeps the theory**, at `2.0.0`, retitled *What an agent is made
of*: the six categories, the dimension each arises from, Eco's Australopithecus
— which explains a role better than any definition — and the five epistemic
approaches, as a table. About 700 words. The card is written.

**The character sheet is removed, not moved.** The codex holds it complete and
current.

**The rank list is removed**; what stays is what a rank *is* as an attribute:
a level of involvement, cumulative in access, and the only attribute assigned
by the system and read from evidence rather than adopted by the agent.

**The Vernacular and Archon specifications move to `STD-003`** (`3.1.0`),
beside the matrix, under a heading that says what the table cannot: the table
states what earns a promotion mechanically, these state what a promoter is
looking for. The design note goes with them, because that is where a promotion
is decided.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Keep the sheet as an illustration | It is an illustration of the lore's document, in a language and a version the lore has moved past. Two sheets is how the first one goes stale |
| Keep the rank list, cut only the specs | Three statements of six ranks is two too many, and the canon's added nothing the standard lacks |
| Move the specs to the lore with the sheet | They are promotion criteria, not world-building. A promoter reads the platform standard |
| Leave the specs in the canon | They sat apart from the ranks they qualify, where nobody deciding a promotion would look — which is why the design note had no effect |

## 4. Consequences

- **Obliges:** nothing new. It applies `ADR-049` to a fourth canon.
- **Costs:** the published page loses its most concrete section — a reader who
  liked seeing Arla's filled-in sheet now goes to the codex, which is in
  Spanish. Section anchors change.
- **Reversal:** none foreseen; git holds the removed copies, and both live
  originals are more complete.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.

## 6. Noted, not decided

Session Zero is what turns a Nomad into a Citizen. Both `CAN-003` and
`STD-003` state it in passing and neither defines it: a live rule described
twice and owned by nobody. Out of scope here.
