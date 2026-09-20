---
# Copy this file to canon/CAN-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: CAN-NNN-slug.md, three digits, kebab-case.
# READ THE THRESHOLD NOTE AT THE END BEFORE YOU START.
id: "CAN-NNN"
uid: ""
title: "What the system IS — stated, not described"
type: seminal
# status: opens at draft — the lifecycle is declared once, in STD-016
status: draft
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [canon, seminal]
license: "CC0-1.0"
# canon sits at the governed threshold: it changes by an ADR or an approved PR
threshold: governed
# OPTIONAL — use when they apply, omit without guilt.
# ratified_by: "ADR-NNN"            # the decision that sealed this text
# supersedes_version: "1.2.0"
# lore: true                        # narrative canon rather than structural
# former_id: "CAN-NNN"              # if renumbered — the old identifier never frees
# former_id_note: "why the identifier changed"
# related: ["STD-NNN"]
---

# CAN-NNN — What the system IS

> **Summary:** One sentence. WHAT this foundational text defines the system to be.
> **Epistemic:** What you learn about Numinia and Numen Games by reading it.
> **Pragmatic:** What must be consulted before asserting anything in this area.
> **Audience:** Agents · Oracles

<!-- Title: state the definition, not the theme. "The archive is the company's
     memory" — not "About the archive". -->

---

## 1. The definition

What this document establishes to be true, in the present indicative. Canon
does not argue and does not plan: it states.

If a sentence here could be falsified by a decision, it belongs in a decision.
If it could be executed, it belongs in a mission. What remains is canon.

---

## 2. The governing principle

The single principle the rest of the corpus derives from this text, written so
it can be quoted alone and applied to a case this document never imagined.

A canon document that yields no applicable principle is a description, and
descriptions belong in `system/`.

---

## 3. What follows from it

The obligations this canon creates on everything downstream — which standards
must conform, which decisions it forecloses.

Name them by subject in prose. Structural relations belong in frontmatter,
where a guard can verify them.

---

## 4. What this canon does NOT define

The border. Name the adjacent questions a reader will assume are settled here
and are not, and where they are settled instead.

Canon is the text most likely to be stretched, because it is the text with the
most authority and the least detail. This section is the limit.

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

THRESHOLD: sealed. Creating or changing a canon document takes the Oracle's
signature and a decision record that ratifies it (`ratified_by`). A pull
request that edits canon/ without one is refused on principle, not on review.

Canon is not history and not a plan. It says what the system IS, in the
present tense. The moment it starts saying what the system WILL be, it has
become a blueprint and should be moved to blueprints/.

Length: a canon text that needs sections beyond these four is probably two
canon texts, or one canon text and a standard.
-->
