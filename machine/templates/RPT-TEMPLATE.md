---
# Copy this file to reports/RPT-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: RPT-NNN-slug.md, three digits, kebab-case.
# A daily report is the one exception: reports/RPT-YYYY-MM-DD.md, and it MUST
# carry `subtype: daily`. See the note at the end of this file.
id: "RPT-NNN"
uid: ""
title: "What was observed — not the area it was observed in"
type: report
# subtype: audit | daily | analysis | proposal
subtype: audit
# a report is `active` from publication; its claims are not rewritten — that is the series threshold (STD-001), not a status
status: active
version: "1.0.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [report, audit]
license: "CC-BY-4.0"
visibility: "public"

# OPTIONAL — use when they apply, omit without guilt.
# severity: high                    # for an audit that grades what it found
# period: "2026-08"                 # the window observed, if not a single day
# scope: "what was and was not examined"
# evidence_script: "machine/scripts/<name>.mjs"   # the instrument that produced the figures
# evidence_head: "<sha>"                  # the commit the figures were measured at
# model: "the model that wrote it"        # for a machine-authored report
# agent: "agent-id"
# former_id: "RPT-NNN"              # if reshelved from another series
# former_id_note: "why the identifier changed"
# related: ["MIS-NNNN"]
---

# RPT-NNN — What was observed

> **Summary:** One sentence. WHAT was observed, and on what date it was true.
> **Epistemic:** What the system looked like on the observation date.
> **Pragmatic:** Evidence other documents may cite.
> **Audience:** Agents · Oracles

<!-- Title: state the finding, not the exercise. "Nine guards certify a corpus
     three of them cannot read" — not "CI audit". -->

---

## 1. Scope and method

What was examined, what was deliberately not, and how it was measured.

Name the instrument: the command, the script, the commit. A finding whose
method is not stated cannot be re-run, and a report that cannot be re-run is
an opinion with a date on it.

**Measured at:** `<sha>`, YYYY-MM-DD.

---

## 2. Findings

What was found. Numbered, each one standing alone, each one falsifiable.

| # | Finding | Measured |
|---|---|---|
| 1 | The claim, in one line | The figure and the command that produced it |

Separate what was **measured** from what is **inferred** from it. The moment
those two share a sentence, the report stops being evidence.

---

## 3. What this report did NOT examine

The border of the observation. Name the adjacent things a reader will assume
were covered and were not.

A report is read as a verdict on the whole system unless it says otherwise.
This section is the difference between evidence and false assurance.

---

## 4. Recommendations

What follows from §2 — separated from it, because a finding survives a
recommendation being rejected.

Each recommendation names the actor who would execute it. A recommendation
addressed to nobody is a wish.

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

A report is `closed` once published. Its claims are NOT rewritten: a correction
is a new report that supersedes it, or an amendment note appended with its own
date. Editing a signed observation destroys the only thing the series is for.

DAILY REPORTS are the one shape that departs from this file:
  - filename  reports/RPT-YYYY-MM-DD.md   (the date IS the identifier)
  - subtype   daily
  - body      the session record — what was done, what was learnt, what broke
  - the `evidence_script` / `evidence_head` pair when figures are quoted
Everything else on this page still applies, §3 above all.

AUDIT REPORTS (subtype audit, PRO-011) add to §2 and §3:
  - each finding carries state (live / doubtful / dead) and severity (blast
    radius) as separate axes, and an identifier that survives between runs
    (FND-YYYY-NN, never reused)
  - a verdict on every finding of the previous run: resolved, persists,
    returned, reclassified
  - open questions in their own list, never inside the findings
  - §3 states the denominator and how much of it was censused; the three
    scores (doctrine, execution, coverage) close the report
  - public tier only: no resource identifier, no address, no secret name

Annexes live in reports/evidence/<RPT-id>/ and are excluded from the web
corpus deliberately: the report is the published document, the annex is the
captured artefact behind it.
-->
