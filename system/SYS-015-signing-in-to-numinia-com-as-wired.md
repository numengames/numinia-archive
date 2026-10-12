---
id: "SYS-015"
uid: ""
title: "Signing in to numinia.com, as wired"
type: documentation
subtype: reference
status: draft
version: "0.1.0"
created: "2026-10-12T11:53:57+02:00"
updated: "2026-10-12T11:53:57+02:00"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
section: "Technology"
tags: [system, reference, identity, authentication, sessions, authorization, ranks, siwe, numinia-web]
license: "CC0-1.0"
related: ["STD-003", "MIS-157", "SYS-014", "STD-022", "STD-035"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-015 — Signing in to numinia.com, as wired

> **Summary:** How a person signs in to numinia.com, what the session holds,
> where a rank comes from and which rooms it opens, and the second signature
> the worlds room asks of an Oracle — as the code runs today.
> **Epistemic:** Which pieces numinia.com's sign-in is made of, what each one
> trusts, and what is not built.
> **Pragmatic:** Before touching sign-in, a rank or a permission, know which
> piece decides it and what a change there reaches.
> **Audience:** Agents · Oracles

> **A system document is a reference manual, not a plan.** Pieces that do not
> exist yet are listed as *not built*; nothing here says they run until they
> do.

---

## 1. Scope

numinia.com's sign-in, its session, its ranks and permissions, the census
that remembers ranks granted by hand, sign-out and throttling, and the
signature the worlds room asks for each action on a fleet machine. The
rules the ranks must keep are `STD-003`; the published standards each area
will follow are selected by `MIS-157`, not yet; the fleet itself is
`SYS-014`.

Not covered: payments (`STD-033`); the other sites of the house.

---

## 2. How it works

### The pieces

All in numinia-web; paths from its root.

| Piece | What it does | Where it lives |
|---|---|---|
| **The sign-in widget** | thirdweb's sign-in, behind the legal gate: Google, email or a passkey through thirdweb's in-app wallet, which makes or finds a wallet for the person; or the person's own wallet through MetaMask or WalletConnect. One list of wallets serves the sign-in and every later signature | `apps/store/src/components/auth/LoginSpike.tsx`, `wallets.ts` |
| **The legal gate** | no connection until the visitor accepts the published legal texts; the version accepted travels with the sign-in, and a stale one is refused | `apps/store/src/components/auth/LegalConsentGate.tsx`, the login endpoint |
| **The login endpoint** | writes a Sign-In with Ethereum message (EIP-4361) for the address, numbered once and good for five minutes, only for the site's own domains; verifies the signature through thirdweb | `apps/store/src/pages/api/auth/login.ts`, `apps/store/src/lib/auth/server.ts` |
| **The session** | the site's own token, not the vendor's: the wallet, the rank, the times and the legal version accepted, signed with HMAC-SHA256; carried in the cookie `numinia_session`, which page scripts cannot read, other sites cannot send and travels only over HTTPS; one hour, not renewed | `packages/auth/src/session.ts` |
| **The session's key** | `AUTH_SESSION_SECRET`, a secret of the Worker; during a rotation the previous one is still accepted until its sessions end | `packages/auth/src/rotation.ts` |
| **The Oracle list** | the wallets in the Worker secret `ADMIN_WALLET_ADDRESSES`; an address on it is an Oracle | `apps/store/src/lib/auth/server.ts` |
| **The census** | one record per wallet in a private GitHub repository, written from the admin panel, read at sign-in for every rank below Oracle; it can never make an Oracle | `packages/state/`, configured by four `STATE_` settings of the Worker |
| **The permissions** | 23 permissions, each rank holding those below it; the Oracle's four are promoting Archons, changing what each rank may do, configuring the system and managing the worlds | `packages/domain/src/constants/permissions.ts` |
| **Reading the session** | `GET /api/auth/session` answers the wallet and the rank for a valid cookie, 401 otherwise | `apps/store/src/pages/api/auth/session.ts` |
| **Sign-out** | `POST /api/auth/logout` deletes the cookie; nothing else, since nothing is kept on the server | `apps/store/src/pages/api/auth/logout.ts` |
| **Throttling** | per IP address and per minute, in each Worker instance's own memory: 20 sign-ins, 60 reads of the admin rooms, 20 census writes | `apps/store/src/middleware.ts`, `apps/store/src/lib/rate-limit.ts` |

### Signing in, step by step

1. The visitor opens *LAP › Session* and accepts the legal texts.
2. They choose a way in. With Google, email or a passkey, thirdweb makes or
   finds their wallet; with MetaMask or WalletConnect, their own wallet is
   used.
3. The page asks the login endpoint for a message for that address. The
   wallet shows it — "Numinia: prove you hold this address. No transaction,
   no cost." — and the person signs.
4. The endpoint verifies the signature through thirdweb, checks that the
   legal version accepted is the current one, and settles the rank: an
   address on the Oracle list is an Oracle; otherwise the census record
   decides; with no record, or no census, a Nomad.
5. It sets the session cookie for one hour. The page announces the change,
   and the player area shows at once what the rank opens: the management
   zone for Archons and Oracles, and the Oracle's rooms, *Worlds* among
   them, for Oracles only.

### Showing is not allowing

The player area hides or shows its rooms by asking `/api/auth/session`, but
no room trusts that. Each room's data comes from an endpoint that verifies
the session cookie itself and checks the permission on the server: the
worlds room's endpoint answers 403 without the permission to manage worlds.
A rank is read from the signed token, never from a header or a query the
caller controls.

The rank is frozen in the token. A new rank, or a new Oracle, takes effect
at the next sign-in, at most an hour later.

### A second signature: acting on a fleet machine

The session opens the worlds room; it does not order a machine. To create,
stop, start, download or delete a world, the Oracle signs that one request
with the same wallet (EIP-712 typed data, `SYS-014`). The room finds the
wallet thirdweb remembers from the sign-in and refuses any other. The
request goes from the browser to the machine, which checks the signature
against its own list of Oracles and never sees numinia.com's session.

So two lists decide, and both must name the wallet: numinia.com's Oracle
list opens the room, and each machine's list decides what that machine
obeys. A person who signs in with Google one day and with MetaMask the next
holds two wallets, and each list knows only the wallet it was given.

The two pages where a wallet signs — *LAP › Session* and *Worlds* — carry a
wider content security policy than the rest of the site, so that wallets
may open their own connections and frames (`apps/store/src/middleware.ts`).

### Not built

- **Bans.** The Archons' permission to ban exists in the ladder, but
  nothing applies it: nobody can be banned, an Oracle included.
- **Revocation before the hour.** A demoted member keeps the rank until
  the session ends.
- **The ladder that moves by itself.** Citizen after Session Zero and
  Pilgrim after a purchase are granted by hand in the census.
- **Shared throttling and one-time numbers.** Each Worker instance keeps
  its own counters and its own sign-in numbers in memory; the code says so
  of itself, and marks the number store as fit for a single instance.
- **The selected standards.** `MIS-157` selects them in a decision record
  before any of the above is built.

---

## 3. How to verify it

```
$ curl -s https://numinia.com/api/auth/session
{"error":"No session"}                     401: no cookie, no session
$ curl -s -o /dev/null -w '%{http_code}\n' https://numinia.com/api/admin/worlds
403                                        no session, no worlds room
```

Signed in, the same `/api/auth/session` opened in that browser answers
`{"address":"0x…","rank":"oracle"}` for an Oracle. In numinia-web,
`npm run ci` runs the tests of the session, its rotation, the one-time
numbers and the permission ladder.

---

## 4. Accuracy

**Verified against:** numinia-web `main` at `1bc7bef` (site v0.77.0), read
from the code, and the two live answers above, on 2026-10-12 at 11:56
Madrid time.

- How many wallets the Oracle list holds, and whether the census is
  configured in production, sit in secrets this document does not read.
- `STD-003`'s table of where each rank is read from still names files of
  the retired platform; this document is where the platform reads them
  today, and `MIS-157` corrects the table.
- thirdweb holds the identity of whoever signs in with Google, email or a
  passkey. It has no card in `SYS-012`, which lists only suppliers that
  invoice the house; whether it does is to confirm.

---

## References

| ID | Title | Why it is cited |
|---|---|---|
| `STD-003` | Platform ranks | the rules the ranks must keep |
| `MIS-157` | numinia.com's sign-in, sessions, ranks and bans by the standards | selects the standards and builds what is missing |
| `SYS-014` | The worlds fleet, as wired | the second signature, and the machines' own lists |
| `STD-022` | Secrets | why the Oracle list and the session's key are secrets |
| `STD-035` | Personal data | wallet addresses and sign-in identities are personal data |
