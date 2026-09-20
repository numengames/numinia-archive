---
id: "MIS-EXAMPLE"
uid: ""
title: "Example — a real small mission written with this template"
status: done
priority: medium
effort: S
guild: "Alchemists"
territory: "TBA"
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-25"

type: mission
version: "1.1.0"
created: "2026-08-25"
created_source: "git:c2ee691"
created_confidence: exact
updated: "2026-08-25"
author: "ursa"
owner: "oracle"
tags: [web, archive, example]
license: "CC0-1.0"

context: "2026-08-25"
paths: [web/dist/print/, web/package.json, web/astro.config.mjs]
---
# MIS-EXAMPLE — Retire the /print/ intermediates from the served site

> **Summary:** stop serving 278 PDF-generation intermediates that were meant to
> be deleted at build time.
> **Epistemic:** what a filled-in mission looks like, including a `Closure` that
> contradicts its own plan without editing it.
> **Pragmatic:** copy this shape, not this content.
> **Audience:** Agents · Oracles

---

> **This document is an example, not a mission.** It is filled with a real,
> measured case so the template is read one way instead of five. It carries
> `id: MIS-EXAMPLE` rather than a number, so it consumes no identifier and the
> glob that publishes `MIS-*.md` does not pick it up as work.
>
> It is shown **closed**, because the parts that go wrong are the ones written
> at closing time.

---

## Scope

`web/dist/print/**` and the site that serves it. Only the serving of those
routes — **not** the PDF pipeline itself, and **not** `generate-pdfs.mjs`.

The 278 `/print/*` routes exist because `build:pdf` never runs in the automated
build (`D-035`). They are already excluded from the sitemap; this mission is
about them being reachable.

### Out of scope

Fixing `build:pdf`. Whether the PDFs should exist at all is the decision in
`D-035`, and it is the Oracle's — this mission holds regardless of which of the
three options is chosen there.

---

## Acceptance criteria

*(Every line states what it returns TODAY, so it is visibly false at the base
commit `c2ee691`. A criterion that already passed would graduate nothing.)*

- [ ] `curl -s -o /dev/null -w '%{http_code}' https://numinia.org/print/missions/mis-109/`
      returns **404** — today it returns **200**
- [ ] `find web/dist/print -name index.html | wc -l` returns **0** after a clean
      build — today it returns **247**
- [ ] `curl -s https://numinia.org/sitemap-0.xml | grep -c '/print/'` still
      returns **0** — today **0**, and this must not regress
- [ ] `npm run build` exits 0 and the page count drops by exactly **247**

---

## Closure

*(Written at closing. Nothing above this line was edited — the plan says 247
and stays saying 247, even though the number turned out to be wrong.)*

- **What was done:** `/print/**` excluded from the published output. The routes
  now return 404 and the sitemap still reports 0.

- **What diverged, and why:** the criterion said the page count would drop by
  exactly **247**, measured on 2026-08-25 at `c2ee691`. **That figure was already
  stale when it was written.** An earlier measurement the same day had recorded
  **278**; three template documents added in between changed the count, because
  every published document generates a `/print/` intermediate. The criterion was
  written from the older number and corrected only when it was re-run.

  **The lesson is not the thirty-one pages.** It is that a criterion carrying an
  exact figure has a shelf life, and this one expired between being written and
  being checked. *"Drops by exactly N"* is falsifiable — which is right — but it
  is fragile in a way that *"`find web/dist/print` returns 0"* is not.
  **Prefer criteria that assert a final state over criteria that assert a delta.**

  Had the brief been edited to say 247 as if it had always said so, this
  paragraph would not exist and the next mission would repeat the mistake.

- **Evidence:** `find web/dist/print -name index.html | wc -l` → `0`
  (`247` before); `curl` on three sampled `/print/` routes → 404;
  `grep -c '/print/' dist/sitemap-0.xml` → `0`, unchanged.

- **Closed:** 2026-08-25 · **by:** ursa
