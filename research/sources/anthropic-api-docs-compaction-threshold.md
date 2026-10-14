---
url: https://platform.claude.com/docs/en/build-with-claude/compaction-threshold
title: "Compaction at a token threshold"
author: Anthropic (Claude API documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 (beta, header `compact-2026-01-12`, edit type `compact_20260112`): the only trigger type is `input_tokens`; the default is 150,000 tokens and the minimum is 50,000 tokens.
- The default summarization prompt varies by model. The page's example asks Claude to summarize the transcript so work can continue in a future context where the raw history is no longer accessible (state, next steps, learnings), wrapped in `<summary></summary>` tags.
- The `instructions` parameter replaces the default prompt entirely. On Claude 5.1 and later, custom-instruction summaries use only the visible conversation, not earlier thinking blocks.
- `pause_after_compaction` (default false) stops after the summary so the application can add recent messages before continuing.
- When the API receives a compaction block, everything before it is ignored; on the newest models (Fable 5.1, Mythos 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5) thinking blocks from before the block are not carried forward, so the summary is all the model has of earlier work.

## Limits
- Developer Platform defaults, not Claude Code's. The first 100,000 of about 118,000 characters were read. The cookbook (anthropic-cookbook-context-engineering) quotes the same 150K and 50K figures as of March 2026.

## Used in
- research/synthesis/field-2.md
