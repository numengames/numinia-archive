---
id: "STD-011"
uid: ""
title: "External standards"
type: documentation
subtype: standard
status: draft
version: "2.0.0"
created: "2026-09-07T15:00:00+02:00"
updated: "2026-09-25T11:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "CAO"
license: "CC0-1.0"
tags: [standards, adoption, provenance, external]
threshold: governed
series_change: "2.0.0 — 2026-09-25: from register to standard, at the Oracle's word in session. The external standards we use are rules to keep, not a table to consult: each is named and explained in words a narrator can read aloud. Plates and source links leave the reading and wait at the foot, in the Check table, so no screen reader stumbles on them. Eighteen rules, one per standard in use; the twelve under consideration are listed, not ruled."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# External standards

> **Summary:** What we obey that we did not write. Each standard we use is a
> rule here, named and explained in one breath; the ones we are only
> considering are named apart; the sources wait at the foot.
> **Epistemic:** Which outside standards the work already rests on, what each
> one does, and which of them a tool checks.
> **Pragmatic:** Know which standard to follow before writing a date, a
> licence, a commit, a page or a ledger line — and where to read it.
> **Audience:** Everyone · Agents · Oracles

**Binds:** every document, repository and site of Numen Games and Numinia.
**Does not bind:** the standards we are only considering, named at the end.

## Rules

### How we write rules and number things

**Obligation words mean one thing.** MUST, SHOULD and MAY carry
the meaning RFC 2119 gives them: a must is required, a should may be broken
only with a reason, a may is a free choice.

**Versions follow Semantic Versioning.** Every version MUST be
three numbers — major, minor, patch. We adapt it: who may raise each number
depends on authority, not on compatibility.

**A failure is reviewed without blame.** When something breaks,
we MUST write down what happened and what changes, never who is at fault,
as a blameless postmortem does.

### How the archive keeps its files

**Every file names its licence in SPDX.** A file MUST say who owns
it and under which licence, with the two SPDX lines that any open-source
tool can read.

**The repository passes REUSE.** Each file MUST declare its own
licence; the few that cannot are covered in one central file, and the REUSE
check runs on every push.

**Dates are written ISO 8601.** A date MUST read year, month, day,
then the hour and its offset, always in that order, so it sorts and never
reads two ways.

**The changelog is kept for people.** Changes SHOULD be grouped by
date and kind — added, changed, fixed — the way Keep a Changelog describes,
so a reader sees what moved without reading commits.

### How we build software

**The repositories keep a security score.** OpenSSF Scorecard
MUST grade each week how safely a repository is built and published, and
the grade is read.

**Work lands on one trunk.** Short branches MUST reach `main` by
one pull request at a time, as trunk-based development proposes; nothing
lives long on the side.

**Settings live in the environment.** Passwords, keys and anything
that changes between machines MUST stay out of the code and be read from the
environment, as the Twelve-Factor App asks.

**Commit messages say their kind.** A commit SHOULD start with
what it is — a feature, a fix, a test, documentation — in the Conventional
Commits form, so history can be read and sorted.

**A contributor certifies their right to contribute.** Each commit
SHOULD carry the Developer Certificate of Origin sign-off: the author states
the work is theirs to give.

**Software is accepted by scenarios.** A mission that produces
software MUST state what it has to do as Gherkin scenarios — given, when,
then — that a test runs.

### How our sites look and read

**Every page can be used by anyone.** Public pages MUST meet WCAG
2.2 at level AA: readable contrast, keyboard access, screen readers, in the
light theme and the dark.

**Design values travel as tokens.** Colours, type sizes and
spacing SHOULD be written in the W3C design tokens format, so one source
feeds every site and tool.

### How we handle money and people's data

**Personal data is protected under GDPR.** Whatever we keep about
a person MUST be kept for a stated purpose and only as long as needed; the
person can see it and ask to erase it.

**The books follow the Spanish accounting plan.** Every ledger
line MUST carry its account from the Plan General de Contabilidad —
services, staff, sales — so the gestoría can keep the books from it.

**Costs are counted as consumed.** Cloud and service costs SHOULD
be recorded by what was actually used, in the FinOps FOCUS vocabulary, not
by what was promised.

### What we are considering

Twelve more standards are on the table and bind nobody yet. For managing
artificial intelligence, the NIST risk framework and ISO 42001. For keeping
the organisation running, ISO 22301 on continuity and ISO 9001 on quality.
For the archive, ISO 15489 on records and W3C PROV on provenance. For
software, SLSA on build provenance, NIST SSDF on secure development, OWASP
ASVS on application security, and the DORA delivery metrics, already set
aside once. For media, C2PA on the origin of generated images. For licences,
OpenChain. Adopting one turns it into a rule above.

This standard is over its word budget because every rule has to be read
aloud and understood without opening the source.

## Why

Writing our own rule for dates, licences or accessibility would cost work
and buy a worse rule than the one the world already tested. Naming the
outside standard lets anyone — a new citizen, an agent, an auditor — check
us against something they already know. Saying which ones a tool checks,
and which only we remember, keeps us honest about the difference.

## Check

Every rule above, with the code an agent cites it by, the source to read,
and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| EXT-001 | Obligation words mean one thing | [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) | by hand, at review |
| EXT-002 | Versions follow Semantic Versioning | [Semantic Versioning 2.0.0](https://semver.org/) | versions guard (`std-019-versions.mjs`), format only |
| EXT-003 | A failure is reviewed without blame | [Blameless postmortem](https://sre.google/sre-book/postmortem-culture/) | by hand, at review |
| EXT-004 | Every file names its licence in SPDX | [SPDX](https://spdx.dev/) | licensing guard (`std-010-licensing.mjs`) |
| EXT-005 | The repository passes REUSE | [REUSE 3.3](https://reuse.software/spec-3.3/) | `reuse lint` in CI, all four repositories |
| EXT-006 | Dates are written ISO 8601 | [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) | header guard (`std-004-the-header.mjs`) |
| EXT-007 | The changelog is kept for people | [Keep a Changelog](https://keepachangelog.com/) | by hand; `numinia-web` and `nwos-deploy` keep none |
| EXT-008 | The repositories keep a security score | [OpenSSF Scorecard](https://scorecard.dev/) | `scorecard.yml`, weekly, all four repositories |
| EXT-009 | Work lands on one trunk | [Trunk-Based Development](https://trunkbaseddevelopment.com/) | by hand |
| EXT-010 | Settings live in the environment | [The Twelve-Factor App, config](https://12factor.net/config) | by hand |
| EXT-011 | Commit messages say their kind | [Conventional Commits](https://www.conventionalcommits.org/) | nothing yet (`DBT-020`) |
| EXT-012 | A contributor certifies their right to contribute | [Developer Certificate of Origin](https://developercertificate.org/) | nothing yet (`DBT-020`) |
| EXT-013 | Software is accepted by scenarios | [Gherkin](https://cucumber.io/docs/gherkin/) | `numinia-web` only: ten `.feature` files in CI |
| EXT-014 | Every page can be used by anyone | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | `numinia-web` only: `apps/store/e2e/a11y.spec.ts`, 31 routes |
| EXT-015 | Design values travel as tokens | [W3C design tokens format](https://www.designtokens.org/tr/drafts/format/) | by hand; `sistema.tokens.json` in this archive |
| EXT-016 | Personal data is protected under GDPR | [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | by hand |
| EXT-017 | The books follow the Spanish accounting plan | [Plan General de Contabilidad, RD 1514/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-19884) | by hand |
| EXT-018 | Costs are counted as consumed | [FinOps FOCUS](https://focus.finops.org/) | by hand |

Under consideration, binding nobody:

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [ISO/IEC 42001, AI management](https://www.iso.org/standard/42001)
- [ISO 22301, continuity](https://www.iso.org/standard/75106.html)
- [ISO 9001, quality](https://www.iso.org/iso-9001-quality-management.html)
- [ISO 15489, records management](https://www.iso.org/standard/62542.html)
- [W3C PROV-O](https://www.w3.org/TR/prov-o/)
- [SLSA](https://slsa.dev/)
- [NIST SSDF, SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [DORA](https://dora.dev/research/2024/dora-report/)
- [C2PA](https://c2pa.org/)
- [OpenChain, ISO/IEC 5230](https://openchainproject.org/license-compliance)

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-010` | Licensing | where SPDX, REUSE and the certificate of origin apply |
| `STD-008` | Design tokens | where the tokens format applies |
| `STD-033` | Charges and the account | where the accounting plan and FOCUS apply |
| `STD-015` | Engineering checks | the checks behind commits, scenarios and accessibility |
| `DBT-020` | Declared automatic, executed by nobody | the commit checks still missing |
