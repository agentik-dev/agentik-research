---
repo: agentik-dev/agentik-relay
path: NICE_TO_HAVE.md
commit: a326550
title: "agent-relay: what a review or a packet left open, none of it blocking"
author: agentik-dev
published: 2026-09-30
accessed: 2026-10-14
kind: our-use
---

Read by section (546 lines, 105 KB, dated sections from 2026-09-28 to 2026-10-12; the front matter says `updated: 2026-09-30`).

## What it says
- Night incident, a tool pin tripped by the owner's own machine (line 10, 2026-10-01): a night's gate on one row read `unrun` with `tool-moved: python3`, the row ended red with five acts unjudged and $6.79 spent. The cause was a separate process on the same machine, started eight minutes after the relay pinned its tools, that made python write two bytecode files into the shared standard-library cache; the pin counted two added entries as a moved tool. The file calls it the first `tool-moved` in any ledger. Landed as AR49.
- Night incident, API unreachable (lines 353-356, night 2026-10-04): two rows lost to the machine's network. One child exited after one turn at $2.40, another at $0.00, both with the CLI's "can't reach the API server" error text. The night stopped `stream-error`, one row `red: gate-unrun`, one `failed`. The observer's proposal: give it its own reason (`api-unreachable`), leave the row pending, hold the next spawn behind a probe. Not done at this commit.
- Verify line cut at 900 s (lines 362-366, 2026-10-06): a downstream repo's verify line ran past the 900 s limit twice in one day on a loaded machine with no failing test, and the report showed a red row whose last log line was a pass. This led to AR59 and DECISIONS entry 10 (verify limit per repo, and a red that says it was cut).
- Soft-ceiling cost (lines 372-379, 2026-10-07): two nights each lost a whole stack of dependent rows. A row reached its soft context ceiling (about 329k and 327k tokens), exited cleanly one act short, went red on acceptance lines, and nine and seven dependents were skipped `gate-failed-dependency`. The file's diagnosis is packet size (a packet should fit about four acts; one carried six). Proposed: a plan warning when a packet has more than four acts, and one continuation sitting on the same branch (an architecture change left to the owner).
- Acceptance line that reads the harness (lines 380-384, 2026-10-08): a row went red only because an acceptance line grepped a `Makefile`, and the gate lays main's `Makefile` over the branch, so the line read main's copy. The red still stopped the dependents. Proposed: warn at plan.
- Load flake (line 442, 2026-10-11): a full `make check` went red under a load of 20 on 16 cores when a hand gate started four minutes in; one test took 3.047 s against its limit and the `internal/night` package hit Go's default 10-minute test timeout. Alone, that package took 316 s. Proposed: a `-timeout` in the Makefile or split the slowest tests.
- Environment read as code failure (line 473, night 2026-10-11): a verify failed on "no space left on device" in a Go cache, yet the report's cause quoted the log's last line, so an environment fault read as a code fault.
- Cost shown as $0.00 (line 130, 2026-09-30): `status` printed a running row's cost as $0.00 while the real figure was $17.55 once the sitting ended; AR28 made unread costs print as "unread".
- Reviewer agents run out of turns (lines 483 and 527, 2026-10-11): the adversary agent (`maxTurns: 80`) ended at its cap with no report three times in one day; a prompt line "report by turn 70" did not help because the agent cannot see its turn count. The attendant agent (`maxTurns: 20`) stopped at 20 turns with no report.
- `relay plan` writes ledger lines under a night id it does not own (line 518, 2026-10-11): a plan left an empty night directory that a reader took for a real night, and an orchestrator's first run that evening was "refused as nested by a stale relay plan" (not reproduced).
- Guards stop reviewers (line 271, 2026-10-02): the relay guard refused a copy of a worktree as "device" in a helper that was no sitting; the owner's stray-write hook refused a scratch script. None checked against the guards' tests.
- Status and report disagreed in turn counts on a stopped night (ninth sighting, around line 298); AR51 made both read one function.
- Version and install gaps: `relay version` printed `0.1.0-dev` with no commit (line 536); a plugin change is not tied to a version bump, so an installed plugin copy stayed old while the agents changed (line 522).

## Limits
- Written by the observer session and by reviewer agents; items are marked "not checked" or "not confirmed" where the author did not verify. Several quote ledger lines that are not in the repo (the ledger never enters a repo), so those figures cannot be re-read here.
- Row names and the downstream repo are private and are not repeated in this note.

## Used in
- research/synthesis/tools-relay.md
