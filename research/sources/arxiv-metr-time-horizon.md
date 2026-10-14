---
url: https://arxiv.org/abs/2503.14499
title: "Measuring AI Ability to Complete Long Software Tasks"
author: Thomas Kwa, Ben West, Joel Becker and 23 co-authors (METR), including Elizabeth Barnes and Lawrence Chan
published: 2025-03 (v1, 18 March 2025; the arXiv page lists v4, 10 July 2026, which added an author to match the PDF)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method: the authors timed skilled humans on tasks from RE-Bench, HCAST and 66 new shorter tasks, then defined a model's "50%-task-completion time horizon" as the typical human time for tasks the model completes with a 50 percent success rate. The abstract reports about 50 minutes for Claude 3.7 Sonnet, and the HTML version I read (v3) gives about 110 minutes for o3 (Section 3.2).
- Trend: the 50 percent horizon doubled every 207 days (95 percent confidence interval 166 to 240 days) on the fitted data, which the abstract rounds to about every seven months since 2019, possibly faster in 2024 (Sections 3.2 and 3.2.1). The 80 percent horizon doubled every 204 days; 80 percent horizons are roughly 4 to 6 times shorter than 50 percent horizons (Section 3.2.1).
- Section 3.3, Table 2: failure reasons counted over 31 GPT-4 1106 runs and 32 o1 runs. GPT-4 1106: repeating failed actions 12, premature task abandonment 8, incorrect mental math or reasoning 6, poor planning or tool choice 4, other 1. o1: premature task abandonment 16, incorrect reasoning 7, poor planning or tool choice 6, repeating failed actions 2, other 1. The authors read this as GPT-4 1106 most often repeating failed actions and o1 most often giving up early, and say agents still struggle in "messier" environments, particularly those without clear feedback loops or that need proactive information-seeking.
- Section 4: controlling for task length, models do worse on tasks with higher messiness scores. Section 5: realistic tasks rarely have automatic scoring.
- The abstract attributes the growth mainly to better reliability, recovery from mistakes, reasoning and tool use.

## Limits
- Software and ML-research tasks with automatic scoring; models up to early 2025 in the figures I read. The failure table uses two older models and 63 runs; it is a count, not a rate across current agents. The horizon is "always measured relative to a domain, task distribution, and human baseliners' level of skill and context" (Section 6). The doubling time is a trend fit, not a law.
- I read v3 in HTML (about half of the text) and the abstract page for v4; I did not read the appendix on scaffolds and token limits (Appendix C.3).

## Used in
- research/synthesis/field-6.md
