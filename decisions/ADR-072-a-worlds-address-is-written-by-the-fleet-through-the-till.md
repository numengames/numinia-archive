---
id: "ADR-072"
uid: ""
title: "A world's address is written by the fleet, through the till; nobody makes a DNS record by hand"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-16T09:32:00+00:00"
updated: "2026-10-16T09:32:00+00:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, virtual-worlds, hosting, fleet, dns, secrets]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "When the Worlds room creates a world, or brings one back from its zip, on any machine of the fleet, it writes the world's address itself: an A record, DNS only, at the machine's IPv4, before the Oracle's wallet signs. Deleting a world deletes the record the fleet made. The records are written by the till's DNS desk, the only holder of a Cloudflare token limited to the DNS of numinia.com and numen.games; numinia.com still holds no key. The desk only touches records it made itself."
amends: ["ADR-069"]
related: ["ADR-070", "STD-022", "SYS-013"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-072 — A world's address is written by the fleet, through the till

> **Summary:** A world on any machine but the first needed an Oracle to make
> its DNS record by hand in Cloudflare. Now the Worlds room makes it when it
> creates the world, and deletes it when the world is deleted. The only key
> that can write DNS lives in the till, limited to the two house zones, and
> the till changes only records the fleet made.
> **Epistemic:** The Oracle asked on 2026-10-16 for «cero pasos manuales en
> Cloudflare» and to choose the machine in the room itself. Where the key
> lives is Ursa's proposal, after the till's own pattern; the Oracle may move
> it.
> **Pragmatic:** One Cloudflare API token, set once as a secret of the till.
> Without it the room works as before and says a record is missing.
> **Audience:** Agents · Oracles

---

## 1. Context

Every name under `numinia.com` and `numen.games` falls to a wildcard record
that sends it to the first fleet machine, open-1. A world on another machine
— the first was `alchemiststower` on `bronte-xs-ca-003`, moved on
2026-10-16 — needs its own A record, DNS only (grey cloud), because the
machine's own Caddy holds the certificate and the WebSocket. Until that
record exists the wildcard sends visitors to open-1, which answers with an
error, and the room refuses the address. The Oracle made each record by hand.

`ADR-069` says the room holds no key: each change goes from the Oracle's
browser to the machine, signed by the Oracle's wallet. A DNS record is not a
machine's business, and a Cloudflare token cannot be limited to one name:
whoever holds a token with DNS Edit on a zone can change any record of it,
the site's own included.

## 2. Decision

1. **The room writes the address.** While the wizard is open it asks who
   answers for the address — nobody (the wildcard), a record of the fleet, or
   one made by hand — and says what will happen. Before the wallet signs a new
   world, or a world brought back from its zip, it creates the record, or
   moves the fleet's record to the chosen machine. If it cannot, nothing is
   asked of the machine. Once a machine takes a delete, the fleet's record of
   that address is deleted.
2. **The key lives in the till, not in numinia.com.** The till is already a
   Worker apart, reachable only through numinia.com's service bindings (its
   Oracle desk, its account desk). A third RPC entrypoint, the DNS desk,
   holds the secret `CLOUDFLARE_DNS_TOKEN`: Zone Read and DNS Edit, limited
   to `numinia.com` and `numen.games`. numinia.com checks the Oracle's
   session (`manage-worlds`), maps the machine to its public host name from
   its own list, and passes the wallet as the author; the browser never
   names a host or an IP. Machines hold no Cloudflare key.
3. **The rails.** Only one label under a house zone, never the zone itself
   or a reserved name. Only A records, always DNS only, always at the IPv4
   the machine's host name resolves to in public DNS. The desk changes or
   deletes only records whose comment it wrote (`numinia-fleet <machine>`
   and the short wallet); a record by hand that already points at the machine
   is left as it is, any other record by hand is refused.
4. **The Oracle still chooses the machine** in the wizard; the IP follows
   from the machine, never typed.

## 3. Alternatives considered

- **The token in numinia.com's own Worker.** Simplest, but the site's Worker
  serves every visitor; a flaw there would reach the house's DNS. Rejected.
- **The token on each machine** (the reconciler writes its worlds' records).
  Every machine would hold a key able to rewrite `numinia.com` itself.
  Rejected.
- **A wildcard per machine** (`<world>.<machine>.numinia.com`). No key at
  all, but a world's address would change with its machine and the house's
  names would carry server names. Rejected.
- **Keep the record by hand.** What the Oracle asked to end.

## 4. Consequences

- One step for the Oracle, once: create the token and set it as the till's
  secret. Until then the room behaves as before.
- Records made by hand before this (`alchemiststower`, the machines' own door
  names) stay as they are; the room reads them and never changes them.
- A record the room created for a world whose signature was then declined
  stays, harmless and pointing at the chosen machine; the next creation of
  that address reuses it.
- The machines' door names (`<alias>.numinia.com`) are still made by hand
  when a machine joins the fleet; the same desk could write them later.

## 5. Status

Proposed on 2026-10-16, built in numinia-web (the till's DNS desk and the
Worlds room), pending the Oracle's acceptance on the pull request.
