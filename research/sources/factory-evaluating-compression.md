---
url: https://factory.com/news/evaluating-compression
title: "Evaluating Context Compression for AI Agents"
author: Factory Research (no individual author named)
published: 2025-12-16
accessed: 2026-10-14
kind: measured
---

## What it says
- Method: probe-based. After compressing the earlier part of a long session, the agent answers questions that need details from the truncated history. Four probe types per compression point and method: recall, artifact, continuation, decision. A model judge (GPT-5.2, blinded to the method, following the MT-Bench approach) scores six dimensions 0 to 5 and the overall score is their unweighted mean. Data: over 36,611 messages from opted-in production software-engineering sessions, across hundreds of compression points.
- Overall scores (0 to 5): Factory's method 3.70, Anthropic's 3.44, OpenAI's 3.35. By dimension (Factory / Anthropic / OpenAI): accuracy 4.04 / 3.74 / 3.43; context awareness 4.01 / 3.56 / 3.64; artifact trail 2.45 / 2.33 / 2.19; completeness 4.44 / 4.37 / 4.37; continuity 3.80 / 3.67 / 3.77; instruction following 4.99 / 4.95 / 4.92.
- Share of tokens removed: OpenAI 99.3%, Anthropic 98.7%, Factory 98.6%.
- Artifact trail (which files were touched, what changed) was the weakest dimension for all three, which the post calls an unsolved problem. In the worked debugging example, OpenAI's output lost the endpoint and root cause and Anthropic's lost the endpoint.

## Limits
- The authors sell one of the three methods. Factory's summaries came from production while the competitors' were produced by feeding the same prefix to their APIs. No significance test is reported; the gaps are 0.26 to 0.35 points overall. The judge's agreement with humans is cited from earlier work, not measured here. "Anthropic" means Anthropic's method as the post describes it, not Claude Code's own compaction, and the variant is not stated in the part I read. Dated December 2025, before the model generations listed in the Claude docs as of October 2026.

## Used in
- research/synthesis/field-2.md
