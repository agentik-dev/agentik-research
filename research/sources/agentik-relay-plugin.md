---
repo: agentik-dev/agentik-relay
path: plugin/
commit: a326550
title: "agent-relay plugin: hooks, agents and commands"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

Opened: `plugin/hooks/hooks.json`, the first 1,000 to 1,800 characters of `agents/builder.md`, `agents/adversary.md`, `agents/attendant.md` and `commands/resume.md`, and `.claude-plugin/marketplace.json` (version 0.1.3). The other five commands were not opened.

## What it says
- `hooks.json` registers four hook events, each running the binary's `hook` verb through a shim: PreToolUse (matcher `Bash|Write|Edit|MultiEdit|NotebookEdit|Agent`), PostToolUse, Stop and SessionStart.
- The Stop guard blocks a sitting with a dirty tree or no commit at most three times (`maxBlocks = 3` in internal/hooks/stop.go), then stops nudging with a message. It acts only inside a sitting; the design page records the reason: an interactive session that ran only `pwd` in a repo with uncommitted files was blocked three times by `dirty-tree`, and a less careful session might have discarded the owner's work to stop (design/relay-r1.md section 10, "Only in a sitting", AR23).
- The `builder` agent builds one packet in its worktree, commits once per item, never pushes, never amends, and runs the verify line at most once, last, in the foreground, and never when it took longer than 540 s on main. Model `claude-opus-5-5`, `maxTurns: 120`.
- The `adversary` agent is a read-only refuter: it numbers findings with a reproduction ("No reproduction, no finding"), keeps observations apart from findings and fixes nothing. `maxTurns: 100` in the file now; NICE_TO_HAVE.md line 483 says it was 80 when the agent ran out of turns on 2026-10-11.
- The `attendant` agent answers "where is the night" from `relay status --json`, `relay report --json` and ledger lines through `jq`, never from transcripts, in under twenty lines, and never runs `relay resume`, `run` or `stop`. `maxTurns: 35`.
- `/agent-relay:resume` prints the exact `relay resume <row>` line and the worktree for the owner's own terminal and never runs it, because it would start a nested interactive session.

## Limits
- The hooks are advisory, by the README's and the design's own statement; the gate, not the hook, is what decides a merge.
- Claims about hook payload fields (`agent_id`, `agent_type`) and `maxTurns` in agent front matter are the repo's reading of Claude Code behavior; they need a check against Anthropic's documentation.

## Used in
- research/synthesis/tools-relay.md
