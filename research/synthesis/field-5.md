# Field 5: Many agents

## The question
Subagents and context isolation, parallel fan-out, worktrees, orchestrator, builder and refuter roles. When do many agents help, and when do they hurt? Present the strongest published case on each side.

## Findings
Measured
- Kim et al., 260 configurations, 6 benchmarks, matched token budgets: change against one agent runs from +80.8 percent (decomposable financial reasoning, centralized) to -70.0 percent (sequential planning, independent); every multi-agent design lost 39 to 70 percent on sequential planning. [kim-scaling-agent-systems; measured]
- Above about 45 percent single-agent accuracy, extra agents gave negative returns; independent agents amplified errors 17.2 times, centralized 4.4 times. [kim-scaling-agent-systems; measured]
- Its coding cells have n=20 instances (about plus or minus 20 points): claude-sonnet-4-5 on SWE-bench Verified scored 75 percent single-agent, 55 to 70 percent multi-agent. [kim-scaling-agent-systems; measured]
- MAST: 1,642 traces, 7 frameworks; failure rates 41 to 86.7 percent; 14 modes in 3 categories; step repetition is the top mode at 15.7 percent. A verification step added +15.6 percent success on ProgramDev. No single-agent control. [cemri-mast; measured]
- Anthropic research system (June 2025): a multi-agent Opus 4 and Sonnet 4 setup beat single Opus 4 by 90.2 percent on an internal eval, at about 15 times chat tokens; token use alone explained 80 percent of BrowseComp variance; most coding is called a poor fit. Reported: sample size not stated. [anthropic-engineering-multi-agent-research; reported]

Documented, as of October 2026
- A subagent has its own context window, does not see the parent's history, and returns a summary; its requests count against the same usage limits. [code-docs-sub-agents-many-agents; documented]
- Under `claude -p` a subagent runs in the background unless Claude needs its result, then in the foreground. A Workflow call shows no prompt and needs an allow rule, auto mode, bypass mode, a hook or a host callback; a `-p` run with no mode set can start in auto mode. [code-docs-sub-agents-many-agents, code-docs-workflows, code-docs-headless-agents; documented]
- `maxTurns` returns partial output since 2.1.246 (August 2026); the docs do not say a subagent sees its turn count. [code-docs-sub-agents-many-agents, code-docs-changelog-agents; documented]
- Stop runs when the main agent finishes, not on user interrupt; SubagentStop covers subagents; tool events inside a subagent carry `agent_id` (2.1.69, 5 March 2026). [code-docs-hooks-reference, code-docs-changelog-agents; documented]
- Worktrees give separate files and branch but share `.git`; four checks block edits and git redirects into the main checkout, not `cp` or shell redirects; `git worktree lock` guards pruning only. [code-docs-worktrees; documented] Git: index and HEAD are per worktree; refs, objects, config are shared; the docs do not discuss lock contention. [git-docs-worktree, git-docs-repository-layout; documented]
- Subagents continue after a denial (2.1.0, January 2026). [code-docs-changelog-agents; documented]
- Vendor guidance (January 2026): 3 to 10 times the tokens; split by context, not role; verifiers declare early victory. [claude-blog-building-multi-agent-systems; documented]

Reported
- Cognition, June 2025: parallel subagents make conflicting implicit decisions; no data. [cognition-dont-build-multi-agents; reported]
- Isolation leaks (two issues): cwd drift destroyed untracked files (2.1.119, 24 April 2026); concurrent subagents shared isolation state (2.1.223, 7 August 2026). [github-anthropics-issue-52958, github-anthropics-issue-84685; reported]

## The strongest case on each side
FOR: Kim's +80.8 percent on decomposable work, with Anthropic's +90.2 percent research gain. Limits: one task family; an internal eval where tokens explain most variance. [kim-scaling-agent-systems; measured] [anthropic-engineering-multi-agent-research; reported]
AGAINST: Kim's -39 to -70 percent on sequential work; MAST's 41 to 86.7 percent failure rates; Cognition's conflicting decisions. Limits: coding n=20; MAST has no single-agent control; Cognition has no data. [kim-scaling-agent-systems; measured] [cemri-mast; measured] [cognition-dont-build-multi-agents; reported]

## When many agents help and when they hurt
- Help: breadth work that splits into independent parts. [kim-scaling-agent-systems; measured]
- Help: a subtask with over 1,000 tokens of mostly irrelevant output. [claude-blog-building-multi-agent-systems; documented]
- Hurt: sequential work and shared state. [kim-scaling-agent-systems; measured]
- Hurt: cost, 3 to 10 times the tokens. [claude-blog-building-multi-agent-systems; documented]
- Hurt: parallel writers on one tree. [github-anthropics-issue-52958, github-anthropics-issue-84685; reported]
- Review roles: a fresh-context verifier needs concrete criteria. [claude-blog-building-multi-agent-systems; documented]

## Disputes
- Tokens against architecture: Anthropic's gain may be spent tokens; Kim matched budgets and found losses. [anthropic-engineering-multi-agent-research, kim-scaling-agent-systems]
- Docs say worktrees stop collisions; two issues report leaks. [code-docs-worktrees, github-anthropics-issue-84685]
- Measured: Kim, MAST. Anecdote: Cognition, the issues. [cemri-mast, cognition-dont-build-multi-agents]

## What this says about the agentik claims
- (a) Supported for context, not billing. [code-docs-sub-agents-many-agents; documented]
- (b) Supported by the docs; relay measured one foreground Agent call. [code-docs-workflows, agentik-relay-orchestrator; documented, our use]
- (c) Partly: `maxTurns` documented; turn-count blindness not in the docs. [agentik-relay-nice-to-have; our use]
- (d) Supported; Stop skips user interrupts. [code-docs-hooks-reference, agentik-session-design-respawn; documented, our use]
- (e) Partly: index per worktree, refs shared; docs silent on lock contention. [git-docs-repository-layout; documented]
- (f) Not in the docs; cause is conjecture. [agentik-agents-bin; our use]

## Candidate practices
- Fan out only decomposable work; keep sequential work in one agent. [kim-scaling-agent-systems; measured]
- One worktree and one file set per parallel writer. [code-docs-worktrees; documented]
- Give a fresh-context reviewer concrete criteria. [claude-blog-building-multi-agent-systems; documented]

## Sources
kim-scaling-agent-systems: Yubin Kim et al., "Towards a Science of Scaling Agent Systems", 2025-12, https://arxiv.org/abs/2512.08296
cemri-mast: Cemri et al., "Why Do Multi-Agent LLM Systems Fail?", 2025-03, https://arxiv.org/abs/2503.13657
anthropic-engineering-multi-agent-research: Anthropic, "How we built our multi-agent research system", 2025-06-13, https://www.anthropic.com/engineering/multi-agent-research-system
claude-blog-building-multi-agent-systems: Cara Phillips, "Building multi-agent systems: When and how to use them", 2026-01-23, https://www.claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them
cognition-dont-build-multi-agents: Walden Yan, "Don't Build Multi-Agents", 2025-06-12, https://cognition.com/blog/dont-build-multi-agents
code-docs-sub-agents-many-agents: Anthropic, "Create custom subagents", Oct 2026, https://code.claude.com/docs/en/sub-agents
code-docs-workflows: Anthropic, "Orchestrate subagents at scale with dynamic workflows", Oct 2026, https://code.claude.com/docs/en/workflows
code-docs-headless-agents: Anthropic, "Run Claude Code programmatically", Oct 2026, https://code.claude.com/docs/en/headless
code-docs-hooks-reference: Anthropic, "Hooks reference", Oct 2026, https://code.claude.com/docs/en/hooks
code-docs-worktrees: Anthropic, "Run parallel sessions with worktrees", Oct 2026, https://code.claude.com/docs/en/worktrees
code-docs-changelog-agents: Anthropic, "Claude Code changelog (docs page)", to 2026-10-09, https://code.claude.com/docs/en/changelog
git-docs-worktree: Git project, "git-worktree Documentation", https://git-scm.com/docs/git-worktree
git-docs-repository-layout: Git project, "gitrepository-layout Documentation", https://git-scm.com/docs/gitrepository-layout
github-anthropics-issue-52958: issue reporter, "Agent isolation: worktree leaks cwd into parent checkout", 2026-04-24, https://github.com/anthropics/claude-code/issues/52958
github-anthropics-issue-84685: issue reporter, "EnterWorktree/isolation state is session-global", 2026-08-07, https://github.com/anthropics/claude-code/issues/84685
agentik-relay-orchestrator: agentik-dev, "orchestrator rows (r1)", 2026-09-29, agentik-dev/agentik-relay design/relay-orchestrator-r1.md @ a326550
agentik-relay-nice-to-have: agentik-dev, "NICE_TO_HAVE.md", 2026-09-30, agentik-dev/agentik-relay @ a326550
agentik-session-design-respawn: agentik-dev, "respawn r1", 2026-10-10, agentik-dev/agentik-session design/respawn-r1.md @ e7f0723
agentik-agents-bin: agentik-dev, "bin/", undated, agentik-dev/agentik-agents bin/ @ 78ce312
