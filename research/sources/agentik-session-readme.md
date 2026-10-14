---
repo: agentik-dev/agentik-session
path: README.md
commit: e7f0723
title: "agentik-session (the repository README)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- The tool gives each Claude Code session one named profile, a budget with a hard stop, and a written charter (README.md:3). The stated reason is unattended relay runs: a driver spawns builder sessions, each builder may spawn agents, and nobody watches the terminal (README.md:7).
- Ten profiles ship: frontier, balanced, local, local-only, scratch, review, packets, builder, orchestrator and orchestrator-opus (README.md:63-76).
- The model decides the window: fable and mythos 1M, opus 200k (or 1M as `opus[1m]`), sonnet and haiku 200k (README.md:81). The role decides the ceilings: 180000 context tokens and 400 turns for every role, except the two orchestrator roles, which get 400000 context tokens and 400 turns on a 1M window (README.md:82).
- The meter is the PostToolUse hook. After every tool call it reads the transcript's new lines and writes `meter.json`, the used share of two ceilings, context and turns (README.md:101).
- Zones follow the larger share: clear from 0%, notice from 80%, wind-down from 90%, reserve from 92%, exhausted at 100% (README.md:102).
- `CHECKPOINT:` arrives at the profile's `checkpoint_at` (80%), then every tenth tool; `EXIT:` arrives at 100% (README.md:103-104).
- A RESPAWN close is the sitting's last act: `agentik session checkpoint --respawn --charter <file>`, run through Bash. The verb reads only the charter's `## Next act` section, whose first line must open on `RESPAWN`; otherwise it exits 2 and writes nothing (README.md:105).
- `agentik session run` is the restart launcher. It starts `claude` with the same arguments each time behind a fresh `--session-id`, ends a confirmed RESPAWN sitting after its turn has stood `settle` seconds with no helper call open, waits 10 s, and starts the next. It never compacts or resumes and never restarts after a crash (README.md:107). Guards: `cap: 12` restarts in any 24 h, `floor: 600` s, `settle: 60` s, and a STOP file (README.md:106-107).
- PreCompact blocks an automatic compaction, so a sitting restarts instead, and lets a `/compact` the user types run (README.md:59).
- The spawn gate is the PreToolUse hook under four postures: off, signal (default, never blocks), ask, deny (README.md:108).
- Priority levels S1 to S4 and a pacing rule (`WAITING <n>` stops the loop) are on in every shipped profile; the README says no hook enforces either (README.md:111-115).
- A charter has five parts (title line, table of goal, budget, pin, window, agents; Done-ness; Handover; Next act) and stays under 4,096 bytes.
- Status line: version v2.0.0-alpha.14, rendered 2026-10-13, 1116 tests (README.md:171).
- Credit: two starting ideas, reading the reset time from the statusline `rate_limits` payload and lifting `session_id` from a headless run's JSON to emit a `claude --resume` line, come from a public third-party tool, claude-nextsession by pcx-wave (MIT); the README says the implementation here is new.

## Limits
- Spelling: the file names the command line and the repository by their pre-rename spellings. This note writes the command line as `agentik session` and the repository as agentik-session, so a reader can search both sides.
- The repo's own description of itself, written by its one owner. It states mechanism and numbers, not outcomes.
- "A budget with a hard stop" (README.md:3) sits against the design record, which says the meter never blocks and the model exits by rule (see agentik-session-design-overhaul). Treat "hard stop" as a signal plus a rule, plus the relay driver's kill in unattended runs.
- The model names (Fable 5.1, Opus 5.5) are the repo's, dated 2026-10.

## Used in
- research/synthesis/tools-session.md
