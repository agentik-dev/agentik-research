---
url: https://arxiv.org/abs/2510.05381
title: "Context Length Alone Hurts LLM Performance Despite Perfect Retrieval"
author: Yufeng Du, Minyang Tian, Srikanth Ronanki, Subendhu Rongali, Sravan Bodapati, Aram Galstyan, Azton Wells, Eliu A. Huerta, Roy Schwartz, Hao Peng
published: 2025-10 (arXiv v1 6 October 2025)
accessed: 2026-10-14
kind: measured
---

## What it says
- Claim: input length can lower accuracy even when the model retrieves the needed evidence perfectly. The abstract gives drops of 13.9 to 85 percent as input grows, within the models' claimed windows.
- Method (Sections 3 to 5): short tasks (GSM8K math, MMLU question answering, HumanEval coding, and a synthetic variable-summation task) are padded with distraction, in the form evidence, then distraction, then question. A separate check has the model recite the evidence; scored by exact match.
- Controls: replacing the distraction with whitespace, and then masking it so attention cannot reach it, still lowers accuracy. Open models: Llama-3.1-8B-Instruct and Mistral-v0.3-7B-Instruct. Closed models: GPT-4o, Claude and Gemini.
- Examples: Llama on MMLU at 30K tokens recited 970 of 1000 problems correctly yet accuracy fell 24.2 points. On whitespace padding at 30K tokens, Llama on variable summation fell 48 points.
- Closed models with whitespace padding (Table 2): GPT-4o fell 7.0 points on GSM8K at 30K and held at 100 percent on variable summation; the Claude column fell 67.6 points on MMLU at 30K, the largest closed-model drop; Gemini improved on GSM8K.
- Mitigation (Section 5): have the model first recite the relevant evidence, then solve in the shorter prompt. On a Mistral GSM8K setup at 26,250 tokens accuracy rose from 35.5 to 66.7 percent. GPT-4o on RULER gained at most 4 points (QA2 at 32K, 68.4 to 72.4 percent).

## Limits
- Two open and three closed models, four tasks. The paper labels the Claude column "Claude-3.7-Sonnet" in text and "Claude-3.5" in Table 2.
- Closed-model retrieval could not be measured because those models sometimes refused to recite on long inputs. The Gemini text and table disagree on the length of one gain.
- Padding with essays or whitespace is not the same as an agent's real tool output, and the tasks are short-answer problems.

## Used in
- research/synthesis/field-1.md
