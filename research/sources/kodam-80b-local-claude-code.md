---
url: https://vijay.eu/co-authored/80b-coding-model-locally-claude-code-ollama/
title: "I Ran an 80B Coding Model Locally with Claude Code. It Took 1 Hour Instead of 9 Minutes. Here's What Was Wrong."
author: Vijay Kodam
published: 2026-02-14
accessed: 2026-10-14
kind: reported
---

## What it says
- Setup: a Mac Mini M4 Pro with 64 GB unified memory served `qwen3-coder-next:q4_K_M` (79.7 billion parameters, Q4_K_M, about 54 GB in GPU memory) through Ollama; the client was Claude Code v2.1.42 on another Mac.
- Measured: a session took about 66 minutes of wall time. Generation was 23 tokens per second and prompt evaluation 20 tokens per second. About 13,000 output tokens at 23 tokens per second would take about 9 minutes; the rest, about 57 minutes, was mostly prompt evaluation across 57 API calls (inputs of 121 to about 34,566 tokens; waits of 15 to 194 seconds per request).
- Causes found: Ollama's context was 16,384 tokens while Claude Code assumed a 180,000-token window (autocompact threshold 167,000), so compaction never fired; the background Haiku-model token-count calls returned HTTP 404 because that model does not exist in Ollama, adding wasted round trips.
- Fixes reported: raise Ollama's context to 262,144 tokens (named the most impactful), flash attention, a q8_0 KV cache, a 60-minute keep-alive, a larger batch size, `CLAUDE_CODE_EFFORT_LEVEL=low`, and `ANTHROPIC_DEFAULT_HAIKU_MODEL` pointed at the local model. For smaller machines the post gives `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` as num_ctx divided by 180000, times 100.

## Limits
- One engineer, one machine, one session; the post gives no measured session time after the fix, and the Ollama version is not stated. Reported evidence, not a controlled test.

## Used in
- research/synthesis/field-10.md
