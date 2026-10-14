---
date:
  created: 2026-10-10
categories:
  - Did not work
  - Open
description: 581 of 614 self-paced wakeups in one count took a turn of their own. Four pacing rules followed. The count has not been re-run.
---

# A wake that cost a turn

A sitting that waits should not pay for the wait. Ours did: in one count, 581 of 614 self-paced wakeups took a turn of their own, and every turn resends the conversation. agentik-session gained four pacing rules. The count has not been re-run, so we do not know if they worked.

<!-- more -->

## The problem

A long Claude Code sitting spends much of its time waiting: for a helper, a test run, a usage window. It can schedule its own wakeup and end its turn. Each wake is a new request, and every request reads the conversation's history again.[^costs] When the wait outlasts the prompt cache, that turn writes the whole history to the cache again, at a premium.[^pricing] A sitting that wakes every few minutes to look at a job that has not finished pays that price each time and learns nothing.

## A human example: the cost of coming back

Chris Parnin and Spencer Rugaber logged 85 programmers across 9,899 work sessions. In about one session in ten, the programmer was editing code within a minute of coming back to the task. In about three in ten, the first edit came more than 30 minutes later.[^parnin] The study measures a return after any break, not after a known interruption, so it shows the cost of coming back, not its cause.

A second study made the interruptions on purpose. Gloria Mark and her colleagues interrupted 48 people every two minutes while they answered email. The interrupted people finished faster, with no more errors, and their rated stress rose from 6.92 to 9.46 or 9.13 on a 20-point scale, by the kind of interruption.[^mark] Coming back costs something even when the work comes out fine.

A model pays the same cost in a form you can count: on every return, it reads the whole conversation again.

## What the research teaches

The [budgets chapter](../../field/budgets-and-lanes.md) holds the evidence. Claude Code's own cost guide warns that a scheduled task "fires on its interval even while the session is idle, sending your full context each time".[^costs] As of October 2026, the main conversation gets a one-hour cache by default only on a subscription within plan usage; otherwise the default is five minutes. A cache write costs 1.25 times the base input price for five minutes and 2 times for one hour. A read costs 0.1 times the base price on many models, and less on some newer ones: 0.05 times on Opus 5.5 and Sonnet 5.5.[^caching][^pricing] A self-paced `/loop` waits between one minute and one hour.[^scheduled]

So a wake inside the cache lifetime is cheap, and a wake past it rewrites the cache. No source we found measures what a self-paced loop costs against a scheduled task, so the chapter stops there.

## What we built

On 2026-10-10 the owner asked agentik-session for pacing defaults. Its packet S21 opens its pacing paragraph with the count: "581 of 614 ScheduleWakeup calls took their own turn; 77 fired".[^s21] Next to the count it sets four rules. A SessionStart line of at most 320 bytes carries a short form of them into each sitting that has pacing on:[^s21][^rules]

1. A fallback wakeup rides on the message of the act's last tool call. It never takes a turn of its own.
2. While a helper, a Monitor or a background task is pending, its completion is the wake. The sitting sets one fallback of 1,800 seconds or more and never re-arms it on a hand-back.
3. An act that is ready takes the shortest delay.
4. A sitting that waits on an outside party writes `WAITING` in its Next act and sets a long delay. The loop stops at the third `WAITING` with nothing changed.

The rules live in the sitting's prompt, not in a hook. The packet's ruling 4 says so plainly: "Every shipped profile keeps both on; no hook enforces them (a ScheduleWakeup nudge is filed as S4)."[^s21] A nudge that names a wasted wakeup is filed at the lowest level, S4, and not built.[^nth]

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> One owner, one tool, no count after the change. We do not know whether the rules lowered the 581.

</div>

The build has 50 tests, all red before the change and green after.[^sitting] They prove that the rules are written, parsed and sent, not that sittings pace better. The count itself has no method on record: 581 plus 77 is 658, more than 614, so either the two figures count different things or some wakes count in both.[^s21]

A later look found a second cost. A prompt-cache audit on 2026-10-12 read 649 transcripts from three days. A wake scheduled for 3,600 seconds landed 36 to 48 seconds late, past the one-hour cache lifetime, so 26 idle wakes rewrote about 4.8 million tokens.[^nth] The proposed fix, a cap of 3,300 seconds on an idle wake, is not built.

## What has not worked, and what is open

Rule 4 stopped a loop it should have left running. On 2026-10-13 an orchestrator waited three times on the usage meter, saw no room, and stopped at the third `WAITING` at 20:48. Room opened at 21:47 and the window reset at 00:30. The loop sat idle about four hours, until the owner restarted it.[^nth] A fifth rule followed: waiting on the meter is not `WAITING`. The act stays the act, and the wake is the window's reset or one fallback, whichever comes first.[^s29][^rules]

Three things are open. No hook enforces the pacing rules; the nudge is filed and not built.[^s21][^nth] The 3,300-second cap waits. And the count of 581 has not been re-run since S21; the cache audit measured something else.

<p class="ak-written">Written 2026-10-14 from agentik-session at commit 89c69a8.</p>

<ul class="ak-related" markdown>
<li markdown>[Budgets, pacing and cost lanes](../../field/budgets-and-lanes.md)</li>
<li markdown>[agentik-session](../../tools/session.md)</li>
</ul>

## Sources

[^costs]: Anthropic, "Manage costs effectively", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/costs>.
[^pricing]: Anthropic, "Prompt caching", documentation read 2026-10-14, <https://platform.claude.com/docs/en/build-with-claude/prompt-caching>.
[^caching]: Anthropic, "How Claude Code uses prompt caching", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/prompt-caching>.
[^scheduled]: Anthropic, "Run prompts on a schedule", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/scheduled-tasks>.
[^parnin]: Chris Parnin and Spencer Rugaber, "Resumption Strategies for Interrupted Programming Tasks", undated paper (data collected 2005), <https://sites.cc.gatech.edu/reverse/repository/resumptionstrategies.pdf>.
[^mark]: Gloria Mark, Daniela Gudith and Ulrich Klocke, "The Cost of Interrupted Work: More Speed and Stress", CHI 2008, April 2008, <https://www.interruptions.net/literature/Mark-CHI08.pdf>.
[^s21]: agentik-dev/agentik-session, "design/packets/s21-priority-default.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/design/packets/s21-priority-default.md>.
[^rules]: agentik-dev/agentik-session, "claude_session/rules.py", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/claude_session/rules.py>.
[^sitting]: agentik-dev/agentik-session, "history/sittings/2026-10-10-4-s21-priority-default.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/history/sittings/2026-10-10-4-s21-priority-default.md>.
[^nth]: agentik-dev/agentik-session, "NICE_TO_HAVE.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/NICE_TO_HAVE.md>.
[^s29]: agentik-dev/agentik-session, "design/packets/s29-meter-wait.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/design/packets/s29-meter-wait.md>.
