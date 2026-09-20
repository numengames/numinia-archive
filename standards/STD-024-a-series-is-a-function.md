---
id: "STD-024"
uid: ""
title: "A series is a function"
type: documentation
subtype: standard
status: draft
version: "1.0.2"
created: "2026-09-09T12:30:00+02:00"
updated: "2026-09-11T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
license: "CC0-1.0"
tags: [standards, series, thresholds, registration]
threshold: governed
related: ["STD-001", "STD-017", "STD-018", "STD-020", "CAN-004"]
series_change: "1.0.2 — 2026-09-11: Check rows name the folder a script lives in (machine/scripts/, machine/tools/, machine/guards/rules/); a bare filename does not say where to run it, and three of them had moved. Patch: prose only. 1.0.1 — 2026-09-11: SER-005 Check row drops the folded check-core-rules.mjs. Patch: prose only. 1.0.0 — new standard, cut eleven under ADR-043: the rules that STD-001 carried as prose since v1, now plated. STD-001 keeps the tables."
---

# A series is a function

> **Summary:** A folder is a series when its loss breaks a named function.
> Three series oblige; the rest record. A threshold says what a change takes;
> a document leaves its series by a new identifier or absorption, never by
> rename.
> **Epistemic:** What a series is, what it may oblige, and how a document
> moves between them.
> **Pragmatic:** Decide whether a folder is a series, whether a text binds,
> and what a change to it requires — without asking.
> **Audience:** Agents · Oracles

**Binds:** every folder of the corpus and every document in one.
**Does not bind:** which series exist — `STD-001`; who signs a change —
`STD-017`; the identifier itself — `STD-018`.

## Rules

**SER-001 — Only the axis obliges.** `canon/` says why, `standards/` say
what, `protocols/` say how. Every other series registers, and a register
cannot put a reader in breach: an obligation written outside the axis is a
plan until a standard carries it.

**SER-002 — Complied with, or executed.** A standard is complied with by an
artifact; a protocol is executed by an actor. The boundary is the mechanism,
not the topic.

**SER-003 — The threshold says what a change takes.** `sealed`: the Oracle's
signature and an ADR recording the reason. `governed`: an ADR, or a pull
request the Oracle approves. `closed`: substance is not reopened; form may be
corrected and the commit says so. `live`: corrected when it contradicts canon
or a signed decision, and the correction is recorded inside the document,
naming who and against which decision. `open`: a pull request.

**SER-004 — Folder and genre agree.** The folder is the filing decision;
`type:` is the declared genre. When they contradict, the file moves; `type:`
is not rewritten to fit.

**SER-005 — A document changes series by a new identifier.** The old
identifier declares `superseded_by`, the new one is registered in the
destination, neither is renumbered. Before the move, the consumers are
enumerated; if one cannot be updated in the same change, the move does not
happen.

**SER-006 — Absorption carries the reasoning.** A record may leave its folder
by being carried into another document: the reasoning survives there, every
citation is rewritten in the same change, every public URL redirects, and the
absorber declares `absorbs:`.

**SER-007 — Exempt is declared, with its reason.** A document outside
registration carries `registration: exempt` and `registration_reason:`, both
or neither. The reason names what makes registration *wrong*: apparatus of a
registered document, or a rename whose consumers cannot all be updated.
Counters read `exempt` as out of the denominator, not as a miss.

## Check

| Plate | Verified by |
|---|---|
| SER-004 | `machine/guards/rules/std-004-the-header.mjs` (`HDR-017`) |
| SER-005 | `machine/guards/rules/std-020-git-is-the-archive.mjs` |
| SER-006 | `machine/guards/rules/std-020-git-is-the-archive.mjs` (`absorbs:`), `machine/scripts/check-url-lifecycle.mjs` |
| SER-007 | `machine/guards/rules/std-004-the-header.mjs` (`HDR-001`) |
| SER-001, 002, 003 | `[MANUAL]` — what binds and what a signature is are read, not parsed |

## Why

The corpus is read by agents that must know, without asking, whether a
sentence binds them: SER-001 makes that a question of location. The thresholds
exist because no file in git is immutable — what distinguishes canon from a
memory is what a change takes, and history is the only enforced record of who
changed what. A document moved by rename leaves every plain-text citation
pointing at nothing; SER-005 and SER-006 make the move a registered event.

## References

- `CAN-004` — the archive is the system's memory.
- `ADR-041` — deletion when nothing living cites.
