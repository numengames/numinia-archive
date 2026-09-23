---
id: "ADR-053"
uid: ""
title: "The game manual is the authority on the world's vocabulary"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T21:00:00+02:00"
updated: "2026-09-23T21:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, vocabulary, lore, guilds]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "Where the archive and the game manual disagree on a name of the world, the manual wins. Five divergences CAN-004 had recorded and left unresolved are resolved against it, one house pair is reordered to match it, and the translation tables leave the canon for STD-030, a register."
related: ["CAN-004", "STD-030", "STD-003", "PRO-019", "ADR-049"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-053 — The game manual is the authority on the world's vocabulary

> **Summary:** The lore names the world; the archive records the names. Where
> they disagreed, the archive was wrong.
> **Epistemic:** A canon that documents its own contradiction and declines to
> resolve it has published a coin toss for every reader who has to implement
> it.
> **Pragmatic:** One name per thing, traceable to the manual, in a register
> that says it translates rather than obliges.
> **Audience:** Agents · Oracles

---

## 1. Context

`CAN-004` is the document other documents rely on to classify people. It
carried three genres at once:

| | |
|---|---|
| body words | 1 630 |
| of those, in translation tables that state they carry no obligation | ~1 000 |
| names with two different versions inside the same file | 5 |
| entries duplicating a live document (`PRO-019`, `STD-003`) | 8 |

**It recorded a contradiction and declined to resolve it.** A closing section,
*Names that differ between the two vocabularies*, listed five names the
hierarchy and the table spelled differently — Artisans/Handcrafters,
Project designers/Draftsmen, Automata/Automatons, Seraphim/Seraphs,
Stewards/Intendants — and stated that the divergences "are recorded, not
resolved". For the canon that classifies people, that is a coin toss handed to
whoever implements it.

**Checked against the manual (`lore/game/manual-v0.6.0.md`, chapter 3), neither
list was right.** Three names confirm the hierarchy (Proyectistas, Autómatas,
Serafines), one confirms the table (Intendentes), and one is neither: the
first Alchemist branch is **Menestrales**, a name the archive had in no
version. The manual itself slips once — the structure says *Rama A:
Menestrales* and the next paragraph says *"la Rama de los Artesanos"* — but
the structural listing is where it is defined, and a second occurrence
elsewhere in the manual confirms it.

**A house pair was inverted.** The archive had Erudites as B.1 Thaumaturges,
B.2 Hierophants; the manual has B.1 Hierofantes, B.2 Taumaturgos.

**And two blocks were duplicates.** The units-of-activity table carried Dark
Council and Lunar Coven, which `PRO-019` rosters; the membership table carried
the six ranks, which `STD-003` develops with permissions and plated rules.

## 2. Decision

**The game manual is the authority on the world's vocabulary.** Where the
archive and `lore/game/` disagree on the name of a guild, branch, house,
faction or unit of the world, the manual's name is correct and the archive is
corrected — not the other way round. The archive records the world; it does
not rename it.

The five divergences are resolved accordingly:

| Archive had | Now |
|---|---|
| Artisans · Handcrafters | **Artificers** |
| Project designers · Draftsmen | **Project designers** |
| Automata · Automatons | **Automata** |
| Seraphim · Seraphs | **Seraphim** |
| Stewards · Intendants | **Intendants** |

*Menestral* is a trade craftsman in the guild sense, not a minstrel;
**Artificers** carries that meaning in English, where *Minstrels* would carry
the wrong one. The house pair of the Erudites is reordered to the manual's
B.1 Hierophants, B.2 Thaumaturges.

**`CAN-004` keeps the structure and loses the dictionary.** It states the seven
things it fixes, the guild hierarchy with each branch and house described as
the manual describes them, and the factions with their domains. About 600
words, retitled *A guild is what you know; a faction is where you apply it*.

**The translation tables become `STD-030`, a register.** They translate; they
do not oblige — the old canon said so in its own words, and a text that binds
nobody sitting inside the canon that classifies everybody is a filing error.

**The duplicated entries are dropped**, not moved: the rituals are `PRO-019`'s
and the ranks are `STD-003`'s, both live and both more complete.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Pick the hierarchy's names, as the older list | Three of five would have been right. The manual is the source; guessing from the archive is how the divergence appeared |
| Keep recording the divergence for the Oracle | It had been recorded for months, published, and consulted by whoever implements. A recorded contradiction is an unresolved one |
| Translate *Menestrales* as *Minstrels* | Wrong sense: a *menestral* is a trade craftsman, not a musician. The manual's own gloss — "the city's creative spirits", designers and artists — settles it |
| Keep the tables in the canon | They state they carry no obligation, and they were most of the document. A register that translates is a register |
| Move the ranks into the new register | `STD-003` holds them with permissions and plated rules. A second, thinner copy is how the first one goes stale |

## 4. Consequences

- **Obliges:** whoever names something of the world to check the manual first;
  whoever cites a guild name to use the corrected one.
- **Costs:** every place that spelled a guild the old way is now wrong and must
  be found — the archive's own uses are corrected here, but any external
  material, deck or design file that used *Handcrafters*, *Draftsmen*,
  *Automatons*, *Seraphs* or *Stewards* is out of date. The canon's section
  anchors change.
- **Reversal:** if the manual is itself corrected, the archive follows it;
  this decision fixes the direction of authority, not the names.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.
