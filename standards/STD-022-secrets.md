---
id: "STD-022"
uid: ""
title: "Secrets"
type: documentation
subtype: standard
status: draft
version: "1.0.0"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-09T03:50:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, security, secrets]
threshold: governed
series_change: "1.0.0 — new standard, split from STD-009 under ADR-043. Rules keep their plates and their verifiers; the prose around them is the Why."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Secrets

> **Summary:** No credential is ever written into the corpus. An exposed one
> is rotated before the exposure is recorded. A live finding is reported out
> of band, never committed.
> **Epistemic:** The three moments a secret can leak through a repository,
> and the rule for each.
> **Pragmatic:** Handle a key, a token or a finding without making it worse.
> **Audience:** Agents · Oracles

**Binds:** every file in this repository, and every report about it.
**Does not bind:** secrets in the platform's runtime, which `STD-015`
SEC-004 governs.

## Rules

**KEY-054 — Nothing secret in the tree.** No credential, token or key is ever
written into the corpus, history included.

**KEY-055 — Rotate before you write.** An exposed credential is rotated before
the exposure is written down anywhere.

**KEY-056 — Live findings go out of band.** A vulnerability that is still
exploitable is reported outside this repository, not committed to it.

## Check

| Plate | Verified by |
|---|---|
| KEY-054 | `[MANUAL]` — no secret scanner is wired here; `STD-015` SEC-004 names push protection and gitleaks for code repositories |
| KEY-055 | `[MANUAL]` — rotation happens outside this repository |
| KEY-056 | `[MANUAL]` — the absence of a report is not observable from inside |

## Why

A public repository is cloned before it is read: a secret in history is
already elsewhere. Writing the exposure down before rotating it turns the
record into the map; committing a live finding does the same for the
vulnerability.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | SEC-004, the scanner this corpus does not run |
