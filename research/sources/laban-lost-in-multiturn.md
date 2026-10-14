---
url: https://arxiv.org/abs/2505.06120
title: "LLMs Get Lost In Multi-Turn Conversation"
author: Philippe Laban, Hiroaki Hayashi, Yingbo Zhou, Jennifer Neville
published: 2025-05 (arXiv v1 9 May 2025)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (Sections 3 to 5): single-turn instructions are split into "shards" revealed one per turn by a simulated user (GPT-4o-mini). Six tasks (code, database, actions, math, data-to-text, summary), 600 instructions, 15 models, more than 200,000 simulated conversations, about 5,000 US dollars of compute. Models include Claude 3 Haiku and Claude 3.7 Sonnet, GPT-4o, o3, Gemini 2.5 and DeepSeek-R1.
- Result (Section 6): average performance falls 39 percent from the fully specified single-turn setting to the sharded multi-turn setting (about 90 to 65 percent across models). Putting all shards in one message ("concat") reaches 95.1 percent of the single-turn score, so the drop is not lost information.
- Of the drop, aptitude (90th-percentile score) falls about 16 percent, while unreliability (gap between 90th and 10th percentile) rises about 112 percent. Reasoning models o3 and DeepSeek-R1 degrade similarly.
- Named causes: premature answer attempts built on early assumptions, over-reliance on the model's own earlier attempts, over-weighting the first and last turns, and wordy replies that add assumptions.
- Mitigations (Section 7, Table 2): restating all shards in a final turn ("recap") lifted GPT-4o from 59.1 to 76.6 (single-turn 93.0); a running restatement each turn ("snowball") reached 65.3. Both stay below single-turn scores. Lowering temperature barely helped in multi-turn runs.

## Limits
- The authors list: the user is simulated, shards are minimal and revealed in a fixed way, analytical tasks only, English and text only. They think real degradation may be larger.
- The task is an underspecified user request, not a coding agent reading files. Mitigations were tested on GPT-4o-mini and GPT-4o only.
- Recap is applied on a turn known to be last, which a real session cannot know in advance (the paper says so).

## Used in
- research/synthesis/field-1.md
