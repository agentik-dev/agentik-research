---
repo: agentik-dev/agentik-relay
path: history/sittings/, design/packets/, design/review-r6.md, design/packets/ar11-tla-night.md, design/packets/rows-2026-09-23-r3.json, design/breaker-signal-r1.md, internal/night/night.go, internal/night/bound.go, Makefile, README.md, design/review-adv13.md, design/review-adv14.md, design/relay-r1.md, internal/night/pidfile.go, internal/relay/types.go, design/review-adv10.md, NICE_TO_HAVE.md
commit: 405d1e0
title: "agentik-relay at its head on 2026-10-14: the record's counts, the fork-storm fix, the idle floor, the build name"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

Read on 2026-10-14 in the attached checkout at 405d1e0 (2026-10-13 19:18:20 -0700), the relay's head in the fixer brief's pin. Line numbers are at 405d1e0. `git diff --stat a326550 405d1e0` shows `design/review-r6.md`, `design/relay-r1.md` and `design/breaker-signal-r1.md` unchanged since a326550; the Makefile, README and NICE_TO_HAVE changed.

## What it says

### The record's size, counted
- Sitting charters, counted with `ls .sources/<repo>/history/sittings | wc -l` in each checkout at its head on 2026-10-14 (every entry is a dated `.md` charter; `ls` without `-a` skips the relay's `.keep`): agentik-relay 133 (405d1e0), agentik-session 61 (e8477a7), agentik-decisions 53 (569a120), agentik-respeak 41 (c83e9b8), agentik-agents 2 (f986500), agentik-commons 1 (588530f). The `.github` profile repo (8a0a188) has no `history/sittings/`. The relay holds the most.
- The relay held 132 charters at a326550 (`git ls-tree --name-only a326550 history/sittings/`, 133 entries less `.keep`); the 133rd is `2026-10-13-2-agentik-r1-relay.md`, added in dccd8a9.
- Packets: `ls design/packets/*.md | wc -l` reads 88 at 405d1e0 (87 at a326550; the 88th is `agentik-r1-relay.md`, added in d366b6a), beside 19 `rows-*.json` files.
- Test functions: `git grep -h '^func Test' 405d1e0 -- '*_test.go' | wc -l` reads 723 (706 at a326550). The README's status line (README.md:104) still reads "version `0.1.3`, rendered `2026-10-13`, `699` Go tests".

### The fork-storm cycle C4 and its fix
- `design/review-r6.md:55`: C4, "a relay child runs" the run verb; "Bound: NONE in the binary". The fix it names: the run verb "refuses a nested plan before any stage (exit 2, `stop: nested`)", `relay.Invariants` gains `never-nested-run`, and "the PreToolUse guard denies" the run verb and a bare plan "when `RELAY_ROW` is set".
- `design/review-r6.md:71`: doclint and hygiene run through the pyenv shim inside the verify line; "D5 saw 60 s per shell on the rehash lock". D5 is an item of the defect brief R6 read (line 3). No file named as a brief or defect brief is tracked at 405d1e0 (`git ls-tree -r --name-only 405d1e0 | grep -i 'brief\|defect'` prints nothing).
- `design/review-r6.md:74-84`: section 5 says what a TLA+ model should cover; section 6 lists five decisions for the owner, each recommended: (1) refuse the nested run in the binary and the child's guard, (2) the acceptance grammar, (3) one packet for the anchor head, the root lock and stale-lock reclaim, (4) a small TLA+ model now, (5) the pyenv shim out of `make check`.
- `design/packets/rows-2026-09-23-r3.json`: one row, `ar10-bounded-night`, "the night bounded against the 2026-09-23 fork storm"; its act 0 is "the recursion guard" (`RELAY_MEASURE_DEPTH` in every measured line and the child's env, a nested plan measures nothing, the packet parser refuses plan, run and gate lines on the real queue).
- `design/packets/ar11-tla-night.md:1`: "Packet AR11: the night modeled (TLA+, the storm found, the run guard)". Its act 4 (line 25), "The run guard (C4)": the run verb under `RELAY_MEASURE_DEPTH` or `RELAY_ROW` exits 2 before any stage, `night.Run` returns `ErrNested`, and the child's PreToolUse guard denies the run verb, and the plan verb without `--rows`, when `RELAY_ROW` is set.
- `internal/night/night.go:97-100`: `ErrNested`, "Run refuses a night under a measurement or a sitting (the run guard, relay-r1 §15, AR11; R6 §3 C4)".

### The idle floor
- `design/breaker-signal-r1.md:3`: "Both proofs ran (§4). AR47 is merged at 4b980d7 with the floor at 0.25; P2's sweep says 0.50, a one-constant change that waits for the owner's word."
- Lines 61-73: P2 "ran 2026-10-01 13:10 in a compact form". Forty-eight background loops held the load past 32; normal-priority loops were added in steps while a 16-wide job was timed. The job slowed by a quarter at the first step (49.4% idle) and by more than half at 24.4% idle; "By this section's rule the floor is 0.50." The design calls the number coarse (a short job, one run per step). `night.DefaultIdleFloor` is still 0.25 in the code (`internal/night/bound.go:676`).
- Line 88, in the open risks, was not updated: "The floor is a judgment until P2's sweep."

### The build name
- `Makefile:36-37`: `build` writes `bin/agentik-relay` from `./cmd/agentik-relay`. `Makefile:38-43`: `install` builds `agentik-relay` into `BINDIR`, links the old bare name to it "until 2026-12-31", and installs the `agentik` front door beside it.
- `git show 72c0fe0 -- Makefile` (2026-10-13 17:43:48 -0700, "agentik-r1-relay act 5, its rest: the install target, the plugin relay") is the change from `bin/relay` and `./cmd/relay` to the new name; the merge a166166 (2026-10-13 18:42:08 -0700) took it to `main`.
- `README.md`: every command line uses `agentik relay <verb>` (lines 15 to 41, for example `agentik relay run` and `agentik relay report`); line 5 names the binary `agentik-relay`, with the bare name a link to it until 2026-12-31.

### The pid file, the port lock and two reviews (for the probe entry)
- `design/review-adv13.md`, read in full (133 lines; the review of 59b087a..1c3b734, target AR21; its repros ran in a temp world and touched no live pid dir, lines 5-7). ADV13-4 (lines 45-51): "a removed pid file gives a second holder (fork-storm door)"; the flock held an inode, not a path, and after an unlink or a rename the next comer held the lock. Its fix: "a lock a sitting cannot unlink (a loopback port or a Mach name), and the holder re-stats the path each poll and stops the night on a new inode." ADV13-13 (lines 91-95): "a relinked or edited relay picks its own pid dir"; the hook allowed `go -C cmd/relay build -ldflags "-X …PidHomeLink=/tmp/h"` and two other build spellings, and the relinked binary under `env -i` passed a held lock. Its fix: read `go -C` and a cwd in cmd/relay, "and name the pid file advisory against a hostile child."
- `design/review-adv14.md`, read in full (136 lines; the review of 7d2b60f..9b99873, targets AR22, "the pinned reader and the port lock", and AR23). Lines 13-14: of the ADV13 fixes, 4 holds ("unlink, rename or a moved dir gives no second holder"). Line 20: "Open, deferred by AR22: 9, 13 (a new route: ADV14-9)." ADV14-9 (lines 79-85): "ADV13-13 is open with a new route"; with hook decisions `{}`, a binary built with `-ldflags "-X …LockPortLink=4242"` "printed port 4242, not 20501: its own lock"; the fix it names puts the link variables behind a test build tag, and "an edited source still escapes (the sandbox)." ADV14-10 (lines 89-91): `LockMoved` reads only (dev, inode), so an in-place rewrite of `relay.pid`, a hard link and restore, or a `mv` away and back leave it `""`. Lines 111-112: no TLA+ action reads `unlinked`, so the `lock-moved` stop and its evasions are outside the model.
- `design/relay-r1.md:205`, "The account lock is a port" (AR22 act 2; ADV13-4): the lock is a TCP listener on 127.0.0.1, port `20000 + uid % 10000`; `run`, a measuring `plan` and `resume` "refuse ANY live holder", so "a second night from another shell is refused"; `relay.pid` "only names the holder", and "a missing file or a new inode stops the night `lock-moved`"; its residuals include that the lock "is advisory against a child that builds its own relay with its own port link (ADV13-13)". Line 253, the sandbox's seam: "Not built (the owner's open decision). The seam is the child's argv and env in `internal/effects/spawn.go`, the one place a sitting starts". Lines 635-636, AR24's deferrals: ADV14-9 ("a copied `cmd/relay` built with its own port link") and ADV14-10's `LockMoved` evasions go to "the sandbox". Line 259: the `helper-relay` row holds "a helper of any session".
- `internal/night/pidfile.go:21`: "the lock is the port, never the file." Lines 382-400: `LockMoved` returns a reason when `os.Lstat` fails ("is gone") or `os.SameFile` says the inode differs ("is a new inode"), else `""`.
- `git grep -n helper-relay 405d1e0` outside `internal/` finds only the AR40 packet, its charter, `design/relay-r1.md:259` and `NICE_TO_HAVE.md`; no line counts helper calls the guard denied or passed.

### The stop reasons and the account stop (for the relay page)
- `internal/relay/types.go:72-180` declares 44 constants of type `StopReason` (`grep -cE 'StopReason\s*=\s*"'` reads 44). `StopReasons` (lines 197-204) lists 30 of them. The other 14 sit outside it: `gate-unrun`, `stalled`, `main-moved`, `verify-cut`, `no-charter`, `row-unproven`, `git-state-moved`, `merge-tree-differs`, `no-identity`, `git-config-program`, `ref-moved`, `tool-moved`, `unpinned-tool` and `ledger-base-differs`; their comments call them a red row's reason, an unrun gate's, stage's or merge's reason, a refused merge's, or the start's refusal. `gate-unrun` and `stalled` are "a packet failure", "absent from StopReasons".
- Lines 97-98: `usage-limit`, "the account's usage or rate limit (run 10 ruling 1): every running row with it"; `auth`, "the account's login expired or refused (run 10 ruling 1): every running row with it". Lines 210-213, `AccountStop`: "a usage limit or a login, which stops the whole night, kills every running row with the same reason, and keeps each row's worktree as it stands."
- `design/relay-r1.md:25` says the same of the failed reasons `usage-limit` and `auth`: "every running row is killed and reads `failed` with the same reason, no worktree is removed". Line 11 adds the `paused` sitting state ("the account's limit paused the night on this part", AR64), and line 27 the night's `paused:usage-limit`, in which "rows outside a model's scope run on" (AR70).
- `design/review-r6.md:47`, section 2, "Reversals and tensions": "`stalled` red (moves on) beside `load`, `invariant`, `orphans` failed (stops): a stall can be the driver's as much as the packet's. Keep, with the stand-in's rule: a second stall in one night stops it." The review names no other rule it weighed.
- `git diff a326550 405d1e0 -- internal/relay/types.go` changes two comments only (the package line and `ErrNotImplemented`'s), so these lines read the same at a326550.

### Guard evasions in the record (for the relay page)
- `NICE_TO_HAVE.md:138-141`, the section "ar40-helper-relay-guard, review round 1 (2026-09-30)", at the same lines as at a326550. F2 (line 140): the guard's reason "says a helper never builds the relay, but `make build`, `make install`, `go install ./...` and `cd cmd/relay && go build -o /tmp/r .` pass." F3 (line 141): "`$(which relay) stop`, `` `which relay` stop ``, `r=relay; $r stop` and `pkill -f 'relay run'` pass from a helper."
- `design/review-adv10.md:29-34` (ADV10, "the second adversarial review of the relay", two read-only Opus reviewers, every repro in a temp repo or copy, lines 1-4; unchanged since a326550). ADV10-3, "a child can still push": "The only push rule is `^git push`"; on a bare remote, `git send-pack`, `$(echo git) push --no-verify` and `git push --no-verify <url>` landed, and "`env -S`, `xargs`, `bash <<<` pass the hook too."
- `design/relay-r1.md:187`: AR17B makes the guards "close by shape": "under `RELAY_ROW` a segment the guards cannot read is denied, never a list of spellings." Line 328: `TestAR17B_0_PushDoorsDenied` holds "every push spelling ADV10-3 landed" denied in a row.
- `design/relay-r1.md:278` (AR27B act 2; ADV16-2): `--settings '{"disableAllHooks":true}'`, `--setting-sources project` and a `CLAUDE_CONFIG_DIR` prefix "each start a helper whose hooks never load", and `--dangerously-skip-permissions`, `--agents`, `--resume`, `exec -a zz` and `--max-turns 99999999` passed; the fix makes the helper line an allowlist.
- `NICE_TO_HAVE.md:552`, "(agentik-r1-relay fix round, F2)": "`sh <path>/agentik relay run` and `bash scripts/agentik session start` are allowed in a row on main and the branch alike: the old hole of a shell running a script file the guards cannot read."

## Limits
- Counts of files, not of nights: a charter is written by its own sitting, and the ledger of nights is outside the repo.
- The fix for C4 is read from the design, the packet and one code comment; this note ran no test and no night. A fix in the repo is not proof it holds.
- The sweep is the design's own measurement on one machine, one run per step.

## Used in
- docs/tools/relay.md
- docs/journal/posts/2026-09-30-the-probe-that-stopped-a-night.md
