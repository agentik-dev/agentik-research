---
repo: agentik-dev/agentik-session
path: design/mod-r1.md
commit: e7f0723
title: "agentik-session: what becomes a mod (mod r1)"
author: agentik-dev
published: 2026-10-11
accessed: 2026-10-14
kind: our-use
---

## What it says
- Section 1 (mod-r1.md:7-9): the plugin spoke only to the model. The owner saw the zone only through `/session:status`, never saw a respawn's settle, and learned of an auto-compaction after it.
- Section 2 and 3: the mod draws a one-line band above the prompt and records the engine's own usage reading; everything that guards or holds safety (the spawn gate, the meter and zones, the stamps, the launcher, the never-compact block) stays a classic hook or CLI path, because a mod hook that times out or throws is skipped and the action goes ahead.
- Section 6: P1 measured 2026-10-12 on Claude Code 2.1.296: eight children (five `-p`, three interactive) with a module that threw, was refused or was unloaded still wrote the classic files; 170 failing hook calls in one interactive session were each skipped and the module stayed loaded; no three-crash unload was found. Not proven: an unload in an interactive session and an untrusted folder.
- Section 8 decides auto-compaction: block `auto`, let an owner-typed `/compact` pass, by the portfolio ledger's rule that a sitting restarts rather than compacts. It states the cost: "The cost stays: a blocked `auto` keeps a sitting whole to its hard limit, where the recovery compaction is refused and that request fails."
- Section 8 also records that the engine's context is an estimate while the meter's is a usage sum, so 5 points of drift may be noise, and that classic hooks also fail open on a timeout unless `onFailure: "block"` (Claude Code 2.1.295 and later) is set; the plugin sets it nowhere.
- Section 9: the three sibling plugins stopped being hard dependencies on the owner's word of 2026-10-11, that a user is never forced to install several plugins.

## Limits
- Spelling: the file names the command line and the repository by their pre-rename spellings. This note writes the command line as `agentik session` and the repository as agentik-session, so a reader can search both sides.
- Design record, unrefuted at its first writing; some rows were later refuted and folded (see NICE_TO_HAVE).
- Mod API facts are for Claude Code 2.1.296 ("early access").

## Used in
- research/synthesis/tools-session.md
