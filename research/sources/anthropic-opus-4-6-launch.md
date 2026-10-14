---
url: https://www.anthropic.com/news/claude-opus-4-6
title: "Introducing Claude Opus 4.6"
author: Anthropic
published: 2026-02-05
accessed: 2026-10-14
kind: documented
---

## What it says
- As of February 2026, Opus 4.6 was Anthropic's first Opus-class model with a 1M-token window, in beta on the Claude Developer Platform only. Prompts over 200k tokens were priced at 10 dollars per million input and 37.50 dollars per million output tokens.
- The page describes context rot as performance degrading as a conversation passes a certain length, and says Opus 4.6 does markedly better than earlier models. On the 8-needle, 1M-token variant of MRCR v2 (a needle-retrieval benchmark), Opus 4.6 scores 76 percent and Sonnet 4.5 scores 18.5 percent.
- Reports that the model tracks information over hundreds of thousands of tokens with less drift; a customer quote calls it a meaningful leap in long-context performance.
- Compaction (beta, API) summarises older context when a configurable threshold is reached; benchmark footnotes give compaction triggers of 50k tokens.

## Limits
- A launch announcement: the 76 and 18.5 percent figures are vendor-reported on one benchmark of the retrieval kind; the page text does not describe the method, and I did not open the benchmark's own write-up. It shows retrieval of planted facts at 1M tokens, not reasoning or instruction following at that length.
- The February 2026 premium above 200k tokens is superseded by the October 2026 pricing page (anthropic-pricing-doc), which lists standard pricing across the 1M window for Opus models.

## Used in
- research/synthesis/field-1.md
