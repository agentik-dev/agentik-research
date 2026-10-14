# Many agents

Many agents help when the work splits into independent parts and hurt when it does not. The one study that matched token budgets across 260 configurations found changes from +80.8 percent on decomposable work to -70.0 percent on sequential planning, and every multi-agent design lost on sequential work.[^kim] A taxonomy of 1,642 traces found failure rates of 41 to 86.7 percent across seven frameworks.[^mast] The vendor's own research system gained 90.2 percent on an internal evaluation, at about fifteen times the tokens, and the same post calls most coding a poor fit.[^anthropicresearch] This chapter answers research question 5: subagents and context isolation, fan-out, worktrees, orchestrator, builder and refuter roles, and the strongest published case on each side.

## What is measured

- Kim et al. ran 260 configurations over six benchmarks with matched token budgets. Against one agent, the change ran from +80.8 percent (decomposable financial reasoning, centralized) to -70.0 percent (sequential planning, independent agents); every multi-agent design lost 39 to 70 percent on sequential planning. Above about 45 percent single-agent accuracy, extra agents gave negative returns. Independent agents amplified errors 17.2 times and centralized ones 4.4 times. The coding cells have 20 instances each: Claude Sonnet 4.5 scored 75 percent single-agent on SWE-bench Verified and 55 to 70 percent in multi-agent designs, a difference inside the noise of that sample.[^kim]
- Cemri et al. (MAST) analysed 1,642 traces from seven frameworks. Failure rates ran from 41 to 86.7 percent, in 14 modes under three categories; step repetition was the top mode at 15.7 percent. Adding a verification step raised success 15.6 percent on one benchmark. There is no single-agent control.[^mast]

## What the vendor reports and documents

Anthropic's research system (June 2025) ran Opus 4 as orchestrator and Sonnet 4 as workers and beat a single Opus 4 agent by 90.2 percent on an internal evaluation, at about fifteen times the tokens of a chat. Token use alone explained 80 percent of the variance on one benchmark. The post says most coding tasks are a poor fit because they have fewer parallelisable parts. The sample size is not stated, so this site files it as reported.[^anthropicresearch]

As of October 2026 the documentation says:

- A subagent has its own context window, does not see the parent's history, and returns a summary. Its requests count against the same usage limits.[^subagents]
- Under `claude -p` a subagent runs in the background unless Claude needs its result, in which case it runs in the foreground. A Workflow call shows no prompt and needs an allow rule, auto mode, bypass mode, a hook or a host callback; a `-p` run with no mode set can start in auto mode.[^subagents][^workflows][^headless]
- `maxTurns` in an agent's front matter caps its turns and returns partial output since 2.1.246 (August 2026). The documentation does not say whether a subagent can see its own turn count.[^subagents][^changelog]
- The Stop hook runs when the main agent finishes, not on a user interrupt. SubagentStop covers subagents, and tool events inside a subagent carry `agent_id` (2.1.69, March 2026).[^hooks][^changelog]
- Worktrees give each session its own files and branch while sharing `.git`. Four checks block edits and git commands that would reach the main checkout; they do not track `cp` or shell redirects. `git worktree lock` guards pruning only.[^worktrees] Git keeps the index and HEAD per worktree and shares refs, objects and config; its documentation does not discuss lock contention.[^gitworktree][^gitlayout]
- Subagents continue after a permission denial (2.1.0, January 2026).[^changelog]
- Vendor guidance from January 2026: expect 3 to 10 times the tokens; split by context, not by role; verifiers declare early victory without concrete criteria.[^multiagentblog]

## What practitioners report

- Cognition argued in June 2025 that parallel subagents make conflicting implicit decisions, and offered no data.[^cognition]
- Two isolation leaks are on record. A working-directory drift destroyed untracked files (2.1.119, April 2026), and concurrent subagents shared one isolation identity, so an amend rewrote another agent's branch (2.1.223, August 2026).[^issue52958][^issue84685]

## The strongest case on each side

For: Kim's +80.8 percent on decomposable work, and Anthropic's +90.2 percent on research. The limits are one task family and an internal evaluation where tokens explain most of the variance.[^kim][^anthropicresearch]

Against: Kim's -39 to -70 percent on sequential work, MAST's 41 to 86.7 percent failure rates, and Cognition's conflicting decisions. The limits are a coding sample of 20, no single-agent control, and no data.[^kim][^mast][^cognition]

## When many agents help, and when they hurt

- Help: breadth work that splits into independent parts. Measured.[^kim]
- Help: a subtask whose output is over 1,000 tokens and mostly irrelevant to the parent. Documented.[^multiagentblog]
- Hurt: sequential work and shared state. Measured.[^kim]
- Hurt: cost, at 3 to 10 times the tokens. Documented.[^multiagentblog]
- Hurt: parallel writers on one working tree. Reported.[^issue52958][^issue84685]
- A review role works when the reviewer has a fresh context and concrete criteria. Documented.[^multiagentblog]

## Where sources disagree

- Tokens against architecture. Anthropic's gain may be the tokens spent; Kim matched budgets and found losses on sequential work.[^anthropicresearch][^kim]
- The documentation says worktrees stop collisions; two issues from April and August 2026 report leaks, one in the guard itself. The reports are version-dependent and not reproduced.[^worktrees][^issue84685]
- Measured: Kim and MAST. Anecdote: Cognition and the issues.

## What this means for the agentik tools

agentik-relay runs one child per worktree and ships a report-only adversary agent. Context isolation is documented, though a subagent's tokens still count against the limits.[^subagents] A foreground Agent call under `-p` is documented and the relay measured one.[^workflows][^relayorch] `maxTurns` is documented; the relay's finding that an agent cannot see its turn count is its own.[^relaynth] Stop fires for the main agent only, as agentik-session also found.[^hooks] One worktree per writer is supported by the documentation; the relay's step from there to git's `index.lock` is conjecture, since neither the Claude Code nor the git documentation mentions lock contention.[^gitlayout]

agentik-agents found that three of four delegates which hit a denied tool returned a placeholder after full cost. The documentation says subagents continue after a denial; it does not describe placeholders, and the cause is conjecture.[^changelog][^agentsbin]

## Practices this evidence supports

- Fan out only decomposable work; keep sequential work in one agent. Measured.[^kim]
- One worktree and one file set per parallel writer. Documented and reported.[^worktrees][^issue84685]
- Give a fresh-context reviewer concrete criteria and a report-only role. Documented.[^multiagentblog]

## Sources

[^kim]: Yubin Kim et al., "Towards a Science of Scaling Agent Systems", December 2025, <https://arxiv.org/abs/2512.08296>.
[^mast]: Mert Cemri et al., "Why Do Multi-Agent LLM Systems Fail?", March 2025, <https://arxiv.org/abs/2503.13657>.
[^anthropicresearch]: Anthropic, "How we built our multi-agent research system", 13 June 2025, <https://www.anthropic.com/engineering/multi-agent-research-system>.
[^subagents]: Anthropic, "Create custom subagents", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/sub-agents>.
[^workflows]: Anthropic, "Orchestrate subagents at scale with dynamic workflows", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/workflows>.
[^headless]: Anthropic, "Run Claude Code programmatically", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/headless>.
[^changelog]: Anthropic, "Claude Code changelog", documentation page read 2026-10-14, entries to 9 October 2026, <https://code.claude.com/docs/en/changelog>.
[^hooks]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks>.
[^worktrees]: Anthropic, "Run parallel sessions with worktrees", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/worktrees>.
[^gitworktree]: Git project, "git-worktree documentation", read 2026-10-14, <https://git-scm.com/docs/git-worktree>.
[^gitlayout]: Git project, "gitrepository-layout documentation", read 2026-10-14, <https://git-scm.com/docs/gitrepository-layout>.
[^multiagentblog]: Cara Phillips, Anthropic, "Building multi-agent systems: When and how to use them", 23 January 2026, <https://www.claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them>.
[^cognition]: Walden Yan, Cognition, "Don't Build Multi-Agents", 12 June 2025, <https://cognition.com/blog/dont-build-multi-agents>.
[^issue52958]: Issue reporter, "Agent isolation: worktree leaks cwd into parent checkout", anthropics/claude-code issue 52958, 24 April 2026, <https://github.com/anthropics/claude-code/issues/52958>.
[^issue84685]: Issue reporter, "EnterWorktree/isolation state is session-global", anthropics/claude-code issue 84685, 7 August 2026, <https://github.com/anthropics/claude-code/issues/84685>.
[^relayorch]: agentik-dev/agentik-relay, "design/relay-orchestrator-r1.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/design/relay-orchestrator-r1.md>.
[^relaynth]: agentik-dev/agentik-relay, "NICE_TO_HAVE.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/NICE_TO_HAVE.md>.
[^agentsbin]: agentik-dev/agentik-agents, "bin/", the API wrapper's comments, commit 78ce312, <https://github.com/agentik-dev/agentik-agents/tree/78ce312/bin>.
