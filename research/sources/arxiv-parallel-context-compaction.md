---
url: https://www.alphaxiv.org/abs/2605.23296
title: "Parallel Context Compaction for Long-Horizon LLM Agent Serving"
author: Musa Cim, Burak Topcu, Chita Das, Mahmut Taylan Kandemir
published: 2026-05-22 (arXiv:2605.23296)
accessed: 2026-10-14
kind: measured
---

## What it says
- Argues that LLM-summarization compaction is lossy, that the blocking summary call can stall agent inference for tens of seconds, and that models largely ignore length instructions, so summary size and retained information vary substantially between runs and the agent's retained knowledge is unpredictable.
- Proposes compacting in parallel blocks; compares it with a sequential baseline on four backbones (8B to 120B parameters) on HotpotQA and LoCoMo.
- Numbers from the page's body summary: gpt-oss-120B on HotpotQA went from 8.1% to 27.4% accuracy moving from sequential to parallel compaction with 2k blocks, with a 2.91x compaction throughput speedup; in sequential compaction a 48x increase in input length grew the summary only about 3x; for some models compaction took over 60% of end-to-end wall time.

## Limits
- Read through the alphaxiv overview page, not the paper's PDF. Open models and question-answering benchmarks, not coding agents or Claude. The variability claim is its stated motivation and its measurements are for its own method; it does not measure Claude Code's summaries.

## Used in
- research/synthesis/field-2.md
