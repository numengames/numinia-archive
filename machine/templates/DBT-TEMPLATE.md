---
# Copy this file to debt/DBT-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: DBT-NNN-slug.md, three digits, kebab-case.
id: "DBT-NNN"
uid: ""
title: "The defect, named — not the area it lives in"
type: documentation
# status: `active` means the debt is OPEN; the lifecycle is declared once, in STD-016
status: active
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt]
license: "CC-BY-4.0"
# severity: critical | high | medium | low — and the reason, in one line
severity: medium
severity_reason: "what the severity is measured against"
# when the defect was observed, not when this file was written
detected: "YYYY-MM-DD"
# debt/ publishes ONLY with visibility: public. Absent means invisible on the web.
visibility: "restricted-oracle"
visibility_reason: "why this entry is not public"

# OPTIONAL — use when they apply, omit without guilt.
# opened_by: "agent-id"             # who found it
# source_audit: "RPT-NNN"           # the report that surfaced it
# absorbs: ["DBT-NNN"]              # identifiers this entry inherits, kept resolving
# refuted: "YYYY-MM-DD"             # the day the claim was shown to be false
# resolved_by: "MIS-NNNN"           # what closed it
# related: ["MIS-NNNN"]
---

# DBT-NNN — The defect

> **Summary:** One sentence. WHAT is known to be missing or wrong.
> **Epistemic:** What we lose by not knowing this — the surface a reader cannot trust.
> **Pragmatic:** What closes this entry, and what evidence would prove it.
> **Audience:** Agents

<!-- Title: name the defect, not the folder. "The design system filename is
     not frozen" — not "Design system issues". -->

---

## 1. The defect

What is wrong, in one paragraph, measured. Not "documentation is incomplete"
— "37 of 150 missions carry no `completed` date, counted 2026-09-04".

State it so that someone who disagrees knows exactly what to disprove.

---

## 2. Evidence

The command, file, or observation that establishes the claim, and its output.
Dated, so a later reader knows what it was true of.

```
$ the command that measures it
the output, verbatim
```

An entry with no reproducible evidence is a suspicion. Suspicions are legitimate
— mark them `severity: low` and say in §1 that the measurement is missing.

---

## 3. Closure condition

The single sentence that, when true, closes this entry. Written as a test,
not as an intention.

> **Closes when:** the condition, stated so a guard or a human can check it
> without re-reading this document.

"Closes when the docs are improved" closes nothing. "Closes when
`node machine/guards/rules/std-004-the-header.mjs` reports zero HDR-031 findings" closes.

---

## 4. Cost of leaving it open

What this defect will cost if nothing is done — the reason it is registered
rather than fixed on the spot.

This section is what makes a debt register a priority list instead of a
complaint file.

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

`status: active` means the debt is OPEN. `closed` means the closure condition
in §3 was met — and the entry stays in the corpus, because the record of what
was wrong is the point.

`visibility` fails closed: an entry with no field, or with anything other than
`public`, does not publish on the web. Set it deliberately.

`absorbs` is load-bearing: the reference guard reads it to keep a merged
entry's original identifiers resolving. Consolidating debt without it breaks
every citation of the entries it swallowed.

Sections 1-4 are required. §2 with no output pasted into it is not evidence.
-->
