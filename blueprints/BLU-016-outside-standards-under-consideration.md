---
id: "BLU-016"
uid: ""
title: "Outside standards under consideration"
type: blueprint
status: draft
version: "0.1.0"
created: "2026-09-25T13:00:00+02:00"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [blueprint, standards, adoption, external]
territory: "Archive"
license: "CC0-1.0"
related_missions: []
related: ["STD-011", "STD-010", "STD-024", "STD-015", "STD-005"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Outside standards under consideration

> **Summary:** Twelve standards written by others that we might adopt, what
> each would give us, and what adopting it would cost.
> **Epistemic:** Which outside rules already cover ground we might otherwise
> write rules for ourselves.
> **Pragmatic:** Before writing a new rule on artificial intelligence,
> continuity, quality, records, software security, delivery, media origin or
> licence compliance, read this first.
> **Audience:** Agents · Oracles

> **A blueprint is a design not yet executed.** Nothing here binds anyone.
> When one of these is adopted, it becomes a rule inside the standard it
> serves, and leaves this page.

## Current state

As of September 2026, eighteen outside standards are rules of ours; twelve
more have been named as worth a look, and none of them binds. Several of
the twelve cover ground where we already wrote rules of our own without
naming them: keeping records, securing software, and complying with
licences. That overlap is the reason to decide on each one rather than
leave the list to age.

## Future state

Each of the twelve has been decided: adopted, with its rule written in the
standard it serves and its source in that standard's check table, or set
aside with the reason written here.

### Artificial intelligence

**Managing the risks of artificial intelligence.** The United States
standards institute's risk framework asks an organisation to map, measure
and manage what can go wrong with the systems it builds. It would give our
agents' work a vocabulary of risk; adopting it means one written risk
assessment per agent and a review when an agent's powers change.

**A management system for artificial intelligence.** The international
standard for running artificial intelligence responsibly, certifiable like
a quality system. Our engineering checks already ask for part of it by
hand; adopting it would mean policies, roles and audits we do not keep
today.

### Keeping the organisation running

**Business continuity.** The international standard for staying up when
something breaks: what must keep working, and how soon it comes back. It
overlaps our incident protocol without matching it; adopting it means
reconciling the two and testing the plan.

**Quality management.** The best-known international standard, on
delivering consistently and improving on purpose. No operating document of
ours anchors it yet; adopting it is a certification effort, worth it only
if a client asks.

### The archive

**Records management.** The international standard for what a record is,
how it is classified, kept and disposed of. Our rules on series, roll-ups,
absorption and deletion already restate much of it in our own words;
adopting it means naming it as their source and checking what we missed.

**Where information comes from.** The web consortium's vocabulary for
provenance: who made a thing, from what, by which activity. Our header
fields may be a plain subset of it; adopting it means mapping them, not
rewriting the archive in its format.

### Software

**The provenance of a build.** A framework of levels proving that what we
ship was built from the code we reviewed. It extends the security score we
already keep, from the same foundation; adopting the first levels is a few
workflow steps.

**Secure software development.** The United States standards institute's
list of practices for building software safely. Our engineering baseline
keeps a security checklist we wrote ourselves; adopting this means replacing
that list with its practices, or naming which ones ours covers.

**Verifying application security.** The open web security project's list of
testable requirements for an application, in three levels. It would give the
platform a checklist a reviewer can tick; adopting the first level means a
review against it before release.

**Delivery performance.** Four measures of how fast and how safely a team
ships: how often, how quickly, how often it fails, and how soon it recovers.
They were set aside once; adopting them means measuring from the repository
history, which costs little.

### Media and licences

**The origin of generated media.** An open standard that signs images and
video with where they came from and whether a machine made them. It matters
only if the site serves generated media in volume; adopting it means signing
at publication.

**Open-source licence compliance.** The international standard for a
programme that complies with open-source licences, in one short
specification. It formalises what our licensing standard already does by
hand; adopting it is mostly a self-certification.

## The gap

| Gap | What closes it |
|---|---|
| No decision on any of the twelve | one decision per standard, adopted or set aside |
| Our own rules that restate records management, secure development and licence compliance | naming the outside standard as each rule's source, in the check tables |
| No owner per standard | the Oracle names one when a decision is opened |

## Cost and risk

Each adoption costs reading a standard that is often long and sometimes paid
for, and some certify only through an audit. The risk of not deciding is
the one this page exists to end: writing, in our own words, a rule the
world has already written better. The cheaper alternative, keeping the
twelve as a bare list, was rejected because a list nobody decides on only
grows older.

## Sources

- [Artificial intelligence risk management framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Artificial intelligence management system, ISO/IEC 42001](https://www.iso.org/standard/42001)
- [Business continuity, ISO 22301](https://www.iso.org/standard/75106.html)
- [Quality management, ISO 9001](https://www.iso.org/iso-9001-quality-management.html)
- [Records management, ISO 15489](https://www.iso.org/standard/62542.html)
- [Provenance ontology, W3C](https://www.w3.org/TR/prov-o/)
- [Supply-chain levels for software artifacts](https://slsa.dev/)
- [Secure software development framework](https://csrc.nist.gov/pubs/sp/800/218/final)
- [Application security verification standard](https://owasp.org/www-project-application-security-verification-standard/)
- [Delivery performance research](https://dora.dev/research/2024/dora-report/)
- [Content provenance and authenticity](https://c2pa.org/)
- [Open-source licence compliance, ISO/IEC 5230](https://openchainproject.org/license-compliance)
