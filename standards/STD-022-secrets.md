---
id: "STD-022"
uid: ""
title: "Secrets"
type: standard
subtype: standard
status: active
version: "2.1.1"
created: "2026-09-03T22:10:00Z"
updated: "2026-10-09T16:41:32+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
license: "CC0-1.0"
tags: [standards, security, secrets]
derived_from: "PRI-010"

---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Secrets

> **Summary:** No password, key or token goes into the archive; programs
> read them where they run. Our security policy sends whoever finds a
> weakness to a private channel. What happens once one is known is a
> procedure.
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

**Report a weakness privately.** Our security policy, `SECURITY.md`, MUST
send whoever finds a weakness that can still be used to our code host's
private reporting channel, and MUST tell them not to open a public issue.
The best practices badge asks for a private channel.

What we do once a weakness is known — change an exposed key before anything
about it is written, answer the finder in time, publish only once it is
closed — is a sequence of acts, not a rule a machine can check. It is the
procedure for handling a security weakness.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| KEY-054 | Nothing secret in the tree | [OpenSSF Best Practices Badge, no_leaked_credentials](https://www.bestpractices.dev/en/criteria/0#0.no_leaked_credentials); [OWASP Top 10 CI/CD Security Risks, CICD-SEC-6 insufficient credential hygiene](https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-06-Insufficient-Credential-Hygiene) | `.github/workflows/secrets.yml`, a caller of the shared secret scan in `numengames/.github`, pinned by commit: a full-history scan (gitleaks) with this repository's `.gitleaks.toml`, on every pull request, every push to main and weekly, as the register's row SEC-004 asks; the code host's secret scanning and push protection are row SEC-002 |
| KEY-057 | Settings live in the environment | [The Twelve-Factor App, III. Config](https://12factor.net/config); holds deprecated ENG-004 | `machine/scripts/test/secrets.test.mjs` fails on any tracked environment or key file (`.env`, `.dev.vars`, `.pem`, `.key`, a private SSH key) |
| KEY-056 | Report a weakness privately | [OpenSSF Best Practices Badge, vulnerability_report_private and vulnerability_report_response](https://www.bestpractices.dev/en/criteria/0#0.vulnerability_report_private); [GitHub private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) | `machine/scripts/test/secrets.test.mjs` fails unless `SECURITY.md` links the private reporting form and forbids the public issue; that the form is switched on is register row SEC-002 |

## Why

A public repository is copied before it is read, so a secret in its history
is already elsewhere. Reporting a live weakness in the open turns the report
into a map.
Following outside standards lets any auditor check us against a list they
already hold.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | SEC-002, SEC-004 and SEC-009, the scanners and the policy file |
