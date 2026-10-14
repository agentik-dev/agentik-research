---
url: https://arxiv.org/abs/2508.21433
title: "The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management"
author: Tobias Lindenbauer, Igor Slinko, Ludwig Felder, Egor Bogomolov, Yaroslav Zharov (JetBrains Research; Technical University of Munich)
published: 2025-08 (arXiv; v3 27 October 2025)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (Section 3): SWE-agent on SWE-bench Verified (500 instances), five model setups (Qwen3-32B with and without thinking, Qwen3-Coder 480B, Gemini 2.5 Flash with and without thinking). Two ways to shrink context: observation masking (replace older tool outputs with a placeholder, keep a window of the last 10 turns) and LLM summarization (summarize 21 turns at a time, keep the last 10). Turn limit 250.
- Section 1: observation (tool-output) tokens make up about 84 percent of an average SWE-agent turn, from preliminary runs on 50 SWE-bench Lite items.
- Result (Table 1): masking cut instance cost by 50 percent or more in four of five setups (for Qwen3-Coder 480B, 1.29 to 0.61 US dollars) with solve rate 53.4 to 54.8 percent. Summarization was within a point or two of masking on most setups. The exception: Gemini 2.5 Flash with thinking, where the raw agent solved 40.4 percent, masking 36.4 and summarization 31.4.
- Section 4.4: summarization lengthened some runs (mean 52 turns against 44 with masking for Gemini 2.5 Flash); the authors think summaries can give a false sense of progress.
- A hybrid of the two cut cost a further 7 and 11 percent against masking and summarization alone.

## Limits
- Software tasks on SWE-bench only; open models and Gemini, no Claude model. The authors say the fixed masking window ignores whether an old output is still relevant, and the OpenHands check is small (50 instances, one model).
- It measures cost and solve rate under trimming; it does not measure degradation from length itself. The raw agent is the comparison, so it shows trimming costs little accuracy here, not that long context lowers it.

## Used in
- research/synthesis/field-1.md
