---
url: https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
title: "Context Engineering for AI Agents: Lessons from Building Manus"
author: Yichao "Peak" Ji (Manus)
published: 2025-07-18
accessed: 2026-10-14
kind: reported
---

## What it says
- The author reports an average input-to-output token ratio of about 100 to 1 in the Manus agent, because context grows with each action and observation while outputs stay short. He calls the cache hit rate the most important metric for a production agent; the post's example is a 10 times price gap between cached and uncached input on a Claude Sonnet model (0.30 against 3 dollars per million tokens, as of July 2025).
- Observations, especially web pages and documents, can be huge; Manus treats the file system as unlimited, persistent memory and prefers compression that can be undone (drop a page body but keep its URL).
- Keeps failed actions and stack traces in the context so the model can update its beliefs and avoid repeating them.
- On tasks averaging about 50 tool calls, the agent keeps rewriting a todo file as it works; the author says this pushes the plan to the end of the context and counters lost-in-the-middle drift and goal drift.

## Limits
- A builder's account of one product with no experiment, ablation or numbers beyond the ratio and the price example; the 100 to 1 ratio is the author's figure for his own system. Reported-level evidence only.
- Prices and model names are as of July 2025.

## Used in
- research/synthesis/field-1.md
