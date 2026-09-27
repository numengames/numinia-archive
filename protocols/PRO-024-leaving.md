---
id: "PRO-024"
uid: ""
title: "Leaving Numinia"
type: protocol
status: draft
version: "0.1.0"
created: "2026-09-27T19:40:00+02:00"
updated: "2026-09-27T19:40:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, offboarding, people, lifecycle]
license: "CC0-1.0"
applies_to: [oracles, all-agents]
related: ["PRO-015", "PRO-019", "STD-035", "STD-022", "STD-010"]
derived_from: "CAN-001"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-024 — Leaving Numinia

> **Summary:** How a person who worked with Numen Games leaves: the plan,
> the handover, the access closed, the accounts settled and the goodbye.
> **Epistemic:** What must be true before someone is gone?
> **Pragmatic:** Let a person go without losing their work, leaving a door
> open behind them, or losing them as a friend of the house.
> **Audience:** Oracles · Agents

**Binds:** whoever lets a person go from Numinia, whoever is leaving, and
whoever takes over their work.

---

## 1. Purpose and trigger

When a person leaves, three things can go wrong: their work stops with
them, an access nobody remembers stays open, or they leave badly. This
protocol closes all three, in the order that protects the work first.

It starts when a departure is agreed or announced: a resignation, the end
of a freelance service, or an ending the Oracle decides. The **Oracle**
owns every step; the **person** leaving writes the handover; an agent may
check the access list, never revoke on its own.

---

## 2. Preconditions

- The last working day, agreed.
- The person's access list, opened when they joined (`PRO-015` step 3).
  Without one, the first step is to rebuild it from each system's member
  list before anything is revoked.
- Their agreement at hand: notice, what is owed, and who owns what they
  made.

---

## 3. Procedure

1. **Agree the plan.** The last day, the handover window before it, and
   what is owed on each side. Tell the person first, then the team.
2. **Write the handover.** The person lists their open work: state, next
   step, whom it waits on, and where every artefact lives. Anything not in
   a repository or a shared drive moves there now.
3. **Reassign ownership.** Every piece of open work, every repository or
   board they owned, and every review they were due, gets a named new
   owner before the last day.
4. **Close the access, on the last day.** Revoke every entry on the access
   list, and write the date beside each.
5. **Change every secret they could see.** Rotate each key or token they
   held or could read (`STD-022`); a person leaving is an exposure even
   when nothing leaked.
6. **Settle the accounts.** Final pay or invoice; equipment returned; the
   work they made confirmed as the house's under their agreement.
7. **Close their personal data.** What the house no longer needs is
   blocked, then erased, as the personal data standard says (`STD-035`).
   If they ask for a copy of theirs, give it.
8. **Say goodbye.** A last conversation with the Oracle: why they leave,
   what worked, what did not. If they want, a farewell at the next ritual
   (`PRO-019`); they stay a friend of the house.
9. **Check a month later.** Go through the systems once more for an access
   or an owner still in their name, and confirm the payments closed.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 3 | No open work, repository or board still names them as owner |
| 4 | Every entry on the access list carries a revocation date |
| 5 | Every secret they could see was rotated after their last day |
| 9 | The one-month check found nothing, or what it found was closed |

---

## 5. Escalation

If an access cannot be revoked — a provider that will not remove them, an
account only they control — stop and bring it to the Oracle that day; do
not wait for the one-month check. A disagreement over what is owed, or who
owns what they made, is the Oracle's, with legal advice; the rest of the
steps continue.
