---
repo: agentik-dev/agentik-session
path: design/respawn-r1.md
commit: e7f0723
title: "claude-code-session: the successor starts itself (respawn r1)"
author: agentik-dev
published: 2026-10-10
accessed: 2026-10-14
kind: our-use
---

## What it says
- Section 1, the problem and its evidence (respawn-r1.md:7-11): at 80% of either ceiling a sitting brings its charter current and writes a Next act opening `RESPAWN`; the process then idles until its owner opens a terminal and pastes a start line. An observer's log of 2026-10-05 shows one orchestrator reaching its checkpoint at 00:04, 03:30 and 08:12 and being restarted by hand at 01:57, 06:31 and 09:35: gaps of 113, 181 and 83 minutes, 6 h 17 min in all. Quote: "The handover itself already works without the owner. Only the paste is manual, and the paste is what holds work overnight."
- Section 2 maps the four retired defects to this design: no resume, no fork, no `-p`, no scheduler; every start is a fresh session id.
- Section 3.1, the command: `claude-session run [--chain] [--cap] [--floor] [--settle] -- <claude args>`. Each start runs `claude --session-id <fresh uuid4> <args>` with the owner's arguments byte for byte. It refuses to start without a TTY, inside another Claude Code session or chain, with an unknown flag (an allowlist, not a denylist, because a refuter found four resume-or-detach flags a denylist missed), without `claude` on PATH, or when the chain's lock is held. Resume, fork, print, continue, session-id, background and tmux flags can never join the list.
- Section 3.2, the marker: `checkpoint --respawn --charter FILE` requires an explicit charter, reads only the `## Next act` section, requires its first non-blank line to match `^RESPAWN(?=[:.\s]|$)`, and writes `respawn.json` with five keys. Only a main-thread Bash call confirms it (the PostToolUse hook writes `respawn-main.json` with the marker's sha256), because an in-process helper's Bash carries the sitting's own session id (measured by the refuter).
- Section 3.3, ending a sitting: three hook stamps (`activity.json`, `turn-ended.json`, `respawn-main.json`). The sitting is ready when the turn end is newer than the marker, no activity is newer than the turn end, and both stand for `settle` (60 s default). Then SIGTERM, and SIGKILL after 30 s. Measured long waits the design must tolerate: Bash calls of 380, 394 and 602 s that wrote nothing, and an AskUserQuestion dialog waiting 6,543 s. The launcher never opens a transcript.
- Section 3.4 to 3.5, the decision and guards: a restart needs a confirmed marker, a charter still opening on RESPAWN and touched in this sitting, no fresh STOP file, restarts in the past 24 h below the cap, and a sitting at least `floor` old. The cap of 12 is justified from the measured night: sittings of 3 h 34 min, 1 h 33 min and 1 h 41 min suggest up to about fifteen restarts a day without the gaps. The cap fails closed on an unreadable ledger. A 10 s grace precedes each restart; Ctrl-C ends the chain.
- Section 3.8: it never compacts or resumes, never restarts after a crash, ends only a sitting it will restart, never leaves the owner's terminal, never reads content.
- Section 3.9, what it cannot see: background work outliving the main turn, a prompt typed but not submitted, and a `/clear` (which changes the session id; the chain then stops, the safe direction).
- Section 7 lists proofs. P1 and P2 measured 2026-10-10 on Claude Code 2.1.296 and held: `claude --session-id` is honoured, and a positional `/loop 30m ...` arms. P4 and P5 measured the same day in one headless run and held: a helper's hook payloads carry `agent_id`, the main thread's do not, Stop carries none, and the main thread's Stop fired while a helper still ran. P3 (SIGTERM ends it cleanly), P6 (owner typing) and P7 (a blocked Stop) are listed as owed or unproven.
- Section 6 pins 18 acceptance criteria as named tests on a fake `claude`.

## Limits
- Design record by the owner's agent, refuted by one refuter round (verdict BLOCK at 304a1e7, then folded). P3, P6 and P7 are open in this file.
- The 12-per-24-hours cap is derived from one observed night.

## Used in
- research/synthesis/tools-session.md
