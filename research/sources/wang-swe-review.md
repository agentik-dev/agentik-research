---
url: https://arxiv.org/abs/2607.06065
title: "SWE-Review: Closing the Loop on Issue Resolution with Agentic Code Review"
author: Ruoyu Wang, Jierun Chen, Shaowei Wang, Chaofan Tao, Sidi Yang, Yuxin Jiang, Kim-Hui Yap, Lifeng Shang, Xiaohui Li, Haoli Bai
published: 2026-07 (submitted 7 July 2026)
accessed: 2026-10-14
kind: measured
---

## What it says
Abstract page plus the HTML text (read to about 100,000 of 167,891 characters). Section names as the paper prints them.
- Setup: a reviewer agent explores the repository, accepts or rejects an AI-written patch and gives structured feedback; a generate-review-revise loop follows. The standard protocol allows one revision of a rejected patch (Section 3.1).
- Agentic against single-turn review (Section 3.2, Table 2, Claude Opus 4.6 as reviewer, one revision): for patches from Qwen3-30B-A3B the resolve rate after review and revision was 52.6 percent against a 27.5 percent no-review baseline, and the best single-turn review reached 44.1 percent. For GLM-5 patches the gain was +3.0 points (75.2 against 72.2). The gap between agentic and single-turn review widens on harder issues (Figure 4).
- Iterated rounds (Appendix A.1, one 8-billion-parameter model, five samples): resolve rate 34.8, 40.6, 43.0, 43.4 and 44.0 percent, so the per-round gains were +5.8, +2.4, +0.4 and +0.6 points. Section 4.3 reports 38.4 percent from a 22.9 percent baseline with 2.44 samples on average. The paper does not test beyond five samples.
- The reviewer's own tests can give false confidence in approvals or blame correct patches (Appendix B.2, "test paradox"). A small distilled reviewer gave no gain on GLM-5 patches (71.6 against 72.2 percent, Section 4.2).

## Limits
- Issue-resolution patches on benchmark tasks, scored by hidden tests only; the paper says it does not measure style, readability, maintainability or security (Section 5). The reviewer and the generators are different models, so it is not a same-model self-review test. Results depend on the OpenHands scaffold and 2026 models.

## Used in
- research/synthesis/field-8.md
