---
repo: agentik-dev/agentik-decisions
path: NICE_TO_HAVE.md
commit: 80d59eb
title: "agentik-decisions: what a review left open, none of it blocking"
author: agentik-dev
published: 2026-10-12
accessed: 2026-10-14
kind: our-use
---

## What it says
The file holds 50 bullet items (counted by `grep -c '^- '`), each a review finding or an observer's sighting; nothing in it blocks a merge (opening paragraph). An item leaves when it lands or an entry retires it.
- Sightings of the ledger and question files going stale around the tool: after `new` added two questions, a consumer's `OPEN-QUESTIONS.md` still opened with the sentence "No decision is open" (line 22); its front matter date stayed at the day before two answers were entered (line 23); a hand-written count, "One decision is open: 56", stayed after 56 was answered (line 63). Nothing in the tool writes those lines. Each is labelled "seen in the file" and not confirmed as the tool's doing.
- `ask` cost and rewording: one `ask` over two questions took about three minutes (line 24, the observer's helper, not confirmed); every `ask` sends all open questions through a model again, so a question carried across sessions is reworded each time (line 21).
- `make readme` (the README render, a model call) was refused by its verifier two times in a row on 2026-10-02 and three times in a row on 2026-10-09 for one- or two-line source changes (lines 25 and 29).
- `answer --amends` takes the whole paragraph as an argument; a consuming session wrote a helper script to pass a long one; a `--text-file` is proposed (line 27). The half-length rule counts characters, so a paragraph of about the old length that drops one clause and adds another passes (line 28).
- Doubled title and tail: two real entries came out with both twice and the lint passed (line 30). After the fix, three shapes still evade the refusal and the lint: a tail followed by a period, a tail copied mid-body, and the title repeated as plain text (line 31).
- Atomicity: a kill between `answer`'s two renames leaves the ledger and `OPEN-QUESTIONS.md` disagreeing and temp files behind (line 36).
- `show --area`'s list also names every heading below the legacy marker, about 400 on the largest ledger; `answer --area` with one of those creates a new area above the marker without a word (line 52).
- Whether respeak reads the `.claude/respeak/` copy that `ask` places in the render's temp dir is not shown; one live render would settle it (line 43).
- d23's refuter round: BLOCK on two findings, both fixed before the merge; notes left at S4 (line 32). The backlog verb's round one: one block and two notes fixed; notes left (line 33).
- Review-round labels (`d18 1a`, `d18 2b`, `d-n1 round two`) show the repo's review practice: two rounds per change, findings sorted into fixed-now and parked at S4 here.

## Limits
- Mostly one builder's and one observer's lists in the owner's repo; counts of items are mine. The file does not rank items beyond a trailing `S4`. Several items name consumer repos; the synthesis describes them generically.
- Two items in the opening list (F12, F13) concern the repo's own lexicon and a renamed file, not the ledger.

## Used in
- research/synthesis/tools-decisions.md
