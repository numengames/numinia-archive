---
id: "PRO-034"
uid: ""
title: "Auditing a site's code"
type: procedure
status: draft
version: "0.1.2"
created: "2026-10-02T12:20:00+02:00"
updated: "2026-10-03T21:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedures, security, audit, sites, web, dependencies, workflows]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
review_next: "2027-10-02"
related: ["PRO-011", "STD-015", "STD-022", "STD-035", "PRO-027", "PRO-005", "PRO-008"]
derived_from: "CAN-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-034 — Auditing a site's code

> **Summary:** How an agent checks what a site's own code exposes — its
> routes, what it lets a browser run, what it stores, what its pipeline may
> write, what it depends on — and where it stops.
> **Epistemic:** How is a site's own code audited so that every route it answers is probed and nothing is changed before approval?
> **Pragmatic:** Once a year per site and on every trigger below. The agent
> lists, probes and reports, then stops; the fixes need a signature.
> **Audience:** Agents · Oracle

**Binds:** any agent auditing the code of a Numen Games or Numinia site, and
the report it files.

---

## 1. Purpose and trigger

The identity audit (`PRO-011`) reads who holds which key, not what a site's
code answers a stranger. This procedure reads the code.

Yearly per site (`review_next`; a skipped date is the next run's first
finding). Without waiting: before a site's first release; when a release
adds a server route, a login or an outside service; after an incident; when
a security update has been red for more than seven days. Executor: an agent
with read access to the repository and a browser.

---

## 2. Preconditions

- Read access to the repository, its workflows and its dependency alerts,
  through a credential that can be revoked at close.
- The site's production address. Ordinary requests only.
- A destination for each tier of the report, as in `PRO-011`.

---

## 3. Procedure

1. **List every server route and publish the count.** Pages with server
   output, API files, middleware, worker handlers, redirects. Give the
   command that listed them; every later row counts against this list.
2. **Probe every route live.** Record status, content type and headers. A
   route that answers in production and that the code does not explain is
   a finding.
3. **Find the routes that fetch an address they were given.** For each:
   which hosts it accepts, which content types it passes back. A route that
   re-serves another host's file under our domain with that host's content
   type lets anyone run a page as us (`SEC-015`; OWASP Top 10 A10).
4. **Find leftover routes.** Search route paths for `test`, `spike`,
   `debug`, `mock`, `demo`, sample logins and seed endpoints. Probe each.
5. **Find where the code writes markup.** `set:html`, `innerHTML`,
   `dangerouslySetInnerHTML`, `eval`, `new Function`, inline handlers. Say
   where each one's input comes from.
6. **Read the content security policy as served**, from the live headers.
   Note `unsafe-inline` or `unsafe-eval` for scripts, wildcard hosts, no
   `frame-ancestors`. Inline scripts allowed turn any finding of steps 3
   and 5 into a script that runs. (W3C CSP Level 3.)
7. **Read the other live security headers.** HSTS, `X-Content-Type-Options`,
   `Referrer-Policy`, `Permissions-Policy`. (OWASP Secure Headers Project.)
8. **Read every cookie the site sets.** `Secure`, `HttpOnly`, `SameSite`,
   domain, path, lifetime. A difference with the cookie policy goes to
   `PRO-027`.
9. **Read the workflow token permissions.** Top level and per job. Write
   granted at top level, or no `permissions` key, is a finding (`SEC-008`).
10. **Audit the production dependencies.** `npm audit --omit=dev`, the count
    by severity. List every open dependency-update pull request with its
    age and failing check; one red for days is a finding (`SEC-003`).
11. **Read the Scorecard grade** against seven out of ten (`SEC-013`), and
    each check below its target.
12. **Stop on a live exploit.** Record where it is, never a working
    payload, and report it out of band (`KEY-056`).
13. **Report** (`RPT-TEMPLATE`, `subtype: audit`), tiered as in `PRO-011`.
    One row per finding: what, where, the request or command, the date,
    the severity. Coverage is the share of step 1's routes probed.
14. **Prepare the fixes and wait.** Change no code, setting, workflow or
    dependency. File the list, its order and what each fix breaks as an
    approval request (`PRO-008`).
15. **Close.** Revoke the audit credential; update `review_next`.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | The route count and its command, before the first probe |
| 2 | Status, content type and headers for every listed route |
| 6–8 | Headers and cookies as served, dated |
| 10 | The audit output and the open update pull requests |
| 13 | Coverage stated; no payload, no identifier in the public tier |
| 14 | No commit by the audit credential; the fix list filed |

---

## 5. Escalation

A route anyone can use to run a script as us, or a live secret: stop,
report out of band, `PRO-005`. A finding in another
organisation's code receives an offer, never a fix.

---

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `PRO-011` | Auditing identity, authorization and secrets | tiers, scoring, stop on a real value |
| `STD-015` | Engineering checks | `SEC-003`, `SEC-008`, `SEC-013`, `SEC-015` |
| `STD-022` | Secrets | `KEY-056`: live findings out of band |
| `PRO-027` | Changing what a site stores or loads | cookie differences are fixed there |
| `PRO-008` | Requesting approval, issuing rulings | the fix list is an approval request |
