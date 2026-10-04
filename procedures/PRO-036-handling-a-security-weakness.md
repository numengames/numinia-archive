---
id: "PRO-036"
uid: ""
title: "Handling a security weakness"
type: procedure
status: draft
version: "0.1.0"
created: "2026-10-04T10:40:00+02:00"
updated: "2026-10-04T10:40:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedures, security, secrets, vulnerability, incident]
license: "CC0-1.0"
applies_to: [oracles, all-agents]
related: ["STD-022", "PRO-025", "PRO-011", "PRO-034", "PRO-005"]
derived_from: "PRI-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-036 — Handling a security weakness

> **Summary:** What to do from the moment a weakness comes to light — a key
> or password exposed, or a flaw someone reports — until it is closed and
> may be written about.
> **Epistemic:** What do we do when a weakness that can still be used comes to light?
> **Pragmatic:** Make it useless first, answer the finder in time, and write
> it down only once it no longer works.
> **Audience:** Oracles · Agents

**Binds:** whoever learns of a weakness in a repository or a site of ours,
and the Oracle who holds the keys it touches.

---

## 1. Purpose and trigger

A weakness that still works is dangerous in proportion to how many people
know of it. Every record we write about it — an issue, a commit, a report,
a chat — adds readers. So the order matters more than the speed: first the
weakness stops working, then it is written down.

It starts when anyone — person, agent, the secret scan in CI, or an outside
finder through the private channel that `SECURITY.md` names — learns of a
key, token or password that has been exposed, or of a flaw that lets
someone do what they should not.

The **finder** tells the Oracle privately; the **Oracle** changes the key
or approves the fix; an agent may prepare everything and never publishes.

---

## 2. Preconditions

- A private channel to the Oracle. The weakness is never described in an
  open issue, a commit message or a public channel while it works.
- Access, or someone with access, to the service that issued the key.

---

## 3. Procedure

1. **Tell the Oracle now, privately,** with what you found and where. If it
   came from outside, note the date it arrived: the answer clock starts then.
2. **Make it useless before anything is written.** An exposed key, token or
   password is revoked and replaced at the service that issued it, and the
   new one goes where the program reads its settings, never into the
   repository. Only then may the exposure be written down anywhere, so the
   record never points to a key that still works (OWASP Secrets Management
   Cheat Sheet, rotation and incident response). Deleting the file is not
   enough: history keeps it.
3. **Answer the finder within seven days,** through the channel they used:
   that the report arrived, who is handling it, and when to expect more.
   The best practices badge of the Open Source Security Foundation allows
   fourteen; `SECURITY.md` promises seven.
4. **If personal data could have been reached,** start `PRO-025` now: its
   72 hours count from step 1.
5. **Fix the cause** through its own pull request, with a test where the
   cause was code, and keep the description free of anything that still
   works.
6. **Publish only when it is closed.** Once the key is changed and the fix
   is merged, the weakness may be written up — in a security advisory if it
   came from outside, crediting the finder if they wish.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 2 | The service shows the old key revoked, dated before the first written mention |
| 3 | The answer to the finder, dated within seven days of their report |
| 5 | The merged pull request, with its test |
| 6 | The advisory or report, dated after step 5 |

---

## 5. Escalation

If the Oracle cannot be reached within a day and the key is live, whoever
can revoke it does, and tells every Oracle what was done (`PRO-005`). A
weakness in another organisation's code is reported to them privately and
never fixed by us.

---

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-022` | Secrets | what keeps a secret out, and the private channel |
| `PRO-025` | Handling a personal data breach | when personal data could have been reached |
| `PRO-005` | Escalating to the Oracle | when no Oracle answers |
