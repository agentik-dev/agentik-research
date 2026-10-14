---
url: https://arxiv.org/abs/2405.15793
title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"
author: John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, Ofir Press
published: 2024-05 (v1, submitted 6 May 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
- Abstract: SWE-agent, a system with a custom agent-computer interface, reaches pass@1 of 12.5 percent on SWE-bench and 87.7 percent on HumanEvalFix, well above earlier non-interactive results.
- Section 4 (metrics, HTML extract): each instance has a cost budget of 4 US dollars; a run that exceeds it submits its existing edits automatically. Section 5.2: 93.0 percent of resolved instances were submitted before the budget ran out, against 69.0 percent of all instances. A budget is therefore the exit for the unresolved majority, not a rare event.
- Section 5.1, "Guardrails can improve error recovery": repeatedly editing the same snippet after an errant edit that introduces a syntax error is a prominent failure; removing the linting guardrail lowered performance from 18.0 percent to 15.0 percent.
- Section 5.2: 185 of 294 trajectories (51.7 percent) had one or more failed edits; the chance that editing eventually succeeds falls to 57.2 percent after a single failed edit, and recovery odds fall as failed edits accumulate. In an analysis of 248 unresolved SWE-bench Lite trajectories, labelled by GPT-4o (87 percent agreement with the authors' labels on a hand-labelled validation set), about 52.0 percent were incorrect or overly specific implementations and cascading failed edits were 23.4 percent.

## Limits
- 2024 system with GPT-4-era models on SWE-bench Lite; the counts come from the fetch tool's extract of about half of the 205,000-character HTML, and the extract flagged the number of failure categories as unreliable, so I give none. A single-agent benchmark harness, not an unattended Claude Code run.

## Used in
- research/synthesis/field-6.md
