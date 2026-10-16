# Draft outline: "Living inside a usage window" (journal entry, 2026-10-14)

1. Problem: five-hour and weekly limits shared with chat, no published token counts (support-claude-pro-max-usage, claude-pricing-plans; documented, October 2026); the owner's quote asking runs to resume (agentik-relay-usage-pause-built, design line 3).
2. Human example: 4,183,362 marathon records, 34 percent hit the wall, cost 31.50 and 33.20 minutes (smyth-2021-hit-the-wall; measured); 10,000 m records even with fast first and last kilometres (tucker-2006-world-record-pacing; measured).
3. Research: no measured study of pacing agent work to a limit (field/budgets-and-lanes.md).
4. Approach: the band, target 90, ceiling 97, margin 3, room for N, the band line, the weekly horizon (agentik-session-usage-window-band; our use); the relay pause: reset plus 2 minutes, 12 pauses, 6 h reach, weekly stops (agentik-relay-usage-pause-built); helpers, not sittings, after the 2026-09-12 failure.
5. Does it work: observe mode; `5h 41% → 260%` with ended sessions counted; lag at most 6.9 minutes against 45 across 131 cases (NICE_TO_HAVE.md:179, :182); relay 42 tests on fakes; ledger five limit stops, none five-hour; transcripts 35, 35, 46 (agentik-relay-usage-limit-resume).
6. Open: enforce not built; P1 to P6 unrecorded; the relay never reads utilization; the lock held up to six hours; the five-hour target before the weekly limit (OPEN-QUESTIONS.md:7-8).
Links: field/budgets-and-lanes.md, tools/session.md, tools/relay.md.
