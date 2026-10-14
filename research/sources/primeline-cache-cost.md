---
url: https://primeline.cc/blog/claude-md-cache-cost
title: "Is Your Claude Code Cache Really 96% Efficient?"
author: Robin (PrimeLine blog)
published: 2026-08-30 (updated 2026-10-02)
accessed: 2026-10-14
kind: reported
---

## What it says
- Method: one script run on 2026-08-30 over the author's local Claude Code transcripts. The corpus is 3,031 transcript files with usage data, 63,880 billed API requests, messages dated 2026-07-30 to 2026-08-29, mostly Opus 5 (70.5% of requests). Records were deduplicated by `message.id`, keeping the largest `output_tokens` per ID.
- Cache hit rate: 96.59% token-weighted over all sessions, but the median session is 86.41% (25th percentile 76.33%, 75th percentile 92.60%); 426 of 3,030 sessions (14.1%) reach 95% or more. The top 25 sessions (0.8%) carry half of all input tokens.
- Cost shares of cache input only, at the 2x one-hour write price: writes 41.3% and reads 58.6% in aggregate; in the median session writes are 75.9%; in the 25th-percentile session 86.1%. Main sessions: writes 36.9%. Subagent sidechains: writes 61.3%.
- All 627,969,243 cache-write tokens in the corpus were on the one-hour tier, none on the five-minute tier. Assuming a 1.25x write price instead of the billed 2x understates the write share by 35.2% (relative). The post says subagent writes moved to the five-minute tier on 10 September 2026, after the window.
- Conclusion: a typical session's cache cost is dominated by writes; the author names cache stability (one model per session, a fixed tool set, compaction over `/clear`) and fewer subagent spawns as bigger levers than CLAUDE.md length, and says CLAUDE.md's share cannot be measured from transcripts.

## Limits
- One person's machine, one month, mostly one model; the cost shares are computed at list multipliers, not taken from a bill. The post reports 41.3% and 41.4% for the aggregate write share in different places. A practitioner write-up with a readable method, so it is reported evidence, not a controlled study. It reports no per-turn cost growth.

## Used in
- research/synthesis/field-4.md
