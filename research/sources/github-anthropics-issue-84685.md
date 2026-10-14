---
url: https://github.com/anthropics/claude-code/issues/84685
title: "Multi-agent: EnterWorktree/isolation state is session-global — concurrent subagents hijack each other's cwd and guard identity"
author: a Claude Code user (issue reporter; handle not recorded)
published: 2026-08-07
accessed: 2026-10-14
kind: reported
---

## What it says
- Report on Claude Code 2.1.223 (macOS), with a later comment on 2.1.228: worktree isolation state is shared across all concurrent subagents in a session instead of tracked per subagent, and the last writer wins. When one agent calls `EnterWorktree`, the working directory and isolation identity of the others change.
- Four incidents in one day, plus follow-ups: two implementer subagents placed in one worktree; a second agent's shell directory silently moved into the first agent's worktree; the isolation guard's believed identity drifting across three worktrees within seconds; a read-only triage subagent affected too; a bare `git commit` landing in another agent's repository and a later `git commit --amend` rewriting another agent's branch (recovered with `reset --hard`); a parent `EnterWorktree` leaving background subagents unable to run even `pwd`.
- The report notes that linked worktrees share refs and object storage, so one agent's ref-rewriting operation can change another agent's branch.
- Expected behaviour as the reporter states it: a unique worktree per concurrent subagent, per-agent isolation identity, and a guard that never advises running from another live agent's worktree.
- Status as I read it: marked stale on 2026-08-28 and closed as not planned on 2026-09-11 by a bot for inactivity.

## Limits
- One user's report with no formal reproduction script; I did not reproduce it. Closure by a bot for inactivity does not show a fix. Version 2.1.295 (8 October 2026) lists a fix that stops subagents in a linked worktree from showing the parent's git state (code-docs-changelog-agents), which may or may not address this.

## Used in
- research/synthesis/field-5.md
