---
repo: agentik-dev/agentik-relay
path: design/packets/ar36-pid-file-guard.md
commit: 405d1e0
title: "Packet AR36: no other lock writes the account's relay.pid"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

The packet is 43 lines and carries no date; the event it records is dated 2026-09-30 inside it (line 17). The repo's git history is one squashed public commit, so no commit date exists for it. Read in full, with the files below it names, each opened at this commit: `history/sittings/2026-09-30-3-ar36.md` (26 lines), `internal/night/pidfile.go`, `internal/night/ar36_1_test.go`, `internal/night/ar36_2_test.go`, `internal/night/ar22_2_test.go`, `internal/night/night.go`, `internal/relay/types.go`, `plugin/agents/builder.md`, `plugin/agents/adversary.md`, `NICE_TO_HAVE.md` lines 162 to 173, and `design/relay-r1.md` line 205.

## What it says
- What happened (packet line 17): between 06:56Z and 06:58Z on 2026-09-30 a review agent built the relay binary by hand with a link-time lock port of its own (29871) and no linked pid home, then ran `agentik relay plan` four times against a scratch repository. Its HOME and state variables pointed at scratch directories, but the pid directory is read from the user database, so the binary used the account's real one. Port 29871 was free, so each run took "the lock" and renamed its own line over the live night's `relay.pid` (`pidfile.go:167` at the packet's pin), then removed the file on release (`:184-185`). The live night was a plain release binary.
- Effect (line 17): at its next poll the live night read `relay.pid` as gone and stopped `lock-moved`. No new sitting started, and nine rows stayed ready overnight. The night's port lock was never lost; the file only names the holder.
- The stop reason is `lock-moved`: `internal/relay/types.go:99-102` (`LockMoved StopReason = "lock-moved"`). The holder's poll is `checkLock` at `internal/night/night.go:1451-1458`, which calls `LockMoved()` (`internal/night/pidfile.go:382-404`): it returns a reason when `relay.pid` is gone or is a new inode at its path. `internal/relay/ar17d_test.go:11` pins 30 stop reasons with `LockMoved` at index 23.
- The detection predates the incident. `TestAR22_2_PidFileMovedStops` (`internal/night/ar22_2_test.go:137-192`) covers `gone` and `new-inode`, and asserts the night stops `lock-moved` before any sitting. The probe was a false positive of that check: the file moved, the port stayed held.
- Packet pin and budget: branch off `main` at `7bd029d`; 100 turns, 120k context; verify `make check` (lines 6, 10, 11). The packet's wall forbids building or running a relay binary by hand (line 7).
- Ruling 1 (line 23): before `PidFile` writes, it reads the file; if it names a live holder (pid and start time) other than this process, it frees the port it took and returns an error ending `names live relay <pid>, which holds another lock; this process is on port <p>`. A dead or reused pid's file is replaced as crash recovery. Code: `internal/night/pidfile.go:177-185` (refusal text at `:184`, the write it guards at `:186`), `maybeLiveHolder` at `:343`.
- Ruling 2 (line 24): a binary linked with a lock port and no pid home refuses to resolve the pid directory: `a linked lock port (LockPortLink) needs a linked pid home (PidHomeLink): refusing the account's real pid dir`. Code: `internal/night/pidfile.go:84-86`.
- Ruling 3 (line 25): the builder and adversary agent prompts gain one bullet each: never build `relay` by hand, never run a hand-built one; a probe goes through `make`'s test harness or links both variables at a temp directory. Now at `plugin/agents/builder.md:22-25` and `plugin/agents/adversary.md:14-17`.
- Tests (packet acceptance, line 9: `TestAR36_` passes read 3): `TestAR36_1_LiveHolderFileIsNotReplaced` (`ar36_1_test.go:44`, with subtest `start-unreadable`), `TestAR36_1_DeadHolderFileIsReplaced` (`:113`), `TestAR36_2_LinkedPortNeedsLinkedHome` (`ar36_2_test.go:15`). The tests run in-process and build no binary. The charter (line 12) says ruling 1's test was red on `main` with `took the lock and wrote its line`; line 13 says ruling 2's was red with `PidDir` returning the account's real directory and no error.
- Charter (`2026-09-30-3-ar36.md`): acts 1 to 3 and one fix round landed. Fix round 1 closed the one blocking review finding (A2-F2): a live holder whose start time `ps` cannot read is refused (`maybeLiveHolder`, `kill 0`; EPERM counts as live). Exit line (line 26): acceptance 3 and 2, `make check` 0, no flake met, not pushed.
- Design record: `design/relay-r1.md:205` (the AR22 paragraph) carries one sentence for each of rulings 1 and 2, and lists residuals, among them that the lock "is advisory against a child that builds its own relay with its own port link (ADV13-13)". That route had been reviewed before the incident: `design/review-adv13.md:91` names ADV13-13, and the review's sitting file is dated 2026-09-24. `design/relay-r1.md:253` says the sandbox that would close it is "Not built (the owner's open decision)".
- Open question, `NICE_TO_HAVE.md:173`: "Should a missing advisory file stop a night whose port is still held, or should its holder write the file again?" The line adds that this is not decided. No ruling in `DECISIONS.md` or `OPEN-QUESTIONS.md` answers it (grep for AR36 in both finds nothing).
- Review round 1 residuals, `NICE_TO_HAVE.md:162-169`, six lines: the Write hook's pid-directory deny is lost for a binary linked with a port and no home (164); a relay that died unreaped (`ps` state `Z`) is refused as live (165); the test checks only the loopback port after a refusal, not the wildcard binds (166); a refused `resume` exits 2 and prints nothing (167); `PidFile` reads then renames, so a live holder's line landing between the two is replaced, "not seen outside a staged probe" (168); `ps -o lstart` prints by locale, so a taker under another LANG may misread a live start as a reused pid (169).
- The model does not cover it: `design/review-adv14.md:108-111` says the TLA+ model has no action reading `unlinked`, so the `lock-moved` stop and its evasions are outside it. `NICE_TO_HAVE.md:173` and `review-adv14.md:89-91` (ADV14-10) add that `LockMoved` reads only device and inode; an in-place rewrite, a hard link and restore, or a `mv` away and back leave it empty.

## Limits
- One incident, observed once, recorded by the packet's author from the live night. The night's ledger never enters the repo, so the stop line, the clock time of the stop and the cost of the lost night cannot be re-read here. The packet gives no night id and no dollar figure for the lost night.
- The reproduction is at test level only (red on `main`, in-process); no binary was rebuilt to replay it, by the packet's own wall.
- The repo gives two dates for the event. This packet says 2026-09-30, 06:56Z to 06:58Z. The AR40 packet (`design/packets/ar40-helper-relay-guard.md:17`) says 2026-09-29 at 23:56 and ties it to this fix. The two agree if the second is local time seven hours behind UTC; the repo does not say so for that line.
- Test and line counts are at 405d1e0; the packet's own line references (`:167`, `:184-185`, `:18-26`) are at its pin `7bd029d` and have moved.

## Used in
- research/synthesis/journal-probe.md
