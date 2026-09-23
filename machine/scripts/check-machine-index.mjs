#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-machine-index — the machine index points at pages that exist.
//
// WHY THIS GUARD EXISTS, IN ONE SENTENCE: an index that invents addresses is
// worse than no index, because a machine believes it.
//
// /index.json and /llms.txt are the door an agent arrives at. They name every
// document twice — as a page and as its `.md` — and both addresses are
// ASSEMBLED, from the same identifier shapes each route uses. Route and index
// derive the address in two different files, so they can drift apart with no
// error anywhere: the first version of this surface emitted fifteen addresses
// that were never built (blueprints are served at their slug with the
// identifier stripped, reports at the entry id, and the index assembled
// `/<series>/<frontmatter id>` for both). The build was green. The sitemap was
// right. Only the invented rows were wrong, and nothing was looking at them.
//
// So this reads the built index back and checks it against web/dist:
//
//   MCH-001  every `url` in index.json was built as a page
//   MCH-002  every `md` in index.json was built
//   MCH-003  every document row carries a licence — null means the resolver
//            gave up, which on a rights question is not an acceptable answer
//   MCH-004  the index is not vacuous (it would pass trivially if empty)
//   MCH-005  llms.txt exists and names the .md convention
//
// A BUILD GUARD, not a rule guard: it verifies an artefact against itself, so
// it bites whatever state any standard is in (ENG-067 exception).
//
// What it deliberately does NOT check: whether the index is COMPLETE. A
// document missing from it is invisible here, because "every published address
// appears" is a question about the collection query and belongs to the build,
// not to a file comparison. Declared in the registry, not hidden.
//
// Run: node machine/scripts/check-machine-index.mjs   (needs web/dist)
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { declareBlindSpots } from './lib/blindness.mjs';

declareBlindSpots('check-machine-index');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const DIST = path.join(ROOT, 'web', 'dist');

/** The file a site path is served from: /a/b -> dist/a/b/index.html. */
function pageFile(url) {
  return path.join(DIST, url === '/' ? '' : url.slice(1), 'index.html');
}

export function run() {
  const findings = [];
  const indexFile = path.join(DIST, 'index.json');
  const llmsFile = path.join(DIST, 'llms.txt');

  if (!existsSync(indexFile)) {
    return [{ plate: 'MCH-004', what: 'index.json was not built', where: 'web/dist/index.json' }];
  }

  let data;
  try {
    data = JSON.parse(readFileSync(indexFile, 'utf8'));
  } catch (e) {
    return [{ plate: 'MCH-004', what: `index.json is not valid JSON: ${e.message}`, where: 'web/dist/index.json' }];
  }

  const documents = Array.isArray(data.documents) ? data.documents : [];
  const views = Array.isArray(data.views) ? data.views : [];
  const rows = [...documents, ...views];

  // MCH-004 first: every check below passes vacuously over an empty list, and
  // an empty index is the failure most worth catching (D-039 records the same
  // reasoning for check-url-shape).
  if (!documents.length) {
    findings.push({ plate: 'MCH-004', what: 'index.json lists zero documents — refusing to pass vacuously', where: 'web/dist/index.json' });
  }

  for (const row of rows) {
    if (typeof row.url !== 'string' || typeof row.md !== 'string') {
      findings.push({ plate: 'MCH-001', what: `a row is missing url or md: ${JSON.stringify(row).slice(0, 120)}`, where: 'web/dist/index.json' });
      continue;
    }
    if (!existsSync(pageFile(row.url))) {
      findings.push({ plate: 'MCH-001', what: `index.json names ${row.url}, which the build did not publish`, where: 'web/dist/index.json' });
    }
    const md = path.join(DIST, row.md.slice(1));
    if (!existsSync(md)) {
      findings.push({ plate: 'MCH-002', what: `index.json offers ${row.md}, which the build did not write`, where: 'web/dist/index.json' });
    } else if (statSync(md).size === 0) {
      findings.push({ plate: 'MCH-002', what: `${row.md} was built empty`, where: `web/dist${row.md}` });
    }
  }

  for (const doc of documents) {
    if (!doc.license) {
      findings.push({
        plate: 'MCH-003',
        what: `${doc.source ?? doc.url} resolves to no licence — neither its header nor REUSE.toml answered, and a null licence published as fact is a rights claim nobody made`,
        where: 'web/dist/index.json',
      });
    }
  }

  if (!existsSync(llmsFile)) {
    findings.push({ plate: 'MCH-005', what: 'llms.txt was not built', where: 'web/dist/llms.txt' });
  } else {
    const txt = readFileSync(llmsFile, 'utf8');
    if (!/\.md/.test(txt.split('\n').slice(0, 30).join('\n'))) {
      findings.push({ plate: 'MCH-005', what: 'llms.txt does not name the .md convention in its opening lines — the one fact it exists to state', where: 'web/dist/llms.txt' });
    }
  }

  return findings;
}

const findings = run();
const checked = (() => {
  try {
    const d = JSON.parse(readFileSync(path.join(DIST, 'index.json'), 'utf8'));
    return (d.documents?.length ?? 0) + (d.views?.length ?? 0);
  } catch {
    return 0;
  }
})();

if (findings.length) {
  for (const f of findings) console.error(`${f.plate}  ${f.where}: ${f.what}`);
  console.error(`\ncheck-machine-index: ${findings.length} finding(s) over ${checked} row(s).`);
  process.exit(1);
}
console.log(`check-machine-index: ${checked} row(s); every address is built, every document declares a licence.`);
