# Review that ends

A review loop ends when something outside the reviewer decides. A model asked to correct its own reasoning with no outside signal gets worse: GPT-4 on GSM8K fell from 95.5 percent to 91.5 after one round and 89.0 after two, and a ground-truth gate lifted it to 97.5.[^huang] Returns per review round fall fast, +5.8, +2.4, +0.4 and +0.6 points over rounds two to five in one coding study.[^wang] Claude Code caps a Stop-hook loop at eight continuations.[^hooks] Decision records are the other half of the answer: an unrecorded decision invites repeated debate, and none of the ADR sources caps how many records stay active.[^nygard][^azure] This chapter answers research question 8: review loops that never converge, sign-off bars, round limits, adversarial review, and decision records.

## What is measured

- Self-correction without an outside signal lowered accuracy: 95.5, 91.5 and 89.0 percent on GSM8K over two rounds for GPT-4. A ground-truth label deciding when to revise lifted it to 97.5. The paper calls a unit-test executor a perfect verifier.[^huang]
- A survey of self-correction found no prior work showing gains from a prompted model's own feedback, except on suited tasks; reliable external feedback is what works.[^kamoi]
- Self-Refine gained about 20 points on average over seven tasks but 0 to 0.2 points on math, where the feedback said "everything looks good" for 94 percent of instances. Specific feedback beat generic feedback, and returns shrank each iteration, with four at most.[^madaan]
- Debate among copies of one model scored 83.2 and 83.0 percent at 6 and 9 responses, below majority voting at 85.3 and 88.2.[^huang] Across five methods and nine benchmarks, debate often failed to beat voting or chain-of-thought; mixing different models helped.[^zhang]
- Judges are biased. After an order swap GPT-4 stayed consistent on 65.0 percent of pairs and Claude-v1 on 23.8. A padded answer fooled Claude-v1 and GPT-3.5 in 91.3 percent of cases and GPT-4 in 8.7. GPT-4 matched human experts on 85 percent of non-tie pairs; humans matched each other on 81.[^zheng]
- Over 278,790 review conversations in 300 open-source projects, AI reviewers' suggestions were adopted 16.6 percent of the time and human reviewers' 56.5; of the unadopted AI suggestions, 28.7 percent were incorrect.[^zhong]
- An agentic reviewer beat single-turn review, 52.6 against 44.1 percent for one patch source, and review-revise rounds two to five added +5.8, +2.4, +0.4 and +0.6 points.[^wang]
- Interrupting people at random moments cost up to 30 percent longer to resume and up to twice the errors, against interruptions at subtask boundaries. The study is from 2006 on desktop tasks.[^iqbal]

## What the vendor documents, as of October 2026

- A Stop hook's exit 2 is overridden after 8 consecutive continuations with no tool call between them.[^hooks]
- Claude Code's Code Review is advisory: its check ends neutral and never blocks. A `REVIEW.md` can set a verification bar, a nit cap and a re-review rule, and the page's own example warns against reaching round seven on style alone.[^codereview]
- The best-practices page says a reviewer asked to find gaps will usually report some, even when the work is sound, and lists gates from a prompt check to a Stop hook to a refuting subagent.[^bestpractices]
- A maximum-iterations stop is standard for an evaluator-optimizer loop (December 2024).[^buildingagents]

## What is reported

- Agents skew positive when grading their own work; a separate evaluator still needed several tuning rounds (March 2026).[^harnessdesign]
- Four public loops did not end on their own: 11 consecutive change requests on one pull request (18 findings, 14 of them low); 9 rounds each hitting the last fix; 8 cycles with findings going from 37 to 45 and peaking at 54; nit-only reviews triggering fixes under a cap of 10. The exits proposed (a severity floor, a report-only reviewer, blocking tags, a visible round count) are untested.[^fullsend][^aiwatch][^agentinfra][^meridian]
- ADR practice: one to two pages per record, numbers never reused, superseded records kept, an append-only log with a status; an unrecorded decision invites repeated debate. None of the sources sets a cap on active records.[^nygard][^azure]

## Where the evidence stops

- Self-Refine's gains and Huang's losses fit one pattern: a gain needs specific feedback or an outside signal. Self-Refine compares with one pass; Huang uses equal-cost baselines.
- The round limits in use (8, 10, 4, 6) are choices. One study measures returns per round, on one benchmark.[^wang] The loop reports are anecdote.

## What this means for the agentik tools

agentik-decisions says that a review with no round limit re-litigates settled decisions, that a named consumer prevents it, and that asking the owner once per session in one batch beats asking as questions arise. The loops that did not end are on record, but re-litigation and the named-consumer cure are not in the sources. Batching was never compared with asking as questions arise; the one measured result is that an interruption at a boundary is cheaper than a random one.[^iqbal] Its compact entries and its supersession rule match ADR practice; its cap of 25 entries in force and its claim over ADR files have no source.[^nygard][^azure][^decisionsreadme]

agentik-relay and agentik-respeak run report-only adversary reviewers. Outside critics beat self-critique,[^huang][^kamoi] but no study compares a report-only agent with self-review, and a reviewer asked to find gaps reports gaps anyway.[^bestpractices] The relay's rule that a sign-off is a check that must pass, and agentik-commons' rule that an unrun check is never a pass, follow the measured finding that external checks beat self-judgement; the rules themselves are the owner's.[^huang][^relaydesign]

## Practices this evidence supports

- Put sign-off in a check outside the reviewer, and cap the rounds. Measured and documented.[^huang][^hooks]
- Block only on correctness; list nits once; demand a file and line or a reproduction. Documented and reported.[^codereview][^meridian]
- Review in a fresh context, with a different model if you can. Documented and measured.[^bestpractices][^zhang]
- Supersede decision entries; do not edit them. Reported.[^azure]
- Ask the owner at a boundary, not mid-task. Measured for people, conjecture for batching.[^iqbal]

## Sources

[^huang]: Jie Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet", October 2023, <https://arxiv.org/abs/2310.01798>.
[^wang]: Ruoyu Wang et al., "SWE-Review: Closing the Loop on Issue Resolution with Agentic Code Review", July 2026, <https://arxiv.org/abs/2607.06065>.
[^hooks]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks>.
[^nygard]: Michael Nygard, "Documenting Architecture Decisions", 15 November 2011, <https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions>.
[^azure]: Microsoft, "Maintain an architecture decision record (ADR)", Azure Well-Architected Framework, 10 April 2026, <https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record>.
[^kamoi]: Ryo Kamoi et al., "When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs", Transactions of the ACL, 2024, <https://aclanthology.org/2024.tacl-1.78/>.
[^madaan]: Aman Madaan et al., "Self-Refine: Iterative Refinement with Self-Feedback", March 2023, <https://arxiv.org/abs/2303.17651>.
[^zhang]: Hangfan Zhang et al., "Stop Overvaluing Multi-Agent Debate: We Must Rethink Evaluation and Embrace Model Heterogeneity", February 2025, <https://arxiv.org/abs/2502.08788>.
[^zheng]: Lianmin Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", June 2023, <https://arxiv.org/abs/2306.05685>.
[^zhong]: Suzhen Zhong et al., "Human-AI Synergy in Agentic Code Review", March 2026, <https://arxiv.org/abs/2603.15911>.
[^iqbal]: Shamsi T. Iqbal and Brian P. Bailey, "Leveraging Characteristics of Task Structure to Predict the Cost of Interruption", CHI 2006, <https://www.interruptions.net/literature/Iqbal-CHI06-p741-iqbal.pdf>.
[^codereview]: Anthropic, "Code Review", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/code-review>.
[^bestpractices]: Anthropic, "Best practices for Claude Code", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/best-practices>.
[^buildingagents]: Anthropic, "Building effective agents", 19 December 2024, <https://www.anthropic.com/engineering/building-effective-agents>.
[^harnessdesign]: Prithvi Rajasekaran, Anthropic, "Harness design for long-running application development", 24 March 2026, <https://www.anthropic.com/engineering/harness-design-long-running-apps>.
[^fullsend]: Issue reporter, "Review agent should detect non-converging review loops and suppress low-severity new findings", fullsend-ai/agents issue 1294, 15 September 2026, <https://github.com/fullsend-ai/agents/issues/1294>.
[^aiwatch]: Issue reporter, "Review loop keeps adopting agents' suggested rewrites", bentleypark/aiwatch issue 1298, 31 August 2026, <https://github.com/bentleypark/aiwatch/issues/1298>.
[^agentinfra]: Issue reporter, "Review loops never converge when the fix pass adds the text the reviewers read", daniel-ospina/agent-infra issue 1089, 15 September 2026, <https://github.com/daniel-ospina/agent-infra/issues/1089>.
[^meridian]: Pull request author, "Review loop passes on no blocking findings; nits no longer spend fix rounds", meridianlabs-ai/agents pull request 58, 4 September 2026, <https://github.com/meridianlabs-ai/agents/pull/58>.
[^decisionsreadme]: agentik-dev/agentik-decisions, "README.md", commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/README.md>.
[^relaydesign]: agentik-dev/agentik-relay, "design/relay-r1.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/design/relay-r1.md>.
