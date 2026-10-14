---
repo: agentik-dev/agentik-commons
path: history/sittings/2026-10-13-1.md
commit: e456f4b
title: "Sitting 2026-10-13-1: packet agentik-r1-commons (builder)"
author: agentik-dev (the suite owner)
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- This is the only charter in commons and the shape the guide expects: a table (goal, budget, pin, wall), an Acts table with done-ness, a Fix round, a Handover and an Exit line.
- Budget: 120 turns, 150k context, checkpoint at 80%, about 90 tool calls. Pin: a branch and a worktree off main. Wall: no push, amend, rebase, network, plugin command or relay binary.
- Acts: front door (8 tests, 95 lines), canonical hygiene with `renamed` and swapped exits plus `bounded` (27 tests, self-scan 0), the marketplace and its check and the local target (5 tests), `sync` and its pin file (4 tests), then the guide, sibling paragraph, README, allowlist, licence and acceptance (`make check` 0, acceptance lines 1 to 16 as given).
- A fix round of five items from "the coordinator" (a second agent): F1 a trailing empty PATH entry counts as the current directory; F2 hygiene read errors exit 2 with one stderr line; F3 `sync` ignores CDPATH; F4 `.hygiene-live` declares the running chains (packet line 9 amended); F5 hygiene reports `outside_files` and `outside_lines`. Items N1 to N5 went to `NICE_TO_HAVE.md`.
- Handover: each tool packet runs `scripts/sync`, adds the hash check to its `make check`, swaps its hygiene-test exit codes, gives `renamed` its exception rows and deletes its own marketplace file; the session repo's conventions file becomes a pointer to the guide; marketplace versions are bumped by hand at each release; the guide's §9 admits charters in every packet's may-touch list. "decide, owner: none open."
- Exit: five acts and the fix round committed on the branch; `make check` 0; nothing pushed.

## Limits
- Self-reported by the builder session; the branch's commits are not in the public history (the pin names a commit the public repo lacks, since the public history starts at one squashed commit).
- Test counts here are at the time of the sitting; this survey re-ran the suite on 2026-10-14 (see agentik-commons-tests).

## Used in
- research/synthesis/tools-commons.md
