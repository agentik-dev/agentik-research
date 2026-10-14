---
url: https://arxiv.org/abs/2502.08788
title: "Stop Overvaluing Multi-Agent Debate -- We Must Rethink Evaluation and Embrace Model Heterogeneity"
author: Hangfan Zhang, Zhiyao Cui, Jianhao Chen, Xinrun Wang, Qiaosheng Zhang, Zhen Wang, Dinghao Wu, Shuyue Hu
published: 2025-02 (v1 12 February 2025; v3 21 June 2025)
accessed: 2026-10-14
kind: measured
---

## What it says
- The authors evaluated 5 representative multi-agent debate methods on 9 benchmarks with 4 foundation models. They found debate often fails to beat simple single-agent baselines, Chain-of-Thought and Self-Consistency, although it spends substantially more inference compute.
- Debate among different models (model heterogeneity) consistently improved the existing debate frameworks. The paper argues for rethinking evaluation, since existing evaluations use narrow benchmarks, weak baselines and inconsistent setups.

## Limits
- I read the abstract page only; the setup and numbers are in the full paper. Debate is one multi-agent form; the result does not cover orchestrator-worker fan-out or separate reviewers.

## Used in
- research/synthesis/field-5.md

## Also (question 8)
Re-read on 2026-10-14 from the arXiv abstract page (v1 12 February 2025; v3 21 June 2025).
- Restated: 5 multi-agent debate methods, 9 benchmarks, 4 foundation models; debate often fails to beat single-agent chain-of-thought and self-consistency despite far more inference compute. The authors present model heterogeneity as a "universal antidote" that consistently improves current debate frameworks. The abstract names no methods, benchmarks or figures.
- For review: agreement among copies of one model is weak evidence; a reviewer from a different model is the direction the paper supports.
- Used in (question 8): research/synthesis/field-8.md
