---
url: https://aider.chat/2025/05/08/qwen3.html
title: "Qwen3 results on the aider polyglot benchmark"
author: aider project (page unsigned; some results contributed by users)
published: runs dated 2025-04-30 to 2025-05-09
accessed: 2026-10-14
kind: measured
---

## What it says
- Method: the aider polyglot benchmark, 225 test cases; headline score is pass rate after a second attempt. The page says some results were submitted by users and not verified.
- Qwen3-235B-A22B, whole-file edit format, run locally with vLLM at bf16 and no thinking: 65.3 percent; the official Alibaba API for the same model: 61.8 percent; llama.cpp Q5_K_M quantization: 59.1 percent at 635.2 seconds per case. Qwen3-32B locally at bf16: 45.8 percent (whole) and 41.3 percent (diff).
- Hosting matters: the page says API providers can use very different inference settings and quantizations; OpenRouter runs of the same model scored 54.7 percent (Together only, no thinking) and 49.8 percent (all providers, default thinking), which differ in more than the provider.

## Limits
- Models of spring 2025 on a code-editing benchmark, not an agent loop like Claude Code; older than every other dated source here. It shows quantization and host settings move the score by several points, not how a 2026 local model compares with a hosted Claude model.

## Used in
- Read for question 10 and kept for the site pages on cost lanes; research/synthesis/field-10.md does not cite it (the synthesis has a 9,000-byte cap).
