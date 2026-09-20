---
id: "objects-check"
title: "Copy check — 2026-09-20"
type: meta
status: active
version: "0.1.0"
created: "2026-09-20T08:54:01.706Z"
updated: "2026-09-20T08:54:01.706Z"
license: "CC0-1.0"
author: "scripts/entities.mjs"
provenance: ai-generated
---

# Copy check — 2026-09-20 at 322a293

Written by `node scripts/entities.mjs --check`, run by hand and committed with its date.
One row per copy of every form of every card in `objects/`. `ok` = the bytes were
fetched and their SHA-256 and size match the card. Where the format carries a
licence inside the file (VRM meta, glTF extras), it is read and compared with the
card's `embedded_license`. CI never runs this: a third-party host being down is
not a defect of the archive, and the archive does not depend on it.

**2 ok · 0 mismatch · 0 unreachable** over 2 copies.

| card | form | copy | verdict | detail |
|---|---|---|---|---|
| avocado | model | https://raw.githubusercontent.com/numeng…e-7d3e-aafa-41f81370eb63.vrm | ok | embedded: CC0 by Polygonal Mind |
| avocado | model | https://pub-eda9f42266254c179ab493dd1594…e-7d3e-aafa-41f81370eb63.vrm | ok | embedded: CC0 by Polygonal Mind |
