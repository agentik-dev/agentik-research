---
url: https://arxiv.org/abs/2507.11538
title: "How Many Instructions Can LLMs Follow at Once?"
author: Daniel Jaroslawicz, Brendan Whiting, Parth Shah, Karime Maamari (Distyl AI)
published: 2025-07 (arXiv v1 15 July 2025)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (Section 3): the IFScale benchmark asks for a business report that includes each of N required keywords, with N from 10 to 500 in steps of 10, five seeds per level, 20 models from seven providers.
- Result (Section 4.3): at 500 instructions the best model scored 68.9 percent (a Gemini 2.5 Pro preview); o3 scored 62.8 percent. Claude models at 500: 3.7 Sonnet 52.7, Opus 4 (reasoning) 52.1, Opus 4 44.6, Sonnet 4 42.9, Sonnet 4 (reasoning) 39.9, 3.5 Haiku 8.5 percent.
- Three decay shapes (Section 4.4): reasoning models hold near-perfect accuracy up to a threshold density then fall; some models, including Claude 3.7 Sonnet, fall about linearly; others fall steeply then level off at a low floor.
- Primacy bias (Section 4.6): later instructions are violated more often than earlier ones, most at middle densities (about 150 to 200 instructions), less at 300 or more.
- Error type (Section 4.8): at high density the main error is leaving an instruction out, not altering it.
- Re-opened 2026-10-14 (site sitting): the abs page (v1, submitted 15 July 2025; Daniel Jaroslawicz, Brendan Whiting, Parth Shah, Karime Maamari) has an abstract that says the benchmark has 500 keyword-inclusion instructions in a report-writing task, covers 20 models from seven providers, and that "even the best frontier models only achieve 68% accuracy at the max density of 500 instructions". The abs page gives no Claude figures. I read them in the arXiv HTML rendering of the same paper, Table 1 in Appendix A "Full Results" (the PDF fetch returned only binary data). Accuracy at 100 and at 500 instructions, percent: Claude Opus 4 94.6 and 44.6; Claude Sonnet 4 94.4 and 42.9; Claude 3.7 Sonnet 94.8 and 52.7; Claude 3.5 Haiku 43.4 and 8.5. The best row at 500 is gemini-2.5-pro-preview at 68.9. So the earlier figures (Opus 4 at 44.6 and Sonnet 4 at 94.4 and 42.9) are confirmed; all four Claude rows are 3.x or 4 models from mid-2025.

## Limits
- The authors say it covers only one task type (keyword inclusion in report writing), English, business vocabulary; whether report quality itself degrades is left open.
- It varies the number of instructions, not the number of tokens or turns, so it bears on a long instruction file (many rules at once) rather than on a long session. Model snapshots are from mid-2025.

## Used in
- research/synthesis/field-1.md
- journal-ledger

## Also (question 3)
- Appendix A accuracy, in percent at 10, 100, 250 and 500 instructions: Claude Sonnet 4 100.0, 94.4, 77.2, 42.9; Claude Opus 4 100.0, 94.6, 67.9, 44.6; Claude 3.7 Sonnet 100.0, 94.8, 72.9, 52.7; Claude 3.5 Haiku 98.0, 43.4, 16.6, 8.5; o3 (high) 100.0, 98.2, 97.8, 62.8; Gemini 2.5 Pro 100.0, 98.4, 84.8, 68.9.
- The paper says o3 and Gemini 2.5 Pro keep near-perfect performance through 150 or more instructions before declining. A practitioner post (humanlayer-writing-a-good-claude-md) reads this as frontier models following 150 to 200 instructions; the task was keyword inclusion in a report, not coding rules, and no Claude 4.5 or later model is in the table.
