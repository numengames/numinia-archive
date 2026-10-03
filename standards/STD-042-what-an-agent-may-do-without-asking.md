---
id: "STD-042"
uid: ""
title: "What an agent may do without asking"
type: standard
subtype: register
status: draft
version: "0.1.2"
created: "2026-09-29T12:30:00+02:00"
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "People and culture"
tags: [standards, register, agents, permissions, automation, least-privilege]
license: "CC0-1.0"
related: ["STD-041", "STD-017", "STD-022", "PRO-008", "PRO-016", "CAN-004"]
derived_from: "CAN-004"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# What an agent may do without asking

> **Summary:** The permissions an agent needs to operate here, each
> described the same way — what it lets the agent do, what could go wrong,
> whether it can be undone, who grants it today — and graded at each of the
> five levels of automation: granted alone, asked for, or never. The floor:
> the permissions no level grants alone. The site draws this table; the
> approval protocol says how a permission is asked for. A register records:
> nothing in it binds by itself.
> **Epistemic:** Which permission is granted alone at each level of automation?

## The permissions

At each level: `alone` — the agent does it without asking; `asks` — it stops
and waits for a yes; `never` — no level grants it alone. The levels are the
five of the levels register, least automated first.

| # | Permission | Assisted | Partial | Conditional | High | Full | Undone |
|---|---|---|---|---|---|---|---|
| 1 | Read the repositories | `alone` | `alone` | `alone` | `alone` | `alone` | — |
| 2 | Write on its own desk | `alone` | `alone` | `alone` | `alone` | `alone` | yes, it is deleted |
| 3 | Run local tools | `asks` | `asks` | `alone` | `alone` | `alone` | yes |
| 4 | Read the web | `alone` | `alone` | `alone` | `alone` | `alone` | — |
| 5 | Use the GitHub secret | `never` | `asks` | `alone` | `alone` | `alone` | no: it must be rotated |
| 6 | Commit on a local branch | `asks` | `alone` | `alone` | `alone` | `alone` | yes |
| 7 | Push a branch and open a pull request | `never` | `asks` | `asks` | `alone` | `alone` | yes: the pull request is closed |
| 8 | Comment on and close pull requests | `never` | `asks` | `alone` | `alone` | `alone` | yes |
| 9 | Merge to main | `never` | `never` | `never` | `never` | `alone` | half: it is reverted, but it was published |
| 10 | Repository settings | `never` | `never` | `never` | `never` | `never` | no |
| 11 | Domains and deployment | `never` | `never` | `never` | `never` | `never` | half |
| 12 | Speak outwards | `never` | `never` | `never` | `asks` | `alone` | no |
| 13 | Spend money | `never` | `never` | `never` | `never` | `never` | no |
| 14 | Remember | `asks` | `asks` | `asks` | `alone` | `alone` | yes, it is edited |
| 15 | Work with nobody present | `never` | `never` | `asks` | `alone` | `alone` | it depends |
| 16 | Change who it is | `never` | `never` | `never` | `never` | `never` | — |

A higher level never grants less than a lower one; the test that reads this
table says so.

## What each permission is

| # | Lets the agent | What could go wrong | Who grants it today | Risk it bounds |
|---|---|---|---|---|
| 1 | clone, read files, see pull requests and history | nothing: they are public | nobody: they are public | — |
| 2 | create files and clones in its working folder | use disk | Hermes, without asking | — |
| 3 | run npm, node, tests, builds, checks | install packages, use network and disk; a malicious script in a dependency | Hermes: today it asks often | OWASP agentic: supply chain |
| 4 | search, read pages and documentation | a page slipping it instructions | Hermes, with filters | OWASP agentic: goal hijack |
| 5 | act as its own GitHub account | the token leaking into a log | the profile; house rule: never print it | OWASP agentic: identity and privilege abuse |
| 6 | prepare the work with a history | nothing outside its desk | Hermes | — |
| 7 | make the work public and reviewable | public noise; a badly named branch | the Oracle, per session ("go", "venga") | OWASP agentic: identity and privilege abuse |
| 8 | take part in the review | an unfortunate comment | the token allows it | — |
| 9 | publish on the site: the deploy follows the merge | something broken in production on the four sites | nobody: the ruleset requires the Oracle's review | AI Act art. 14: reversal and stop button |
| 10 | change secrets, branch protection, visibility, licences | data exposure, loss of history | only the Oracle | OWASP agentic: identity and privilege abuse |
| 11 | change where and how the sites are served | the four sites down | only the Oracle | — |
| 12 | send e-mails, message third parties, post on networks | reputation | nobody today | AI Act art. 50: transparency |
| 13 | use paid APIs, buy | money | nobody today | approval protocol: score 10, foundational |
| 14 | write memory and skills about the Oracle and the house | remembering something false or private | Hermes asks for approval | OWASP agentic: memory poisoning |
| 15 | run on a schedule, overnight | a failure repeating with nobody watching | Hermes: denied by default with nobody present | AI Act art. 14: oversight proportionate to the level of autonomy |
| 16 | edit its soul, its operator file, its configuration | an agent granting itself power | forbidden, always | out of the map by design |

## The floor

Four permissions no level grants alone; two more open only at the top,
under a rule of their own.

| # | Permission | Why it is floor |
|---|---|---|
| 10 | Repository settings | the transition regime already says it: never change licences, visibility or secrets |
| 11 | Domains and deployment | the four sites answer from one place; a wrong change takes them all down |
| 13 | Spend money | at `Full` the organisation would hold an assigned budget; spending it stays with whoever assigns it |
| 16 | Change who it is | no agent edits its own identity: it is what separates `Full` from a system that sets its own goals |
| 9 | Merge to main | up to `High` the merge is where the site changes and it is the Oracle's; at `Full` the agent merges with another agent's review — the ruleset still requires green checks and one review, only who signs it changes |
| 12 | Speak outwards | without a protocol for outside communication, never; with one, at `High` it asks and at `Full` it acts under that protocol |

## Check

| Row | Source | Verified by |
|---|---|---|
| a permission is described as what it lets, what could go wrong, undone, who grants | [Regulation (EU) 2024/1689 art. 4: AI literacy](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) (binds Numen Games as a deployer); [ISO/IEC 42001 Annex A.9.3, those who use the system understand their responsibilities](https://www.iso.org/standard/42001) (clause unverified) | by reading: every row has the four cells |
| a higher level never grants less | `STD-003` RNK-001, ranks add up | `machine/scripts/test/automation-levels.test.mjs` |
| the floor, and least privilege | [OWASP Top 10 for Agentic Applications 2026, identity and privilege abuse, least agency](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/); [CISA, NSA, NCSC et al., *Careful adoption of agentic AI services* (2026-05-01)](https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/careful-adoption-of-agentic-ai-services): human approval for high-risk actions, reversibility over efficiency; [ISO/IEC 42001 A.9.4, misuse anticipated](https://www.iso.org/standard/42001) (clause unverified) | `machine/scripts/test/automation-levels.test.mjs`: a floor permission is never `alone`, save where the row names the level that opens it |
| no agent edits its own identity | `STD-017` AUT-067 | the same test: row 16 is `never` at every level |
| the transition regime's "never" list | `AGENTS.md`, what still holds | by reading |
| who grants each today | `agents/ursa/adapters/hermes/config.yaml`; the GitHub token's scopes | by hand: the runtime and the token are read, not parsed |
| how a permission is asked for | `PRO-008` step 1: in the approver's words first, the command beneath | by reading |
