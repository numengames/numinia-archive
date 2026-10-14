---
id: "STD-052"
uid: ""
title: "Organisation permissions"
type: standard
subtype: register
status: draft
version: "0.1.0"
created: "2026-10-14T23:36:00+02:00"
updated: "2026-10-14T23:36:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Products and services"
tags: [standards, register, organisations, roles, permissions, templates]
license: "CC0-1.0"
related: ["STD-051", "ADR-071", "ADR-070", "MIS-179"]
derived_from: "PRI-004"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Organisation permissions

> **Summary:** What a role in an organisation can carry: sixteen
> permissions, the acts no role carries because they belong to the owners,
> the settings for the house's access, and the roles an organisation is born
> with. A register: the rules that read it are in *Organisation roles*
> (`STD-051`).
> **Epistemic:** Which permissions can a role in an organisation carry?

## Permissions

The key is the platform's name for a permission; each site translates the
label. A role with no permission is a title.

| Key | Label | What it lets a member do |
|---|---|---|
| `administrator` | Administrator | everything in this table, and nothing reserved to owners |
| `manage-organization` | Manage the organisation | edit its page, cover, links, places and visibility, how people join, the words it uses and the pieces it switches on |
| `view-organization-log` | View the log | read who did what in the organisation, and when |
| `manage-roles` | Manage roles | create, edit, order, give and take away the roles below their own highest role |
| `invite-members` | Invite | send invitations and accept people who ask to join |
| `remove-members` | Remove members | take out a member below them, who may come back |
| `ban-members` | Ban | take out a member below them for good, saying why |
| `mute-members` | Mute | silence a member below them for a while in the organisation's worlds |
| `create-rituals` | Publish rituals | create rituals and change their own |
| `manage-rituals` | Manage rituals | change, move or cancel any ritual |
| `enter-worlds` | Enter the worlds | enter the organisation's worlds when they are for members only |
| `build-in-worlds` | Build | place and move things in the organisation's worlds |
| `start-stop-worlds` | Start and stop worlds | start and stop the organisation's worlds, which spends its balance |
| `create-worlds` | Create worlds | create worlds paid from the organisation's balance |
| `view-balance` | View balance and invoices | see the balance, the daily use and the invoices |
| `manage-balance` | Top up and billing | pay top-ups and change the billing details |

## Only owners

No role carries these; every owner holds them all:

- deleting a world, seeing or changing its code, and downloading it;
- closing the organisation or handing it over;
- naming or removing owners;
- setting the house's access.

An organisation holds at most 250 roles besides the base role, which every
member holds and nobody can delete.

## The house's access

| Setting | What it means |
|---|---|
| `alpha` | during the alpha, in every organisation: the house's staff enter with an administrator's reach, and the organisation cannot change it |
| `always` | the house's staff enter when they need to |
| `on-request` | the house asks; an owner signs a leave that lasts 72 hours and closes by itself |
| `never` | the house does not enter, save what the law requires — illegal content or an attack — with the reason signed, a second Oracle, and the owners told afterwards |

## The roles an organisation is born with

Each organisation changes them afterwards as it likes. Roles from the top of
the list down; the base role is always last.

| Template | For | Roles, and what each carries |
|---|---|---|
| Alpha | every organisation the house opens during the alpha | Administration: `administrator` · base role: `enter-worlds` |
| Team | a studio or a company that pays for worlds | Administration: `administrator` · Finance: `manage-balance` · Member: `enter-worlds`, `start-stop-worlds`, `build-in-worlds` · base role: `view-balance` |
| Community | a congress, a class, an open group | Administration: `administrator` · Moderation: `remove-members`, `ban-members`, `mute-members`, `manage-rituals` · base role: `enter-worlds` |
