---
id: "STD-022"
uid: ""
title: "Secrets"
type: documentation
subtype: standard
status: draft
version: "1.0.1"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, security, secrets]
threshold: governed
series_change: "1.0.1 — 2026-09-25: written in plain words, at the Oracle's word in session: no code or document number in the reading; plates, sources and what verifies each rule wait in one table at the foot. No obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Secrets

> **Summary:** No password, key or token is ever written into the archive.
> One that has been exposed is changed before anyone writes the exposure
> down. A weakness that can still be used is reported somewhere else,
> never committed here.
> **Epistemic:** The three moments a secret can leak through a repository,
> and the rule for each.
> **Pragmatic:** Handle a key, a token or a finding without making it worse.
> **Audience:** Agents · Oracles

**Binds:** every file in this repository, and every report about it.
**Does not bind:** the secrets a running service keeps, which the register
of engineering checks governs.

## Rules

**Nothing secret in the tree.** No password, token or key is ever written
into the archive, and that includes its history.

**Change the key before you write.** An exposed password or key is replaced
before the exposure is written down anywhere.

**Live weaknesses are reported elsewhere.** A weakness that can still be
used is reported outside this repository, never committed to it.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it follows, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| KEY-054 | Nothing secret in the tree | [The Twelve-Factor App, config](https://12factor.net/config) | by hand: no secret scanner runs here; the register's row SEC-004 asks for one and is owed |
| KEY-055 | Change the key before you write | — | by hand: the change happens outside this repository |
| KEY-056 | Live weaknesses are reported elsewhere | — | by hand: a report that was not made is not visible from inside |

## Why

A public repository is copied before it is read, so a secret in its history
is already elsewhere. Writing the exposure down before changing the key
turns the record into a map; committing a live weakness does the same for
the weakness.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | SEC-004, the scanner this corpus does not run |
| `STD-005` | Engineering baseline | ENG-004, settings live in the environment |
