---
id: "PRI-018"
uid: ""
title: "A limit nobody can check is a promise"
type: principle
status: active
version: "1.0.0"
created: "2026-10-16T14:50:00Z"
updated: "2026-10-16T14:50:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [principle, engine, limits, measurement, evidence]
license: "CC0-1.0"
related: ["PRI-016", "PRI-017", "STD-015", "STD-021", "MIS-195"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A limit nobody can check is a promise

> **Summary:** Every limit of the engine is published with the way it is known: measured, with the test that measures it, or estimated, with where the estimate comes from. What has not been measured is said to be unknown, and never rounded into a figure.
> **Epistemic:** How do we know what it can bear?
> **Pragmatic:** Before quoting a capacity to anyone, find its entry and read how it is known; if there is none, say you do not know.
> **Audience:** Everyone

**Binds:** whoever builds, runs or changes Numinia Engine, human or digital.

---

Someone will decide to put an event, a class or a customer on the engine because of a number we gave. If the number was a hope, they bore the cost of our hope. A figure is worth what lets another person check it, so every figure carries its proof or its source, and is changed in the place it lives when the truth changes.

Measuring is a discipline, not a gesture. A number taken on the machine where it was convenient, under a load that waits politely for the answer, or on the average case, flatters the engine and betrays the reader. We judge by the worst of the ordinary, under load that keeps coming, on hardware that is not borrowing its speed from its neighbours, and we say where and how we measured.

The honest column is the one that says *not known yet*. A list of limits with its gaps showing is more useful than a smooth one, because the gaps tell the reader where to be careful and tell us what to measure next.
