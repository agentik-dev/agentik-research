# Summary

Long Claude Code work fails from context length, compaction that loses specifics, fan-out on work that does not split, review loops with no outside signal, and unattended runs that report unearned success. The measured evidence settles the first, third and fourth, and the false-success half of the fifth. The vendor's documentation, dated October 2026, and practitioners' reports cover the rest. The six agentik tools answer each failure with a mechanism. Their own record shows where each mechanism is untested. This page gives you the three parts in two pages.

## Part 1: the field, in ten lines

1. **Length.** Accuracy falls as the context grows, even with perfect retrieval. Instruction-following falls as the instruction count grows. Most of a coding agent's context is tool output you can drop at little cost.[^du][^ifscale][^masking]
2. **Compaction or restart.** Compaction keeps re-injected files and a summary, summarises early instructions, and loses exact values and the artifact trail. No study compares it with a restart from a handoff. Anthropic's harness work carried state in files and git.[^factory][^ctxwindow][^harnesses]
3. **Memory.** A context file costs about 20 percent more and did not raise success. File length did not change compliance with one rule. Hooks hold where prose does not.[^gloaguen][^mcmillan][^hooks]
4. **Budgets.** Cost scales with turns times context while the cache is warm; the chapter states this as a conjecture. By default, the one-hour cache applies only on a subscription within plan usage. The money cap can overshoot by a response.[^caching][^agentloop]
5. **Many agents.** Fan-out changes performance by up to +80.8 percent on decomposable work and by -39 to -70 on sequential work, at matched token budgets.[^kim] Vendor guidance expects 3 to 10 times the tokens.[^multiagentblog]
6. **Unattended runs.** An unanswered permission prompt is denied, the model is told, and the run continues. Only the result lists the denials. Agents never notice their first error in 38.5 percent of cases. No main-session watchdog is documented.[^headless][^hiddenfailures]
7. **Guardrails.** Deny rules match command text and miss alternate spellings. Hooks fail open on a timeout unless told to block. The sandbox covers shell commands only, not file tools or hooks. On vendor data, the auto-mode classifier misses 17 percent of overeager actions.[^permissions][^sandbox][^automode]
8. **Review.** Self-correction without an outside signal makes answers worse. The gain per round falls fast;[^huang][^wang] four public loops did not end on their own.[^fullsend][^aiwatch][^agentinfra][^meridian] Architecture decision record (ADR) practice supersedes records and sets no cap.[^nygard]
9. **Telling people.** Put the outcome first and keep errors whole.[^army][^outputstyles] Readability formulas are weak gates.[^zheng] One benchmark found a false-success rate of 75.8 percent among runs that made a status claim.[^advani]
10. **Cost lanes.** A key replaces the login and its limits, and turns off Remote Control. Routers route on difficulty, and several lose to the best single model. Sweep effort first.[^gatewayconnect][^routerbench][^costintel]

## Part 2: the tools, in six lines

- **agentik-session**: a meter on the transcript, a charter at 80 percent, a restart from the charter, compaction blocked. Its premise has support in direction but no measured strength. Its model-window table is stale or cautious, and three of its vendor numbers are wrong or conditional as of October 2026.[^sessionreadme]
- **agentik-relay**: nights of packets, one worktree and one child per row, a deterministic gate, thirty stop reasons, two money caps, an outside watchdog. Its record covers one owner's nights. It has no sandbox, and no stall is recorded yet.[^relayreadme][^relaydesign][^relaycode]
- **agentik-decisions**: one ledger per repository, capped at 25 and 7, rendered into CLAUDE.md, with batched owner questions. The mechanics are documented. The benefit is unmeasured, and the caps have no source.[^decisionsreadme]
- **agentik-respeak**: two lanes, a gate and a prose-only verifier. The human-lane tooling has field evidence. The machine lane and the readability grades are unmeasured.[^respeakreadme]
- **agentik-agents**: three billing lanes, a router by model name, a pooled fan-out. Its record covers one machine and one model family, and no window hit is recorded.[^agentsreadme]
- **agentik-commons**: the front door and the conventions, after five tools had five naming schemes.[^commonsrecord]

## Part 3: the practice

Twenty-six practices are grouped by question, each with its evidence and the tool that automates it. Three have measured evidence that settles the direction: start long work from a short brief in a fresh context; fan out only decomposable work; and put sign-off in a check outside the reviewer. A fourth, checking a "done" claim against a tool result, rests on a measured false-success rate. Twelve carry measured evidence in all. The rest follow the documentation or a report, and four are marked conjecture. See [Practices](practices.md).

## Method and date

One Claude Code cloud session with helper agents researched and wrote this site on 2026-10-14. It worked from seven repositories at fixed commits and from the sources listed on the [sources](sources.md) page. It opened every one of those sources in the session. The [method](method.md) page gives the limits: one owner, a shared owner for the site and the tools, volatile vendor facts, and no measurement of a Claude Code session at length.

## Sources

[^du]: Du et al., "Context Length Alone Hurts LLM Performance Despite Perfect Retrieval", October 2025, <https://arxiv.org/abs/2510.05381>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^masking]: Lindenbauer et al., "The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management", August 2025, <https://arxiv.org/abs/2508.21433>.
[^factory]: Factory Research, "Evaluating Context Compression for AI Agents", 16 December 2025, <https://factory.com/news/evaluating-compression>.
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
[^gatewayconnect]: Anthropic, "Connect Claude Code to an LLM gateway", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/llm-gateway-connect>.
[^routerbench]: Li et al., "LLMRouterBench", January 2026, <https://arxiv.org/abs/2601.07206>.
[^costintel]: Anthropic, "Optimizing for cost and intelligence: multi-model strategies", documentation read 2026-10-14, <https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence>.
[^sessionreadme]: agentik-dev/agentik-session, "README.md", commit e7f0723, <https://github.com/agentik-dev/agentik-session/blob/e7f0723/README.md>.
[^relayreadme]: agentik-dev/agentik-relay, "README.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/README.md>.
[^relaydesign]: agentik-dev/agentik-relay, "design/relay-r1.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/design/relay-r1.md>.
[^relaycode]: agentik-dev/agentik-relay, "internal/relay/types.go", the stop reasons, commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/internal/relay/types.go>.
[^decisionsreadme]: agentik-dev/agentik-decisions, "README.md", commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/README.md>.
[^respeakreadme]: agentik-dev/agentik-respeak, "README.md", commit 319f060, <https://github.com/agentik-dev/agentik-respeak/blob/319f060/README.md>.
[^agentsreadme]: agentik-dev/agentik-agents, "README.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/README.md>.
[^commonsrecord]: agentik-dev/agentik-commons, "design/agentik-r1.md", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/design/agentik-r1.md>.
