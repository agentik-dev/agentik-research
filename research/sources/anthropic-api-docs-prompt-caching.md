---
url: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
title: "Prompt caching"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Price multipliers relative to the base input token price, as of October 2026: 5-minute cache write 1.25 times; 1-hour cache write 2 times; cache read 0.1 times, except 0.025 times on Claude Fable 5.1 and Claude Mythos 5.1, and 0.05 times on Claude Opus 5.5 and Claude Sonnet 5.5. The pricing page (anthropic-pricing-doc) carries the same multipliers in its "Prompt caching" section.
- Lifetime: the default is 5 minutes; the cache is refreshed at no extra cost each time the cached content is used; a 1-hour lifetime is available at extra cost with `"ttl": "1h"`. The lifetime is measured from the start of the request that writes or reads the entry.
- Hierarchy: `tools`, then `system`, then `messages`; a change at one level invalidates that level and every later level. Changing tool definitions invalidates all three.
- Minimum cacheable prompt length depends on the model: 512 tokens (Fable 5.1, Mythos 5.1, Opus 5.5, Opus 5, Sonnet 5.5, Fable 5, Mythos 5, Haiku 5.5); 1,024 tokens (Opus 4.8, Sonnet 5, Sonnet 4.6, Sonnet 4.5, Opus 4.1, Opus 4, Sonnet 4); 2,048 tokens (Mythos Preview, Opus 4.7, Haiku 3.5); 4,096 tokens (Opus 4.6, Opus 4.5, Haiku 4.5). A shorter prompt is processed without caching and returns no error.

## Limits
- The page has no date. The fetch returned the first 100,000 of 160,435 characters; the multipliers were cross-checked against the pricing page, which I opened separately. Prices and model lists are volatile.

## Used in
- research/synthesis/field-3.md
