// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// hermes-approval-levels — the one place that says which Hermes
// `approvals` block each automation level earns.
//
// WHY THIS EXISTS
// Every agent's OPERATOR.md declares an `automation_level` (STD-041). Every
// agent's adapters/hermes/config.yaml carries an `approvals.mode` and a
// `deny` list that Hermes actually enforces. Nothing kept the second in
// step with the first: twelve adapters said `smart` regardless of whether
// their operator file said `assisted` or `partial`, so the config and the
// standard disagreed about what a human had to approve. This module is the
// single mapping both the generator and the divergence test read, so they
// cannot drift from each other the way the config drifted from the OPERATOR
// files.
//
// THE MAPPING
// Hermes only ships three `approvals.mode` values (see the hermes-agent
// skill, security-privacy.md): `manual` (always prompt), `smart`
// (auto-approve low-risk, deny high-risk, prompt when uncertain) and `off`
// (no prompts at all — never used here; it would also waive the floor
// permissions STD-042 says no level grants).
//
// STD-042 row 7, "push a branch and open a pull request", grades each level:
//   assisted → never · partial → asks · conditional → asks · high → alone · full → alone
// `manual` always asks, so it already satisfies "asks" by itself; it does
// NOT satisfy "never", because a human can still say yes when asked. Only an
// explicit `deny` pattern turns "asks" into "never" — hence `assisted` is the
// one level that adds deny patterns for push and for opening a pull request.
// STD-041's own "where each level sits outside" table names `Hermes manual`
// for `partial` and `Hermes smart` for `conditional`; `high` and `full` have
// no agent on them yet and no table entry either, so they stay at `smart`
// (the least permissive mode that still lets a session function) with a
// comment, not a guess dressed as certainty.
export const LEVEL_RULES = {
  assisted: {
    mode: 'manual',
    // STD-042 row 7: assisted is graded "never" for push/PR, not "asks".
    requiredDeny: ['git push*', 'gh pr create*'],
  },
  partial: {
    mode: 'manual',
    // STD-042 row 7: partial is graded "asks" — `manual`'s always-prompt
    // already delivers that; no extra deny needed.
    requiredDeny: [],
  },
  conditional: {
    mode: 'smart',
    requiredDeny: [],
  },
  // No current agent declares `high` or `full`; Hermes has no mode stricter
  // than `smart` that still lets a session act, so both stay here until an
  // agent actually reaches one of these levels and the gap is felt.
  high: {
    mode: 'smart',
    requiredDeny: [],
  },
  full: {
    mode: 'smart',
    requiredDeny: [],
  },
};

export const LEVEL_ORDER = ['assisted', 'partial', 'conditional', 'high', 'full'];

/** The baseline deny patterns every agent keeps regardless of level
 *  (force-push and a recursive delete) — the generator never removes these. */
export const BASELINE_DENY = ['git push --force*', 'git push -f*', 'rm -rf *'];

export function ruleFor(level) {
  const key = String(level || '').trim().toLowerCase();
  const rule = LEVEL_RULES[key];
  if (!rule) {
    throw new Error(
      `hermes-approval-levels: "${level}" is not one of ${LEVEL_ORDER.join('/')} ` +
      `(STD-041's five names); an agent without a declared level is Assisted, not unmapped.`
    );
  }
  return { level: key, ...rule };
}
