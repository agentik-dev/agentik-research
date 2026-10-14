---
repo: agentik-dev/agentik-research
path: history/sessions/PROMPT-2026-10-13-cloud-research.md
commit: 6b5e5b0
title: "The brief for the research site"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

Read at 6b5e5b0; the file is byte-identical to its first commit, 4703b79 (`git diff 4703b79 6b5e5b0` on the path is empty). Lines read: 13-30, 46-48, 87-114, 125-143.

## What it says
- The owner's brief for this site: three parts (the field, the tools, the practices), phases 0 to 7, the helper types, the evidence levels, the footnote rule, and the limits on private names.
- The phases (lines 103-114): 0 setup (`make setup`, `make check` on the seed, record each source's commit); 1 internal survey (`research/synthesis/tools-<tool>.md`; researcher helpers can run one repo each); 2 external survey (a researcher helper per part 1 question, at most four at once, then `field-<n>.md`); 3 outline (`research/OUTLINE.md`); 4 draft; 5 refute (a refuter per page; fix every unsupported or leaking line; at most two rounds per page); 6 edit (an editor per page, respeak's editorial pass; it keeps the meaning and `make style` must pass); 7 finish (`make check`, rewrite `README.md`, mark the draft pull request ready with a bluf summary). Each phase ends with a commit, a push and the charter brought current (line 105).
- Line 127, an instruction: "Run at most four helpers at once. Read their reports, not their transcripts."
- Line 27: cite only what you opened in this session. Line 48: date every volatile fact "as of <month year>"; do not cite a page you could not open. Line 89: label every claim that could be contested with an evidence level.
- Line 26: "A source repo may name the private product or household that first used a tool." The session describes it generically and never repeats the name; the owner runs a private-term scan before the repo goes public. Line 30: the tools "are young and used by one owner". Line 21: every limit is named.
- Section "Evidence levels", lines 87-95: label every claim that could be contested, in the text or in a table column. Measured: "A study or benchmark with a method you can read." Documented: the vendor's documentation or changelog says so (dated). Reported: "A named practitioner's write-up." Our use: the agentik repos' own record, an incident, a log line or a test; name the repo. Conjecture: reasoned but untested; use it rarely, and say what would test it.
- Lines 131-132 (at this commit): `make check` runs four checks: `scripts/check`, `make style`, `make hygiene`, `make site`.
- Lines 140-143: the charter stays under 4 KB; at about 60% of the window the session finishes the act in flight, writes a Next act that starts `RESPAWN:`, commits, pushes and stops, and a fresh session reads the brief and the charter and goes on.

## Limits
- A brief states instructions, not what ran; the record of what ran is the charter and the commit log.

## How this site uses it
- The method page cites it for the phases, the helper rules, the citation rules and the tools' age.
