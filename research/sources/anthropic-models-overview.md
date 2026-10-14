---
url: https://platform.claude.com/docs/en/models/overview
title: "Models overview"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Current lineup, as of October 2026: Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5.5 and Claude Haiku 5.5. All four list a 1M-token context window and 128K-token maximum output on the synchronous Messages API.
- API identifiers: claude-fable-5-1, claude-opus-5-5, claude-sonnet-5-5, claude-haiku-5-5. Listed base prices per million input / output tokens: Fable 5.1 10 / 50 dollars; Opus 5.5 4 / 20; Sonnet 5.5 2 / 10; Haiku 5.5 "from" 0.10 / 0.50.
- Reliable knowledge cutoff and training-data cutoff are both listed as June 2026 for all four. Retirement is "not sooner than" dates in September and October 2027.
- Legacy models still available: Fable 5, Opus 5, Opus 4.8, 4.7, 4.6, 4.5, Sonnet 5, Sonnet 4.6, Haiku 4.5.
- Footnote: 1M tokens is about 555k words on the current tokenizer, introduced with Opus 4.7; earlier models fit about 750k words in 1M tokens. 200k tokens is about 150k words.
- Batch API requests are 50 percent off; cache reads cost 10 percent of base input (2.5 percent on Fable 5.1 and Mythos 5.1; 5 percent on Opus 5.5 and Sonnet 5.5).

## Limits
- Volatile: all of this is as of October 2026. Retirement dates are commitments for Anthropic-operated platforms only.
- The tokenizer note matters for comparing token counts across model generations: the same text costs more tokens on the newer tokenizer.

## Used in
- research/synthesis/field-1.md
