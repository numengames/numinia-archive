---
# Copy this file to protocols/PRO-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: PRO-NNN-slug.md, three digits, kebab-case.
id: "PRO-NNN"
uid: ""
title: "The procedure, named by what it makes repeatable"
type: protocol
# status: opens at draft — the lifecycle is declared once, in STD-016
status: draft
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
tags: [protocol]
license: "CC0-1.0"
# who must execute this: all-agents, a guild, a role, or named agents
applies_to: [all-agents]

# OPTIONAL — use when they apply, omit without guilt.
# mandatory: true                   # execution is not discretionary
# ratified_by: "ADR-NNN"            # the decision that made this binding
# supersedes_version: "1.2.0"       # the version of THIS protocol replaced
# review_next: "YYYY-MM-DD"         # when this procedure is due for re-reading
# guild: "Sentinels"
# territory: "Archive"
# related: ["STD-NNN"]
---

# PRO-NNN — The procedure

> **Summary:** One sentence. WHAT situation this protocol removes the ambiguity from.
> **Epistemic:** What the actor must know before executing.
> **Pragmatic:** The ordered steps, and how to verify they ran.
> **Audience:** Agents

<!-- Title: name the repeated situation, not the department. "Closing a
     mission" — not "Mission management". -->

---

## 1. Purpose and trigger

What this protocol exists to make repeatable, and the exact event that starts
it. A protocol with no trigger is a description of good intentions.

State who executes it (`applies_to` in the frontmatter is the machine-readable
half; name the actor here in prose).

---

## 2. Preconditions

What must already be true before step 1. Access, state, artefacts, approvals.

An actor who reaches step 3 and discovers a missing precondition will improvise
— and the improvisation, not this document, becomes the real procedure.

---

## 3. Procedure

Numbered, imperative, one action per step. A step that contains "and" is two
steps.

1. **Do the thing.** The command, the file, the exact object.
2. **Do the next thing.** What its output should look like.
3. **Do the last thing.**

> **Protocols are never edited in place.** A change of substance is a new
> version, with `supersedes_version` naming the one it replaces. Editing a
> procedure under the actors who follow it is how two agents come to execute
> two different protocols with the same identifier.

---

## 4. Verification

How the executor proves the procedure ran — not that they believe it ran.

| Step | Evidence it completed |
|---|---|
| 1 | The command's exit code, the file's existence, the guard that passes |

A protocol whose completion cannot be shown is an instruction, not a protocol.

---

## 5. Escalation

What to do when a step fails or a precondition is absent. Name the actor to
escalate to, and what to hand them.

The default is never "improvise": it is stop, record what was observed, and
escalate to the owner.

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

Sections 1-5 are required. A protocol without §4 Verification is the failure
this template exists to prevent: it produces confident actors and no evidence.

Length: if the procedure needs more than a dozen steps, the real object is
probably two protocols with a handover between them.

Write self-contained steps. A step that says "as described in PRO-0XX §3"
breaks the day that document is rewritten. State what you depend on.
-->
