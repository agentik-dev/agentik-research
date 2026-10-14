---
date:
  created: 2026-10-14
categories:
  - Open
  - Did not work
description: A subscription meters use in five-hour windows under a weekly limit. We built two answers, a band that projects the window and advises how many helpers fit, and a pause that waits for the reset. The band has run live only in observe mode, where it refuses nothing. The pause has run only in tests, on fakes.
---

# Living inside a usage window

A Claude Code subscription meters use in rolling five-hour windows, under a weekly limit. Long unattended work meets both. We built two answers: agentik-session's band, which projects the window's peak and tells the orchestrator how many more helpers fit, and agentik-relay's pause, which lets a night wait out the reset. Both are built. The band only advises: its refusals are not built, and nothing that decides reads it. Neither is proven. Early live readings of the band counted sessions that had already ended, and mixed two accounts.

<!-- more -->

## The problem

As of October 2026, a Pro or Max subscription has a five-hour session limit and a weekly limit, both shared with chat, and Anthropic publishes no token counts for either.[^promax][^pricing] An orchestrator that starts a burst of helpers can hit the five-hour limit mid-act. One that holds back leaves part of the window unused.

Unattended work makes it worse, because nobody is there to restart a stopped run. The owner's request to the relay put it plainly: "sessions and relay runs resume by themselves after a usage limit (the 5-hour window), instead of stopping."[^resume]

## A human example: hitting the wall

Barry Smyth studied 4,183,362 marathon results from 270 races. He defined "hitting the wall" by pace alone: after 20 km, slowing by at least a quarter for at least 5 km. In the paper's sensitivity analysis, those thresholds mark 34 percent of runners in the full dataset. Its comparisons use the 2,179,221 results of runners with more than one race. There, 28 percent of men and 17 percent of women hit the wall, and it cost them on average 31.50 minutes (men) and 33.20 minutes (women) against their recent best.[^smyth]

The fastest runners pace differently. In 34 men's 10,000 m world records, the first and last kilometres were faster than the middle: an even pace held to a fixed distance, with a reserve spent at the end.[^tucker] A usage window is a race of known length. The step from runners to agents is our analogy: spend too fast and the work stops short of the reset; hold back and part of the window goes unused.

## What the research teaches

The [budgets chapter](../../field/budgets-and-lanes.md) found no measured study of pacing agent work to a usage limit. What it has is the vendor's description of the limits and single users' transcripts.

## What we built

**The band (agentik-session).** The owner asked for two things at once: a burst of helpers must not fail at the usage limit, and at least 90 percent of each five-hour window should be used.[^admission] The band takes the newest five-hour reading from one ledger per machine, across every session in it, with no account key.[^admission][^nth] Before each spawn, `agentik session admission admit` projects the window's peak at its reset with the new helper added. When there is room, the band says how many more helpers fit under the ceiling less the margin ("room for 2"), so the orchestrator can pull work forward rather than hold it back.[^runbook][^admission] It shows as a second status line, and the prompt hook adds the same line to the session's context:[^runbook]

```
5h 72% → 91% · ceiling 97 · resets 14:05 (1h12) · 3 helpers, room for 2 · 1 deferred · 7d 41% · observe
```

At the head, the band observes and advises; it decides nothing. `observe` is its only mode: each verdict is one line in the debug log, and "the spawn goes ahead whatever it says". The band is drawn from one file, and "nothing that decides reads the file".[^runbook] A setting of `enforce` reads as `observe`, with the note that enforce "is not built yet (S27a)".[^rules]

The verdicts are designed, not enforced. A spawn is to be admitted while its projected peak plus a margin stays at or under a ceiling: 97 and 3 in observe mode, while in enforce "the margin is a function of T", the minutes to the reset. Past the ceiling, an interactive spawn is deferred until it fits. On a stale reading, one spawn at a time may start until a fresh reading lands, and a seven-day reading past its own ceiling denies spawns.[^admission] A report marks each window `held` when a spawn waited in it ("in observe: would have") or `idle`, and flags any window under 90.[^runbook]

The weekly limit enters near its own reset. When the weekly reset comes before the five-hour one, the band projects its background use to the weekly reset instead, because weekly allowance left at its reset is lost; each helper's own share keeps the five-hour reset.[^admission]

**The pause (agentik-relay).** A night runs until the account refuses, then waits. At a five-hour limit the whole night pauses and wakes two minutes after the reset; a weekly limit stops the night at once. A night pauses at most 12 times, and without an `--until` time a wake more than six hours away stops it instead.[^pause]

**Why helpers, not sittings.** The first design sampled the window and scheduled a resume at the reset, and it failed on 2026-09-12. The rebuilt tool kept each sitting's own context and turn meter as its budget. The admission design brought the window back in a narrower role: to gate helper spawns only.[^band] In observe mode it gates nothing yet. A sitting that waits on the meter (room for 0, or a usage limit hit) keeps its next act and wakes at the band's reset or after one fallback, 1800 s by default, whichever comes first. On the 1h prompt cache, an idle wait, the meter wait included, wakes at most 3300 s apart. These are rules the sitting is told; no hook enforces them.[^rules]

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> Both are built and tested on synthetic cases. The band runs in observe mode: it records its verdict, advises, and refuses nothing. No count shows how many windows reached 90 percent.

</div>

An early live reading was wrong. On 2026-10-13 the band read `5h 41% → 260%` while six sessions counted as running, three of which had already ended.[^nth] The old rule counted an ended session as running for 45 minutes. After the fix, a session that resumes counts as zero until its first reading: at most 6.9 minutes across 131 hand-overs in the live ledger.[^nth]

The relay's pause has 42 tests, all on fakes.[^pause] The evidence it was built on is thin in a telling way. The relay's own ledger holds five limit stops, none of them a five-hour window. The command line's transcripts hold 35 five-hour messages, 35 weekly and 46 for a single model.[^resume]

## What has not worked, and what is open

The band does not yet act. `enforce` is "not built yet", and nothing that decides reads the band.[^rules][^runbook] The design lists six proofs it owes, among them whether the engine drops a reading past its reset and whether a helper that fails at the limit resumes. None is recorded as done.[^band]

The band mixed two accounts. It takes the newest five-hour reading across every session in the ledger, with no account key, so two logins on one machine share one band. On 2026-10-14 the ledger held two accounts at once: each session's line showed whichever wrote last, and the projection and the room were fitted across both. The status line gives no account id; the repo proposes keying readings by the pair of reset times. At the head it is filed at level S3, not fixed.[^nth]

Idle waits missed the prompt cache. An audit of 2026-10-12 found that a wake asked for at 3600 s fired at 3636 to 3648 s, past the main loop's 1h cache, so each such wake rewrote the whole context: 26 misses over three days wrote about 4.8M tokens.[^nth] On 2026-10-14, merge `dac92b5` (packet S30) added the rule that an idle wait on the 1h cache wakes at most 3300 s apart.[^s30][^rules] That is a code change with tests; the files read record no live count since.

The relay has the data and does not read it. The stream it consumes carries the five-hour and seven-day use as fractions, and no relay code reads those fields.[^pause] A paused night also keeps its lock until the wake, for up to six hours or to its `--until` time, which refuses the owner's own commands meanwhile.[^resume]

And the five-hour target and the weekly limit can pull against each other. The owner ruled that the five-hour target comes first, with a refusal kept only near the weekly limit.[^band] Whether that is the right order, we will learn by running it.

<p class="ak-written">Written 2026-10-14 from agentik-session at commits 89c69a8 and e8477a7 (its head that day) and agentik-relay at commit 405d1e0.</p>

<ul class="ak-related" markdown>
<li markdown>[Budgets, pacing and cost lanes](../../field/budgets-and-lanes.md)</li>
<li markdown>[agentik-session](../../tools/session.md)</li>
<li markdown>[agentik-relay](../../tools/relay.md)</li>
</ul>

## Sources

[^promax]: Anthropic, "Using Claude Code with your Pro or Max plan", support article read 2026-10-14, <https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan>.
[^pricing]: Anthropic, "Claude pricing", read 2026-10-14, <https://claude.com/pricing>.
[^smyth]: Barry Smyth, "How recreational marathon runners hit the wall: A large-scale data analysis of late-race pacing collapse in the marathon", PLoS One 16(5):e0251513, 19 May 2021, <https://pmc.ncbi.nlm.nih.gov/articles/PMC8133477/>.
[^tucker]: Ross Tucker, Michael I. Lambert and Timothy D. Noakes, "An analysis of pacing strategies during men's world-record performances in track athletics", International Journal of Sports Physiology and Performance, September 2006, <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:19116437%20AND%20SRC:MED&format=json&resultType=core>.
[^admission]: agentik-dev/agentik-session, "design/admission-r1.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/design/admission-r1.md>.
[^rules]: agentik-dev/agentik-session, "claude_session/rules.py", commit e8477a7, <https://github.com/agentik-dev/agentik-session/blob/e8477a7/claude_session/rules.py>.
[^band]: agentik-dev/agentik-session, "design/overhaul-r1.md", "design/admission-r1.md" and "OPEN-QUESTIONS.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/tree/89c69a8>.
[^runbook]: agentik-dev/agentik-session, "RUNBOOK.md", commit e8477a7, <https://github.com/agentik-dev/agentik-session/blob/e8477a7/RUNBOOK.md>.
[^nth]: agentik-dev/agentik-session, "NICE_TO_HAVE.md", commit e8477a7, <https://github.com/agentik-dev/agentik-session/blob/e8477a7/NICE_TO_HAVE.md>.
[^s30]: agentik-dev/agentik-session, "merge s30-cache-lifetime: the idle wake follows the cache lifetime in force", commit dac92b5, 2026-10-14, <https://github.com/agentik-dev/agentik-session/commit/dac92b5>.
[^pause]: agentik-dev/agentik-relay, "internal/night/pause.go", packets AR63 to AR71, and their tests (the `TestAR63` to `TestAR71` functions in the `ar63` to `ar71` test files under `cmd/agentik-relay/` and `internal/`), commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/internal/night/pause.go>.
[^resume]: agentik-dev/agentik-relay, "design/usage-limit-resume-r1.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/usage-limit-resume-r1.md>.
