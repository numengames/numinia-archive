---
id: "ADR-062"
uid: ""
title: "The canon mould becomes a standard: STD-031, A canon states"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-24T22:00:00+02:00"
updated: "2026-09-24T22:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, standards, mould]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "The rules a canon must obey — three obligations of content, no tool, no clock, no restatement, a border only when real, no date or byline, a claim for a title, identifiers at the foot, the manual names the world — leave the decision records that held them and become STD-031, twelve plated rules STA-001..012. The canon template points at the standard instead of restating it. The 1 500-word budget stays a SHOULD: counted and reported, never enforced."
related: ["STD-031", "ADR-048", "ADR-049", "ADR-053", "STD-024", "STD-007"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-062 — The canon mould becomes a standard

> **Summary:** For a week the archive rewrote nine canons against rules that,
> by its own account, bound nobody. The rules have held; they become a
> standard.
> **Epistemic:** Why a rule in a decision record is a plan, and what changes
> when it is plated.
> **Pragmatic:** One document to write a canon against, or to refuse one
> with.
> **Audience:** Agents · Oracles

---

## 1. Context

Between 2026-09-23 and 2026-09-24 every canon of the series was rewritten
or created — `ADR-048` to `ADR-061` — against a mould stated in three
decision records: `ADR-048` (no tool, no clock), `ADR-049` (three
obligations instead of sections; a border only when real; no date or
byline; title as claim; identifiers at the foot) and `ADR-053` (the game
manual names the world). The template repeated them in an HTML comment.

`STD-024` SER-001 says what that is worth: **an obligation outside the axis
is a plan until a standard sustains it.** A decision record is not the axis.
The rules were applied nine times and could be cited zero times. The
Oracle's brief for this session named the gap as its first item; the work
was deferred, on purpose, until the rules had survived the rewrite they were
written for. They have.

The Oracle's one instruction on the standard, 2026-09-24: the word budget is
orientative, not mandatory — *but an alarm should go off*.

## 2. Decision

**`STD-031` — *A canon states* — is created at `0.1.0`**, twelve plated
rules under the prefix `STA`, binding every document in `canon/`:

| Plate | Rule | From |
|---|---|---|
| STA-001..003 | says what is so · says why · leaves the reader able to do something | `ADR-049` |
| STA-004 | obligations, not sections | `ADR-049` |
| STA-005 | the title is a claim | `ADR-049`, the template's title note |
| STA-006, 007 | no tool · no clock | `ADR-048`, carried by `ADR-049` |
| STA-008 | no restatement | `ADR-048` |
| STA-009 | a border only when real | `ADR-049` |
| STA-010 | no date, no byline in the body | `ADR-049` |
| STA-011 | identifiers at the foot | `ADR-049`, `STD-007` DOC-008 |
| STA-012 | the manual names the world | `ADR-053` |

Nothing is decided anew: each rule is the rule as ratified, restated as one
sentence with one RFC 2119 verb. The decision records stay as the reasoning;
the standard is what binds.

**The budget is not a plate.** The 1 500 words of `STD-007` DOC-006 stay a
SHOULD, counted and reported by the shape guard and never handed to the
regime — the alarm the Oracle asked for, and no gate. The standard names it
in its Check table so a reader finds the figure there.

**The Check table is honest.** Ten of the twelve are `[MANUAL]`: whether a
text states, reasons and enables is read, not parsed. Two have an
instrument that catches the crude cases (a section cited by number; the
titles side by side in the rule index). The guards gain nothing today.

**The template points at the standard.** The HTML comment in
`CAN-TEMPLATE.md` no longer restates the rules; it names `STD-031`, keeps
the three admission questions and the advice on holding the pen, and adds
the one thing the week taught: read it aloud.

**`STD-001`** gains no row — `STD-031` is a standard, and the canon row
already names the budget and the mould.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Leave the rules in the ADRs and the template | Applied nine times, citable never. The next author who breaks one has nothing to be shown |
| Plate the budget as a MUST | The Oracle: orientative, with an alarm. A canon that argues one thing in 1 600 words is not in breach; DOC-006 already reports it |
| Fold the rules into `STD-007` | That standard binds every series; these bind one. Twelve canon-only plates in a corpus-wide form standard would be read past by everyone they do not concern |
| Write the standard before the rewrite | It would have plated rules nobody had tried. Two of `ADR-048`'s were narrowed within a day (`ADR-049`) |
| Keep the template's long comment as well | Two copies of the rules is how the first one drifts. The comment now says where the rules are and how to hold the pen |

## 4. Consequences

- **Obliges:** every canon, to twelve rules it already obeys. The change is
  that a breach can now be named.
- **Costs:** one more standard (30); the template comment shrinks.
- **Follow-up:** the guards may learn the crude cases of STA-006 and
  STA-007 (a year, a vendor name) when someone finds it worth an instrument.
- **Reversal:** withdraw the standard; the decision records still hold the
  reasoning.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.
