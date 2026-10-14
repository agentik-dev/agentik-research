---
url: https://code.claude.com/docs/en/code-review
title: "Code Review"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
All as of October 2026. Code Review is a research preview for Team and Enterprise plans.
- How it works (section "How reviews work"): multiple agents analyze the diff and surrounding code in parallel, each looking for a different class of issue; then a verification step checks candidate findings against actual code behaviour to filter false positives; results are deduplicated, ranked by severity and posted as inline comments. Findings carry a "Why this was flagged" section that explains how the problem was verified.
- Cost and time: reviews average 20 minutes; the pricing section gives an average of 15 to 25 US dollars per review, scaling with pull request size, billed through usage credits.
- Review text can tune the pipeline: `REVIEW.md` is given to the agents that find and verify findings and consulted by those that rank them. The page suggests a verification bar (a `file:line` citation for behaviour claims) and a re-review rule so a one-line fix does not reach "round seven on style alone".
- Local `/code-review` runs as a background subagent with its own context window, so the findings do not fill the main conversation; under `-p` it runs in the foreground and the findings return in the response.

## Limits
- A vendor describing its own product; no false-positive rate, recall or user study is given on the page. The findings are advisory and the check run never blocks a merge.

## Used in
- research/synthesis/field-5.md

## Also (question 8)
Re-opened on 2026-10-14. All as of October 2026.
- Advisory by design: findings carry a severity (Important, Nit, Pre-existing) and "don't approve or block" the pull request. The check run "always completes with a neutral conclusion", so it never blocks merging through branch protection; a team that wants a gate must read the severity counts from the check run in its own CI.
- Round-limit levers in `REVIEW.md` (section "What you can tune"): a verification bar ("behavior claims need a `file:line` citation"), a cap on nit volume (the example caps nits at five per review), skip rules, and a re-review convergence rule. The page's example rule: after the first review suppress new nits and post Important findings only; the page says such a rule "stops a one-line fix from reaching round seven on style alone."
- Triggers: review once after the pull request opens, after every push, or on request; the page says reviewing on every push multiplies the cost by the number of pushes. The average is 15 to 25 US dollars per review and about 20 minutes.
- A local `/code-review` reviews in a background subagent with its own context window and reports findings; `--fix` applies them and is opt-in. The local review does not read `REVIEW.md`.
- Limits (question 8): vendor documentation with no false-positive or recall figures; "round seven" is an illustration, not a measured loop.
- Used in (question 8): research/synthesis/field-8.md
