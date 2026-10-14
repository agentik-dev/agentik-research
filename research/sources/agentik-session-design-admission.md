---
repo: agentik-dev/agentik-session
path: design/admission-r1.md
commit: e7f0723
title: "agentik-session: admission for helper spawns (admission r1)"
author: agentik-dev
published: 2026-10-10
accessed: 2026-10-14
kind: our-use
---

## What it says
- Section 1, the problem: a burst of helpers must not fail at the usage limit, and at least 90% of each five-hour window should be used. The record cites Claude Code documentation (as of v2.1.290): helpers "count toward the same usage limits as your main conversation"; at the limit a background helper is marked failed and its work is re-sent; `claude -p` children stop and are offered no wait; `autoContinueAtUsageLimit` (default true) resumes only an open interactive session and re-arms at most twice in a row; a Fable model has its own limit, past which it uses usage credits and, in `-p`, Claude Code bills it without asking. All of these are the repo's quotations of Anthropic's documentation, not checked here.
- Section 2: admission sits at `agent.spawn` in a Claude Code Mod (an early-access plugin module); policy lives in pure, tested Python; one ledger per machine; refusal is on projected peak, never on pace; it ships in `observe` mode (records, never refuses).
- Section 3.2: the burn model fits points-per-minute against helpers in flight by least squares over 10-minute intervals, with seeds until 20 intervals exist; peak = current reading + burn times minutes to reset + each running helper's remaining life times its weight + the new spawn's.
- Section 3.3: ceiling 97, margin 3 in observe mode; verdicts admitted, deferred (five-hour), denied (seven-day), unread, stale; the exact texts the model would see.
- Section 3.6: the target is a floor on use and the ceiling is a cap; `report` marks a window `held` or `idle`, with `under 90` flagged.
- Section 4, proofs: lists the documented behaviour of Mod hooks it relied on, and six unverified claims (P1 to P6), including whether a helper's responses move the reading and whether a Mod can see the Fable limit.
- Section 8 and OPEN-QUESTIONS: the owner's answers shaped the design (see agentik-session-open-questions).

## Limits
- Spelling: the file names the command line and the repository by their pre-rename spellings. This note writes the command line as `agentik session` and the repository as agentik-session, so a reader can search both sides.
- Observe mode only at this commit; nothing is refused yet (SKILL.md and RUNBOOK say so). The rate model, margin and seeds are unproven until P3 runs.
- The Claude Code documentation quotations and the Mod API belong to Claude Code 2.1.290 to 2.1.296; they may have changed.

## Used in
- research/synthesis/tools-session.md
