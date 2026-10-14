---
url: https://platform.claude.com/docs/en/build-with-claude/compaction
title: "Compaction overview"
author: Anthropic (Claude API documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026, compaction replaces the older turns of a conversation with a summary Claude writes on the server. The page says it keeps the active context small because response quality degrades as a conversation grows.
- Three routes: compaction on demand (the application decides when; beta header `compact-2026-09-04`); compaction at a token threshold (the API decides when input tokens reach a set trigger); or your own summarizer on the client. The page says to use on-demand compaction wherever it is available.
- Recent turns can stay word for word under on-demand compaction ("keeps recent turns") or, for threshold compaction, by pausing after compaction and re-inserting them.
- Rule-based clearing of old tool results or thinking blocks is a separate feature, context editing.
- The page lists a "Write your own summarization prompt" option for the case when the default summary drops something a later turn needs.

## Limits
- API documentation, which is the Developer Platform, not Claude Code's interactive compaction. The two share the idea, not a documented implementation.

## Used in
- research/synthesis/field-2.md
