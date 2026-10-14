# Field 8: Review that ends

## The question
Review loops that never converge, sign-off bars, round limits, adversarial review, decision records (ADRs and ledgers).

## Findings
Measured
- Self-correction with no outside signal lowered accuracy: GPT-4 on GSM8K went from 95.5 to 91.5 percent after one round and 89.0 after two; with a ground-truth label deciding when to revise it reached 97.5. The paper names a unit-test executor as a perfect verifier. [huang-self-correct; measured]
- Debate among copies of one model scored 83.2 and 83.0 percent at 6 and 9 responses, below majority voting at 85.3 and 88.2. A 5-method, 9-benchmark study found debate often fails to beat chain-of-thought and self-consistency despite more compute. [huang-self-correct; zhang-stop-overvaluing-mad; measured]
- A survey found no prior work showing self-correction from a prompted model's own feedback, except on suited tasks; reliable external feedback works. GPT-4 collapsed with self-critique and gained with a sound external verifier. [kamoi-self-correction; stechly-self-verification; measured]
- Self-Refine gained about 20 points on average over 7 tasks (4 iterations at most), but 0 to 0.2 points on math, where feedback said "everything looks good" for 94 percent of instances. Specific feedback beat generic; returns shrank each iteration. [madaan-self-refine; measured]
- Judges are biased: after an order swap GPT-4 stayed consistent on 65.0 percent of pairs and Claude-v1 on 23.8; a padded answer fooled Claude-v1 and GPT-3.5 in 91.3 percent of cases, GPT-4 in 8.7; GPT-4 matched human experts on 85 percent of non-tie pairs (humans among themselves: 81). [zheng-llm-judge; measured]
- Across 278,790 review conversations in 300 open-source projects, AI reviewers' suggestions were adopted 16.6 percent of the time against 56.5 percent for humans; 28.7 percent of the unadopted ones were incorrect. [zhong-human-ai-synergy-review; measured]
- An agentic reviewer beat single-turn review (52.6 against 44.1 percent resolve rate for one patch source). Repeated review-revise rounds gained +5.8, +2.4, +0.4 and +0.6 points on rounds 2 to 5. [wang-swe-review; measured]
- Trained critics were preferred over human critiques in 63 percent of cases and caught more bugs than paid contractors, but hallucinated bugs. [mcaleese-criticgpt; measured]
Documented (as of October 2026)
- Claude Code ends a Stop-hook sign-off loop after 8 consecutive continuations; a tool call resets the count. [code-docs-hooks-reference; documented]
- Code Review is advisory: its check ends neutral and never blocks. `REVIEW.md` can set a verification bar, a nit cap and a re-review rule against "round seven on style alone". [code-docs-code-review; documented]
- A reviewer asked to find gaps "will usually report some, even when the work is sound"; the page lists gates from a prompt check to a Stop hook to a refuting subagent. [code-docs-best-practices; documented]
- One question call carries 1 to 4 questions and may wait indefinitely; a `defer` hook lets the process exit. [code-docs-agent-sdk-user-input; documented]
- A harness author found agents "reliably skew positive" grading their own work; the separate evaluator needed several rounds of tuning (March 2026). [anthropic-engineering-harness-design; reported]
- Evaluator-optimizer needs clear criteria; a maximum-iterations stop is common (December 2024). [anthropic-building-effective-agents; documented]
Reported
- Four public loops that did not end: 11 consecutive change requests with 18 findings, 14 of them low severity; 9 rounds where each round hit the last fix; 8 cycles with findings 37 to 45; nit-only reviews that kept triggering fixes under a cap of 10. Proposed exits (severity floor, report-only reviewer, blocking tags, round count shown to the reviewer) are untested. [fullsend-issue-1294-nonconverging-review; aiwatch-issue-1298-review-loop; agent-infra-issue-1089-review-loops; meridian-pr-58-review-loop-exit; reported]
- ADR practice: about one to two pages, numbers never reused, superseded records kept; append-only with status, "pithy"; an unrecorded decision invites repeated debate; MADR's minimal form has three to five elements. None sets a cap on active records. [nygard-documenting-architecture-decisions; azure-waf-architecture-decision-record; zimmermann-madr-primer; reported]
- Interrupting at random moments costs up to 30 percent longer to resume and up to twice the errors compared with subtask boundaries (earlier work, desktop tasks). [iqbal-bailey-interruption-boundaries; measured]

## Disputes
- Self-Refine (gains) against Huang (losses): both fit one pattern. Gains need specific feedback or an outside signal; Self-Refine compares with one pass, and Huang's equal-cost baselines remove part of the gain.
- Debate: gains in the original method are not found against voting at equal compute. Heterogeneous models are the supported fix.
- Round limits (8, 10, 4, 6) are choices. Only one study measures returns per round, on one benchmark.
- The loop reports are anecdote, not measurement.

## What this says about the agentik claims
- (a) Partly supported. Loops without a cap do not end [reported; documented]. Re-litigating settled decisions, and a named consumer as the cure, are not in the sources.
- (b) Partly supported. Outside critics beat self-critique [measured], but no study compares a report-only agent with self-review, and a find-gaps reviewer reports gaps anyway [documented]. Report-only ended one loop [reported].
- (c) Not in the sources. Boundary timing is cheaper [measured]; batching against asking as questions arise was never compared.
- (d) Not in the sources. Compact entries and supersession match ADR practice [reported]; the cap of 25 and the claim over ADR files have no source.
- (e) Supported. External checks beat self-judgement [measured]. `unrun, never red` is not in the sources.

## Candidate practices
- Put sign-off in a check that runs outside the reviewer and cap the rounds. [huang-self-correct; code-docs-hooks-reference; measured, documented]
- Block only on correctness; list nits once; demand a `file:line` or reproduction. [code-docs-code-review; meridian-pr-58-review-loop-exit; documented, reported]
- Review in a fresh context with a different model if you can. [code-docs-best-practices; zhang-stop-overvaluing-mad; documented, measured]
- Supersede, do not edit, decision entries. [azure-waf-architecture-decision-record; reported]

## Sources
