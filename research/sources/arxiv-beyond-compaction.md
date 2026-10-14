---
url: https://arxiv.org/abs/2606.11213
title: "Beyond Compaction: Structured Context Eviction for Long-Horizon Agents"
author: Andrew Semenov, Svyatoslav Dorofeev
published: arXiv:2606.11213; the arXiv page shows submission on 1 May 2026 and the Hugging Face papers page shows 11 June 2026 (the two do not agree)
accessed: 2026-10-14
kind: measured
---

## What it says
- Proposes Context Window Lifecycle: the agent labels its trajectory as typed, dependency-linked episodes, and when a token budget is exceeded a deterministic policy that calls no LLM evicts content in priority order, keeping user turns and still-used reasoning context and dropping completed action episodes whose effects are saved in the environment.
- Says summary compaction is unpredictably lossy, loses the causal structure of the work, is costly and blocks the agent, and can introduce hallucination when the agent has the least room to catch it.
- Reports one agent session completing 89 sequential tasks across 80 million tokens, with "no measurable degradation in task accuracy relative to per-task isolated sessions".

## Limits
- Read from the abstract pages. The abstract names neither the benchmarks nor the models. A comparison to isolated per-task sessions is the closest measured stand-in for "restart per task" that I found, but the comparator for the proposed method is isolation, not LLM-summary compaction. Authors' own method, single preprint, not Claude Code.

## Used in
- research/synthesis/field-2.md
