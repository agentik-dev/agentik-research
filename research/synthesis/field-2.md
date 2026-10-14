# Field 2: Compaction or restart

## The question
Compare auto-compaction, manual `/compact`, summaries, and a restart from a written handoff (a charter). What does each lose and keep, and what does the evidence favour?

## Findings
Measured:
- A model judge scored three compressors on 36,611 production messages: 3.70 (Factory), 3.44 (Anthropic), 3.35 (OpenAI) out of 5. The artifact trail was lowest for all: 2.45, 2.33, 2.19. Vendor-run; not Claude Code's own compaction. [factory-evaluating-compression; measured]
- One research agent, one run, compaction at 180K tokens: the summary was about 2,783 tokens; it kept 3 of 3 high-level facts and lost 3 of 3 obscure appendix-table values. [anthropic-cookbook-context-engineering; measured]
- Across 15 models and over 200,000 simulated conversations, multi-turn performance fell 39% on average. Putting the information into one fresh instruction helped; repeating earlier turns recovered 15 to 20% of the loss. No tools, not coding. [arxiv-lost-in-multi-turn; measured]
- Masking old observations about halved cost and matched LLM summarisation's solve rate on SWE-bench Verified (SWE-agent, five model configurations). [arxiv-complexity-trap; measured]

Documented, as of October 2026:
- Automatic compaction runs at the model's limit: the 200K boundary for Sonnet 4.6 and Opus 4.6 without extended context, about 967K tokens for native 1M-window models; the window is settable from 100K to 1M tokens. [anthropic-docs-model-config-thresholds; documented]
- After compaction: root CLAUDE.md, memory and the plan return from disk; up to five recent files are re-read (over 5,000 tokens, only the path); invoked skills return capped at 5,000 tokens each, 25,000 in total; path-scoped rules and early instructions are summarised away. [anthropic-docs-context-window; documented]
- `/compact` with a focus keeps what you name; `/clear` starts an empty conversation and the old one stays reachable with `/resume`. [anthropic-docs-context-window; documented]
- Idle compaction: on by default, about 54 idle minutes, 200,000 tokens by default, interactive sessions on the one-hour cache, version 2.1.290 or later; `autoCompactEnabled: false` also stops it. [anthropic-docs-settings-compaction; documented]
- A PreCompact hook blocks with exit code 2. Blocking a proactive pass skips it; blocking a recovery pass surfaces the API error and the request fails. [anthropic-docs-hooks-precompact; documented]
- API: threshold compaction defaults to 150,000 tokens (minimum 50,000). Context editing is announced with 84% fewer tokens in one 100-turn evaluation, benchmark unnamed. [anthropic-api-docs-compaction-threshold; anthropic-blog-context-management; documented]

Reported:
- Sonnet 4.5 needed resets with a structured handoff; for Opus 4.5 they were dropped and automatic compaction sufficed (March 2026). [anthropic-engineering-harness-design; reported]
- "Compaction isn't sufficient": a progress file, feature list and git history carried work between sessions (Opus 4.5, November 2025). [anthropic-engineering-effective-harnesses-compaction; reported]
- A Claude Code engineer calls the summary lossy, says the model is least capable when it compacts, and advises a clear with a written brief. [anthropic-blog-session-management; reported]
- Two practitioners prefer handoffs; one compacts by hand near 50% of the window; neither measures. [kaiser-compact-handoff; khorana-context-window-large-repos; reported]

## What each option loses and keeps
| Option | Keeps | Loses | Evidence |
|---|---|---|---|
| Auto-compaction | Re-injected CLAUDE.md, memory, plan; five files; a summary | Early instructions, exact values, artifact trail | [anthropic-docs-context-window; documented], [factory-evaluating-compression; measured] |
| Manual `/compact` with instructions | The same, plus what the instruction names | The same classes; that a focus loses less is conjecture | [anthropic-docs-context-window; documented], [anthropic-blog-session-management; reported] |
| Summary written by the agent (API block, progress note) | State, next steps, learnings | Images and documents in range; obscure values | [anthropic-api-docs-compaction-threshold; documented], [anthropic-cookbook-context-engineering; measured] |
| Restart from a handoff | Only what the file and repository hold; a clean window | Reasoning behind decisions; that it beats compaction is conjecture | [kaiser-compact-handoff; reported], [arxiv-lost-in-multi-turn; measured, lab] |

## Disputes
- No controlled study compares a restart from a written handoff with compaction in a coding session. The lab result has no tools; the compression scores are vendor-run and compare compressors, not restarts.
- Model dependence: resets were needed on Sonnet 4.5 and dropped on Opus 4.5, yet the November post still wanted artifacts on Opus 4.5. Both are single builds.
- When to compact is anecdote: about 50% of the window (Kaiser) against the limit (the default).

## What this says about the agentik claims
- (a) Idle compaction: supported, with five conditions the repo did not list; that its hook payload says `trigger: "auto"` is not documented. [anthropic-docs-settings-compaction; documented], [agentik-session-compaction-rule; our use]
- (b) PreCompact: the recovery failure is supported; stdout read as compaction instructions is not in the docs, whose general rule sends stdout to the debug log. [anthropic-docs-hooks-precompact; documented], [agentik-session-compaction-rule; our use only]
- (c) Restart beats compaction: not shown. Practice and a lab result point that way; the March 2026 post says it depends on the model. [anthropic-engineering-harness-design; reported]
- (d) Threshold and kept items: supported as in the findings; the docs state tokens, not a percentage. [anthropic-docs-model-config-thresholds; documented]

## Candidate practices
- Write a handoff (goal, decisions, ruled-out approaches, next step) to a file before the window fills. [anthropic-blog-session-management; reported]
- Record exact values and file lists in files, not summaries. [anthropic-cookbook-context-engineering; measured]
- Set `idleCompaction: false` where a sitting must not compact. [anthropic-docs-settings-compaction; documented]

## Sources
factory-evaluating-compression: Factory Research, "Evaluating Context Compression for AI Agents", 2025-12-16, https://factory.com/news/evaluating-compression
anthropic-cookbook-context-engineering: Isabella He, Anthropic, "Context engineering: memory, compaction, and tool clearing", 2026-03-20, https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools
arxiv-lost-in-multi-turn: Laban et al., "LLMs Get Lost In Multi-Turn Conversation", 2025-05-09, https://arxiv.org/abs/2505.06120
arxiv-complexity-trap: Lindenbauer et al., "The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management", 2025-08-29, https://arxiv.org/abs/2508.21433
anthropic-docs-model-config-thresholds: Anthropic, "Model configuration", undated, https://code.claude.com/docs/en/model-config
anthropic-docs-context-window: Anthropic, "Explore the context window", undated, https://code.claude.com/docs/en/context-window
anthropic-docs-settings-compaction: Anthropic, "Settings reference", undated, https://code.claude.com/docs/en/settings-reference
anthropic-docs-hooks-precompact: Anthropic, "Hooks reference", undated, https://code.claude.com/docs/en/hooks
anthropic-api-docs-compaction-threshold: Anthropic, "Compaction at a token threshold", undated, https://platform.claude.com/docs/en/build-with-claude/compaction-threshold
anthropic-blog-context-management: Anthropic, "Managing context on the Claude Developer Platform", 2025-09-29, https://claude.com/blog/context-management
anthropic-engineering-harness-design: Prithvi Rajasekaran, Anthropic, "Harness design for long-running application development", 2026-03-24, https://www.anthropic.com/engineering/harness-design-long-running-apps
anthropic-engineering-effective-harnesses-compaction: Justin Young, Anthropic, "Effective harnesses for long-running agents", 2025-11-26, https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
anthropic-blog-session-management: Thariq Shihipar, Anthropic, "Using Claude Code: session management and 1M context", 2026-04-15, https://claude.com/blog/using-claude-code-session-management-and-1m-context
kaiser-compact-handoff: Julie Kaiser, "Claude compact vs. handoff: the decision tree for long sessions", 2026-07-07, https://thejuliekaiser.com/claude-code-compact-handoff/
khorana-context-window-large-repos: Gautam Khorana, "Claude Code Context Window: When to Compact, Clear or Split", 2026-09-08, https://gautamkhorana.com/blog/claude-code-context-window-large-repos/
agentik-session-compaction-rule: agentik-dev/agentik-session, never-compact rule and compaction record, commit e7f0723, https://github.com/agentik-dev/agentik-session/tree/e7f0723
