---
title: "Platform ranks"
id: "STD-003"
uid: ""
type: documentation
subtype: standard
status: draft
version: "3.2.1"
created: "2026-04-07T12:34:04Z"
created_source: "git:f765b99"
created_confidence: inferred
updated: "2026-09-26T20:00:00+02:00"
author: "Centinela-01"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, ranks, permissions, digital-goods, RBAC]
license: "CC0-1.0"
threshold: governed
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# Platform ranks

> **Summary:** Six ranks, lowest first: Nomad, Citizen, Pilgrim, Vernacular,
> Archon, Oracle. Each holds every permission of the ranks below it, and a
> member's rank is read from what they have done, never from what they claim.
> **Epistemic:** What each rank may do, what earns it, and where the
> platform reads it from.
> **Pragmatic:** Build or audit a permission check without asking who is
> allowed to do what.
> **Audience:** Agents · Oracles

**Binds:** the Numinia digital-goods platform — authentication, character
sheets, creator panel, administration.
**Does not bind:** access to the archive; what a rank means in the world;
payment; custody and identity checks.

## Rules

None of these rules is required by law; each is our choice, resting on a
security standard others already audit against.

### How rank is held

**Ranks add up.** A rank MUST grant every permission of the ranks below it,
as a role hierarchy does in the role-based access control model of the
United States standards institute. One ladder is easy to audit: what someone
may do is their rank and everything under it. Our choice; the law does not
require it.

**Rank is read, never declared.** The platform MUST work out a member's rank
on its own server, from their sign-in, their character sheet and their
purchases, never from what the member's device claims. The open web security
project's verification standard asks the same, because a permission checked
out of the member's reach cannot be self-granted. Our choice; the law does
not require it.

**The ranks that follow the evidence move by themselves.** Between Nomad and
Citizen, and between Citizen and Pilgrim, rank MUST follow the evidence in
both directions, with no one's hand involved. Our choice; the law does not
require it.

### Who may move whom

**No more than four Oracles.** The list of Oracles MUST NOT name more than
four people. Our choice; the law does not require it.

**Nobody acts upward.** An Archon MUST NOT act on another Archon or on an
Oracle, and nobody can ban an Oracle, in storage, through the programming
interface or on screen. Separation of duties and least privilege, in the
federal security controls, are what stop capture; since an Oracle cannot be
banned, every privileged action an Oracle takes is logged instead. Our
choice; the law does not require it.

**Moving someone by hand has a ceiling.** An Archon MAY promote or demote
anyone up to Vernacular, and an Oracle every rank except Oracle; Oracles
change only when the list of Oracles is edited. Our choice; the law does not
require it.

**The top two are judged, not counted.** A promotion to Vernacular or Archon
MUST be decided against the profiles below, never against how much someone
has produced. Our choice; the law does not require it.

A Vernacular is an agent fully at home in Numinia's culture. They inhabit
the system with fluency and depth, and know its structures from within. They
work with autonomy and expertise in their own field, and collaborate closely
with Numinia.

An Archon is all of that, and also leads other agents. They make decisions
and take initiatives that affect everyone, and hold responsibility for the
system, not only for their own work. The rank carries social and
organisational influence.

> Technical depth does not by itself make an Archon. The Archon has to
> relate to others in a way that goes beyond doing the work: they guide,
> mediate and represent. An agent who does not want that role should not
> hold the rank, however exceptional their expertise. *Prepared with
> Christian Märtens.*

### What each rank adds

A Nomad has signed in, with a wallet or a social account. They may browse
the public gallery, download what belongs to everyone, search, read their
own character sheet, keep favourites and see their collections.

A Citizen has finished Session Zero and chosen a guild and a faction. They
may edit their own sheet, and hold loot and an inventory.

A Pilgrim has bought any digital good. They may open what they bought, take
part in the burn ritual and the seasonal adventures, and see their purchase
history.

A Vernacular was promoted by an Archon or an Oracle. They may upload, edit
and delete their own work, see its statistics, and use the creator panel and
a portfolio.

An Archon was promoted by an Oracle. They may act on any piece of work, run
seasons, read the global statistics and the audit log, publish to permanent
storage, ban and unban, and appoint Vernaculars.

An Oracle is named on the list of Oracles. They may appoint and remove
Archons, change what each rank may do, and configure the system. They cannot
be banned.

### Keeping this page true

**The permissions and this page move together.** A change to the platform
that alters what a rank may do MUST update this standard in the same
change. The security verification standard asks for written authorization
rules; this page is them, so a reviewer can test the code against it. Our
choice; the law does not require it.

This standard is over its word budget: the six rank profiles are what a
reviewer tests the code against, and cannot move elsewhere.

## Check

Each rule, its code, its source and its check. None is law. Then where the
platform reads each rank from.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| RNK-001 | Ranks add up | [NIST role-based access control, role hierarchies](https://csrc.nist.gov/projects/role-based-access-control) — our choice | by hand: the permissions live in the platform's code, outside this archive; its test suite is the check |
| RNK-002 | Rank is read, never declared | [OWASP ASVS 5.0, V8.3.1, authorization enforced at a trusted service layer](https://owasp.org/www-project-application-security-verification-standard/) — our choice | by hand: the platform's test suite |
| RNK-005 | The ranks that follow the evidence move by themselves | — our choice | by hand: the platform's test suite |
| RNK-003 | No more than four Oracles | — our choice | by hand: the platform's test suite |
| RNK-004 | Nobody acts upward | [NIST SP 800-53 rev. 5, AC-5 separation of duties, AC-6 least privilege, AC-6(9) log use of privileged functions](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) — our choice | by hand: the platform's test suite; nothing yet checks that Oracle actions are logged |
| RNK-006 | Moving someone by hand has a ceiling | — our choice | by hand: the platform's test suite |
| RNK-008 | The top two are judged, not counted | — our choice | by hand: an Archon or an Oracle, at each promotion |
| RNK-007 | The permissions and this page move together | [OWASP ASVS 5.0, V8.1.1, authorization documentation](https://owasp.org/www-project-application-security-verification-standard/) — our choice | by hand: a platform pull request that changes the permissions without a change here |

| Rank | Earned by | Read from | Adds |
|---|---|---|---|
| Nomad | login with wallet or social account | `wallet_session` / `session` cookie | public gallery, CC0 downloads, search, own sheet read-only, favourites, NFT collections |
| Citizen | completes Session Zero — guild and faction chosen | `data/characters/{address}.md` has both | edit own sheet; loot and inventory; Session Zero |
| Pilgrim | purchases any digital good | `data/seasons/*-progress.json` or `data/purchases/` | purchased premium content; burn ritual; seasonal adventures; purchase history |
| Vernacular | promoted by an Archon or Oracle | `data/system/rank-overrides.json` | upload, edit, delete own assets and see their statistics; creator panel; portfolio |
| Archon | promoted by an Oracle | `data/system/rank-overrides.json` | any asset; seasons; global statistics; audit log; sync to R2 / IPFS / Arweave; ban and unban; appoint Vernaculars |
| Oracle | listed in the overrides file | `data/system/rank-overrides.json` | appoint and remove Archons; edit the matrix; system configuration; cannot be banned; every privileged action logged |

## Why

A rank the member declares is a permission the member grants themselves.
Reading rank from evidence ties every permission to an act, and resting each
rule on a published security standard lets an auditor check us with a list
they already hold. The ceiling on Oracles, and the log of what they do, keep
governance from being captured inside the product. Nomad reads, Citizen
edits their identity, Pilgrim buys, Vernacular creates, Archon moderates,
Oracle governs.

## References

| ID | Title | Relation |
|---|---|---|
| `CAN-004` | You are what you are doing | what each rank is, and rank as one of the six attributes |
| `STD-033` | Every charge delivers something | payment, which this standard does not bind |
