---
id: "SYS-005"
uid: ""
title: "Digital resources: the first CC0 intake"
type: documentation
subtype: register
status: draft
version: "0.1.0"
created: "2026-09-18T15:00:32Z"
updated: "2026-09-18T15:00:32Z"
created_source: declared
created_confidence: exact
author: "ursa"
owner: "oracle"
provenance: ai-assisted
guild: "Alchemists"
territory: "Archive"
license: "CC0-1.0"
tags: [resources, catalogue, provenance, licensing, migration]
related: ["CAN-005", "STD-010"]
---

# Digital resources: the first CC0 intake

> **Summary:** All 32 legacy catalogue entries were reviewed. Two originals
> enter this CC0 intake; 30 remain outside it with named uncertainties.
> **Epistemic:** Distinguish a catalogue label, the evidence of a rightsholder's
> grant, a resource's identity and the exact bytes being preserved.
> **Pragmatic:** Retrieve the admitted originals and identify the evidence
> needed before each other candidate can enter a later intake.
> **Audience:** Agents · Oracles

## 1. Scope

The Oracle selected all candidates and limited this intake to verified CC0.
The six asset arrays at [the reviewed legacy revision](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/projects.json)
contain 9 avatars, 9 models, 3 worlds, 2 audio tracks, 1 video and 8 images.
No user records, moderation, characters, billing or private operational data
are in scope. A pending entry is not proof of infringement or lack of permission.

This is the canonical record of the intake and its provenance findings.
The depot keeps the files and their travelling notices, not another editable
master catalogue. The websites still read the old catalogue: this cut does
not migrate consumers or remove any original. A general catalogue contract
and consumer cutover remain separate work; original metadata stays available
at its pinned source instead of being silently discarded or normalised.

## 2. Resources

### Avocado

- Resource ID: `ndg-019d4075-9ece-7d3e-aafa-41f81370eb63`.
- Intake: included; licence CC0-1.0. Creator: Polygonal Mind.
- Legacy version: `0.1.0`. Legacy canonical reference:
  `ndg:vrm:019d4075-9ece-7d3e-aafa-41f81370eb63:v0.1.0`.
  The upstream VRM says version `1.0`. These are distinct declarations;
  no invented version migration reconciles them here.
- [Original catalogue](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/avatars/numinia-avatars.json).
- [Unchanged VRM](https://raw.githubusercontent.com/numengames/numinia-assets/56b28309a9cfb70e7e8cc813480b38c233f4f7ef/content/avatars/ndg-019d4075-9ece-7d3e-aafa-41f81370eb63.vrm).
- Size: `1253352` bytes.
- SHA-256: `4f8a44907bb2232178514f230aedfc4d344600287e236724a0b660420f2d995e`.

**Evidence.** The bytes match
[Polygonal Mind's official VRM](https://github.com/PolygonalMind/100Avatars/blob/ff07c2ad0017819c4e5366656ee1e5bcc4029bd4/100Avatars_088/100Avatars_088_Avocado.vrm)
exactly. The embedded fields state `88_Avocado`, `Polygonal Mind`, `CC0` and
commercial usage allowed. The rightsholder's
[release v24.02.1](https://github.com/PolygonalMind/100Avatars/releases/tag/v24.02.1)
expressly offers the avatars under CC0 and includes VRM files. Its
[open-source initiative](https://github.com/PolygonalMind/initiative-opensource-release#the-opensource-initiative)
also lists the first avatar round under CC0.

**Disclosed inconsistency.** The
[older upstream licence notice](https://github.com/PolygonalMind/100Avatars/blob/ff07c2ad0017819c4e5366656ee1e5bcc4029bd4/CCLicense.md)
says CC-BY-4.0; the README asks not to resell unmodified avatars. Those notices
still exist. This intake relies on the specific later CC0 offer and the matching
CC0-annotated VRM, not on a claim that every upstream document agrees.
No embedded field was changed. No thumbnail is imported or cleared by this review.

### Pot Vapor 02

- Resource ID: `pot-vapor-02`, preserved as a legacy identifier.
- Intake: included; licence CC0-1.0. Original creator: Polygonal Mind.
- Legacy version: `1.0.0`. Legacy canonical reference:
  `ndg:glb:pot-vapor-02:v1.0.0`.
  This historical string is preserved, not asserted to satisfy a UUID-only rule.
- [Original catalogue](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/assets/numinia-assets.json).
- [Unchanged GLB](https://raw.githubusercontent.com/numengames/numinia-assets/56b28309a9cfb70e7e8cc813480b38c233f4f7ef/content/models/pot-vapor-02.glb).
- Size: `407284` bytes.
- SHA-256: `330605050f1786591a1f2f65f92ea04be5e29277577cf8ce36d29e83d4b77390`.

**Evidence.** The source is `Structure_Vapor_Pot_02_Art` from the
[Chromatic Chaos VHS pack](https://github.com/PolygonalMind/initiative-opensource-release/tree/main/PolygonalMind_OpenSource/2302_ChromaticChaosVHSAssetPack),
covered by Polygonal Mind's explicit
[CC0 offer](https://github.com/PolygonalMind/initiative-opensource-release#the-opensource-initiative).
The embedded textures match the official source's Git blob hashes:

- `Atlas_Pot_01_Normal`: `a4c573b6c6708ba04edc1bbd7f9f6f42a2a07d48`.
- `Atlas_Pot_01_Albedo`: `bdfc0a05f148517f64b61323c87e115c55005cb5`.
- `Atlas_Plants_01_Albedo`: `4263c8b1d0cb6d19331a8e0bb8fe243b38dbd81c`.

The upstream FBX blob is `68b1370d646aebcd2a081b45b7ce8b7a0dd198ad`.
The intake comparison found 76 unique vertex positions matching after the
axis change `(x,y,z)` to `(x,z,-y)`, rounded to five decimals. This identifies
the source; it does not assert identical topology, UVs or whole FBX/GLB bytes.
The GLB itself remains byte-identical to the legacy copy, whose catalogue says CC0.

**Attribution correction.** The catalogue credits `PabloFMM`; that remains a
historical catalogue credit, not original authorship. The converter's identity
is not independently established. The original creator permits modification
under CC0; this intake does not invent an additional grant or claim ownership.
No thumbnail is imported.

### Candidates not included

These 30 candidates stay at their sources, with their IDs unchanged. A source
link names the reviewed catalogue revision, not a new publication of the media.

#### Avatars

- **Numinia Starter Avatar 01** — `starter-avatar-01`. The VRM declares CC_BY; no newer rightsholder CC0 offer was established. The CC-BY version remains unspecified. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/avatars/numinia-avatars.json).
- **Avatar Arla** — `avatar-arla-mncdhz3l`. The VRM declares CC_BY; no newer rightsholder CC0 offer was established. The CC-BY version remains unspecified. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/avatars/numinia-avatars.json).
- **Avatar Procyon** — `ndg-019d3ded-a1dd-7e0e-aeff-cb155bdff3d8`. The VRM declares CC_BY; no newer rightsholder CC0 offer was established. The CC-BY version remains unspecified. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/avatars/numinia-avatars.json).
- **Avatar Lyra** — `ndg-019d3e6c-129a-701e-95fc-ce1754d5c917`. The VRM declares CC_BY; no newer rightsholder CC0 offer was established. The CC-BY version remains unspecified. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/avatars/numinia-avatars.json).
- **AU_Numen_Cthulhu_Black_Final_Signed** — `ndg-019d3f89-3aca-7631-b541-054596bb1de6`. The VRM declares Redistribution_Prohibited and disallows commercial use; permission needs clarification. The Oracle is checking this case. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/avatars/numinia-avatars.json).
- **Avatar Senet 2026** — `ndg-019d4060-770e-777c-ab25-aa7f2f198825`. The VRM declares CC_BY; no newer rightsholder CC0 offer was established. The CC-BY version remains unspecified. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/avatars/numinia-avatars.json).
- **Avatar AII Surprise 0.1.0** — `ndg-019d4090-1aa3-7e61-ba8d-7c7d6ef532c3`. The VRM declares CC_BY; no newer rightsholder CC0 offer was established. The CC-BY version remains unspecified. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/avatars/numinia-avatars.json).
- **Curio Tux** — `ndg-019d40a1-f62b-7cd7-85bc-50904d915208`. The VRM declares Redistribution_Prohibited and disallows commercial use; permission needs clarification. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/avatars/numinia-avatars.json).

#### Models

- **Starter Chair 01** — `starter-chair-01`. The catalogue labels this CC0, but inspected provenance does not establish the rightsholder grant for the complete object. The node is named Tables; identification also needs checking. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/assets/numinia-assets.json).
- **Table 0.1.0** — `ndg-019d3e66-c8d0-7fd2-b5a8-fca1af183e43`. The catalogue labels this CC0, but inspected provenance does not establish the rightsholder grant for the complete object. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/assets/numinia-assets.json).
- **Logo Khepri 0.1.3** — `ndg-019d3e75-7731-7261-913d-842515f90190`. Brand review required: the catalogue label does not settle the logo’s copyright grant or trademark permission. This review does not revoke any prior valid grant. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/assets/numinia-assets.json).
- **Nerdearla 0.1.4** — `ndg-019d3f12-4dc2-750a-b79d-62d663c3186f`. The catalogue labels this CC0, but inspected provenance does not establish the rightsholder grant for the complete object. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/assets/numinia-assets.json).
- **emote_floating** — `ndg-019d3f1b-9334-70aa-b946-0d516b241f56`. Animation names suggest Mixamo provenance; a verified CC0 chain is missing. A name alone proves neither permission nor infringement. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/assets/numinia-assets.json).
- **portfolio 0.1.4** — `ndg-019d49ff-3146-7b5b-a890-79d4fbeb62f5`. The catalogue labels this CC0, but inspected provenance does not establish the rightsholder grant for the complete object. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/assets/numinia-assets.json).
- **Symposyum Space 0.1.4** — `ndg-019d4a08-8f9a-7228-a291-632441b8bb3f`. The catalogue labels this CC0, but inspected provenance does not establish the rightsholder grant for the complete object. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/assets/numinia-assets.json).
- **Cognitive Map 0.1.0** — `ndg-019dac82-f222-7a9d-b3a0-ea46901b97f8`. The catalogue labels this CC0, but inspected provenance does not establish the rightsholder grant for the complete object. An embedded texture credits Christian Märtens; that may be inherited metadata. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/assets/numinia-assets.json).

#### Worlds

- **Emotes** — `emotes-mncdnk6r`. The embedded author is Hyperfy, not the catalogue credit PabloFMM. The package includes animations with Mixamo names. Clarify the grant for script, model and animations; no bundled code was executed. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/worlds/numinia-worlds.json).
- **Emotes** — `emotes-mncgsjjr`. The embedded author is Hyperfy, not the catalogue credit PabloFMM. The package includes animations with Mixamo names. Clarify the grant for script, model and animations; no bundled code was executed. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/worlds/numinia-worlds.json).
- **Easter Egg 02** — `ndg-019d3e93-f137-7621-96b3-2e9e72f35a22`. The catalogue CC0 label has no independently established rightsholder grant for this package. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/worlds/numinia-worlds.json).

#### Audio

- **Ambient Sound of Numinia** — `ndg-019d3e6a-2288-7ed4-bcbc-abcdc1a76035`. The two MP3 records contain identical bytes, with no artist or CC0 grant established from their tags. Clarify the rights to composition and recording. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/audio/numinia-audio.json).
- **Audio_Veel-Tark** — `ndg-019d3e99-1199-7056-91d0-3b13ed4377b4`. The two MP3 records contain identical bytes, with no artist or CC0 grant established from their tags. Clarify the rights to composition and recording. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/audio/numinia-audio.json).

#### Video

- **Build What Feels Good** — `ndg-019d3e52-cb5a-748b-857b-11fbe88d7c6c`. The video was matched by SHA-256 to Ryan Anderson’s The Memes #125, with a primary CC0 offer. That offer excludes third-party rights; the metadata identifies Pepe and this cut does not clear its third-party/audio scope. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/video/numinia-video.json).

#### Images

- **favicon** — `ndg-019d3fae-5511-71b4-8e4b-c455d7513e3f`. No rightsholder CC0 grant was independently established; the catalogue supplies no creator. XMP credits Pablo F.M and names the Khepri logo: reconcile the earlier publication with the brand policy, rather than automatically relabelling it. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/images/numinia-images.json).
- **Stellar Circle** — `ndg-019d4067-c52d-7fcc-96ce-d44f3e725ff4`. No rightsholder CC0 grant was independently established; the catalogue supplies no creator. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/images/numinia-images.json).
- **Neo-Atlantists** — `ndg-019d407e-9851-70d5-ae81-c5d99333dc15`. No rightsholder CC0 grant was independently established; the catalogue supplies no creator. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/images/numinia-images.json).
- **Image Alchemist 01** — `ndg-019d408c-335a-79aa-901a-5118e55b9c4d`. No rightsholder CC0 grant was independently established; the catalogue supplies no creator. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/images/numinia-images.json).
- **Image Exegete 02** — `ndg-019d409f-efb6-7808-a217-4c736e0bacb9`. No rightsholder CC0 grant was independently established; the catalogue supplies no creator. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/images/numinia-images.json).
- **med 1** — `ndg-019d42d5-734e-7888-aa62-fc8fb02f6507`. No rightsholder CC0 grant was independently established; the catalogue supplies no creator. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/images/numinia-images.json).
- **med (2)** — `ndg-019d42e2-31cf-7ce1-8737-ae554a50ad7d`. No rightsholder CC0 grant was independently established; the catalogue supplies no creator. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/images/numinia-images.json).
- **Avatar Senet** — `ndg-019dac7e-fbce-7858-b1d4-38c7b0eb0c28`. No rightsholder CC0 grant was independently established; the catalogue supplies no creator. XMP credits Christian Märtens; confirm whether this is authorship or inherited metadata. [Source](https://github.com/PabloFMM/numinia-digital-goods-data/blob/952a01987b2adefe305864956d59e8bf8cc9e5de/data/images/numinia-images.json).

## 3. How to verify it

The source revision is `952a01987b2adefe305864956d59e8bf8cc9e5de`. The admitted objects are pinned to
`numinia-assets` commit `56b28309a9cfb70e7e8cc813480b38c233f4f7ef`.

At that revision, install the depot's checker requirements, then run
`python -m reuse lint` and `python -m unittest discover -s tests -v`.
The tests pin inventory, SHA-256 and size, reject unexpected media, check that
the GLB containers need no external buffers/textures, and preserve Avocado's
embedded licence. A deliberately altered byte in a temporary copy is rejected.
REUSE verifies declarations, not ownership or the legal validity of a grant.

Compare Avocado directly with the pinned upstream file. For Pot Vapor compare
the texture blob hashes and source geometry. Review the primary CC0 offers;
a checksum cannot create rights. The depot notices travel with the originals.

## 4. Accuracy and boundaries

Review completed on 2026-09-18; inventory reconfirmed at 2026-09-18T15:00:32Z.
All 32 distinct catalogue entries were covered. Only two originals enter this
cut. The other 30 are not declared illegal, non-owned or permanently excluded;
they need the specified clarification. The source files and their valid prior
grants remain untouched.

No thumbnail, private operational record, website consumer or legacy repository
is migrated. The six CC-BY avatars stay outside this CC0-only intake even though
CC-BY can permit other uses. Copyright, trademark permission, public visibility
and privacy remain separate. The old uploader supplied CC0 as a default label
in some paths; that is not enough to establish a rightsholder grant.
