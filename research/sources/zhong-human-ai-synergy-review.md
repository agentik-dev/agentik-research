---
url: https://arxiv.org/abs/2603.15911
title: "Human-AI Synergy in Agentic Code Review"
author: Suzhen Zhong, Shayan Noei, Ying Zou, Bram Adams
published: 2026-03 (submitted 16 March 2026)
accessed: 2026-10-14
kind: measured
---

## What it says
Abstract page plus the HTML text (read to about 100,000 of 102,715 characters). Section and table names as the paper prints them.
- Data: 278,790 code review conversations from 300 open-source GitHub projects. Agent reviewers were identified by hand from 16 AI-based review bots (Section II-B); named tools in the text include Claude Code, CodeRabbit, Devin, GitHub Copilot and Gemini Code Assist.
- Adoption (Section III-C, Table IV): 56.5 percent of human reviewers' suggestions (25,673 suggestions) were adopted, against 16.6 percent of AI agents' suggestions (88,011 suggestions), a gap of 39.9 percentage points.
- Of the AI suggestions that were not adopted, 28.7 percent were incorrect and 24.0 percent were handled by an alternative fix (Section III-C, Figure 8), just over half together.
- Review rounds (Section III-B): human reviewers exchanged 11.8 percent more rounds when reviewing AI-generated code than human-written code.
- Adopted AI suggestions raised code complexity and size more than adopted human suggestions (Table VI mean change in statements: 0.216 for AI against 0.108 for human).
- The authors conclude that agents can scale defect screening and that human oversight stays necessary.

## Limits
- A mining study of open-source projects, not a controlled test: it cannot say whether the agent comments were worth making or whether non-adopted comments were harmful. Bots differ in kind and are pooled. Review-bot behaviour is as of the 2025 and early 2026 data; the page does not say how a loop ends.

## Used in
- research/synthesis/field-8.md
