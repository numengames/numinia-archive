---
id: "objects-check"
title: "Copy check — 2026-09-20"
type: meta
status: active
version: "0.1.0"
created: "2026-09-20T15:33:39.598Z"
updated: "2026-09-20T15:33:39.598Z"
license: "CC0-1.0"
author: "machine/scripts/entities.mjs"
provenance: ai-generated
---

# Copy check — 2026-09-20 at 35b217f

Written by `node machine/scripts/entities.mjs --check`, run by hand and committed with its date.
One row per copy of every form of every card — `objects/*.md` and `agents/*/AGENT.md`.
`ok` = the bytes were fetched and their SHA-256 and size match the card; for a copy
that is a path in this repository (git pins it; the card repeats no hash) the row
records the hash, size and last commit seen on disk. Where the format carries a
licence inside the file (VRM meta, glTF extras), it is read and compared with the
card's `embedded_license`. CI never runs this: a third-party host being down is
not a defect of the archive, and the archive does not depend on it.

**7 ok · 0 mismatch · 1 unreachable** over 8 copies.

| card | form | copy | verdict | detail |
|---|---|---|---|---|
| ursa | soul | agents/ursa/SOUL.md | ok | 8c766be20cb2… 4396 bytes at 9d3afaa |
| ursa | operator | agents/ursa/OPERATOR.md | ok | 82e6cd3d78b7… 1401 bytes at 9d3afaa |
| ursa | sources | agents/ursa/SOURCES.md | ok | 75b5d3a5b09e… 1481 bytes at d919ce1 |
| ursa | adapter | agents/ursa/adapters/hermes/profile.yaml | ok | 4cde4a710b62… 1491 bytes at eba0b00 |
| ursa | adapter | agents/ursa/adapters/hermes/config.yaml | ok | 2a9cf5b58697… 1351 bytes at eba0b00 |
| ursa | skill | agents/skills/numinia-nwos-pr/SKILL.md | ok | 374a2583216a… 4346 bytes at 57a1586 |
| avocado | model | https://raw.githubusercontent.com/numeng…e-7d3e-aafa-41f81370eb63.vrm | ok | embedded: CC0 by Polygonal Mind |
| avocado | model | https://pub-eda9f42266254c179ab493dd1594…e-7d3e-aafa-41f81370eb63.vrm | unreachable | fetch failed |
