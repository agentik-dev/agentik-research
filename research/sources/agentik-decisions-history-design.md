---
repo: agentik-dev/agentik-decisions
path: history/design/
commit: fabb212
title: "history/design (the per-file record design, its reviews and its change-log)"
author: agentik-dev
published: 2026-09-22 to 2026-09-24
accessed: 2026-10-14
kind: our-use
---

## What it says
Opened: `decisions-r1.md` (sections 1, 3.5, 4.2, 6 to 9; the heading list), `decisions-r1-changelog.md` (the r1, ruled and r2 rows), `ledger-conversion-r1.md` (header, sections 1 to 3), `review-r6.md` (whole), the opening and verdict of `review-adv6.md`, `review-adv10.md`, `review-adv11.md`, and the opening of `decisions-refuter-1.md` and `ledger-conversion-refuter-1.md`. Not opened: `decisions-r1-s34-legacy.md`, `governs.yaml`, `archtest.yaml`.
- The first design (r1, 2026-09-22) kept each ruling as a file with front matter, a closed tag list, a generated index and a verb `rule` that only the owner could use. Its stated invariants: a record is never edited once ruled; only the owner moves a record out of proposed; the index is generated and gated; a reader extracts one ruling, never the log (decisions-r1.md section 1).
- The problem measured at the pin (decisions-r1.md sections 7 and 8.1): the first consumer's ruling log was 242,404 bytes, 214 rulings in one file, with the longest one-line ruling 13,654 bytes and a hand-kept index of 41,576 bytes that lagged four rulings. A hand-written mirror table in that consumer failed its completeness test three times in four days.
- The conversion study (ledger-conversion-r1.md section 2, counts measured 2026-09-22 by its refuter's script, after the refuter found its first counts false): 210 index rows, of which 91 were in force, 88 spent, 18 superseded and 13 mixed; the 91 in-force entries together came to 103,047 bytes and the longest to 6,469 bytes; 75 distinct free-text `governs` cells among the 91, 64 of them used once.
- Token cost is not claimed (decisions-r1.md section 8.2): the section says the owning program attributes "the 2.8x rise" to the corpus and how sessions read it together, and that no measurement isolates the ledger's share. The sentence does not name the quantity that rose; the section's subject is token use. The record claims bytes per lookup and repair turns only.
- The inline-or-retrieve model (decisions-r1.md section 8.3): an index loaded every turn costs its size times the turns; a retrieval costs one extra turn that re-reads the context. With three assumed values (300 turns per sitting, 100k tokens of context, 2 lookups) inline wins below about 667 tokens, about 2.7 KB. The assumptions were to be replaced by a burn report that was specified and not built. The model ignores prompt caching.
- Out of scope by name (decisions-r1.md section 9): optional sections of MADR, Y-statements as prose, per-component directories, static-site tooling of the log4brains kind, MCP servers, hand conversion of the old log, `@`-imports of any index (the record says Claude Code expands them at launch, citing a private research note), and agent-authored rulings in the AgDR style.
- Review record: the first refuter returned PASS WITH FOLDS (0 blocking, 5 major, 9 minor); the conversion study's refuter returned FAIL (5 blocking, 4 major, 8 minor) on three counts false at the pin; the record allowed three passes ever. Three adversarial reviews of the built tool (review-adv6, -adv10, -adv11) list 11, 9 and 7 findings by heading, each with one rated high, and each verdict says the tool is not yet the authority for the first consumer's rulings. The first high finding (ADV6-1) is that "only the owner moves a status" and immutability held only against an agent using the verb politely: a direct file edit could forge an in-force record and every gate stayed green.
- Review r6 (2026-09-23) rebuilt the repo's decisions after one day: 17 entries (R6-1 to R6-17) found across a change-log and charters, seven of them only in the change-log and three only in a charter, so the design record's body still read the first version; five reversals or tensions are listed (review-r6.md sections 1 and 2).
- The owner ruled the four decisions of section 7 in one message on 2026-09-22, accepted all four, and added three directives (changelog row `ruled`).
- Line anchors at fabb212 (`history/design/` is unchanged since 80d59eb). In `decisions-r1.md`: Decision 1 (:198) gives the ledger at 242,404 bytes, 214 rulings in one file, newest first except the last three; it records the owner calling the ledger "the log" and "not trimmed", and quotes the owner's sentence of 2026-09-11, "Aggressively purge the noise." Decision 2 (:200) says the hand index was four rulings behind and the mirror table broke three times in four days. The measure table is :210-215: whole ledger 242,404 bytes; hand index 41,576; longest one-line ruling 13,654; one sub-decision 255, 237 or 180 bytes. Section 8.2 (:219) says no token number is claimed. In `ledger-conversion-r1.md`: the input table is :19-30 (210 index rows: 91 in force, 88 spent, 18 superseded, 13 mixed; the 91 together 103,047 bytes; longest entry 6,469 bytes; 75 distinct free-text `governs` cells) and :102 calls the ledger "a 242 KB newest-first prose ledger".
- What this record shows for the story of a ledger that outgrew its readers: the first consumer's log was about 242 KB in one file with a 41.6 KB hand index, and the response in this record was one file per ruling, which version 0.3.0 later replaced with one capped, sectioned ledger (d17:32-34, `agentik-decisions-d17-four-verbs`). The cap numbers 25 and 7 are not argued in these records; my greps under `history/` for `cap`, `at most 25` and `25 in force` find no rationale for them.

## Limits
- This is the superseded design: version 0.3.0 dropped the per-file format and moved these files here (d17 acceptance A12). Counts describe a consumer repo's ledger at a 2026-09-22 pin, not the current tool.
- The review documents are written by the owner's own reviewer agents; their counts are by heading and not independently checked here. That the three reviews led to the d17 redesign is my inference, not something the repo states.
- The size of the ledger is measured (`wc -c`, per the record's table); what the size cost in tokens or in repair turns is not: section 8.2 says no measurement isolates the ledger's share of the program's rise in token use.

## Used in
- research/synthesis/tools-decisions.md
- research/synthesis/journal-ledger.md
- docs/tools/decisions.md
