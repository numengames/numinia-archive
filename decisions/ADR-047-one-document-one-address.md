---
id: "ADR-047"
uid: ""
title: "One document, one address: /corpus/ is removed and dead redirects are deleted"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-20T20:00:00+02:00"
updated: "2026-09-20T20:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, urls, addresses, refactor]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "A document's address is its series folder plus its identifier, with no prefix in front; the /corpus/ segment is removed from 111 addresses; a redirect survives only while it leads to the document that answers its question, and the 344 that lead to an index or a deletion notice are deleted."
amends: ["ADR-030"]
related: ["STD-028", "STD-018", "STD-027", "STD-012"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# ADR-047 — One document, one address

> **Summary:** `/corpus/` is removed from every address; a document is served
> at `/<series>/<id>`; redirects that answer nothing are deleted.
> **Epistemic:** The site's address space had no rule, and the absence was
> being maintained: half a prefix, two languages, and more signposts than
> documents.
> **Pragmatic:** `STD-028` holds the rule; 111 addresses lose a segment and
> 344 dead ones go.
> **Audience:** Agents · Oracles

---

## 1. Context

Measured on the build of `4fe4fc6`:

| | |
|---|---|
| directories the build publishes | 774 |
| of those, real pages | 175 |
| of those, redirect stubs | 599 |
| redirects whose target is an index, a register or a report of deletions | 344 |
| pages served under `/corpus/` | 111 |

**Three defects, one address space.**

*The prefix is half-applied.* `canon/`, `standards/`, `protocols/`, `system/`,
`operations/`, `agents/`, `objects/` and `debt/` resolve under `/corpus/`;
`decisions/`, `blueprints/`, `missions/` and `reports/` do not.
`web/src/lib/corpus.ts` documented the split rather than resolving it:
*four sections resolve under /corpus/, two do NOT … predating this model*.
Neither a reader nor an agent can derive an address from the series.

*The prefix carries nothing.* Every page the site serves is the archive. A
segment that is constant where it appears, absent where it does not, and
names no distinction a reader can act on, is a word the reader types and the
citation carries for no return.

*Most of the address space is signposts.* 599 of 774 addresses are
redirects. 262 of them land on one report that says a batch of missions was
cancelled; 45 on the debt register; 37 on the reports index. A reader who
follows `/missions/mis-041` does not find MIS-041, and does not find a
document that answers what MIS-041 answered — they find a notice that it is
gone. That is the *200 that lies* `check-url-lifecycle` declares itself blind
to (`D-028`), maintained 344 times.

`ADR-030` made every retired address a permanent obligation. Under that rule
the three defects compound with every cut: the honest deletion of a document
adds an address rather than removing one. The Oracle suspended the rule for
the refactor on 2026-09-20 — *what is no longer valid is deleted* — which is
what makes this decision possible.

---

## 2. Decision

**A document's address is `/<series>/<id>`.** The series folder as `STD-001`
names it, then the identifier, lowercased. Nothing in front of the series.

**`/corpus/` is removed.** 111 pages change address. The segment is not
redirected: an address whose only difference from the live one is a dead
prefix is the duplication this decision removes, not a promise worth keeping.

**The function never appears in an address.** `STD-027` CLS-001 fixes that
the identifier names the series and never the function; the address follows
the identifier. Written down here so it is not re-litigated: a functional URL
would break on every reclassification, which is the cost the classification
scheme was designed to avoid.

**A redirect survives only while it leads to the answer.** Where a document
was absorbed, renamed or superseded, the redirect points at the record that
now holds that reasoning and stays. Where the question was withdrawn and no
document answers it, the address is deleted and the reader meets the site's
own 404, which offers navigation (`MIS-128`).

**One language.** English path segments only. The Spanish aliases still
published for 39 live pages are deleted with the rest.

**`ADR-030` is amended, not repealed.** Its four tests before deleting a
document stand. What no longer holds is the fourth as an absolute: an address
whose question has no answer is not kept alive, and the guard that enforced
it reports instead of blocking while the refactor runs.

Binding from ratification. `STD-028` is the standard.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Put every series under `/corpus/` | Makes the rule uniform and keeps a segment that answers nothing — every page of this site is the archive. It also moves four series instead of one segment, for a longer address |
| Leave the split and write it down | Writing down an accident makes it permanent. The comment in `corpus.ts` already did this and the drift continued |
| Keep `/corpus/` and redirect the four outliers into it | Same objection, plus 40 new permanent redirects in a cut whose purpose is to remove them |
| Redirect the 111 `/corpus/` addresses to their new shape | An alias for every document, forever, differing by a dead prefix. URL-003 exists to stop exactly this |
| Keep the 344 dead redirects | They are maintained in `astro.config.mjs` by hand, they hide real redirects among litter, and they answer nothing. The 404 page is the honest answer |
| Wait for the `lore/` separation first | `lore/` moves addresses too, so it is cheaper after this rule exists than before it |

---

## 4. Consequences

- **Obliges:** every new route derives its address from the series
  (`STD-028` URL-001); a deletion decides, per address, redirect-or-remove
  (URL-005); no second address for one document (URL-003).
- **Costs:** 111 published addresses change and are not redirected —
  external links and search results to `/corpus/…` will meet the 404 page
  until they are re-crawled. This is the price the Oracle accepted for the
  refactor, and it is stated here rather than hidden in a migration note.
  In-repo citations by identifier are unaffected (`STD-018`, `STD-021`): the
  corpus cites `STD-027`, not its URL.
- **Gains:** 774 addresses → 231. One derivation with no exception.
  `astro.config.mjs` loses about 500 hand-maintained lines.
- **Reversal:** the prefix can be restored in one line of the route, but the
  deleted redirects are in git and would have to be restored by hand. If the
  404 rate after this lands is judged too high, the answer is a redirect for
  the addresses that actually receive traffic — measured, not all 344.

---

## 5. Status

`draft`. Proposed 2026-09-20 by `ursa`, on the Oracle's instruction of the
same day that the refactor deletes what no longer serves. Ratifies `STD-028`
on the Oracle's signature.
