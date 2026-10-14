---
repo: agentik-dev/agentik-commons
path: NICE_TO_HAVE.md
commit: e456f4b
title: "Nice to have"
author: agentik-dev (the suite owner)
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- Nine items, all dated to the 2026-10-13 build. Two are risks in the rollout: an untested respawn (a launcher's successor might start after a tool packet deleted its repo's own `marketplace.json` but before the switch, and nobody has tried what it loads from a folder-source marketplace whose file is gone; the fix is a scratch-config test or no tool-packet merge before the switch), and a `mv` then `ln -s` race in a folder move (a writer could recreate the old folder and split state; the cold window removes the writers; a helper that refuses while `lsof +D` shows the folder open would remove the race).
- Three are gaps in commons' own tests: `scripts/bounded` came over byte-identical but its tests stayed in the session repo; the marketplace versions are the ones on each main on 2026-10-13 and `marketplace-check` only checks that they are semver, so drift after a release would go unseen unless a local target compares them with each checkout's plugin file; `scripts/sync` refuses commons only by resolved path, so a second clone of commons can be overwritten.
- Items N2, N3 and N5 are defects or edges: `make local-marketplace` splits an `AGENTIK_CODE` holding a space, accepts one that does not exist, and exits 2 under `make -f` from another folder; the semver check's `\d` also accepts non-ASCII digits; a tool named `help` is listed but cannot be dispatched, and `agentik help nosuch` exits 3.
- N4 is a ruling, not a defect: the `renamed` scan treats `NICE_TO_HAVE.md` and `CHANGELOG*` as records at any depth, and `design/`, `bugs/` and `history/` only at the repo root.

## Limits
- Written by the builder and coordinator at the end of one sitting; it lists items found, not a ranked backlog, and nothing says which have since been fixed.

## Used in
- research/synthesis/tools-commons.md
