---
url: https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools
title: "Context engineering: memory, compaction, and tool clearing"
author: Isabella He (Anthropic, Claude Cookbook)
published: 2026-03-20
accessed: 2026-10-14
kind: measured
---

## What it says
- Compares three primitives on the API. Compaction summarizes the whole transcript and is lossy, since verbatim detail is dropped; it costs inference. Tool-result clearing replaces old tool results with a placeholder, costs no inference, and the content is gone until re-fetched. Memory is notes the agent writes to persistent storage, lossless for whatever the agent saved, with a tool-call overhead.
- API settings as of March 2026: compaction beta `compact-2026-01-12`, default trigger 150K tokens, minimum 50K, with `instructions` and `pause_after_compaction`; clearing `clear_tool_uses_20250919`, default trigger 100K, `keep` defaults to 3 tool uses; memory `memory_20250818`.
- Test workload: a research agent over a synthetic corpus of eight documents (about 329K tokens, about 41K each). The no-management baseline peaked at 335,279 tokens over 5 turns; on a simulated 200K window it was rejected at turn 4 (168,242 tokens at the last good turn, computed by clipping the 1M-window trajectory).
- Compaction (trigger 180K): peak 169,164 tokens; one compaction at turn 4 produced a summary of about 2,783 tokens; the run finished in 7 turns with a final context of 5,829 tokens.
- Probing that summary with six questions: it kept all 3 high-level facts asked about and lost all 3 obscure specifics, which were appendix-table values.
- Memory: in a second session the run with memory made 4 file reads with a peak of 172,623 tokens against 8 reads and 333,977 tokens without.
- Stated limits: compaction may drop specific numbers or exact phrasing; custom instructions replace the default prompt, so the author must supply the full framing; clearing invalidates cached prompt prefixes; memory is only as good as what the agent chooses to write.

## Limits
- One workload, apparently one run per configuration (the part I read shows no repeats), vendor-written, and a synthetic corpus. The probe set is six questions. It tests the API's primitives, not Claude Code's compaction. The first 100,000 of about 123,600 characters were read; the memory-combination section was cut off.

## Used in
- research/synthesis/field-2.md
