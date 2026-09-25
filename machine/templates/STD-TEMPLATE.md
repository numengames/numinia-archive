---
# Copy this file to standards/STD-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: STD-NNN-slug.md, three digits, kebab-case.
id: "STD-NNN"
uid: ""
title: "The rule, in five words"
type: documentation
# subtype: standard — a norm, read whole · register — a table, consulted
subtype: standard
# status: opens at draft — the lifecycle is declared once, in STD-016
status: draft
# every artifact starts at 0.1.0; only the Oracle promotes to 1.0.0
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
license: "CC0-1.0"
tags: [area, subject]

# OPTIONAL — use when they apply, omit without guilt.
# ratified_by: "ADR-NNN"            # the decision that moved this from draft to active
# supersedes_version: "1.2.0"
# series_change: "what this changes about the series itself"
---

# The rule, in five words

> **Summary:** Two to three lines. WHAT this standard requires, as a
> reader would repeat it.
>
> **Epistemic:** Two to three lines. What you understand after reading it
> that you did not before.
>
> **Pragmatic:** Two to three lines. What you can do, or check, once you
> have read it.

**Binds:** the series, folders or kinds it obliges — never "the repository".
**Does not bind:** the nearest thing it does not oblige.

---

## Rules

<!-- Rules first, reasons later. One obligation per rule, one RFC 2119
     verb, at most 35 words. Each rule carries a plate: three letters
     three digits, unique across the corpus, never reused, never renamed.
     A plate names the rule, not its position — it survives any cut. -->

**XXX-001 — The rule, as a title.** The obligation must be stated in one
sentence a reader can obey without opening another document.

**XXX-002 — The next rule.** What it requires.

## Check

<!-- Every plate, and what verifies it: a script under machine/scripts/, a CI
     step, a platform setting — or `manual`, said plainly. -->

| Rule | Verified by |
|---|---|
| XXX-001 | `check-something.mjs` |
| XXX-002 | manual |

## Why

<!-- At most 80 words. The one thing that would go wrong without this
     standard. Longer reasoning is a decision record. -->

## References

<!-- Only documents this one depends on to oblige. At most five rows.
     Cite plates, never sections. -->

| ID | Name | Why cited |
|---|---|---|
| `STD-007` | One page per document | the shape this file takes |

<!-- Body budget: 500 words from the scope line to References. It is a
     should — over it, write one sentence here saying why. A register
     (subtype: register) is a Summary, a table and at most one sentence;
     it has no card and no budget. No changelog: git is the history. -->
