---
url: https://arxiv.org/abs/2310.01798
title: "Large Language Models Cannot Self-Correct Reasoning Yet"
author: Jie Huang, Xinyun Chen, Swaroop Mishra, Huaixiu Steven Zheng, Adams Wei Yu, Xinying Song, Denny Zhou
published: 2023-10 (v1 3 October 2023; v2 14 March 2024; appeared at ICLR 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
- The abstract studies intrinsic self-correction: a model revises its own answer using only its own ability, with no external feedback. On reasoning tasks the authors find models struggle to correct themselves this way, and performance sometimes gets worse after the attempt.

## Limits
- I read the abstract page only; datasets and effect sizes are not recorded here. It concerns reasoning benchmarks in 2023-era models and says nothing on a second agent with fresh context or on a reviewer that runs tests.

## Used in
- research/synthesis/field-5.md

## Also (question 8)
Re-read on 2026-10-14 from the v2 PDF text (14 March 2024; ICLR 2024). Table names as the paper prints them.
- Oracle versus intrinsic (Tables 2 and 3): with the ground-truth label deciding whether to revise, GPT-3.5 on GSM8K rose from 75.9 to 84.3 percent and GPT-4 from 95.5 to 97.5. With the model deciding for itself (no label), GPT-4 on GSM8K fell from 95.5 to 91.5 percent after round 1 (3 model calls) and to 89.0 after round 2 (5 calls); GPT-3.5 on CommonSenseQA fell from 75.8 to 38.1 and 41.8. On HotpotQA GPT-4 went 49.0, 49.0, 43.0.
- Why it falls (Section 3.3): after two rounds on GSM8K, GPT-3.5 kept its first answer 74.7 percent of the time; of the changes, correct-to-incorrect outnumbered incorrect-to-correct. The authors say the model cannot judge the correctness of its own reasoning. Different feedback prompts all lowered accuracy (Tables 5 and 6).
- The paper argues that prior gains came from oracle labels, and that improvements vanish when no label is available.
- Debate against voting (Section 4, Table 7, GSM8K, gpt-3.5-turbo, the debate prompt of Du et al.): standard prompting 76.7 percent with 1 response; self-consistency 82.5 with 3 responses, 85.3 with 6, 88.2 with 9; multi-agent debate 83.2 after round 1 (6 responses) and 83.0 after round 2 (9 responses). Debate with 3 agents was slightly better than voting over 3 responses (83.2 against 82.5), but at equal response counts voting scored higher (85.3 against 83.2 at 6; 88.2 against 83.0 at 9). The authors call the debate gain "consistency" across generations, not critique.
- Cost rule (Section 6, Discussion): any self-correction method should come with an inference-cost analysis and be compared with strong multi-response baselines such as self-consistency.
- External feedback (Section 6): when valid outside feedback exists it should be used. The paper points to code execution results as an example: where unit tests state the intended behaviour, the code executor acts as a perfect verifier and its error messages guide the fix.
- Used in (question 8): research/synthesis/field-8.md

### Limits (question 8)
- Reasoning and question-answering benchmarks with 2023-era models (GPT-3.5, GPT-4, GPT-4-Turbo, Llama-2). It tests a model correcting itself without outside signals, not a second agent that runs tests or a reviewer with a different prompt and fresh context.
