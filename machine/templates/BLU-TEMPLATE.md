---
# Copy this file to blueprints/BLU-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: BLU-NNN-slug.md, three digits, kebab-case.
id: "BLU-NNN"
uid: ""
title: "The design — named by what it builds, not by its area"
type: blueprint
# status: opens at draft — the lifecycle is declared once, in STD-016
status: draft
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
tags: [blueprint]
territory: "Archive"
license: "CC0-1.0"
# the missions that would execute this design, or that already partly did
related_missions: []

# OPTIONAL — use when they apply, omit without guilt.
# semaforo: "green"                 # read by the archive pages
# guild: "Alchemists"
# mission: "MIS-NNNN"               # the mission that produced this design
# scope: "what the design covers"
# extraction_note: "where this text came from, if it was extracted"
# related: ["STD-NNN"]
---

# BLU-NNN — The design

> **Summary:** One sentence. WHAT this design would build, and the gap it closes.
> **Epistemic:** Which design exists for this problem, and what it attacks.
> **Pragmatic:** Consult before designing anything in this area.
> **Audience:** Agents · Oracles

<!-- Title: name what gets built. "One template per series, in one folder" —
     not "Template improvements". -->

> **A blueprint is a design not yet executed.** It is not a decision, not a
> mission, and not a description of what exists. If it has been built, its
> description belongs in `system/`; if it must be built, the work belongs in a
> mission that cites this design.

---

## 1. Current state

What exists today, measured. The starting point a reader can verify without
trusting this document.

Dated, because a blueprint outlives the state it was drawn against, and the
day the current state stops matching this section is the day the design needs
re-reading.

---

## 2. Future state

The design. What the system looks like when this is built — structure,
components, boundaries.

Concrete enough that two agents reading it would build the same thing. A
future state written as an adjective ("cleaner", "more coherent") is a mood.

---

## 3. The gap

What stands between §1 and §2: the work, the unknowns, the dependencies.

| Gap | What closes it |
|---|---|
| What is missing today | The mission, decision, or artefact that would supply it |

---

## 4. Cost and risk

What building this costs, and what it puts at risk. Both halves are required:
a design with no stated cost was drawn by its own advocate.

State the cheaper alternative that was rejected, and why.

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

A blueprint is a design, so it never carries acceptance criteria — those live
in the mission that executes it. If you find yourself writing checkboxes, the
document you want is a mission.

`related_missions` is how the design connects to execution. An empty list on a
blueprint older than a few weeks says either that nobody adopted it or that
somebody built it without citing it. Both are worth knowing.

Sections 1-4 are required.
-->
