---
url: https://arxiv.org/abs/2604.11978
title: "The Long-Horizon Task Mirage? Diagnosing Where and Why Agentic Systems Break"
author: Xinyu Jessica Wang, Haoyue Bai, Yiyou Sun, Haorui Wang, Shuibai Zhang, Wenjie Hu, Mya Schroder, Bilge Mutlu, Dawn Song, Robert D. Nowak
published: 2026-04 (v1, submitted 13 April 2026)
accessed: 2026-10-14
kind: measured
---

## What it says
- HORIZON is a cross-domain diagnostic benchmark: the authors ran GPT-5 variants and Claude models over more than 3,100 trajectories in four domains (web, OS, database, embodied; Sections 1 and 4) and attributed failures with an LLM judge validated against humans (inter-annotator agreement kappa 0.61 on 40 trajectories; human to judge kappa 0.84 on 40 traces).
- Section 4 (HTML extract): performance declines non-linearly as the task horizon is extended; every domain shows a sharp drop past some extension level, from partial robustness to near-systematic failure. Web collapses at very small extensions; embodied degrades steeply.
- Section 5: of the failed trajectories, 72.5 percent are process-level (environment disturbance, instruction error, planning error, history error accumulation) and 27.5 percent design-level (memory limitation, catastrophic forgetting, false assumption). The text says planning and memory failures become dominant as the horizon grows; the per-category numbers behind that were not in the extract.
- Loops and repetition appear inside other categories, not as their own: an example under history error accumulation has a web agent that repeats the same failed action across several steps. Section 7 describes a real incident in a public agent framework, two agents relaying messages indefinitely, classed as a planning error because nothing checked for termination or detected the loop. The paper contains no finding on whether agents recognise that they are stuck.

## Limits
- Preprint; benchmark tasks are built by extending horizons, so they are not unattended coding runs. The page extract gives no numeric success rates by horizon. I read about 100,000 of 173,311 characters of the HTML.

## Used in
- research/synthesis/field-6.md
