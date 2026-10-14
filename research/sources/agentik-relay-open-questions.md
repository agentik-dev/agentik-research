---
repo: agentik-dev/agentik-relay
path: OPEN-QUESTIONS.md
commit: a326550
title: "Decisions for the owner"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- At this commit the file holds no open question. It lists one decision taken without asking and the owner's answers to entries 3 to 12.
- Decided without asking (2026-10-10, by the observer, reversible): a night run without `--until` caps a usage-limit pause at 6 hours and stops past it, as the usage-limit design proposes.
- Answered: one repo per night; the relay pushes after a night; `agentik relay words` for answers during a night; an orchestrator writes only its own repo; notices go to the log only during quiet hours; a real parser for the guard's shell reader; the owner writes the zsh test table later; a verify limit per repo; only the limited model's rows pause; an opt-in second model for less critical repos.

## Limits
- It is a pointer file; the reasons are in `DECISIONS.md` and `design/`.

## Used in
- research/synthesis/tools-relay.md
