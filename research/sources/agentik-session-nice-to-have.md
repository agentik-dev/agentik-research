---
repo: agentik-dev/agentik-session
path: NICE_TO_HAVE.md
commit: e7f0723
title: "agentik-session: what a review left open, none of it blocking"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
All 159 lines were read. The file is the repo's failure and observation record, dated 2026-09-28 to 2026-10-13. The entries that carry evidence:
- Idle compaction (NICE_TO_HAVE.md:82): on Claude Code 2.1.296 a setting `idleCompaction`, default on, fires after about 54 idle minutes above 200k tokens, and compacted two sittings overnight, against the owner's rule that a sitting never compacts. A PreCompact hook cannot tell the idle pass from an ordinary auto-compact, because both carry `trigger: "auto"`, so a hook block would block both. The suggested remedy is a `doctor` warning when neither `idleCompaction: false` nor `autoCompactEnabled: false` is set. This is the repo's report, observed once, not a test.
- Prompt-cache audit (NICE_TO_HAVE.md:108-111), by the observer on 2026-10-12, from usage fields only, 649 transcripts, 2026-10-09 to 2026-10-12: idle wakes missed the one-hour cache because the pacing rule said only a long delay, with no cap and a scheduled wake of 3600 s lands at 3636 to 3648 s, past the main loop's one-hour time-to-live. 26 such misses over three days rewrote about 4.8 million tokens (about 235k to 265k each, at the one-hour write price the audit gives as 2x). The proposed fix, cap an idle wake at 3300 s so it reads a warm cache at 0.1x, is not built. Nine more top-level calls after short gaps (0.1 to 29 min) reread only the 25,387 or 30,622 token system-plus-tools prefix and rewrote the rest, 1.17M tokens, cause unknown. Read shares were 98% for launcher sittings, 97.6% for relay `-p` children and 97% for subagents (five-minute TTL; 14M tokens of misses after 5 to 60 minute pauses, kept on 5m because one-hour writes would cost more than they save).
- A helper call that no batch resolves (NICE_TO_HAVE.md:10): of 2026-10-11's sessions, 13 held call files older than 30 minutes; unverified with a real `claude`. Related notes at lines 90-93 (calls that stick and hold a RESPAWN; two entries that appear in no transcript).
- Silent respawn failures: a floor-held respawn is silent (NICE_TO_HAVE.md:124-125; one chain's sitting marked RESPAWN 9 min 16 s in, was held by the 600 s floor, and idled 47 minutes until the owner acted); and (NICE_TO_HAVE.md:159, 2026-10-13, seen once) a sitting wrote `RESPAWN` in its charter and stopped its loop but never ran `checkpoint --respawn`, so the chain stalled with `claude` idle at 309k of a 400k ceiling until the owner looked, after which the launcher logged `no-marker` and the owner restarted by hand. A guard that prints the one command to run is proposed, not built.
- Hook cost (NICE_TO_HAVE.md:57): PreToolUse on every tool adds about 58 ms per tool call (median of 20), and Stop about 58 ms per turn end. The PreToolUse wildcard adds a hook process, with a 5 s timeout, to every tool call.
- The meter's first reading (NICE_TO_HAVE.md:122): a session's first PostToolUse can run before the transcript holds the assistant line, so `meter.json` reads 0% context (the band showed 0% where `status --transcript` gave 31.1%) until the next tool call.
- Window resolution gaps (lines 24-36): the SessionStart payload carries no `model` under `claude -p`, `--continue`, `--resume` or `/clear`, so the declared model decides and an orchestrator profile on plain Opus can read 1M; `claude --resume` from a shell without the profile variable resolves as the default role (180k on a 1M window); a `/model` switch between `opus` and `opus[1m]` stays unseen until the next SessionStart; a relay child's ceilings come from the default role unless set (a Fable child told to checkpoint at 144k while its row allowed 400k).
- Ledger gaps (lines 16-18): five of 174 sessions have two or three ledger rows (resumed sessions), so `report` counts their tokens more than once; `max_context` includes helpers.
- `make readme` (lines 84-86): one render round of a 23 KB prompt took 523, 529 and 566 s, nearly all model thinking; of 13 render rounds since 2026-09-24 that finished, 10 passed the verifier.
- Review rounds (lines 38-80, 95-107, 139-157): nothing blocked; each lists reproducible edge cases with a level.

## Limits
- Spelling: the file names the command line and the repository by their pre-rename spellings. This note writes the command line as `agentik session` and the repository as agentik-session, so a reader can search both sides.
- Observations by the owner's agents (the observer), several marked by the file as seen once, not reproduced or unconfirmed. The prompt-cache audit's script is not in the file. No outside check.
- Claims about Claude Code's idle compaction, cache TTLs and cache prices are the repo's, and should be checked against Anthropic's documentation (phase 2).

## Used in
- research/synthesis/tools-session.md
