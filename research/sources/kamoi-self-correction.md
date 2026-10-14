---
url: https://aclanthology.org/2024.tacl-1.78/
title: "When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs"
author: Ryo Kamoi, Yusen Zhang, Nan Zhang, Jiawei Han, Rui Zhang
published: 2024 (Transactions of the Association for Computational Linguistics, volume 12, pages 1417-1440; arXiv preprint 2406.01297, June 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
Read from the journal page's abstract only.
- The survey says there is no consensus on when a model can correct its own output at inference time, because studies report both gains and negative results.
- It finds that earlier studies often leave their research question vague, use impractical frameworks, or evaluate in ways that overstate self-correction. It gives a classification of research questions and a checklist for designing fair experiments.
- Its three conclusions, in the abstract: (1) no prior work shows successful self-correction with feedback from a prompted model, except on tasks especially suited to it; (2) self-correction works well where reliable external feedback exists; (3) large-scale fine-tuning makes self-correction possible.

## Limits
- A survey of studies up to early 2024, not a new experiment, and I read the abstract and listing only, so its per-task evidence and tables are not recorded here. It concerns text tasks and reasoning, and does not cover agentic coding with tests.

## Used in
- research/synthesis/field-8.md
