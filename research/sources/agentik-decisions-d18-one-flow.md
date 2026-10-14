---
repo: agentik-dev/agentik-decisions
path: design/d18-one-flow.md
commit: 80d59eb
title: "d18: one flow from fork to entry"
author: agentik-dev
published: 2026-09-28
accessed: 2026-10-14
kind: our-use
---

## What it says
- The design of record for version 0.4.0; the packet `design/packets/d18-one-flow.md` builds it, and where the two differ the packet holds (header).
- Before d18, `new` took one prose `--answers` string, nothing named AskUserQuestion or respeak, and an answer became an entry by hand (opening paragraph).
- The flow (section 1): record a fork with `new`; ask once per session through the `ask` skill; enter each answer with `answer`; a sitting without AskUserQuestion (such as a relay child) runs `ask` at close for the render alone, and the owner answers on the `Your answer:` line for the next attended sitting to record.
- The field mapping (section 1.1): AskUserQuestion in Claude Code 2.1.284 takes one to four questions per call and two to four options per question; the header is advised to stay within 12 characters; the interface adds "Other" itself. Five open questions therefore make two calls.
- `answer` (section 1.2): a pick matches a label ignoring case and the recommended marker; an amendment keeps the entry's whole tail including earlier amendments; every run removes the question and its Proposed line and adds an Answered line, and `next_number` counts Answered lines so a number stays retired. A result with `afkTimeoutMs` is no answer, and the question is not asked again that session.
- One entry shape (section 2): two older ledgers, of 393 and 98 entries in other shapes, fail the lint; the cross-repo ledger and the relay repo's ledger passed it on 2026-09-28. The lint gains L1 (the tail names a source), L2 (a Superseded line holds a date and a fate), L3 (the questions file) and L4 (the legacy marker). No `migrate` verb: each repo adopts the shape in its own sitting.
- The respeak contract (section 3): decisions calls respeak and respeak knows nothing of decisions; one render per `ask` run, outside the lock, then a write-back under the lock; a block that loses a heading, number, bold label or option label keeps its old text; with respeak absent the text stays, a warning goes to stderr, and the exit is 0.
- Choices made inside the design, each reversible (section 6): per-repo `OPEN-QUESTIONS.md` rather than one shared file; the contract is a constant in the package because the installed CLI cannot read the plugin's files; a skill and a command of the same name collide, so the skill alone serves `ask`; `ask` renders outside the lock because a render outlasts the lock's 5-second wait; `answer --note` dropped because nothing in the flow reads it.
- The owner's word of 2026-09-28, "take the recommendations", settled eight points (section 7): `ask` and `answer` become real verbs; an older ledger takes new entries only; the respeak measure-and-rerun gate is cut; respeak's own `hooks.ask` stays unbuilt.

## Limits
- A design written for a builder, by the owner's tooling; it records intent, not outcome. Two of its statements are stale at 80d59eb: NICE_TO_HAVE.md says section 3's temp-dir sentence changed in 0.7.0, and line 17's `answer` usage lacks the now-required group.
- Its claims about AskUserQuestion limits and the plugin skill/command name collision are the repo's, dated by version 2.1.284; not checked here.

## Used in
- research/synthesis/tools-decisions.md
