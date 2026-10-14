---
repo: agentik-dev/agentik-session
path: the git history from 89c69a8 to e8477a7; design/review-r6.md, NICE_TO_HAVE.md, claude_session/profiles.yaml, README.md
commit: e8477a7
title: "agentik-session at its head on 2026-10-14: the rf1-research-fixes merge"
author: agentik-dev (the suite owner)
published: 2026-10-14 (the merge 86ac60a and the head e8477a7)
accessed: 2026-10-14
kind: our-use
---

Read on 2026-10-14 in the attached checkout at e8477a7: `git log --oneline` from 89c69a8 to e8477a7 (25 commits; 63 in all at e8477a7); `git merge-base --is-ancestor 86ac60a e8477a7` (true); `git show --stat` and the message of the merge 86ac60a and of its commits 079fef6, 1a4254d, b8bf803, 2aa18b3, b40baa8, 1c990fe, 36fedbc and aad645c; the diff of 2aa18b3 over design/review-r6.md; the removed and added lines of b40baa8 over NICE_TO_HAVE.md; design/review-r6.md lines 40-48; NICE_TO_HAVE.md lines 110-130; claude_session/profiles.yaml lines 1-30.

## What it says
- The merge: 86ac60a (2026-10-14 09:55:41 -0700) is "merge rf1-research-fixes: the research site's findings (cautious windows, cache conditions and prices, the miss term, hook numbers, dated print-mode behaviour)". It touches 11 files, 44 insertions and 15 deletions, and is an ancestor of the head e8477a7 (2026-10-14 11:06:21 -0700, "README: rendered after S30 and the research follow-ups (make readme, run by the owner)").
- The hook timeout: commit 2aa18b3 ("review-r6 C3: the default command-hook timeout is 600 s, not 60 s, per Claude Code's "Hooks reference" as of 2026-10-14") changed design/review-r6.md line 44 from "Claude Code's 60 s default" to "Claude Code's 600 s default", and section 5's "up to 60 s" to "up to 600 s". Its message says the 60 s left in C3 and E8 is the lock's stall, and that no constant derived from the old figure: hooks.json declares 5 to 15 s per hook.
- The cache lifetime and prices: before commit b40baa8, NICE_TO_HAVE.md said the wake lands past "the main loop's 1h TTL" with no condition, and that a capped wake "reads a warm cache at 0.1x". At the head, line 120 says the main conversation, `-p` runs included, "gets the 1h TTL only on a Claude subscription within plan usage; on usage credits, an API key or a cloud provider it gets 5m", citing "How Claude Code uses prompt caching" as of 2026-10-14. Line 121 says "a read is 0.1x on most models, 0.05x on Opus 5.5 and Sonnet 5.5, and 0.025x on Fable 5.1 and Mythos 5.1", citing Anthropic's "Pricing" page as of 2026-10-14, and prices the audit's 4.8M rewritten tokens per model as a range.
- The window table: commit aad645c added 11 comment lines to claude_session/profiles.yaml and changed no value. Line 13 reads "The table is deliberately cautious: it keys on the family, not the version, and reads 200k for a family unless every model this setup runs in it has 1M." The table still reads 200000 for opus, sonnet and haiku, and 1000000 for fable, mythos and opus-1m.
- Added for docs/summary.md, read at e8477a7: README.md line 59 (PreCompact "blocks an automatic compaction (a sitting restarts instead) and lets a `/compact` you type run"), line 81 (the `models:` table gives opus, sonnet and haiku 200k, with "Caution: Claude Code runs Opus 4.7 and later on 1M unmarked"), line 101 (the PostToolUse hook "reads the transcript's new lines" and writes the meter), line 103 (`CHECKPOINT` at the profile's `checkpoint_at`, 80%: "bring the charter current, commit"), and lines 105-107 (a RESPAWN close, and `agentik session run` starting `claude` again behind a fresh `--session-id`; it "never compacts or resumes"). Also NICE_TO_HAVE.md lines 118-121, and `git show --stat` of 2aa18b3 (one file, design/review-r6.md, 2 insertions and 2 deletions) and b40baa8 (one file, NICE_TO_HAVE.md, 5 insertions and 3 deletions).

## Limits
- The 2026-10-14 commits answer this site's first refute round, so part of the record now echoes this site. They change wording, comments and one design record; none records a new run of the tool. Their messages cite vendor pages read that day, which this note does not re-check.
- Read by commit message, diff and the line ranges above, not whole files.

## Used in
- docs/index.md
- docs/summary.md
