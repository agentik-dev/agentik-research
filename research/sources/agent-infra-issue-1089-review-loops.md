---
url: https://github.com/daniel-ospina/agent-infra/issues/1089
title: "review loops never converge when the fix pass adds the text the reviewers read - non-additive repair and a severity-based exit (issue 1089)"
author: The issue's reporter (the owner of a public GitHub repository, named in the URL)
published: 2026-09-15 (opened; follow-up comments to 2026-10-13)
accessed: 2026-10-14
kind: reported
---

## What it says
- Mechanism reported: a fix-then-re-review loop can fail to end even when no defect recurs, because each fix adds normative text and that text is new surface for the next reviewer. Recurrence stays at zero while the count of issues does not fall, and the repository's stall detectors (convergence, zero progress, honest stuck) did not catch it.
- Four cases with counts. An epic plan took 8 review cycles with findings of 37, 39, 35, 54, 52, 46, 45 and 45; the controller escalated instead of running more. A two-test fix grew from 5 files (+61, -36 lines) to 13 files (+581, -110) over about six cycles and was stopped by a 6-hour task cap. A pull request hit the safety cap of 10 review cycles, with cycles 6 to 10 finding only prose and claims, some false statements introduced by the previous cycle's own edits. A documentation-only pull request ran about 20 cycles (findings 4, 2, 2, 5, 3, 4, 1) and ended when one full sweep of about 60 citations found a single mismatch.
- Proposed rules: each cycle may only replace or delete text (net line change at most zero) or else counts as an authoring cycle; reviewers report defects, not missing requirements ("New requirements are not review findings"); review only the changed text from cycle 3; after cycle 2 fix only the two highest severities and log the rest; exit clean when a cycle has no high-severity finding, not at literally zero; if the artifact grows while recurrence is zero, report a scope finding. A later comment suggests one complete-surface enumeration pass as an alternative exit.
- Status as of October 2026: open.

## Limits
- One person's repository and workflow, counts taken from its own logs, proposals untested. Reported, not measured.

## Used in
- research/synthesis/field-8.md
