---
id: "MIS-157"
uid: ""
title: "Bring numinia.com's sign-in, sessions, ranks and bans up to published industry standards, and make its code keep STD-003"
type: mission
status: todo
version: "0.2.0"
created: "2026-10-09T20:02:00+02:00"
updated: "2026-10-09T20:52:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [identity, authentication, sessions, authorization, ranks, security, numinia-web]
license: "CC0-1.0"

priority: high
effort: L
executor: hybrid
assigned_to: null
completed: null

requires_oracle_approval: true
context: "2026-10-09T20:02:00+02:00"
paths: [standards/STD-003-platform-ranks.md, decisions/, system/, debt/]
related: ["STD-003", "PRI-015", "PRO-034", "PRO-036", "SYS-013"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-157 — Bring numinia.com's sign-in, sessions, ranks and bans up to published standards

> **Summary:** Members of numinia.com sign in, hold a session and a rank,
> and may one day be banned. Each of those is a solved problem with
> published standards, protocols and best practices. This mission selects
> them, writes down how the site works today, makes the code keep the
> platform-ranks standard (`STD-003`) and builds what is missing on the
> selected standards, never on a house invention.
> **Epistemic:** Which published standard governs each part of identity and
> access on numinia.com, and how far the site is from each today.
> **Pragmatic:** When this closes, an auditor can check numinia.com's
> sign-in and permissions against lists they already hold.
> **Audience:** Agents · Oracles

---

## 1. Scope

### The rule of this mission: the industry first

Sign-in, sessions, roles, revocation and bans are among the most documented
problems in software. This mission invents none of it. Before any code
changes, the standard for each area below is selected from published ones,
with its version, and recorded in an ADR. Every change then names the rule
it meets. Where a selected standard and a house habit disagree, the standard
wins unless the ADR says why not.

The candidates are a starting list, not the selection. The selection is made
when the mission starts, against the versions current then.

| Area | What it covers on numinia.com | Candidates to weigh |
|---|---|---|
| Sign-in | wallet, Google, email, passkey | EIP-4361 Sign-In with Ethereum (CAIP-122 for other chains); OpenID Connect for the social accounts; W3C WebAuthn for passkeys; NIST SP 800-63B; OWASP ASVS 5.0, Authentication chapter |
| Session | the cookie, its lifetime, renewal and sign-out | OWASP ASVS 5.0, Session Management and Self-contained Tokens chapters; OWASP Session Management Cheat Sheet; the HTTP cookie RFC (6265 and its revision); NIST SP 800-63B on reauthentication; RFC 7519 and RFC 8725 if the token becomes a JWT |
| Authorization | ranks and permissions | NIST role-based access control (ANSI/INCITS 359), role hierarchies; OWASP ASVS 5.0, Authorization chapter; OWASP Authorization Cheat Sheet; NIST SP 800-53 rev. 5, AC-5 and AC-6 |
| Revocation and bans | removing a rank or a member at once | NIST SP 800-53 rev. 5, AC-2 account management (disabling accounts); OWASP ASVS 5.0 on ending sessions when an account is disabled |
| Privileged accounts | the Oracles | NIST SP 800-63B authenticator assurance levels; NIST SP 800-53 rev. 5, AC-6(9) logging the use of privileged functions |
| Logging and abuse | the trail of rank changes; throttling sign-in | OWASP ASVS 5.0, Security Logging chapter; OWASP API Security Top 10 2023, API4 unrestricted resource consumption |
| Personal data | wallet addresses, the email the sign-in provider holds, ban records | GDPR articles 5 and 25: data minimisation, data protection by design |

### What the site does today

Measured on 2026-10-09 against numinia-web's main (site v0.73.0):

- **Sign-in** goes through thirdweb. A member uses Google, email or a
  passkey, and thirdweb makes a wallet for them, or brings their own wallet
  through MetaMask or WalletConnect. The wallet signs a Sign-In with
  Ethereum message, accepted only for the site's own domains.
- **The session** is the site's own. A token signed with HMAC-SHA256 travels
  in a cookie that page scripts cannot read, that other sites cannot send
  and that only goes over HTTPS. It lasts one hour and is not renewed. The
  rank is written inside the token. Signing out deletes the cookie and
  nothing else.
- **Oracles** are the wallet addresses in a secret of the Worker
  (`ADMIN_WALLET_ADDRESSES`).
- **Other ranks** live in a census: one file per wallet in a private GitHub
  repository, written from the admin panel. Without that repository
  configured, everyone below Oracle is a Nomad.
- **Throttling** counts requests per IP address in each Worker's own memory.

### Where it breaks `STD-003` today

- **RNK-004, nobody acts upward.** The census does not read the rank a
  member already holds, so an Archon can demote another Archon.
- **RNK-005, the ranks that follow the evidence move by themselves.** The
  admin panel grants Citizen and Pilgrim by hand.
- **RNK-003, no more than four Oracles.** Nothing caps the list.
- **RNK-007, the permissions and the standard move together.** The code gives
  Oracles a permission to manage worlds that `STD-003` does not list. It
  gives Citizens the permission to do Session Zero, while `STD-003` defines
  a Citizen as someone who has finished it. The standard's table of where
  each rank is read from still names files of the retired platform.
- **Bans.** None exist, so "nobody can ban an Oracle" holds only because
  nobody can ban anyone.

### The work, in order

1. **Select.** An ADR names, for each area above, the standard and version
   chosen and what of it is left out.
2. **Describe.** A document in `system/` tells identity and ranks as wired,
   written from the code. `STD-003` points at it, and its table of where
   each rank is read from is corrected.
3. **Comply.** numinia-web's code keeps `STD-003`, and a test proves each
   rule it can check.
4. **Build on the selected standards.** Revocation that takes effect before
   the session ends. Bans, with the Oracle unbannable. The session's
   lifetime and renewal. The protection for privileged accounts that the
   ADR picks. Throttling shared across the whole site.
5. **Record as debt** what stays undone: the automatic ladder from Nomad to
   Citizen to Pilgrim, which needs Session Zero and purchases stored first,
   and anything the ADR defers.

Out of scope: building the automatic ladder itself, which goes to debt in
step 5; payments (`STD-033`); sign-in on any site other than numinia.com.

---

## 2. Acceptance criteria

- [ ] `decisions/` holds an ADR that names, for each of the seven areas
  above, the selected standard and its version, or says why the area takes
  none. Today: no ADR covers sign-in or sessions.
- [ ] A document in `system/` describes sign-in, the session, ranks, the
  census and bans as wired, and `STD-003` links to it. Today: no document
  describes sign-in or the session.
- [ ] `git grep -c rank-overrides -- standards/` returns nothing. Today:
  `STD-003` names that retired file three times.
- [ ] In numinia-web's tests, an Archon's request to change the rank of a
  member who is already an Archon is refused with 403. Today: it is
  written.
- [ ] numinia-web's census endpoint refuses Citizen and Pilgrim as grants by
  hand. Today: it writes them.
- [ ] With five addresses on the Oracle list, numinia.com names no Oracle
  and logs why. Today: all five are Oracles.
- [ ] Every permission in numinia-web's domain package appears in
  `STD-003`, and every permission `STD-003` names exists in that package.
  Today: managing worlds is missing from `STD-003`.
- [ ] A member who is demoted or banned loses the rank on their next request,
  not when the session ends, and a test proves it. Today: they keep it for
  up to one hour.
- [ ] An Archon can ban a member below Archon, a banned wallet receives no
  session, and a request to ban an Oracle is refused by the endpoint and by
  the store. Today: no ban exists.
- [ ] A burst of sign-in attempts spread across Cloudflare's servers is
  throttled as one. Today: each server counts on its own.
- [ ] `debt/` holds an entry for the automatic ladder from Nomad to Citizen
  to Pilgrim. Today: none.

---

## Execution log

**2026-10-09 — the Oracle's working hypothesis: the wallet first.** Not a
selection yet; the ADR of step 1 still decides.

- **Where each rank would come from.** Pilgrim comes from the wallet: it
  holds a good of the house's collection. The season room already reads
  ERC-1155 balances on Base, so no database is needed. Citizen also comes
  from the wallet, through a free, non-transferable badge given when Session
  Zero ends; that is still debt. Vernacular and Archon come for now from a
  list in a Worker secret, like the Oracles, and later from roles written on
  chain. Bans come from a private list kept off chain, and from a database
  only when there are members to ban.
- **The census in a private GitHub repository was set aside by the Oracle.**
  It needs a repository and a token that expires, and it is slow to read on
  every request. It stays in the code until the ADR replaces it.
- **No database for now.** The site has no members to promote or to ban
  yet. Cloudflare D1 is the candidate once bans or volume need it: a change
  there reaches every server at once, while Cloudflare KV takes up to a
  minute.
- **Candidates added for the ADR, for ranks held by the wallet:**
  - token gating on ERC-1155 and ERC-721, as Guild.xyz and Collab.Land do;
  - Ethereum Attestation Service, revocable attestations signed by the
    house;
  - Hats Protocol, revocable roles in a tree, which is `STD-003`'s ladder
    written on chain;
  - non-transferable tokens (ERC-5192, with ERC-5484 for who may burn them).
- **Zero-knowledge proofs.** The candidates are Semaphore, Privado ID
  (formerly Polygon ID) and W3C Verifiable Credentials 2.0, a W3C
  Recommendation since May 2025. They prove membership of a group without
  saying which wallet. That fits anonymous votes or proving a fact without
  showing the wallet. It does not fit signing in to the player area, where
  the site must know who the member is.
- **Never on chain:** a ban, or anything else that marks a person. A public
  chain cannot forget, and GDPR's erasure and minimisation rules apply.
- **Done today.** The Oracle's wallet is in the Oracle list, set as a Worker
  secret so that deploys keep it, and the site reads it.

---

## 3. Closure

*(Fill when the mission closes.)*
