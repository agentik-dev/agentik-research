---
url: https://github.com/fullsend-ai/agents/issues/1294
title: "Review agent should detect non-converging review loops and suppress low-severity new findings (issue 1294)"
author: The issue's reporter (an automated retrospective account on a public GitHub repository); a commenter proposes a script-level check
published: 2026-09-15 (opened; a comment dated 2026-09-16)
accessed: 2026-10-14
kind: reported
---

## What it says
- Incident as reported: one pull request in a related public repository received 11 consecutive change-request reviews and the human closed it. Across the 11 rounds the review agent raised 18 distinct inline findings, 14 low severity and 4 medium; each round brought 1 to 3 new findings while the fix agent cleared the earlier ones, and the themes drifted (naming, validation, dead code, symbols, a stale base layer, commit type, test naming).
- Proposal: pass the prior round count to the reviewer. Past round 4, when most findings are new and low severity, the reviewer posts a non-convergence note recommending human architectural review, suppresses new low-severity findings and uses a comment verdict unless a medium or higher finding exists. Success test: no pull request exceeds 6 consecutive change-request reviews without a non-convergence signal.
- A commenter argues for enforcing the rule in a script, not in the reviewer's prompt: from fix iteration 3, count critical, high and medium findings over the last three bot reviews and, if the count has not dropped over two rounds, skip the fix, label the pull request for a human and post both rounds' findings. The commenter names a limit: findings have no stable identifier, so the count cannot tell an unfixed finding from drift.
- Status as of October 2026: open, no assignee.

## Limits
- A single issue, written by an automated account about one pull request; the proposed thresholds (round 4, round 6) are proposals, not tested. Reported, not measured.

## Used in
- research/synthesis/field-8.md
