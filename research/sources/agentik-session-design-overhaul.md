---
repo: agentik-dev/agentik-session
path: design/overhaul-r1.md
commit: e7f0723
title: "agentik-session r2: the overhaul (r1 of the design)"
author: agentik-dev
published: 2026-09-22
accessed: 2026-10-14
kind: our-use
---

## What it says
- Read by headings: sections 1 to 2.2, 2.5, 2.7, 4, 7 (D13) and 8. Sections 3, 5 and 6 were skimmed; section 6 sizes a private product's public-readiness and is not used.
- Section 1.1 describes version 0.1.0: 15 test files, 184 tests, a statusline-sampled budget with a cadence that tightened toward a reserve (every 25 prompts with plenty left, every 3 in the reserve), and a scheduler that ran `claude -p --resume <id> --fork-session` when the usage window reset (overhaul-r1.md:9-16).
- Section 1.2 retires the whole fork-and-resume chain, the statusline sensor and the five-hour window as the primary budget. It maps each of the four defects in the 2026-09-12 bug report to a structural cause and a replacement: a handoff cannot be both the last message and a wait on children; a sensor that depends on rendering measures the UI, not the sitting; chaining sessions is the anti-pattern the brief names (a fresh context for each sitting); state about the last run belongs to a timestamped ledger (overhaul-r1.md:18-29). It states the budget as the sitting, not the window: 180k context, 400 turns, with the 200k window above them.
- Section 2.1: a profile is one named launch posture and everything the sitting is measured against; layers resolve lowest first (shipped profiles, user file, repo file, repo local file, launch profile, session overlay, invocation flag). Amended 2026-09-28: the model decides the window (a `models:` table), the role decides the ceilings. Claude Code strips `[1m]` from the API model id, so a transcript's `message.model` cannot show a 1M window; the SessionStart payload's `model` keeps it. The charter of the sitting that made the change says it read this from Claude Code 2.1.284's binary and transcripts, not from a live hook run (see agentik-session-history-sittings). Builders, helpers and relay children stay on 200k by design.
- Section 2.2: one meter, the PostToolUse hook on every tool. It parses only the bytes appended since its last run. A turn is one deduplicated assistant message; context is the last assistant message's input plus cache-creation plus cache-read tokens (output excluded). Silent under 80% of both ceilings; one CHECKPOINT line at the first crossing; then every tenth tool; every tool past 100% with the exit rule; UserPromptSubmit adds one line per prompt. The meter exits 0 always and prints at most 400 bytes, and the model exits by the rule the profile carries; under the relay the driver kills the child at the ceiling (overhaul-r1.md:72-76).
- D13 (line 226): the meter is silent under 80% because a line on every tool is context spent on the meter: "The alternative, a line every tool, is the meter eating what it meters."
- Section 2.2 ledger: SessionEnd appends one line per session (turns, tokens, median and max context, profile, model, builders read from the undocumented `subagents/` transcript directory). No message content, ever.
- Section 2.5: the plugin's hooks are one shim. The helper rule: a helper a sitting spawns resolves as a builder and is marked `CLAUDE_SESSION_HELPER=1`.
- Section 4: a table of invariants, each with a test and a runtime guard (meter definitions equal an outside usage report's on one fixture; the meter never blocks and never floods; incremental parsing is exact; hooks are time-bound at 5 s, 10 s for SessionStart, 15 s for SessionEnd; one gate per tree).
- Section 8, the measure: cost is turns times context. Baselines from the design sitting itself: a design sitting at 134k context and 20 turns at the close reading, plus two research legs of 53k and 90k tokens; the largest single session was 37.6% of a week's burn (11,744 turns, 211k median context). Target: no sitting above the two ceilings, so no session above 5% of a week. The sentence at overhaul-r1.md:242: "The design is wrong if a session plugin sitting spends more than the work it manages."

## Limits
- Spelling: the file names the command line and the repository by their pre-rename spellings. This note writes the command line as `agentik session` and the repository as agentik-session, so a reader can search both sides.
- A design record, not a result. The week's-burn figure comes from a separate usage report in a private repository that this note did not open.
- The 180k and 400 values trace to rulings (R25-87 and a cross-repo ledger entry) held outside this repo; the repo does not derive them.
- Section 7 still carries "Recommend" wording on items the file itself says were ruled by 2026-09-23.

## Used in
- research/synthesis/tools-session.md
