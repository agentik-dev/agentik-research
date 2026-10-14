---
url: https://claude.com/blog/code-review
title: "Bringing Code Review to Claude Code"
author: Anthropic (no byline on the page)
published: 2026-03-09
accessed: 2026-10-14
kind: documented
---

## What it says
All figures are Anthropic's own, from its internal use, as of March 2026.
- Share of pull requests that drew substantive review comments: 16 percent before Code Review and 54 percent after. The page does not define "substantive".
- Findings that engineers marked incorrect: less than 1 percent.
- By pull request size (internal testing): 84 percent of pull requests over 1,000 changed lines got findings, averaging 7.5 issues; 31 percent of those under 50 changed lines got findings, averaging 0.5 issues.
- Method: on a pull request opening, a team of agents searches for bugs in parallel, verifies candidates to filter false positives and ranks them by severity; review depth scales with pull request size. An average review takes about 20 minutes and costs 15 to 25 US dollars, billed on token use.
- Sign-off stays with people: "It won't approve PRs — that's still a human call."

## Limits
- A launch post by the vendor about its own product; the 54 percent and the under-1-percent figures have no stated denominator, sample, or definition of "incorrect" (an engineer's mark), and are not independently checked. The figures tell us how often the tool is right when it speaks, not how many bugs it misses.

## Used in
- Read for question 8 and not cited in research/synthesis/field-8.md, which is at its size limit; available for the page drafts.
