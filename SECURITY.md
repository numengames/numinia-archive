---
id: "SECURITY"
title: "Security Policy"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-17T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "claude-fable-5"
owner: "oracle"
tags: [security, disclosure, policy]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# Security Policy

## Reporting a vulnerability

If you find a security issue in this repository or in the site it
deploys (`numinia.org`), please report it privately:

- **Email:** legal@numengames.com (subject line starting with
  `[SECURITY]`)
- Please do **not** open a public issue for security reports.

We will acknowledge your report within 7 days. There is currently no
bug bounty programme.

## Scope

- This repository (`numengames/numinia-archive`): the NWOS workspace and
  the Astro viewer in `web/`.
- The deployed site: `numinia.org` / `www.numinia.org` (Cloudflare
  Workers, static assets only — the viewer holds no secrets and needs
  none to build or run).

## Out of scope

- Third-party services we rely on (GitHub, Cloudflare) — report to
  their own programmes.
