# Field 8: Review that ends

## The question
Review loops that never converge, sign-off bars, round limits, adversarial review, decision records (ADRs and ledgers).

## Findings
- Self-correction with no outside signal lowered accuracy. GPT-4 on GSM8K fell from 95.5 to 91.5 percent after one round and to 89.0 after two. A ground-truth label deciding when to revise lifted it to 97.5. The paper calls a unit-test executor a perfect verifier. [huang-self-correct; measured]
- A survey found no prior work showing gains from a prompted model's own feedback, except on suited tasks; reliable external feedback works. [kamoi-self-correction; measured (survey)]
- Self-Refine gained about 20 points on average over 7 tasks, but 0 to 0.2 points on math, where feedback said "everything looks good" for 94 percent of instances. Specific feedback beat generic. Returns shrank each iteration (4 at most). [madaan-self-refine; measured]
- Debate among copies of one model scored 83.2 and 83.0 percent at 6 and 9 responses, below majority voting at 85.3 and 88.2. Across 5 methods and 9 benchmarks, debate often failed to beat voting or chain-of-thought; mixing different models helped. [huang-self-correct; zhang-stop-overvaluing-mad; measured]
- Judges are biased. After an order swap GPT-4 stayed consistent on 65.0 percent of pairs and Claude-v1 on 23.8. A padded answer fooled Claude-v1 and GPT-3.5 in 91.3 percent of cases and GPT-4 in 8.7. GPT-4 matched human experts on 85 percent of non-tie pairs; humans matched each other on 81. [zheng-llm-judge; measured]
- Over 278,790 review conversations in 300 open-source projects, AI reviewers' suggestions were adopted 16.6 percent of the time, human reviewers' 56.5. Of the unadopted AI suggestions, 28.7 percent were incorrect. [zhong-human-ai-synergy-review; measured]
- An agentic reviewer beat single-turn review (52.6 against 44.1 percent for one patch source). Review-revise rounds 2 to 5 added +5.8, +2.4, +0.4 and +0.6 points. [wang-swe-review; measured]
- Interrupting at random moments cost up to 30 percent longer to resume and up to twice the errors, against subtask boundaries (earlier work, desktop tasks). [iqbal-bailey-interruption-boundaries; measured]
- As of October 2026 Claude Code ends a Stop-hook loop after 8 consecutive continuations. [code-docs-hooks-reference; documented]
- Code Review is advisory: its check ends neutral and never blocks. `REVIEW.md` can set a verification bar, a nit cap and a re-review rule against "round seven on style alone". [code-docs-code-review; documented]
- A reviewer asked to find gaps "will usually report some, even when the work is sound". The page lists gates from a prompt check to a Stop hook to a refuting subagent. [code-docs-best-practices; documented]
- A maximum-iterations stop is common for evaluator-optimizer loops (December 2024). [anthropic-building-effective-agents; documented]
- Agents "reliably skew positive" grading their own work; a separate evaluator still needed several tuning rounds (March 2026). [anthropic-engineering-harness-design; reported]
- Four public loops did not end: 11 consecutive change requests (18 findings, 14 low); 9 rounds each hitting the last fix; 8 cycles with findings going 37 to 45 (peak 54); nit-only reviews triggering fixes under a cap of 10. Proposed exits (severity floor, report-only reviewer, blocking tags, round count shown) are untested. [fullsend-issue-1294-nonconverging-review; aiwatch-issue-1298-review-loop; agent-infra-issue-1089-review-loops; meridian-pr-58-review-loop-exit; reported]
- ADR practice: one to two pages, numbers never reused, superseded records kept, append-only with status, "pithy"; an unrecorded decision invites repeated debate; none sets a cap on active records. [nygard-documenting-architecture-decisions; azure-waf-architecture-decision-record; reported]

## Disputes
- Self-Refine (gains) and Huang (losses) fit one pattern: gains need specific feedback or an outside signal. Self-Refine compares with one pass; Huang uses equal-cost baselines.
- The round limits (8, 10, 4, 6) are choices. One study measures returns per round, on one benchmark. The loop reports are anecdote.

## What this says about the agentik claims
- (a) Partly supported. Uncapped loops do not end [reported; documented]. Re-litigated settled decisions, and a named consumer as the cure, are not in the sources.
- (b) Partly supported. Outside critics beat self-critique [measured]. No study compares a report-only agent with self-review, and a find-gaps reviewer reports gaps anyway [documented].
- (c) Not in the sources. Boundary timing is cheaper [measured]; one batch against questions as they arise was never compared.
- (d) Not in the sources. Compact entries and supersession match ADR practice [reported]; the cap of 25 and the claim over ADR files have no source.
- (e) Supported [measured]: external checks beat self-judgement. `unrun, never red` is not in the sources.

## Candidate practices
- Put sign-off in a check outside the reviewer and cap the rounds. [huang-self-correct; code-docs-hooks-reference; measured, documented]
- Block only on correctness; list nits once; demand a `file:line` or reproduction. [code-docs-code-review; meridian-pr-58-review-loop-exit; documented, reported]
- Review in a fresh context, with a different model if you can. [code-docs-best-practices; zhang-stop-overvaluing-mad; documented, measured]
- Supersede decision entries; do not edit them. [azure-waf-architecture-decision-record; reported]

## Sources
huang-self-correct: Jie Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet", 2023-10, https://arxiv.org/abs/2310.01798
kamoi-self-correction: Ryo Kamoi et al., "When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs", 2024, https://aclanthology.org/2024.tacl-1.78/
madaan-self-refine: Aman Madaan et al., "Self-Refine: Iterative Refinement with Self-Feedback", 2023-03, https://arxiv.org/abs/2303.17651
zhang-stop-overvaluing-mad: Hangfan Zhang et al., "Stop Overvaluing Multi-Agent Debate -- We Must Rethink Evaluation and Embrace Model Heterogeneity", 2025-02, https://arxiv.org/abs/2502.08788
zheng-llm-judge: Lianmin Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", 2023-06, https://arxiv.org/abs/2306.05685
zhong-human-ai-synergy-review: Suzhen Zhong et al., "Human-AI Synergy in Agentic Code Review", 2026-03, https://arxiv.org/abs/2603.15911
wang-swe-review: Ruoyu Wang et al., "SWE-Review: Closing the Loop on Issue Resolution with Agentic Code Review", 2026-07, https://arxiv.org/abs/2607.06065
iqbal-bailey-interruption-boundaries: Shamsi T. Iqbal and Brian P. Bailey, "Leveraging Characteristics of Task Structure to Predict the Cost of Interruption", 2006-04, https://www.interruptions.net/literature/Iqbal-CHI06-p741-iqbal.pdf
code-docs-hooks-reference: Anthropic, "Hooks reference", undated, https://code.claude.com/docs/en/hooks
code-docs-code-review: Anthropic, "Code Review", undated, https://code.claude.com/docs/en/code-review
code-docs-best-practices: Anthropic, "Best practices for Claude Code", undated, https://code.claude.com/docs/en/best-practices
anthropic-building-effective-agents: Anthropic, "Building effective agents", 2024-12-19, https://www.anthropic.com/engineering/building-effective-agents
anthropic-engineering-harness-design: Prithvi Rajasekaran (Anthropic), "Harness design for long-running application development", 2026-03-24, https://www.anthropic.com/engineering/harness-design-long-running-apps
fullsend-issue-1294-nonconverging-review: issue reporter, "Review agent should detect non-converging review loops and suppress low-severity new findings", 2026-09-15, https://github.com/fullsend-ai/agents/issues/1294
aiwatch-issue-1298-review-loop: issue reporter, "Review loop keeps adopting agents' suggested rewrites - remove the artifact instead of policing the judgement", 2026-08-31, https://github.com/bentleypark/aiwatch/issues/1298
agent-infra-issue-1089-review-loops: issue reporter, "review loops never converge when the fix pass adds the text the reviewers read - non-additive repair and a severity-based exit", 2026-09-15, https://github.com/daniel-ospina/agent-infra/issues/1089
meridian-pr-58-review-loop-exit: pull request author, "Review loop passes on no blocking findings; nits no longer spend fix rounds", 2026-09-04, https://github.com/meridianlabs-ai/agents/pull/58
nygard-documenting-architecture-decisions: Michael Nygard, "Documenting Architecture Decisions", 2011-11-15, https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions
azure-waf-architecture-decision-record: Microsoft, "Maintain an architecture decision record (ADR)", 2026-04-10, https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record
