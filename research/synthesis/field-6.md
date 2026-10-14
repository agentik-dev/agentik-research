# Field 6: Unattended runs

## The question
Headless runs, the Agent SDK, queues, gates, stop conditions, money caps. Failure modes: runaway loops, lock contention, flaky tests under load, a session that cannot tell it has stalled.

## Findings
Measured (other harnesses; none studies Claude Code unattended):
- After a first mistake, agents recovered in 30.5 percent of runs, never noticed the mistake in 38.5 percent of cases, and kept acting uncorrected in 72.6 percent (2,518 trajectories; preprint; figures from a fetch-tool extract) [arxiv-locating-hidden-failures; measured]
- 46.5 percent (283 of 608) of flaky tests were resource-affected; CPU starvation mattered most (Java: 82 failures under CPU throttling, 10 under memory) [arxiv-raft-computational-resources-flaky-tests; measured]
- Failure causes: repeating failed actions was 12 of 31 GPT-4 1106 failures; premature abandonment was 16 of 32 o1 failures [arxiv-metr-time-horizon; measured]. A 4 US dollar budget ended 31 percent of runs [arxiv-swe-agent; measured]

Documented, as of October 2026 (changelog head v2.1.296):
- Print mode: a permission prompt with no host to answer is denied, Claude receives a rejection, and the run continues; repeated auto-mode blocks do not stop it; an unavailable auto mode falls back to Manual [code-docs-headless-unattended; documented] [code-docs-permission-modes-unattended; documented]
- Result message: `permission_denials` is the authoritative record of denials; `terminal_reason` has 19 listed values [code-docs-agent-sdk-typescript-result-unattended; documented]. Five subtypes, including `success`, `error_max_turns` and `error_max_budget_usd`; listed `stop_reason` values: `end_turn`, `max_tokens`, `refusal` [code-docs-agent-sdk-agent-loop-unattended; documented]
- `--max-turns` and `--max-budget-usd` have no default; the budget is checked after each response, so spend can pass the cap by one response plus running subagents; the figure is a client-side estimate [code-docs-agent-sdk-agent-loop-unattended; documented]
- From v2.1.163 (4 June 2026) to v2.1.291, `claude -p` stopped background shells about 5 seconds after the final result; v2.1.292 (6 October 2026) waits, up to a 600,000 millisecond idle ceiling [code-docs-changelog-unattended; documented] [code-docs-headless-unattended; documented]. v2.1.281 (23 September 2026) fixed an endless retry that ignored `--max-turns` [code-docs-changelog-unattended; documented]
- Stall watchdogs on the direct API: first byte 180 seconds, event level 300 seconds, byte level 180 seconds [code-docs-network-config-unattended; documented]. A stalled subagent restarts after 600,000 milliseconds, at most five times [code-docs-workflows-unattended; documented]
- Bash: default timeout 120 seconds, ceiling 600 seconds; a timed-out foreground command moves to the background; background limit 30 minutes [code-docs-tools-reference-bash-timeouts; documented]
- `--bare` skips hooks, skills, plugins, MCP servers, auto memory and CLAUDE.md; without it `-p` runs project hooks with no trust dialog [code-docs-headless-unattended; documented]
- Transcripts: `~/.claude/projects/<project>/<session-id>.jsonl`; the format is unstable [code-docs-sessions-unattended; documented]. Subagents: `~/.claude/projects/{project}/{sessionId}/subagents/agent-{agentId}.jsonl` [code-docs-sub-agents-unattended; documented]
- Claude Code sets `CLAUDECODE=1` and `CLAUDE_CODE_CHILD_SESSION=1` in the subprocesses it spawns; a nested `-p` session persists [code-docs-env-vars-unattended; documented]

Reported, and git:
- A permission dialog reportedly froze a scheduled skill for 24 hours; anecdote, no version [claudelab-unattended-permission-stalls; reported]
- Git creates `<file>.lock` with `O_CREAT|O_EXCL` and fails if it exists; the page is silent on stale locks after SIGKILL [git-docs-api-lockfile; documented]

## The failure modes
| Failure mode | Evidence | Guard | Slug; level |
|---|---|---|---|
| Runaway loop | Repeated actions; retry loop ignored `--max-turns` until v2.1.281 | `--max-turns`; no loop detector documented | arxiv-metr-time-horizon measured; code-docs-changelog-unattended documented |
| Lock contention | No agent measurement; shared refs across worktrees: conjecture (test: two worktrees) | Git fails fast | git-docs-api-lockfile documented |
| Flaky tests under load | 46.5 percent resource-affected | Nothing documented | arxiv-raft-computational-resources-flaky-tests measured |
| Stalled session that cannot tell | 38.5 percent never notice | Stream and subagent watchdogs; none for main-session progress | arxiv-locating-hidden-failures measured; code-docs-network-config-unattended documented |
| Runaway spend | One response of overshoot; 31 percent of runs ended on a budget | `--max-budget-usd` | code-docs-agent-sdk-agent-loop-unattended documented; arxiv-swe-agent measured |
| Silent denial | A rejection, not an error subtype | `permission_denials` | code-docs-agent-sdk-typescript-result-unattended documented |

## Disputes
- A scheduled-skill author says dialogs wait forever; the documentation says `-p` denies unanswered prompts. Anecdote against documentation.
- Measured studies use other harnesses; the recovery figures are a preprint read through an extract.
- The documentation describes v2.1.296; repository observations date from v2.1.269 to v2.1.280.

## What this says about the agentik claims
- (a) Partly. Denial and hooks in `-p` are documented; auto mode uses a classifier, not deny-all, unless unavailable (then Manual).
- (b) Partly. The kill held from v2.1.163 to v2.1.291; v2.1.292 waits. `stop_reason = tool_use` is not documented; `permission_denials` marks denials.
- (c) Contradicted in part. Claude Code sets both variables in children; stripping is not documented.
- (d) Supported.
- (e) Contradicted. Default 120 seconds; 600 seconds is the ceiling; timeout moves to background.
- (f) Supported.
- (g) Partly. Both paths are documented, `subagents/` included; the format is unstable.
- (h) Partly contradicted. Stream and subagent watchdogs exist; no main-session progress watchdog is documented.

## Candidate practices
- Treat `success` as unproven: read `permission_denials` and `terminal_reason`, and gate outside the model [code-docs-agent-sdk-typescript-result-unattended; documented]
- Set `--max-turns` and `--max-budget-usd` with headroom, and record the version [code-docs-agent-sdk-agent-loop-unattended; documented]
- Run the test gate once under reduced CPU [arxiv-raft-computational-resources-flaky-tests; measured]
- Add an outside progress watchdog; test by timing detection [arxiv-locating-hidden-failures; conjecture]

## Sources
arxiv-locating-hidden-failures: Rahman et al., "Locating Hidden Failures Makes Long-Horizon Agents More Reliable", 15 September 2026, https://arxiv.org/abs/2609.17930
arxiv-raft-computational-resources-flaky-tests: Silva et al., "The Effects of Computational Resources on Flaky Tests", 18 October 2023, https://arxiv.org/abs/2310.12132
arxiv-metr-time-horizon: Kwa et al., "Measuring AI Ability to Complete Long Software Tasks", 18 March 2025, https://arxiv.org/abs/2503.14499
arxiv-swe-agent: Yang et al., "SWE-agent", 6 May 2024, https://arxiv.org/abs/2405.15793
code-docs-headless-unattended: Anthropic, "Run Claude Code programmatically", Oct 2026, https://code.claude.com/docs/en/headless
code-docs-permission-modes-unattended: Anthropic, "Choose a permission mode", Oct 2026, https://code.claude.com/docs/en/permission-modes
code-docs-agent-sdk-agent-loop-unattended: Anthropic, "How the agent loop works", Oct 2026, https://code.claude.com/docs/en/agent-sdk/agent-loop
code-docs-agent-sdk-typescript-result-unattended: Anthropic, "TypeScript SDK reference", Oct 2026, https://code.claude.com/docs/en/agent-sdk/typescript
code-docs-changelog-unattended: Anthropic, "Claude Code changelog", 9 October 2026, https://code.claude.com/docs/en/changelog
code-docs-network-config-unattended: Anthropic, "Enterprise network configuration", Oct 2026, https://code.claude.com/docs/en/network-config
code-docs-workflows-unattended: Anthropic, "Dynamic workflows", Oct 2026, https://code.claude.com/docs/en/workflows
code-docs-tools-reference-bash-timeouts: Anthropic, "Tools reference", Oct 2026, https://code.claude.com/docs/en/tools-reference
code-docs-sessions-unattended: Anthropic, "Manage sessions", Oct 2026, https://code.claude.com/docs/en/sessions
code-docs-sub-agents-unattended: Anthropic, "Create custom subagents", Oct 2026, https://code.claude.com/docs/en/sub-agents
code-docs-env-vars-unattended: Anthropic, "Environment variables", Oct 2026, https://code.claude.com/docs/en/env-vars
claudelab-unattended-permission-stalls: Claude Lab, "Designing Claude Code Skills That Actually Run Unattended", 9 May 2026, https://claudelab.net/en/articles/claude-code/claude-code-skill-unattended-permission-design
git-docs-api-lockfile: Git project, "Git lockfile API", Oct 2026, https://git-scm.com/docs/api-lockfile
