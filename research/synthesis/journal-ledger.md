# Draft outline: "The ledger that ran away" (journal entry, 2026-10-10; required)

Story shape, claims in order, each with its source slug and evidence level.

1. Problem: 322 review rulings in one commit (2026-09-25); by 2026-10-14 the old part held 401 entries, about 15,700 words; 385 with a review-round tag, 346 from one series; no levels (owner-record-2026-10-14; our use).
2. Human example: the Emergency Severity Index, five levels at the door; purpose quote (p. 1); level 2 test "Would I give my last open bed to this patient?"; never count past two resources; weighted kappa 0.68 five levels against 0.53 three levels at one hospital (ahrq-esi-implementation-handbook; documented, reliability second-hand).
3. Research: Claude Sonnet 4 followed 94.4 percent of 100 instructions and 42.9 percent of 500 (jaroslawicz-ifscale; measured); review rounds 34.8, 40.6, 43.0, 43.4, 44.0 on SWE-bench Verified, one fine-tuned Qwen3-8B (wang-swe-review; measured); GPT-4 GSM8K 95.5 to 89.0 over two self-correction rounds (huang-self-correct; measured); ADRs: one decision, one or two pages, numbers never reused, reversed records kept and marked superseded (nygard-documenting-architecture-decisions; reported).
4. Approach: the 50 questions and the owner's quote (2026-09-22); cap of 25 in force and 7 every session, legacy marker (agentik-decisions-readme, README.md:46-47); the sign-off bar ruling (to 2026-10-05); S1 to S4 (2026-10-10; agentik-session-s21-priority-pacing); a cap over an index: 242,404 bytes, 214 rulings, 41,576-byte index four rulings behind (agentik-decisions-history-design).
5. Does it work: the lint refuses a 26th or an 8th (agentik-decisions-src, ledger.py:40, :249-255); no count of fix rows or S4 items after.
6. Open: 401 legacy entries still bind; levels unenforced (S21 ruling 4); the question cap refused an answer: "7 questions open; the cap is 5" (agentik-decisions-history-sessions).
Links: field/review.md, field/memory.md, tools/decisions.md, tools/session.md.
