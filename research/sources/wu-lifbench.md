---
url: https://arxiv.org/abs/2411.07037
title: "LIFBench: Evaluating the Instruction Following Performance and Stability of Large Language Models in Long-Context Scenarios"
author: Xiaodong Wu, Minhao Wang, Yichen Liu, Xiaoming Shi, He Yan, Xiangju Lu, Junmin Zhu, Wei Zhang
published: 2024-11 (arXiv v1 November 2024; v3 23 July 2025; the search listing names ACL 2025)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (Sections 1 and 3): 3 long-context scenarios (list, multi-document, single-document), 11 tasks, 2,766 instructions varied by length, expression and variables, scored by a rule-based program (LIFEval) with a stability metric. Six length bands from 4K to 128K tokens.
- Models (Section 5.1): 20 models, including GPT-4o, GPT-4 and open-weight families. No Claude model.
- Result (Section 5.3): most models decline as input grows, mainly beyond 16K to 32K tokens. GPT-4o scores 0.776 at 4K and 0.666 at 128K; GPT-4 scores 0.859 and 0.561. Stability also tends to fall at longer lengths.
- Drivers (Sections 5.2 to 5.4): harder tasks degrade more with length; instruction fine-tuning raises both score and stability; a bigger model helps but does not guarantee more.

## Limits
- The authors list: program-based checks miss semantic constraints; long inputs are costly, so fewer than 3,000 samples; the rubric needs manual upkeep.
- I read the first part of the page text only (about 100,000 of 125,766 characters), which covers the method and main results.
- Models of 2024; no Claude model, so it does not show how Claude's instruction following behaves at length.

## Used in
- research/synthesis/field-1.md
