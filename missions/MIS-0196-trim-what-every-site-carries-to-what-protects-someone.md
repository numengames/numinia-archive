---
id: "MIS-196"
uid: ""
title: "Trim what every site carries to what protects someone"
type: mission
status: in-progress
version: "0.1.0"
created: "2026-10-15T15:50:00Z"
updated: "2026-10-15T15:50:00Z"
author: "ursa"
owner: "oracle"
section: "Brand and marketing"
tags: [standards, sites, footer, legal, regime]
license: "CC0-1.0"

priority: medium
effort: S
executor: agent
assigned_to: "ursa"
completed: null

started: "2026-10-15T15:50:00Z"
requires_oracle_approval: true
context: "2026-10-15T15:50:00Z"
paths: [standards/STD-037-what-every-site-carries.md, machine/scripts/test/regime.test.mjs]
related: ["STD-037", "STD-005", "LEG-004", "ADR-068", "SYS-013"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-196 — Trim what every site carries to what protects someone

> **Summary:** `STD-037` stops obliging the four sites to look alike. It
> keeps as obligations only what protects a visitor or the company: the
> legal texts reachable from every footer and written once, and the card a
> shared link shows. The footer layout, the day and night switch and the
> epitaph become the house's offer, recommended and not required. The
> Oracle gave his go in chat.
> **Epistemic:** Which of what every site carries must be the same, and
> which can each site decide?
> **Pragmatic:** From the merge, numinia.com can be a platform with its own
> footer without breaking a rule, and the standard asks no one for a test of
> how a site looks.
> **Audience:** Agents · Oracles

---

## 1. Scope

- `STD-037`: the footer rule keeps one obligation (the four legal texts are
  linked from the footer) and the layout becomes a recommendation; day and
  night and the epitaph become recommendations; the legal-texts and share
  card rules stay as they are; the Check table says for each row whether it
  is checked or only recommended. Major version (obligations removed,
  `STD-019`); still `draft`.
- A test in `regime.test.mjs` holds the shape.
- `CHANGELOG.md` entry; telemetry regenerated last.

Out of scope: activating `STD-037` (its rows for the legal footer links and
the single address are still checked by hand); removing the legal copies from
numinia.com, numen.games and nwos.numen.games (known debt in `SYS-013`);
any change under `web/src/`.

---

## 2. Acceptance criteria

- [ ] The rules for day and night and for the epitaph carry no `MUST`, and
  the footer rule asks a `MUST` only for the legal links. Today: all three
  say `MUST` about the layout, the switch or the skull.
- [ ] Each Check row says whether its verification is automated or the rule
  is only recommended. Today: SIT-003 and SIT-004 name hand checks for three
  sites.
- [ ] `npm test`, both check sets, the web build and `rule-index --check`
  pass; telemetry is the last commit.

---

## 3. Closure

*(Fill when the mission closes.)*
