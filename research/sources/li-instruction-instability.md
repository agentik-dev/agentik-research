---
url: https://arxiv.org/abs/2402.10962
title: "Measuring and Controlling Instruction (In)Stability in Language Model Dialogs"
author: Kenneth Li, Tianle Liu, Naomi Bashkansky, David Bau, Fernanda Viegas, Hanspeter Pfister, Martin Wattenberg
published: 2024-02 (arXiv v1 February 2024, v4 25 July 2024; a search listing names COLM 2024, which the opened page did not state)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (Section 3): two copies of a chatbot hold a self-chat for 8 rounds, one acting as user and one as the agent under test, each with its own system prompt. After each round a probe question is scored by a fixed program for how well the agent still follows its system prompt. 100 system prompts in 5 categories; the main runs use 200 random prompt pairs on LLaMA2-chat-70B, with gpt-3.5-turbo-16k as a check.
- Result (Section 3.3): stability of the system prompt falls steadily over the 8 rounds for LLaMA2-chat-70B, which also starts to take on the simulated user's instructions. gpt-3.5-turbo-16k holds better but still drops about 10 percent.
- Explanation offered (Sections 4 and 5): the share of attention given to system-prompt tokens falls sharply as turns are added. The authors call attention decay something that "may internally contribute" to drift; it is a hypothesis, not shown to be the cause.
- Mitigation: "split-softmax" rescales attention toward the system prompt without training; it matches repeating the system prompt in later turns while using no extra context. Both trade some general accuracy for stability.

## Limits
- Open and older models (LLaMA2-chat-70B, gpt-3.5-turbo-16k); no Claude model. The span is 8 rounds, not hundreds of tool calls.
- The authors note the theory is an idealised sketch, most results come from one model, and the stability scores are hand-written for specific prompts.
- Persona-style system prompts, not repository rules.

## Used in
- research/synthesis/field-1.md
