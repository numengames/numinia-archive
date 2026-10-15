---
id: "ADR-071"
uid: ""
title: "An organisation runs its own roles, as a Discord server does, and its members see who is connected"
type: adr
status: draft
version: "0.1.1"
created: "2026-10-14T23:36:00+02:00"
updated: "2026-10-15T11:20:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [decisions, adr, organisations, roles, permissions, presence, privacy, multi-tenant]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "Each organisation on numinia.com keeps its own ordered list of roles, as a Discord server does: permissions add up, owners stand above every role and alone do what cannot be undone, nobody acts at or above their own highest role or changes their own roles, roles are read on the server at every request and every change is written down. During the alpha the house's staff enter every organisation with an administrator's reach; afterwards each organisation decides. Members see who is connected through four statuses — online, idle, do not disturb, invisible — shown only to people who share an organisation, after a first question with nothing preselected, and nothing but the present status is kept."
amends: ["ADR-070", "STD-003"]
related: ["STD-051", "STD-052", "STD-053", "MIS-179", "MIS-157", "STD-035", "STD-034", "STD-029", "STD-042", "SYS-015", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-071 — An organisation runs its own roles, as a Discord server does, and its members see who is connected

> **Summary:** Each organisation on numinia.com runs its own roles, as a
> Discord server does, and its members see who is connected. The four roles
> of a team (`ADR-070`) become the roles a team is born with, owners keep
> what cannot be undone, and the house enters every organisation during the
> alpha; afterwards each organisation decides.
> **Epistemic:** The Oracle asked for roles very like Discord's, managed by
> each organisation, a list of who is connected and four statuses, copied
> rather than invented. This record says what is copied, from whom, what is
> not and why, and selects the published standards the rules follow, as
> `MIS-157` asks before any code.
> **Pragmatic:** Three standards in draft hold the rules — the roles
> (`STD-051`), what a role can carry (`STD-052`) and presence (`STD-053`).
> numinia.com builds them in five pull requests, each with its tests first;
> the standards come into force once those tests exist.
> **Audience:** Agents · Oracles · Technical reviewers

---

## 1. Context

**The brief.** On 2026-10-14 the Oracle asked for a system of roles "very
like Discord's, or almost every social platform's", that each organisation
manages; for the house to reach every organisation now, at the edge of the
alpha, with each organisation deciding later; for a list of the people
connected; and for statuses — online, away, do not disturb, invisible. He
asked to learn from other platforms and to start from open source if
something fits. He approved the design and its plan the same day.

**What exists.** `STD-003` holds six platform ranks that add up: a rank says
how far a person has come and grants nothing inside an organisation.
`ADR-070` point 7 gives every team four fixed roles — owner, administration,
finance, member — with nobody changing their own role and no team role
reaching outside its team; `MIS-179` is to build them in the till. `MIS-157`
asks that the standards of each area be selected in a record before any
code. The session carries the rank, frozen for an hour (`SYS-015`).
numinia.com shows organisations, their 3D homes and how many people are
inside each world, but knows no member, role or status.

**What was studied.** Discord's developer documentation and support pages;
Slack, Microsoft Teams, Zulip, Matrix, Roblox, VRChat, Second Life,
Telegram, WhatsApp, Stoat (formerly Revolt), Gather and Rocket.Chat; about
twenty open-source candidates; and the standards and laws of point 10. Every
claim was quoted from the source's own page on 2026-10-14. What decided:

- Discord publishes its model whole: a role is a name, a colour and a set of
  permissions in an ordered list; every member holds @everyone; the owner is
  not a role; Administrator allows everything; the calculation and the four
  rules of the hierarchy are written out.
- Roblox rebuilt its groups in 2026 into the same model: several roles per
  member, ownership held by the community instead of a rank, "your highest
  role is your ceiling", and a second check before granting sensitive
  permissions.
- Second Life shows the opposite: an ability to assign any role, with no
  ceiling, lets a member raise themselves to "near-Owner power", as its own
  knowledge base warns.
- Statuses converge on online, idle, do not disturb and invisible, with
  offline worked out. Zulip reports presence once a minute and calls it one
  of the hardest scaling problems of a team chat tool.
- Every complete open-source product shaped like Discord is AGPL or GPL; the
  authorization servers are separate services; Better Auth runs on D1 but
  would replace the site's sign-in, and its roles have no order.

---

## 2. Decision

1. **Each organisation keeps its own roles, as a Discord server does.** A
   role has a name, a colour, a place in an ordered list — the higher, the
   more it may manage —, a switch to show its members apart in the list of
   people, and a set of permissions. Every member holds the base role, which
   cannot be deleted. A member may do what the base role allows plus what
   each of their roles allows, and nothing outside their organisation. A
   role with no permission is a title. The rules are `STD-051`.
2. **Owners are not a role.** Owners hold everything, including what no
   role can carry: deleting a world, seeing or changing its code and
   downloading it (`ADR-070` point 7), closing the organisation or handing it
   over, naming owners and setting the house's access. An organisation
   always keeps one owner at least.
3. **Nobody acts at or above their own highest role.** The four rules Discord
   publishes: give, edit and order only roles below your highest one; grant
   only permissions you hold; remove, ban or mute only members whose highest
   role is below yours. Unlike Discord, nobody changes their own roles, as
   `ADR-070` already said. Granting the administrator or role-managing
   permission, banning, and changing the house's access ask for a new wallet
   signature at that moment: Numinia's version of Roblox's second check.
4. **Seventeen permissions in plain words, and three templates** (`STD-052`).
   The four team roles of `ADR-070` become the Team template, so the table of
   `MIS-179` still holds. The Alpha template, administration and members, is
   what the house opens during the alpha; the Community template adds
   moderation. Exceptions by place — a ritual or a world for some roles only,
   Discord's channel overwrites — come later, applied in Discord's order.
5. **Checked on the server, at every request.** numinia.com asks the till
   what a person may do in an organisation at each request, and the till
   computes it with one pure function of the shared domain package. Roles
   never travel in the session, so a role taken away stops at the next
   request; if the till does not answer, the answer is no.
6. **The house.** During the alpha the house's staff — the Oracles today —
   enter every organisation's panel with an administrator's reach, never an
   owner's, without appearing among its members. The panel says so, and
   every act is written in that organisation's log under the house's name and
   the person's. After the alpha, each organisation's owners choose: always,
   on request — an owner signs a leave that lasts 72 hours and closes by
   itself —, or never, save what the law requires. `STD-003` gives the
   Oracle rank that reach.
7. **Four statuses, seen only by fellow members.** A person chooses online,
   idle, do not disturb or invisible. Idle sets itself after ten minutes
   without input, offline after two minutes without word from any open page;
   with several devices the most available shows; an invisible person looks
   offline to everyone else, phrase included. A status phrase is an emoji
   and up to 128 characters, and it clears itself. Only people who share an
   organisation see a person's status, and the house where it enters; anyone
   else sees counts. The first time, the person is asked who may see them,
   with nothing chosen in advance, and looks offline until they answer: the
   one point where Numinia departs from Discord, because the European
   guidance treats the most exposing default as a deceptive pattern. Nothing
   but the present status is kept. The rules are `STD-053`.
8. **How the site knows who is there.** Each open page with a session reports
   once a minute, as Zulip's clients do, to one Durable Object kept in
   Cloudflare's EU jurisdiction, which numinia.com reaches through the till's
   binding and the browser never reaches. A list on screen refreshes every
   30 seconds. Open connections — WebSockets with Cloudflare's hibernation,
   through PartyServer, under the ISC licence — may replace the report later
   without changing anything else. They do not come first because numinia.com
   loads a whole page at every click.
9. **The core is ours; the references are open.** The calculation, the rules
   of the hierarchy and the templates are written in the shared domain
   package, tested to 100 %, and checked in tests against discord.js
   (Apache-2.0) and Stoat's permission crate (MIT). No product is adopted.
10. **The standards selected.**

| Area | Standard and version | What it requires here |
|---|---|---|
| Authorization | [OWASP ASVS 5.0.0](https://owasp.org/www-project-application-security-verification-standard/), Level 2, plus 8.3.2 from Level 3 | written rules (8.1.1); checks on the server (8.3.1); changes applied at once (8.3.2); no organisation reaches another (8.4.1); failed checks logged (16.3.2) |
| Authorization principles | [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) | deny by default; check every request |
| Log events | [OWASP Logging Vocabulary Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html) | `authz_change` when someone's permissions change, `authz_admin` when the house acts |
| The question "may they?" | [OpenID AuthZEN Authorization API 1.0](https://openid.net/authorization-api-1-0-final-specification-approved/), Final since January 2026 | the shape subject, action, resource and context in, a decision out, with no separate service |
| The words for roles | [ANSI/INCITS 359-2012 (R2022), role-based access control](https://csrc.nist.gov/projects/role-based-access-control) | the vocabulary only; no claim of conformance |
| Data protection by default | [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 25(2) and 5(1)(c), with [EDPB Guidelines 03/2022, version 2.0](https://www.edpb.europa.eu/system/files/2023-02/edpb_03-2022_guidelines_on_deceptive_design_patterns_in_social_media_platform_interfaces_v2_en_0.pdf) | nothing shown to an indefinite number of people by default; nothing kept beyond need; no most-exposing preset |
| The names of the statuses | [IETF RFC 6121](https://www.rfc-editor.org/rfc/rfc6121), the show element | online, away (idle) and dnd, with offline as the absence of presence |

Accessibility, WCAG 2.2 at level AA, is already selected by `STD-034`: a
status is never colour alone.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Keep the four fixed team roles (`ADR-070` as written) | They fit a studio that pays for worlds, not a congress with speakers, volunteers and attendees: every organisation would ask the house for a new role. They stay, as the Team template. |
| One number per member (Matrix's power levels; Roblox's ranks 0–255 until 2026) | One number cannot hold two hats at once, and Roblox itself moved to several roles per member in 2026. |
| A permission to assign any role, with no ceiling (Second Life) | Its own knowledge base warns that it lets a member raise themselves to near-owner power. |
| Better Auth's organisation plugin (MIT) | It runs on D1, but it replaces the site's wallet sign-in and session, and its roles have no order and no deny. |
| An open-source product shaped like Discord (Stoat, Spacebar, Matrix Synapse, Mattermost) | AGPL or GPL, which `STD-010` admits only with a signed decision, and a whole chat the house does not want. |
| An authorization server (OpenFGA, SpiceDB, Cerbos) | Separate services with stores of their own; none runs inside a Worker beside D1. |
| Open connections first | Instant, but numinia.com loads a whole page at each click, and the way through its Astro adapter is unverified; the minute report fills the same lists with no new piece. |
| Visible from the first day, as in Discord | The EDPB's audit of messengers asks that the online status start visible to nobody, and its guidelines call the most exposing default deceptive; one question costs less. |
| A last time seen (Zulip, Telegram) | A record of when someone was connected is data nobody needs to meet now. |
| Roles inside the session, as ranks are | A role taken away would keep working until the session ends; ASVS 8.3.2 asks for at once. |

---

## 4. Consequences

**Obliges.**

- `STD-051`, `STD-052` and `STD-053`, in draft: followed from now on, not
  yet blocking.
- `STD-003` 3.4.0: the Oracle rank may enter an organisation as its house
  access allows; a rank grants nothing else inside one.
- `ADR-070` point 7 points here, and `MIS-179` builds the members, the roles
  and the log in the till with the Team template (its execution log, 0.2.0).
- `STD-026` gains *Organisation role*, told apart from the role of
  `PRI-004` — what someone does in an act —, and *Presence*.
- numinia.com builds it in five pull requests, one at a time, each opening
  with the tests of its rules: the calculation in the shared domain package;
  the members, roles and log in the till; the panel's Members and Roles; the
  list of people of each organisation; the statuses. Then the three standards
  come into force (`PRO-023`), each check pointing at its test.

**Costs and debts.**

- ASVS 8.4.2, administrative interfaces behind several layers, is a known
  gap of the house's access during the alpha; the new signature narrows it.
- The privacy texts say none of this yet: rows 62 to 65 of `DBT-022`.
- The worlds do not know who is who inside them, so building and muting can
  be granted but do nothing inside a world until they do (`MIS-186`).
- Invitations by email wait for the till's mail (`MIS-182`); during the
  alpha the house adds people from the panel.
- The Cloudflare plan of the account sets the cost of the minute report; it
  is checked before the cut that brings the statuses.

**Does not change.** Ranks, the list of Oracles and how people sign in; the
word an organisation uses on screen, still open with the Oracle.

---

## 5. Status

Proposed on 2026-10-14, pending the Oracle's acceptance on the pull request.
The design it records, with clickable screens, was put to the Oracle on
2026-10-14; he approved it and its plan the same day.
