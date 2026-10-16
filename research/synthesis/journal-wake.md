# Draft outline: "A wake that cost a turn" (journal entry, 2026-10-10)

Story shape, claims in order, each with its source slug and evidence level.

1. Problem: a waiting sitting schedules its own wakeup; each wake is a turn; a turn resends the conversation; past the cache lifetime it rewrites the cache. (prompt-caching docs, scheduled-tasks docs; documented)
2. Human example: coming back costs. Parnin and Rugaber, 85 programmers, 9,899 sessions: about 10 percent edit within a minute of return, about 30 percent take over 30 minutes (parnin-rugaber-resumption-strategies; measured). Mark et al.: 48 people interrupted every two minutes worked faster, stress 6.92 to 9.46 of 20 (mark-cost-of-interrupted-work; measured).
3. Research: each turn resends the whole conversation; one-hour cache on a subscription within plan usage, else five minutes; write 1.25x or 2x, read 0.1x; /loop waits 1 minute to 1 hour; no source measures a self-paced loop against a scheduled task (field/budgets-and-lanes.md; documented).
4. Approach: S21's count "581 of 614 ScheduleWakeup calls took their own turn; 77 fired"; four pacing rules; defaults fallback 1800 s, waiting 3; SessionStart line at most 320 bytes; ruling 4: no hook enforces them (agentik-session-s21-priority-pacing; our use).
5. Does it work: 50 tests prove the block, not the pacing; no re-count; 581 + 77 > 614, bases differ; cache audit 2026-10-12: 649 transcripts, a 3600 s wake lands at 3636 to 3648 s, 26 idle wakes rewrote about 4.8 million tokens; 3300 s cap proposed, not built (same note; our use).
6. Not worked and open: WAITING 3 stopped a meter wait, idle about four hours; S29 fifth rule; the nudge not built; whether the rules lowered the count.
Links: field/budgets-and-lanes.md, tools/session.md.
