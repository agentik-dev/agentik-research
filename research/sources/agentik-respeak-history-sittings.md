---
repo: agentik-dev/agentik-respeak
path: history/sittings/
commit: eb7d642
title: "history/sittings: 40 working-session charters, 2026-09-22 to 2026-10-13"
author: agentik-dev
published: "2026-09-22 to 2026-10-13 (the dates in the file names)"
accessed: 2026-10-14
kind: our-use
---

## What it says
- 40 charters, each 1.3 to 3.8 KB: 8 on 2026-09-22, 18 on 2026-09-23, 8 on 2026-09-24, 3 on 2026-10-11, 2 on 2026-10-12 and 1 on 2026-10-13. Each has a header table (goal, budget, pin, window, agents), a done-ness checklist, a handover of choices for the owner, a next act and an exit line. The public git history is three commits (the first public commit is dated 2026-10-13), so these charters are the working record.
- I searched all 40 for incidents of a person misreading agent shorthand: none. A search for outsider, opaque, alien, decode and supervise found only a reviewer's "supervisor" kill-signal sense (2026-09-23-12).
- Render incidents that show the prose-only verifier at work. 2026-09-22-3b: without a render contract, round 1 of `make readme` "summarized the whole document and verify-edit failed on everything"; the fix was a keep-the-structure contract. 2026-10-11-2: two failed README renders (run 1 killed at the 600 s wall; run 2 with the wall at 1200 s, the runner exited 1). 2026-10-12-1: two failed renders (a sandboxed runner exited 1; the second render "broke inline code spans in the untouched 'The scanner' paragraph, verify-edit refused", README untouched). 2026-10-12-2: the budget allowed "one reworded retry on a digit refusal"; then `make readme` exit 0 on the first try. 2026-10-13-1: act 1 `make readme` "failed twice here (the translator changed fenced and inline code; verify-edit refused, README untouched)"; act 2 rendered on the second try after a long source line was rewrapped, because the first attempt broke an inline code span; act 0's render took 6 minutes. Handover: the renderer re-words README prose on every run, so `make readme` followed by `git status` cannot come back clean.
- 2026-09-24-2: `make readme` passed the verifier once, and "the translator reworded four other prose sentences (proved prose-only)".
- 2026-09-23-5-adv6 and later: the adversarial reviews' findings by severity (4 high, 5 medium, 3 low for ADV6) and the packets that fixed them (see `agentik-respeak-design-reviews`).
- 2026-09-23-11: the README source was cut to a public document (17,740 bytes, scanner PASS, longest sentence 29 words).
- Re-checked at eb7d642: `ls history/sittings | wc -l` reads 41, one more than the 40 above. The addition is `2026-10-13-2.md`, the rename packet agentik-r1-respeak: four commits, `make check` exit 0 in 95 s at load 6.9 with 275 tests and 10 suites, and an open item that no `make venv` target exists (lines 11-21 of that charter). The public git history is 10 commits at eb7d642 (`git rev-list --count HEAD`).
- Searched `history/`, `design/`, `docs/`, the CHANGELOG, `NICE_TO_HAVE.md` and `plugin/docs/` at eb7d642 for an incident in which a person could not read agent shorthand (terms: unreadable, opaque, illegible, alien, cryptic, jargon, could not read, outsider, supervis). No charter, review or changelog entry records one, with a case, a count or a transcript. The only statement of the failure is a prediction in `docs/architecture.md:19-20`, and the README's "Why it exists" (README.md:14-15 and design/readme/source.md:14-15). The charter hit for "supervis" (2026-09-23-12.md:18) is a process-kill signal, not a reader.

## Limits
- Charters are summaries written by the building session at its own exit. They name private products, a device and people in several places; this note names none. Titles use the repository's earlier name.
- A failure count across all runs of `make readme` is not recoverable from the charters; only the sittings above state their outcome.
- The absence is a negative result from my searches, not proof that no such case happened; the charters are builders' exit notes. My conjecture: the drift the repo cares about would show in relay transcripts, which the repo does not keep.

## Used in
- research/synthesis/tools-respeak.md
- research/synthesis/journal-two-lanes.md
