---
repo: agentik-dev/agentik-commons
path: tests/
commit: e456f4b
title: "agentik-commons tests (test_agentik, test_hygiene, test_marketplace, test_sync)"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Four stdlib `unittest` files hold 49 tests by `grep` (9 front door, 30 hygiene, 5 marketplace, 5 sync). This survey ran `make test` on a scratch copy on 2026-10-14 and got "Ran 49 tests ... OK" in about 12 seconds. `make lint`, `make hygiene` and `make marketplace-check` also passed.
- Front door tests drive the script through `subprocess` with a scratch PATH of fake tools: arguments (including an empty string, a glob and a `$HOME` literal) arrive unchanged with the tool's exit code; exit 3 names the repo and a non-executable file is not a tool; bad names exit 2; the list is in PATH order, first wins; a leading, middle or trailing empty PATH entry is the current directory (fix F1); help runs the tool's `--help`.
- Hygiene tests build fixtures at runtime so the test file passes its own scan, and use invented private terms. They cover per-group counts, the allowlist, binary and UTF-16 files, oversize streaming, secret shapes, symlinks, the private list (loaded, never printed, absent, required, bad line), exit codes, the `renamed` group (live files only, newest charter per chain in integer order, only declared chains live), and read errors.
- One hygiene test (comment tag ADV11-15) records a failure in the relay repo's copy: a tracked file over 4 MiB whose first line held a home path and an email passed with exit 0, scanned by path only; it is now streamed and both are counted. Another (ADV11-3) fixes "4 MiB + 1 of one line, then a home path: streamed, one hit, never a pass".
- Marketplace tests mutate the committed file in fifteen ways (name, owner, entry count, duplicate, unknown plugin, wrong source kind, wrong or http url, wrong path, string source, bad or missing version, non-list) and expect exit 1; they also check that `make local-marketplace` writes `file://` urls and otherwise the same file. Sync tests check the copy, the pin file, drift refresh, usage errors and CDPATH.

## Limits
- Tests of commons' own scripts only; `bounded` has none here, and no test installs a plugin or runs a real `claude`.
- Passing in a scratch copy shows the suite is green at this commit, not that the rollout works.

## Used in
- research/synthesis/tools-commons.md
