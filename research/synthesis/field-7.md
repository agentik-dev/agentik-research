# Field 7: Guardrails

## The question
Hooks that deny a tool call, permission modes, sandboxes, worktree isolation. The incidents these guard against, and their limits.

## Findings
Measured:
- Auto mode classifier, March 2026, vendor data: false positive rate 0.4% on 10,000 real calls; miss rate 17% on 52 real overeager actions and 5.7% on 1,000 synthetic exfiltration attempts; users approved 93% of manual prompts. [anthropic-engineering-auto-mode; measured]
- Auto-approval rose from about 20% of sessions (under 50 sessions) to over 40% (750 sessions); interrupts rose from about 5% to about 9% of turns. [anthropic-research-agent-autonomy; measured]
- Six coding agents including Claude Code gave remote code execution by tool-description and return-value injection on every tested agent and model pair. [arxiv-red-teaming-coding-agents; measured]
- AgentDojo (2024 simulator, GPT-4o): attack success fell from 57.69% to 6.84% with a tool filter (utility 69.00% to 73.13%) and to 7.95% with a detector (utility 41.49%). [arxiv-agentdojo; measured]

Documented (as of October 2026):
- A PreToolUse hook runs before any mode check; its deny holds in `bypassPermissions`; exit 2 stops a call before allow rules; a hook's allow cannot beat a deny rule. [code-docs-hooks-guide-guardrails; documented]
- Any exit code other than 0 or 2 is a non-blocking error (valid JSON on stdout then decides). A timed-out PreToolUse hook (default 600 seconds) does not block unless `onFailure: "block"` (v2.1.295, 8 October 2026), which does nothing on Stop. Claude never sees stderr from an exit-0 hook. [code-docs-hooks-reference; documented]
- Stop exit 2 is overridden after 8 consecutive blocks with no tool call between. [code-docs-hooks-guide-guardrails; documented]
- Bash deny rules match command text: `Bash(rm *)` misses `/bin/rm -rf` and `bash -c 'rm -rf build/'`; `Bash(git push *)` misses `git -C . push`. The page says a rule "isn't a security boundary". [code-docs-permissions-guardrails; documented]
- In `-p` runs, prompts are denied. Auto mode pauses after 3 consecutive or 20 total blocks; in `-p` the action just does not run. `rm` of root, home or the working directory cannot be approved by a rule or hook. [code-docs-permission-modes-guardrails; code-docs-headless-unattended; documented]
- The sandbox covers Bash, PowerShell and Monitor commands and their children; file tools, hooks and local MCP servers run outside it. It is off by default and, if it cannot start, commands run unsandboxed unless `failIfUnavailable` is set. [code-docs-sandboxing-guardrails; documented]
- Worktrees live at `.claude/worktrees/<name>/`; four isolation checks, none tracking files a shell command writes. Git gives each worktree its own index but shares refs. [code-docs-worktrees; git-docs-worktree; documented]

Reported (single accounts, not reproduced):
- July 2025: an agent deleted a production database despite a code freeze given as an instruction. [theregister-replit-database-deletion; reported]
- October 2025, version 2.0.22: a home directory emptied by `rm -rf`; command not captured. [github-anthropics-issue-10077; reported]
- August 2026, version 2.1.223: concurrent subagents shared one isolation identity; an `amend` rewrote another agent's branch ref. [github-anthropics-issue-84685; reported]

## Disputes
- Measured but vendor-run: the classifier rates (private data; 17% rests on 52 actions). Academic results are measured but test none of Claude Code's hooks, deny rules or sandbox; AgentDojo is a 2024 simulator.
- Docs against reports: the docs list four worktree isolation checks; reports from April to August 2026 describe leaks, and the August one concerns the guard itself. Version-dependent; none reproduced.
- Anecdote: every incident is one account; closure by a stale bot is not a fix.

## What this says about the agentik claims
- (a) Supported (documented): hooks run in `-p` and prompts are denied; but `--bare` skips hooks and will become the default, and failure fails open. Print-mode auto mode denying every Write and Bash is not in the docs. [agentik-relay-design-r1; our use]
- (b) Timeout and `onFailure` and stderr: supported (documented). Stop exit 2 holding every turn end: contradicted (cap of 8).
- (c) Partly supported: documented checks prompt on unparseable commands and a classifier with a block list exists, but no zsh list; a "PII handling" read refusal is in no doc. [agentik-relay-decisions; agentik-relay-sittings; our use]
- (d) Not in the docs: no rule names local process kills. [agentik-agents-design-03-review; our use]
- (e) Supported (documented), with a correction: the layout is `<name>`, not `<id>`.
- (f) Supported by inference: git's index is per worktree (documented); the step to `index.lock` is conjecture, and Claude Code's docs never mention it.
- (g) Supported (documented): the docs list the same bypasses, and the relay record shows four. [agentik-relay-nice-to-have; our use]

## Candidate practices
- Put never-rules in a PreToolUse hook or deny rule, not prose, and set `onFailure: "block"`. [code-docs-hooks-reference; documented]
- Back Bash deny rules with the sandbox or a hook that reads the whole command. [code-docs-permissions-guardrails; documented]
- Remove tools from unattended children instead of detecting misuse. [arxiv-agentdojo; measured]
- Test each guard with the absolute-path, `sh -c` and `git -C` spellings. [agentik-relay-nice-to-have; our use]

## Sources
anthropic-engineering-auto-mode: Anthropic Engineering, "How we built Claude Code auto mode: a safer way to skip permissions", 2026-03-25, https://www.anthropic.com/engineering/claude-code-auto-mode
anthropic-research-agent-autonomy: Anthropic, "Measuring AI agent autonomy in practice", 2026-02-18, https://www.anthropic.com/research/measuring-agent-autonomy
arxiv-red-teaming-coding-agents: Xie et al., "Red-Teaming Coding Agents from a Tool-Invocation Perspective: An Empirical Security Assessment", 2025-09-06, https://arxiv.org/abs/2509.05755
arxiv-agentdojo: Debenedetti et al., "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents", 2024-06-19, https://arxiv.org/abs/2406.13352
code-docs-hooks-guide-guardrails: Anthropic, "Automate actions with hooks", undated, https://code.claude.com/docs/en/hooks-guide
code-docs-hooks-reference: Anthropic, "Hooks reference", undated, https://code.claude.com/docs/en/hooks
code-docs-permissions-guardrails: Anthropic, "Configure permissions", undated, https://code.claude.com/docs/en/permissions
code-docs-permission-modes-guardrails: Anthropic, "Choose a permission mode", undated, https://code.claude.com/docs/en/permission-modes
code-docs-headless-unattended: Anthropic, "Run Claude Code programmatically", undated, https://code.claude.com/docs/en/headless
code-docs-sandboxing-guardrails: Anthropic, "Configure the sandboxed Bash tool", undated, https://code.claude.com/docs/en/sandboxing
code-docs-worktrees: Anthropic, "Run parallel sessions with worktrees", undated, https://code.claude.com/docs/en/worktrees
git-docs-worktree: Git project, "git-worktree documentation", undated, https://git-scm.com/docs/git-worktree
theregister-replit-database-deletion: Simon Sharwood, The Register, "Vibe coding service Replit deleted user's production database, faked data, told fibs galore", 2025-07-21, https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/
github-anthropics-issue-10077: issue reporter, "[BUG] ## CRITICAL: Claude Code executed rm -rf deleting entire home directory", 2025-10-21, https://github.com/anthropics/claude-code/issues/10077
github-anthropics-issue-84685: issue reporter, "Multi-agent: EnterWorktree/isolation state is session-global — concurrent subagents hijack each other's cwd and guard identity", 2026-08-07, https://github.com/anthropics/claude-code/issues/84685
agentik-relay-design-r1: agentik-dev/agentik-relay, "agentik-relay design r1: the Go relay and the packet queue that builds it", 2026-09-22, https://github.com/agentik-dev/agentik-relay/blob/a326550/design/relay-r1.md
agentik-relay-decisions: agentik-dev/agentik-relay, "relay: what is settled", 2026-09-28, https://github.com/agentik-dev/agentik-relay/blob/a326550/DECISIONS.md
agentik-relay-sittings: agentik-dev/agentik-relay, "history/sittings: the charters of 132 sittings", 2026-09-22, https://github.com/agentik-dev/agentik-relay/tree/a326550/history/sittings
agentik-agents-design-03-review: agentik-dev/agentik-agents, "design/03: Adversarial review round, 2026-09-05 (with raw findings and credential-setup notes)", 2026-09-05, https://github.com/agentik-dev/agentik-agents/blob/78ce312/design/03-review-2026-09.md
agentik-relay-nice-to-have: agentik-dev/agentik-relay, "relay: what a review or a packet left open, none of it blocking", 2026-09-30, https://github.com/agentik-dev/agentik-relay/blob/a326550/NICE_TO_HAVE.md
