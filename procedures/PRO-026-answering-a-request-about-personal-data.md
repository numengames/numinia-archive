---
id: "PRO-026"
uid: ""
title: "Answering a person's request about their data"
type: procedure
status: draft
version: "0.1.3"
created: "2026-09-27T19:50:00+02:00"
updated: "2026-10-03T21:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "Legal and compliance"
tags: [procedure, personal-data, rights, gdpr]
license: "CC0-1.0"
applies_to: [oracles, all-agents]
related: ["STD-035", "LEG-001", "PRO-024"]
derived_from: "PRI-012"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-026 — Answering a person's request about their data

> **Summary:** What to do when someone asks to see, correct, erase, limit,
> take away or stop the use of the data we hold about them.
> **Epistemic:** When someone asks for their data, what do we do, and by when?
> **Pragmatic:** Answer within a month, only to the right person, with
> everything we hold and nothing we should not show.
> **Audience:** Oracles · Agents

**Binds:** whoever receives or answers a request from a person about the
data we hold on them.

---

## 1. Purpose and trigger

What we hold about a person is theirs, lent to us (`STD-035`, the person is
in charge of it). The privacy policy (`LEG-001`) promises they can see it,
correct it, have it erased, limit its use, take it away and object to it,
and get an answer within one month. This procedure keeps that promise.

It starts when a request reaches us by any way — usually an email to
`legal@numengames.com` — in which a person asks for any of those rights,
whatever words they use. The **Oracle** answers; an agent may search the
systems and draft the reply.

---

## 2. Preconditions

- The request, with the date it arrived: the month counts from it.
- The record of what we do with data (`STD-035`): the list of places where
  a person's data may be. Without it, step 3 searches every system we use.
- A channel to reply to the person from the address they wrote from.

---

## 3. Procedure

1. **Acknowledge it within a week,** saying the date by which they will
   have the answer: one month from arrival.
2. **Confirm it is them.** Ask for proof only when there is real doubt,
   and only as much as needed; a request from the email we already hold
   for them is usually enough. Never send data to an address we cannot tie
   to them.
3. **Find everything we hold.** Search every place on the record: the
   sites' accounts, payments, the community server, mailing lists,
   shared drives, providers. Note each place and what was there.
4. **Do what they asked.**
   - *See or take it:* send a copy of everything found, in a common format
     they can open (a spreadsheet or a JSON file), with why we hold it and
     for how long.
   - *Correct it:* change it in every place found.
   - *Erase it:* erase it everywhere, except what the law makes us keep —
     invoices, for example — which is blocked instead and named in the
     reply.
   - *Limit or object:* stop that use, and mark it where it happens.
5. **Reply before the month ends.** Say what was found, what was done and
   what was kept and why. If the request is complex, the month may be
   extended by two more: say so, with the reason, inside the first month.
6. **Tell them they can complain** to the data protection authority
   (`aepd.es`) if they are not satisfied.
7. **Record the request:** date in, date answered, what was asked and
   done. Keep it outside this repository: it names a person.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | The acknowledgement, sent within a week |
| 3 | The list of places searched, with what each held |
| 5 | The reply, dated within the month or its written extension |
| 7 | The entry in the request log |

---

## 5. Escalation

A request that asks to erase something the law makes us keep, one from
someone acting for another person (a parent, a lawyer), or one that seems
meant to harass, goes to the Oracle before any reply. A request under
fourteen is answered through their parent or guardian (`STD-035`).
