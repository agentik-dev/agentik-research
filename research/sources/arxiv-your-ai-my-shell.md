---
url: https://arxiv.org/abs/2509.22040
title: "\"Your AI, My Shell\": Demystifying Prompt Injection Attacks on Agentic AI Coding Editors"
author: Yue Liu, Yanjie Zhao, Yunbo Lyu, Ting Zhang, Haoyu Wang, David Lo
published: 2025-09-26 (v1; v2 revised 2026-04-28)
accessed: 2026-10-14
kind: measured
---

Opened the arXiv abstract page only; the full paper was not read.

## What it says
- First empirical analysis of prompt injection against high-privilege agentic coding editors. The authors built AIShellJack, an automated test framework, with 314 attack payloads covering 70 MITRE ATT&CK techniques, and tested GitHub Copilot and Cursor across objectives from initial access and discovery to credential theft and exfiltration.
- Attack success rates reach as high as 84% for executing malicious commands.
- Mechanism: attackers poison external development resources (rules files, repository content) with instructions that hijack the agent into running commands on the user's machine.

## Limits
- Abstract only. It tests Copilot and Cursor, not Claude Code, and does not isolate the effect of a permission mode, hook or sandbox on the 84%. Editors and models date from 2025.

## Used in
- research/synthesis/field-7.md
