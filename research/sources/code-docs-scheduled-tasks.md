---
url: https://code.claude.com/docs/en/scheduled-tasks
title: "Run prompts on a schedule"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; changelog head v2.1.296, 9 October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Compare scheduling options", as of October 2026: three ways to schedule work. Cloud routines run on Anthropic-managed cloud, need no open session and have a minimum interval of 1 hour. Desktop scheduled tasks and `/loop` run on your machine, with a minimum interval of 1 minute. `/loop` needs an open session; it is restored on `--resume` with exceptions.
- Section "Let Claude choose the interval": `/loop` with no interval is self-paced. After each iteration Claude picks a delay "between one minute and one hour" from what it saw (short while a build runs, longer when nothing is pending) and prints the delay and the reason. A dynamically scheduled loop shows in the task list, is exempt from the jitter rules (corrected on re-opening, see the Re-opened line below), and is still subject to the seven-day expiry.
- The `ScheduleWakeup` call with `stop: true` ends a self-paced loop. If an iteration ends with neither a reschedule nor a stop, Claude Code schedules one fallback wakeup about 20 minutes later and ends the loop if that iteration does not reschedule either. Pressing `Esc` clears the pending wakeup.
- Section "Jitter": recurring fixed-interval tasks run late by up to half the gap to the next run, at most 30 minutes. Table: every 10 minutes, 0 to 5 minutes late; every 30 minutes, 0 to 15 minutes late; hourly or less often, 0 to 30 minutes late. A task written `*/5 * * * *` (what `/loop 5m` creates) is not delayed and starts 4 minutes 45 seconds after the previous run, because a run exactly five minutes later would start after a five-minute prompt cache had expired. One-shot tasks set on the hour or half hour run up to 90 seconds early.
- Section "Seven-day expiry": recurring tasks fire once more and delete themselves 7 days after creation. A session holds at most 50 scheduled tasks. The scheduler checks every second and enqueues due tasks at low priority; a prompt fires between turns, never mid-response.
- Section "Limitations": tasks fire only while Claude Code is running and idle; there is no catch-up (a missed fire runs once when the session goes idle, not once per missed interval); a self-paced `/loop` is not restored on resume. `CLAUDE_CODE_DISABLE_CRON=1` disables the scheduler.
- The page says nothing about a prompt that asks whether to run a loop of 60 minutes or more in the cloud or in the session, and gives no figure for how late a self-paced wakeup lands.
- Re-opened 2026-10-14 (site sitting): section "Let Claude choose the interval" confirms that a self-paced `/loop` has Claude pick, after each iteration, a delay "between one minute and one hour" and print the delay and the reason. Section "Stop a loop": Claude ends a self-paced loop by calling the `ScheduleWakeup` tool with `stop: true`; an iteration that neither reschedules nor stops gets one fallback wakeup about 20 minutes later, and the loop ends if that iteration does not reschedule either; `Esc` clears the pending wakeup. Not on this page: any statement that a scheduled task firing on an idle session resends the full context. The only cache statement is in "Jitter": a `*/5 * * * *` task starts 15 seconds early (4 minutes 45 seconds after the previous run) because a run exactly five minutes later would start after a five-minute prompt cache had expired. The full-context resend on every request is stated on code-docs-prompt-caching, section "How the cache is organized". Correction to the first bullet of this note: the page as read today says a dynamic loop's pending wakeup shows in the task list as a one-shot task, so a wakeup scheduled for `:00` or `:30` can run a little early (section "When a one-shot task runs early": up to 90 seconds); it does not say the jitter rules are exempt for a self-paced loop. Section "Limitations": tasks fire only while Claude Code is running and idle, with no catch-up, and a self-paced `/loop` is not restored on resume.

## Limits
- Vendor documentation; defaults, bounds and jitter rules are as of October 2026 and the loop feature changes quickly (the changelog lists several `/loop` fixes in versions 2.1.290 to 2.1.296).
- The late-start figures describe fixed-interval cron tasks only; an earlier read said the page states that the jitter rules do not apply to a self-paced loop; the page as read on 2026-10-14 does not say so (see the Re-opened line).

## Used in
- research/synthesis/field-4.md
- journal-wake

## Also (question 6)
Re-read on 2026-10-14 for unattended use. As of October 2026.
- Section "Seven-day expiry": recurring session tasks expire 7 days after creation (they fire one last time, then delete themselves); the page says this bounds how long a forgotten loop can run. A session holds at most 50 scheduled tasks.
- Section "Limitations": tasks fire only while Claude Code is running and idle; there is no catch-up for missed fires (a task missed while Claude is busy fires once when it becomes idle); a self-paced `/loop` is not restored on resume; background Bash and monitor tasks are never restored.
- The scheduler checks every second and enqueues due prompts at low priority; a scheduled prompt fires between turns, not mid-response.
- For cron-driven work that must run unattended the page points to cloud routines, a GitHub Actions `schedule` trigger, or desktop scheduled tasks (see code-docs-routines-unattended and code-docs-github-actions-unattended).
- Used in (question 6): research/synthesis/field-6.md
