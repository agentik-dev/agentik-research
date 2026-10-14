# Length and compaction

Two results decide how you run a long session. First, the longer the context, the worse the model does, even when the fact it needs is in the window. Studies measure this across models and tasks.[^levy][^du][^modarressi] Second, compaction keeps the gist and drops the specifics. No study shows that a restart from a written handoff does better. Anthropic's own harness work moved state into files and git instead of trusting the summary.[^factory][^cookbook][^harnesses]

This chapter answers research questions 1 and 2: how behaviour changes as context grows, and what compaction, summaries and a restart each keep and lose.

## Question 1: what changes as context grows

### What is measured

| Study | What it measured | Result | Limits |
|---|---|---|---|
| Levy, Jacoby and Goldberg, 2024[^levy] | Reasoning accuracy as padding grows | 0.92 to 0.68 at 3,000 tokens, averaged over five models | 2023 models, no Claude |
| Liu et al., 2023[^liu] | Where the answer sits in the context | Accuracy peaks at the first or last position; mid-context, GPT-3.5-Turbo's accuracy could fall more than 20 points, below its 56.1 percent no-document score in the 20- and 30-document settings | 2023 models |
| Hsieh et al., 2024 (RULER)[^ruler] | Effective length against the claimed length | GPT-4 averaged 96.6 percent at 4K tokens and 81.2 at 128K; its effective length was 64K; almost all of 17 models fell below the threshold before their claimed length | No Claude |
| Modarressi et al., 2025 (NoLiMa)[^modarressi] | Retrieval with little word overlap | 11 of 13 models scored half their base or less at 32K tokens; Claude 3.5 Sonnet fell from 87.5 percent to 77.6 at 4K and 29.8 at 32K | Retrieval task, not coding |
| Du et al., 2025[^du] | Length alone, with perfect retrieval | Accuracy fell 13.9 to 85 percent as input grew, even with blank or masked padding | Benchmark tasks |
| Hong, Troynikov and Huber, 2025 (Chroma)[^chroma] | 18 models, five of them Claude | Prompts of about 113K tokens scored below the same question in about 300 tokens; Claude's gap was the largest and tied to abstention; no notable position effect on a simple task | Vendor research lab; simple tasks |
| Jaroslawicz et al., 2025 (IFScale)[^ifscale] | How many instructions a model follows at once | At 500 instructions the best model scored 68.9 percent; Claude Opus 4 scored 44.6 and Sonnet 4 42.9; omission was the main error | Keyword instructions, not rules |
| Laban et al., 2025[^laban] | Multi-turn against one full message | Multi-turn scored 39 percent lower; one consolidated message recovered 95.1 percent of the single-turn score | No tools; one of six tasks is code |
| Lindenbauer et al., 2025[^masking] | Tool output in a coding agent's context | Tool output was about 84 percent of a turn's tokens; masking old output cut cost 50 percent or more in four of five setups; solve rate moved from -2.0 to +2.8 points in three and fell 4.0 in the fourth | SWE-agent, five configurations |
| Gloaguen et al., 2026[^gloaguen] | Repository context files for coding agents | Resolution changed by -0.5 to -2 points, neither change significant, and cost rose 20 to 23 percent with an agent-generated file | Compares a file with none; does not vary file length |

Length hurts on its own, not only through retrieval failure.[^du] Instruction count hurts too, separately from token count, and the main failure is omission, not contradiction.[^ifscale] Most of an average SWE-agent turn is tool output, and dropping the old output costs little or nothing in solve rate.[^masking]

### What the vendor documents, as of October 2026

Anthropic's documentation names the effect context rot: accuracy and recall degrade as the token count grows.[^ctxdoc] The same page gives the windows. A 1M-token window applies to Fable and Mythos models, Opus 4.6 and later, Sonnet 4.6 and later, and Haiku 5.5. Sonnet 4.5 and older have 200K.[^ctxdoc]

Pricing is the same across the 1M window except for Haiku 5.5. There, prompts over 100,000 tokens cost 0.50 and 2.50 dollars per million input and output tokens, against 0.10 and 0.50. The base prices are 10 and 50 for Fable 5.1, 4 and 20 for Opus 5.5, and 2 and 10 for Sonnet 5.5.[^pricing]

Claude Code defaults Fable, Sonnet 5 and later, Haiku 5.5 and Opus 4.7 and later to the 1M window. Opus 4.6 and Sonnet 4.6 need a `[1m]` suffix. On a native 1M-window model, Claude Code compacts at about 967K tokens.[^modelconfig] Its best-practices page says performance degrades as the window fills, and gives no measurement.[^bestpractices] Its memory page says to keep CLAUDE.md under 200 lines.[^memory]

### What is anecdote, and where sources disagree

- The position effect is disputed by date. The 2023 models showed a U-shape;[^liu] the 2025 models in the Chroma study showed no notable variation across eleven positions on a simple task.[^chroma] Neither tests a current Claude model.
- The newest Claude models in the length studies are Opus 4 and Sonnet 4;[^chroma][^ifscale] the context-file study ran Claude Code with Sonnet 4.5.[^gloaguen] The sources hold no independent measurement of a Claude 5.x model at length. The October 2026 documentation still states context rot.[^ctxdoc]
- A practitioner taxonomy of four failures (poisoning, distraction, confusion, clash) relays other studies. Its observation about one model past 100K tokens is anecdotal by its own wording.[^breunig]
- Nothing in the sources measures degradation inside a Claude Code session as it fills. The studies use benchmarks; the two coding-agent studies measure the cost and solve rate of context choices, not decay over a session.[^masking][^gloaguen]

## Question 2: compaction or restart

### What is measured

Factory used a model judge to score three compressors over 36,611 production messages. Out of 5, its own scored 3.70, Anthropic's 3.44 and OpenAI's 3.35. The artifact trail, meaning which files were touched and how, scored lowest for all three: 2.45, 2.33 and 2.19.[^factory] The study is vendor-run and compares compressors, not Claude Code's own compaction.

Anthropic's cookbook ran one research agent once with compaction at 180K tokens. The summary was about 2,783 tokens. It kept 3 of 3 high-level facts and lost 3 of 3 obscure appendix-table values.[^cookbook]

Two results from question 1 bear on the choice. Putting the information into one fresh instruction recovered most of the multi-turn loss.[^laban] Masking old tool output matched LLM summarisation's solve rate at a similar cost, both about half the raw agent's.[^masking] The first has no tools. The second compares masking with summarisation, not with a restart.

### What the vendor documents, as of October 2026

- Automatic compaction runs at the model's limit. For Sonnet 4.6 and Opus 4.6 without extended context, that is the 200K boundary; for a native 1M-window model, about 967K tokens. The window is settable from 100K to 1M tokens.[^thresholds]
- After compaction, the root CLAUDE.md, memory and the plan return from disk. Up to five recent files are re-read, or only the path if a file is over 5,000 tokens. Invoked skills return, capped at 5,000 tokens each and 25,000 in total. Path-scoped rules and early instructions are summarised away.[^ctxwindow]
- `/compact` with a focus keeps what you name.[^ctxwindow] `/clear` starts an empty conversation, and the old one stays reachable with `/resume`.[^commands]
- Idle compaction is on by default. It runs after about 54 idle minutes above 200,000 tokens, in interactive sessions on the one-hour cache, on version 2.1.290 or later. Setting `autoCompactEnabled` to false also stops it.[^settings]
- A PreCompact hook blocks with exit code 2. Blocking a proactive pass skips it. Blocking a recovery pass surfaces the API error, and the request fails.[^precompact]
- On the API, threshold compaction defaults to 150,000 tokens with a minimum of 50,000.[^apithreshold] Anthropic announced context editing with 84 percent fewer tokens in one 100-turn evaluation. The announcement does not name the benchmark.[^ctxmgmt]

### What practitioners report

- In March 2026 an Anthropic engineer reported on two models. Sonnet 4.5 needed resets with a structured handoff. For Opus 4.5 the resets were dropped, and automatic compaction sufficed.[^harnessdesign]
- In November 2025 another Anthropic post found compaction insufficient on its own. A progress file, a feature list and the git history carried work between sessions.[^harnesses]
- A Claude Code engineer calls the summary lossy and says the model is least capable at the moment it compacts. The engineer advises a clear when a new task starts, from a written brief, and `/compact` mid-task.[^sessionmgmt]
- Two practitioners weigh handoffs against compaction. One compacts when returning the same day and hands off otherwise, near 50 percent of the window. Neither measures.[^kaiser][^khorana]

### What each option keeps and loses

| Option | Keeps | Loses | Evidence |
|---|---|---|---|
| Automatic compaction | The re-injected CLAUDE.md, memory and plan; five files; a summary | Early instructions, exact values, the artifact trail | <span class="ev ev-documented">documented</span>;[^ctxwindow] <span class="ev ev-measured">measured</span> on other compressors[^factory] |
| Manual `/compact` with a focus | The same, plus what the focus names | The same classes; that a focus loses less is conjecture | <span class="ev ev-documented">documented</span>;[^ctxwindow] <span class="ev ev-reported">reported</span>[^sessionmgmt] |
| A summary the agent writes | State, next steps, learnings | Images and documents in range;[^apiondemand] obscure values | <span class="ev ev-documented">documented</span>;[^apithreshold] <span class="ev ev-measured">measured</span> once[^cookbook] |
| A restart from a handoff file | Only what the file and the repository hold; a clean window | The reasoning behind decisions; that it beats compaction is conjecture | <span class="ev ev-reported">reported</span>;[^kaiser] a lab result with no tools[^laban] |

### Where the evidence stops

<div class="ak-limits" markdown>

- No controlled study compares a restart from a written handoff with compaction in a coding session. The lab result has no tools, and the compression scores are vendor-run and compare compressors.
- The effect depends on the model. Resets were needed on Sonnet 4.5 and dropped on Opus 4.5, yet the November post still wanted artifacts on Opus 4.5. Neither post states how many runs it rests on.[^harnessdesign][^harnesses]
- When to compact is anecdote: about 50 percent of the window from one practitioner, against the limit by default.[^kaiser][^thresholds]

</div>

## What this means for the agentik tools

agentik-session rests on the premise that a fresh context per sitting beats a long one, and on an operational reason: a compaction needs the owner's hand.[^packets] The direction has support. A consolidated single message recovered most of the multi-turn loss,[^laban] and Claude Code's own advice prefers a clean session to accumulated corrections.[^bestpractices] The size of the gain is unmeasured, and the same page says to let context accumulate sometimes. The repo records the rule as an owner's ruling, not a finding.[^packets]

agentik-session's profile table lists opus, sonnet and haiku at 200,000 tokens and gives 1M only to fable, mythos and `opus[1m]`.[^profiles] The October 2026 documentation gives 1M to Opus 5.5, Sonnet 5.5 and Haiku 5.5, so the table is stale or cautious.[^ctxdoc][^modelconfig]

agentik-decisions caps its ledger at 25 entries in force and gives no reason for the number.[^d17] Adherence does fall as instruction count grows,[^ifscale] and the docs say longer CLAUDE.md files reduce adherence.[^memory] But no source gives the number 25, and the cap counts entries, not bytes.[^d17]

## Practices this evidence supports

- Clear context between unrelated tasks, and start a long task from a short written brief. <span class="ev ev-documented">documented</span>,[^bestpractices] with a lab result on fresh instructions that has no tools.[^laban]
- Keep always-loaded instructions short, and load rare ones on demand. <span class="ev ev-documented">documented</span>[^memory] and <span class="ev ev-measured">measured</span>.[^ifscale]
- Mask or clear old tool output, and send large reads to subagents. <span class="ev ev-measured">measured</span>[^masking] and <span class="ev ev-documented">documented</span>.[^bestpractices]
- Write the handoff to a file before the window fills: the goal, the decisions, the ruled-out approaches, the next step. <span class="ev ev-reported">reported</span>.[^sessionmgmt][^harnesses]
- Record exact values and file lists in files, not in summaries. <span class="ev ev-measured">measured</span> once.[^cookbook]
- Read window sizes from the current documentation, dated, not from a fixed table. <span class="ev ev-documented">documented</span>.[^ctxdoc]

## From the journal

- [Restart, don't compact](../journal/posts/2026-10-05-restart-dont-compact.md): a charter under 4 KB and a fresh session, instead of a summary.

## Sources

[^levy]: Mosh Levy, Alon Jacoby and Yoav Goldberg, "Same Task, More Tokens: the Impact of Input Length on the Reasoning Performance of Large Language Models", February 2024, <https://arxiv.org/abs/2402.14848>.
[^liu]: Nelson F. Liu et al., "Lost in the Middle: How Language Models Use Long Contexts", July 2023, <https://arxiv.org/abs/2307.03172>.
[^ruler]: Cheng-Ping Hsieh et al., "RULER: What's the Real Context Size of Your Long-Context Language Models?", April 2024, <https://arxiv.org/abs/2404.06654>.
[^modarressi]: Ali Modarressi et al., "NoLiMa: Long-Context Evaluation Beyond Literal Matching", February 2025, <https://arxiv.org/abs/2502.05167>.
[^du]: Du et al., "Context Length Alone Hurts LLM Performance Despite Perfect Retrieval", October 2025, <https://arxiv.org/abs/2510.05381>.
[^chroma]: Kelly Hong, Anton Troynikov and Jeff Huber, Chroma Research, "Context Rot: How Increasing Input Tokens Impacts LLM Performance", July 2025, <https://www.trychroma.com/research/context-rot>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^laban]: Philippe Laban et al., "LLMs Get Lost In Multi-Turn Conversation", May 2025, <https://arxiv.org/abs/2505.06120>.
[^masking]: Lindenbauer et al., "The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management", August 2025, <https://arxiv.org/abs/2508.21433>.
[^gloaguen]: Gloaguen et al., "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?", February 2026, <https://arxiv.org/abs/2602.11988>.
[^ctxdoc]: Anthropic, "Context windows", documentation read 2026-10-14, <https://platform.claude.com/docs/en/build-with-claude/context-windows>.
[^pricing]: Anthropic, "Pricing", documentation read 2026-10-14, <https://platform.claude.com/docs/en/about-claude/pricing>.
[^modelconfig]: Anthropic, "Model configuration", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/model-config>.
[^bestpractices]: Anthropic, "Best practices for Claude Code", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/best-practices>.
[^memory]: Anthropic, "How Claude remembers your project", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/memory>.
[^breunig]: Drew Breunig, "How Long Contexts Fail", 22 June 2025, <https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html>.
[^factory]: Factory Research, "Evaluating Context Compression for AI Agents", 16 December 2025, <https://factory.com/news/evaluating-compression>.
[^cookbook]: Isabella He, Anthropic, "Context engineering: memory, compaction, and tool clearing", 20 March 2026, <https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools>.
[^thresholds]: Anthropic, "Model configuration", Claude Code documentation read 2026-10-14, section on compaction thresholds, <https://code.claude.com/docs/en/model-config>.
[^ctxwindow]: Anthropic, "Explore the context window", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/context-window>.
[^commands]: Anthropic, "Commands", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/commands>.
[^settings]: Anthropic, "Settings reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/settings-reference>.
[^precompact]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, the PreCompact event, <https://code.claude.com/docs/en/hooks>.
[^apithreshold]: Anthropic, "Compaction at a token threshold", documentation read 2026-10-14, <https://platform.claude.com/docs/en/build-with-claude/compaction-threshold>.
[^apiondemand]: Anthropic, "Compaction on demand", documentation read 2026-10-14, <https://platform.claude.com/docs/en/build-with-claude/compaction-on-demand>.
[^ctxmgmt]: Anthropic, "Managing context on the Claude Developer Platform", 29 September 2025, <https://claude.com/blog/context-management>.
[^harnessdesign]: Prithvi Rajasekaran, Anthropic, "Harness design for long-running application development", 24 March 2026, <https://www.anthropic.com/engineering/harness-design-long-running-apps>.
[^harnesses]: Justin Young, Anthropic, "Effective harnesses for long-running agents", 26 November 2025, <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>.
[^sessionmgmt]: Thariq Shihipar, Anthropic, "Using Claude Code: session management and 1M context", 15 April 2026, <https://claude.com/blog/using-claude-code-session-management-and-1m-context>.
[^kaiser]: Julie Kaiser, "Claude compact vs. handoff: the decision tree for long sessions", 7 July 2026, <https://thejuliekaiser.com/claude-code-compact-handoff/>.
[^khorana]: Gautam Khorana, "Claude Code Context Window: When to Compact, Clear or Split", 8 September 2026, <https://gautamkhorana.com/blog/claude-code-context-window-large-repos/>.
[^packets]: agentik-dev/agentik-session, "design/packets/s17-exit-rule-respawns.md", commit e7f0723, <https://github.com/agentik-dev/agentik-session/blob/e7f0723/design/packets/s17-exit-rule-respawns.md>.
[^profiles]: agentik-dev/agentik-session, "claude_session/profiles.yaml", commit e7f0723, <https://github.com/agentik-dev/agentik-session/blob/e7f0723/claude_session/profiles.yaml>.
[^d17]: agentik-dev/agentik-decisions, "design/d17-four-verbs.md", commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/design/d17-four-verbs.md>.
