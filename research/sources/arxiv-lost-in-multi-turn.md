---
url: https://arxiv.org/abs/2505.06120
title: "LLMs Get Lost In Multi-Turn Conversation"
author: Philippe Laban, Hiroaki Hayashi, Yingbo Zhou, Jennifer Neville
published: 2025-05-09 (v1)
accessed: 2026-10-14
kind: measured
---

## What it says
- Across six generation tasks and 15 LLMs, over 200,000 simulated conversations show an average 39% drop in performance in multi-turn, underspecified settings against single-turn ones, from a small loss of aptitude and a large rise in unreliability.
- In the authors' words, "when LLMs take a wrong turn in a conversation, they get lost and do not recover."
- A Concat condition, which puts all the information into a single instruction, is described as an effective way to improve aptitude and reliability. Two agent-style mitigations that repeat earlier user turns (Recap at the end, Snowball at each turn) recover only part: Snowball reduces the deterioration by 15 to 20% in Table 2 (GPT-4o and GPT-4o-mini, four tasks).
- Practical advice in section 7.4 (read in the PDF): "starting a new conversation that repeats the same information might yield significantly better outcomes than continuing an ongoing conversation." It adds "Consolidate before retrying": ask the model to consolidate everything said so far, then bring that into a new conversation. It notes users of a coding environment report starting new conversations "whenever they can".

## Limits
- Lab setting: single-answer tasks whose instructions are sharded across turns, no tool use, no code repository. It does not test summaries of agent work or Claude Code. The mitigation tables use two GPT-4-class models. A preprint. It is the closest measured support for "restart from a consolidated brief", not a test of compaction against a restart.

## Used in
- research/synthesis/field-2.md
