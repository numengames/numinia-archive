<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# opportunities/ — every chance to sell something, as a public record

One file per opportunity, `OPP-YYYY-NNN.md`, copied from
`machine/packages/sales-kit/OPPORTUNITY.md`; its proposals beside it as
`PRP-YYYY-NNN.md`, from `PROPOSAL.md`. The rules are `standards/STD-039`
(the record) and `STD-038` (the stages, the reasons, when the organisation
is named); the steps are `protocols/PRO-028`, `PRO-029`, `PRO-030`.

The records are public. They carry nobody's name, e-mail or phone — who
said what stays where the conversation happened — and they name the
organisation by sector and size until it has agreed to a proposal. CI runs
`node machine/packages/sales-kit/pipeline.mjs opportunities` on every
change and fails on a record that breaks a rule; run it yourself to read
the pipeline.
