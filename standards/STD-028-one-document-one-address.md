---
id: "STD-028"
uid: ""
title: "One document, one address"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-20T20:00:00+02:00"
updated: "2026-09-20T20:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, urls, addresses, citation, publishing]
license: "CC0-1.0"
ratified_by: "ADR-047"
threshold: governed
related: ["STD-018", "STD-021", "STD-027", "STD-001", "STD-012"]
series_change: "0.1.0 — new standard cut under ADR-047: the URL had no rule. Four series resolved under /corpus/ and four did not, by accident; a document was reachable at a Spanish address and an English one with nothing saying which was real; and 599 of the site's 774 addresses were redirects, 344 of them to a page that does not answer the question asked. STD-018 keeps the identifier, STD-021 keeps the citation of a document by another; this file holds the address on the web."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# One document, one address

> **Summary:** A document is served at exactly one address, and that address
> is its series folder plus its identifier. No prefix stands in front of the
> series, the function never appears, and a retired address survives only
> while it leads to the document that answers its question.
> **Epistemic:** What a URL of this archive encodes, and what it may not.
> **Pragmatic:** Derive any document's address without asking, and decide
> whether a dead address is kept or removed.
> **Audience:** Agents · Oracles

**Binds:** every address numinia.org publishes for a document of the corpus.
**Does not bind:** the identifier itself — `STD-018`; how one document cites
another in prose — `STD-021`; which series exist — `STD-001`.

## Rules

**URL-001 — The address is the series and the identifier.** A document's
address MUST be `/<series>/<id>`, where `<series>` is its folder as
`STD-001` names it and `<id>` is its identifier, lowercased. No segment
stands between the site root and the series.

**URL-002 — The function is never in the address.** A URL MUST NOT name a
function or an activity of `STD-027`. `CLS-001` fixes that a document is
filed by series and classified by function; an address that encoded the
function would break on every reclassification.

**URL-003 — One address per document.** A document MUST be served at one
address. A second address for the same document — a translation of the path,
an alias, a legacy shape — MUST NOT be published.

**URL-004 — English is the address.** Path segments are English, in the
language the corpus is written in.

**URL-005 — A retired address leads to the answer, or it is removed.** When
an address stops being built, it MUST either redirect to the document that
now answers the question it answered, or cease to exist. A redirect to an
index, a register or a report of deletions answers nothing and MUST NOT be
published.

**URL-006 — A citation is the identifier.** Inside the corpus a document is
cited by its identifier alone (`ADR-046`). Across a repository boundary it
is qualified (`nwos:ADR-046`, `STD-018` IDN-017). A URL is written only when
the reader is being sent to the web, never as the canonical form of a
citation.

## Check

| Plate | Verified by |
|---|---|
| URL-001, URL-002, URL-004 | `machine/scripts/check-url-shape.mjs` — every built address against the series register |
| URL-003 | `machine/scripts/check-url-shape.mjs` — two addresses serving one document |
| URL-005 | `machine/scripts/check-url-shape.mjs` — a redirect whose target is an index, and a redirect chain |
| URL-006 | `[MANUAL]` — prose, read in review |

## Why

**A prefix that answers no question is noise.** `/corpus/` stood in front of
four series and not the other four, and the module that resolved them said
so in a comment: *four sections resolve under /corpus/, two do not,
predating this model*. A reader could not derive an address, and neither
could an agent — which is why both asked. Removing the prefix leaves one
derivation with no exception in it.

**Two addresses for one document is a question nobody answers.** A canonical
tag tells a crawler which one counts; it tells a person nothing, and a
citation copied from the wrong one is not wrong enough to notice.

**A redirect is a promise that the question still has an answer.** When the
document is gone and the question was withdrawn, the honest response is the
site's own 404, which offers navigation — not a 200 that lies by landing the
reader on a register where their document is not mentioned. Keeping 344 such
addresses alive cost the archive the ability to tell a live redirect from
litter.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-018` | One document, one identifier | the identifier this address is built from |
| `STD-021` | Evidence and citation | how a document cites another |
| `STD-027` | The archive is classified by function | CLS-001, why the function stays out |
| `STD-001` | The series | the folders an address may name |
| `ADR-047` | One document, one address | the decision that cut this standard |
