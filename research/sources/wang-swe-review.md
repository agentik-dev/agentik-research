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
- Re-opened 2026-10-14 (site sitting), claim check for the ledger draft, from the HTML text and the PDF text: confirmed with two qualifications. Appendix A.1 "Single-Model Iterative Review-Revision", Table 4, prints resolve rate (RR, the resolve rate of the reviewer-approved patch at each sample) on SWE-bench Verified (n=500) as 34.8, 40.6, 43.0, 43.4 and 44.0 percent for samples 1 to 5, so the step gains +5.8, +2.4, +0.4 and +0.6 points are our subtraction; the paper prints levels, not gains (our arithmetic: at n=500 the 0.4 step is 2 tasks and the 0.6 step is 3). The model is Qwen3-8B fine-tuned on mixed issue-resolution and review trajectories (3k plus 3k), one checkpoint that generates the patch, reviews it and revises on its own feedback; the loop runs up to 5 samples (1 initial generation plus 4 revision rounds) or until the model approves its own patch, and the table says samples, not rounds. Cumulative oracle RR in the same table is 34.8, 44.4, 46.4, 46.8 and 47.2 percent (236 of 500 after 5 samples). The paper says RR "increases steadily from 34.8% (sample 1, no review) to 44.0% (sample 5)".

## Limits
- Issue-resolution patches on benchmark tasks, scored by hidden tests only; the paper says it does not measure style, readability, maintainability or security (Section 5). The reviewer and the generators are different models, so the main experiments are not a same-model self-review test (Appendix A.1 is the exception: one trained checkpoint plays both roles). Results depend on the OpenHands scaffold and 2026 models.

## Used in
- research/synthesis/field-8.md
- journal-ledger (journal draft)
- docs/journal/posts/2026-10-10-the-ledger-that-ran-away.md
- docs/summary.md
