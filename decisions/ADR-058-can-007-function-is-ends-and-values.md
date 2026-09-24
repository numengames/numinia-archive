---
id: "ADR-058"
uid: ""
title: "CAN-007 says what function is: a frame of ends and values"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-24T14:00:00+02:00"
updated: "2026-09-24T14:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, function, structure]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-007 gains one section, at 2.1.0: function is a frame of ends and values, answering two questions of any element — what is it for, what is it worth — and interpreting meaning is asking those two questions. The hammer and the microscope, the dependency reading of function, and the test of a functional intervention move here from the canon of roles and the long role-structure text, so that function has one owner."
related: ["CAN-007", "CAN-004", "ADR-051", "ADR-057"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-058 — CAN-007 says what function is

> **Summary:** The canon of function and structure defined structure and
> used function without saying what it was. Now it says.
> **Epistemic:** The Oracle's note on the canon: function is not renaming,
> redefining or reinterpreting; it is a frame of finalities and values, and
> interpreting meaning is asking what a thing is for and what it is worth.
> **Pragmatic:** One canon owns the concept; the canon of roles states the
> distinction in two sentences and points here.
> **Audience:** Agents · Oracles

---

## 1. Context

`CAN-007` 2.0.0 (`ADR-051`) laid the argument out as it is made: two planes,
the operator that acts on each, three transversal elements, why experience
is not paradigm, why function comes first. It defined structure in a
paragraph — *the plane of relationships between the elements* — and defined
function by extension: *roles, areas, tasks, incentives, dynamics… what is
each element, and what does it do?*

That is a list of what sits on the plane, not what the plane is. The
Oracle's review of 2026-09-23 named the gap: **function is not just an
operation of renaming, redefining or reinterpreting; it is a frame of
finalities, of teleological and axiological aspects. It answers two
questions — what is the finality of something, what is the value of
something — and to interpret meaning is to ask those two questions.**

The missing text existed. The long role-structure text develops function
over four paragraphs — not instrumentalisation or utilitarianism but the
teleological and axiological planes of an entity; Hjelmslev's function as
dependency; the hammer and the microscope; *to believe that structure is
prior to function is like believing that birds fly because some animals
developed wings and then had to see what to do with them*. The condensation
into the canon of roles had kept the hammer and dropped the argument, and
`ADR-057`, absorbing that canon into `CAN-004`, left function there in two
sentences and named this canon as its owner. The owner had nothing to own.

## 2. Decision

**`CAN-007` moves to `2.1.0`** with one new section, *Function is a frame of
ends and values*, between the two planes and the two operators — where
function is first used and before the Interpreter is said to act on it.

It states four things:

- Function is not renaming, redefining or reinterpreting. It is the answer to
  two questions asked of anything: *what is it for?* and *what is it worth?*
  To interpret the meaning of an element is to ask those two questions; to
  rename it without asking them is to have interpreted nothing.
- Function is not utility. A use is a fact about the object; a function is a
  relation between the object, a need and a value. The hammer and the
  microscope carry this — and here the microscope drives the nail, which is
  the point the two former statements of the image never reached.
- Function already reaches into structure: to say what a thing is for is to
  say what it presupposes and what depends on it, and dependency is what
  structure is made of. This is the deeper reason the planes cannot be
  dissociated. What comes first is the need, not the element or the relation
  — the birds and the wings.
- The test of a functional intervention: not whether an element has a new
  name, but whether the two questions have been answered for it. *A guild
  that cannot say what it is for is a department in costume. A mission that
  cannot say what it is worth is a ticket.*

The card's Pragmatic line adds the two questions before the one it already
asked. The body grows from 1 028 to 1 366 words, under the 1 500 budget.
Hjelmslev is not named: the canon states what function is, and the source
text remains where the scholarship is cited.

Nothing else in the canon changes. The `related:` line already names the
canon of roles, which already names this one as the owner of function.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Add the two questions to the existing paragraph on function | The paragraph is a list of what sits on the plane; the two questions are a definition of the plane. Folded in, the definition reads as one more item |
| Develop function in `CAN-004`, where the hammer had lived | `ADR-057` chose the opposite: the canon of roles *uses* function and this one is *about* it. Two developments is how the first one went missing |
| Quote Hjelmslev, as the source text does | A canon states what is; the scholarship is one step away in the long text and would make the section read as an essay's footnote |
| Rewrite the whole canon at 3.0.0 | No claim is reversed or removed. One section added is a minor by VER-022 |

## 4. Consequences

- **Obliges:** whoever designs, renames or reorganises — the same line — now
  has a test to pass: the two questions answered for each element touched.
- **Costs:** none outside the document. No web change; the page re-renders.
- **Reversal:** the section is self-contained; git holds 2.0.0.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.
