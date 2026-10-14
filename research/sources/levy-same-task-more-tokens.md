---
url: https://arxiv.org/abs/2402.14848
title: "Same Task, More Tokens: the Impact of Input Length on the Reasoning Performance of Large Language Models"
author: Mosh Levy, Alon Jacoby, Yoav Goldberg
published: 2024-02 (arXiv v1 19 February 2024, v2 10 July 2024; ACL 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (full text, Sections 2 to 4): the FLenQA dataset. Each of three simple reasoning tasks has 100 base items with two key paragraphs that must be combined to answer a true/false question. The same item is padded with irrelevant text to lengths from 250 to 3,000 tokens, with varied padding type and position. Each plotted point covers 600 samples.
- Models: GPT-4 (1106 preview), GPT-3.5 (1106), Gemini Pro, Mistral Medium, Mixtral 8x7B. No Claude model.
- Result: averaged over all models, accuracy falls from 0.92 to 0.68 at 3,000 tokens, far below the models' technical maximum. The trend appears with every padding type and key-paragraph position tested.
- Chain-of-thought prompting raises accuracy at every length but does not remove the drop; GPT-4 is the exception, where the gap widens with length.
- Failure modes (Section 7): as input grows, models more often refuse to give the requested true/false answer, lean toward answering "false", give the final answer before the reasoning in chain-of-thought mode, and use the key facts less in their responses. The paper reads this as models following the format instruction less well at length.
- Next-word-prediction accuracy on long inputs correlates negatively with reasoning accuracy (Pearson -0.95, p = 0.01 in Figure 6), so perplexity-style checks do not stand in for task checks.

## Limits
- The authors state that behavioral testing leaves the cause unexplained, and that tasks were kept simple enough for the weakest model, which may hide effects on harder tasks.
- Lengths stop at 3,000 tokens and models are 2023 vintage. The result shows length alone hurts; it does not give a rate for 2026 models.

## Used in
- research/synthesis/field-1.md
