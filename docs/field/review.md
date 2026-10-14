# Review that ends

A review loop ends when something outside the reviewer decides. A model asked to correct its own reasoning with no outside signal gets worse. On GSM8K, GPT-4 fell from 95.5 percent to 91.5 after one round and 89.0 after two. A ground-truth gate lifted it to 97.5.[^huang] Returns per review round fall fast: in one coding study, revision rounds one to four added +5.8, +2.4, +0.4 and +0.6 points.[^wang] Claude Code caps a Stop-hook loop at eight continuations.[^hooks]

Decision records are the other half of the answer. An unrecorded decision invites repeated debate, and none of the ADR sources caps how many records stay active.[^nygard][^azure] This chapter answers research question 8: review loops that never converge, sign-off bars, round limits, adversarial review, and decision records.

## What is measured

- Self-correction without an outside signal lowered accuracy: 95.5, 91.5 and 89.0 percent on GSM8K over two rounds for GPT-4. A ground-truth label deciding when to revise lifted it to 97.5. The paper calls a unit-test executor a perfect verifier.[^huang]
- A survey of self-correction finds no prior work showing gains from a prompted model's own feedback, except on suited tasks. What works, it finds, is reliable external feedback.[^kamoi]
- Self-Refine gained about 20 points on average over seven tasks, but 0 to 0.2 points on math. There, the feedback said "everything looks good" for 94 percent of instances. Specific feedback beat generic feedback. Gains per iteration were small after the first in most tasks, and the paper says quality may not always rise with each iteration.[^madaan]
- Debate among copies of one model scored below majority voting: 83.2 and 83.0 percent at 6 and 9 responses, against 85.3 and 88.2.[^huang] Across five methods and nine benchmarks, debate often failed to beat voting or chain-of-thought. Mixing different models helped.[^zhang]
- Model judges are biased. After an order swap, GPT-4 stayed consistent on 65.0 percent of pairs and Claude-v1 on 23.8. A padded answer fooled Claude-v1 and GPT-3.5 in 91.3 percent of cases and GPT-4 in 8.7. GPT-4 matched human experts on 85 percent of non-tie pairs; humans matched each other on 81.[^zheng]
- AI reviewers' suggestions were adopted 16.6 percent of the time and human reviewers' 56.5, across 278,790 review conversations in 300 open-source projects. Of the unadopted AI suggestions, 28.7 percent were incorrect.[^zhong]
- An agentic reviewer beat single-turn review: 52.6 against 44.1 percent for one patch source. Review-revise revision rounds one to four added +5.8, +2.4, +0.4 and +0.6 points.[^wang]
- In earlier studies cited by Iqbal and Bailey, interrupting people at random moments cost more than interrupting at subtask boundaries. Resuming took up to 30 percent longer, with up to twice the errors. Their own 2006 study predicts that cost from the task's structure.[^iqbal]

## What the vendor documents, as of October 2026

- Claude Code overrides a Stop hook's exit 2 after 8 consecutive continuations with no tool call between them.[^hooks]
- Claude Code's Code Review is advisory: its check ends neutral and never blocks. You can set a verification bar, a nit cap and a re-review rule in a `REVIEW.md`. The page's own example warns against reaching round seven on style alone.[^codereview]
- The best-practices page says a reviewer asked to find gaps will usually report some, even when the work is sound. It lists gates from a prompt check to a Stop hook to a refuting subagent.[^bestpractices]

## What is reported

- Anthropic's December 2024 post calls a maximum number of iterations a common stopping condition for an agent loop.[^buildingagents]
- Agents skew positive when grading their own work; a separate evaluator still needed several tuning rounds (March 2026).[^harnessdesign]
- Three public loops did not end on their own, and a fourth spent extra rounds on nits. One pull request drew 11 consecutive change requests (18 findings, 14 of them low). One loop ran 9 rounds, each hitting the last fix. One ran 8 cycles, with findings going from 37 to 45 and peaking at 54. In one, nit-only reviews triggered fixes under a cap of 10. The proposed exits are a severity floor, a report-only reviewer, blocking tags and a visible round count. One report-only reviewer shipped and was checked on the next pull request; the rest are untested.[^fullsend][^aiwatch][^agentinfra][^meridian]
- A 2011 post and Microsoft's framework documentation describe ADR practice. Each record runs one to two pages, numbers are never reused, superseded records are kept, and the log is append-only with a status. An unrecorded decision invites repeated debate. Neither source sets a cap on active records.[^nygard][^azure]

## Where the evidence stops

- Self-Refine's gains and Huang's losses fit one pattern: a gain needs specific feedback or an outside signal. Self-Refine compares with one pass; Huang measures self-correction against one pass too, and uses equal-cost baselines only for debate.[^madaan][^huang]
- The round limits in use are choices: 8 in Claude Code, 10 in one loop report, 4 in Self-Refine. The per-round figures come from three studies, each on its own benchmark; the coding one is Wang's.[^wang][^madaan][^huang] The loop reports are anecdote.

## What this means for the agentik tools

agentik-decisions' first design ties rulings that get re-cut to rulings with no consumer, and makes a named consumer the cure.[^decisionsr1] Its README says to ask the owner once, in one batch, and caps the ledger at 25 entries in force.[^decisionsreadme] The named-consumer rule is in no outside source, though the loops that did not end are on record. No source compares batching with asking as questions arise. The measured result: an interruption at a boundary is cheaper than a random one.[^iqbal] The ledger's compact entries and supersession rule match ADR practice; its cap has no source.[^nygard][^azure]

agentik-relay ships a read-only adversary agent.[^relayadversary] An outside signal beats self-correction. A ground-truth gate lifted accuracy where self-correction lowered it, and the survey finds reliable external feedback is what works.[^huang][^kamoi] No study compares a report-only agent with self-review, and a reviewer asked to find gaps will usually report some gaps.[^bestpractices]

In the relay, a sign-off is a check that must pass, and an unrun gate is never a pass.[^relaydesign] In agentik-commons, a refused check reads unrun, never red.[^commonsguide] Both rules follow the measured finding that an outside signal beats self-correction; the rules themselves are the owner's.[^huang]

## Practices this evidence supports

- Put sign-off in a check outside the reviewer, and cap the rounds. Measured and documented.[^huang][^hooks]
- Block only on correctness; list nits once; demand a file and line. Documented and reported.[^codereview][^meridian]
- Review in a fresh context, with a different model if you can. Documented and measured.[^bestpractices][^zhang]
- Supersede decision entries; do not edit them. Documented and reported.[^azure][^nygard]
- Ask the owner at a task boundary, not mid-task. Measured for people in the studies Iqbal and Bailey cite; conjecture for batching.[^iqbal]

## From the journal

- [The ledger that ran away](../journal/posts/2026-10-10-the-ledger-that-ran-away.md): a decision ledger past 400 entries, and the cap, sign-off bar and levels that followed.

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
[^decisionsr1]: agentik-dev/agentik-decisions, "history/design/decisions-r1.md", section 7, decision 4, commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/history/design/decisions-r1.md>.
[^relayadversary]: agentik-dev/agentik-relay, "plugin/agents/adversary.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/plugin/agents/adversary.md>.
[^commonsguide]: agentik-dev/agentik-commons, "GUIDE.md", section 5, commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/GUIDE.md>.
[^relaydesign]: agentik-dev/agentik-relay, "design/relay-r1.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/design/relay-r1.md>.
