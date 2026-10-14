---
repo: agentik-dev/agentik-respeak
path: plugin/scripts/respeak-measure.py
commit: 319f060
title: "respeak-measure.py: the local style scanner"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- The scanner measures Markdown against the corpus and budgets and costs zero API tokens (a local scan, no network). It reports banned-phrase hits by tier (error, warn, density), sentence-length statistics against the technical-mode caps, em-dash density, budget PASS or FAIL, and word count, per document (docstring, lines 1-60 read).
- Exempt from the scan: fenced code, inline code, blockquotes, HTML comments and URLs (bare, autolinked or inline-link targets); the link label still counts.
- `--fail-on {none,error,warn}` sets the exit (a budget FAIL counts as a warn-level hit); exit 2 is for usage and setup errors. `--config` carries the resolved `style.budgets` and `gate.allow`; without it a hand audit over-counts. `--baseline` classifies hits as introduced or pre-existing per rule; this is the mechanism under `gate.block_on: introduced`.
- Default budgets in the script (used when the config lacks a key): em-dashes 5 per 1,000 words, warn phrases (density) 8 per 1,000 words, average sentence 20 words, maximum sentence 35 words. The plugin config sets the warn-phrase budget to 5.
- It computes sentence statistics (`avg_sentence_words`, `max_sentence_words`) and em-dash density (`em_dashes_per_1000_words`). A search of the file for `flesch`, `gunning`, `readab` and `grade` finds none: no readability grade is computed at this commit.
- Per-entry corpus controls it honours: `exceptions` (a hit is exempt when the surrounding sentence also matches), `case_sensitive`, `tier: density`.

## Limits
- Read the docstring and grep results, not the whole file (23,095 bytes).
- Sentence statistics changed meaning in 0.6.0 (list items and table rows became their own units), so older figures are not comparable (CHANGELOG.md:320-322).

## Used in
- research/synthesis/tools-respeak.md
