---
url: https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html
title: "How Long Contexts Fail"
author: Drew Breunig (site owner; the page text carries no byline line)
published: 2025-06-22
accessed: 2026-10-14
kind: reported
---

## What it says
- A practitioner's taxonomy of four ways long contexts fail: poisoning (an error enters the context and is referenced repeatedly), distraction (the model over-focuses on its own history), confusion (superfluous material lowers answer quality) and clash (new content conflicts with earlier content).
- Evidence the post cites, as the author's secondhand reading: a Gemini 2.5 technical-report observation of a game-playing agent that, once context grew well past 100k tokens, favoured repeating past actions over new plans (the post repeats the report's own label, "anecdotal"); a Databricks study in which correctness began to fall around 32k tokens for Llama 3.1 405b; the Berkeley function-calling leaderboard finding that every model does worse with more than one tool; a small quantized Llama 3.1 8b that failed with 46 tools but succeeded with 19, though the context fit its window; and the sharded-prompt study (laban-lost-in-multiturn) with an average 39 percent drop.
- The author's own judgment: very long windows are mainly useful for summarisation and fact retrieval; for other work, respect a model's "distraction ceiling".

## Limits
- A blog post that relays other studies; none of its figures were checked at source here, except the 39 percent figure, which laban-lost-in-multiturn confirms. The Gemini observation is anecdotal by its own source's wording.
- Written in June 2025 about 2025 models.

## Used in
- research/synthesis/field-1.md
