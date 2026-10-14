---
url: https://www.humanlayer.dev/blog/writing-a-good-claude-md
title: "Writing a good CLAUDE.md"
author: Kyle (HumanLayer)
published: 2025-11-25
accessed: 2026-10-14
kind: reported
---

## What it says
- Cites the IFScale paper (arXiv 2507.11538, see jaroslawicz-ifscale) for the claim that frontier thinking models follow roughly 150 to 200 instructions with reasonable consistency and smaller models degrade faster. The post adds that as the count rises, models stop following all instructions at a similar rate, not only the newest ones.
- Reports, as the author's own analysis with no method described, that Claude Code's system prompt holds about 50 individual instructions, which leaves part of the budget used before CLAUDE.md loads.
- Shows the system reminder that wraps CLAUDE.md, which tells the model the content may or may not be relevant, and reads from it that the model may ignore content it judges not relevant to the task. The post does not measure how often that happens. Quote from the reminder as the post shows it: "You should not respond to this context unless it is highly relevant to your task."
- Advice, not measured: under 300 lines is "general consensus" and shorter is better; the post says Anthropic gave no official length guidance (the October 2026 docs now say under 200 lines; see code-docs-memory). The author's own root file is under sixty lines.
- Advice: progressive disclosure, meaning task-specific instructions in separate markdown files with descriptive names, listed in CLAUDE.md with short descriptions, and `file:line` pointers instead of pasted snippets.
- Advice: do not use CLAUDE.md as a linter; use formatters, linters, hooks or commands. "Never send an LLM to do a linter's job."

## Limits
- A named practitioner's opinion piece from a company that builds agent tooling. The 150 to 200 figure comes from a keyword-inclusion benchmark, not from coding rules, and the 50-instruction count is unverified. The wrapper text may have changed since November 2025.

## Used in
- research/synthesis/field-3.md
