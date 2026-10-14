---
repo: agentik-dev/agentik-session
path: design/review-adv6.md, design/review-adv10.md, design/review-adv11.md
commit: e7f0723
title: "ADV6, ADV10 and ADV11: three adversarial reviews of agentik-session (design/review-adv6.md, review-adv10.md, review-adv11.md)"
author: agentik-dev
published: 2026-09-23
accessed: 2026-10-14
kind: our-use
---

## What it says
- Read by headings, openings, verdicts and four findings (design/review-adv6.md, review-adv10.md, review-adv11.md). Each is one `claude-opus-5-5` reviewer who reproduced each finding in a temp directory or with a targeted test and fixed nothing.
- ADV6-3 (medium): every hook ran the live checkout, or the current directory's tree. Adding a conflict marker to a copy of `meter.py` made the wrapper exit 1 with `SyntaxError` on `hook PostToolUse`, so one bad merge silenced the meter and CHECKPOINT in every session; and a builder's half-edited tree in the current directory could drive the meter that tells the builder when to stop. Remedy: install a frozen copy and run it with `python -P`.
- ADV10-1 (high): the gate's suite outlived the relay's kill, because the child ran in a new session and a SIGKILL to the caller's group did not reach it; the lock then let a second suite start beside the first. Remedy: a lifeline pipe to a guardian in the child's group.
- ADV11-5 (medium): when the baked interpreter or the frozen tree is gone, a hook wrote one stderr line (not shown by Claude Code on exit 0) and a marker, so the meter, CHECKPOINT and the `deny` spawn gate all failed open with no signal. Remedy: print a systemMessage on SessionStart.
- Verdicts: ADV6 "not ready to carry" the private product until three findings were fixed; ADV10 not ready until two were fixed; ADV11 ready once two small fixes land. Each ends with three tests to add first.
- Other findings (headings only): hygiene passing secrets, symlinks and UTF-16/UTF-32 text; the whole-suite acceptance rule being a denylist that 10 of 10 variants passed (ADV10-4) and 18 new shapes passed (ADV11-4); the depth guard failing open (ADV10-10).

## Limits
- Spelling: the file names the command line and the repository by their pre-rename spellings. This note writes the command line as `agentik session` and the repository as agentik-session, so a reader can search both sides.
- Self-review by the same toolchain; reviewers are the owner's agents. Findings are reproduced by the reviewers, not independently.
- Only the opening, the findings list, the verdict and four findings were read in full.

## Used in
- research/synthesis/tools-session.md
- docs/tools/session.md
