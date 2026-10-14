---
repo: agentik-dev/agentik-commons
path: GUIDE.md
commit: e456f4b
title: "The agentik guide: conventions shared by the tools (r1, 2026-10-13)"
author: agentik-dev (the suite owner)
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- Scope (line 3): binding on the five tools (session, decisions, respeak, relay, agents). Each works alone, and the guide makes them consistent, not dependent. Sections 1 to 9 come from the session tool's earlier conventions file (r1, 2026-09-22), renamed; section 10 is the command-surface table from the r1 record.
- Layout (§1): each tool repo has the tool, a self-contained `plugin/` subtree (skills under 500 lines with a description under 200 characters, one-verb commands under 30 lines, agents only where the plugin owns a lane, hooks, an optional TypeScript "Mod"), `design/` records named `<topic>-rN.md`, `packets/`, `history/sittings/` charters named `<date>-<n>[-<chain>].md`, vendored scripts with a pin file, a `doclint` doc gate, tests, a fixed set of Makefile targets, and no `marketplace.json` of its own because two install paths would double the hooks.
- Configuration layering (§3): each plugin resolves its own configuration from lowest to highest layer (shipped defaults, user file, repo section, local file, folder and scope files, the session's resolved file, session toggles, the invocation). The session writes a per-session resolved file only at SessionStart and on `set`; a plugin reads it only when the provider version is in its range, never writes it, and runs alone when it is absent. The session's own depth variable refuses depth 2 unless `--nested` is given, the relay sets depth 1 for its children, and the turn ceiling is the smaller of the launcher's `--max-turns` and the profile's. Unknown config keys are reported by `doctor`, never fatal.
- Test standard (§4): Go gets table tests over every transition of a state machine, every effect behind a faked interface, an end-to-end test against a fake `claude` of canned stream-json, `go vet` and the race detector, and no network. Python gets stdlib tests with a fake `claude` on a temporary PATH ("never quota"), every hook tested per event from a stdin fixture, and byte ceilings tested rather than assumed. Every invariant in a design's provability section is one named test; one that can also be a runtime guard is both. The Mod rule cites Claude Code 2.1.296 behaviour (one unmatched hook per event).
- `make check` (§5): runs under `scripts/bounded --lock .check.lock --wall 840 --load 4` and includes tests, lint, doclint, hygiene, validate (60 s), README freshness and the vendored-script hash check. The wall includes the load wait; the relay allows 900 s. The lock is an `flock` held by a guardian that kills the command's process group when the pipe closes, SIGKILL included. A last stderr line `bounded: stop: lock|load|wall` (exits 2, 2, 124) means the check was unrun, never red; under another `bounded` it reads `bounded: nested stop:` and is a plain red. Packet prompts keep a turns line until the doctor reads the meter hook live.
- README and hygiene (§6): `design/readme/source.md` holds facts in the technical lane and `make readme` renders `README.md`; the invariant is a sidecar of two sha256 lines, not the renderer. The README names dependencies by id and range only. The hygiene scan covers six generic groups (home, lan, sibling, secret, email, renamed) plus a private list kept outside the repos; absent that list it warns once, and `--require-private` exits 2. `.hygiene-live` declares each repo's running chains. `.hygiene-allow` rows each sit under a reason line. Nothing is pushed red and the owner pushes.
- Versioning and sittings (§7): semver; a `0.x` release may break on a minor; a config-key, hook-output or resolved-file change bumps the major; a tag equals the plugin version. Sittings carry a charter, commit per act, never `--amend` or push, and builders work in worktrees with `.venv` a symlink to the main checkout's. `make install` freezes the committed tool code by tree hash and runs it with `python -P` so no checkout runs hooks; if the interpreter or frozen tree is gone, a hook says `run make install` once and exits 0.
- Citing and packets (§8, §9): read lists cite a record by section; a packet's "may touch" is a closed list of full paths; the `verify` row is required (grandfathered packets are excepted: 11 in the session repo and 17 in the relay repo); acceptance lines are targeted and carry a measured baseline; a packet has six sections, six header rows plus `verify`, under 9,216 bytes; the builder decides inside the design of record, logs each choice in the charter's handover with its consumer, and names at most one open fork for the owner.
- Command surface (§10): naming `agentik-<tool>` and plugin `<tool>@agentik`; config under the user's `agentik/<tool>/` config folder and a repo-level `.claude/agentik/config.yaml`; new env vars `AGENTIK_*`; verbs are words, never a flag as a verb; every tool has `--help`, `--version` and `doctor`, and reads take `--json`. The exit-code rule: "Exit codes report the task, not the content." 0 done, 1 a check said no, 2 usage or a failed precondition, 3 not installed. README order is fixed (Why it exists, What it does, Does it work?, Install, ...). The alias paragraph lists the old names until r2 ends them on or after 2026-12-31.

## Limits
- A style and process guide by the owner for the owner's tools; it records what the tools do, not whether the conventions beat alternatives.
- Several rule labels (D4, D12, E7, T3, T5, and a numbered entry in the owner's private ledger) point at private records and cannot be followed from the public repos.
- The guide binds the five tools, not commons itself: commons runs no `doclint` before r2 (see agentik-commons-r1-packet).
- Parts of §5 (the doctor reading the meter hook live) describe a state that is still pending.

## Used in
- research/synthesis/tools-commons.md
