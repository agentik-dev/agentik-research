---
url: https://stevenpg.com/posts/running-claude-code-locally-on-apple-silicon/
title: "Running Claude Code Locally on Apple Silicon"
author: Not named on the page (site: Coding Steve)
published: 2026-05-20
accessed: 2026-10-14
kind: reported
---

## What it says
- Setup: a MacBook Pro with an M3 Pro chip and 36 GB unified memory (a table elsewhere in the post lists 18 GB, which conflicts), `llama.cpp` `llama-server`, model Qwen3.6-35B-A3B (mixture of experts, about 3 billion active parameters) as a Q4_K_M file of about 22 GB, context set to 65,536 tokens (effective about 32K because sliding-window attention is disabled for the model), reasoning turned off.
- Measured by the author from server logs: prompt processing about 610 tokens per second at 1K context, about 590 at 8K and about 527 at 13K; generation about 31 tokens per second (the author's calculation from 14 tokens in 448 ms); cold model load about 9 seconds.
- Tool calling "works most of the time", with occasional wrong parameter names, missing arguments and invented tool names, which the author says the API model virtually never does. Quality is good enough for routine coding and text edits, not state of the art; complex multi-step refactors may need the API model as a fallback; after pauses a prompt-cache miss forces full reprocessing.
- The "10 to 20 times slower than the API" figure and the KV-cache sizes at 32K and 64K are the author's estimates, not measurements.

## Limits
- One author, one machine, an MoE model with few active parameters, so the speeds do not transfer to a dense 27B-class model. Author unnamed. Reported evidence.

## Used in
- research/synthesis/field-10.md
