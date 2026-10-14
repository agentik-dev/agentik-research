# Practices

Twenty-six practices for long-running and multi-agent Claude Code work, grouped by the research question each answers. Each gives what to do, why, the evidence level with its sources, and the agentik tool that automates it, if one does. Four have measured backing that settles the direction: a fresh context from a short brief,[^laban] fan-out only for decomposable work,[^kim] sign-off outside the reviewer,[^huang] and checking a "done" claim against a tool result.[^advani] The rest rest on the vendor's documentation, dated October 2026, or on reports. Where a practice is the owner's rule with no outside evidence, the table says conjecture.

## Length (question 1)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Clear context between unrelated tasks, and start a long task from a short written brief.** | One consolidated message recovered 95.1 percent of a single-turn score that multi-turn use had lost 39 percent of; Claude Code's own advice is a clean session over accumulated corrections | Measured;[^laban] documented[^bestpractices] | [agentik-session](tools/session.md): the charter and the respawn |
| **Keep always-loaded instructions short, and load rare ones on demand.** | Adherence falls as the number of instructions grows: Claude Sonnet 4 scored 94.4 percent at 100 instructions and 42.9 at 500; the documentation says under 200 lines | Measured;[^ifscale] documented[^memory] | [agentik-decisions](tools/decisions.md): the generated block; [agentik-respeak](tools/respeak.md): the include file |
| **Mask or clear old tool output, and send large reads to subagents.** | Tool output was about 84 percent of a coding agent's turn tokens, and masking it halved cost with no loss in solve rate in most setups | Measured;[^masking] documented[^bestpractices] | None; Claude Code's subagents |

## Compaction or restart (question 2)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Write the handoff to a file before the window fills: the goal, the decisions, the ruled-out approaches, the next step.** | Compaction keeps the gist and loses the specifics; Anthropic's own harness work carried state in a progress file and git, and a Claude Code engineer advises a clear with a written brief | Reported[^harnesses][^sessionmgmt] | [agentik-session](tools/session.md): the charter |
| **Keep exact values and file lists in files, not in summaries.** | One compaction run kept 3 of 3 high-level facts and lost 3 of 3 obscure values; the artifact trail scored lowest for every compressor tested | Measured[^cookbook][^factory] | [agentik-decisions](tools/decisions.md): the ledger; [agentik-relay](tools/relay.md): the ledger line per sitting |
| **Decide the compaction policy per sitting, and set `idleCompaction` to match.** | Idle compaction is on by default and runs after about 54 idle minutes above 200,000 tokens | Documented[^settings] | [agentik-session](tools/session.md): the PreCompact hook |

## Memory (question 3)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Put a rule that must hold on every turn in a hook, and set `onFailure` to block where failing open is unsafe.** | CLAUDE.md is advisory; a file lifted compliance with one rule from 0 to about two thirds and no further; a timed-out hook fails open unless told to block | Measured;[^mcmillan] documented[^hooks] | [agentik-relay](tools/relay.md): the guards; [agentik-session](tools/session.md): the hooks |
| **Keep a short index, and say when to read each pointer.** | A skill was never invoked in 56 percent of cases until the prompt said to use it; an always-loaded index passed every case | Reported;[^vercel] documented[^skills] | [agentik-decisions](tools/decisions.md): the generated block |

## Budgets and pacing (question 4)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Set `--max-turns` and `--max-budget-usd` on every unattended run, with headroom for the overshoot.** | Both default to no limit; the budget is checked after each response and can pass the cap by one response plus running subagents | Documented[^cli][^agentloop] | [agentik-relay](tools/relay.md): per-row and per-night caps; [agentik-agents](tools/agents.md): the pooled fan-out |
| **Keep a self-paced wait under the cache lifetime in force, and know which lifetime you have.** | The one-hour cache applies only on a subscription within plan usage; a cold rewrite of 200,000 tokens costs forty times a warm turn on Opus 5.5 | Documented[^scheduled][^caching][^pricing] | [agentik-session](tools/session.md): an idle-wake cap is proposed, not built |
| **Meter the session's own usage, and stop with a reserve left to hand off.** | A session that runs to its limit cannot write its handoff; the 80 percent checkpoint is the owner's rule | Our use; conjecture[^sessionreadme] | [agentik-session](tools/session.md): the meter |

## Many agents (question 5)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Fan out only decomposable work; keep sequential work in one agent.** | With matched token budgets, multi-agent designs gained up to 80.8 percent on decomposable work and lost 39 to 70 percent on sequential planning | Measured[^kim] | [agentik-relay](tools/relay.md): independent queue rows; [agentik-agents](tools/agents.md): the fan-out |
| **One worktree and one file set per parallel writer.** | Worktrees share refs but not the index; two isolation leaks are on record where parallel agents shared state | Documented;[^worktrees] reported[^issue84685] | [agentik-relay](tools/relay.md): one worktree per row |
| **Give a fresh-context reviewer concrete criteria and a report-only role.** | Verifiers declare early victory without criteria; a reviewer asked to find gaps reports gaps | Documented[^multiagentblog][^bestpractices] | [agentik-relay](tools/relay.md): the adversary agent |

## Unattended runs (question 6)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Treat `success` as unproven: read `permission_denials` and `terminal_reason`, and gate outside the model.** | In print mode an unanswered prompt is denied and the run continues; the denials appear only in the result | Documented[^sdkresult][^headless] | [agentik-relay](tools/relay.md): the gate; [agentik-session](tools/session.md): the partial classification |
| **Watch progress from outside (HEAD, file times, CPU), and kill a stall.** | Agents never noticed their first error in 38.5 percent of cases; no main-session progress watchdog is documented | Measured for the failure;[^hiddenfailures] conjecture for the guard | [agentik-relay](tools/relay.md): the watchdog |
| **Run the test gate once per row, under a lock and a load check.** | 46.5 percent of flaky tests were resource-affected, with CPU starvation worst; the relay's own check went red under load | Measured;[^flaky] our use[^relaynth] | [agentik-commons](tools/index.md): the `bounded` wrapper |

## Guardrails (question 7)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Deny in PreToolUse hooks and deny rules, test each guard with the absolute-path, `sh -c` and `git -C` spellings, and add the sandbox for Bash.** | Deny rules match command text and miss those spellings; the documentation says a rule is not a security boundary; a hook deny holds even in bypass mode | Documented[^permissions][^hooksguide] | [agentik-relay](tools/relay.md): the guards through a real shell parser |
| **Remove tools from unattended children instead of detecting misuse.** | A tool filter cut attack success from 57.69 to 6.84 percent in a simulator; `--allowedTools` restricts nothing, `--tools` does | Measured;[^agentdojo] our use[^agentsreadme] | [agentik-agents](tools/agents.md): the read-only profiles |

## Review that ends (question 8)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Put sign-off in a check outside the reviewer, cap the rounds, and block only on correctness.** | Self-correction with no outside signal lowered accuracy from 95.5 to 89.0 percent; returns per round fell to +0.4 by round four; Claude Code caps a Stop-hook loop at 8 | Measured;[^huang][^wang] documented[^hooks][^codereview] | [agentik-relay](tools/relay.md): the gate; [agentik-commons](tools/index.md): the check |
| **Supersede decision entries; never edit them; keep them in one capped place.** | ADR practice keeps superseded records and never reuses a number; the cap is the owner's | Reported;[^azure][^nygard] conjecture for the cap | [agentik-decisions](tools/decisions.md) |
| **Ask the owner at a task boundary, in one batch.** | Interruptions at boundaries cost up to 30 percent less time to resume than random ones; batching itself was never compared | Measured for the boundary;[^iqbal] conjecture for the batch | [agentik-decisions](tools/decisions.md): `ask` |

## Telling people what happened (question 9)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Open each report with the outcome in one sentence, and keep errors and failing output whole.** | The military and federal writing standards put the bottom line first; Claude Code's Concise style keeps errors whole | Documented[^army][^outputstyles] | [agentik-respeak](tools/respeak.md): the bluf mode |
| **Check a "done" claim against a tool result before a person reads it.** | Among failed coding-agent runs that made a status claim, 75.8 percent claimed success | Measured[^advani] | [agentik-relay](tools/relay.md): the gate reads the result, not the claim |

## Cost lanes (question 10)

| Practice | Why | Evidence | Tool |
|---|---|---|---|
| **Pick the credential per run, and know what each lane turns off.** | A key or gateway credential replaces the login and its plan limits; Remote Control is off under a non-Anthropic base URL | Documented[^auth][^gatewayconnect] | [agentik-agents](tools/agents.md): the three lanes |
| **Sweep effort before switching models or adding a router.** | Anthropic's internal evaluations found effort the cheaper lever; several routers lose to the best single model | Measured, vendor-run[^costintel][^routerbench] | [agentik-agents](tools/agents.md): the router clamps effort on local routes |

## Sources

[^laban]: Philippe Laban et al., "LLMs Get Lost In Multi-Turn Conversation", May 2025, <https://arxiv.org/abs/2505.06120>.
[^kim]: Yubin Kim et al., "Towards a Science of Scaling Agent Systems", version 3, 8 April 2026 (first version December 2025), <https://arxiv.org/abs/2512.08296>.
[^huang]: Jie Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet", October 2023, <https://arxiv.org/abs/2310.01798>.
[^advani]: Advani, "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents", June 2026, <https://arxiv.org/abs/2606.09863>.
[^bestpractices]: Anthropic, "Best practices for Claude Code", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/best-practices>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^memory]: Anthropic, "How Claude remembers your project", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/memory>.
[^masking]: Lindenbauer et al., "The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management", August 2025, <https://arxiv.org/abs/2508.21433>.
[^harnesses]: Justin Young, Anthropic, "Effective harnesses for long-running agents", 26 November 2025, <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>.
[^sessionmgmt]: Thariq Shihipar, Anthropic, "Using Claude Code: session management and 1M context", 15 April 2026, <https://claude.com/blog/using-claude-code-session-management-and-1m-context>.
[^cookbook]: Isabella He, Anthropic, "Context engineering: memory, compaction, and tool clearing", 20 March 2026, <https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools>.
[^factory]: Factory Research, "Evaluating Context Compression for AI Agents", 16 December 2025, <https://factory.com/news/evaluating-compression>.
[^settings]: Anthropic, "Settings reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/settings-reference>.
[^mcmillan]: Damon McMillan, "Instruction Adherence in Coding Agent Configuration Files: A Factorial Study of Four File-Structure Variables", May 2026, <https://arxiv.org/abs/2605.10039>.
[^hooks]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks>.
[^vercel]: Jude Gao, Vercel, "AGENTS.md outperforms skills in our agent evals", 27 January 2026, <https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals>.
[^skills]: Anthropic, "Extend Claude with skills", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/skills>.
[^cli]: Anthropic, "CLI reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/cli-reference>.
[^agentloop]: Anthropic, "How the agent loop works", Claude Agent SDK documentation read 2026-10-14, <https://code.claude.com/docs/en/agent-sdk/agent-loop>.
[^scheduled]: Anthropic, "Run prompts on a schedule", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/scheduled-tasks>.
[^caching]: Anthropic, "How Claude Code uses prompt caching", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/prompt-caching>.
[^pricing]: Anthropic, "Pricing", documentation read 2026-10-14, <https://platform.claude.com/docs/en/about-claude/pricing>.
[^sessionreadme]: agentik-dev/agentik-session, "README.md", commit e7f0723, <https://github.com/agentik-dev/agentik-session/blob/e7f0723/README.md>.
[^worktrees]: Anthropic, "Run parallel sessions with worktrees", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/worktrees>.
[^issue84685]: Issue reporter, "EnterWorktree/isolation state is session-global", anthropics/claude-code issue 84685, 7 August 2026, <https://github.com/anthropics/claude-code/issues/84685>.
[^multiagentblog]: Cara Phillips, Anthropic, "Building multi-agent systems: When and how to use them", 23 January 2026, <https://www.claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them>.
[^sdkresult]: Anthropic, "TypeScript SDK reference", Claude Agent SDK documentation read 2026-10-14, <https://code.claude.com/docs/en/agent-sdk/typescript>.
[^headless]: Anthropic, "Run Claude Code programmatically", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/headless>.
[^hiddenfailures]: Rahman et al., "Locating Hidden Failures Makes Long-Horizon Agents More Reliable", 15 September 2026, <https://arxiv.org/abs/2609.17930>.
[^flaky]: Silva et al., "The Effects of Computational Resources on Flaky Tests", 18 October 2023, <https://arxiv.org/abs/2310.12132>.
[^relaynth]: agentik-dev/agentik-relay, "NICE_TO_HAVE.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/NICE_TO_HAVE.md>.
[^permissions]: Anthropic, "Configure permissions", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/permissions>.
[^hooksguide]: Anthropic, "Automate actions with hooks", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks-guide>.
[^agentdojo]: Edoardo Debenedetti et al., "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents", 19 June 2024, <https://arxiv.org/abs/2406.13352>.
[^agentsreadme]: agentik-dev/agentik-agents, "README.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/README.md>.
[^wang]: Ruoyu Wang et al., "SWE-Review: Closing the Loop on Issue Resolution with Agentic Code Review", July 2026, <https://arxiv.org/abs/2607.06065>.
[^codereview]: Anthropic, "Code Review", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/code-review>.
[^azure]: Microsoft, "Maintain an architecture decision record (ADR)", Azure Well-Architected Framework, 10 April 2026, <https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record>.
[^nygard]: Michael Nygard, "Documenting Architecture Decisions", 15 November 2011, <https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions>.
[^iqbal]: Shamsi T. Iqbal and Brian P. Bailey, "Leveraging Characteristics of Task Structure to Predict the Cost of Interruption", CHI 2006, <https://www.interruptions.net/literature/Iqbal-CHI06-p741-iqbal.pdf>.
[^army]: Department of the Army, "Army Regulation 25-50, Preparing and Managing Correspondence", 10 October 2020, <https://www.maine.gov/dvem/policies/documents/AR%2025-50%20(10%20October%202020).pdf>.
[^outputstyles]: Anthropic, "Output styles", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/output-styles>.
[^auth]: Anthropic, "Authentication", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/authentication>.
[^gatewayconnect]: Anthropic, "Connect Claude Code to an LLM gateway", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/llm-gateway-connect>.
[^costintel]: Anthropic, "Optimizing for cost and intelligence: multi-model strategies", documentation read 2026-10-14, <https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence>.
[^routerbench]: Li et al., "LLMRouterBench", January 2026, <https://arxiv.org/abs/2601.07206>.
