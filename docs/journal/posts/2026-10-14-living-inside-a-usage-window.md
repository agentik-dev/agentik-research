---
date:
  created: 2026-10-14
categories:
  - Open
  - Did not work
description: A subscription meters use in five-hour windows under a weekly limit. We built two answers, a band that paces helpers and a pause that waits for the reset. Neither has run long enough to say if it works.
---

# Living inside a usage window

A Claude Code subscription meters use in rolling five-hour windows, under a weekly limit. Long unattended work meets both. We built two answers: agentik-session's band, which paces helpers to use most of each window without hitting the wall, and agentik-relay's pause, which lets a night wait out the reset. Both are built. Neither is proven, and an early live reading of the band counted sessions that had already ended.

<!-- more -->

## The problem

As of October 2026, a Pro or Max subscription has a five-hour session limit and a weekly limit, both shared with chat, and Anthropic publishes no token counts for either.[^promax][^pricing] An orchestrator that starts a burst of helpers can hit the five-hour limit mid-act. One that holds back leaves part of the window unused.

Unattended work makes it worse, because nobody is there to restart a stopped run. The owner's request to the relay put it plainly: "sessions and relay runs resume by themselves after a usage limit (the 5-hour window), instead of stopping."[^resume]

## A human example: hitting the wall

Barry Smyth studied 4,183,362 marathon results from 270 races. He defined "hitting the wall" by pace alone: after 20 km, slowing by at least a quarter for at least 5 km. By that measure 34 percent of runners hit the wall, and it cost them on average 31.50 minutes (men) and 33.20 minutes (women) against their recent best.[^smyth]

The fastest runners pace differently. In 34 men's 10,000 m world records, the first and last kilometres were faster than the middle: an even pace held to a fixed distance, with a reserve spent at the end.[^tucker] A usage window is a race of known length. The step from runners to agents is our analogy: spend too fast and the work stops short of the reset; hold back and part of the window goes unused.

## What the research teaches

The [budgets chapter](../../field/budgets-and-lanes.md) found no measured study of pacing agent work to a usage limit. What it has is the vendor's description of the limits and single users' transcripts.

## What we built

**The band (agentik-session).** The owner asked for two things at once: a burst of helpers must not fail at the usage limit, and at least 90 percent of each five-hour window should be used.[^admission] The band reads the window's use and projects the peak if one more helper starts. By design it refuses a spawn only above a ceiling of 97 percent less a margin of 3; in its current mode it refuses nothing (see below). When there is room, it tells the orchestrator how many more helpers fit, so work is pulled forward rather than held back. A report marks a window held (a spawn waited) or idle, and flags any window under 90.[^admission][^rules][^runbook] It shows as a second status line:[^runbook]

```
5h 72% → 91% · ceiling 97 · resets 14:05 (1h12) · 3 helpers, room for 2 · 1 deferred · 7d 41% · observe
```

The weekly limit enters near its own reset. When the weekly reset comes before the five-hour one, the band projects its background use to the weekly reset instead, because weekly allowance left at its reset is lost; each helper's own share keeps the five-hour reset.[^admission]

**The pause (agentik-relay).** A night runs until the account refuses, then waits. At a five-hour limit the whole night pauses and wakes two minutes after the reset; a weekly limit stops the night at once. A night pauses at most 12 times, and without an `--until` time a wake more than six hours away stops it instead.[^pause]

The window gates helpers, not a sitting's budget. The first design sampled the window and scheduled a resume at the reset, and it failed on 2026-09-12. The rebuilt tool kept each sitting's own context and turn meter as its budget, and brought the window back to gate helper spawns.[^band] A sitting that finds no room waits for the window's reset.[^rules]

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> Both are built and tested on synthetic cases. The band runs in observe mode: it records its verdict and refuses nothing. No count shows how many windows reached 90 percent.

</div>

An early live reading was wrong. On 2026-10-13 the band read `5h 41% → 260%` while six sessions counted as running, three of which had already ended.[^nth] The old rule counted an ended session as running for 45 minutes. After the fix, a session that resumes counts as zero until its first reading: at most 6.9 minutes across 131 hand-overs in the live ledger.[^nth]

The relay's pause has 42 tests, all on fakes.[^pause] The evidence it was built on is thin in a telling way. The relay's own ledger holds five limit stops, none of them a five-hour window. The command line's transcripts hold 35 five-hour messages, 35 weekly and 46 for a single model.[^resume]

## What has not worked, and what is open

The band does not yet act. `enforce` is "not built yet".[^rules] The design lists six proofs it owes, among them whether the engine drops a reading past its reset and whether a helper that fails at the limit resumes. None is recorded as done.[^band]

The relay has the data and does not read it. The stream it consumes carries the five-hour and seven-day use as fractions, and no relay code reads those fields.[^pause] A paused night also keeps its lock until the wake, for up to six hours or to its `--until` time, which refuses the owner's own commands meanwhile.[^resume]

And the five-hour target and the weekly limit can pull against each other. The owner ruled that the five-hour target comes first, with a refusal kept only near the weekly limit.[^band] Whether that is the right order, we will learn by running it.

<p class="ak-written">Written 2026-10-14 from agentik-session at commit 89c69a8 and agentik-relay at commit 405d1e0.</p>

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
[^rules]: agentik-dev/agentik-session, "claude_session/rules.py", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/claude_session/rules.py>.
[^band]: agentik-dev/agentik-session, "design/overhaul-r1.md", "design/admission-r1.md" and "OPEN-QUESTIONS.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/tree/89c69a8/design>.
[^runbook]: agentik-dev/agentik-session, "RUNBOOK.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/RUNBOOK.md>.
[^nth]: agentik-dev/agentik-session, "NICE_TO_HAVE.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/NICE_TO_HAVE.md>.
[^pause]: agentik-dev/agentik-relay, "internal/night/pause.go" and packets AR63 to AR71, commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/internal/night/pause.go>.
[^resume]: agentik-dev/agentik-relay, "design/usage-limit-resume-r1.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/usage-limit-resume-r1.md>.
