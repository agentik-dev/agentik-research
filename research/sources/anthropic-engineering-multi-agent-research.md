---
url: https://www.anthropic.com/engineering/multi-agent-research-system
title: "How we built our multi-agent research system"
author: Jeremy Hadfield, Barry Zhang, Kenneth Lien, Florian Scholz, Jeremy Fox, Daniel Ford (Anthropic)
published: 2025-06-13
accessed: 2026-10-14
kind: reported
---

## What it says
- The lead agent saves its plan to external memory early, because "if the context window exceeds 200,000 tokens it will be truncated and it is important to retain the plan."
- The appendix says agents summarize completed phases of work and store essential information in external memory before moving on, and can retrieve it, such as the research plan, instead of losing earlier work near the limit.
- When context limits approach, agents can spawn fresh subagents with clean contexts and keep continuity through careful handoffs.

## Limits
- Read only for the context-limit passages. A design description of a research product, with no comparison of handoff against in-place summary. The 200,000 token figure is as of June 2025 and a model-specific window.

## Used in
- research/synthesis/field-2.md
