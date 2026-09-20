#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
/**
 * ruleset-export.mjs — the written-down branch protection, kept honest.
 *
 * THE PROBLEM THIS SOLVES
 * -----------------------
 * `.github/rulesets/protect-main.json` is a snapshot of the ruleset that
 * protects `main`. The panel is the source of truth; the file exists so the
 * setting can be read, diffed and reviewed in a pull request.
 *
 * A snapshot nobody compares is a claim nobody checks. This file drifted for
 * two weeks while stating the opposite of the live setting on the one
 * question that matters most — how many approvals `main` requires.
 *
 * Two subcommands:
 *
 *   node machine/tools/ruleset-export.mjs           # rewrite the snapshot from the panel
 *   node machine/tools/ruleset-export.mjs --check   # exit 1 if the snapshot has drifted
 *
 * WHY NOT `gh api ... > protect-main.json`
 * ----------------------------------------
 * That was the documented command and it is lossy in both directions. It
 * writes five transport fields that say nothing about the configuration
 * (`_links`, `node_id`, `created_at`, `updated_at`, `current_user_can_bypass`),
 * and it DROPS `bypass_actors` — the API omits the key when the list is
 * empty, and an absent key reads as "unknown" where the file said "nobody".
 * "Nobody bypasses this" is the most important sentence the snapshot
 * contains, and the documented refresh command deleted it.
 *
 * WHAT --check CAN AND CANNOT DO
 * ------------------------------
 * It needs a credential that can read repository rulesets — admin scope. CI's
 * default token does not have it, so this does not run in the pipeline: it is
 * a command a person with the panel's own rights can run, and it answers in
 * one line instead of by reading two JSON files side by side. Without a
 * credential it says so and exits 2, which is neither pass nor fail: an
 * unanswered question is not a clean result.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../scripts/lib/frontmatter.mjs';
import { declareBlindSpots } from '../scripts/lib/blindness.mjs';

/* What this tool did not look at, printed before its verdict (D-025). Without
   a credential it sees nothing at all and says so with exit 2. */
declareBlindSpots('ruleset-export');

const RULESET_ID = 21281544;
const SNAPSHOT = path.join(ROOT, '.github/rulesets/protect-main.json');

/* The configuration, and nothing about the transport. `bypass_actors` is
   restored to [] when the API omits it: the empty list is the statement. */
const CONFIG_KEYS = ['id', 'name', 'target', 'source_type', 'source', 'enforcement', 'conditions', 'rules'];

function shape(raw) {
  const out = {};
  for (const k of CONFIG_KEYS) if (k in raw) out[k] = raw[k];
  out.bypass_actors = raw.bypass_actors ?? [];
  return out;
}

function fromPanel() {
  try {
    const raw = execFileSync('gh', ['api', `repos/numengames/numinia-archive/rulesets/${RULESET_ID}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return shape(JSON.parse(raw));
  } catch (e) {
    const why = /not found|404/i.test(String(e.stderr ?? e)) ? 'the credential cannot read rulesets (admin scope required)' : String(e.stderr ?? e.message).trim().split('\n')[0];
    console.error(`ruleset: cannot read the panel — ${why}`);
    console.error('This is unknown, not clean. Run it with a credential that administers the repository.');
    process.exit(2);
  }
}

/* Key order is not configuration, and neither is a rule's position in the
   array. Flatten both sides to leaf paths and compare those: the report then
   names the setting that differs instead of printing two blobs. */
function flatten(node, trail = [], out = {}) {
  if (Array.isArray(node)) node.forEach((v, i) => flatten(v, [...trail, String(i)], out));
  else if (node && typeof node === 'object') Object.keys(node).sort().forEach((k) => flatten(node[k], [...trail, k], out));
  else out[trail.join('.')] = node;
  return out;
}

/* A rule is identified by its type, not by where it sits in the array. The
   same is true of a required status check: it is identified by its context.
   Compared by position, dropping the first of two checks reads as "check one
   was renamed and check two vanished" — two invented changes in place of the
   one that happened. */
function byType(rs) {
  const rules = Object.fromEntries((rs.rules ?? []).map((r) => [r.type, { ...(r.parameters ?? {}) }]));
  const checks = rules.required_status_checks?.required_status_checks;
  if (Array.isArray(checks)) {
    rules.required_status_checks.required_status_checks =
      Object.fromEntries(checks.map((c) => [c.context, c]));
  }
  return { ...rs, rules };
}

function differences(fileRs, panelRs) {
  const a = flatten(byType(fileRs));
  const b = flatten(byType(panelRs));
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  return keys.filter((k) => a[k] !== b[k]).map((k) => ({ at: k, file: a[k], panel: b[k] }));
}

const check = process.argv.includes('--check');
const panel = fromPanel();

if (!check) {
  writeFileSync(SNAPSHOT, `${JSON.stringify(panel, null, 2)}\n`);
  console.log(`ruleset: snapshot rewritten from the panel → ${path.relative(ROOT, SNAPSHOT)}`);
  process.exit(0);
}

const file = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
const diffs = differences(file, panel);
if (!diffs.length) {
  console.log('ruleset: the snapshot matches the panel');
  process.exit(0);
}
console.error(`ruleset: DRIFTED — ${diffs.length} difference(s). The panel is right; the file is stale.`);
for (const d of diffs) console.error(`  ${d.at}\n      file : ${JSON.stringify(d.file)}\n      panel: ${JSON.stringify(d.panel)}`);
console.error('\nRefresh it: node machine/tools/ruleset-export.mjs');
process.exit(1);
