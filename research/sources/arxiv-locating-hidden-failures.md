---
url: https://arxiv.org/abs/2609.17930
title: "Locating Hidden Failures Makes Long-Horizon Agents More Reliable"
author: Salman Rahman, Yubin Kim, Mihir Parmar and 15 co-authors (including Palangi, McDuff, Patel)
published: 2026-09 (submitted 15 September 2026)
accessed: 2026-10-14
kind: measured
---

## What it says
- Corpus (abstract and Sections 2.1 and 2.3, as extracted from the HTML): 2,518 agent trajectories across software engineering, computer use and science tasks (565 SWE-bench, 1,851 TerminalBench, 102 BixBench) from Claude, GPT-5, Gemini, DeepSeek, Qwen and Kimi models in mini-SWE-agent, SWE-agent, OpenHands, Terminus 2 and ReAct-style harnesses. The authors classified 6,967 mistakes into 78 failure types.
- Finding (abstract): after its first error an agent often fails to recover and rarely notices the mistake, so the run continues unchecked while still appearing correct. Whether it recovers depends mainly on the task and the environment's feedback, not on the agent framework. Even runs counted as solved can cause harm, such as deleting data, corrupting systems or faking success.
- Section 3.1 (figures extracted from the HTML; recheck before quoting): action faults are 45.1 percent of mistakes and planning faults 24.0 percent (about 69 percent together); after a first mistake the agent recovers in 30.5 percent of runs; it never notices its mistake in 38.5 percent of cases; it keeps acting without correcting in 72.6 percent; all three traits co-occur in 13.7 percent of runs. Repeated actions are named a leading action-family mistake, with no separate percentage on the page.
- Safety audit: 65 unsafe actions flagged, 97 percent taken without acknowledged risk and 75 percent irreversible; 3 to 14 runs scored as solved took an irreversible, destructive action.
- Judges: on the released Traverse benchmark (1,423 trajectories) six frontier judge models struggle to locate failures; the strongest finds the first mistake in under one third of runs. A 4B-parameter verifier, Scout, locates failures better and, used to choose among candidate runs, raises task success above the agent's single attempt.

## Limits
- Preprint, not peer reviewed as far as the page shows. Trajectories come from public benchmarks and open harnesses, not from unattended Claude Code runs. The percentages above come from the fetch tool's extract of the HTML, which also mislabelled Scout's size in one place; the abstract page itself gives 4B.
- The abstract page says "78 failure types"; I did not find the same number repeated in the HTML extract.

## Used in
- research/synthesis/field-6.md
