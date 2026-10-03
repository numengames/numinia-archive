---
id: "PRO-025"
uid: ""
title: "Handling a personal data breach"
type: procedure
status: draft
version: "0.1.3"
created: "2026-09-27T19:50:00+02:00"
updated: "2026-10-03T21:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "Legal and compliance"
tags: [procedure, personal-data, breach, gdpr]
license: "CC0-1.0"
applies_to: [oracles, all-agents]
related: ["STD-035", "STD-022", "LEG-001", "PRO-005", "PRO-024"]
derived_from: "PRI-012"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-025 — Handling a personal data breach

> **Summary:** What to do from the moment someone suspects that personal
> data we hold was seen, lost, changed or taken by someone who should not
> have it, until the authority and the people affected are told.
> **Epistemic:** What do we do in the 72 hours after data about a person leaks?
> **Pragmatic:** Stop the leak, judge the risk, notify on time, and keep the
> record an inspector will ask for.
> **Audience:** Oracles · Agents

**Binds:** whoever learns of a possible breach of personal data we hold,
and the Oracle who decides the notice.

---

## 1. Purpose and trigger

The law gives 72 hours from the moment we know of a breach to tell the
Spanish data protection authority (`STD-035`, a breach is reported within
three days). The clock starts when anyone of the house knows, not when the
Oracle reads the message. This procedure makes those hours count.

It starts when anyone — person, agent or an outside report — has reason to
believe that personal data we hold was exposed, lost, altered or reached by
someone without the right to it: a leaked list, a key in a public commit, a
misdirected email, a lost laptop, a provider telling us it was breached.

The **finder** reports at once; the **Oracle** decides and sends the
notices. An agent may prepare every document, never send a notice.

---

## 2. Preconditions

- The contact of the data protection authority at hand: the notice is filed
  at the AEPD's electronic office (`sedeagpd.gob.es`).
- The record of what we do with data (`STD-035`), to know whose data it is
  and why we hold it. If it is missing, say so in the notice.
- A private channel to the Oracle. The breach is never discussed in an open
  issue, a commit or a public channel.

---

## 3. Procedure

1. **Report it to the Oracle now,** privately, with what you saw and when
   you saw it. Write down that time: the 72 hours count from it.
2. **Stop the leak.** Close the access, take the file down, revoke and
   change any key involved before writing the key anywhere (`STD-022`).
   Do not delete evidence of what happened.
3. **Write the facts down.** What data, whose, how many people, how it
   happened, since when, and what step 2 did. Keep it outside this
   repository: it names people.
4. **Judge the risk to the people.** Ask what someone could do to them with
   this data: identity documents, bank details, health, passwords or
   anything about a minor are high risk; a list of public usernames is low.
5. **Decide the notice to the authority.** The Oracle notifies the AEPD
   within 72 hours of step 1, unless the breach is unlikely to put anyone
   at risk. If some facts are still missing at 72 hours, notify with what
   is known and complete it later.
6. **Tell the people when the risk is high.** In plain words: what
   happened, what data, what we have done, what they can do, and whom to
   write to (`legal@numengames.com`).
7. **Record it, notified or not.** Every breach goes in the breach log
   kept with the record of what we do with data: the facts, the risk
   judged, the decision and why. A breach not notified still needs its
   reason written.
8. **Fix the cause.** The change that stops it happening again goes
   through its own pull request, with a test where the cause was code.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | The time the Oracle was told, written in the breach log |
| 5 | The AEPD's receipt, dated within 72 hours of step 1, or the written reason for not notifying |
| 6 | The message sent to the people affected, when the risk was high |
| 7 | The entry in the breach log |

---

## 5. Escalation

If the Oracle cannot be reached within a day, whoever holds the facts keeps
going with steps 2 and 3 and tries every Oracle. A breach at a provider who
handles data for us is reported to us by them; we still notify. When it is
unclear whether the risk is high, treat it as high and get legal advice
before the 72 hours end, not after.
