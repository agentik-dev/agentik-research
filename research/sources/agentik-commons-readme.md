---
repo: agentik-dev/agentik-commons
path: README.md
commit: e456f4b
title: "agentik-commons"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Commons is the shared ground of the five agentik tools (session, decisions, respeak, relay, agents): the `agentik` front door, one `agentik` marketplace listing all five plugins, the consistency guide, and the canonical copies of the scripts each tool repo vendors. It builds no tool and has no `install` target and no plugin of its own.
- The table of contents: `bin/agentik` (POSIX `sh`; exits 3 and names the repo of a tool not on PATH), the marketplace file (five `git-subdir` entries), `GUIDE.md`, `docs/sibling.md`, `scripts/hygiene` (with its `renamed` group), `scripts/bounded` (the breaker `make check` runs under), and `scripts/sync <repo>` (copies the front door, hygiene and bounded into a tool repo and writes the pin file).
- Make targets: `make check` runs the tests, a syntax check and a line bound on the front door, the hygiene scan of commons itself, and the marketplace check. `make local-marketplace` writes the marketplace with `file://` urls, one checkout per tool, into a local marketplace folder, then checks it.
- Tests are Python stdlib `unittest` with no virtualenv (`make test`). The design of record is `design/agentik-r1.md`. The licence is MIT.

## Limits
- A short front page; the reasons are in the r1 record and the guide, not here.
- It describes the repo as it is at the first public commit, one day after the record was written.

## Used in
- research/synthesis/tools-commons.md
