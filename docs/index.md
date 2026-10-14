---
title: Home
template: home.html
hide: [navigation, toc]
description: What goes wrong when Claude Code runs for hours, for days or unattended, what the evidence says helps, and the agentik tools.
---

<div class="ak-hero" markdown>

<p class="ak-eyebrow"><img src="assets/images/agentik.svg" alt=""> Research notes from agentik-dev</p>

# Long-running Claude Code

<p class="ak-lede">What goes wrong when a Claude Code session runs for hours, for days or with nobody watching, what the published evidence says helps, and the small tools one owner built in answer. It is written for engineers who use Claude Code and want that evidence, with its limits, before they change how they work.</p>

<p class="ak-actions" markdown>[The five findings](#five-findings-that-matter-most){ .md-button .md-button--primary } [The two-page summary](summary.md){ .md-button }</p>

</div>

<div class="ak-doors" markdown>

<div class="ak-door" markdown>
<p class="ak-door-kicker">Part 1 · seven chapters</p>

## [The field](field/index.md)

What goes wrong in long sessions and unattended runs, and what studies, vendor documentation and practitioners say helps.

<p class="ak-door-go">Read the field →</p>
</div>

<div class="ak-door" markdown>
<p class="ak-door-kicker">Part 2 · five tools and a front door</p>

## [The tools](tools/index.md)

Why each agentik tool exists: the problem, the design, the alternatives it rejected, and what is still unproven.

<p class="ak-door-go">Meet the tools →</p>
</div>

<div class="ak-door" markdown>
<p class="ak-door-kicker">Dated entries</p>

## [The journal](journal/index.md)

What we tried, what worked, what did not, and what changed because of it. The site evolves here.

<p class="ak-door-go">Read the journal →</p>
</div>

</div>

## Five findings that matter most

Long Claude Code sessions fail in ways that studies have measured, mostly on benchmarks. No independent study found measures a Claude 5.x model at length, and none measures a Claude Code session decaying as it fills. These five findings carry the most weight, each with its number, its source and what to do about it. Vendor documentation is cited as read on 2026-10-14, and each vendor post with its own date. The agentik tools are early and built for their author's own daily use,[^profile] and no source found measures them against the alternatives; the [method](method.md) page gives the limits.

<div class="ak-findings" markdown>

1. **Length alone lowers accuracy, even when the fact the model needs is in the window, and so does the number of instructions.** Reasoning accuracy fell from 0.92 to 0.68 when inputs were padded to 3,000 tokens, and Claude 3.5 Sonnet fell from 87.5 to 29.8 percent at 32K tokens on low-overlap retrieval.[^levy][^modarressi] Given 500 simultaneous instructions, Claude Opus 4 followed 44.6 percent.[^ifscale] Anthropic's documentation names the effect: context rot.[^ctxdoc] So start long work from a short written brief in a fresh context, and keep the always-loaded instructions short. See [Length and compaction](field/length-and-compaction.md).
2. **Compaction keeps the gist and loses the specifics, and nothing shows a restart does better.** The artifact trail, which files were touched and how, scored lowest for every compressor tested, 2.19 to 2.45 of 5; one compaction kept 3 of 3 high-level facts and lost 3 of 3 obscure values.[^factory][^cookbook] Anthropic's harness post of November 2025 says compaction alone is not sufficient, and starts each new session from the git log and a progress file in which the agent summarizes its work.[^harnesses] No source found holds a controlled comparison of a restart from a written handoff with compaction in a coding session. The nearest evidence is Anthropic's report of March 2026 that resets were needed on one model and dropped on the next.[^harnessdesign] So write the handoff to a file before the window fills, and keep exact values in files.
3. **Many agents help decomposable work and hurt sequential work.** With matched token budgets, multi-agent designs gained up to 80.8 percent on decomposable tasks and lost 39 to 70 percent on sequential planning.[^kim] Anthropic's guidance of January 2026 is to expect 3 to 10 times the tokens.[^multiagentblog] So fan out decomposable work, keep sequential work in one agent, and give each parallel writer its own worktree. See [Many agents](field/many-agents.md).
4. **Review needs an outside signal and a cap.** A model correcting its own reasoning with no outside signal fell from 95.5 to 89.0 percent over two rounds; review rounds on one small model returned +5.8, +2.4, +0.4 and +0.6 points; Claude Code overrides a Stop hook after eight consecutive blocks with no tool call between them, a default that `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` raises.[^huang][^wang][^hooks] So put sign-off in a check the reviewer does not control, and cap the rounds. See [Review that ends](field/review.md).
5. **An unattended run's success is unproven until you read the denials, cap the money and the turns, and watch from outside.** In print mode, an unanswered permission prompt is denied and the run continues;[^headless] the budget cap can overshoot by a response;[^agentloop] Claude Code's stream watchdogs abort a stalled API response, and this site found no documented main-session progress watchdog;[^network] and one benchmark found that 75.8 percent of failed runs with an explicit status claim claimed success.[^advani] See [Unattended runs and guardrails](field/unattended-and-guardrails.md) and [Telling people what happened](field/telling-people.md).

</div>

## From the journal

<!-- journal: newest -->

## The tools, in one line each

- [agentik-session](tools/session.md) meters a session, has it write a charter at 80 percent, and restarts the next sitting from the charter instead of compacting.
- [agentik-relay](tools/relay.md) runs a night of queued packets headless, one worktree and one child per row, with a deterministic gate, thirty stop reasons and two money caps.
- [agentik-decisions](tools/decisions.md) keeps one capped decision ledger per repository and renders a small block of it into CLAUDE.md.
- [agentik-respeak](tools/respeak.md) splits agent shorthand from the prose a person reads, and gates the prose.
- [agentik-agents](tools/agents.md) routes delegated work to the API, the subscription or a local model.
- [agentik-commons](tools/index.md) is the front door and the conventions.

This site does not claim that any tool is proven. The tools' evidence is one owner's record, read at fixed commits and labelled "our use" throughout. This site's first review found numbers two repositories stated wrongly or without their conditions: in agentik-session the default hook timeout, the cache read rate and the terms of the one-hour cache, and in agentik-agents Sonnet 5.5's cache read rate. On 2026-10-14 both repositories corrected them, in merges `86ac60a` and `f986500`; neither merge records a new run of a tool.[^sessionhead][^agentshead] One price stays on purpose: agentik-agents keeps Sonnet 5 at the 3 and 15 dollars per million tokens the account was billed, not the 2 and 10 the pricing page lists.[^agentshead]

## Where to start

- If you run Claude Code, read the [practices](practices.md), then the chapter behind any practice you doubt.
- If you want to see the practices fail and change, read the [journal](journal/index.md).
- If you are evaluating the tools, read [the tools](tools/index.md), then each page's "What the research teaches" and "What has not worked, and what is open" sections.
- If you are checking the evidence, read [the field](field/index.md), the [method](method.md) and its limits, and the [sources](sources.md).

## Sources

[^profile]: agentik-dev, ".github/profile/README.md", commit 8a0a188, <https://github.com/agentik-dev/.github/blob/8a0a188/profile/README.md>.
[^sessionhead]: agentik-dev/agentik-session, "design/review-r6.md", "NICE_TO_HAVE.md" and the merge rf1-research-fixes (86ac60a), commit e8477a7, read 2026-10-14, <https://github.com/agentik-dev/agentik-session/blob/e8477a7/NICE_TO_HAVE.md>.
[^agentshead]: agentik-dev/agentik-agents, "bin/", the cost tool's price table, and the merge rf1-research-fixes, commit f986500, read 2026-10-14, <https://github.com/agentik-dev/agentik-agents/tree/f986500/bin>.
[^levy]: Mosh Levy, Alon Jacoby and Yoav Goldberg, "Same Task, More Tokens: the Impact of Input Length on the Reasoning Performance of Large Language Models", February 2024, <https://arxiv.org/abs/2402.14848>.
[^modarressi]: Ali Modarressi et al., "NoLiMa: Long-Context Evaluation Beyond Literal Matching", February 2025, <https://arxiv.org/abs/2502.05167>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^ctxdoc]: Anthropic, "Context windows", documentation read 2026-10-14, <https://platform.claude.com/docs/en/build-with-claude/context-windows>.
[^factory]: Factory Research, "Evaluating Context Compression for AI Agents", 16 December 2025, <https://factory.com/news/evaluating-compression>.
[^cookbook]: Isabella He, Anthropic, "Context engineering: memory, compaction, and tool clearing", 20 March 2026, <https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools>.
[^harnesses]: Justin Young, Anthropic, "Effective harnesses for long-running agents", 26 November 2025, <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>.
[^harnessdesign]: Prithvi Rajasekaran, Anthropic, "Harness design for long-running application development", 24 March 2026, <https://www.anthropic.com/engineering/harness-design-long-running-apps>.
[^kim]: Yubin Kim et al., "Towards a Science of Scaling Agent Systems", version 3, 8 April 2026 (first version December 2025), <https://arxiv.org/abs/2512.08296>.
[^multiagentblog]: Cara Phillips, Anthropic, "Building multi-agent systems: When and how to use them", 23 January 2026, <https://www.claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them>.
[^huang]: Jie Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet", October 2023, <https://arxiv.org/abs/2310.01798>.
[^wang]: Ruoyu Wang et al., "SWE-Review: Closing the Loop on Issue Resolution with Agentic Code Review", July 2026, <https://arxiv.org/abs/2607.06065>.
[^hooks]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks>.
[^headless]: Anthropic, "Run Claude Code programmatically", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/headless>.
[^agentloop]: Anthropic, "How the agent loop works", Claude Agent SDK documentation read 2026-10-14, <https://code.claude.com/docs/en/agent-sdk/agent-loop>.
[^network]: Anthropic, "Enterprise network configuration", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/network-config>.
[^advani]: Advani, "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents", June 2026, <https://arxiv.org/abs/2606.09863>.
