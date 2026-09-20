---
# Copy this file to system/SYS-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: SYS-NNN-slug.md, three digits, kebab-case.
id: "SYS-NNN"
uid: ""
title: "The component, described as it is wired today"
type: documentation
subtype: reference
# status: opens at draft — the lifecycle is declared once, in STD-016
status: active
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
tags: [system, reference]
territory: "Archive"
license: "CC0-1.0"

# OPTIONAL — use when they apply, omit without guilt.
# mission: "MIS-NNNN"               # the mission that produced this reference
# accuracy_warning: "which sections are known stale, and since when"
# former_id: "SYS-NNN"              # if reshelved — the old identifier never frees
# former_id_note: "why the identifier changed"
# extraction_note: "where this text came from, if it was extracted"
# guild: "Sentinels"
# related: ["BLU-NNN"]
---

# SYS-NNN — The component

> **Summary:** One sentence. WHAT part of the live system this documents.
> **Epistemic:** How it works as wired today — components, flows, boundaries.
> **Pragmatic:** Use to onboard, audit, or plan a change to it.
> **Audience:** Agents · Oracles

<!-- Title: name the component and its state. "The deploy pipeline as it runs
     today" — not "Deployment". -->

> **A system document is a reference manual, not a plan.** It describes what
> exists. What could exist belongs in `blueprints/`; what must be built
> belongs in a mission.

---

## 1. Scope

Which part of the system this covers, and which adjacent parts it does not.

A reference whose scope is "the platform" will be read as authoritative about
whatever the reader was looking for, including the half it never examined.

---

## 2. How it works

The description. Components, their responsibilities, the flow between them,
and where each one lives — file paths, services, endpoints.

Concrete enough to act on: an agent should be able to find the code from this
document, not merely recognise it afterwards.

---

## 3. How to verify it

The commands that prove the description is still true — the build, the guard,
the health check, the query.

```
$ the command
what a healthy result looks like
```

This is what separates a reference from a memory. Without §3 the document
degrades silently and nobody can tell when it stopped being true.

---

## 4. Accuracy

What is known to be stale, incomplete, or unverified in this description, and
since when.

**Verified against:** `<sha>` or the environment, on YYYY-MM-DD.

An honest accuracy section is the price of being trusted at all. If the whole
document is current, say that, dated.

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

`accuracy_warning` in the frontmatter is for a document reshelved or restored
whose content was knowingly NOT brought up to date. Do not use it to excuse a
new document from being correct.

system/ has no route of its own on the web: these documents surface through
the corpus mirror. That is deliberate — a reference is read by the people
maintaining the system, not by visitors.

Sections 1-4 are required. §3 and §4 are the two that decay first; write them
so the decay is visible.
-->
