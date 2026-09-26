---
id: "STD-022"
uid: ""
title: "Secrets"
type: documentation
subtype: standard
status: draft
version: "1.2.3"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, security, secrets]
threshold: governed
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Secrets

> **Summary:** No password, key or token goes into the archive; programs
> read them where they run. A leaked key is changed before anyone writes the
> leak down. A weakness is reported privately and answered within two weeks.
> **Epistemic:** How does a secret stay out?
> **Pragmatic:** Handle a key, a token or a finding without making it worse.
> **Audience:** Agents · Oracles

**Binds:** every file in this repository, and every report about it.

## Rules

**Nothing secret in the tree.** A password, token or key MUST NOT be written
into the archive, history included. A scanner that reads every commit is how
we show it. The Open Source Security Foundation's best practices badge forbids
a valid credential in a public repository, and the Open Worldwide Application
Security Project lists leaked credentials among its ten pipeline risks. A
leaked key that opens personal data is also a breach under data protection
law.

**Settings live in the environment.** Anything that changes between
machines, passwords and keys above all, MUST be read from the environment
where the program runs, never from the repository. The same code then runs
anywhere, and publishing it never publishes a key. This is the third factor
of the twelve-factor app, a common method for building services.

**Change the key before you write.** An exposed password or key is revoked
and replaced at once, and the change is logged, as the Open Worldwide
Application Security Project's guide to secrets advises. The replacement
MUST happen before the exposure is written down anywhere, so the record
never points to a key that still works.

**Report a weakness privately.** Whoever finds a weakness that can still be
used MUST report it through our code host's private reporting channel, never
in an open issue or a commit. They get a first answer within fourteen days,
and the fix is ready before the weakness is public. The best practices badge
asks for both.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| KEY-054 | Nothing secret in the tree | [OpenSSF Best Practices Badge, no_leaked_credentials](https://www.bestpractices.dev/en/criteria/0#0.no_leaked_credentials); [OWASP Top 10 CI/CD Security Risks, CICD-SEC-6 insufficient credential hygiene](https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-06-Insufficient-Credential-Hygiene) | nothing yet: no full-history secret scanner (gitleaks) runs here; the register's row SEC-004 asks for one and is owed; the code host's secret scanning and push protection are row SEC-002 |
| KEY-057 | Settings live in the environment | [The Twelve-Factor App, III. Config](https://12factor.net/config); holds retired ENG-004 | no tracked environment file in any of the four repositories; register rows SEC-004 and DEV-001 apply it |
| KEY-055 | Change the key before you write | [OWASP Secrets Management Cheat Sheet, rotation and incident response](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) | by hand: the change happens outside this repository |
| KEY-056 | Report a weakness privately | [OpenSSF Best Practices Badge, vulnerability_report_private and vulnerability_report_response](https://www.bestpractices.dev/en/criteria/0#0.vulnerability_report_private); [GitHub private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) | `SECURITY.md` names the channel, register row SEC-009; whether private reporting is switched on and the answer came in time, by hand |

## Why

A public repository is copied before it is read, so a secret in its history
is already elsewhere. Writing down a leak before changing the key turns the
record into a map. Reporting a live weakness in the open does the same.
Following outside standards lets any auditor check us against a list they
already hold.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | SEC-002, SEC-004 and SEC-009, the scanners and the policy file |
