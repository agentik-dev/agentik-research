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
