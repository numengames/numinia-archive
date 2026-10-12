---
id: "MIS-160"
uid: ""
title: "Copies and keys reach the console through the house's AWS: S3 for the zips, Secrets Manager for each world's keys"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-10T12:00:00+02:00"
updated: "2026-10-10T12:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, secrets, aws, s3, backups]
license: "CC0-1.0"

priority: medium
effort: S
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-158", "MIS-159"]
requires_oracle_approval: true
context: "2026-10-10T12:00:00+02:00"
paths: [decisions/ADR-069-a-world-has-a-card-an-order-and-a-key-each-in-its-place.md, standards/STD-022-secrets.md, system/suppliers/]
related: ["MIS-158", "MIS-159", "ADR-069", "STD-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-160 — Copies and keys reach the console through the house's AWS

> **Summary:** The house already owns an AWS account with the two stores
> the Alchemists' Tower used: an S3 bucket (with its `backups/` prefix and
> expiry rule) and Secrets Manager (one secret per world). Both outlive the
> paused cluster and cost cents. This mission has each fleet machine upload
> its nightly zips to that bucket and read its worlds' keys from that
> secret manager, and has the Worlds room list the copies, sign the download
> links and show the admin code from the same two stores.
> **Epistemic:** `ADR-069` decision 1 said "keys only on the server" and decision 5 said
> "object storage in the EU" meaning Cloudflare R2. The Oracle chose to
> reuse what is already mounted and paid for. The ADR gets a patch: keys in
> the house's secret manager, read by the machine and the console; copies in
> the house's bucket. The console still never talks to a machine — it talks
> to the two stores.
> **Pragmatic:** Nothing new to contract. Two IAM users with narrow
> policies, created by the Oracle; the agent writes the policies and never
> sees a key.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **Two IAM users, least privilege**, created by the Oracle from policies
  written here:
  - `fleet-machine`: `s3:PutObject` on `backups/*`; `secretsmanager:
    GetSecretValue` on `worlds/*`.
  - `worlds-room`: `s3:ListBucket` and `s3:GetObject` on `backups/*` (to
    presign); `secretsmanager:GetSecretValue` on `worlds/*`.
  Their keys go into the machine's environment and the Worker's secrets.
- **The machine**: `MIS-158`'s script uploads each night's zip to
  `backups/<id>/<date>.zip` (lifecycle rule 14 days); the reconciler reads
  `worlds/<id>` from Secrets Manager into the container's environment,
  replacing `env/<id>.env`.
- **The room**: lists copies from the bucket, presigns downloads (one hour),
  reads the admin code from `worlds/<id>`. Requests are SigV4-signed from
  the Worker without the AWS SDK.
- **The records**: `ADR-069` 0.2.0 (keys in the secret manager; copies in
  the house's bucket); a supplier card for AWS in `system/suppliers/`;
  `STD-022` cites the secret manager as the worlds' store.

Out of scope: moving the hand-run server's keys; the Tower's own code or
cluster; anything that lets the room write to the bucket or the secrets.

---

## 2. Acceptance criteria

- [ ] IAM simulator (or a failed call) shows `worlds-room` cannot
  `PutObject` or `DeleteObject`, and `fleet-machine` cannot `ListBucket` or
  read another prefix. Today: no users.
- [ ] `backups/<id>/` holds a zip dated within the last 24 hours for each
  world on `open-1`, and none older than 14 days. Today: copies stay on disk.
- [ ] `open-1` has no `env/<id>.env`; the world's container still opens
  build mode with the admin code read from Secrets Manager. Today: keys in a
  file.
- [ ] The room's *Download* and *Show admin code* work against the two
  stores; the Worker's secrets hold only `worlds-room`'s key. Today: the
  room reads a local source.
- [ ] `ADR-069` 0.2.0 and the AWS supplier card are merged. Today: 0.1.0, no
  card.

---

## 3. Closure

*(Fill when the mission closes.)*
