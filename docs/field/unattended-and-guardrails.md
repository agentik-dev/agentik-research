# Unattended runs and guardrails

An unattended run reports success whether or not it was allowed to do the work. In print mode a permission prompt with nobody to answer it is denied, the model is told, and the run continues; the denials appear only in the result's `permission_denials` list.[^headless][^sdkresult] The money cap is checked after each response, so spend can pass it by one response plus any running subagents.[^agentloop] No documented watchdog tells a main session that it has stalled.[^network] The guardrails that exist are command-text matches that miss `/bin/rm` and `bash -c`,[^permissions] hooks that fail open on a timeout unless told otherwise,[^hooks] and a sandbox that covers Bash and nothing else.[^sandbox] This chapter answers research questions 6 and 7: headless runs, queues, gates, stop conditions and money caps, and the hooks, permission modes, sandboxes and worktrees that guard them.

## Question 6: unattended runs

### What is measured

None of these studies runs Claude Code unattended; they measure other harnesses or the underlying failure.

- After a first mistake, agents recovered in 30.5 percent of runs, never noticed the mistake in 38.5 percent of cases, and kept acting on it uncorrected in 72.6 percent, over 2,518 trajectories. This is a preprint, read through an extract.[^hiddenfailures]
- Of 608 flaky tests, 46.5 percent (283) were affected by computational resources, and CPU starvation mattered most: under CPU throttling the Java suites showed 82 failures, against 10 under memory pressure.[^flaky]
- In METR's long-task evaluation, repeating a failed action accounted for 12 of 31 failures on one model and premature abandonment for 16 of 32 on another.[^metr] In the SWE-agent study a 4-dollar budget ended 31 percent of runs.[^sweagent]

### What the vendor documents, as of October 2026 (changelog head 2.1.296)

- Print mode. A permission prompt with no host to answer it is denied, Claude receives a rejection and is told not to retry, and the run continues; repeated auto-mode blocks do not stop it, and an unavailable auto mode falls back to Manual.[^headless][^permissionmodes]
- The result message. `permission_denials` is the authoritative record of denials; `terminal_reason` has 19 listed values.[^sdkresult] The five subtypes include `success`, `error_max_turns` and `error_max_budget_usd`; the listed `stop_reason` values are `end_turn`, `max_tokens` and `refusal`.[^agentloop]
- Caps. `--max-turns` and `--max-budget-usd` have no default. The budget is checked after each response and is a client-side estimate, so spend can pass the cap by one response plus any running subagents.[^agentloop][^cli]
- Background work. From 2.1.163 (June 2026) to 2.1.291, `claude -p` stopped background shells about five seconds after the final result; 2.1.292 (6 October 2026) waits for them, up to a 600,000-millisecond idle ceiling. Version 2.1.281 (September 2026) fixed an endless retry that ignored `--max-turns`.[^changelog][^headless]
- Watchdogs. On the direct API the stream watchdogs are 180 seconds to first byte, 300 seconds between events and 180 seconds between bytes.[^network] A stalled subagent in a workflow restarts after 600,000 milliseconds, at most five times.[^workflows] No main-session progress watchdog is documented.
- Bash. The default timeout is 120 seconds and the ceiling 600; a timed-out foreground command moves to the background, where the limit is 30 minutes.[^bash]
- `--bare` skips hooks, skills, plugins, MCP servers, auto memory and CLAUDE.md. Without it, `-p` runs the project's hooks with no trust dialog.[^headless]
- Transcripts live at `~/.claude/projects/<project>/<session-id>.jsonl`, and subagent transcripts under a `subagents/` directory beside them; the format is documented as unstable.[^sessions][^subagents]
- Claude Code sets `CLAUDECODE=1` and `CLAUDE_CODE_CHILD_SESSION=1` in the subprocesses it spawns, and a nested `-p` session persists.[^envvars]

### What practitioners report, and what git does

- One author of scheduled skills reports a permission dialog that froze a run for 24 hours. It is an anecdote with no version, and the documentation says `-p` denies unanswered prompts.[^claudelab][^headless]
- Git creates a lock file with `O_CREAT|O_EXCL` and fails at once if the file exists; the page is silent on stale locks after a kill.[^gitlock]

### The failure modes and what guards them

| Failure mode | What the evidence says | What guards it, as documented | Evidence |
|---|---|---|---|
| Runaway loop | Repeated failed actions are a common failure; a retry loop ignored `--max-turns` until 2.1.281 | `--max-turns`; no loop detector | Measured;[^metr] documented[^changelog] |
| Lock contention | No agent measurement; refs are shared across worktrees, and the step to a lock is conjecture | Git fails fast on an existing lock | Documented[^gitlock] |
| Flaky tests under load | 46.5 percent of flaky tests are resource-affected | Nothing documented | Measured[^flaky] |
| A stalled session that cannot tell | Agents never notice their first error in 38.5 percent of cases | Stream and subagent watchdogs; none for main-session progress | Measured;[^hiddenfailures] documented[^network] |
| Runaway spend | One response of overshoot; a budget ended 31 percent of runs in one study | `--max-budget-usd` | Documented;[^agentloop] measured[^sweagent] |
| A silent denial | A rejection, not an error subtype | `permission_denials` | Documented[^sdkresult] |

## Question 7: guardrails

### What is measured

- Anthropic's auto-mode classifier, on vendor data from March 2026: a false-positive rate of 0.4 percent on 10,000 real calls; a miss rate of 17 percent on 52 real overeager actions and 5.7 percent on 1,000 synthetic exfiltration attempts; users approved 93 percent of manual prompts.[^automode]
- Auto-approval rose from about 20 percent of sessions, when a user had under 50 sessions, to over 40 percent at 750 sessions; interrupts rose from about 5 to about 9 percent of turns.[^autonomy]
- Six coding agents, Claude Code among them, gave remote code execution through tool-description and return-value injection on every tested agent and model pair.[^redteam]
- In the AgentDojo simulator (2024, GPT-4o), attack success fell from 57.69 percent to 6.84 with a tool filter while utility rose from 69.00 to 73.13 percent, and to 7.95 percent with a detector at a utility of 41.49.[^agentdojo]

### What the vendor documents, as of October 2026

- A PreToolUse hook runs before any mode check. Its deny holds in `bypassPermissions`; exit code 2 stops a call before allow rules are read; a hook's allow cannot beat a deny rule.[^hooksguide]
- Any exit code other than 0 or 2 is a non-blocking error, and valid JSON on stdout then decides. A timed-out PreToolUse hook (default 600 seconds) does not block unless `onFailure` is `"block"` (2.1.295, October 2026), which does nothing on Stop. Claude never sees stderr from a hook that exits 0.[^hooks]
- A Stop hook's exit 2 is overridden after 8 consecutive blocks with no tool call between them.[^hooksguide]
- Bash deny rules match the command text. `Bash(rm *)` misses `/bin/rm -rf` and `bash -c 'rm -rf build/'`; `Bash(git push *)` misses `git -C . push`. The page says a rule is not a security boundary.[^permissions]
- In `-p` runs, prompts are denied. Auto mode pauses after 3 consecutive or 20 total blocks; in `-p` the action just does not run. An `rm` of the root, the home directory or the working directory cannot be approved by a rule or a hook.[^permissionmodes][^headless]
- The sandbox covers Bash, PowerShell and Monitor commands and their children. File tools, hooks and local MCP servers run outside it. It is off by default, and if it cannot start, commands run unsandboxed unless `failIfUnavailable` is set.[^sandbox]
- Worktrees live at `.claude/worktrees/<name>/` with four isolation checks, none of which tracks files a shell command writes.[^worktrees]

### What is reported

Each incident is one account, not reproduced.

- July 2025: an agent at another vendor deleted a production database despite a code freeze given as an instruction.[^replit]
- October 2025, Claude Code 2.0.22: a home directory emptied by `rm -rf`; the command was not captured.[^issue10077]
- August 2026, 2.1.223: concurrent subagents shared one isolation identity, and an amend rewrote another agent's branch.[^issue84685]

### Where the evidence stops

- The classifier rates are measured but vendor-run on private data, and the 17 percent rests on 52 actions. The academic results are measured but test none of Claude Code's hooks, deny rules or sandbox, and AgentDojo is a 2024 simulator.
- The documentation lists four worktree isolation checks; reports from April to August 2026 describe leaks, one in the guard itself. The reports are version-dependent and unreproduced.
- Every incident is one account, and closure by a stale-issue bot is not a fix.

## What this means for the agentik tools

agentik-relay's design rests on several claims that the documentation supports: PreToolUse deny hooks fire in a `-p` child and prompts are denied;[^headless] `--max-budget-usd` can overshoot;[^agentloop] `--bare` would drop CLAUDE.md;[^headless] the worktree layout under `.claude/worktrees/` matches, with `<name>` rather than `<id>`;[^worktrees] and the deny-rule bypasses it found in review (an absolute path, `sh -c`, `git -C`) are the ones the documentation lists.[^permissions][^relaynth] Three of its claims are contradicted or dated. Claude Code does not strip `CLAUDE*` variables from a child; it sets `CLAUDECODE` and `CLAUDE_CODE_CHILD_SESSION` there.[^envvars] The 600-second Bash cap the relay plans around is the documented ceiling, and the default is 120 seconds.[^bash] And the rule that `claude -p` kills background agents at its final output held from 2.1.163 to 2.1.291 and no longer does.[^changelog] Its outside watchdog on HEAD, file mtime and CPU fills a gap the documentation leaves, since no main-session progress watchdog exists; no stall has yet been recorded to test it against.[^relaydesign]

agentik-session's rule that a blocked Stop hook holds every turn end is contradicted: the cap is 8 consecutive blocks.[^hooksguide] Its reading that hooks fail open on a timeout and that stderr on exit 0 is unseen is supported.[^hooks]

agentik-agents learned by probe that `--allowedTools` restricts nothing and replaced it with `--tools`; its review incident, a reviewer's `pkill` that killed a production process, has no documented guard, since no rule names local process kills.[^agentsreadme][^agentsreview]

## Practices this evidence supports

- Treat `success` as unproven: read `permission_denials` and `terminal_reason`, and gate outside the model. Documented.[^sdkresult]
- Set `--max-turns` and `--max-budget-usd` with headroom, and record the version. Documented.[^agentloop]
- Run the test gate once, under reduced CPU and a load check. Measured.[^flaky]
- Add an outside progress watchdog, and test it by timing detection. Measured for the failure, conjecture for the guard.[^hiddenfailures]
- Put never-rules in a PreToolUse hook or a deny rule, not in prose, and set `onFailure` to block. Documented.[^hooks]
- Back Bash deny rules with the sandbox or a hook that reads the whole command, and test each guard with the absolute-path, `sh -c` and `git -C` spellings. Documented.[^permissions]
- Remove tools from unattended children instead of detecting misuse. Measured.[^agentdojo]

## Sources

[^headless]: Anthropic, "Run Claude Code programmatically", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/headless>.
[^sdkresult]: Anthropic, "TypeScript SDK reference", Claude Agent SDK documentation read 2026-10-14, <https://code.claude.com/docs/en/agent-sdk/typescript>.
[^agentloop]: Anthropic, "How the agent loop works", Claude Agent SDK documentation read 2026-10-14, <https://code.claude.com/docs/en/agent-sdk/agent-loop>.
[^network]: Anthropic, "Enterprise network configuration", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/network-config>.
[^permissions]: Anthropic, "Configure permissions", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/permissions>.
[^hooks]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks>.
[^sandbox]: Anthropic, "Configure the sandboxed Bash tool", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/sandboxing>.
[^hiddenfailures]: Rahman et al., "Locating Hidden Failures Makes Long-Horizon Agents More Reliable", 15 September 2026, <https://arxiv.org/abs/2609.17930>.
[^flaky]: Silva et al., "The Effects of Computational Resources on Flaky Tests", 18 October 2023, <https://arxiv.org/abs/2310.12132>.
[^metr]: Thomas Kwa et al., METR, "Measuring AI Ability to Complete Long Software Tasks", 18 March 2025, <https://arxiv.org/abs/2503.14499>.
[^sweagent]: John Yang et al., "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering", 6 May 2024, <https://arxiv.org/abs/2405.15793>.
[^permissionmodes]: Anthropic, "Choose a permission mode", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/permission-modes>.
[^cli]: Anthropic, "CLI reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/cli-reference>.
[^changelog]: Anthropic, "Claude Code changelog", documentation page read 2026-10-14, entries to 9 October 2026, <https://code.claude.com/docs/en/changelog>.
[^workflows]: Anthropic, "Orchestrate subagents at scale with dynamic workflows", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/workflows>.
[^bash]: Anthropic, "Tools reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/tools-reference>.
[^sessions]: Anthropic, "Manage sessions", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/sessions>.
[^subagents]: Anthropic, "Create custom subagents", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/sub-agents>.
[^envvars]: Anthropic, "Environment variables", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/env-vars>.
[^claudelab]: Claude Lab, "Designing Claude Code Skills That Actually Run Unattended", 9 May 2026, <https://claudelab.net/en/articles/claude-code/claude-code-skill-unattended-permission-design>.
[^gitlock]: Git project, "Git lockfile API", read 2026-10-14, <https://git-scm.com/docs/api-lockfile>.
[^automode]: Anthropic Engineering, "How we built Claude Code auto mode: a safer way to skip permissions", 25 March 2026, <https://www.anthropic.com/engineering/claude-code-auto-mode>.
[^autonomy]: Anthropic, "Measuring AI agent autonomy in practice", 18 February 2026, <https://www.anthropic.com/research/measuring-agent-autonomy>.
[^redteam]: Xie et al., "Red-Teaming Coding Agents from a Tool-Invocation Perspective: An Empirical Security Assessment", 6 September 2025, <https://arxiv.org/abs/2509.05755>.
[^agentdojo]: Edoardo Debenedetti et al., "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents", 19 June 2024, <https://arxiv.org/abs/2406.13352>.
[^hooksguide]: Anthropic, "Automate actions with hooks", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks-guide>.
[^worktrees]: Anthropic, "Run parallel sessions with worktrees", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/worktrees>.
[^replit]: Simon Sharwood, The Register, "Vibe coding service Replit deleted user's production database, faked data, told fibs galore", 21 July 2025, <https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/>.
[^issue10077]: Issue reporter, "Claude Code executed rm -rf deleting entire home directory", anthropics/claude-code issue 10077, 21 October 2025, <https://github.com/anthropics/claude-code/issues/10077>.
[^issue84685]: Issue reporter, "EnterWorktree/isolation state is session-global", anthropics/claude-code issue 84685, 7 August 2026, <https://github.com/anthropics/claude-code/issues/84685>.
[^relaynth]: agentik-dev/agentik-relay, "NICE_TO_HAVE.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/NICE_TO_HAVE.md>.
[^relaydesign]: agentik-dev/agentik-relay, "design/relay-r1.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/design/relay-r1.md>.
[^agentsreadme]: agentik-dev/agentik-agents, "README.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/README.md>.
[^agentsreview]: agentik-dev/agentik-agents, "design/03-review-2026-09.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/design/03-review-2026-09.md>.
