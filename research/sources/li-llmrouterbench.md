---
url: https://arxiv.org/abs/2601.07206
title: "LLMRouterBench: A Massive Benchmark and Unified Framework for LLM Routing"
author: Hao Li, Yiqun Zhang, Zhaoyan Guo, Chenxu Wang, Shengji Tang, Qiaosheng Zhang, Yang Chen, Biqing Qi, Peng Ye, Lei Bai, Zhen Wang, Shuyue Hu
published: 2026-01-12 (arXiv v1)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method: 21 datasets, 33 models and 10 routing baselines re-evaluated under one setup (the abstract says over 400K instances; the paper's Table 2 says 391,645 instances). Datasets span mathematics, code (HumanEval and SWE-Bench among them), logic, knowledge, instruction following and tool use; splits are 70/30 over five seeds.
- Abstract: models are strongly complementary, but many routing methods perform similarly and several recent approaches, commercial routers included, do not reliably beat a simple baseline (the best single model). A large gap to the Oracle remains, mainly from "model-recall failures": when only one or a few models answer correctly, routers often do not pick them.
- Section 4.2.2 (read from v1 HTML): top routers gain up to 4 percent average accuracy over the best single model, or cut cost by up to 31.7 percent at equal performance; binary strong/weak routers (HybridLLM, FrugalGPT) struggle to save cost without losing accuracy; the commercial router OpenRouter is 24.7 percent below the best single model in the performance-cost setting.
- Section 4.2.1: larger model pools show diminishing returns; choosing models by average accuracy beats random subsets of equal size, so "careful curation can outweigh simply scaling the pool." Swapping the embedding model changed little.

## Limits
- A 2026 arXiv preprint (the abstract page names no venue); the fetch covered the first 100,000 of 132,336 characters of the HTML. The pools hold single-turn benchmark queries; the paper's limits section says it excludes domain-specific verticals, very long context and multimodal tasks. No Claude Code or long agent session is tested.

## Used in
- research/synthesis/field-10.md
