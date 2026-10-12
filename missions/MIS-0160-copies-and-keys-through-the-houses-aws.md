---
id: "MIS-160"
uid: ""
title: "Copies and keys reach the console through the house's AWS: S3 for the zips, Secrets Manager for each world's keys"
type: mission
status: todo
version: "0.2.0"
created: "2026-10-10T12:00:00+02:00"
updated: "2026-10-12T16:51:33+02:00"
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

## Execution log

**2026-10-12 — the Oracle's direction: the copies go to AWS first, and the
website holds no AWS key.** The Oracle put the copies in AWS ahead of the
machines' measurements and reservations (`MIS-162`, `MIS-163`), because "it
affects a great many things". Since site v0.77.0 the machines obey requests
the Oracle's wallet signs (`SYS-014`), so the design this mission was
written with — a `worlds-room` AWS key in the Worker that lists the copies,
presigns their links and reads Secrets Manager — is superseded. What
replaces it, not a selection yet where it names a store for a second
machine:

- **The Worker holds no AWS key:** a stolen website takes no copy.
- **Each machine holds one narrow key:** the managed policy
  `fleet-machine-copies` — `s3:PutObject`, `s3:GetObject` and
  `s3:AbortMultipartUpload` on `copies/*`, `s3:ListBucket` limited to the
  prefix `copies/*`, no delete of any kind — attached to the IAM user
  `fleet-open-1`.
- **A download link is presigned by the machine,** for an hour, after an
  Oracle's signed request — later an owner's (`MIS-159`).
- **A new bucket, `numinia-world-copies`, in Paris (`eu-west-3`),** so
  "servers in France" stays literal for the copies too: versioning on, Block
  Public Access on, SSE-S3 encryption, and a lifecycle rule on `copies/` —
  current versions expire after 14 days, noncurrent versions are deleted 7
  days later, incomplete multipart uploads after 1 day. With versioning on,
  a stolen machine that overwrites a copy leaves the previous one in place.
- **The layout is `copies/<organisation>/<world>/<date>.zip`:** one folder
  per organisation, so the house's worlds and each client's stay apart.
- **A world's live keys stay on its machine.** Restoring a night on the
  same machine keeps people's identity; restoring on another machine makes
  new keys, which is written as debt. When a second machine exists, the keys
  go to AWS Systems Manager Parameter Store standard parameters (no
  additional charge) rather than Secrets Manager ($0.40 per secret per
  month), both prices read from AWS on 2026-10-12.
- **What it costs:** S3 Standard in `eu-west-3` is $0.024 per GB-month and
  $0.0053 per 1,000 PUT requests (AWS price list published 2026-09-28).
- **When the copies ship,** numen.games/hosting's answer on where the data
  lives ("On OVHcloud servers in France") and the privacy policy (`LEG-001`)
  name Amazon Web Services, Paris, as where the copies are kept.
- **The Oracle's own steps** are a guide outside the repository: the
  bucket, its rule, the policy and the user now; the access key only when
  the machine can upload. He made the first four the same day, with a
  second rule, `copies-cleanup-markers`, that removes a delete marker as
  soon as no version is left behind it; the 14-day rule alone removes it
  only once it is 14 days old.

The criteria above that name `worlds-room` are read against this design at
closure: there is no such user and no AWS key in the Worker. The same holds
for the copies' place (`copies/<organisation>/<world>/` rather than
`backups/<id>/`) and for the keys, which stay on the machine rather than in
Secrets Manager.

---

## 3. Closure

*(Fill when the mission closes.)*
