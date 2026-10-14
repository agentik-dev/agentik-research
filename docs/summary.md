# Summary

Long Claude Code work fails from context length, compaction that loses specifics, fan-out on work that does not split, review loops with no outside signal, and unattended runs that report unearned success. Measured evidence settles the direction on the first, third and fourth; for false success, one benchmark gives one measured rate.[^advani] The vendor's documentation, dated October 2026, and practitioners' reports cover the rest. The six agentik tools answer each failure with a mechanism. Their own record shows where each mechanism is untested. This page gives you the three parts in two pages.

## The problem

You hand Claude Code a task that takes hours, or a queue that runs overnight. The session fills its context, forgets specifics, spends past its budget, or reports success it did not earn, and nobody is watching when it does. Each failure has a fix, and no single fix covers the others.

## A human example: slices of Swiss cheese

James Reason pictured an organisation's defences against error as layers, each with holes: "In reality, however, they are more like slices of Swiss cheese, having many holes".[^reason] Harm gets through only when holes in many layers line up. His remedy was more effective defences, and draining the swamps where errors breed: the latent conditions built in by design, which can be found and fixed before an adverse event.[^reason] The practices on this site are layers in that sense: a fresh context, a cap, an outside check, a plain report. Each has holes, and the pages say where.

## Part 1: the field, in ten lines

1. **Length.** Accuracy can fall as the context grows, even with perfect retrieval. Instruction-following falls as the instruction count grows. Most of a coding agent's context is tool output you can drop at little cost.[^du][^ifscale][^masking]
2. **Compaction or restart.** Compaction keeps re-injected files and a summary, and summarises early instructions.[^ctxwindow] On three vendors' compressors, not Claude Code's, the artifact trail scored lowest.[^factory] One cookbook run on the API lost 3 of 3 obscure values.[^cookbook] No study compares compaction with a restart from a handoff. Anthropic's harness work carried state in files and git.[^harnesses]
3. **Memory.** A context file costs about 20 percent more and did not raise success. File length did not change compliance with one rule. A hook can block where a CLAUDE.md line can only advise.[^gloaguen][^mcmillan][^hooks]
4. **Budgets.** Cost scales with turns times context while the cache is warm; the chapter states this as a conjecture. By default, the one-hour cache applies only on a subscription within plan usage. The money cap can overshoot by one response, plus anything that subagents still running spend before they stop.[^caching][^agentloop]
5. **Many agents.** Fan-out changes performance by up to +80.8 percent on decomposable work and by -39 to -70 percent on one sequential-planning benchmark, at matched token budgets.[^kim] Vendor guidance expects 3 to 10 times the tokens.[^multiagentblog]
6. **Unattended runs.** An unanswered permission prompt is denied, the model is told, and the run continues. With `stream-json` the denials appear as `permission_denied` messages, and the result lists them in `permission_denials`. Agents never notice their first error in 38.5 percent of cases. No main-session watchdog is documented.[^headless][^hiddenfailures]
7. **Guardrails.** Deny rules match command text and miss alternate spellings. A PreToolUse hook fails open on a timeout unless told to block.[^hooks] The sandbox covers shell commands only, not file tools or hooks. On vendor data, the auto-mode classifier misses 17 percent of overeager actions.[^permissions][^sandbox][^automode]
8. **Review.** Self-correction without an outside signal can make answers worse.[^huang] In one coding study, a model that reviewed and revised its own patches resolved 34.8, 40.6, 43.0, 43.4 and 44.0 percent of issues over five samples.[^wang] Three public loops did not end on their own, and a fourth spent extra rounds on nits.[^fullsend][^aiwatch][^agentinfra][^meridian] Architecture decision record (ADR) practice supersedes records and sets no cap.[^nygard]
9. **Telling people.** Put the outcome first and keep errors whole.[^army][^outputstyles] Readability formulas are weak gates.[^zheng] One benchmark found that 75.8 percent of failed runs with an explicit status claim claimed success.[^advani]
10. **Cost lanes.** A key replaces the login, and the plan's limits stop.[^gateway] It also turns off Remote Control.[^gatewayconnect] Several routers did not reliably beat the best single model.[^routerbench] Sweep effort on your current model before you add a second.[^costintel]

## Part 2: the tools, in six lines

- **agentik-session**: a meter on the transcript, a charter at 80 percent, a restart from the charter, automatic compaction blocked.[^sessionreadme] Its premise has support in direction but no measured strength. Its window table is deliberately cautious, by its own comment. Until 2026-10-14 its record gave Claude Code's default hook timeout as 60 seconds, an unconditional one-hour cache and a 0.1 cache read rate. On 2026-10-14, commit `2aa18b3` corrected the record to Claude Code's 600-second default; its message says no constant derives from the old figure. Commit `b40baa8` gave the cache's conditions and the 0.05 and 0.025 read rates.[^sessionhead] The fixes change the record, not the evidence.
- **agentik-relay**: nights of packets, one worktree and one child per row, a deterministic gate, thirty stop reasons, two money caps, an outside watchdog. Its record covers one owner's nights. It has no sandbox, and no stall is recorded yet.[^relayreadme][^relaydesign][^relaycode]
- **agentik-decisions**: one ledger per repository, capped at 25 and 7, rendered into CLAUDE.md, with batched owner questions. The mechanics are documented, and the benefit is unmeasured.[^decisionsreadme] The caps are the owner's rulings of 2026-09-25, and the design says no outside source gives either number.[^decisionsd17]
- **agentik-respeak**: two lanes, a gate, and a verifier that checks structure; an appended false paragraph passes it. The machine lane and the readability grades are unmeasured.[^respeakreadme] The human-lane tooling has our use: one field test (n=1) and one field run over about 2,000 files.[^respeakreadme][^respeakchangelog]
- **agentik-agents**: three billing lanes, a router by model name, a pooled fan-out. Its local-lane record covers one machine and one model family, and no window hit is recorded.[^agentsreadme]
- **agentik-commons**: the front door and the conventions, after five tools had five naming schemes.[^commonsrecord]

## Part 3: the practice

Twenty-six practices are grouped by question, each with its evidence and the tool that automates it. Measured evidence supports the direction of three: start long work from a short brief in a fresh context; fan out only decomposable work; and put sign-off in a check outside the reviewer. A fourth, checking a "done" claim against a tool result, rests on a measured false-success rate. Thirteen carry measured evidence in all. Of the other thirteen, twelve cite the documentation or a report, and one, metering the session's usage, rests on our use and a conjecture. Five carry a conjecture. See [Practices](practices.md).

## From the journal

The [journal](journal/index.md) tells the owner's record as dated stories, each with what failed:

- [The ledger that ran away](journal/posts/2026-10-10-the-ledger-that-ran-away.md): a decision ledger whose old part held 401 entries by 2026-10-14, and the cap, sign-off bar and levels that followed.[^record]
- [Restart, don't compact](journal/posts/2026-10-05-restart-dont-compact.md): a charter under 4 KB and a fresh session, instead of a summary.
- [A wake that cost a turn](journal/posts/2026-10-10-a-wake-that-cost-a-turn.md): in one count, with no method on record, 581 of 614 self-paced wakeups took a turn of their own.[^s21]
- [The probe that stopped a night](journal/posts/2026-09-30-the-probe-that-stopped-a-night.md): a review agent's hand-built binary stopped a running night.
- [Two lanes](journal/posts/2026-08-31-two-lanes.md): governed shorthand for agents, gated prose for people, and one field test.
- [Living inside a usage window](journal/posts/2026-10-14-living-inside-a-usage-window.md): a band that advises how many helpers fit a five-hour window, and a pause that waits out the limit.

## Method and date

Two Claude Code cloud sessions with helper agents researched and wrote this site on 2026-10-14. The first wrote the field, tool and practice pages; the second added the journal, the story shape and the look. They worked from seven repositories at fixed commits and from the sources listed on the [sources](sources.md) page, and each opened the sources it cites. The [method](method.md) page gives the limits: one owner, a shared owner for the site and the tools, volatile vendor facts, and no measurement of a Claude Code session at length.

## Sources

[^du]: Du et al., "Context Length Alone Hurts LLM Performance Despite Perfect Retrieval", October 2025, <https://arxiv.org/abs/2510.05381>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^masking]: Lindenbauer et al., "The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management", August 2025, <https://arxiv.org/abs/2508.21433>.
[^factory]: Factory Research, "Evaluating Context Compression for AI Agents", 16 December 2025, <https://factory.com/news/evaluating-compression>.
[^cookbook]: Isabella He, Anthropic, "Context engineering: memory, compaction, and tool clearing", 20 March 2026, <https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools>.
[^ctxwindow]: Anthropic, "Explore the context window", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/context-window>.
[^harnesses]: Justin Young, Anthropic, "Effective harnesses for long-running agents", 26 November 2025, <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>.
[^gloaguen]: Gloaguen et al., "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?", February 2026, <https://arxiv.org/abs/2602.11988>.
[^mcmillan]: Damon McMillan, "Instruction Adherence in Coding Agent Configuration Files: A Factorial Study of Four File-Structure Variables", May 2026, <https://arxiv.org/abs/2605.10039>.
[^hooks]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks>.
[^caching]: Anthropic, "How Claude Code uses prompt caching", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/prompt-caching>.
[^agentloop]: Anthropic, "How the agent loop works", Claude Agent SDK documentation read 2026-10-14, <https://code.claude.com/docs/en/agent-sdk/agent-loop>.
[^kim]: Yubin Kim et al., "Towards a Science of Scaling Agent Systems", version 3, 8 April 2026 (first version December 2025), <https://arxiv.org/abs/2512.08296>.
[^multiagentblog]: Cara Phillips, Anthropic, "Building multi-agent systems: When and how to use them", 23 January 2026, <https://www.claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them>.
[^headless]: Anthropic, "Run Claude Code programmatically", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/headless>.
[^hiddenfailures]: Rahman et al., "Locating Hidden Failures Makes Long-Horizon Agents More Reliable", 15 September 2026, <https://arxiv.org/abs/2609.17930>.
[^permissions]: Anthropic, "Configure permissions", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/permissions>.
[^sandbox]: Anthropic, "Configure the sandboxed Bash tool", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/sandboxing>.
[^automode]: Anthropic Engineering, "How we built Claude Code auto mode: a safer way to skip permissions", 25 March 2026, <https://www.anthropic.com/engineering/claude-code-auto-mode>.
[^huang]: Jie Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet", October 2023, <https://arxiv.org/abs/2310.01798>.
[^wang]: Ruoyu Wang et al., "SWE-Review: Closing the Loop on Issue Resolution with Agentic Code Review", July 2026, <https://arxiv.org/abs/2607.06065>.
[^nygard]: Michael Nygard, "Documenting Architecture Decisions", 15 November 2011, <https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions>.
[^fullsend]: Issue reporter, "Review agent should detect non-converging review loops and suppress low-severity new findings", fullsend-ai/agents issue 1294, 15 September 2026, <https://github.com/fullsend-ai/agents/issues/1294>.
[^aiwatch]: Issue reporter, "Review loop keeps adopting agents' suggested rewrites", bentleypark/aiwatch issue 1298, 31 August 2026, <https://github.com/bentleypark/aiwatch/issues/1298>.
[^agentinfra]: Issue reporter, "Review loops never converge when the fix pass adds the text the reviewers read", daniel-ospina/agent-infra issue 1089, 15 September 2026, <https://github.com/daniel-ospina/agent-infra/issues/1089>.
[^meridian]: Pull request author, "Review loop passes on no blocking findings; nits no longer spend fix rounds", meridianlabs-ai/agents pull request 58, 4 September 2026, <https://github.com/meridianlabs-ai/agents/pull/58>.
[^outputstyles]: Anthropic, "Output styles", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/output-styles>.
[^army]: Department of the Army, "Army Regulation 25-50, Preparing and Managing Correspondence", 10 October 2020, <https://www.maine.gov/dvem/policies/documents/AR%2025-50%20(10%20October%202020).pdf>.
[^zheng]: Jiaping Zheng and Hong Yu, "Readability Formulas and User Perceptions of Electronic Health Records Difficulty: A Corpus Study", March 2017, <https://pmc.ncbi.nlm.nih.gov/articles/PMC5355629/>.
[^advani]: Advani, "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents", June 2026, <https://arxiv.org/abs/2606.09863>.
[^gateway]: Anthropic, "Other LLM gateways", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/llm-gateway>.
[^gatewayconnect]: Anthropic, "Connect Claude Code to an LLM gateway", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/llm-gateway-connect>.
[^routerbench]: Li et al., "LLMRouterBench", January 2026, <https://arxiv.org/abs/2601.07206>.
[^costintel]: Anthropic, "Optimizing for cost and intelligence: multi-model strategies", documentation read 2026-10-14, <https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence>.
[^sessionreadme]: agentik-dev/agentik-session, "README.md", commit e8477a7, <https://github.com/agentik-dev/agentik-session/blob/e8477a7/README.md>.
[^sessionhead]: agentik-dev/agentik-session, "design/review-r6.md", "NICE_TO_HAVE.md" and "claude_session/profiles.yaml", with commits 2aa18b3 and b40baa8, commit e8477a7, <https://github.com/agentik-dev/agentik-session/tree/e8477a7>.
[^relayreadme]: agentik-dev/agentik-relay, "README.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/README.md>.
[^relaydesign]: agentik-dev/agentik-relay, "design/relay-r1.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/design/relay-r1.md>.
[^relaycode]: agentik-dev/agentik-relay, "internal/relay/types.go", the stop reasons, commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/internal/relay/types.go>.
[^decisionsreadme]: agentik-dev/agentik-decisions, "README.md", commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/README.md>.
[^decisionsd17]: agentik-dev/agentik-decisions, "design/d17-four-verbs.md", with commit ba78699, commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/design/d17-four-verbs.md>.
[^respeakreadme]: agentik-dev/agentik-respeak, "README.md", commit c83e9b8, <https://github.com/agentik-dev/agentik-respeak/blob/c83e9b8/README.md>.
[^respeakchangelog]: agentik-dev/agentik-respeak, "CHANGELOG.md", commit c83e9b8, <https://github.com/agentik-dev/agentik-respeak/blob/c83e9b8/CHANGELOG.md>.
[^agentsreadme]: agentik-dev/agentik-agents, "README.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/README.md>.
[^commonsrecord]: agentik-dev/agentik-commons, "design/agentik-r1.md", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/design/agentik-r1.md>.
[^record]: agentik-dev/agentik-research, "history/sessions/PROMPT-2026-10-14-cloud-site.md", section "The owner's record", commit 25e72df, <https://github.com/agentik-dev/agentik-research/blob/25e72df/history/sessions/PROMPT-2026-10-14-cloud-site.md>.
[^s21]: agentik-dev/agentik-session, "design/packets/s21-priority-default.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/design/packets/s21-priority-default.md>.
[^reason]: James Reason, "Human error: models and management", BMJ 320(7237):768-770, 18 March 2000, <https://pmc.ncbi.nlm.nih.gov/articles/PMC1117770/>.
