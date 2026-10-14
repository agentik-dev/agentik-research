---
url: https://www.zivtech.com/blog/economics-of-claude-code-part-1-session-timing
title: "The Economics of Claude Code, Part 1: Session Timing"
author: Alex Urevick-Ackelsberg (Zivtech), written with Claude
published: 2026-04-22 (a June 2026 update says the math holds and the alarm was overstated)
accessed: 2026-10-14
kind: reported
---

## What it says
- Cost model: each turn rereads the whole conversation, so per-turn cost rises with accumulated context. The post's table for Opus 4.6 at 5 US dollars per million input tokens and 0.50 for a cache read: turn 20 at about 60K tokens, cumulative about 0.80 dollars, about 0.03 per turn; turn 50 at about 150K tokens, cumulative about 1.90, about 0.15 per turn; turn 80 without compaction, cumulative about 9.30, over 0.33 per turn.
- Idle gaps: the post says the cache lifetime was one hour before March 2026 and five minutes after, and that a cold-cache message costs about 12.5 times the same message with a warm cache. It reports six or seven cold restarts a day for the author and cites a third-party analysis that found a 17 to 26 percent cost increase from the lifetime change.
- Yearly estimate (one session per workday, 250 days): routinely past turn 50 about 2,300 dollars per developer; splitting at turn 50 about 420 dollars; teams that split and avoid cold starts spend 4 to 5 times less on input tokens, by the post's claim.
- Advice: when a session comes back cold, save a handoff note (the example is about 5,000 tokens against 180,000 tokens of carried history) and start fresh; split near turn 50 when context is large and the task changes; keep few active sessions.

## Limits
- No formal sample: the author's daily use for about a year, plus a linked third-party analysis with no sample size given. Prices are Opus 4.6; the post gives no cache write price, and the table's growth is a model, not a bill. The post does not say how it got 12.5 times; the figure equals a 1.25x write over a 0.1x read (my arithmetic, not the post's), and a 2x one-hour write over a 0.1x read would give 20 times. The cache-lifetime history in the post conflicts in detail with Anthropic's documentation (code-docs-prompt-caching): it describes one lifetime, where the documentation gives per-bucket and per-billing lifetimes.

## Used in
- research/synthesis/field-4.md
