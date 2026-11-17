---
repo: agentik-dev/agentik-site
path: history/sessions/PROMPT-2026-10-14-cloud-site.md
commit: 576aaa1
title: "The site sitting's brief, section \"The owner's record\""
author: agentik-dev (the owner's facts, written into the brief)
published: 2026-10-14
accessed: 2026-10-14
kind: our-use
---

## What it says
- The section gives facts from the owner's private repositories, read on 2026-10-14, with generic names to use. Its evidence level is our use.
- Too many questions (2026-09-22): one unattended run's builders each left three to six "decide, owner" items in their handovers; across twenty sittings that became one brief of 50 questions of implementation detail (field names, exit-code mappings, environment variables, JSON key case). The owner ruled all 50 "as recommended" and said: "these decisions are way too granular for where we are at. I'd rather you build something that we can iterate on within a well done design." The rule since: decide inside the design of record, log the choice, and escalate only a fork the design cannot settle.
- The ledger (2026-09-25 to 2026-10-14): on 2026-09-25 one commit wrote 322 review rulings into the owner's home-infrastructure ledger, sorted by domain. By 2026-10-14 the old part of that ledger held 401 entries in about 15,700 words; 385 carry a review-round tag, and 346 come from a single review series. The entries carried no level. On 2026-09-29 the ledger took one entry shape with at most 25 entries in force, and the old text went below a legacy marker.
- The review spin (to 2026-10-05): in a Go infrastructure product driven by nightly unattended runs, about 40 percent of 72 queued rows added no capability (fixes, repairs and retries); five of the six rows queued for the next night were fixes; for about four weeks reviews created findings and findings created rows. The owner's ruling: a sign-off bar per component; once met, a finding becomes work only as a reproduced correctness or safety bug; a review blocks only on an unmet acceptance criterion, a bug or a failing test, or a conflict with the ledger; at most two review rounds; every finding placed against the build order.
- The levels (2026-10-10): the owner asked for priority levels and agentik-session shipped them: S1 harm, S2 blocks the goal, S3 the build order, S4 the rest; the next act takes the highest ready; at most one S4 item a sitting.
- Open: the levels are rules in the prompt and no hook enforces them; the 401 legacy entries still bind and still cost a reader's time, and move into the new shape only when each repo's ledger is folded.

## Limits
- Our use, one owner. The private repositories are not public, so a reader can check these facts only through this section; the counts are the owner's.
- "Home-infrastructure ledger" and "a Go infrastructure product" are the generic names the brief gives; the private names are not repeated.

## Used in
- research/synthesis/journal-ledger.md
- docs/summary.md
- docs/journal/posts/2026-10-10-the-ledger-that-ran-away.md
