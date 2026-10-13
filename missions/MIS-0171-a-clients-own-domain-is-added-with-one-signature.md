---
id: "MIS-171"
uid: ""
title: "A client's own domain is added with one signature: the machine serves it once the name points at it, and nobody logs into the machine"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T16:48:26+02:00"
updated: "2026-10-12T16:48:26+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, dns, custom-domains, tls, numinia-web]
license: "CC0-1.0"

priority: medium
effort: M
executor: hybrid
assigned_to: null
completed: null

requires_oracle_approval: true
context: "2026-10-12T16:48:26+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md]
related: ["MIS-169"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-171 — A client's own domain is added with one signature

> **Summary:** numen.games/hosting tells a client to point their domain at
> our server, with the exact instructions we give. A fleet machine serves a
> name outside numinia.com and numen.games today only when it is listed in a
> file on the machine itself, written there by an Oracle — someone logged
> into the machine. This mission makes the Oracle's signature on the world's
> creation the authorisation: the machine writes the world's site only once
> the name already resolves to it, and the room tells the client which DNS
> record to set.
> **Epistemic:** Which names a machine serves, who allowed each one, and
> whether the machine can answer for it.
> **Pragmatic:** A client's world opens at the client's own address with no
> SSH session.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **The signature authorises the name.** A `CreateWorld` whose address is
  outside the house's zones is accepted when it is signed by an Oracle on
  that machine; the address is already part of what is signed. Whether the
  machine's list of client domains stays, written by the reconciler from
  signed requests, or goes, is decided when the mission opens.
- **The name points here before anything is asked.** The machine writes the
  world's site into its Caddyfile only when the name resolves in public DNS
  to the machine's own address. Until then the world waits as *waiting for
  DNS*, and the reconciler looks again on every run. No certificate is
  requested for a name the machine cannot serve: such a request fails the
  certificate authority's check and, repeated, runs into its limits.
- **What the client is told:** the room shows the record to set — type,
  name, value — with a Copy button, and the world's state until the name
  points at the machine; the world's card says the same afterwards.
- **What the machine says:** a world waiting for its name shows so at the
  door, like any other phase.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| Custom domains | the order of the steps | the custom-domain flow of hosting platforms (Vercel, Netlify, GitHub Pages): the client points the DNS, the platform verifies it, then issues HTTPS |
| Proving the name | before any certificate | a lookup of the name's A, AAAA or CNAME records against the machine's address; a TXT record that proves control of the name |
| The certificate | HTTPS for the client's name | ACME (RFC 8555) through Caddy, as today; Caddy's on-demand TLS with an `ask` endpoint that approves each name |

The choice and its reason go in this mission's execution log.

Out of scope: giving an existing world a second address, or moving it from
its test address to the client's — an edit of its order, which no request
makes today; the client's DNS itself; mail or any other record on the
client's domain.

---

## 2. Acceptance criteria

- [ ] A world created with one signature at a domain outside numinia.com and
  numen.games opens over HTTPS at that address once its DNS points at the
  machine, and nobody logged into the machine. Today: such a domain is
  refused unless it is listed in `/etc/fleet/domains` on the machine,
  "written by an Oracle" there (numinia-assets `reconcile.py`); neither the
  door, the reconciler nor the bootstrap writes that file.
- [ ] While the name does not resolve to the machine, its Caddyfile has no
  site for it and no certificate was requested for it, and the room and the
  door show the world as waiting for its name. Today: the reconciler writes a
  site for every running world, with no lookup of its name.
- [ ] The room's *New world* accepts a client's domain and shows the record
  to set. Today: it offers only names under the two house zones
  (numinia-web `WORLD_ZONES`, `numinia.com` and `numen.games`).

---

## 3. Closure

*(Fill when the mission closes.)*
