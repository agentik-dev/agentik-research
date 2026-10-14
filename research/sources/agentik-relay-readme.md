---
repo: agentik-dev/agentik-relay
path: README.md
commit: a326550
title: "agentik-relay"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- `relay` is a static Go binary, plus a Claude Code plugin, that runs queued packet "sittings" headless overnight. Each queue row gets one git worktree, one branch and one sitting, and the row merges into `main` only when its gate reads green (README.md, opening paragraph).
- The stated reason it exists: a person sleeps through the night and reads one report in the morning, so the night must fail early (a pre-check, a circuit breaker, a wall clock, a spend cap), never push, never amend, never rebase, and leave a door back into every stopped sitting (README.md, "Why it exists").
- The door is `agentik relay resume <row>`, which runs `claude --resume <session_id>` in the row's worktree. Every red or failed row carries that exact line in its ledger line, in `agentik relay status` and in `agentik relay report`.
- The night: `agentik relay plan` validates the queue and packets, resolves dependencies, snapshots origin refs and runs the acceptance lines on `main` for a baseline, and spawns nothing. `agentik relay run --until 06:00 --max-sittings 4 --max-usd 20 --parallel 2` plans, then loops; it ends on an empty queue, the count, the clock, an owner stop or a failure.
- Control: `agentik relay stop` asks the night to stop after the running sittings; `agentik relay kill <row>` stops a row now; both write a control file the loop reads after every event. State (ledger, `status.json`, logs, control file) lives in an XDG state directory and never enters a repo.
- The queue is `relay/queue.yaml` in the target repo; packets are `design/packets/<id>.md`.
- The plugin has six commands (resume, status, plan, gate, report, doctor), three agents (builder, adversary, attendant) and four hooks. The README calls the hooks "redundant guards" that nothing under the driver depends on. Stop blocks a sitting with a dirty tree or no commit; outside a sitting (`RELAY_ROW` unset, no session depth) Stop never blocks.
- Exit codes: 0 ok or green; 1 red or a night stopped on a failure; 2 usage, pre-check failed or unwell; 3 not implemented.
- `make check` runs under `scripts/bounded`: one per tree, an 840 s wall, held above load 4 x cores only when the CPU confirms the load. The README says it runs `go test -race ./...`, vet, gofmt, doclint, hygiene, plugin validation and README freshness, with no network and no claude call. `make e2e` (a fixture repo and a fake `claude`) and `make tla` never run in check.
- Status line: version 0.1.3, rendered 2026-10-13, 699 Go tests; "Nothing is stable before 1.0.0."
- The "Why it exists" paragraph names the private household that first used the tool. This note does not repeat it; describe it as an owner's set of Claude Code plugins built in unattended relay runs.

## Limits
- A rendered README (the source is `design/readme/source.md`); it states intent and status, not measurements.
- The 840 s wall differs from the 900 s in `design/relay-r1.md` section 15, which is older; see `agentik-relay-design-r1`.
- One owner's use. The test count (699) is the README's; a grep of `^func Test` over the test files at this commit finds 706 functions, which includes tagged end-to-end tests.

## Used in
- research/synthesis/tools-relay.md
