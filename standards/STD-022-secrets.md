---
id: "STD-022"
uid: ""
title: "Secrets"
type: documentation
subtype: standard
status: draft
version: "1.1.0"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, security, secrets]
threshold: governed
series_change: "1.1.0 — 2026-09-25: each rule now follows and names the outside standard behind it (the best practices badge and the OWASP pipeline risks for secrets in the tree, the OWASP secrets cheat sheet for rotation, private vulnerability reporting with a first answer within fourteen days), a minor move because the fourteen-day answer is new, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Secrets

> **Summary:** No password, key or token is ever written into the archive,
> and a scanner reads the whole history to prove it. One that has been
> exposed is changed before anyone writes the exposure down. A weakness is
> reported privately, and answered within two weeks.
> **Epistemic:** The three moments a secret can leak through a repository,
> and the rule for each.
> **Pragmatic:** Handle a key, a token or a finding without making it worse.
> **Audience:** Agents · Oracles

**Binds:** every file in this repository, and every report about it.
**Does not bind:** the secrets a running service keeps, which the register
of engineering checks governs.

## Rules

**Nothing secret in the tree.** We follow the best practices badge of the
Open Source Security Foundation, which asks that no valid credential ever
sit in a public repository, and the list of ten pipeline risks from the Open
Worldwide Application Security Project, which names leaked credentials as
one of them: a password, token or key MUST NOT be written into the archive,
history included, and a scanner that reads every commit is how we show it.
Our choice; if a leaked key opens personal data, data protection law makes
it a breach.

**Change the key before you write.** We follow the same project's guide to
managing secrets, the common reference for handling them: an exposed
password or key is revoked and replaced at once, and the change is logged.
Our addition: the replacement MUST happen before the exposure is written
down anywhere, so the record is never a map to a key that still works. Our
choice.

**Report a weakness privately.** We follow the best practices badge and the
private reporting channel our code host offers: whoever finds a weakness
that can still be used MUST report it through that private channel, never
in an open issue or a commit, and receives a first answer within fourteen
days. The fix is then ready before the weakness is public. Our choice.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it follows, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| KEY-054 | Nothing secret in the tree | [OpenSSF Best Practices Badge, no_leaked_credentials](https://www.bestpractices.dev/en/criteria/0#0.no_leaked_credentials); [OWASP Top 10 CI/CD Security Risks, CICD-SEC-6 insufficient credential hygiene](https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-06-Insufficient-Credential-Hygiene) | nothing yet: no full-history secret scanner (gitleaks) runs here; the register's row SEC-004 asks for one and is owed; the code host's secret scanning and push protection are row SEC-002 |
| KEY-055 | Change the key before you write | [OWASP Secrets Management Cheat Sheet, rotation and incident response](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) | by hand: the change happens outside this repository |
| KEY-056 | Report a weakness privately | [OpenSSF Best Practices Badge, vulnerability_report_private and vulnerability_report_response](https://www.bestpractices.dev/en/criteria/0#0.vulnerability_report_private); [GitHub private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) | `SECURITY.md` names the channel, register row SEC-009; whether private reporting is switched on and the answer came in time, by hand |

## Why

A public repository is copied before it is read, so a secret in its history
is already elsewhere. Writing the exposure down before changing the key
turns the record into a map; reporting a live weakness in the open does the
same for the weakness. Following the outside standards lets any auditor
check us against a list they already hold.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | SEC-002, SEC-004 and SEC-009, the scanners and the policy file |
| `STD-005` | Engineering baseline | ENG-004, settings live in the environment |
