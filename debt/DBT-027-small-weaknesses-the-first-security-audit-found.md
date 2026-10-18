---
id: "DBT-027"
uid: ""
title: "Small weaknesses the first security audit of the sites found"
type: documentation
status: active
version: "0.1.0"
created: "2026-10-13T20:42:00+02:00"
updated: "2026-10-13T20:42:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [debt, security, sites, privacy, csp]
license: "CC-BY-4.0"
severity: low
severity_reason: "none of the rows lets anyone in or reads anyone's data; one may leave a visitor's own contact details in a URL, the rest are hardening left undone"
detected: "2026-10-13T15:22:00+02:00"
visibility: "restricted-oracle"
visibility_reason: "it names weak points of the live sites; PRO-036 asks that a weakness be written up publicly only once it is closed"
opened_by: "ursa"
related: ["PRO-036", "STD-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-027 — Small weaknesses the first security audit found

> **Summary:** On 2026-10-13 the five repositories were searched for keys
> in their whole history and the four sites were crawled by a passive
> scanner. No key, password or way in was found. What follows is small,
> and the Oracle asked that it wait for a pull request of minor fixes.
> **Epistemic:** What did the first audit find that is still worth fixing?
> **Pragmatic:** Fix the rows in one pull request; audit the worlds server
> when its access is given.
> **Audience:** Agents · Oracles

---

## 1. The defect

| # | Where | What | Fix |
|---|---|---|---|
| 1 | numen.games, `/contacto/` and `/hosting/` in both languages | The forms have no `method` or `action`; JavaScript turns them into an email. If the script does not load, the browser sends the form to the same page by GET, and the visitor's name, email and phone end up in the address bar, the history and Cloudflare's logs | Give each form `method="post"` and stop the default send, so a failure never writes the data into a URL |
| 2 | The four sites | The content security policy allows inline scripts and styles (`'unsafe-inline'`); numinia.com, numen.games and nwos also accept any `https:` origin for images or connections | Move to hashes or nonces for the inline scripts Astro emits, and name the origins each site really uses |
| 3 | The worlds server at OVH | Not audited: it is the only machine of ours open to the internet, and the audit had no access to it | Run a port scan and Lynis on it once the Oracle grants SSH |

The rest of the scanner's alerts were checked by hand and are false: the
Stripe test card printed on purpose on numinia.com/back, a reflected value
on /hosting that the page never reflects, the words "under construction"
read as an error message. The seventeen hits of the key scan are file
hashes, public Arweave ids, a file name and test placeholders.

---

## 2. Evidence

gitleaks 8.30.1 over the full history of numinia-archive, numinia-web,
numengames-web, nwos-deploy and numinia-assets; OWASP ZAP 2.17.0 spider and
passive rules only, no attack, over numinia.org, numinia.com, numen.games
and nwos.numen.games. Headers read with curl the same day: every site sends
HSTS, a content security policy, `nosniff`, a referrer policy and a
permissions policy, and refuses to be framed.

---

## 3. Closure condition

> **Closes when:** rows 1 and 2 are fixed in merged pull requests, and the
> worlds server has been audited with its findings fixed or entered here.

---

## 4. Cost of leaving it open

Row 1 can put a visitor's phone and email into logs nobody meant to keep
them in. Row 2 costs nothing today, because no page shows text a stranger
wrote; it starts to matter the day one does. Row 3 is the one unknown.
