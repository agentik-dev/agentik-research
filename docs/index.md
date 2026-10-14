# Long-running Claude Code

Long Claude Code sessions fail in ways that studies have measured on benchmarks, if not yet on Claude Code itself. This site reports the evidence on sessions that run for hours, for days, or unattended. It explains why five small open-source tools from agentik-dev and their shared front door exist. It sets out twenty-six practices, each with its evidence level. Every page cites its sources, every vendor fact is dated as of October 2026, and every tool's limits are named. The tools are young and used by one owner.[^profile] The sources found include no measurement that they beat the alternatives, and this site does not claim it; the [method](method.md) page gives the limits.

## Five findings that matter most

1. **Length alone lowers accuracy, even when the fact the model needs is in the window, and so does the number of instructions.** Reasoning accuracy fell from 0.92 to 0.68 when inputs were padded to 3,000 tokens, and Claude 3.5 Sonnet fell from 87.5 to 29.8 percent at 32K tokens on low-overlap retrieval.[^levy][^modarressi] Given 500 simultaneous instructions, Claude Opus 4 followed 44.6 percent.[^ifscale] Anthropic's documentation names the effect: context rot.[^ctxdoc] So start long work from a short written brief in a fresh context, and keep the always-loaded instructions short. See [Length and compaction](field/length-and-compaction.md).
2. **Compaction keeps the gist and loses the specifics, and nothing shows a restart does better.** The artifact trail, which files were touched and how, scored lowest for every compressor tested, 2.19 to 2.45 of 5; one compaction kept 3 of 3 high-level facts and lost 3 of 3 obscure values.[^factory][^cookbook] Anthropic's own harness work carried state in files and git, not in the summary.[^harnesses] No source found holds a controlled comparison of a restart from a written handoff with compaction in a coding session. The nearest evidence is Anthropic's report that resets were needed on one model and dropped on the next.[^harnessdesign] So write the handoff to a file before the window fills, and keep exact values in files.
3. **Many agents help decomposable work and hurt sequential work.** With matched token budgets, multi-agent designs gained up to 80.8 percent on decomposable tasks and lost 39 to 70 percent on sequential planning.[^kim] Anthropic's own guidance is to expect 3 to 10 times the tokens.[^multiagentblog] So fan out decomposable work, keep sequential work in one agent, and give each parallel writer its own worktree. See [Many agents](field/many-agents.md).
4. **Review needs an outside signal and a cap.** A model correcting its own reasoning with no outside signal fell from 95.5 to 89.0 percent over two rounds; review rounds on one small model returned +5.8, +2.4, +0.4 and +0.6 points; Claude Code overrides a Stop hook after eight consecutive blocks with no tool call between them.[^huang][^wang][^hooks] So put sign-off in a check the reviewer does not control, and cap the rounds. See [Review that ends](field/review.md).
5. **An unattended run's success is unproven until you read the denials, cap the money and the turns, and watch from outside.** In print mode, an unanswered permission prompt is denied and the run continues; the budget cap can overshoot by a response; no main-session progress watchdog is documented; and one benchmark found that 75.8 percent of failed runs with an explicit status claim claimed success.[^headless][^agentloop][^advani] See [Unattended runs and guardrails](field/unattended-and-guardrails.md) and [Telling people what happened](field/telling-people.md).

## The tools, in one line each

- [agentik-session](tools/session.md) meters a session, has it write a charter at 80 percent, and restarts the next sitting from the charter instead of compacting.
- [agentik-relay](tools/relay.md) runs a night of queued packets headless, one worktree and one child per row, with a deterministic gate, thirty stop reasons and two money caps.
- [agentik-decisions](tools/decisions.md) keeps one capped decision ledger per repository and renders a small block of it into CLAUDE.md.
- [agentik-respeak](tools/respeak.md) splits agent shorthand from the prose a person reads, and gates the prose.
- [agentik-agents](tools/agents.md) routes delegated work to the API, the subscription or a local model.
- [agentik-commons](tools/index.md) is the front door and the conventions.

This site does not claim that any tool is proven. The tools' evidence is one owner's record, read at fixed commits and labelled "our use" throughout. Several numbers the repositories state are wrong as of October 2026, and the tool pages say which.

## Where to start

- If you run Claude Code, read the [practices](practices.md), then the chapter behind any practice you doubt.
- If you are evaluating the tools, read [the tools](tools/index.md), then each page's "what part 1 says" and "what is open" sections.
- If you are checking the evidence, read [the field](field/index.md), the [method](method.md) and its limits, and the [sources](sources.md).

## Sources

[^profile]: agentik-dev, ".github/profile/README.md", commit 6476f3a, <https://github.com/agentik-dev/.github/blob/6476f3a/profile/README.md>.
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
[^advani]: Advani, "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents", June 2026, <https://arxiv.org/abs/2606.09863>.
