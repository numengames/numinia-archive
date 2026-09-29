---
id: "DBT-022"
uid: ""
title: "Legal debts and questions for counsel"
type: documentation
status: active
version: "0.1.0"
created: "2026-09-29T18:00:00+02:00"
updated: "2026-09-29T18:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [debt, legal, gdpr, lssi, consumer-law, cookies, intellectual-property]
license: "CC-BY-4.0"
severity: high
severity_reason: "the four sites publish legal texts that do not describe what the sites do, and numinia.com is about to sell to consumers without consumer terms"
detected: "2026-09-29"
visibility: "restricted-oracle"
visibility_reason: "working list for the Oracle and the company's lawyers (ATH21); it names gaps a reader could mistake for commitments"
opened_by: "ursa"
related: ["BLU-017", "LEG-001", "LEG-002", "LEG-003", "LEG-004"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-022 — Legal debts and questions for counsel

> **Summary:** Every known gap between what the four sites do and what their legal texts say, and every question only a lawyer or the company can answer.
> **Epistemic:** Until these close, the texts are honest drafts, not reviewed law.
> **Pragmatic:** Take section 2 to ATH21; fix section 1 by pull request; strike each line when closed.
> **Audience:** Oracles · Counsel

---

## 1. The defect

Measured on 2026-09-29 from the four repositories and the live pages. Each line
is a debt (something we know is wrong) or a question (something we cannot
decide alone). Items marked **ours** are fixed by pull request; items marked
**counsel** go to ATH21; items marked **company** need a document or a
decision from Numen Games S.L.

### 1.1 Company facts

| # | Item | Who |
|---|---|---|
| 1 | The Mercantile Registry entry (registry, volume, folio, sheet, entry) is missing from the legal notice. LSSI art. 10 requires it. The Oracle has it and will provide it. | company |
| 2 | The legal notice gives the address as "Calle Chile 10, Las Rozas, Madrid". Confirm it is the registered address and add the postal code. | company |
| 3 | There is no signed assignment of rights from the manual's authors (Christian Märtens 80 %, Pablo Fernández-Maquieira 20 %) to Numen Games S.L., yet the company declares itself rights holder and released the lore under CC0. Draft and sign the assignment; file it with the signed contracts. | company · counsel |
| 3b | The retired `numinia-lore` repository is still public and its README says the lore is "all rights reserved", while the archive and the Codex publish the same lore as CC0. Archive or delete the old repository, or add a line pointing at the current licence. | company |

### 1.2 International transfers (the "nothing leaves the EEA" rule)

The privacy policy said Numen transfers no personal data outside the EEA. The
code says otherwise; the text now says what happens (LEG-001 2.1.0). Whether
to keep these providers or replace them is a decision, not a wording.

| # | Provider | What leaves | Where | Safeguard found | Who |
|---|---|---|---|---|---|
| 4 | Cloudflare (all four sites) | IP address, user agent and path of every request, in the hosting logs | United States, among others | EU-U.S. Data Privacy Framework and standard contractual clauses, per its DPA | counsel |
| 5 | thirdweb, Non-Fungible Labs Inc. (numinia.com sign-in) | email or Google account, wallet address, device key shares | United States — its privacy policy says so and names no safeguard | none found; ask for its DPA | counsel · company |
| 6 | GitHub (nwos.numen.games) | the company name and the responsible email typed in the workspace form are written into a private repository | United States | Data Privacy Framework, active | counsel |
| 7 | Anthropic (nwos.numen.games) | the company name, to research and draft the workspace documents | United States | not verified | counsel |
| 8 | Microsoft (legal@numengames.com mailbox) | every email sent to us | tenant region not verified | EU Data Boundary if the tenant is European | company |

### 1.3 Consumer sales on numinia.com

The Oracle confirmed on 2026-09-29 that numinia.com will sell to consumers.
The published terms (LEG-002) were written for companies buying services on
numen.games and say so. See also BLU-017.

| # | Item | Who |
|---|---|---|
| 9 | Consumer terms of sale for numinia.com: who sells, what, price with VAT, delivery, the legal guarantee of conformity for digital content, complaints. None exist. | counsel |
| 10 | Right of withdrawal for digital content: the checkout needs the buyer's express consent and acknowledgement that the right is lost on delivery, and a confirmation on a durable medium. | counsel |
| 11 | LEG-002 §14 submits disputes exclusively to the courts of Madrid. That clause cannot bind a consumer. Decide the clause for consumer terms. | counsel |
| 12 | Language: Spanish consumer law expects contract information in Spanish. The masters are in English. Decide which language is authoritative and whether a Spanish version must be the binding one for Spanish buyers. | counsel |
| 13 | LEG-002 §5.3 forbids any bot or scraper. That contradicts the open licences of numinia.org (CC0, CC-BY, MIT) and legitimate indexing. Narrow it to abuse. | counsel |
| 14 | Terms of use specific to numinia.org (the archive, open by licence) and to the Codex on numinia.com (public reading, CC0 lore): today both show the numen.games B2B terms. | ours · counsel |
| 15 | The sign-in checkbox on numinia.com accepts "the Terms and the Privacy Policy" together. Accepting a privacy policy is not a legal act; confirm the wording of the checkbox. | counsel |
| 16 | Age: services are for people aged 18 or over, as a condition of contract. Nothing asks the buyer to confirm it. Decide whether a declaration at checkout is enough. | counsel |

### 1.4 Privacy policy (LEG-001)

| # | Item | Who |
|---|---|---|
| 17 | Purposes are numbered 1, 2, 7, 8 in the source; 3–6 are missing. Renumbered 1–4 in 2.1.0 without adding content. Confirm nothing was lost. | counsel |
| 18 | Purpose 2 (promotional communications) describes a service that does not exist today. Keep, rewrite or remove. | counsel |
| 19 | Retention: only the hosting logs (days) and the session cookie (one hour) have a measured period. Sign-in data held by thirdweb and emails have none. | counsel · company |
| 20 | No record of processing activities (GDPR art. 30) and no data processing agreement on file with any provider in §1.2. | company · counsel |
| 21 | The Spanish original of the policy (v1.1.0) is in git history only. Confirm the English master against the lawyers' original. | counsel |

### 1.5 Cookies and consent

| # | Item | Who |
|---|---|---|
| 22 | numinia.com's /legal/cookies page is a draft that says the site stores nothing, while the site sets three cookies and nine local-storage keys. The measured policy (LEG-003) is published on numinia.org only. | ours |
| 23 | numinia.com's banner accepts the Terms and the Cookie Policy with one button and offers no Reject. The AEPD guide asks for Accept and Reject at the same level, and a separate act for each purpose. Replace it with a consent manager (vanilla-cookieconsent, MIT). | ours |
| 24 | Today no site stores anything that needs prior consent: preferences set by the visitor, the session and the sign-in challenge are exempt, and numinia.com's click counts never leave the browser. The day counts are sent to a server, consent becomes mandatory. Confirm this reading. | counsel |
| 25 | The thirdweb sign-in widget writes its own keys to local storage (`thirdweb:*`, `walletToken-*`, `thirdwebEwsWalletUserId-*`, `a-*`). Named in LEG-003 2.0.0 as part of the sign-in; confirm they are exempt. | counsel |

### 1.6 The published pages

| # | Item | Who |
|---|---|---|
| 26 | numinia.com and numen.games publish copies of LEG-001/002 that still show review notes, "see FLAG-2 in the frontmatter" and "Audience: Oracle". Re-copy from the cleaned masters. | ours |
| 27 | nwos.numen.games links to numen.games' texts; its workspace form collects data the numen.games texts do not describe. It needs its own legal pages. | ours |
| 28 | No site had a legal notice (LSSI art. 10). LEG-004 is written; every footer must link it. | ours |
| 29 | numinia.com's legal notice page is a draft with "[PENDING: legal name, tax ID…]". | ours |
| 30 | The Codex (numinia.com/lap/codex) has no legal links: its shell hides the site footer. | ours |
| 31 | Digital Services Act: numinia.com will host community content. A contact point, a notice-and-action form and statements of reasons are required (BLU-017). | counsel |
| 32 | AI Act art. 50: nwos.numen.games generates documents with an AI model for the visitor's company. Say so where the visitor sees the result. | counsel |

## 2. Evidence

```
$ grep -rhoE "(localStorage|sessionStorage)\.(get|set)Item\('[^']+" numinia-web/apps/store/src | sort -u
numinia-codex-marca numinia-codex-modo numinia-codex-tam numinia-lang
numinia-lap-hidden numinia-lap-nav numinia-modo   (+ numinia-lap-personaje,
numinia-codex-ritmo held in constants)
$ curl -s https://numinia.com/legal/cookies/ | grep -o "uses no cookies and no local storage"
uses no cookies and no local storage
$ curl -s https://numinia.org/legal/privacy | grep -o "see FLAG-2 in the frontmatter"
see FLAG-2 in the frontmatter
$ curl -sL thirdweb.com/privacy-policy | grep -o "transferred to and processed in the United States"
transferred to and processed in the United States
$ grep -n "inAppWallet\|GITHUB_TOKEN\|Anthropic" numinia-web/.../LoginSpike.tsx nwos-deploy/src/pages/api/registro.ts
inAppWallet({ auth: { options: ['google', 'email', 'passkey'] } })
new Anthropic(...) · octokit ... RESPONSIBLE_EMAIL
```

## 3. Closure condition

> **Closes when:** every row above is struck through with the pull request or
> the document that closed it, and ATH21 has signed off sections 1.2 to 1.5.

## 4. Cost of leaving it open

A public text that says something false about personal data is itself a breach
of the duty to inform (GDPR arts. 12–13), whatever the processing. Selling to
consumers without terms leaves every sale open to a refund after use and the
jurisdiction clause void. The rights assignment is the one that cannot be fixed
later without the authors: sign it while everyone agrees.
