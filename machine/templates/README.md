<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# machine/templates/ — the moulds

One mould per series. Copy it, fill it, delete the guidance.

`machine/templates/` is **apparatus**: scaffolding a document is copied from, never a
member of any series, never published, never counted in the corpus figures.

---

## The library

| Copy this | To create | In |
|---|---|---|
| `MIS-TEMPLATE.md` | a mission | `missions/MIS-NNNN-slug.md` |
| `STD-TEMPLATE.md` | a standard | `standards/STD-NNN-slug.md` |
| `PRO-TEMPLATE.md` | a protocol | `protocols/PRO-NNN-slug.md` |
| `ADR-TEMPLATE.md` | a decision | `decisions/ADR-NNN-slug.md` |
| `DBT-TEMPLATE.md` | a debt entry | `debt/DBT-NNN-slug.md` |
| `RPT-TEMPLATE.md` | a report | `reports/RPT-NNN-slug.md` |
| `OPS-TEMPLATE.md` | an operations record | `operations/OPS-NNN-slug.md` |
| `CAN-TEMPLATE.md` | a canon text | `canon/CAN-NNN-slug.md` |
| `BLU-TEMPLATE.md` | a blueprint | `blueprints/BLU-NNN-slug.md` |
| `SYS-TEMPLATE.md` | a system reference | `system/SYS-NNN-slug.md` |

Two companions of the mission mould, which are records rather than moulds:

| File | What it is |
|---|---|
| `MIS-TEMPLATE-EXAMPLE.md` | a filled mission, to read next to the blank one |
| `MIS-TEMPLATE-CHANGES.md` | why the mission mould has the shape it has |

**Not here, deliberately:**

- `agents/_template/` — the agent scaffold is a *directory* of six files
  (`SOUL.md`, `OPERATOR.md`, `SOURCES.md`, `AGENT.yaml`, two adapter configs).
  Flattening a six-file scaffold into this folder would break the one thing it
  scaffolds: the directory shape.
- `.github/ISSUE_TEMPLATE/task.md`, `.github/PULL_REQUEST_TEMPLATE.md` —
  GitHub reads these from `.github/` by path. Moving them here would disable
  them. They are platform configuration that happens to be written in
  markdown, not moulds for archive documents.

---

## How to use one

1. Copy the mould to its destination with the destination's own filename.
   The shape is enforced: `PREFIX-NNN-kebab-slug.md`, three digits — **four**
   for missions, whose `id` still carries three.
2. Fill the frontmatter. The commented block at the top is the *optional*
   ring: uncomment what applies, delete what does not.
3. Write the body. The prose under each heading explains what that section is
   for, and what makes it fail. Delete it as you replace it.
4. Delete the closing `NOTES ON USING THIS TEMPLATE` block.
5. Run the guards before committing:

```
node machine/guards/rules/std-004-the-header.mjs
node machine/guards/rules/std-018-one-identifier.mjs
node machine/guards/rules/std-006-plain-text.mjs
node machine/guards/rules/std-010-licensing.mjs
node machine/guards/rules/std-020-git-is-the-archive.mjs
```

A document created from an unedited mould should pass all four. If it does
not, the mould is wrong — fix it here, not in the copy.

---

## What the moulds guarantee

`node machine/scripts/check-templates.mjs` verifies every file in this folder against
the contract of the series it scaffolds:

| | |
|---|---|
| T-01 | frontmatter parses, and carries the whole of ring 1 |
| T-02 | the filename is `PREFIX-TEMPLATE.md` for a registered prefix |
| T-03 | no inline `#` comment after a value — the shape that corrupts it |
| T-04 | `license:` matches the REUSE regime of the **destination** |
| T-05 | `type` belongs to the destination series (`STD-016`) |
| T-06 | `status` is in the destination's lifecycle (`STD-016`) |
| T-07 | every field is registered in some ring for the destination |
| T-08 | version is bare SemVer, opening at `0.1.0` (STD-009) |
| T-09 | the context card carries Summary, Epistemic and Pragmatic |
| T-10 | every registered series has a mould |

T-04 is the one no other guard can perform. `std-010-licensing` reads
a file's *own* path, and every path here is `machine/templates/**` → CC0-1.0. So a
mould could declare a licence that contradicts REUSE.toml for the folder it is
copied to, and nothing would notice until a document built from it failed CI
on its first commit. Six of them did, before 2026-09-04.

---

## The rule about editing them

**The mould is normative for its series.** Changing a mould changes what every
future document of that series looks like, so it is not a cosmetic edit.

- A change of *guidance* (clearer prose, a better example) needs no ceremony.
- A change of *contract* — adding a field, changing a lifecycle, moving a
  section from required to optional — must follow the standard that governs
  it (STD-004 for the header, the series' own standard for the body), and the
  standard changes first.

A mould that disagrees with STD-004 does not amend it. It is a bug, and it
propagates itself into every document copied from it until someone notices.
