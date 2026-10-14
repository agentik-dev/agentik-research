---
url: https://arxiv.org/abs/2406.18665
title: "RouteLLM: Learning to Route LLMs with Preference Data"
author: Isaac Ong, Amjad Almahairi, Vincent Wu, Wei-Lin Chiang, Tianhao Wu, Joseph E. Gonzalez, M Waleed Kadous, Ion Stoica
published: 2024-06-26 (v1); current version v4, 2025-02-23; ICLR 2025
accessed: 2026-10-14
kind: measured
---

## What it says
- Method: routers choose, per query, between a strong and a weak model, trained on human preference data (Chatbot Arena) with augmentation. Main pair: gpt-4-1106-preview (strong) and Mixtral 8x7B (weak); four router types (similarity-weighted ranking, matrix factorization, BERT classifier, causal LLM classifier). Metrics: call-performance threshold (CPT) and average performance gap recovered (APGR).
- Section 4.1 and Tables 1 to 3 (read from v2 HTML): to reach 95 percent of GPT-4 quality on MT Bench the best router sent 13.40 percent of calls to the strong model; on MMLU, 35.40 percent of calls reached 92 percent of GPT-4 quality; on GSM8K, 33.64 percent reached 87 percent. Table 6 cost ratios against random routing at 80 percent quality: 2.49 times (MT Bench), 1.14 times (MMLU), 1.27 times (GSM8K). The abstract's headline is a cost reduction "by over 2 times in certain cases".
- Section 4.3: routers trained on one model pair were tested on other pairs (Claude 3 Opus with Llama 3 8B) without retraining and kept their performance.
- Inputs: as the fetch tool read the paper, the routing decision uses the query alone; cost, latency and privacy are not router inputs.
- Section 5 limits: real query distributions may differ from the benchmarks; only two-model routing; performance varies widely between routers trained on the same data, unexplained.

## Limits
- General chat and QA benchmarks of 2024, not coding agents with tool use; the gain is largest on MT Bench and small on MMLU and GSM8K. The "73 percent fewer GPT-4 calls" reading of the MT Bench ratio is the fetch tool's arithmetic, not the paper's.

## Used in
- research/synthesis/field-10.md
