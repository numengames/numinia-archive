---
id: "STD-056"
uid: ""
title: "What a movement brings"
type: standard
subtype: standard
status: draft
version: "0.1.0"
created: "2026-10-20T11:00:00Z"
updated: "2026-10-20T11:00:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Products and services"
tags: [standards, movements, animations, assets, licences]
license: "CC0-1.0"
related: ["STD-010", "STD-050"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# What a movement brings

> **Summary:** A movement enters the collection only as one file that fits
> the human skeleton, moves the hip the way the engine reads it, stays
> within a maximum length and weight, and plays on three test avatars. It
> carries a permitted licence and says where it came from.
> **Epistemic:** What a movement must hold to be accepted, which licences
> let it in and which keep it out.
> **Pragmatic:** Check a candidate movement against the seven rules and the
> licence list before adding it.
> **Audience:** Agents · People responsible

**Binds:** every movement offered to the collection of movements, and whoever
adds, checks or converts one.

## Rules

### What the file is

**One movement per file.** A file MUST hold a single movement.

**A complete human skeleton.** A movement MUST carry the full human skeleton.

**No scale hints.** A movement MUST NOT carry hints about the size of the
body it was made for.

**The hip the engine understands.** A movement MUST name its hip bone, and
set its height, the way the engine reads them today: the bone is named
`mixamorig:Hips`. Under any other name the hip stays at a fixed height and
the avatar sits in mid-air.

**A maximum length and weight.** A movement MUST stay within a maximum
duration and a maximum file weight.

**Loops close.** In a loop, the first and the last frame MUST be the same.

**Three avatars.** A movement MUST play on three test avatars, one short, one
tall and one broad, with no foot sinking into the floor or floating above it.

### Which licences let it in

**Permitted licences.** A movement MUST carry CC0, CC-BY or CC-BY-SA, or be
made or commissioned by the house with a written assignment.

**Excluded licences.** A movement MUST NOT come from Mixamo, which forbids
redistributing the files and any use for AI; MUST NOT carry any non-commercial
licence; and MUST NOT carry a licence that allows use but not redistribution.
A movement with no written licence is refused.

**Where it came from.** A movement MUST record its source, its author, the
date the licence was checked and the sha256 of the original.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| MOV-001 | One movement per file | — | by hand, at the pull request |
| MOV-002 | A complete human skeleton | — | by hand, at the pull request |
| MOV-003 | No scale hints | — | by hand, at the pull request |
| MOV-004 | The hip the engine understands | the movements plan (Oracle, 2026-10); the engine reads the hip as `mixamorig:Hips` | by hand, at the pull request |
| MOV-005 | A maximum length and weight | the movements plan (Oracle, 2026-10) | by hand, at the pull request |
| MOV-006 | Loops close | — | by hand, at the pull request |
| MOV-007 | Three avatars | the movements plan (Oracle, 2026-10) | by hand, at the pull request |
| MOV-008 | Permitted licences | [CC0](https://creativecommons.org/publicdomain/zero/1.0/), [CC-BY](https://creativecommons.org/licenses/by/4.0/), [CC-BY-SA](https://creativecommons.org/licenses/by-sa/4.0/) | by hand, at the pull request |
| MOV-009 | Excluded licences | [Mixamo FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) | by hand, at the pull request |
| MOV-010 | Where it came from | `STD-010` | by hand, at the pull request |

## Why

The Bazar lets people download the file, so the licence must allow
redistribution. A movement that breaks the skeleton, the hip or the loop
looks broken on someone's avatar, and one nobody can trace cannot be shown
to be ours to share.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-010` | Licensing | the licences the house may build on |
| `STD-050` | What an agent in a world reads | a movement handed to an agent must be CC0 |
