---
# Copy this file to decisions/ADR-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: ADR-NNN-slug.md, three digits, kebab-case.
id: "ADR-NNN"
uid: ""
title: "The choice, stated — not the topic"
type: adr
# status: opens at draft — the lifecycle is declared once, in STD-016
status: draft
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
# guild: Sentinels | Alchemists | Exegetes | Procurators
guild: "Alchemists"
# territory: CAO | Product | Platform | Infrastructure | Content | Sales | Funding | Archive
territory: "Archive"
tags: [decisions, adr]
license: "CC-BY-4.0"

# OPTIONAL — use when they apply, omit without guilt.
# deciders: ["oracle"]              # who ruled
# consulted: ["agent-id"]           # who was asked, and did not rule
# absorbs: ["ADR-NNN"]              # identifiers this record inherits, kept resolving
# amends: "STD-NNN"                 # a standard this narrows without superseding
# supersedes: "ADR-NNN"             # the decision this replaces
# superseded_by: "ADR-NNN"          # only on a `withdrawn` record: the decision that replaced it (GIT-045)
# related: ["MIS-NNNN"]
---

# ADR-NNN — The choice, stated

> **Summary:** One sentence. WHAT was decided.
> **Epistemic:** The reasoning that makes this the chosen path.
> **Pragmatic:** What changes because of this decision.
> **Audience:** Agents · Oracles

<!-- Title: state the choice, not the subject. "Prefixes are three letters,
     not four" — not "Prefix naming". A reader scanning the index must know
     what was ruled without opening the file. -->

---

## 1. Context

The forces that made a decision necessary: what was measured, what broke,
what two paths could not both be taken.

State the problem in numbers where numbers exist. A context section that
argues instead of describing has already made the decision, and hides it.

---

## 2. Decision

The ruling, in the imperative, in one paragraph. Then its boundary: what it
binds, and from when.

> Write the rule so it can be quoted alone. If the decision only makes sense
> read together with the context above, it is not yet a decision.

---

## 3. Alternatives considered

What else was on the table, and the reason each was not taken. One
sub-heading or one row per alternative — never a bare list.

| Alternative | Why not |
|---|---|
| The option not taken | The cost that ruled it out |

An ADR with no rejected alternative recorded a preference, not a decision.

---

## 4. Consequences

What this obliges from now on, and what it costs. Both halves are required:
a consequences section with no cost in it was written by the advocate.

- **Obliges:** what every actor must now do differently.
- **Costs:** what becomes harder, slower, or impossible.
- **Reversal:** what evidence would justify superseding this.

---

## 5. Status

Where this record stands today, and by what.

The states and what each means: `STD-016`. A withdrawn record with a
replacement names it in `superseded_by`; it is deleted once nothing living
cites it (`ADR-041`).

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

Correcting a decision means writing the next one and pointing `superseded_by`
at it, not editing what this one claimed. The withdrawn record is deleted
when nothing living cites it; git keeps what was believed, and when.

`absorbs` is load-bearing, not a note: the reference guard reads it to keep
a merged decision's original identifiers resolving. Consolidating records
without it breaks every citation of them.

Sections 1-5 are required. Sections beyond them earn their place or stay out.
-->
