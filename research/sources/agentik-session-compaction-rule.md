---
repo: agentik-dev/agentik-session
path: NICE_TO_HAVE.md, design/mod-r1.md, design/respawn-r1.md, design/packets/s17-exit-rule-respawns.md, design/overhaul-r1.md, claude_session/hooks.py
commit: e7f0723
title: "agentik-session: the never-compact rule and what the repo recorded about compaction"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- The rule: the owner ruled on 2026-09-29 that a sitting restarts rather than compacts, "since a restart reads its brief fresh and a compaction needs the owner's hand" (packet S17, line 22, paraphrased). The launcher never compacts or resumes, and every start is a fresh context (respawn-r1.md:134). The design brief behind it is quoted as "fresh context per sitting is the whole point" (overhaul-r1.md:26).
- The only run evidence for restarts: one orchestrator hit its checkpoint three times on 2026-10-05 and was restarted by hand after gaps of 113, 181 and 83 minutes (6 h 17 min in all); the record says each restart went cleanly because the successor read its charter (respawn-r1.md:7-11). One observer's log of one night.
- Idle compaction: on Claude Code 2.1.296 the `idleCompaction` setting (default on; about 54 idle minutes; above 200k tokens) compacted two sittings overnight, against the rule; `autoCompactEnabled` also exists; the observer notes that a PreCompact hook cannot tell the idle pass from a normal auto-compact because both carry `trigger: "auto"` (NICE_TO_HAVE.md:82).
- The hook: block `auto`, pass `manual` (mod-r1.md:78). The recorded cost: a blocked `auto` keeps a sitting whole to its hard limit, where the recovery compaction is refused and that request fails.
- Passing hook output: a code comment in the hook module (lines 553-555) says that on claude 2.1.296 a passing PreCompact's raw stdout becomes the compaction's custom instructions, so a pass prints nothing; the sitting that fixed it records the same as an observation.

## Limits
- Our use, one owner, young tools. The repo holds no comparison of compaction against restart, no transcript of a compaction that lost the thread, and no measurement of fidelity; the idle-compaction event was seen once and no transcript is quoted.
- Against the Claude Code docs read on 2026-10-14: the idle conditions and the "request fails" cost are documented (anthropic-docs-settings-compaction, anthropic-docs-hooks-precompact). The docs do not say the PreCompact `trigger` for an idle pass, and they do not say a passing hook's stdout is read as instructions; the hooks reference's general stdout rule points the other way (PreCompact is not on its list of events whose stdout reaches Claude).

## Used in
- research/synthesis/field-2.md
