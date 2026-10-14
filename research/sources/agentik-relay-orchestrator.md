---
repo: agentik-dev/agentik-relay
path: design/relay-orchestrator-r1.md
commit: a326550
title: "agentik-relay design: orchestrator rows (r1)"
author: agentik-dev
published: 2026-09-29
accessed: 2026-10-14
kind: our-use
---

Read the header, sections 1 to 3 and 9 (the problem, the row kind, how a sitting starts, forks).

## What it says
- Problem: before this design, two downstream repos' orchestrators ran as attended sessions under `/loop`; at the 80% context checkpoint they wrote `RESPAWN` and stopped, and the owner restarted them by hand. Four gaps kept them off the relay: RULES forbade helpers, a repeated row stopped the night `no-progress`, a child could not start a night, and a headless sitting could not show a selector (question UI).
- Design: one new row kind, `kind: orchestrator`. The relay restarts it fresh after each green, merged sitting; its no-progress key is the charter's Next act. Between its sittings the relay runs the build rows it added, one child at a time. Its example budget is 400 turns, 400,000 context, $150, 6 h wall.
- Stops added for an orchestrated night: `done`, `waiting`, `orchestrator-red`, `merge-held`, `queue-invalid` (read in internal/relay/types.go).
- Measurement (2026-09-29): one `claude -p` helper asked for one foreground `Agent` call got one, with no permission denial, in 2 turns for $0.74. The Workflow tool is present under `-p` but only runs in the background (returns a task id and notifies), so helpers are allowed and Workflow stays off.
- Forks the design could not settle (section 9), each with the rejected alternative: one night over several roots (rejected: a rewrite, and a lock per root would reopen the fork-storm door); nobody pushes at night (rejected in favour of the relay pushing `main` through the pre-push gate); answers by editing `OPEN-QUESTIONS.md` in the root (rejected: it would block the next merge); a row that writes sibling repos (rejected: its own record would be needed). The owner ruled all four as recommended; see `agentik-relay-decisions`.

## Limits
- A design written by a helper in an owner session and revised after one refuter round; it names private repos and an owner timezone, not repeated here.

## Used in
- research/synthesis/tools-relay.md
