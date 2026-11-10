---
id: "DES-020"
uid: ""
title: "The avatar format and how a person chooses an avatar: keep VRM, fix the picker's licence gate"
type: design
status: draft
version: "0.1.0"
created: "2026-11-10T14:00:00Z"
updated: "2026-11-10T14:00:00Z"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
section: "Technology"
tags: [design, engine, numinia-engine, avatars, vrm, gltf, study]
license: "CC0-1.0"
related_missions: ["MIS-0300"]
related: ["MIS-0299", "PRI-016", "PRI-017", "PRI-018"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# DES-020 — The avatar format and how a person chooses an avatar: keep VRM, fix the picker's licence gate

> **Summary:** Numinia Engine wears VRM avatars. This page weighs VRM 1.0,
> VRM 0.x and plain glTF with a humanoid rig on six criteria, from primary
> sources and from the engine's own files, and recommends keeping VRM.
> **Epistemic:** Is VRM still the right avatar format, and what should the
> choosing flow look like on top of it?
> **Pragmatic:** The next avatar missions are written against VRM and the
> three-step flow in section 3; the Oracle answers one question in the
> decisions backlog.
> **Audience:** Agents · Oracles

> **A design describes what is not yet built.** It is not a decision, not a
> mission, and not a description of what exists. Engine facts are read at
> `numinia-engine` commit `8685dbe2` (origin/main, 2026-11-10).

---

## 1. Current state

**What is measured here.** The three house avatars (`activos/avatares/`, all
VRM 0.x, CC0, one mesh each) weigh 189 080, 250 228 and 235 824 bytes, with
2 724, 2 880 and 2 130 triangles. Each carries one WebP texture of 62–109 kB
and is packed with the glTF extensions `EXT_meshopt_compression` and
`EXT_texture_webp`; gzip saves a further 26–27 % (own measurement, files read
from the engine commit above). All three still hold 16 face shapes, which
the engine drops on load except the mouth-open one
(`packages/render/src/avatares-vrm.ts:98`). At first cut they weighed four to five times as much, 974–1 142 kB, and
`limits.json:102` still publishes that; the entry is stale. The 38 animation files (3.4 MB together) are VRMA clips, fetched
only when played. **Not measured:** frame time and heat on a mid-range phone
or a Quest; no device was available. The engine's phone cap (12 VRMs at once,
`packages/render/src/avatares-politica.ts:6`) is still the estimate.

**How a person chooses today (built, row H10).** The engine has a picker
(`apps/plaza/avatar.ts`): the world's default avatar from its card, or one of
the house three, or up to eight avatars the world brings in its own zip
(`packages/server/src/avatares-mundo.ts:20`, CC0 or CC BY with credit), or
a `.vrm` the person drops. The choice is saved with their identity and
reaches everyone. With no choice, a player gets a house avatar by entity id
(`packages/render/src/avatares-politica.ts:72`).

**Where it breaks for a person's own file.** The dropped file must pass
`revisarAvatar` (`apps/plaza/avatar.ts:120`), which refuses anything not CC0.
For a VRM 1.0 file it accepts CC0 only if `otherLicenseUrl` points at the CC0
deed (`packages/server/src/vrm.ts:59`). VRM 1.0's licence field holds the VRM Public License URL[2], so CC0 can only be
said in `otherLicenseUrl`. An avatar made in VRoid Studio, the usual tool for
a person's own avatar[5][6], carries the licence its maker chose and is refused
unless that is CC0. The refusal reads «the house library only takes CC0» — a
rule meant for the catalogue, applied to a private choice.

---

## 2. Future state

### 2.1 The six criteria

| Criterion | VRM 1.0 | VRM 0.x | glTF + humanoid rig |
|---|---|---|---|
| **Load cost** | Same container: a glTF binary with an extension[1]. | Same. Measured: 189–250 kB (above). | Same bytes, minus the VRM extension JSON (a few kB). [unverified] The weight is mesh, shapes and texture, not the format. |
| **Expressions and look-at** | Preset expressions (`aa`, `happy`…)[17], a look-at component[19]. | Morph presets in `blendShapeMaster`[3]. The engine reads `aa` from both (`avatares-vrm.ts:51`). | No ratified standard. Khronos has a draft (`KHR_character_*`, PR open)[10], not among the ratified extensions[9], and its own slides call the base «prone to change»[8]. |
| **Open licence and tooling** | Licence in the file, with who may wear it (`avatarPermission`) and credit rules[2]. VRoid's dress-up export writes 1.0 only[6]; Blender add-on exists[12]. | Licence name in the file, `CC0` among the options[3]. Called «deprecated» by VRoid[5], which still imports it and exports it from its editor[6]. | Free of VRM's licence text, but also carries no licence or wearer permission in the file. [unverified] |
| **CC0 avatars to take** | The open registry lists 1 274 CC0 VRM entries and 3 000 CC BY, without saying which version[13][14] (own count). | Our three are 0.x. | None counted. Ready Player Me, the best-known source of plain GLB avatars, closed on 31 January 2026[15]. |
| **What the engine reads** | Yes. `infoVrm` reads both versions (`vrm.ts:39`); animations retarget by version (`avatares-vrm.ts:118`). | Yes (all house files). | No. Upload refuses a `.glb` without the VRM extension (`packages/net/src/ficheros.ts:93`); the animation loader, the mouth and the humanoid all go through VRM. |
| **Cost of switching** | None. | None; new house avatars could be 1.0. | The loader, the 38 animations' retarget, the mouth and every check rewritten; wait for Khronos first. [unverified: no estimate measured] |

Another web world, Hyperfy, takes VRM 0.x and 1.0 and ranks avatars by
triangles, meshes and size — its best tier is 4 000 triangles, one mesh,
5 MB[11]. The three house avatars fit it.

### 2.2 What the evidence says

- **VRM is the avatar format in use.** It is a glTF extension for humanoids[1]
  that Khronos and the VRM Consortium are working to fold into glTF itself
  from October 2024[7]; a July 2026 Khronos deck says both groups are making steady progress on the
  extension set, with the example code «prone to change» before release
  candidates[8]. Choosing plain glTF today would
  mean choosing the format VRM is being merged into, before it exists.
- **Moving to 1.0 does not need a switch.** The engine reads both. What 1.0
  gives a person is the tool: VRoid's dress-up export writes only 1.0[6].
- **The size win is not a format question.** Packing and WebP took the house
  files to a fifth or a quarter of their first weight. Dropping the 16 shapes unused by the
  engine would shrink them further; it is the same for any format.

### 2.3 The flow to build

1. **A world's default** (built). The card names one avatar; MIS-299 makes the
   Nomad the default of both templates. The Nomad file in the data repository
   is CC BY, 12 755 triangles and 3.9 MB[^mis299], so it needs reducing first.
2. **A person's choice from a list** (built). Keep it; check that a person's choice follows them
   into other worlds.
3. **A person's own file** (to fix). Replace the CC0 gate with the check that
   protects the others: size and triangles as today, plus the file's own
   permission to be worn (`avatarPermission: everyone` in 1.0[2]; `allowedUserName`
   in 0.x, as the house files carry it). The licence
   shown beside an avatar a person brought is theirs to state, not the house's.

[^mis299]: `missions/MIS-0299-make-the-nomad-the-avatar-every-new-world-starts-with.md`, section 2.

### 2.4 Recommendation

Keep VRM as the engine's avatar format, read 0.x and 1.0, make new house
avatars 1.0, and build step 3. Do not convert the three house files. Review
this page when Khronos ratifies a character extension.

---

## 3. Decision for the Oracle

One question in the decisions backlog: keep VRM, and let a person
wear a VRM whose own file permits it, even when it is not CC0.

---

## Sources

[1] https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/README.md — VRMC_vrm 1.0 specification  
[2] https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/meta.md — VRMC_vrm 1.0 meta (licence fields)  
[3] https://github.com/vrm-c/vrm-specification/blob/master/specification/0.0/README.md — VRM 0.x specification  
[5] https://vroid.pixiv.help/hc/en-us/articles/39513464329881-What-is-VRM — VRoid FAQ: What is VRM?  
[6] https://vroid.pixiv.help/hc/en-us/articles/39513600013721-Q-Can-I-export-in-VRM-0-x-format — VRoid FAQ: export VRM 0.x?  
[7] https://khronos.org/news/press/the-khronos-group-and-vrm-consortium-collaborate-to-advance-international-standardization-of-the-vrm-3d-avatar-file-format — Khronos + VRM Consortium press release  
[8] https://metaverse-standards.org/wp-content/uploads/MSF-3D-Assets-BOF-SIGGRAPH-Jul26.pdf — MSF 3D Assets BOF, SIGGRAPH July 2026  
[9] https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos — Khronos ratified glTF extensions  
[10] https://github.com/KhronosGroup/glTF/pull/2512 — Khronos Avatar Extensions Phase 1 (PR 2512)  
[11] https://docs.hyperfy.io/avatars — Hyperfy: Avatars  
[12] https://github.com/saturday06/VRM-Addon-for-Blender — VRM Add-on for Blender  
[13] https://github.com/ToxSam/open-source-avatars — Open Source Avatars registry  
[14] https://raw.githubusercontent.com/ToxSam/open-source-avatars/main/data/projects.json — Open Source Avatars projects.json  
[15] https://learn.framevr.io/blog/rpm-closure — Frame: Ready Player Me closure  
[17] https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/expressions.md — VRMC_vrm 1.0 expressions  
[19] https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/lookAt.md — VRMC_vrm 1.0 lookAt
