---
url: https://arxiv.org/abs/2306.05685
title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
author: Lianmin Zheng, Wei-Lin Chiang, Ying Sheng and 10 co-authors (UC Berkeley, UC San Diego, Carnegie Mellon University, Stanford, MBZUAI)
published: 2023-06 (v1 9 June 2023; v4 24 December 2023; NeurIPS 2023; this note reads the v4 text)
accessed: 2026-10-14
kind: measured
---

## What it says
Section and table names as the paper prints them.
- Position bias (Section 3.3, Table 2): the paper builds pairs of near-identical answers and asks each judge twice with the order swapped. With the default prompt, consistency across the swap was 65.0 percent for GPT-4, 46.2 for GPT-3.5 and 23.8 for Claude-v1. Most judges favoured the first position; Claude-v1 favoured the first answer in 75.0 percent of cases. The authors say only GPT-4 gave consistent results in more than 60 percent of cases.
- Verbosity bias (Table 3): in a "repetitive list" attack on 23 answers (a list padded with rephrased items) the judge preferred the padded answer in 91.3 percent of cases for Claude-v1 and GPT-3.5 and 8.7 percent for GPT-4.
- Self-enhancement (Section 3.3): GPT-4 favoured itself with a 10 percent higher win rate than humans gave it, Claude-v1 with 25 percent higher, and GPT-3.5 did not favour itself. The authors state that with limited data and small differences the study "cannot determine" whether models show the bias.
- Reasoning limits (Table 4): on 10 math questions (each judged in both answer orders, so 20 trials) GPT-4 as judge wrongly accepted an incorrect answer in 14 of 20 trials with the default prompt, 6 of 20 with chain-of-thought and 3 of 20 when given a reference answer.
- Mitigations (Section 3.4): swap positions and call a win only if it holds in both orders; a few-shot judge raised GPT-4 consistency from 65.0 to 77.5 percent but made API calls 4 times as expensive.
- Agreement (Section 4.2): GPT-4 agreed with human experts on 85 percent of non-tie MT-bench comparisons, against 81 percent agreement among humans. The abstract states over 80 percent.

## Limits
- Judges grade chat answers to open-ended questions, not code changes or agent transcripts. Models are those of 2023 (GPT-4, GPT-3.5, Claude-v1). It says nothing on a judge that can run tests.

## Used in
- research/synthesis/field-8.md
