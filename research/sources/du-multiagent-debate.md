---
url: https://arxiv.org/abs/2305.14325
title: "Improving Factuality and Reasoning in Language Models through Multiagent Debate"
author: Yilun Du, Shuang Li, Antonio Torralba, Joshua B. Tenenbaum, Igor Mordatch
published: 2023-05 (submitted 23 May 2023; ICML 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
Read from the abstract page only.
- Method: several instances of a model each propose an answer and its reasoning, then debate over several rounds to reach a shared final answer. The same procedure and prompts are used on every task, on black-box models.
- Claim: the procedure improves mathematical and strategic reasoning and factual validity, with fewer fallacious answers and hallucinations.

## Limits
- The abstract gives no figures and names no limits. Its comparison with simple voting is disputed: see huang-self-correct (Section 4, Table 7), which replicates the method on the full GSM8K test set and finds it below self-consistency at an equal number of responses, and zhang-stop-overvaluing-mad.

## Used in
- research/synthesis/field-8.md
