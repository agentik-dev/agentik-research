---
repo: agentik-dev/agentik-session
path: design/admission-r1.md, claude_session/admission.py, claude_session/rules.py, OPEN-QUESTIONS.md, history/sittings/2026-10-14-2-band-target.md, plugin/skills/session/SKILL.md, RUNBOOK.md, NICE_TO_HAVE.md
commit: 89c69a8
title: "agentik-session: the band target, how the tool reads a five-hour window and a weekly reset"
author: agentik-dev
published: 2026-10-14
accessed: 2026-10-14
kind: our-use
---

## What it says
- Where it came from. The first design sampled the window from statusline renders and scheduled a resume at the reset; it failed on 2026-09-12 (bugs/2026-09-12-overnight-window.md; see agentik-session-bug-overnight-window). The overhaul retired "the five-hour usage-window model as the primary budget" and kept the sitting's own meter as the budget (design/overhaul-r1.md:29): 180k context, 400 turns. The window came back in a narrower role in admission-r1 (2026-10-10): the engine pushes a reading to a hook, the window gates only helper spawns, and the sitting's budget stays the meter's (design/admission-r1.md:13).
- The target (design/admission-r1.md:9, :64-66). The owner's ask: a burst of helpers must not fail at the usage limit, and at least 90% of each five-hour window should be used. The design reads the target as a floor on use and the ceiling as a cap: a spawn is refused only at the cap, a deferral ends as soon as the spawn fits, "room for N" tells the orchestrator to pull work forward, and `report` marks a window `held` (a spawn waited) or `idle`, with `under 90` flagged (RUNBOOK.md:231). The tool cannot make work, so an idle window under 90 is reported, not hidden.
- The numbers (claude_session/rules.py:202-209; design/admission-r1.md:48): ceiling 97, margin 3, seven-day ceiling 97; seeds of 0.10 points a minute for each active main thread and 0.15 (opus), 0.05 (sonnet), 0.02 (haiku), 0.25 (fable), 0.15 (other) points a minute for each helper in flight, a helper life of 15 minutes. The mode is `observe`: the verdict is recorded and drawn, nothing is refused, and `enforce` is "not built yet (S27a)" and read as `observe` (rules.py:209; SKILL.md:166-168).
- The projection (design/admission-r1.md:41-45; claude_session/admission.py:383-392). Burn in points a minute is fit by least squares over intervals of 10 to 20 minutes against helpers in flight; below 20 intervals the seeds stand; a main thread is active if it read in the last 45 minutes and has no later end line. The peak is the newest five-hour reading, plus the background burn times the minutes to the reset (`T`), plus each running helper's remaining life times its weight, plus the new spawn's. Two reset times within 60 s count as one.
- The weekly reset (design/admission-r1.md:43; claude_session/admission.py:670-681, `horizon`; OPEN-QUESTIONS.md:7). When the newest seven-day reading's reset is ahead and falls before the five-hour reset, the background term runs to the weekly reset, because weekly allowance left at its reset is lost (the owner's word, 2026-10-14 06:43). Each helper's own term keeps the five-hour `T`. The newest seven-day reading decides even when its reset has passed. The band then reads `week resets HH:MM (h:mm), 5h HH:MM` (claude_session/admission.py:1014-1046). The owner's earlier ruling (OPEN-QUESTIONS.md:8, 2026-10-12): the five-hour target comes first, helpers run to 97% of every window whatever the week shows, and only a refusal near the weekly limit stays, because the owner moves to a second account when the week runs out.
- The band line (RUNBOOK.md:231; design/admission-r1.md:62): one line above the prompt, for example `5h 72% → 91% · ceiling 97 · resets 14:05 (1h12) · 3 helpers, room for 2 · 1 deferred · 7d 41% · observe`. `room` is capped at 99 (admission.py:908) and is the count of further helpers that fit under the ceiling less the margin. The line also goes into the prompt hook's budget context.
- How a sitting is paced by it (claude_session/rules.py:65-67; design/packets/s29-meter-wait.md:15-20). Waiting on the meter (room for 0, or a usage limit hit) is not WAITING: the Next act stays the act, and the wake is the band's reset or one fallback, whichever is first, and it never counts toward the loop's stop.
- The build and its checks. band-target (history/sittings/2026-10-14-2-band-target.md:12-15): the first test set was red with 11 failed and 86 passed (one case: the horizon 77 minutes against 226); a review fix round was red with 8 failed and 93 passed; the gate `make check` ended at exit 0 with 1186 passed. Before it, S25 to S27b built the ledger, `admit` and the band in `observe` (design/admission-r1.md:100-103).

## Measured and not measured
- Recorded as seen in live use (observer reports, not tests): the band read `5h 41% → 260%` while six sessions counted as running, three of them already ended; with three counted the peak would read about 150%, still past the ceiling of 97 (NICE_TO_HAVE.md:179, 2026-10-13; fixed on a branch). The error across 131 end-to-successor cases lasted at most 6.9 minutes after the fix, against 45 before (NICE_TO_HAVE.md:182). A loop stopped at WAITING 3 on a meter wait sat idle about four hours (NICE_TO_HAVE.md:187). A lead, not confirmed: the projected peak rose while a session sat idle, from 286% to 365% with no helper running (NICE_TO_HAVE.md:13-14).
- Not recorded in any file read: the proofs P1 to P6 of design/admission-r1.md:83-92 (whether a helper's responses move the reading, whether the engine drops a reading past its reset, whether a helper failed at the limit resumes, what the Fable limit looks like); the fit's accuracy (P3 asks one day of observe mode and the margin by `T` bucket); the share of five-hour windows that reached 90% or more. The repo holds the verb that would report it (`report`'s `under 90` marker) but no count from it.
- The weekly horizon is checked by synthetic cases only. NICE_TO_HAVE.md:9-11 notes that two code paths (admission.py:815 and :958) still skip past-reset seven-day readings without taking the newest first.

## Limits
- Our use, one owner on one subscription, an early-access Claude Code module interface (version 2.1.296 at design time). The plan's token weights are not published, so the model fits points per minute only. The documentation quotations inside the design are the repo's, not checked here.
- The ceiling of 97, margin of 3 and the seeds are chosen values, labelled reversible, with no derivation in the repo.
- The relay's use of the band (OPEN-QUESTIONS.md:7 points to a design in the relay's repository) is outside this note.
- Spelling: files at this commit mix the old hyphenated command name and `agentik session`. This note writes `agentik session`.

## Used in
- research/synthesis/journal-usage-window.md
