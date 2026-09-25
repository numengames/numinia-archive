---
id: "STD-028"
uid: ""
title: "One document, one address"
type: documentation
subtype: standard
status: draft
version: "0.1.1"
created: "2026-09-20T20:00:00+02:00"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, urls, addresses, citation, publishing]
license: "CC0-1.0"
ratified_by: "ADR-047"
threshold: governed
related: ["STD-018", "STD-021", "STD-027", "STD-001", "STD-012"]
series_change: "0.1.1 — 2026-09-25: written in plain words a narrator can read aloud; the address pattern, the examples and the outside web standards behind each rule wait in the Check tables. No obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# One document, one address

> **Summary:** A document is served at exactly one web address: its series
> folder followed by its name. Nothing stands in front of the series, the
> function never appears, and a retired address survives only while it
> leads to the document that answers its question.
> **Epistemic:** What a web address of this archive says, and what it may
> not.
> **Pragmatic:** Work out any document's address without asking, and decide
> whether a dead address is kept or removed.
> **Audience:** Agents · Oracles

**Binds:** every web address the public site gives a document of the archive.
**Does not bind:** the document's name, how one document cites another, or
which series exist.

## Rules

### How an address is made

**The address is the series and the name.** A document's address MUST be
its series folder followed by its name in lower case, and nothing MUST stand
between the site's root and the series.

**The function is never in the address.** An address MUST NOT name a
function or an activity of the classification scheme; an address that did
would break every time the scheme was redrawn.

**English is the address.** Every part of an address is in English, the
language the archive is written in.

### How many addresses

**One address per document.** A document MUST be served at one address. A
second address for the same document — a translated path, an alias, an old
shape — MUST NOT be published.

**A retired address leads to the answer, or goes.** When an address stops
being built, it MUST either redirect to the document that now answers its
question, or cease to exist. A redirect to an index, a register or a list of
deletions answers nothing and MUST NOT be published.

### How a document is cited

**A citation is the name.** Inside the archive a document is cited by its
name alone; across repositories, the name carries its repository. A web
address is written only to send the reader to the web, never as the proper
form of a citation.

## Check

Every rule above, with its plate, the outside standard it follows, and what
verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| URL-001 | The address is the series and the name | [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) | `machine/scripts/check-url-shape.mjs` — every built address against the series register |
| URL-002 | The function is never in the address | [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) — leave the subject out | `machine/scripts/check-url-shape.mjs` |
| URL-004 | English is the address | — | `machine/scripts/check-url-shape.mjs` |
| URL-003 | One address per document | [The canonical link relation](https://www.rfc-editor.org/rfc/rfc6596) | `machine/scripts/check-url-shape.mjs` — two addresses serving one document |
| URL-005 | A retired address leads to the answer, or goes | [HTTP semantics, permanent redirect and gone](https://www.rfc-editor.org/rfc/rfc9110) | `machine/scripts/check-url-shape.mjs` — a redirect to an index, and a redirect chain |
| URL-006 | A citation is the name | — | by hand — prose, read in review |

| In the reading | Exact form |
|---|---|
| series folder followed by its name | `/<series>/<id>`, the folder as the series register names it, the identifier lowercased |
| a name inside the archive | `ADR-046` |
| a name across repositories | `nwos:ADR-046` |
| the classification scheme | `STD-027`; its first rule is `CLS-001` |
| the rule that qualifies names across repositories | `STD-018` `IDN-017` |

## Why

A prefix that answers no question is noise: one stood in front of four
series and not the other four, and neither a reader nor an agent could work
out an address. Two addresses for one document is a question nobody
answers. A redirect promises the question still has an answer; when it does
not, the site's own not-found page, which offers a way on, is the honest
reply.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-018` | One document, one identifier | the name this address is built from |
| `STD-021` | Evidence and citation | how a document cites another |
| `STD-027` | The archive is classified by function | why the function stays out |
| `STD-001` | The series | the folders an address may name |
| `ADR-047` | One document, one address | the decision that cut this standard |
