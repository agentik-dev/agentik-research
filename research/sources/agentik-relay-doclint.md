---
repo: agentik-dev/agentik-relay
path: scripts/doclint, Makefile
commit: a326550
title: "doclint: the doc gate (conventions section 5)"
author: agentik-dev (the suite owner)
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- At commit a326550 the relay's `scripts/doclint` has the sha256 `3040666c1e9ad08faf1befe9c2efffaff0660f0464554d240f1d07437a03fcda` (read with `git show a326550:scripts/doclint | sha256sum`). The relay's Makefile, line 6, pins that same hash as `DOCLINT_SHA`, and its `doclint` target refuses any other copy.
- The commons guide (GUIDE.md §6, commit e456f4b) says `scripts/doclint` "stays byte-identical across the repos" and gives the sha256 `26eaf2c84aadb822f8d63a0257b063afcc0ba6d9bbcf1d2d856abe4c6388341f`. The relay's copy is not that file.
- The relay's copy is 351 lines; the session repo's copy at e7f0723 is 624 lines and has the guide's hash. The relay's copy is an older shape of the gate: its packet rule refuses a short list of whole-suite commands where the session's fails closed on any runner word, and its ceiling for `design/conventions*.md` is 8,192 bytes where the session's is 9,216.
- At the relay checkout's newest commit read, 405d1e0 (2026-10-13), `scripts/doclint` and the Makefile pin still carry the 3040666c hash.

## Limits
- A hash comparison of two files; it says the copies differ, not that the difference has caused a fault.
- The commons record (agentik-r1 §7.3) leaves `doclint` as one copy to r2, so the guide's byte-identical rule is not yet enforced from commons.

## Used in
- docs/tools/index.md
