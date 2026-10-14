---
repo: agentik-dev/agentik-commons
path: .claude-plugin/marketplace.json
commit: e456f4b
title: "agentik (marketplace)"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- A marketplace named `agentik`, owner `agentik-dev`, with five plugin entries: session, decisions, respeak, relay and agents. Each source is `{"source": "git-subdir", "url": "https://github.com/agentik-dev/agentik-<tool>.git", "path": "plugin"}`, so each plugin lives in the `plugin/` subtree of its own tool repo.
- Versions on 2026-10-13 (per the NICE_TO_HAVE note that they are each main's version that day): session 2.0.0-alpha.14, decisions 0.8.0, respeak 0.8.0, relay 0.1.3, agents 1.2.0.
- One-line descriptions, each under 200 characters. Session: profiles and a doctor, one resolved configuration per session offered to dependent plugins. Decisions: verbs over one sectioned `DECISIONS.md` per repo, the plugin carries no data. Respeak: machine shorthand for long sessions plus a translator for human-facing narratives. Relay: queued packet runs, one child per worktree, and guards (one commit per act, no remote writes). Agents: delegate review to API-billed headless agents under a budget cap, mechanical work to a local model, with cost reports.

## Limits
- The file's shape is checked by `marketplace-check`; nothing in commons shows that `claude plugin marketplace add` from the public repo was run (the packet forbids plugin commands; r1 proof P1 is open).
- Versions are a hand-copied snapshot and can drift after a release.

## Used in
- research/synthesis/tools-commons.md
