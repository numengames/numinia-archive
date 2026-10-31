#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// generate-hermes-approvals — the approval rules a Hermes config.yaml
// enforces come from the automation_level the agent's own OPERATOR.md
// declares, not from whoever last hand-edited the YAML.
//
// THE PROBLEM THIS SOLVES
// Twelve agents' adapters/hermes/config.yaml all read `approvals.mode:
// smart`, no matter whether their OPERATOR.md declared `assisted` or
// `partial`. STD-042 row 7 grades push-and-open-a-pull-request as "never"
// at assisted and "asks" at partial; `smart` can auto-approve a push its
// own smart_policy prose judges low-risk, so an assisted agent's config
// could let through exactly what its operator file forbids. Seven
// adapters' prose already escalates every push by hand; this script makes
// the config say so on its own, from the one field that is supposed to
// govern it.
//
// WHAT THIS TOUCHES
// Only the `approvals.mode` value and the `approvals.deny` list, inside
// each agent's adapters/hermes/config.yaml. It never rewrites smart_policy
// (each agent's domain-specific escalation prose), terminal, checkpoints,
// skills, memory or delegation — those are not what automation_level
// governs, and they carry per-agent wording nobody asked this script to
// regenerate. A baseline deny (force-push, rm -rf) is kept wherever it
// already exists; nothing is ever removed. Every agent but the orchestrator
// also carries the specialist house rules (SPECIALIST_DENY, the Oracle,
// 2026-10-31).
//
// Usage:
//   node machine/scripts/generate-hermes-approvals.mjs           apply and print a report
//   node machine/scripts/generate-hermes-approvals.mjs --check   exit 1 if any file would change, print the diff; writes nothing
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ruleForAgent } from './lib/hermes-approval-levels.mjs';
import { declareBlindSpots } from './lib/blindness.mjs';
declareBlindSpots('generate-hermes-approvals');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const CHECK_ONLY = process.argv.includes('--check');

function field(text, name) {
  const m = text.match(new RegExp(`^${name}:\\s*"?([^"\\n]*)"?\\s*$`, 'm'));
  return m ? m[1].trim() : undefined;
}

function listAgents() {
  return execFileSync('git', ['-C', ROOT, 'ls-files', 'agents/*/OPERATOR.md'], { encoding: 'utf8' })
    .split('\n')
    .filter((f) => f && !f.includes('/_template/'))
    .map((f) => f.split('/')[1])
    .sort();
}

/** Replace the value of `mode:` inside the `approvals:` top-level block.
 *  Returns { text, before } — before is undefined if no approvals/mode found. */
function setMode(text, mode) {
  const lines = text.split('\n');
  let inApprovals = false;
  let before;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^approvals:\s*$/.test(line)) { inApprovals = true; continue; }
    if (inApprovals && /^\S/.test(line)) { inApprovals = false; }
    if (inApprovals) {
      const m = line.match(/^(\s*mode:\s*)(\S+)(\s*)$/);
      if (m) {
        before = m[2];
        lines[i] = `${m[1]}${mode}${m[3]}`;
      }
    }
  }
  return { text: lines.join('\n'), before };
}

/** Append any missing deny patterns to the `deny:` list under `approvals:`.
 *  Returns { text, added }. Leaves existing entries and their order alone. */
function ensureDeny(text, requiredDeny) {
  const lines = text.split('\n');
  let inApprovals = false;
  let denyLineIdx = -1;
  let lastItemIdx = -1;
  let denyIndent = '  ';
  const present = new Set();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^approvals:\s*$/.test(line)) { inApprovals = true; continue; }
    if (inApprovals && /^\S/.test(line)) { inApprovals = false; }
    if (!inApprovals) continue;
    const denyHeader = line.match(/^(\s*)deny:\s*$/);
    if (denyHeader) { denyLineIdx = i; denyIndent = denyHeader[1]; lastItemIdx = i; continue; }
    if (denyLineIdx >= 0) {
      const item = line.match(/^\s*-\s*"([^"]*)"\s*$/);
      if (item) { present.add(item[1]); lastItemIdx = i; continue; }
      // first non-list line after deny: ends the list
      if (!/^\s*-/.test(line)) {
        // stop scanning this deny block once we hit a non-item line
        if (lastItemIdx === denyLineIdx) break; // empty list, nothing to end
        break;
      }
    }
  }
  const missing = requiredDeny.filter((p) => !present.has(p));
  if (missing.length === 0) return { text, added: [] };
  if (denyLineIdx === -1) return { text, added: [], noDenyBlock: true };
  const itemIndent = `${denyIndent}  `;
  const insert = missing.map((p) => `${itemIndent}- "${p}"`);
  lines.splice(lastItemIdx + 1, 0, ...insert);
  return { text: lines.join('\n'), added: missing };
}

function processAgent(agent) {
  const operatorPath = path.join(ROOT, 'agents', agent, 'OPERATOR.md');
  const configPath = path.join(ROOT, 'agents', agent, 'adapters', 'hermes', 'config.yaml');
  if (!existsSync(configPath)) return { agent, skipped: 'no adapters/hermes/config.yaml' };
  const level = field(readFileSync(operatorPath, 'utf8'), 'automation_level');
  const rule = ruleForAgent(agent, level);
  const original = readFileSync(configPath, 'utf8');
  const { text: afterMode, before: modeBefore } = setMode(original, rule.mode);
  const { text: finalText, added } = ensureDeny(afterMode, rule.requiredDeny);
  const changed = finalText !== original;
  return {
    agent, level: rule.level, modeBefore, modeAfter: rule.mode, added, changed,
    configPath, finalText,
  };
}

function main() {
  const agents = listAgents();
  const results = agents.map(processAgent);
  const changed = results.filter((r) => r.changed);
  const toManual = changed.filter((r) => r.modeAfter === 'manual');

  for (const r of results) {
    if (r.skipped) { console.log(`${r.agent}: skipped (${r.skipped})`); continue; }
    const modeNote = r.modeBefore === r.modeAfter ? r.modeAfter : `${r.modeBefore} → ${r.modeAfter}`;
    const denyNote = r.added.length ? `, +deny ${r.added.join(', ')}` : '';
    console.log(`${r.agent} (${r.level}): mode ${modeNote}${denyNote}${r.changed ? '' : ' (already in sync)'}`);
  }
  console.log('');
  console.log(`${results.length} adapters checked, ${changed.length} changed, ${toManual.length} now on approvals.mode: manual.`);

  if (CHECK_ONLY) {
    if (changed.length > 0) {
      console.error(`\n--check: ${changed.length} config(s) diverge from their OPERATOR.md automation_level — run without --check to fix.`);
      process.exit(1);
    }
    return;
  }

  for (const r of results) {
    if (r.skipped || !r.changed) continue;
    writeFileSync(r.configPath, r.finalText);
  }
}

main();
