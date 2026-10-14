---
repo: agentik-dev/agentik-relay
path: design/packets/ar40-helper-relay-guard.md
commit: 405d1e0
title: "Packet AR40: a helper outside a row runs no relay verb that writes"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

The packet is 41 lines and carries no date. Read in full, with `history/sittings/2026-09-30-7-ar40.md` (21 lines), `internal/hooks/guards.go` (grep for `HelperRelay`, `inRow`, `AgentID`), `internal/hooks/ar40_test.go` (test names), `design/relay-r1.md` line 259, and `NICE_TO_HAVE.md` lines 138 to 142, all at this commit.

## What it says
- Context (packet line 17): the first incident was a review helper of a plain Claude session, with no `RELAY_ROW` set, that built a relay binary and ran `agentik relay plan` four times on 2026-09-29 at 23:56, and the live night stopped `lock-moved`. The packet says that was "fixed at the binary in ar36" and ties it to the AR36 incident (see agentik-relay-ar36-pid-file-guard).
- A second helper incident the next day (line 17): on 2026-09-30 a read-only adversary helper, whose prompt forbade it, ran `agentik relay run --orchestrate`. A gate happened to hold the lock, so the run was refused. The packet's finding: both helpers ran outside a row, so no guard applied, and "the rule lived only in their prompts."
- Why the existing guard missed them (line 15): `NestedRun` was added only when `inRow` was true (`RELAY_ROW` or `CLAUDE_SESSION_HELPER` set), and `preToolUse` read `tool_name`, `cwd` and `tool_input` but not `agent_id` or `agent_type`.
- Ruling 1 (line 23): a new guard `helper-relay` applies to a Bash call whenever `agent_id` or `agent_type` is non-empty, in a row or not. It denies the verbs `run`, `plan` (`--rows` too), `gate`, `resume`, `stop`, `kill`, `clean`, and `go build` or `go install` of `cmd/relay`. It passes `status`, `report` without `--write`, `attach --print`, `doctor`, `hook`, `make check` and `go test ./cmd/relay`. The main thread is unchanged.
- Code now: `internal/hooks/guards.go:95-101` (`HelperRelay`), `:148` (`helperRelay`), `:1079-1080` (the two fields), `:1103` and `:1163` (applied to a subagent's call). Tests: `internal/hooks/ar40_test.go:48`, `:89`, `:116` (`TestAR40_1_HelperDeniedWriteVerbs`, `TestAR40_1_HelperReadVerbsPass`, `TestAR40_1_MainThreadUnchanged`); acceptance reads 3 passes (packet line 9).
- Budget and charter: 60 turns, 80k context (packet line 10; charter line 6). The charter's exit line: act 1 committed, acceptance 3, `make check` 0, no flake, not pushed. The first test was red on `main`: every line read `""` (charter line 12).
- Design record: `design/relay-r1.md:259` has the `helper-relay` row.
- Review round 1 (`NICE_TO_HAVE.md:138-142`, none marked blocking): F1, a false positive, where a read-only line such as `find cmd/relay -name '*.go' -exec grep -l stop {} +` is denied because a word holding `cmd/relay` precedes a verb word; F2, `make build`, `make install`, `go install ./...` and `cd cmd/relay && go build -o /tmp/r .` pass although the guard's reason says a helper never builds the relay; F3, spelling bypasses `$(which relay) stop`, a backtick form, `r=relay; $r stop` and `pkill -f 'relay run'`; plus an observation that a `claude --agent` session's main thread carries `agent_type` and would be held as a helper, which the relay does not spawn (checked 2026-09-30). All four lines are still listed in `NICE_TO_HAVE.md` at this commit.

## Limits
- The guard matches command shape and word position; the reviews are a model reviewer's findings, not a measured rate. No count of helper runs that were or were not denied exists in the repo.
- The date of the first incident differs from AR36's (2026-09-29 23:56 here, 2026-09-30 06:56Z there); the repo does not reconcile them.

## Used in
- research/synthesis/journal-probe.md
