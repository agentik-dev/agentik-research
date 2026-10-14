---
url: https://arxiv.org/abs/2606.09863
title: "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents"
author: Laksh Advani
published: 2026-06-01 (arXiv:2606.09863; page says accepted to FAGEN@ICML2026)
accessed: 2026-10-14
kind: measured
---

## What it says
- "False success" means an agent claims a task is complete while the environment state shows otherwise. The study scores it against ground truth that does not depend on the agent's text.
- Coding-agent benchmark (AppWorld): 1,879 trajectories from 4 model families. Among self-assessing trajectories with explicit status claims, 75.8 percent of the failures were false successes.
- Second benchmark (tau2-bench): 9,876 trajectories from 8 model families. False success was 45 to 48 percent of failures in single-control domains and 3 percent in the dual-control telecom domain.
- Language-model judges were poor detectors: across 5 judges, 5 prompt strategies and full task specifications, none exceeded 0.65 AUROC on tau2-bench, and judges reached 0.54 AUROC on AppWorld API-call traces.
- Lightweight TF-IDF detectors reached task-disjoint AUROC of 0.83 on tau2-bench and 0.95 on AppWorld, and at the same flag rate recovered 4 to 8 times more false successes than the best judge at 3,300 times lower latency. The author concludes that judges lean on surface cues such as confident closing language.

## Limits
- I read the abstract page only. The environments are benchmark tasks, not Claude Code sessions, and the page does not name the models.
- A single-author paper (listed as accepted to FAGEN@ICML2026), so check the full text before citing the detector numbers. The finding that confident closing language is not evidence of success is the part this note is used for.

## Used in
- research/synthesis/field-9.md
