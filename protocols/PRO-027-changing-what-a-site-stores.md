---
id: "PRO-027"
uid: ""
title: "Changing what a site stores or loads"
type: protocol
status: draft
version: "0.1.0"
created: "2026-09-27T19:50:00+02:00"
updated: "2026-09-27T19:50:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, personal-data, cookies, sites]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-035", "STD-037", "LEG-003", "LEG-001"]
derived_from: "CAN-012"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-027 — Changing what a site stores or loads

> **Summary:** What to do before a site of ours starts to store something
> new in a visitor's browser, load something from another company, or
> measure the visitor — and when it stops.
> **Epistemic:** What must happen before a site keeps or sends something new?
> **Pragmatic:** Add or remove a cookie, a stored value or an outside
> service without the cookie policy going out of date.
> **Audience:** Agents · Oracles

**Binds:** whoever changes a site so that it stores, loads or sends
something it did not before, or stops doing so.

---

## 1. Purpose and trigger

The cookie policy (`LEG-003`) is the list every site is held to: nothing is
stored, loaded from anyone else or measured unless it names it
(`STD-035`, a site says what it stores). A change that adds a cookie
without changing the list turns the policy into a lie.

It starts when a change to one of the four sites would add, change or
remove any of: a cookie; a value in local or session storage; a script,
font, image or frame loaded from another company's server; anything that
measures the visitor and sends it anywhere. An **agent** prepares the
change; the **Oracle** approves the policy text, which is reserved.

---

## 2. Preconditions

- The current cookie policy, `LEG-003`, and the site's code.
- The reason for the new thing, in one sentence: what the visitor asked for
  that needs it.

---

## 3. Procedure

1. **Measure what the site stores and loads today.** Search the site's
   code for `document.cookie`, `localStorage`, `sessionStorage` and
   `src="https://`. Compare with `LEG-003`. Any difference found here is
   fixed first, in its own change.
2. **Ask whether it is needed.** If the visitor did not ask for the thing
   it serves, prefer not to add it. A preference the visitor set, like the
   mode, needs no consent; anything else that is not strictly necessary
   does.
3. **Write its line for the policy.** Name, kind (cookie, storage, outside
   service), purpose in plain words, what sets it, how long it lasts, and
   whether it needs consent.
4. **Ask the Oracle to approve the policy change.** The policy is a
   reserved legal text; the agent drafts, the Oracle approves.
5. **Raise the consent version** if the new thing needs consent, so the
   notice asks every visitor again. Refusing stays as easy as accepting.
6. **Change the site and the policy in the same release.** The pull
   request carries both, and the site's `/updates` entry says what now
   stores or loads.
7. **Check the built site.** Open it with an empty browser, refuse
   consent, and confirm nothing beyond the necessary is stored or loaded;
   then accept and confirm the new thing appears.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | The search and its result, in the pull request |
| 4 | The Oracle's approval of the policy text |
| 6 | One pull request changing both the site and `LEG-003` |
| 7 | What the browser held after refusing and after accepting |

---

## 5. Escalation

An outside service that sends visitor data to another company outside the
European Union, or that processes personal data for us, needs the Oracle's
decision and a written contract with that company (`STD-035`, anyone
handling data for us signs first) before step 6.
