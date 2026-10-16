---
id: "MIS-195"
uid: ""
title: "Gather the engine's rules into the Summa by kind"
type: mission
status: in-progress
version: "0.1.0"
created: "2026-10-16T14:20:00Z"
updated: "2026-10-16T14:30:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [engine, principles, standards, procedures, vocabulary, summa]
license: "CC0-1.0"

priority: high
effort: XL
executor: agent
assigned_to: "ursa"
completed: null

started: "2026-10-16T14:20:00Z"
context: "2026-10-16T14:30:00Z"
requires_oracle_approval: true
paths: [principles/, standards/, procedures/, standards/STD-026-operative-vocabulary.md, standards/STD-050-what-an-agent-in-a-world-reads.md, procedures/PRO-037-placing-an-agent-in-a-3d-world.md]
related: ["ADR-073", "ADR-074", "ADR-075", "ADR-076", "ADR-077", "ADR-078", "ADR-068", "STD-012", "STD-024", "STD-026", "STD-031", "PRO-023"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-195 — Gather the engine's rules into the Summa by kind

> **Summary:** Numinia Engine is being built faster than the archive learns
> of it, and what binds its work lives only in its own repository and in a
> study folder outside git. The Oracle ruled that the source of truth is the
> Summa: what is a principle goes to `principles/`, what is a policy to
> `standards/`, what is a procedure to `procedures/`, and the engine is
> defined in the vocabulary as a product. The engine's repository then
> points at the Summa instead of holding the rules.
> **Epistemic:** Which of the engine's rules are principles, which are
> policies and which are procedures, and which existing document already
> carries each.
> **Pragmatic:** Anyone who works on the engine finds what binds them in the
> same series, mould and numbering as everything else.
> **Audience:** Agents · Oracles

---

## 1. Scope

The Oracle's ruling (chat, 2026-10-16): the Summa is the source of truth; each
engine rule goes to the series of its kind; Numinia Engine is a word of the
vocabulary, a product; and, once everything is defined, the engine gets a
book that is the set of those documents, built like every other book.

- **Routing by kind.** A rule that states why we hold a stance is a principle
  (`STD-031`). A rule that binds an actor and can be answered yes or no is a
  policy, in `standards/`. A numbered routine for a recurring task is a
  procedure. Before a new document, the existing one whose question already
  covers the rule is extended (`STD-012`, `STD-050`, `STD-034`, `STD-010`,
  `STD-015`, `PRO-016`, `PRO-037`).
- **Each rule names the engine in its scope line**, so the engine's book can
  find it; a rule that binds more than the engine does not mention it.
- **The vocabulary.** *Numinia Engine* (product) in `STD-026`.
- **Source of truth moves.** The engine repository's `AGENTS.md` keeps only
  what is about its code and cites a Summa document for each rule; it states
  none a second time (`ADR-068`).
- **What stays in the engine repository:** code, tests and what changes with
  every commit (backlog, diary, per-package READMEs). Measurements and the
  decisions already written (`ADR-073` to `ADR-078`) are cited, not copied.
- **Documents arrive draft** and move to force only by `PRO-023`; principles
  go to the Oracle in chat before their branch exists.

> **Scope and Acceptance criteria are written when the mission OPENS and are
> not edited afterwards.** What happened goes in Closure. (This text replaces
> the first draft of the mission, written the same day before the Oracle's
> ruling; nothing had been pushed.)

## Out of scope

The engine's book. It is a view over the documents (`web/src/lib/book.ts`:
chapters, parts, sections read from the files), so it is built after they are
defined, in a mission of its own. Rewriting the engine's code or tests;
deciding anything the Oracle has not (a finding that implies a decision
becomes a proposed `ADR`).

---

## 2. Acceptance criteria

- [ ] `STD-026` defines *Numinia Engine*. Today (base commit):
  `git grep -c "Numinia Engine" -- standards/STD-026-operative-vocabulary.md`
  returns nothing.
- [ ] Every rule of the engine's `AGENTS.md` that binds anyone is held by a
  `principles/`, `standards/` or `procedures/` document that names the engine
  in its scope line. Today: only `STD-050` and `PRO-037` do.
- [ ] The engine's `AGENTS.md` cites a Summa document for each such rule and
  states none a second time. Today: it states all of them.
- [ ] The study folder's findings that settle a rule are cited from the
  document they feed by repository and path. Today: the folder is in no
  repository.
- [ ] `npm run checks -- --rules` passes with the new documents.

---

## 3. Closure

*(Filled when the mission closes.)*
