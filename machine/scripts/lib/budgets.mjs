// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// budgets.mjs — the word budget per series (STD-001, STD-007 DOC-006).
//
// D-009 (Pablo, 2026-10-18): a page budget is a strong recommendation, not a
// hard rule. It is SHOULD, never handed to the regime (`machine/checks/lib/guard.mjs`)
// and a register (`subtype: register`, e.g. STD-023, STD-026) is exempt
// outright — a register is a table of fixed values, not prose to trim.
// Shared by the guard that measures it (`machine/checks/rules/std-007-one-page.mjs`)
// and the telemetry figure that counts overruns (`machine/scripts/lib/families/corpus.mjs`),
// so the two never drift apart. Moves to the Series register (`STD-001`) when
// that table of budgets exists as data, not as two copies of a constant.
export const BUDGET = {
  standards: 500, procedures: 500, decisions: 500, missions: 500,
  debt: 300, guilds: 300,
  reports: 1000, designs: 1000,
  principles: 1500,
};
