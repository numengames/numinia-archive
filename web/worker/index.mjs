// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The numinia.org Worker. The site is static: every address is served from
// dist/ exactly as before, without passing through this file. Only /api/*
// reaches it (wrangler.toml, run_worker_first), and today /api/procyon is
// the one route: the chat bubble's questions to Procyon, the archive's host.
//
// What it does with a question: reads Procyon's three published files and
// the site's index (llms.txt, sitemap) from the site's own assets, asks a
// free Workers AI model, removes every link that is not a page in the
// sitemap, and answers. It keeps nothing: no log of questions, no cookie,
// no memory between visits. Limits: a few questions a minute per visitor,
// five answers in flight at once, short messages, short conversations.

import { sitemapPaths, compactIndex, systemPrompt, checkLinks, pathOf, ORIGIN } from "./procyon.mjs";

export const DEFAULT_MODEL = "@cf/google/gemma-4-26b-a4b-it";
export const MAX_IN_FLIGHT = 5;
export const MAX_TURNS = 12; // messages kept from the conversation (user + assistant)
export const MAX_CHARS = 800; // per visitor message
const FRESH_MS = 10 * 60 * 1000;
const ORIGINS = new Set(["https://numinia.org", "https://www.numinia.org"]);

let knowledge = null; // { at, system, allowed }
let inFlight = 0;

const json = (status, body) =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store",
			"x-content-type-options": "nosniff",
		},
	});

async function load(env, base) {
	if (knowledge && Date.now() - knowledge.at < FRESH_MS) return knowledge;
	const read = async (p) => {
		const r = await env.ASSETS.fetch(new Request(new URL(p, base)));
		if (!r.ok) throw new Error(`${p} answered ${r.status}`);
		return r.text();
	};
	const [soul, operator, sources, llms, sitemap] = await Promise.all([
		read("/agents/procyon/soul.md"),
		read("/agents/procyon/operator.md"),
		read("/agents/procyon/sources.md"),
		read("/llms.txt"),
		read("/sitemap-0.xml"),
	]);
	const allowed = sitemapPaths(sitemap);
	const { intro, index } = compactIndex(llms, allowed);
	const titles = new Map(index.split("\n").map((l) => { const at = l.indexOf(" — "); return at === -1 ? [l, ""] : [l.slice(0, at), l.slice(at + 3)]; }));
	knowledge = { at: Date.now(), allowed, titles, system: systemPrompt({ soul, operator, sources, intro, index }) };
	return knowledge;
}

/** The visitor's conversation, trimmed to what the model may see. Null when malformed. */
export function conversation(body) {
	const list = Array.isArray(body?.messages) ? body.messages : null;
	if (!list || list.length === 0) return null;
	const out = [];
	for (const m of list.slice(-MAX_TURNS)) {
		if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return null;
		const content = m.content.trim().slice(0, m.role === "user" ? MAX_CHARS : 2000);
		if (!content) return null;
		out.push({ role: m.role, content });
	}
	while (out.length && out[0].role !== "user") out.shift();
	if (!out.length || out[out.length - 1].role !== "user") return null;
	return out;
}

/** Text out of whichever shape the model answers in; reasoning blocks removed. */
export function replyText(result) {
	let t = "";
	if (typeof result === "string") t = result;
	else if (typeof result?.response === "string") t = result.response;
	else if (result?.choices?.[0]?.message?.content) t = String(result.choices[0].message.content);
	else if (typeof result?.output_text === "string") t = result.output_text;
	let out = "";
	let i = 0;
	for (;;) {
		const a = t.indexOf("<think>", i);
		if (a === -1) { out += t.slice(i); break; }
		out += t.slice(i, a);
		const b = t.indexOf("</think>", a);
		if (b === -1) break;
		i = b + 8;
	}
	return out.trim();
}

/** One line telling the model which page the visitor has open, when it is a page of the site. */
export function whereLine(page, k) {
	const here = pathOf(page);
	if (!here || !k.allowed.has(here)) return "";
	const title = k.titles?.get(here);
	return `\n\n# Where the visitor is\nThe visitor has this page open: ${ORIGIN}${here === "/" ? "/" : here}${title ? ` (${title})` : ""}. "This page" or "this document" means it.`;
}

export async function procyon(request, env) {
	if (request.method !== "POST") return json(405, { error: "Use POST." });
	const origin = request.headers.get("origin");
	if (origin && !ORIGINS.has(origin) && !(env.PROCYON_DEV_ORIGIN && origin === env.PROCYON_DEV_ORIGIN)) {
		return json(403, { error: "This assistant answers on numinia.org only." });
	}
	let body;
	try {
		body = await request.json();
	} catch {
		return json(400, { error: "Bad request." });
	}
	const messages = conversation(body);
	if (!messages) return json(400, { error: "Bad request." });

	const visitor = request.headers.get("cf-connecting-ip") || "unknown";
	if (env.PROCYON_PER_VISITOR) {
		const { success } = await env.PROCYON_PER_VISITOR.limit({ key: visitor });
		if (!success) return json(429, { error: "too_many", retry: 60 });
	}
	if (env.PROCYON_ALL) {
		const { success } = await env.PROCYON_ALL.limit({ key: "all" });
		if (!success) return json(429, { error: "busy", retry: 30 });
	}
	if (inFlight >= MAX_IN_FLIGHT) return json(429, { error: "busy", retry: 10 });

	inFlight++;
	try {
		const k = await load(env, request.url);
		const model = env.PROCYON_MODEL || DEFAULT_MODEL;
		const result = await Promise.race([
			env.AI.run(model, {
				messages: [{ role: "system", content: k.system + whereLine(body.page, k) }, ...messages],
				max_tokens: 2000,
				temperature: 0.3,
				// Answer straight away: the visitor waits for every thinking token.
				chat_template_kwargs: { enable_thinking: false },
			}),
			new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 60000)),
		]);
		const text = replyText(result);
		if (!text) return json(502, { error: "empty" });
		const { text: reply, kept } = checkLinks(text, k.allowed);
		return json(200, { reply, links: kept });
	} catch (e) {
		console.error("procyon", e?.message || e);
		return json(503, { error: "unavailable" });
	} finally {
		inFlight--;
	}
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.pathname === "/api/procyon") return procyon(request, env);
		if (url.pathname.startsWith("/api/")) return json(404, { error: "Not found." });
		return env.ASSETS.fetch(request);
	},
};
