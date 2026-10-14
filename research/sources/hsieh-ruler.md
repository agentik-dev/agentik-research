---
url: https://arxiv.org/abs/2404.06654
title: "RULER: What's the Real Context Size of Your Long-Context Language Models?"
author: Cheng-Ping Hsieh, Simeng Sun, Samuel Kriman, Shantanu Acharya, Dima Rekesh, Fei Jia, Yang Zhang, Boris Ginsburg (NVIDIA)
published: 2024-04 (arXiv v1 9 April 2024, v3 6 August 2024; COLM 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (full text, Section 4): 13 synthetic tasks in four groups (retrieval, multi-hop tracing, aggregation, question answering), 500 examples per task per length, lengths 4K, 8K, 16K, 32K, 64K and 128K tokens, greedy decoding.
- Models: 17 long-context models (15 open, plus GPT-4 and Gemini-1.5-Pro). No Claude model.
- "Effective length": the longest length at which a model scores above the Llama2-7B score at 4K tokens (85.6 percent). Almost every model falls below it before its claimed length. The abstract says only about half of the models keep satisfactory performance at 32K.
- Examples from Table 3: GPT-4 claimed 128K, effective 64K, and averaged 96.6 percent at 4K and 81.2 percent at 128K. Gemini-1.5-Pro claimed 1M and stayed above the threshold at every length tested. Command-R-plus claimed 128K, effective 32K.
- Near-perfect scores on plain needle-in-a-haystack hide the drop on harder tasks. Named failure modes at long length: not ignoring distractors, copying from the context, and using parametric knowledge instead of the context.

## Limits
- The authors list: no control of needle position, so no lost-in-the-middle reading; the tasks are proxies, with unproven link to realistic long-context work; no prompt-robustness check.
- The 2024 abstract text differs between versions (ten models in v1, 17 in v3); this note uses v3.
- Models are 2024 vintage; the authors note that FLenQA (levy-same-task-more-tokens) shows decline at just a few thousand tokens.

## Used in
- research/synthesis/field-1.md
