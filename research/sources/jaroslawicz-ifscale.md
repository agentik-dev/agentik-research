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

## Limits
- The authors say it covers only one task type (keyword inclusion in report writing), English, business vocabulary; whether report quality itself degrades is left open.
- It varies the number of instructions, not the number of tokens or turns, so it bears on a long instruction file (many rules at once) rather than on a long session. Model snapshots are from mid-2025.

## Used in
- research/synthesis/field-1.md
