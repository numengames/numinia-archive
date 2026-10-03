---
id: "ADR-045"
uid: ""
title: "A series needs a reader"
type: adr
status: active
version: "1.0.3"
created: "2026-09-09T14:30:00+02:00"
updated: "2026-10-03T21:30:00+02:00"
author: "ursa"
owner: "oracle"
deciders: ["oracle"]
guild: "Alchemists"
section: "Knowledge and quality"
tags: [decisions, adr, series, guilds, infra, entropy]
license: "CC-BY-4.0"
related: ["ADR-005", "ADR-030", "ADR-036", "ADR-043", "PRI-004", "STD-001", "MIS-0135"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-045 — A series needs a reader

> **Summary:** `GLD` and `INF` leave the register. `guilds/` is deleted; the
> one live fact it held — which guild an agent belongs to — is now `guild:` in
> `agents/<id>/AGENT.yaml`. `infra/` is deleted; its one file is now
> `.github/rulesets/protect-main.json`.
> **Epistemic:** A series earns its row by having a reader. Neither had one;
> the charters also contradicted `PRI-004` on the only thing they added.
> **Pragmatic:** Two rows fewer in `STD-001`, two moulds fewer, eight
> addresses redirected, one field on the agent card.
> **Audience:** Agents · Oracles

**Binds:** every register that lists series (`STD-001`, `rules.json`,
`REUSE.toml`, the content glob); every `agents/<id>/AGENT.yaml`.
**Does not bind:** `PRI-004`, which keeps the guild hierarchy as canon.

---

## 1. Decision

**A series stays in the register only while something reads it.**

- `guilds/` is deleted. An agent's guild is `guild:` in its `AGENT.yaml`, one
  of the four names in `PRI-004`. Branches are not recorded until a consumer
  needs them. Agents in no roster carry `guild: null` until the Oracle rules.
- `infra/` is deleted. `infra/github/ruleset-protect-main.json` becomes
  `.github/rulesets/protect-main.json`, beside CODEOWNERS and the workflows.
- `STD-001` and `rules.json` lose both series and the `charter` genre; the two
  moulds go; the eight `/corpus/guilds/...` addresses redirect to `PRI-004`.

## 2. Evidence

Measured at `f242434`. `guilds/`: 8 files, 375 lines, read by nothing —
`corpus.ts` excluded it from browsing, `lint-frontmatter.mjs` checked `guild:`
against a typed list, no `AGENT.yaml` carried a guild. The charters listed two
branches each; `PRI-004` lists six per guild under other names.
`infra/`: one file, one README, zero `INF-NNN` documents in fifteen days;
deployment lives in `nwos-deploy`.

Rosters at `f242434` placed Ursa (Alchemists), Byblos, Senet, Calliope
(Exegetes), Talos and Nimrod (Sentinels). Antunj, Doulos, Lexa and Procyon
were in no roster.

## 3. Licence

`REUSE.toml` declared `guilds/**` reserved from 2026-08-16. The files were
created on 2026-04-07 under the root `LICENSE`, `CC0-1.0`, and published — the
same situation `ADR-036` records for `principles/`. Deleting them changes nothing:
the text was CC0 in fact, reserved in name. The reservation goes with the
folder.

## 4. Alternatives

| Alternative | Why not |
|---|---|
| Repair the charters to match `PRI-004` | Repairs a second copy of `PRI-004`; the second copy is what drifted. |
| Move `guilds/` to `lore/` | No lore in them: a mission line, two branch names, a roster. |
| Keep `infra/` for Terraform | Fifteen days, zero files. An applier arrives with its own decision. |
| Record `guild` in `SOUL.md` prose | `AGENT.yaml` is the card tooling reads (`ADR-026`). |

## 5. Consequences

- **Obliges:** an agent's guild is set in its `AGENT.yaml`, nowhere else. A
  series proposed in future names its reader before it gets a row.
- **Costs:** four agents carry `guild: null`; the `guild:` vocabulary in
  `lint-frontmatter.mjs` stays a typed list with `PRI-004` as its only source.
- **Reversal:** a consumer that needs a per-guild document and cannot be
  served by `PRI-004` plus the agent cards.
- **Deletion:** `ADR-030` test 1 — the rule lives here and in `STD-001`.
