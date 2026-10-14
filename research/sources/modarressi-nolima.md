---
url: https://arxiv.org/abs/2502.05167
title: "NoLiMa: Long-Context Evaluation Beyond Literal Matching"
author: Ali Modarressi, Hanieh Deilamsalehy, Franck Dernoncourt, Trung Bui, Ryan A. Rossi, Seunghyun Yoon, Hinrich Schuetze
published: 2025-02 (arXiv v1 7 February 2025, v3 9 July 2025; accepted at ICML 2025)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (full text, Sections 3 and 4): a needle-in-a-haystack test where the question and the needle share almost no words, so the model must infer an association. Haystacks are book text filtered for distractors. Lengths tested: 250, 500, 1K, 2K, 4K, 8K, 16K and 32K tokens. 58 question-needle pairs, 5 haystacks, 26 needle placements, 7,540 tests per length.
- Scoring: a base score from the three shortest lengths; "effective length" is the longest length that stays above 85 percent of the base score.
- Result (abstract and Table 3): 13 models claiming at least 128K tokens; at 32K tokens 11 of them score at or below half their base score. GPT-4o falls from 99.3 percent (base) to 69.7 percent at 32K.
- Claude 3.5 Sonnet (claimed 200K, version dated 2024-10-22): base score 87.5 percent; 85.4 at 1K, 84.0 at 2K, 77.6 at 4K, 61.7 at 8K, 45.7 at 16K and 29.8 at 32K; effective length 4K tokens.
- Section 4.4: as the needed association gets harder, length matters more than needle position; chain-of-thought prompting and reasoning models help but do not close the gap above 16K tokens. On the hardest 10 pairs, reasoning models (o1, o3-mini, a distilled R1) fall below 50 percent of base at 32K.
- Ablation: literal word matches make the task easy at length; literal matches that point to the wrong place hurt badly.

## Limits
- Tested 2024 to early 2025 models, up to 32K tokens only. No Claude model from 2025 or 2026 appears.
- Synthetic needle task; the authors say the effect on realistic work is not measured here.
- The paper's own text and table disagree on one row (the Llama 3.1 70B 32K figure), so only GPT-4o and Claude 3.5 Sonnet figures were taken from the table, after checking the table layout.

## Used in
- research/synthesis/field-1.md
