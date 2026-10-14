---
url: https://arxiv.org/abs/2509.05755
title: "Red-Teaming Coding Agents from a Tool-Invocation Perspective: An Empirical Security Assessment"
author: Yuchong Xie, Mingyu Luo, Zesen Liu, Zhixiang Zhang, Kaikai Zhang, Yu Liu, Zongjie Li, Ping Chen, Shuai Wang, Dongdong She
published: 2025-09-06 (v1; v6 revised 2026-06-28)
accessed: 2026-10-14
kind: measured
---

Opened the arXiv abstract page only; the full paper was not read.

## What it says
- Red-teams six coding agents (Cursor, Claude Code, Copilot, Windsurf, Cline, Trae) in two phases: recover system prompts by reconnaissance (a flaw the authors call ToolLeak), then hijack tool invocation with a two-channel prompt injection (in the tool description and in return values) to reach remote code execution.
- Real agents: prompt leakage succeeded on 19 of 25 agent-and-model pairs, and on every agent that used Claude or Grok backends. Tool hijacking reached remote code execution on every tested pair. Backends named include Claude-Sonnet-4, Claude-Sonnet-4.5, Grok-4 and GPT-5.
- Includes a study of the guardrails of external and built-in tools, and closes with defence recommendations.

## Limits
- Abstract only: the authors' specific conclusions on permission prompts or sandboxes are in the body and were not read. Results are for the tested versions in 2025 and the revision of 2026.

## Used in
- research/synthesis/field-7.md
