// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Procyon, the chat bubble's Worker route (web/worker/). What these pin:
// a link Procyon gives is a page in the sitemap or it is removed; the
// route refuses other sites, bad bodies and too many questions; the
// static site never runs through the script (run_worker_first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bodyOf, pathOf, sitemapPaths, compactIndex, systemPrompt, checkLinks } from "../../../web/worker/procyon.mjs";
import worker, { conversation, replyText, MAX_IN_FLIGHT } from "../../../web/worker/index.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

const SITEMAP = `<?xml version="1.0"?><urlset>
<url><loc>https://numinia.org/</loc></url>
<url><loc>https://numinia.org/decisions/adr-030/</loc></url>
<url><loc>https://numinia.org/agents/procyon/soul/</loc></url>
<url><loc>https://numinia.org/system/open-books/</loc></url>
<url><loc>https://numinia.org/legal/privacy/</loc></url>
</urlset>`;
const LLMS = `# numinia.org — the archive

Intro line about the archive.

## Documents

### decisions

- [The four tests before deletion](https://numinia.org/decisions/adr-030.md) — ADR-030 · active · CC-BY-4.0
- [A page that is gone](https://numinia.org/decisions/adr-999.md) — ADR-999 · active · CC-BY-4.0

## Composed views

- [/system/open-books](https://numinia.org/system/open-books.md) — from system/SYS-008-the-account.md
`;
const SOUL = `---\nagent: procyon\n---\n\n<!--\nSPDX-FileCopyrightText: x\n-->\n\n# PROCYON\n\nYou are Procyon.`;

test("pathOf normalises every way a page is written", () => {
	assert.equal(pathOf("https://numinia.org/decisions/adr-030.md"), "/decisions/adr-030");
	assert.equal(pathOf("https://numinia.org/decisions/adr-030/"), "/decisions/adr-030");
	assert.equal(pathOf("https://www.numinia.org/decisions/adr-030#x"), "/decisions/adr-030");
	assert.equal(pathOf("/decisions/adr-030?a=1"), "/decisions/adr-030");
	assert.equal(pathOf("https://numinia.org/"), "/");
	assert.equal(pathOf("https://numinia.org/home.md"), "/");
	assert.equal(pathOf("https://example.com/x"), null);
	assert.equal(pathOf("decisions/adr-030"), null);
});

test("bodyOf drops the header and the SPDX comment", () => {
	assert.equal(bodyOf(SOUL), "# PROCYON\n\nYou are Procyon.");
});

test("the index lists the sitemap's pages, titled from llms.txt, and nothing else", () => {
	const allowed = sitemapPaths(SITEMAP);
	assert.equal(allowed.size, 5);
	const { intro, index } = compactIndex(LLMS, allowed);
	assert.match(intro, /Intro line/);
	assert.match(index, /^\/decisions\/adr-030 — ADR-030 The four tests before deletion$/m);
	assert.match(index, /^\/system\/open-books — page built from: SYS-008 the account$/m);
	assert.match(index, /^\/legal\/privacy$/m, "a sitemap page missing from llms.txt still appears");
	assert.doesNotMatch(index, /adr-999/, "a page not in the sitemap is never offered");
});

test("the system prompt carries the soul, the rules and the index", () => {
	const allowed = sitemapPaths(SITEMAP);
	const { intro, index } = compactIndex(LLMS, allowed);
	const s = systemPrompt({ soul: SOUL, operator: "# OPERATOR", sources: "# SOURCES", intro, index });
	assert.match(s, /You are Procyon\./);
	assert.match(s, /Never make up an address/);
	assert.match(s, /hola@numengames\.com/);
	assert.match(s, /\/decisions\/adr-030 — ADR-030/);
	assert.doesNotMatch(s, /SPDX/);
});

test("checkLinks keeps real pages and removes invented ones", () => {
	const allowed = sitemapPaths(SITEMAP);
	const text = "Read [the tests](https://numinia.org/decisions/adr-030) and [a ghost](https://numinia.org/decisions/adr-999), or [elsewhere](https://evil.example/x). Also https://numinia.org/legal/privacy. and https://numinia.org/nope here.";
	const { text: out, kept, removed } = checkLinks(text, allowed);
	assert.match(out, /\[the tests\]\(https:\/\/numinia\.org\/decisions\/adr-030\)/);
	assert.match(out, /and a ghost,/);
	assert.match(out, /or elsewhere\./);
	assert.match(out, /https:\/\/numinia\.org\/legal\/privacy\./);
	assert.doesNotMatch(out, /nope|adr-999|evil/);
	assert.deepEqual(kept.map((k) => k.url), ["https://numinia.org/decisions/adr-030", "https://numinia.org/legal/privacy"]);
	assert.equal(removed.length, 3);
});

test("checkLinks rewrites a relative or .md link to the page's address", () => {
	const allowed = sitemapPaths(SITEMAP);
	const { text } = checkLinks("[open books](/system/open-books.md)", allowed);
	assert.equal(text, "[open books](https://numinia.org/system/open-books)");
});

test("checkLinks keeps the contact address as plain text, never as an invented link", () => {
	const allowed = sitemapPaths(SITEMAP);
	const a = checkLinks("Escribe a [hola@numengames.com](mailto:hola@numengames.com).", allowed);
	assert.equal(a.text, "Escribe a hola@numengames.com.");
	assert.equal(a.removed.length, 0);
	const b = checkLinks("[un equipo](mailto:hola@numengames.com)", allowed);
	assert.equal(b.text, "un equipo (hola@numengames.com)");
	assert.equal(checkLinks("[x](mailto:otro@example.com)", allowed).removed.length, 1);
});

test("conversation keeps the last turns, ends on the visitor, refuses junk", () => {
	assert.equal(conversation({}), null);
	assert.equal(conversation({ messages: [{ role: "system", content: "x" }] }), null);
	assert.equal(conversation({ messages: [{ role: "user", content: "  " }] }), null);
	assert.equal(conversation({ messages: [{ role: "user", content: "hola" }, { role: "assistant", content: "hi" }] }), null);
	const long = conversation({ messages: [{ role: "user", content: "x".repeat(5000) }] });
	assert.equal(long[0].content.length, 800);
	const many = Array.from({ length: 30 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: `m${i}` }));
	many.push({ role: "user", content: "last" });
	const c = conversation({ messages: many });
	assert.ok(c.length <= 12);
	assert.equal(c[0].role, "user");
	assert.equal(c.at(-1).content, "last");
});

test("replyText reads every answer shape and drops thinking", () => {
	assert.equal(replyText({ response: "<think>hmm</think> Hola." }), "Hola.");
	assert.equal(replyText({ choices: [{ message: { content: "Hi." } }] }), "Hi.");
	assert.equal(replyText(null), "");
});

// The Worker with a fake Cloudflare around it.
function env({ answer = "Mira [ADR-030](https://numinia.org/decisions/adr-030) y [esto](https://numinia.org/inventado).", allow = true, slow = 0 } = {}) {
	const files = {
		"/agents/procyon/soul.md": SOUL,
		"/agents/procyon/operator.md": "# OPERATOR",
		"/agents/procyon/sources.md": "# SOURCES",
		"/llms.txt": LLMS,
		"/sitemap-0.xml": SITEMAP,
	};
	const calls = [];
	return {
		calls,
		ASSETS: { fetch: async (req) => {
			const p = new URL(req.url).pathname;
			return p in files ? new Response(files[p]) : new Response("static " + p, { status: p === "/" ? 200 : 404 });
		} },
		AI: { run: async (model, input) => {
			calls.push({ model, input });
			if (slow) await new Promise((r) => setTimeout(r, slow));
			return { response: answer };
		} },
		PROCYON_PER_VISITOR: { limit: async () => ({ success: allow }) },
		PROCYON_ALL: { limit: async () => ({ success: true }) },
	};
}
const ask = (e, body, headers = {}) =>
	worker.fetch(new Request("https://numinia.org/api/procyon", {
		method: "POST",
		headers: { "content-type": "application/json", origin: "https://numinia.org", ...headers },
		body: typeof body === "string" ? body : JSON.stringify(body),
	}), e);

test("the route answers with links checked against the sitemap", async () => {
	const e = env();
	const r = await ask(e, { messages: [{ role: "user", content: "¿Qué es ADR-030?" }] });
	assert.equal(r.status, 200);
	assert.equal(r.headers.get("cache-control"), "no-store");
	const d = await r.json();
	assert.match(d.reply, /\[ADR-030\]\(https:\/\/numinia\.org\/decisions\/adr-030\)/);
	assert.doesNotMatch(d.reply, /inventado/);
	assert.deepEqual(d.links.map((l) => l.url), ["https://numinia.org/decisions/adr-030"]);
	const sent = e.calls[0].input.messages;
	assert.equal(sent[0].role, "system");
	assert.match(sent[0].content, /You are Procyon\./);
	assert.equal(sent.at(-1).content, "¿Qué es ADR-030?");
});

test("the route tells the model which page the visitor has open, if it is a real page", async () => {
	const e = env();
	await ask(e, { messages: [{ role: "user", content: "¿Qué es este documento?" }], page: "/decisions/adr-030/" });
	assert.match(e.calls[0].input.messages[0].content, /has this page open: https:\/\/numinia\.org\/decisions\/adr-030 \(ADR-030 The four tests before deletion\)/);
	const f = env();
	await ask(f, { messages: [{ role: "user", content: "hi" }], page: "/made-up" });
	assert.doesNotMatch(f.calls[0].input.messages[0].content, /has this page open/);
});

test("the route refuses other sites, other methods and bad bodies", async () => {
	assert.equal((await ask(env(), { messages: [{ role: "user", content: "hi" }] }, { origin: "https://evil.example" })).status, 403);
	assert.equal((await worker.fetch(new Request("https://numinia.org/api/procyon"), env())).status, 405);
	assert.equal((await ask(env(), "not json")).status, 400);
	assert.equal((await ask(env(), { messages: [] })).status, 400);
});

test("too many questions from one visitor get a 429, not an answer", async () => {
	const e = env({ allow: false });
	const r = await ask(e, { messages: [{ role: "user", content: "hi" }] });
	assert.equal(r.status, 429);
	assert.equal((await r.json()).error, "too_many");
	assert.equal(e.calls.length, 0, "the model is never called");
});

test(`no more than ${MAX_IN_FLIGHT} answers are in flight at once`, async () => {
	const e = env({ slow: 50 });
	const all = await Promise.all(Array.from({ length: MAX_IN_FLIGHT + 2 }, () => ask(e, { messages: [{ role: "user", content: "hi" }] })));
	const codes = all.map((r) => r.status).sort();
	assert.equal(codes.filter((c) => c === 200).length, MAX_IN_FLIGHT);
	assert.equal(codes.filter((c) => c === 429).length, 2);
});

test("every other address goes to the static site untouched", async () => {
	const r = await worker.fetch(new Request("https://numinia.org/"), env());
	assert.equal(await r.text(), "static /");
	assert.equal((await worker.fetch(new Request("https://numinia.org/api/other"), env())).status, 404);
});

test("wrangler.toml sends only /api/* through the script", () => {
	const toml = readFileSync(path.join(ROOT, "web", "wrangler.toml"), "utf8");
	assert.match(toml, /^main = "worker\/index\.mjs"$/m);
	assert.match(toml, /^run_worker_first = \["\/api\/\*"\]$/m);
	assert.match(toml, /^binding = "AI"$/m);
	assert.match(toml, /^name = "numinia-nwos"$/m, "the deployed worker's name never changes");
});
