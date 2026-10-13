---
id: "MIS-182"
uid: ""
title: "The till writes to whoever may pay when money runs low: below a few days at the current pace, at zero, each week a world is kept for free, twice before a deletion and before a price rises — through Amazon SES in Paris"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [payments, email, notifications, aws, pay-per-use, numinia-web]
license: "CC0-1.0"

priority: medium
effort: S
executor: hybrid
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-178", "MIS-179"]
requires_oracle_approval: true
context: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md]
related: ["ADR-070", "MIS-169", "MIS-178", "MIS-179", "MIS-184", "STD-022", "DBT-022", "DBT-026"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-182 — The till writes when money runs low

> **Summary:** A balance that ends without warning stops a client's worlds
> by surprise. The till writes to each account's billing roles when the
> balance will last less than a few days at the current pace, when it
> reaches zero, every week a world is kept for free, twice before a
> deletion and the day a price rise is scheduled. It also carries the
> invitations of `MIS-179`. Mail leaves through Amazon SES in Paris, in the
> house's own AWS account.
> **Epistemic:** Who is told what, when, and why a warning is not repeated.
> **Pragmatic:** Nobody's world stops or disappears without at least one
> mail to whoever can pay.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **Who:** the account's owners, administration and finance; for a
  personal account, its person. Members get no money mail.
- **When:**
  - *low balance:* when the balance lasts fewer days than the account's
    threshold at the current pace — 3 by default, each account chooses —
    and not again until the balance rises above it, as OpenRouter does;
  - *at zero:* the night the worlds stop;
  - *kept for free:* every week while a world waits at zero, with its
    deletion date;
  - *before a deletion:* twice, 14 and 2 days before (`DBT-026`);
  - *a price rise:* the day it is scheduled, with the date it starts and
    the notice period (`MIS-184`);
  - *invitations* (`MIS-179`).
- **What a mail says:** what happened, what to do, one link; in the
  person's language among the site's five; no card or payment data.
- **The carrier:** Amazon SES in Paris (eu-west-3), from an address of the
  house the Oracle verifies there; the access key is an Oracle's to set as
  the till's secret (`STD-022`). A mail SES refuses is retried, then
  reported to the Oracle, never dropped in silence. SES joins the
  processors the privacy policy must name (`DBT-022`).

Out of scope: mail for anything other than an account's money and its
team; marketing of any kind.

---

## 2. Acceptance criteria

- [ ] A test run that takes an account below its threshold writes one
  low-balance mail to each of its billing roles and none to its members,
  and a second crossing before the balance rises above the threshold
  writes none. Today: no site of the house sends mail — numinia-web at
  `5811252` holds no mail carrier (`git grep -i -c -E
  'amazonses|sesv2|send_email|mailchannels'` returns nothing).
- [ ] At zero, each week a world is kept for free, and 14 and 2 days before
  its deletion, the billing roles get one mail each, with the till's
  deletion date. Today: no balance exists.
- [ ] Scheduling a price rise mails every account with worlds that same
  day, with the date it starts. Today: no tariff exists.
- [ ] In live mode the mails leave through Amazon SES in Paris from an
  address of the house the Oracle verified, and a mail SES refuses is
  retried and then reported. Today: no mail leaves any site of the house.

---

## 3. Closure

*(Fill when the mission closes.)*
