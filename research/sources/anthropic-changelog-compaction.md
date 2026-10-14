---
url: https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
title: "Claude Code changelog (entries that mention compaction)"
author: Anthropic (anthropics/claude-code repository)
published: undated (the newest entry when read on 2026-10-14 was 2.1.296)
accessed: 2026-10-14
kind: documented
---

## What it says
- 0.2.47: automatic conversation compaction added, "for infinite conversation length". 1.0.48: PreCompact hook added. 1.0.51: auto-compact warning threshold raised from 60% to 80%. 2.0.64: auto-compacting made instant. 2.1.0: "Improved compaction reliability".
- 2.1.76: PostCompact hook added; a circuit breaker stops auto-compaction retries after 3 attempts. 2.1.89: detects context refilling to the limit three times in a row after compacting and stops with an error. 2.1.105: PreCompact hooks can block compaction by exit code 2 or `{"decision":"block"}`.
- Losses that were fixed (each shows a category of thing a compaction dropped or confused): plan mode lost after compaction (2.1.47); session name lost (2.1.47); deferred tool input schemas lost (2.1.76); background subagents invisible after compaction, so duplicates spawned (2.1.83); a second copy of a still-running background command started (2.1.271); scheduled tasks not returning on resume after compaction (2.1.290, compactions from that version on); `--resume` dropping files a compaction had just restored (2.1.288).
- 2.1.293, verbatim: "Fixed Claude sometimes treating its own last actions before a context compaction as done after it, and retracting or redoing finished work".
- 2.1.139: the compaction prompt now asks the model to preserve sensitive user instructions. 2.1.198: subagents and compaction inherit the session's extended-thinking configuration. 2.1.292: a compaction summary that repeated `/name` let Claude invoke a user-reserved skill.
- Window changes: 2.1.247 Sonnet 5's default auto-compact window set to its full 1M context, about 967K tokens instead of about 934K; 2.1.260 Opus and Fable sessions compact shortly before the 1M-token limit; 2.1.296 `autoCompactWindow` added to subagent frontmatter.
- Failure modes of the compaction call itself: "Prompt is too long" when the compacted request is still too long (2.1.284: now compacts once more, keeping less of the recent conversation); automatic compaction giving up when a Mac slept mid-run (2.1.290).
- I searched the whole file text for `idleCompaction`, "idle compaction" and `CLAUDE_CODE_IDLE_COMPACT`; no entry names them. No entry says a PreCompact hook's stdout is read as compaction instructions.

## Limits
- A changelog lists fixes, so it shows that these losses existed, not how often they happened.
- Read in two ways: WebFetch for the head and for offsets 760000 and 920000 of about 986,000 characters, and a full-text search of a downloaded copy for the absence claim above.
- As of October 2026 (version 2.1.296).

## Used in
- research/synthesis/field-2.md
