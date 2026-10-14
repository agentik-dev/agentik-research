---
url: https://arxiv.org/abs/2307.03172
title: "Lost in the Middle: How Language Models Use Long Contexts"
author: Nelson F. Liu, Kevin Lin, John Hewitt, Ashwin Paranjape, Michele Bevilacqua, Fabio Petroni, Percy Liang
published: 2023-07 (arXiv v1 6 July 2023, v3 20 November 2023; the arXiv page says it was accepted to the Transactions of the Association for Computational Linguistics)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (full text, Sections 2 and 3): multi-document question answering on NaturalQuestions-Open with 10, 20 or 30 total retrieved documents (about 2K, 4K and 6K tokens), with the answer-bearing document moved to each position; plus a synthetic key-value retrieval task with 75, 140 and 300 pairs (500 examples each).
- Models tested: MPT-30B-Instruct, LongChat-13B (16K), GPT-3.5-Turbo (4K and 16K variants), Claude-1.3 and Claude-1.3 (100K). All are 2023 models.
- Result: accuracy is highest when the relevant item is first or last in the input and lowest when it is in the middle, a U-shaped curve. The abstract: "performance is often highest when relevant information occurs at the beginning or end of the input context."
- Size of the effect (Section 2.3, Table 1): with the answer in the middle, GPT-3.5-Turbo's multi-document accuracy can fall by more than 20 percentage points; in the 20- and 30-document settings it drops below its closed-book accuracy of 56.1 percent (no documents at all).
- Extended-context variants (16K, 100K) performed about the same as their shorter-window siblings when the input fit both windows, so a larger window alone did not mean better use of the input.
- Key-value retrieval (Section 3): Claude-1.3 and Claude-1.3 (100K) were near-perfect at every length tested; the other models fell off at 140 and 300 pairs and were worst for pairs in the middle.
- Section 4: the U-shape also appears in base models without instruction tuning; encoder-decoder models are robust only inside their trained sequence length; putting the query before and after the documents gives near-perfect key-value retrieval but changes multi-document trends little.
- Section 5 (case study): in open-domain QA, using 50 retrieved documents instead of 20 raised accuracy by only about 1.5 percent for GPT-3.5-Turbo and about 1 percent for Claude-1.3.

## Limits
- Models are from 2023, with context windows of 4K to 100K tokens; no current Claude model was tested. Whether the U-shape holds for 2026 models is not shown here. Chroma's 2025 report (chroma-context-rot) found no position effect on its simple retrieval task.
- Tasks are retrieval-style question answering and synthetic key-value lookup, not multi-step agent work.
- Inputs are short by 2026 standards (at most about 6K tokens in the main QA runs).

## Used in
- research/synthesis/field-1.md
