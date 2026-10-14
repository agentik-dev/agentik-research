---
url: https://platform.claude.com/docs/en/about-claude/pricing
title: "Pricing"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Long context pricing", as of October 2026: Claude 4.6 and later models (except Claude Haiku 5.5) and Claude Mythos Preview include the full 1M-token window at standard pricing; a 900k-token request is billed at the same per-token rate as a 9k-token request. Prompt caching and batch discounts apply across the full window.
- Haiku 5.5 is the exception: prompts over 100,000 tokens pay higher prices. The prompt length counts all input tokens including cache reads and writes, and each request is priced on its own.
- Model pricing table, as of October 2026, per million input / output tokens in US dollars: Fable 5.1 and Fable 5 10 / 50; Opus 5.5 4 / 20; Opus 5 through Opus 4.5 5 / 25; Sonnet 5.5 and Sonnet 5 2 / 10; Sonnet 4.6 and 4.5 3 / 15; Haiku 5.5 0.10 / 0.50 up to 100,000 tokens and 0.50 / 2.50 above that; Haiku 4.5 1 / 5. Mythos 5.1 and Mythos 5 list at the Fable price with limited availability.
- Cache reads cost 0.1 times the base input price on most models, 0.05 times on Opus 5.5 and Sonnet 5.5, and 0.025 times on Fable 5.1 and Mythos 5.1.
- A footnote says Sonnet 5's launch price of 2 / 10 dollars, announced as introductory through 31 August 2026, is now the standard price and the planned rise to 3 / 15 will not occur.

## Limits
- Prices and thresholds are volatile; they are as of October 2026. This note records list prices only, not batch, regional or data-residency multipliers.
- An earlier Anthropic page (anthropic-opus-4-6-launch, February 2026) charged a premium for prompts over 200k tokens; the October 2026 page does not.

## Used in
- research/synthesis/field-1.md

## Also (question 3)
- Section "Prompt caching" (as of October 2026): multipliers relative to base input price are 1.25 for a 5-minute cache write, 2 for a 1-hour cache write, and 0.1 for a cache read (0.025 on Fable 5.1 and Mythos 5.1, 0.05 on Opus 5.5 and Sonnet 5.5). The page says a cache hit costs 10 percent of the standard input price, so caching pays off after one read for the 5-minute duration or after two reads for the 1-hour duration.
- Model table rows, dollars per million tokens (base input, 5-minute write, 1-hour write, cache hit): Sonnet 5.5 is 2, 2.50, 4, 0.10; Opus 5.5 is 4, 5, 8, 0.20. Cache hits and refreshes both count at the read price.
- The same multipliers are on the API prompt caching page (anthropic-api-docs-prompt-caching).

## Also (question 4)
Re-read on 2026-10-14 for budgets and cache cost. As of October 2026, dollars per million tokens (MTok): base input / 5-minute cache write / 1-hour cache write / cache hit / output.
- Fable 5.1: 10 / 12.50 / 20 / 0.25 / 50. Fable 5: 10 / 12.50 / 20 / 1 / 50. Opus 5.5: 4 / 5 / 8 / 0.20 / 20. Opus 5 and Opus 4.5 to 4.8: 5 / 6.25 / 10 / 0.50 / 25. Sonnet 5.5: 2 / 2.50 / 4 / 0.10 / 10. Sonnet 5: 2 / 2.50 / 4 / 0.20 / 10. Sonnet 4.6 and 4.5: 3 / 3.75 / 6 / 0.30 / 15. Haiku 5.5 up to 100,000 tokens: 0.10 / 0.125 / 0.20 / 0.01 / 0.50; over 100,000 tokens: 0.50 / 0.625 / 1 / 0.05 / 2.50. Haiku 4.5: 1 / 1.25 / 2 / 0.10 / 5.
- Section "Prompt caching": multipliers on base input are 1.25x for a 5-minute write, 2x for a 1-hour write and 0.1x for a read (0.025x on Fable 5.1 and Mythos 5.1; 0.05x on Opus 5.5 and Sonnet 5.5). The page says caching "pays off after one cache read for the 5-minute duration (1.25x write), or after two cache reads for the 1-hour duration (2x write)." The multipliers stack with the Batch API discount and with the 1.1x data-residency multiplier for US-only inference on Claude 4.6 and later.
- Worked example (Opus 5.5, one-hour session, 50,000 input and 15,000 output tokens): total 0.58 dollars without caching; with 40,000 of the input tokens as cache reads (40,000 x 4 x 0.05 / 1,000,000 = 0.008 dollars) the total is 0.428 dollars.
- Long-context pricing: no premium above 200k tokens on Claude 4.6 and later, except that Haiku 5.5 prices a request by its prompt length (cache reads and writes count toward the 100,000 tokens) and each request is priced on its own.
- Arithmetic of mine from the table, which the page does not state: re-reading a 200,000-token context costs 0.04 dollars as a cache read on Opus 5.5 (0.20 per MTok), against 1.60 dollars to rewrite it cold at the 1-hour write price (8 per MTok), a ratio of 40; on Opus 5 the read is 0.10 dollars, the 5-minute rewrite 1.25 dollars and the 1-hour rewrite 2.00 dollars. So a turn-by-turn cost of the form turns times context is weighted by the read price while the cache is warm and by the write price after a miss.
- Used in (question 4): research/synthesis/field-4.md

## Also (question 10)
Re-opened on 2026-10-14 to check the rows used for cost lanes; the saved page text matches the figures above. As of October 2026.
- Section "Batch processing": the Batch API takes 50 percent off both input and output tokens, and the discount stacks with caching multipliers. Section "Fast mode pricing": Opus 5.5 8 / 40 US dollars per million input / output tokens; fast mode is available on the first-party API only and not with the Batch API.
- Used in (question 10): research/synthesis/field-10.md
