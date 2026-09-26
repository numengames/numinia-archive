---
id: "OPS-010"
uid: ""
title: "Cookie Policy — Numen Games"
type: legal
status: draft
version: "1.1.0"
created: "2026-09-18T17:00:00+02:00"
updated: "2026-09-24T21:30:00+02:00"
author: "ursa"
owner: "oracle"
tags: [legal, cookies, privacy, gdpr, lssi, website, numen-games, enforceable]
license: "LicenseRef-Numen-AllRightsReserved"
provenance: "agent"
language: "en"
related: ["OPS-003", "OPS-004", "STD-008"]
review_flags: |
  FLAG-1: Written by an agent from a measured inventory of what each
  site stores (2026-09-18: grep of document.cookie, cookies.set,
  localStorage.setItem and third-party <script src> over the four
  repositories), not by a lawyer. The inventory is fact; the legal
  framing (LSSI art. 22.2, GDPR) awaits review, like OPS-003 and
  OPS-004. Published with this flag open, by the same decision that
  published those two.
  Re-measured 2026-09-24 (v1.1.0, MIS-154): the day/night switch
  (SIT-003) now keeps `numinia-modo` on all four sites; numinia.org's
  page reader keeps its speed and resume point; numinia.com's manual
  reader and player area keep five more preferences. All are
  preferences set by the visitor's own action.
  FLAG-2: OPS-003 §2 says "our website installs cookies that collect
  information about your browsing". For three of the four sites that
  sentence is false and for numinia.com it overstates: the only
  cookies are consent and session, neither collects browsing. OPS-003
  needs the sentence corrected when a lawyer next touches it; this
  policy is the accurate statement meanwhile and resolves OPS-003's
  FLAG-4 (the cited policy now exists).
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: LicenseRef-Numen-AllRightsReserved
-->

# Cookie Policy — Numen Games

> **Summary:** What the four websites of Numen Games S.L. store in your
> browser, why, for how long, and what they send to anyone else. Written
> from a measured inventory, not from a template: it says what is true
> per site, and the site that stores nothing says so.
> **Scope:** numen.games · numinia.com · numinia.org · nwos.numen.games.
> **Enforceable legal artifact — all rights reserved.** This archive copy
> is the master; every published copy derives from it (as OPS-003 and
> OPS-004).

## 1. Who we are

Numen Games S.L. (hereinafter "Numen Games"), the entity identified in
the Privacy Policy, is responsible for the four websites above and for
what they store in your browser.

## 2. What a cookie is, and what else a site can store

A **cookie** is a small text a website asks your browser to keep and send
back on later visits. **Local storage** is a similar space the browser
offers to a site, which is not sent back automatically. Both live on your
device, both are yours to delete, and Spanish law (LSSI art. 22.2) and the
GDPR treat them alike: a site must tell you what it stores and, unless it
is strictly necessary for a service you asked for, obtain your consent
first.

## 3. What each site stores

The inventory below is measured from each site's source code on the date
in the header. A site that is not listed under a heading stores nothing
of that kind.

### 3.1 numinia.com

| Name | Kind | Purpose | Set when | Lasts | Necessary? |
|---|---|---|---|---|---|
| `numinia_consent` | first-party cookie | Records that you accepted the Terms and this policy, and which version of the text you accepted. When the text changes, the version changes and the site asks again. | You press *Accept* on the notice | 180 days | Yes — it is how the site remembers not to ask again |
| `numinia_session` | first-party cookie, `httpOnly` | Keeps you signed in after you enter the player area with your wallet. Contains a signed session token, not your browsing. | You sign in | 1 hour | Yes — only if you sign in; no sign-in, no cookie |
| `siwe_nonce` | first-party cookie, `httpOnly` | A one-time challenge used during wallet sign-in, so a signature cannot be replayed. | During sign-in | Minutes | Yes — only during sign-in |
| `numinia-lang` | local storage | Your chosen language, so the site opens in it. | You pick a language | Until you clear it | Preference — set only when you choose |
| `numinia-modo` | local storage | Your chosen display mode (day / night). | You pick a mode | Until you clear it | Preference — set only when you choose |
| `numinia-lap-nav` | local storage | Whether you folded the player-area navigation. | You fold or unfold it | Until you clear it | Preference — set only when you act |
| `numinia-lap-hidden` | local storage | Which items you hid in the player area's settings. | You hide or show an item | Until you clear it | Preference — set only when you act |
| `numinia-codex-modo` | local storage | The day or night page you chose in the manual reader. | You switch it in the reader | Until you clear it | Preference — set only when you choose |
| `numinia-codex-tam` | local storage | The text size you chose in the manual reader. | You change the size | Until you clear it | Preference — set only when you choose |
| `numinia-codex-marca` | local storage | Your bookmark in the manual: which chapter you marked. | You mark a chapter | Until you remove it or clear it | Preference — set only when you act |
| `numinia-codex-ritmo` | local storage | The reading speed you chose for the manual's narrator. | You change the speed | Until you clear it | Preference — set only when you choose |

**Measurement.** numinia.com counts what is clicked on the page to learn
how it is used. Those counts **do not leave your device** today: they are
kept in memory and discarded when you close the tab. If that changes — if
counts are ever sent to a server — this policy will say where, and the
consent version will change so the notice asks you again first.

**Third parties.** None. numinia.com loads no script, font, image or
embed from any other organisation.

### 3.2 numinia.org

No cookies. It keeps two preferences and one bookmark, and only when you
act:

| Name | Kind | Purpose | Set when | Lasts | Necessary? |
|---|---|---|---|---|---|
| `numinia-modo` | local storage | Your chosen display mode (day / night). | You press the sun / moon button | Until you clear it | Preference — set only when you choose |
| `sp:rate` | local storage | The speed you chose for the page reader (read aloud). | You change the speed | Until you clear it | Preference — set only when you choose |
| `sp:` + the page address | session storage | Where you paused the page reader, so it can resume on that page. | You pause the reader | Until you close the tab | Preference — set only when you act |

Loads nothing from third parties.

### 3.3 numen.games

No cookies. One preference, only when you choose it:

| Name | Kind | Purpose | Set when | Lasts | Necessary? |
|---|---|---|---|---|---|
| `numinia-modo` | local storage | Your chosen display mode (day / night). | You press the sun / moon button | Until you clear it | Preference — set only when you choose |

Loads nothing from third parties.

### 3.4 nwos.numen.games

No cookies. One preference, only when you choose it:

| Name | Kind | Purpose | Set when | Lasts | Necessary? |
|---|---|---|---|---|---|
| `numinia-modo` | local storage | Your chosen display mode (day / night). | You press the sun / moon button | Until you clear it | Preference — set only when you choose |

The workspace request form sends what you type to Numen Games when you
submit it (see the Privacy Policy); nothing of it is kept on your device.
Loads nothing from third parties.

## 4. Consent

Where a site stores only what §3 marks *Necessary* or *Preference* set by
your own action, no prior consent is required and no notice is shown
(numinia.org, numen.games, nwos.numen.games). numinia.com shows a notice
because its Terms and this policy are accepted together; pressing *Accept*
sets `numinia_consent` and nothing else. Declining leaves the site usable
with no cookie set; the notice returns on the next visit.

## 5. How to delete or block

Every browser lets you see, delete and block cookies and local storage,
per site or entirely, from its settings (usually *Privacy* or *Site
data*). Deleting `numinia_consent` makes the notice appear again;
deleting `numinia_session` signs you out; deleting the preferences
returns the site to its defaults. Blocking cookies on numinia.com
prevents signing in, and nothing else.

## 6. Changes to this policy

This policy changes when what a site stores changes. Each version is
dated in the archive; the sites publish the current one. On numinia.com
a change in what is stored also changes the consent version, so the
notice asks you again.

## 7. Contact

Questions about this policy or about your data: legal@numengames.com.
Your rights under the GDPR are described in the Privacy Policy.
