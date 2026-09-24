---
id: "STD-011"
uid: ""
title: "External standards"
type: documentation
subtype: register
status: draft
version: "1.0.0"
created: "2026-09-07T15:00:00+02:00"
updated: "2026-09-09T00:40:00+02:00"
author: "ursa"
owner: "oracle"
territory: "CAO"
license: "CC0-1.0"
tags: [standards, adoption, provenance, external, register]
threshold: governed
series_change: "1.0.0 — the register takes the ADR-043 shape: one table, no prose. Twenty-eight rows kept, sources kept; the reading notes that carried facts become a Notes column; the three sections that explained the table are gone. Distance 0 · 1 · 2 · 3 = enforced by a tool · written, unchecked · practised, unnamed · not considered."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# External standards

> **Summary:** What the system obeys that it did not write: each standard
> once, its source, where it applies, and its distance — 0 enforced by a tool,
> 1 written and unchecked, 2 practised and unnamed, 3 not considered.

| Territory | Standard | Source | Distance | Applied in | Notes |
|---|---|---|---|---|---|
| CAO | RFC 2119 | <https://www.rfc-editor.org/rfc/rfc2119> | 0 | `STD-004` · corpus-wide | |
| CAO | Semantic Versioning 2.0.0 | <https://semver.org/> | 1 | `STD-009` VER-021 · VER-064 | Adapted, not adopted: bumps are authority-based (agent patch · archon minor · Oracle major), not compatibility-based |
| CAO | Blameless postmortem | <https://sre.google/sre-book/postmortem-culture/> | 2 | `STD-005` | practised, unnamed |
| CAO | NIST AI RMF | <https://www.nist.gov/itl/ai-risk-management-framework> | 3 | — | |
| CAO | ISO/IEC 42001 · AI management | <https://www.iso.org/standard/42001> | 3 | — | `STD-015` AGT-006 asks by hand for part of it |
| CAO | ISO 22301 · continuity | <https://www.iso.org/standard/75106.html> | 3 | — | overlaps `PRO-001`, unreconciled |
| CAO | ISO 9001 · quality | <https://www.iso.org/iso-9001-quality-management.html> | 3 | — | no anchor in any operating document |
| Archive | SPDX | <https://spdx.dev/> | 0 | `STD-010` · `STD-004` HDR-008 | |
| Archive | REUSE 3.3 | <https://reuse.software/spec-3.3/> | 1 | `STD-010` · `REUSE.toml` | `reuse lint` passes on every push (CI step, reporting); every text file declares its own licence, REUSE.toml names only files that cannot |
| Archive | ISO 8601 | <https://www.iso.org/iso-8601-date-and-time-format.html> | 0 | `STD-004` HDR-006 · HDR-007 | |
| Archive | Keep a Changelog | <https://keepachangelog.com/> | 2 | `CHANGELOG.md` | practised, unnamed |
| Archive | ISO 15489 · records management | <https://www.iso.org/standard/62542.html> | 3 | — | overlaps `STD-024` (`SER-005/006`) / `ADR-030`, unreconciled |
| Archive | W3C PROV-O | <https://www.w3.org/TR/prov-o/> | 3 | — | `STD-004` ring 2 may be a conceptual subset; RDF not proposed |
| Platform | OpenSSF Scorecard | <https://scorecard.dev/> | 0 | `.github/workflows/scorecard.yml`, weekly | |
| Platform | Trunk-Based Development | <https://trunkbaseddevelopment.com/> | 2 | one live PR at a time onto `main` | practised, unnamed |
| Platform | The Twelve-Factor App · III | <https://12factor.net/config> | 2 | config in the environment | practised, unnamed |
| Platform | Conventional Commits | <https://www.conventionalcommits.org/> | 1 | `STD-015` ARC-006 | declared `[AUTO: commitlint]`; no commitlint in the tree (`DBT-020`) |
| Platform | DCO | <https://developercertificate.org/> | 1 | `STD-010` | declared `[AUTO]`; no bot; 0 of the last 30 commits signed (`DBT-020`) |
| Platform | SLSA | <https://slsa.dev/> | 3 | — | cheap extension of Scorecard, same parent project |
| Platform | NIST SSDF · SP 800-218 | <https://csrc.nist.gov/pubs/sp/800/218/final> | 3 | — | `STD-005` security section is a self-authored checklist |
| Platform | OWASP ASVS | <https://owasp.org/www-project-application-security-verification-standard/> | 3 | — | |
| Platform | DORA metrics | <https://dora.dev/research/2024/dora-report/> | 3 | — | retired by the superseded constitution, 2026-08-30 (`ADR-041`) |
| Platform | Gherkin / BDD | <https://cucumber.io/docs/gherkin/> | 0 | `numinia-web`: ten `.feature` files, `test:acceptance` in CI | software only; a governance document has no scenarios (`STD-015` AGT-005) |
| Product | WCAG 2.2 AA | <https://www.w3.org/TR/WCAG22/> | 0 | `numinia-web`: `apps/store/e2e/a11y.spec.ts`, axe + Playwright, 31 routes, both themes | `STD-015` ARC-010 still says "coverage incomplete" and points at a path that does not exist here |
| Product | W3C DTCG · design tokens | <https://www.designtokens.org/tr/drafts/format/> | 1 | `STD-008` | the spec is a draft; conformance to a moving target |
| Product | C2PA | <https://c2pa.org/> | 3 | — | relevant only if `/web` serves AI media at public volume |
| Funding | GDPR · Regulation (EU) 2016/679 | <https://eur-lex.europa.eu/eli/reg/2016/679/oj> | 1 | `OPS-003` | FLAG-2 · 3 · 4 · 6 open, awaiting a lawyer |
| Funding | OpenChain · ISO/IEC 5230 | <https://openchainproject.org/license-compliance> | 3 | — | formalises what `STD-010` executes by hand |

`Content`, `Sales` and `Infrastructure` hold no row; this register does not decide whether that is a gap in the vocabulary or in the world.
