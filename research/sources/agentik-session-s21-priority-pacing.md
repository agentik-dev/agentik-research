---
repo: agentik-dev/agentik-session
path: design/packets/s21-priority-default.md, history/sittings/2026-10-10-4-s21-priority-default.md, claude_session/rules.py, claude_session/profiles.yaml, design/packets/s29-meter-wait.md, NICE_TO_HAVE.md
commit: 89c69a8
title: "agentik-session: packet S21, the priority and pacing defaults (and what the repo recorded after it)"
author: agentik-dev
published: 2026-10-10
accessed: 2026-10-14
kind: our-use
---

## What it says
- The count (design/packets/s21-priority-default.md:16, section 1, "What the source says"). The packet's pacing paragraph opens "Pacing (581 of 614 ScheduleWakeup calls took their own turn; 77 fired)". It gives no definition of "fired" and no source for the count. The header's `from` row (line 5) names only the owner's asks of 2026-10-10. 581 of 614 is 94.6% (derived here, not in the file). 581 plus 77 is 658, more than 614, so the 77 is not the remainder of the 614: the two figures use different bases, or one wake counts in both.
- What the count produced (same line): four pacing rules. (1) The fallback wakeup rides the message of the act's last tool call and never takes a turn of its own. (2) While a helper, a Monitor or a background task is pending, its completion is the wake: one fallback of 1800 s or more, never re-armed on a hand-back. (3) An act that is ready takes the minimum delay. (4) Waiting on an outside party, the Next act says `WAITING`, with a long delay, and the loop stops at the third WAITING with nothing changed.
- The defaults (claude_session/profiles.yaml:48; claude_session/rules.py:38 and :40): pacing is on, `fallback` 1800 s, `waiting` 3; an override may set `fallback` from 60 to 3600 s and `waiting` from 1 to 9.
- Priority texts (design/packets/s21-priority-default.md:15; claude_session/rules.py:27-37; profiles.yaml:41-47). S1 harm: a reproduced bug that can do harm (a wrong write, data loss, a leaked secret, a safety path) or the repo's own gate red on main; it goes first, ahead of the current goal. S2 blocks the goal: an unmet acceptance criterion of the current goal, a defect in a new user's first run, or a dependency that holds the goal. S3 the build order: the goal's next slice, then the repo's pending list. S4 the rest: review notes, polish, refactors, docs; filed in NICE_TO_HAVE.md with its level; taken only when S1 to S3 have nothing ready or on an S3 slice's path; never ahead of S3.
- The rules (packet line 15; rules.py:47-56): an item gets its level when filed; the Next act is the highest level ready; a signed-off component's finding is work only as a reproduced S1; each Handover lists the open items by level, highest first. A bug ranks by harm and what it blocks, never by how sure or cheap its fix is; with neither it is S4. At most one S4 item a sitting, and only when S1 to S3 have none ready (rules.py:55). A review's notes are S4 unless they show harm (S1) or an unmet criterion (S2).
- The block a sitting meets (packet ruling 3, line 22; rules.py:149-163, `clause`): SessionStart appends one line of at most 320 bytes naming the four labels, "the Next act takes the highest ready", and the pacing. Ruling 1 (line 20) puts the S21 block at 265 bytes. The block is not in the conventions document, which holds 9,214 of 9,216 bytes.
- Ruling 4, line 23: "Every shipped profile keeps both on; no hook enforces them (a ScheduleWakeup nudge is filed as S4)." The nudge is filed at NICE_TO_HAVE.md:68 as not built.
- The build (history/sittings/2026-10-10-4-s21-priority-default.md:13-16): 50 `s21` tests (rules 15, resolver 19, hook 3, charter 11, CLI 2), red first with 50 failed on the base, 50 passed after; version 2.0.0-alpha.5. The packet's acceptance line asked for 43 or more (packet :9 and :34). The charter's Handover (line 19) lists the nudge as the one open S4 item.
- After S21, one amendment (design/packets/s29-meter-wait.md:15, :19-20; claude_session/rules.py:65-67; `clause` ends "a meter wait never"): the pacing rules gained a fifth item. Waiting on the usage meter (room for 0, or a usage limit hit) is not WAITING: the Next act stays the act, the wake is the band's reset or one fallback, whichever is first, and it never counts toward the stop. The cause (NICE_TO_HAVE.md:187, 2026-10-14): one orchestrator's loop waited on "room for N" three wakes in a row, stopped at WAITING 3 at 20:48 on 2026-10-13, room opened at 21:47 and the window reset at 00:30, and the loop sat idle about four hours until the owner restarted it.
- A later measurement of wakes, not of the 581 count (NICE_TO_HAVE.md:116, the prompt-cache audit of 2026-10-12): usage fields of 649 transcripts, 2026-10-09 to 2026-10-12. A scheduled wake of 3600 s lands at 3636 to 3648 s, past the main loop's one-hour cache time-to-live, so 26 idle wakes over three days rewrote about 4.8 million tokens (about 235k to 265k each, at an assumed 2x write price). The proposed fix, cap an idle wake at 3300 s, is not built: "3300" appears nowhere in the code or the docs at this commit.

## Limits
- The 581 of 614 count is the packet's own, with no method, date range, transcript set or script in the repo, and no re-count. Nothing in the repo shows whether the four rules lowered it. Do not report an effect.
- Evidence level: our use, one owner, one tool, young. The packet is an instruction to a builder session; its tests prove the block and the resolver, not that sittings pace better.
- The cache-audit figures are the observer's, read from usage fields; the audit script is not in the file. The 2x write price and 0.1x read price are the file's statements, not checked against Anthropic's pricing here.
- Spelling: files at this commit mix the old command name (the hyphenated form the hygiene scan flags) and `agentik session`. This note writes `agentik session`.

## Used in
- research/synthesis/journal-wake.md
