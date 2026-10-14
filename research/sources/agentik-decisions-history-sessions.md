---
repo: agentik-dev/agentik-decisions
path: history/sessions/
commit: 80d59eb
title: "history/sessions (two consumer intakes and the first sitting's prompt)"
author: agentik-dev
published: 2026-09-22 to 2026-10-11
accessed: 2026-10-14
kind: our-use
---

## What it says
Opened in full: `INTAKE-2026-09-29-<consumer>-portfolio-ledger.md`, `INTAKE-2026-10-11-<consumer>-answer-over-the-cap.md`, `PROMPT-2026-09-22-first-sitting.md`. Seen only as grep hits: the other prompts. Not opened: the two `NEXT.taken-*` files.
- Intake of 2026-10-11, an ask from a consumer repo and not a ruling: two sittings each put four questions the same day, each within the cap of five open questions. When their branches merged, `OPEN-QUESTIONS.md` held eight. The sitting that held the owner's answers to four of them ran `decisions answer`, and the tool refused with the line "OPEN-QUESTIONS.md:100: 7 questions open; the cap is 5". The cause: `answer` lints the result of the write and refuses on any problem, but an answer always removes one question, so the cap problem is one an answer cannot cause. The sitting worked around it by setting the other sitting's four questions aside by hand, running four answers, and restoring the four byte for byte: "four hand edits of the two files the tool exists to guard". Recommended fix: drop the cap problem from the result's lint when the count of open questions falls.
- Same intake, "Also seen": `answer --amends` prints the whole old paragraph under `replaced:`; for one consumer entry that is 3.5 KB on every answer. A `--quiet` flag or a truncated print is proposed "to spare a sitting's context" (paraphrase).
- Intake of 2026-09-29: the cross-repo ledger moved to another repo and every entry took a new number, so each citation in this repo is an ask to update. The tool ran on the moved ledger unchanged and `render --lint` exited 0 there. One finding: the generated block lists every entry in force by title, so a portfolio ledger that is also a repo's own ledger shows that repo's local entries to a session in any repo; a way to mark an area as local to its repo would keep the user-level block short. The intake asks for this to be recorded in NICE_TO_HAVE.md.
- The first sitting's prompt (2026-09-22): the repo was seeded from a research sitting on architecture decision records; the rules that bind are "the owner rules; agents draft", decisions are put to the owner in plain language with context, a few at a time, each with a named consumer ("No ruling without a consumer"), and measurement precedes claim. It pins that the consumer ledger is 240 KB and must never be read whole.

## Limits
- Intakes are written by sessions in the consumer repos; the incident is that repo's account, not re-run here. Consumer names are private and are described generically.
- The prompt predates the redesign; its verbs (`rule`, `scope`, `index`) no longer exist.

## Used in
- research/synthesis/tools-decisions.md
