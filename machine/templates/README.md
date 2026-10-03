<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# machine/templates/ — the templates

One template per series. Copy it, fill it, delete the guidance.

`machine/templates/` is **apparatus**: scaffolding a document is copied from, never a
member of any series, never published, never counted in the corpus figures.

---

## The library

| Copy this | To create | In |
|---|---|---|
| `MIS-TEMPLATE.md` | a mission | `missions/MIS-NNNN-slug.md` |
| `STD-TEMPLATE.md` | a standard | `standards/STD-NNN-slug.md` |
| `PRO-TEMPLATE.md` | a procedure | `procedures/PRO-NNN-slug.md` |
| `ADR-TEMPLATE.md` | a decision | `decisions/ADR-NNN-slug.md` |
| `DBT-TEMPLATE.md` | a debt entry | `debt/DBT-NNN-slug.md` |
| `RPT-TEMPLATE.md` | a report | `reports/RPT-NNN-slug.md` |
| `OPS-TEMPLATE.md` | an operations record | `operations/OPS-NNN-slug.md` |
| `LEG-TEMPLATE.md` | a legal text | `legal/LEG-NNN-slug.md` |
| `PRI-TEMPLATE.md` | a principle text | `principles/PRI-NNN-slug.md` |
| `DES-TEMPLATE.md` | a design | `designs/DES-NNN-slug.md` |
| `SYS-TEMPLATE.md` | a system reference | `system/SYS-NNN-slug.md` |
| `OPP-TEMPLATE.md` | an opportunity of any kind — a sale, a tender, a grant, a collaboration, a partner | `opportunities/OPP-YYYY-NNN.md` |
| `PRP-TEMPLATE.md` | a proposal to a client | `opportunities/PRP-YYYY-NNN.md` |

One companion of the mission template, a record rather than a template:
`MIS-TEMPLATE-EXAMPLE.md`, a real mission written with it and closed, to read
next to the blank one.

Three companions of the report template, one per roll-up level:
`RPT-TEMPLATE-WEEK.md`, `RPT-TEMPLATE-QUARTER.md`, `RPT-TEMPLATE-YEAR.md`.
Same nine headings at every level, for a board that does not know the work
(`STD-043`); only the scale changes.

**Every template opens with the same header, in the same order** — `id`, `uid`,
`title`, `type`, `status`, `version`, `created`, `updated`, `author`, `owner`,
then `guild`, `section`, `tags`, `license` where the series uses them —
and only then the series' own fields. Side by side, with every field of every
template in one table: [numinia.org/templates](https://numinia.org/templates).

**Not here, deliberately:**

- `agents/_template/` — the agent scaffold is a *directory* of six files
  (`SOUL.md`, `OPERATOR.md`, `SOURCES.md`, `AGENT.yaml`, two adapter configs).
  Flattening a six-file scaffold into this folder would break the one thing it
  scaffolds: the directory shape.
- `.github/ISSUE_TEMPLATE/task.md`, `.github/PULL_REQUEST_TEMPLATE.md` —
  GitHub reads these from `.github/` by path. Moving them here would disable
  them. They are platform configuration that happens to be written in
  markdown, not templates for archive documents.

---

## How to use one

1. Copy the template to its destination with the destination's own filename.
   The shape is enforced: `PREFIX-NNN-kebab-slug.md`, three digits — **four**
   for missions, whose `id` still carries three.
2. Fill the frontmatter. The commented block at the top is the *optional*
   part: uncomment what applies, delete what does not.
3. Write the body. The prose under each heading explains what that section is
   for, and what makes it fail. Delete it as you replace it.
4. Delete the closing `NOTES ON USING THIS TEMPLATE` block.
5. Run the checks before committing:

```
node machine/checks/rules/std-004-the-header.mjs
node machine/checks/rules/std-018-one-identifier.mjs
node machine/checks/rules/std-006-plain-text.mjs
node machine/checks/rules/std-010-licensing.mjs
node machine/checks/rules/std-012-corpus-does-not-grow.mjs
```

A document created from an unedited template should pass all four. If it does
not, the template is wrong — fix it here, not in the copy.

---

## What the templates guarantee

`node machine/scripts/check-templates.mjs` verifies every file in this folder against
the contract of the series it scaffolds:

| | |
|---|---|
| T-01 | frontmatter parses, and carries every mandatory core field |
| T-02 | the filename is `PREFIX-TEMPLATE.md` for a registered prefix |
| T-03 | no inline `#` comment after a value — the shape that corrupts it |
| T-04 | `license:` names a licence with a text in `LICENSES/` |
| T-05 | `type` belongs to the destination series (`STD-004`) |
| T-06 | `status` is in the destination's lifecycle (`STD-004`) |
| T-07 | every field is a core field or an extension field registered for the destination |
| T-08 | version is bare SemVer, opening at `0.1.0` (STD-009) |
| T-09 | the context card carries Summary, Epistemic and Pragmatic |
| T-10 | every registered series has a template |

T-04 used to hold a template to the licence of the folder it is copied to. A
folder has no licence any more: each document declares its own, so the template
can only be held to naming a licence the repository can grant.

---

## The rule about editing them

**The template is normative for its series.** Changing a template changes what every
future document of that series looks like, so it is not a cosmetic edit.

- A change of *guidance* (clearer prose, a better example) needs no ceremony.
- A change of *contract* — adding a field, changing a lifecycle, moving a
  section from required to optional — must follow the standard that governs
  it (STD-004 for the header, the series' own standard for the body), and the
  standard changes first.

A template that disagrees with STD-004 does not amend it. It is a bug, and it
propagates itself into every document copied from it until someone notices.
