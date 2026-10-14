---
repo: agentik-dev/agentik-relay
path: design/relay-r1.md
commit: a326550
title: "agent-relay design r1: the Go relay and the packet queue that builds it"
author: agentik-dev
published: 2026-09-22
accessed: 2026-10-14
kind: our-use
---

The design of record: 728 lines, about 298 KB, status line dated 2026-09-22 and amended in place through 2026-10-12. Read by section: the opening, 1 (state machine), 2 (packet), 3 (queue), 4 (prompt), 5 (ledger), 6 (gate; first paragraphs), 7 (spawn), 8 (concurrency), 9 (CLI), 10 (plugin boundary; bullets), 11 (opening), 13, 14, 15, 16 (end). Not read in full: the long hardening paragraphs of section 6, and the test tables of sections 11 and 16.

## What it says
- Architecture (opening paragraph and section 1): the core is two pure state machines, a night over a queue and a sitting over a packet. Every effect (git, the claude process and its stream, the clock, files, terminal, notify) sits behind an interface with a fake, so `plan` and `run` are one code path with the effects swapped.
- Sitting states: waiting, ready, planned, staged, running, exited, paused, then terminal green, red, failed or skipped. A gate-red is a packet failure and the night moves on; a sitting failure (`failed`) means the prompt or the driver is broken and the night stops with that reason (section 1, last sentences).
- Night states: planning, running, draining (after `relay stop`), paused on a usage limit, and one terminal `stopped:<reason>`. The code (internal/relay/types.go) lists thirty stop reasons; section 1 groups them.
- Packet (section 2): a markdown file under 9,216 bytes with a six-row header table (from, pin, wall, may touch, acceptance, budget, optional verify) and six numbered sections. Acceptance lines must start with an allowlisted command. The relay never runs a whole-suite line as acceptance.
- Queue (section 3): `relay/queue.yaml` in the target repo; default row budget 100 turns, 130,000 context, $15, 4 h wall (the example in section 3; the live default is in `relay/queue.yaml`). A dependency counts as satisfied only when git says its branch landed, or a green written by this process, never by a ledger line alone.
- Prompt (section 4): the child's stdin is the repo's "Every session" block, a RULES block, one CONTEXT line, and the packet verbatim. RULES carry the headless sentence (do every act yourself, in the foreground, commit each act), act 0 (copy the packet into the repo), the soft-ceiling sentence, and since AR61 a sentence that the verify line runs at most once. A template hash and a prompt hash go on the spawn ledger line.
- AR61's stated evidence (section 4): builders ran the verify line about 2.7 times a row, 46% of a night's time, because a packet ordered it per act.
- Ledger (section 5): one JSON line per event in a per-day file under the XDG state directory; events include night-open, plan, stage, spawn, turn, ceiling, soft, exit, gate, sitting, stop. An unread cost is never recorded as $0.00.
- Gate (section 6): deterministic, zero tokens, in the driver. Checks in order: exit, commit (HEAD moved), clean tree, origin unchanged, touch set within may-touch, acceptance lines re-run in a fresh clone at the bound sha with main's Makefile and scripts laid over it, then the verify line. Acceptance lines time out at 900 s; the verify line at the repo's limit (900 s unset). A gate whose facts cannot be gathered is `unrun`, never a pass.
- Merge (section 6): policy `merge-on-green` runs the verify line on the merged tree in a fresh worktree first, then `--no-ff` merge under a root lock; a red main never merges.
- Spawn (section 7): `caffeinate -i claude -p --permission-mode auto --allowedTools "Bash Edit Write MultiEdit NotebookEdit" --model <m> --max-turns <n> --max-budget-usd <x> --output-format stream-json --verbose --session-id <uuid>`, from the worktree, with every `CLAUDE*` variable stripped and `RELAY_ROW` set. The driver picks the session id so the resume line is known before the first byte.
- Ceilings (section 7): a `ceiling` line at 80% of the row's context, the soft request once at 90%, SIGTERM then SIGKILL after 30 s at 120%, which is for runaways; nothing kills at 100%. Wall clock and owner kill escalate the same way. A spawn line that fails to append spawns nothing.
- Dead relay (section 7): every process group is recorded in a file; a trapped INT, TERM or HUP kills every group; a relay killed without a trap leaves the file and the next start reaps the groups whose recorded start time still matches.
- Concurrency (section 8): `--parallel` default 1, at most the core count; never two sittings in one working tree (a lock file per worktree path); worktrees live at `<repo>/.claude/worktrees/<id>` and only `relay clean` removes them. One relay per account: the lock is a loopback TCP listener on a port derived from the user id, chosen so no sitting can unlink it; the page records why a pid file and an `flock` were replaced (ADV13-4).
- Plugin boundary (section 10): hooks are advisory; the sandbox "seam" is named but not built, an open owner decision.
- Section 15, bounded work (read in full for the bullets): recursion guard (`RELAY_MEASURE_DEPTH`), fail early at plan, measure scope, a memo of baselines, one measurement per root, a load breaker, a watchdog, a helper breaker, runtime invariants, an orphan sweep, and the `check` wrapper. Numbers: `--measure-seconds` default 600; breaker opens above 4 x cores and closes under 2 x, polls every 30 s up to 10 minutes; watchdog polls every 60 s and kills after `--stall-seconds` 2700 with no HEAD, mtime or CPU change; a row's wall defaults to 4 h; at most 2 `claude` helper processes per row; `make check` wrapped at a 900 s wall in this section (the Makefile now says 840).
- Section 16: a TLA+ model of the night checked by TLC, with the fork storms as violations TLC must find. States checked: 666,949 in about 70 s at first; 984,043 in about 2 min 20 s after a model fix; 5,434,561 in 14 min 12 s at one later point; the model was wrong, not the Go code, in one case (gap 4, 2026-09-23).
- Section 14: the standing-word decisions D16 to D23, each with the other choice named: tmux optional with a file-window fallback, the binary's own strict YAML parser over a library, and the ledger kept out of the repo (the brief had copied it into history at close).

## Limits
- A design record that mixes intent and later amendments; claims of "measured" inside it are the repo's own sessions, not independent. Many findings cite review ids (ADV, AR) whose texts sit in other files.
- Names a downstream product repo and a sibling set of repos in places; those names are not repeated here.
- The bulk of section 6 and the test tables were skimmed, not read line by line.

## Used in
- research/synthesis/tools-relay.md
