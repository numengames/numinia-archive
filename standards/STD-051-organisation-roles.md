---
id: "STD-051"
uid: ""
title: "Organisation roles"
type: standard
subtype: standard
status: active
version: "0.4.0"
created: "2026-10-14T23:36:00+02:00"
updated: "2026-10-30T19:00:00+01:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Products and services"
tags: [standards, organisations, roles, permissions, RBAC, multi-tenant, moderation]
license: "CC0-1.0"
related: ["ADR-071", "STD-052", "STD-053", "STD-003", "ADR-070", "MIS-179", "STD-050"]
derived_from: "PRI-004"
approved_by: "ADR-071"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Organisation roles

> **Summary:** Each organisation keeps an ordered list of roles, as a
> Discord server does. A member may do what the base role allows plus what
> each of their roles allows; owners stand above every role and alone do
> what cannot be undone. Nobody acts on anyone at or above their own highest
> role, nobody changes their own roles, and every change is written down.
> **Epistemic:** What may each member do inside their organisation?
> **Pragmatic:** Build or audit an organisation's permission check, its role
> editor and what one member may do to another, without asking anyone.
> **Audience:** Agents · Oracles

**Binds:** numinia.com's organisations — their panel, their list of members
and the service that keeps members and roles —, the server of its worlds when
it decides what a person may do there, and the house when it enters one of
them.

## Rules

### What a member may do

**Roles add up.** A member MUST be allowed exactly what the base role allows
plus what each of their roles allows, and nothing outside their organisation.

**Owners are not a role.** An owner MUST be allowed everything, including the
acts reserved to owners, which no role can carry; an organisation always keeps
at least one owner.

**An agent never goes beyond whoever answers for it.** A digital agent that
is a member MUST hold no more than the person or the house that answers for
it, and is never an owner.

**The house may answer for an agent.** Where an organisation lets the house
in (`ORG-007`), the house MAY connect a digital agent there and answer for it.
That agent MUST show the house's mark in the organisation's panel, the
connection MUST be written in the organisation's log, its owners MAY remove it
at any time, and it MUST NOT hold a role that carries `administrator` or
`manage-roles`.

### Who may act on whom

**Only below your highest role.** A member MUST act only on roles below their
own highest role and on members whose highest role is below it, and grant only
permissions they hold.

**Nobody changes their own roles.** A member MUST NOT give themselves a role
or take one of their own away; they may only leave.

**What is dangerous is signed again.** Granting the administrator or
role-managing permission, banning someone and changing the house's access MUST
ask for a new signature from the person's wallet at that moment.

**A ban says why.** A ban MUST tell the banned person its reasons, and it holds
only in that organisation.

### Where it is checked

**On the server, every time.** Roles MUST be read on the server at each
request, never from the browser or the session, so a role taken away stops
working at the next request.

**One organisation never reaches another.** Every read and every change MUST
name its organisation and touch nothing outside it.

**A person without a pass has what the base role has.** In a world, someone who
comes without a numinia.com pass MUST be allowed exactly what the base role
allows. The base role MUST NOT carry `build-in-worlds` unless someone holding
`manage-organization` has chosen it, in a setting the panel shows together with
what it lets a stranger do.

### The house

**The house keeps an organisation while it helps set it up.** During the
alpha the house's staff MAY enter any organisation and MAY do what its owners
do, including the acts reserved to owners (`STD-052`), only to support it.
Every such act MUST be written in the organisation's log under the house's
name and the person's, and the house MUST show in the organisation's list of
members as the house. The house needs no second signature and no second
person: the log answers for it, and the owners, once there are any, MUST be
able to read it. The house MUST hand the organisation over, naming its owners,
when the organisation asks or when the alpha ends; from then on it enters only
as the organisation's setting for the house allows (`STD-052`).

### Keeping it true

**Every change is written down.** Every change to roles, to members or to the
house's access, and every act of the house's staff, MUST be written in the
organisation's log: who, on whose behalf, what and when.

**The code and the register move together.** A change to what a role can
carry in the platform's code MUST change the register of organisation
permissions in the same change.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| ORG-001 | Roles add up | [NIST role-based access control, the core model](https://csrc.nist.gov/projects/role-based-access-control); `ADR-070`, a team role grants nothing outside its team | test: [domain](https://github.com/numengames/numinia-web/blob/main/packages/domain/__tests__/organization-roles.test.ts) `ORG-001: roles add up, and nothing reaches outside the organisation`; [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/organization-roles.test.ts) `ORG-001: roles add up — what numinia.com asks before it shows anything` |
| ORG-002 | Owners are not a role | [Discord, Permissions: the owner holds every permission before any role is read](https://discord.com/developers/docs/topics/permissions); `ADR-070`, the acts only owners sign | test: [domain](https://github.com/numengames/numinia-web/blob/main/packages/domain/__tests__/organization-roles.test.ts) `ORG-002: owners are not a role`; [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/organization-roles.test.ts) `ORG-002: owners are not a role` |
| ORG-011 | An agent never goes beyond whoever answers for it | `STD-042` | test: [domain](https://github.com/numengames/numinia-web/blob/main/packages/domain/__tests__/organization-roles.test.ts) `ORG-011: an agent never goes beyond its person`; [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/agents.test.ts) `never goes beyond the person who answers for it (ORG-011)` |
| ORG-013 | The house may answer for an agent | the Oracle's ruling of 2026-10-20: the house may connect an agent where an organisation lets it in, answers for it, and the owners may remove it; `ORG-007`; `ORG-009` | test: [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/agents-house.test.ts) `the house connects an AI where it may enter`, `the house’s ceiling for the roles it gives` (refuses `administrator` and `manage-roles`), `the community sees and removes what the house connected` |
| ORG-003 | Only below your highest role | [NIST SP 800-53 rev. 5, AC-5 separation of duties and AC-6 least privilege](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final); [Discord, permission hierarchy](https://discord.com/developers/docs/topics/permissions#permission-hierarchy) | test: [domain](https://github.com/numengames/numinia-web/blob/main/packages/domain/__tests__/organization-roles.test.ts) `ORG-003: only below your highest role, and only permissions you hold`; [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/organization-roles.test.ts) `ORG-003: only below your highest role`; [role management](https://github.com/numengames/numinia-web/blob/main/apps/till/test/role-management.test.ts) `ORG-003: …` (create, edit, move, delete, give) |
| ORG-004 | Nobody changes their own roles | [ISO/IEC 27001:2022, segregation of duties, control A.5.3](https://www.iso.org/standard/27001) (clause unverified) | test: [domain](https://github.com/numengames/numinia-web/blob/main/packages/domain/__tests__/organization-roles.test.ts) `ORG-004: nobody changes their own roles`; [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/organization-roles.test.ts) `ORG-004: nobody changes their own roles` |
| ORG-008 | What is dangerous is signed again | [OWASP ASVS 5.0.0, 8.4.2, administrative interfaces](https://owasp.org/www-project-application-security-verification-standard/) | test: [domain](https://github.com/numengames/numinia-web/blob/main/packages/domain/__tests__/organization-roles.test.ts) `ORG-008: what is dangerous is signed again`; [store](https://github.com/numengames/numinia-web/blob/main/apps/store/src/lib/__tests__/accounts-source.test.ts) `asks for a fresh signature before handing out administrator or manage-roles (ORG-008)` |
| ORG-010 | A ban says why | [Digital Services Act, Regulation (EU) 2022/2065, art. 17](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | by hand: no automated test yet; the engine's `/vetar` refuses a ban without a reason ([engine](https://github.com/numengames/numinia-engine/blob/main/test/roles.test.ts)), but telling the banned person is read by hand |
| ORG-005 | On the server, every time | [OWASP ASVS 5.0.0, 8.3.1 and 8.3.2](https://owasp.org/www-project-application-security-verification-standard/); [OWASP Authorization Cheat Sheet, deny by default and check every request](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) | test: [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/organization-roles.test.ts) `ORG-005: on the server, every time` |
| ORG-006 | One organisation never reaches another | [OWASP ASVS 5.0.0, 8.4.1, cross-tenant controls](https://owasp.org/www-project-application-security-verification-standard/) | test: [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/organization-roles.test.ts) `ORG-006: one organization never reaches another` |
| ORG-014 | A person without a pass has what the base role has | [OWASP Authorization Cheat Sheet, deny by default](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html); `ADR-075`, decision 3: a visitor without a pass has what the base role has | test: [engine](https://github.com/numengames/numinia-engine/blob/main/test/roles.test.ts) `building: --construir sets @todos; a role with «build-in-worlds» opens it for one person…` (a visitor in a closed world does not build); the panel setting that shows what a stranger may do is not covered by a test yet |
| ORG-007 | The house keeps an organisation while it helps set it up | the Oracle's ruling of 2026-10-26: during the alpha the house supports every organisation with an owner's reach and hands the keys back, as a person asked to set up another's community server does; [NIST SP 800-53 rev. 5, AC-6(9)](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) and [OWASP Logging Vocabulary, `authz_admin`](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html) are what keep it answerable | test: [domain](https://github.com/numengames/numinia-web/blob/main/packages/domain/__tests__/organization-roles.test.ts) `ORG-007: the house enters as the organisation allows`; [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/organization-roles.test.ts) `ORG-007: the house enters as the organization allows` |
| ORG-009 | Every change is written down | [OWASP ASVS 5.0.0, 16.3.2](https://owasp.org/www-project-application-security-verification-standard/); [OWASP Logging Vocabulary, `authz_change` and `authz_admin`](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Vocabulary_Cheat_Sheet.html); NIST SP 800-53 rev. 5, AC-6(9) | test: [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/organization-roles.test.ts) `ORG-009: every change is written down`; [role management](https://github.com/numengames/numinia-web/blob/main/apps/till/test/role-management.test.ts) `ORG-009: the log is read by whoever may view it` |
| ORG-012 | The code and the register move together | [OWASP ASVS 5.0.0, 8.1.1, authorization documentation](https://owasp.org/www-project-application-security-verification-standard/) | test: [domain](https://github.com/numengames/numinia-web/blob/main/packages/domain/__tests__/organization-register.test.ts) `ORG-012: the code holds what the register STD-052 holds`; [till](https://github.com/numengames/numinia-web/blob/main/apps/till/test/organization-roles.test.ts) `ORG-012: the till knows only the register’s permissions` |

## Why

Roles let an organisation run itself without the house. Without an order
among them, whoever may hand out roles can raise themselves to anything;
without owners above every role, a role could delete a client's world.
Reading roles on the server at every request makes a role taken away stop at
once, and the log keeps the house's wide access during the alpha answerable.
An agent always has someone who answers for it; where an organisation lets
the house in, the house can be that someone, in plain view and under the
owners' hand. The house sets an organisation up and gives the keys back; the
log and the handover are what make that safe, so no second signature stands
between the house and the help it gives. A stranger without a pass holds only
what the base role holds, so what a world lets anyone do is a choice its
owners can see.

## References

| ID | Name | Why cited |
|---|---|---|
| `ADR-071` | An organisation runs its own roles, as a Discord server does, and its members see who is connected | the decision these rules come from, and the standards it selects |
| `STD-052` | Organisation permissions | what a role can carry, what only owners do, the house's settings and the roles an organisation is born with |
| `STD-003` | Platform ranks | a rank is not a role: it grants nothing inside an organisation but the house's access |
| `STD-029` | How we treat each other in the commons | how moderation climbs before a ban |
| `STD-042` | What an agent may do without asking | how far an agent may go alone |
| `STD-050` | What an agent in a world reads, and what it obeys | the mark an agent's body wears and who answers for it, shown to everyone (`AGW-015`) |
