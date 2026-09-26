---
id: "STD-028"
uid: ""
title: "One document, one address"
type: documentation
subtype: standard
status: draft
version: "0.3.0"
created: "2026-09-20T20:00:00+02:00"
updated: "2026-09-26T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, urls, addresses, citation, publishing, Cool-URIs, RFC-6596, RFC-9110]
license: "CC0-1.0"
ratified_by: "ADR-047"
threshold: governed
related: ["STD-018", "STD-021", "STD-027", "STD-001", "STD-012"]
series_change: "0.3.0 — 2026-09-26: this is now the one place that says where a retired address leads: the redirect rules of Git is the archive and The corpus does not grow retire into it, and it says the redirect is one step and moves with its answer. Held below 1.0.0 because only the Oracle promotes, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# One document, one address

> **Summary:** A document is served at exactly one web address: its series
> folder followed by its name. Nothing stands in front of the series, the
> function never appears, and a retired address leads to its answer or
> says it is gone.
> **Epistemic:** What a web address of this archive says, and what it may
> not.
> **Pragmatic:** Work out any document's address without asking, and decide
> whether a dead address is kept or removed.
> **Audience:** Agents · Oracles

**Binds:** every web address the public site gives a document of the archive.
**Does not bind:** the document's name, or how a document leaves the
archive.

## Rules

No law requires these; they are our choice, taken from the web's own
standards, so that a link written today still works, and any crawler or
auditor can tell which address is the real one.

### How an address is made

**The address is the series and the name.** A document's address MUST be
its series folder followed by its name in lower case, with nothing between
the site's root and the series; the web's guidance on addresses that never
change asks for exactly this, a name that holds nothing that will move.

**The function is never in the address.** An address MUST NOT name a
function or an activity of the classification scheme; the same guidance
leaves the subject out, because an address that held it would break every
time the scheme was redrawn.

**English is the address.** Every part of an address MUST be in English,
the language the archive is written in.

### How many addresses

**One address per document.** A document MUST be served at one address,
and its page MUST declare that address as its canonical one, the web's
standard way to tell every search engine which copy is the real one; a
second address for it — a translated path, an alias, an old shape — MUST
NOT be published.

**A retired address leads to the answer, or says it is gone.** When an
address stops being built, it MUST either redirect for good, in one step, to
the document that now answers its question, or answer that it is gone for
good, as the web's protocol defines; so a reader and a crawler both know the
removal was deliberate. A redirect to an index, a list of deletions or
another redirect answers nothing, and when the answer moves, every redirect
to it moves in the same change.

### How a document is cited

**A citation is the name.** Inside the archive a document is cited by its
name alone; across repositories, the name carries its repository. A web
address SHOULD be written only to send the reader to the web, never as the
proper form of a citation.

This standard is over its word budget because each rule now says what its
outside standard does, as well as what it obliges.

## Check

Every rule above, with its plate, the outside standard it follows, and what
verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| URL-001 | The address is the series and the name | [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) — ours adds: the exact shape `/<series>/<id>` | `machine/scripts/check-url-shape.mjs` — every built address against the series register |
| URL-002 | The function is never in the address | [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) — leave the subject out | `machine/scripts/check-url-shape.mjs` |
| URL-004 | English is the address | — | `machine/scripts/check-url-shape.mjs` |
| URL-003 | One address per document | [RFC 6596, the canonical link relation](https://www.rfc-editor.org/rfc/rfc6596) — ours is stricter: no duplicate is published at all | `machine/scripts/check-url-shape.mjs` — two addresses serving one document; `rel="canonical"` emitted by the site layout |
| URL-005 | A retired address leads to the answer, or says it is gone | [RFC 9110, section 15.4.2, 301 Moved Permanently](https://www.rfc-editor.org/rfc/rfc9110#section-15.4.2); [RFC 9110, section 15.5.11, 410 Gone](https://www.rfc-editor.org/rfc/rfc9110#section-15.5.11); [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI); holds retired GIT-046, GIT-047 and DEF-005, which said the same three times | `machine/scripts/check-url-shape.mjs` — a redirect to an index, and a redirect chain; `machine/scripts/check-url-lifecycle.mjs` — addresses that stopped being built, reported. Not yet: the site answers a removed address with 404, not 410 — debt |
| URL-006 | A citation is the name | — | by hand — prose, read in review |

| In the reading | Exact form |
|---|---|
| series folder followed by its name | `/<series>/<id>`, the folder as the series register names it, the identifier lowercased |
| redirect for good | HTTP 301 (or 308) to the heir |
| gone for good | HTTP 410 Gone |
| a name inside the archive | `ADR-046` |
| a name across repositories | `nwos:ADR-046` |
| the classification scheme | `STD-027`; its first rule is `CLS-001` |
| the rule that qualifies names across repositories | `STD-018` `IDN-017` |

## Why

A prefix that answers no question is noise: one stood in front of four
series and not the other four, and neither a reader nor an agent could work
out an address. Two addresses for one document is a question nobody
answers. A redirect promises the question still has an answer; when it does
not, saying the page is gone for good is honest, where not-found reads as
an accident.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-018` | One document, one identifier | the name this address is built from |
| `STD-021` | Evidence and citation | how a document cites another |
| `STD-027` | The archive is classified by function | why the function stays out |
| `STD-001` | The series | the folders an address may name |
| `ADR-047` | One document, one address | the decision that cut this standard |
