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
# series_change: "one short sentence about this version only"
---

<!--
The reading — title, card, scope, every rule — is plain English a screen
reader can say aloud: no plates, no document identifiers, no file names or
paths, no web addresses, no acronym a listener would not know. MUST, SHOULD,
MAY and MUST NOT stay in capitals, as the outside norm that defines them says.
Codes, sources and checks wait in the Check table at the foot.
-->

# The rule, in five words

> **Summary:** Two to three lines. WHAT this standard requires, as a
> reader would repeat it.
> **Epistemic:** Two to three lines. What you understand after reading it
> that you did not before.
> **Pragmatic:** Two to three lines. What you can do, or check, once you
> have read it.
> **Audience:** Agents · Oracles

**Binds:** the kinds of work or people it obliges, in words.
**Does not bind:** the nearest thing it does not oblige.

## Rules

<!-- Rules first, reasons later, grouped under ### headings by purpose. Each
     rule opens with a bold title in words — no plate — and holds one
     obligation, one capitalised obligation word, ideally at most 35 words. -->

### What the first group of rules is for

**The rule, as a title.** The obligation MUST be stated in one sentence a
reader can obey without opening another document.

**The next rule.** What it requires.

## Check

Each rule, its code, its source and its check.

<!-- One row per rule. Plate: three letters, three digits, unique across the
     corpus, never renumbered, dropped or reused. Source: a link to the
     outside standard the rule follows, or —. Verified by: a guard or script,
     a CI step, a platform setting — or "by hand", said plainly. -->

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| XXX-001 | The rule, as a title | — | a guard under `machine/guards/rules/` |
| XXX-002 | The next rule | [An outside standard](https://example.org/) | by hand, at the pull request |

## Why

<!-- At most 80 words. The one thing that would go wrong without this
     standard. Longer reasoning is a decision record. -->

## References

<!-- Only documents this one depends on to oblige. At most five rows.
     Identifiers live here and in the Check table, never in the reading. -->

| ID | Name | Why cited |
|---|---|---|
| `STD-007` | One page per document | the shape this file takes |

<!-- Body budget: 500 words from the scope line to References. It is a
     SHOULD — over it, write one sentence in the document saying why. A
     register (subtype: register) is a Summary, a table and at most one
     sentence; it has no card and no budget. No changelog: git is the history. -->
