---
url: https://arxiv.org/abs/2404.13076
title: "LLM Evaluators Recognize and Favor Their Own Generations"
author: Arjun Panickssery, Samuel R. Bowman, Shi Feng
published: 2024-04 (v1 15 April 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
- Abstract: an LLM used as a judge can rate its own outputs higher than other outputs, although human annotators rate them as similar in quality.
- Out of the box, models including GPT-4 and Llama 2 could tell their own text from text written by other LLMs and by humans with better-than-chance accuracy.
- Fine-tuning experiments showed a linear relation between how well a model recognizes its own output and how strongly it prefers it, and controlled experiments suggest the link is causal.

## Limits
- I read the abstract page only. It tests judge models on text-quality tasks, not on code review, and does not test whether a different instance of the same model shows the bias.

## Used in
- research/synthesis/field-5.md
