---
id: "LEG-003"
former_id: "OPS-010"
former_id_note: "moved from operations/ to its own series legal/ on 2026-09-27; the text is unchanged"
uid: ""
title: "Cookie Policy — Numen Games"
type: legal
status: draft
version: "2.1.1"
created: "2026-09-18T17:00:00+02:00"
updated: "2026-10-02T14:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [legal, cookies, privacy, gdpr, lssi, website, numen-games, enforceable]
license: "LicenseRef-Numen-AllRightsReserved"
provenance: "ai-generated"
language: "en"
related: ["LEG-001", "LEG-002", "LEG-004", "STD-008", "DBT-022"]
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
  FLAG-4 (the cited policy now exists). RESOLVED 2026-09-29: LEG-001
  2.1.0 §2 now points here instead.
  FLAG-3: Re-measured 2026-09-29 (v2.0.0). Added what the 1.1.0
  inventory missed on numinia.com: the character sheet
  (`numinia-lap-personaje`) and the keys the sign-in widget writes.
  Added the cookie notice the Oracle ordered on all four sites, with
  Accept and Reject at the same level, and its own cookie. The Terms
  are no longer accepted from the cookie notice; they are accepted at
  sign-in. Counsel confirms the exemptions in §4 (DBT-022 #24, #25).
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: LicenseRef-Numen-AllRightsReserved
-->

# Cookie Policy — Numen Games

> **Summary:** What the four websites of Numen Games S.L. store in your browser, why, for how long, and what they send to anyone else.
> **Epistemic:** Measured from each site's code, not copied from a template: it says what is true per site.
> **Pragmatic:** Read it to know what your browser keeps; change your choice at any time from the Cookies link in the footer.
> **Audience:** Visitors

**Applies to:** numen.games · numinia.com · numinia.org · nwos.numen.games.

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
| `numinia_consent` | first-party cookie | Records your choice on the cookie notice — accepted or rejected, which categories, and which version of this policy. When the policy changes, the notice asks again. | You press *Accept all*, *Reject all* or *Save* on the notice | 6 months | Yes — it is how the site remembers your choice, whichever it was |
| `numinia_session` | first-party cookie, `httpOnly` | Keeps you signed in after you enter the player area with your wallet. Contains a signed session token, not your browsing. | You sign in | 1 hour | Yes — only if you sign in; no sign-in, no cookie |
| `numinia-lang` | local storage | Your chosen language, so the site opens in it. | You pick a language | Until you clear it | Preference — set only when you choose |
| `numinia-modo` | local storage | Your chosen display mode (day / night). | You pick a mode | Until you clear it | Preference — set only when you choose |
| `numinia-lap-nav` | local storage | Whether you folded the player-area navigation. | You fold or unfold it | Until you clear it | Preference — set only when you act |
| `numinia-lap-hidden` | local storage | Which items you hid in the player area's settings. | You hide or show an item | Until you clear it | Preference — set only when you act |
| `numinia-codex-modo` | local storage | The day or night page you chose in the manual reader. | You switch it in the reader | Until you clear it | Preference — set only when you choose |
| `numinia-codex-tam` | local storage | The text size you chose in the manual reader. | You change the size | Until you clear it | Preference — set only when you choose |
| `numinia-codex-marca` | local storage | Your bookmark in the manual: which chapter you marked. | You mark a chapter | Until you remove it or clear it | Preference — set only when you act |
| `numinia-codex-ritmo` | local storage | The reading speed you chose for the manual's narrator. | You change the speed | Until you clear it | Preference — set only when you choose |
| `numinia-lap-personaje` | local storage | The character sheet you fill in the player area, so it is there when you return. It stays on your device; nothing is sent. | You edit the sheet | Until you delete it from the sheet or clear it | Preference — set only when you act |
| `thirdweb:*`, `walletToken-*`, `thirdwebEwsWalletUserId-*`, `thirdwebEwsWalletUserDetails-*`, `a-*`, `walletConnectSessions-*` | local storage, written by the sign-in provider (thirdweb) | Remember which wallet you connected and keep the wallet the provider created for you usable on this device. | You sign in | Until you sign out or clear it | Yes — only if you sign in; part of the sign-in you asked for |

**Measurement.** numinia.com counts what is clicked on the page to learn
how it is used. It counts only if you accept *Measurement* on the notice,
and those counts **do not leave your device** today: they are kept in
memory and discarded when you close the tab. If that changes — if counts
are ever sent to a server — this policy will say where, and the notice
will ask you again first.

**Third parties.** Only when you sign in: the sign-in window is served by
thirdweb (Non-Fungible Labs, Inc.), which receives what you sign in with,
as the Privacy Policy explains. Otherwise numinia.com loads no script,
font, image or embed from any other organisation.

### 3.2 numinia.org

One cookie, which records your choice on the cookie notice. It keeps three
preferences and one bookmark, and only when you act:

| Name | Kind | Purpose | Set when | Lasts | Necessary? |
|---|---|---|---|---|---|
| `numen_consent` | first-party cookie | Records that you saw the cookie notice and what you chose, and which version of this policy. | You press a button on the notice | 6 months | Yes — it is how the site remembers your choice |
| `numinia-modo` | local storage | Your chosen display mode (day / night). | You press the sun / moon button | Until you clear it | Preference — set only when you choose |
| `numinia-narrative` | local storage | How the archive speaks to you: plain words, as it is, or Numinia's own words. | You turn the moon dial | Until you clear it | Preference — set only when you choose |
| `sp:rate` | local storage | The speed you chose for the page reader (read aloud). | You change the speed | Until you clear it | Preference — set only when you choose |
| `sp:` + the page address | session storage | Where you paused the page reader, so it can resume on that page. | You pause the reader | Until you close the tab | Preference — set only when you act |

Loads nothing from third parties.

### 3.3 numen.games

One cookie, which records your choice on the cookie notice, and one
preference, only when you choose it:

| Name | Kind | Purpose | Set when | Lasts | Necessary? |
|---|---|---|---|---|---|
| `numen_consent` | first-party cookie | Records that you saw the cookie notice and what you chose, and which version of this policy. | You press a button on the notice | 6 months | Yes — it is how the site remembers your choice |
| `numinia-modo` | local storage | Your chosen display mode (day / night). | You press the sun / moon button | Until you clear it | Preference — set only when you choose |

Loads nothing from third parties.

### 3.4 nwos.numen.games

One cookie, which records your choice on the cookie notice, and one
preference, only when you choose it:

| Name | Kind | Purpose | Set when | Lasts | Necessary? |
|---|---|---|---|---|---|
| `numen_consent` | first-party cookie | Records that you saw the cookie notice and what you chose, and which version of this policy. | You press a button on the notice | 6 months | Yes — it is how the site remembers your choice |
| `numinia-modo` | local storage | Your chosen display mode (day / night). | You press the sun / moon button | Until you clear it | Preference — set only when you choose |

The workspace request form sends what you type to Numen Games when you
submit it (see the Privacy Policy); nothing of it is kept on your device.
Loads nothing from third parties.

## 4. The notice, and your consent

Every site shows a notice on your first visit. It says what the site
stores and offers **Accept all** and **Reject all**, side by side and
equally visible, plus **Preferences** to choose category by category.
Browsing without answering accepts nothing.

What §3 marks *Necessary* or *Preference* is stored whatever you choose:
the law does not require consent for what is strictly needed for a
service you asked for, such as keeping a language you picked. The only
category you can switch off today is *Measurement* on numinia.com; the
other three sites have nothing optional, and their notice says so.

To change your choice later, open the Cookies link in any site's footer
and press **Change my choice**. The notice also returns when this policy
changes or after six months.

The Terms are not accepted from this notice: on numinia.com you accept
them when you sign in.

## 5. How to delete or block

Every browser lets you see, delete and block cookies and local storage,
per site or entirely, from its settings (usually *Privacy* or *Site
data*). Deleting `numinia_consent` or `numen_consent` makes the notice
appear again;
deleting `numinia_session` signs you out; deleting the preferences
returns the site to its defaults. Blocking cookies on numinia.com
prevents signing in, and nothing else.

## 6. Changes to this policy

This policy changes when what a site stores changes. Each version is
dated in the archive; the sites publish the current one. A change in
what a site stores also changes the version the notice records, so the
notice asks you again.

## 7. Contact

Questions about this policy or about your data: legal@numengames.com.
Your rights under the GDPR are described in the Privacy Policy.
