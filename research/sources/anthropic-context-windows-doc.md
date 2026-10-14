---
url: https://platform.claude.com/docs/en/build-with-claude/context-windows
title: "Context windows"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026; the docs.claude.com address redirects here)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "How the context window works": more context is not automatically better. The page states "As token count grows, accuracy and recall degrade, a phenomenon known as context rot." It links to the context-engineering post (anthropic-context-engineering). As of October 2026, this is Anthropic's own documentation stating the effect.
- Everything in the request counts toward the window: system prompt, every message including tool results, images and documents, tool definitions, and the output including thinking. Cached prefixes still occupy the window; caching changes price, not size.
- Section "Context window sizes by model", as of October 2026: a 1M-token window applies to Claude Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Opus 5.5, Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5.5, Sonnet 5, Sonnet 4.6, Haiku 5.5 and Mythos Preview. Other models, including Sonnet 4.5 (marked deprecated), have 200k tokens. A single request can generate up to 128k output tokens.
- For these 1M models, 1M is the default with no beta header, and long-context requests bill at standard pricing, except Haiku 5.5, where prompts over 100,000 tokens cost more (see anthropic-pricing-doc).
- Context awareness (as of October 2026): Sonnet 5, Sonnet 4.6 and Haiku 4.5 (and deprecated Sonnet 4.5) receive their remaining token budget in injected tags after tool calls. Opus 4.7 and later, Sonnet 5.5, Fable, Mythos and Haiku 5.5 do not; for them the page points to task budgets (beta).
- Primary strategy for long runs: server-side compaction, in beta for Claude 4.6 and later models. Context editing offers tool-result clearing and thinking-block clearing.
- Tip on the page: for agents spanning several sessions, design state artifacts so that recovery is fast when a new session starts; it links the long-running harness post (anthropic-effective-harnesses).

## Limits
- Volatile: the model list, window sizes and beta status are as of October 2026 and change with each release.
- A documentation page, not a measurement; it gives no numbers for how much accuracy is lost at which length.

## Used in
- research/synthesis/field-1.md
