---
url: https://huggingface.co/Qwen/Qwen3.8-27B
title: "Qwen3.8-27B (Hugging Face model card)"
author: Qwen (the model's Hugging Face organisation)
published: 2026-08 (the card cites "August, 2026"; no day stated)
accessed: 2026-10-14
kind: measured
---

## What it says
- A 27-billion-parameter dense, post-trained, native vision-language model under the Apache 2.0 license, with a native context of 262,144 tokens, extensible to 1,000,000 tokens. Recommended serving engines are SGLang, vLLM and TokenSpeed; quantized builds for llama.cpp, Ollama and LM Studio are listed on the Hub. The card gives no hardware or memory requirements.
- Benchmark table (scores as listed; the card does not state units), Qwen3.8-27B against Opus 4.6 at max effort: Terminal Bench 2.1 73.0 against 78.2; SWE-bench Pro 61.7 against 53.4 (Opus score "officially reported", baselines re-evaluated, problematic tasks corrected); NL2Repo-Bench 42.3 against 47.6; LiveCodeBench v6 90.3 against 88.8. Predecessor Qwen3.6-27B: Terminal Bench 2.1 63.4, SWE-bench Pro 53.5.
- Evaluation settings: SWE-bench Pro, DeepSWE and QwenSWEBench were run through the Claude Code harness at temperature 1.0, top_p 0.95 and a 256K context; Terminal Bench 2.1 lists no harness. The card does not list SWE-bench Verified.

## Limits
- Self-reported by the model's maker, with a mix of re-evaluated and officially reported baselines; no independent run is on the card. One third-party leaderboard of fresh tasks (swe-rebench-leaderboard) measures the predecessor far lower. As of October 2026.

## Used in
- research/synthesis/field-10.md
