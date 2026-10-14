---
repo: agentik-dev/agentik-decisions
path: NICE_TO_HAVE.md
commit: fabb212
title: "agentik-decisions: what a review left open, none of it blocking"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
At fabb212 the file is 69 lines and holds 56 bullet items (counted by `grep -c '^- '`; the survey at 80d59eb counted 50), with front matter `updated: 2026-10-13`, each a review finding or an observer's sighting; nothing in it blocks a merge (opening paragraph). An item leaves when it lands or an entry retires it.
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
- Line anchors at fabb212 for the facts the ledger story uses. Line 22: a consumer's `OPEN-QUESTIONS.md` still opened with "No decision is open." above questions `new` had added. Line 23: its front-matter date stayed at the day before two answers. Line 52: `show --area`'s list "also names every heading below the legacy marker (about 400 on the largest ledger)", and `answer --area` with one of them creates a new area above the marker without a word. Line 63: after question 56 was answered, a consumer's preamble still read "One decision is open: 56", so the file the owner reads said a question was open when none was; the plugin writes no count line, and the finding proposes that `render --lint` flag a preamble whose stated count differs from the open blocks. Line 64: `design/readme/source.md` holds 24,570 of the 24,576 bytes the test allows.
- Six bullets are new since 80d59eb (lines 64-69), all from the rename packet agentik-r1-decisions and its review: the README source size (64), the list of fallbacks the next rename packet drops (65), `make install` stopping on an old executable (66, the only line that uses "S3" as a level), `BINDIR` not steering `uv tool install` (67), a `pyenv` warning until the new venv exists (68), and an unreproduced permission-prompt risk (69).
- Nothing in the file mentions the cap on open questions refusing an `answer`, which the 2026-10-11 intake reported (see `agentik-decisions-history-sessions`).

## Limits
- Mostly one builder's and one observer's lists in the owner's repo; counts of items are mine. The file ranks items only by a trailing level token: `grep -c 'S[1-4]'` finds 32 lines, 31 of them naming S4 (some in review-round labels), and one (line 66) uses S3 as the item's level; no bullet carries S1 or S2 as a level (line 33 names `S1` once, inside its description of the parser). Several items name consumer repos; the synthesis describes them generically.
- Two items in the opening list (F12, F13) concern the repo's own lexicon and a renamed file, not the ledger.

## Used in
- research/synthesis/tools-decisions.md
- research/synthesis/journal-ledger.md
