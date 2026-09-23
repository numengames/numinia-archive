---
id: "ADR-056"
uid: ""
title: "CAN-008 keeps the direction and gives up the values it promised not to hold"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T23:00:00+02:00"
updated: "2026-09-23T23:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, design, tokens, drift]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-008 states the direction and holds no value: the Velo token table, the motion curve, the 3D budgets and the pixel measurements move to STD-023, and the pixel index and the surface map are dropped because each blueprint already owns its surface. The canon stops contradicting its own closing promise."
related: ["CAN-008", "STD-023", "ADR-044", "ADR-049"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-056 — CAN-008 keeps the direction and gives up the values

> **Summary:** The visual canon promised to quote no value and quoted ten;
> they move to the register that guards them.
> **Epistemic:** A document that declares a rule about itself and breaks it in
> the same file teaches the breach, not the rule.
> **Pragmatic:** One page for what was decided and why; one register for every
> number a builder types.
> **Audience:** Agents · Oracles

---

## 1. Context

`CAN-008` closes with an explicit promise:

> *It does not give a single hex, size, curve or class name: every value is in
> the kit and the register `STD-023` … and a value quoted here would drift
> (`ADR-044`).*

The same document contains seven `rgba` values, a `cubic-bezier` curve, two
`blur` radii, a 40 px cell and a triangle budget — ten concrete values in all,
most of them in a complete token table with value, origin and role, which is
precisely the shape `STD-023` exists to hold.

Measured on v1.1.1:

| | |
|---|---|
| body words | 4 111 — against a canon budget of 1 500 |
| concrete values, having promised none | 10 |
| headings, to four levels | 21 |
| blocks that are indexes of other documents | 2 |

**The indexes are the bulk.** §3.3 says of itself *"this block is an index,
not a duplicate"* and lists nine bullets pointing at `BLU-010`, `STD-023` and
`BLU-009`. §3.4 is a surface map routing ten surfaces to seven blueprints —
and those seven blueprints exist, one per surface, each already stating what
it governs.

**And the drift has already started.** A token table living outside the
register that guards it is a second copy; `ADR-044` named that risk and this
canon then reproduced it, in the document that warned against it.

## 2. Decision

`CAN-008` moves to `2.0.0`, retitled *One identity, four registers*, and holds
**no value at all**: no hex, no size, no curve, no budget, no class name.
About 1 425 words, within budget.

**The values move to `STD-023` (`1.2.0`)**, which is where a guard reads them:
a new *Velo layer* section carrying the seven tokens with their ceilings and
placement rules, and a *Motion and 3D budgets* section carrying the default
curve, the low-poly triangle budgets and the small-sprite outline rule. The
`[EXTENSION — validate]` and `[DERIVED]` marks travel with them unchanged —
they are the register's business, not the canon's.

**The two indexes are dropped, not moved.** The pixel register's nine bullets
each pointed at a document that already holds the rule; the surface map
pointed at seven blueprints that each already declare their surface. What
survives in the canon is what the indexes were pointing *around*: that the
pixel is a rendering register and not a theme, that you enter and leave it
completely, that it lives in the night, and what it is and is not for.

**What is kept is everything that decides:** the values translated into design
obligations, the 40/40/20 dosage with the squint test, the hundred-years line
and the era as flavour rather than skin, the four registers with what each is
for and the fusion rule, the brand architecture, the hard border between
signature and play, and the voice with its three levels.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Delete the closing promise and keep the values | Backwards: the promise is right and `ADR-044` already ruled why. The values were the error |
| Keep the Velo table because it is a new register | Newness is not a filing category. A table of tokens is a table of tokens |
| Keep the surface map as navigation | Seven blueprints each declare their own surface; a central index is a second thing to update, and it was already qualifying a standard's rule from inside a canon |
| Split the canon into canon and a design-direction register | The direction *is* canon — it is what may not be redesigned in a piece. What was not canon were the numbers and the indexes |

## 4. Consequences

- **Obliges:** whoever writes a design decision to put the reasoning in the
  canon and the number in the register; whoever looks for a surface's rules to
  open its blueprint.
- **Costs:** the largest canon loses roughly two thirds of its length and all
  of its section anchors; a reader who used the surface map as a table of
  contents now navigates the blueprints. `STD-023` grows by two sections.
- **Reversal:** none foreseen. If the surface map proves genuinely needed, it
  belongs in a register that lists blueprints, not in canon.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.
