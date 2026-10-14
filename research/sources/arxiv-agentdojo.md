---
url: https://arxiv.org/abs/2406.13352
title: "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents"
author: Edoardo Debenedetti, Jie Zhang, Mislav Balunovic, Luca Beurer-Kellner, Marc Fischer, Florian Tramer
published: 2024-06-19 (v1; v3 revised 2024-11-24)
accessed: 2026-10-14
kind: measured
---

Opened the abstract page and the HTML version (first 100,000 of 104,061 characters).

## What it says
- A benchmark of 97 realistic tasks (email, e-banking, travel) and 629 security test cases, with attacks and defences from the literature.
- Results (Table 3, Section 4.1): the most capable model without attack, Claude 3.5 Sonnet, solved 78.22% of tasks (plus or minus 3.23) and a targeted attack succeeded against it 33.86% of the time (plus or minus 3.70). GPT-4o: 69.00% utility and 47.69% targeted attack success.
- Defences on GPT-4o (Table 5, Section 4.3): no defence, 69.00% utility and 57.69% attack success; data delimiting, 72.66% and 41.65%; prompt sandwiching, 85.53% and 27.82%; a secondary prompt-injection detector, 41.49% and 7.95%; a tool filter (the agent first plans which tools it needs and the rest are removed), 73.13% and 6.84%. The text says 7.5% for the tool filter, which does not match the table's 6.84%.
- Limits of the tool filter (Section 4.3): it fails when the needed tools cannot be planned in advance, or when the tools the task needs are also enough for the attack, which the authors put at 17% of test cases.

## Limits
- Tool-using agents on email, banking and travel tasks in a simulator, with 2024 models; not coding agents with a shell. It still shows the shape of the trade: a defence that restricts tools (the nearest analogue of a deny rule or an allowlist) cut attack success most while keeping utility, and a detector cut it nearly as far at a large cost in utility.

## Used in
- research/synthesis/field-7.md
