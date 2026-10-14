---
repo: agentik-dev/agentik-decisions
path: README.md
commit: 80d59eb
title: "claude-code-decisions (the repository README)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- The tool is a Claude Code plugin plus a stdlib Python tool, `decisions`, for the decisions a repository has settled. A repository keeps them in one sectioned `DECISIONS.md` at its root. The tool serves the ledger with six verbs, `show`, `find`, `new`, `ask`, `answer` and `render`, plus `doctor` and `backlog` (README.md:5-6).
- Why it exists, in the README's words: one owner runs several Claude Code plugins in unattended relay runs, where one session hands its work to the next. The decisions that shape that work must reach every session, and no session should read a long file whole to find them. The ledger groups entries by area and caps its size. `render` copies the few entries every session needs into a generated block in `CLAUDE.md`. An agent reads the rest by number or by area, and a packet carries the entries it touches verbatim. Agents draft questions; only the owner moves an entry into force (README.md:10-15).
- Ledger shape (README.md:17-48): three sections in order, `## In force` (with `### Every session` first, then one `### <area>` each), `## Proposed`, `## Superseded`. An entry in force is one line: number, bold title ending in a period (or `?` or `!`), one paragraph, and a closing parenthetical that opens with a date and then a `;` or `,` and a source. A Proposed line ends `(proposed YYYY-MM-DD; OPEN-QUESTIONS.md)`. A Superseded line holds a date and a fate: `replaced by`, `merged into` or `lapsed with`. Numbers are unique and never reused. At most 25 entries are in force and at most 7 sit under `Every session` (README.md:47). The line `<!-- decisions: legacy below -->` ends the parsed part, so an older ledger can adopt the shape for new entries only (README.md:48).
- `new` writes a four-part question (where things stand, the choice, what each answer sets in motion, the recommendation) into `OPEN-QUESTIONS.md` and a Proposed line into the ledger, under one lock and one new number; it refuses a sixth open question, an option count outside 2 to 4, and a label over five words (README.md:110-136).
- `ask` renders the open questions once through respeak (when installed), writes them back, and prints AskUserQuestion calls, four questions to a call. Without respeak, or on a failed render, the text stays, one warning goes to stderr and the exit is 0 (README.md:138-144).
- `answer` records the owner's answer: a new entry under an area, an amendment of an existing entry, or no entry. It removes the question and its Proposed line, adds an Answered line, and rewrites the `CLAUDE.md` block when that file holds the markers. Both files are written or neither (README.md:146-155).
- `render` lints first in every mode (section shape, entry shape, unique numbers, both caps, the tail, the fate, the questions file), then writes the block between `<!-- BEGIN GENERATED: decisions -->` and `<!-- END GENERATED: decisions -->`. The block holds the `Every session` entries verbatim and one line per other entry in force, `- N Title (area)`. Proposed and Superseded entries stay out (README.md:157-177).
- `backlog` places each repository's `NICE_TO_HAVE.md` against the build order in its `HANDOFF.md`: S1 and S2 items first, then each open step with the items that share a path with it, then S3, then S4. It reads no ledger and writes nothing (README.md:89).
- Configuration: the tool reads no configuration file. The session plugin is an optional provider that `doctor` reports (README.md:215-218).
- Status line: version 0.8.0, rendered 2026-10-13, 356 unittest cases (README.md:279). The version notes (README.md:288-302) record exit-code changes that callers saw: before 0.6.0, `render` and `answer` wrote the block into the ledger itself when the target was the ledger, and exited 0; from 0.6.0 they exit 2 and write nothing (README.md:292). Version 0.3.0 broke 0.2.0 on purpose and dropped the per-file format (README.md:302).
- `make check` runs under a wrapper with one run per tree, an 840 s wall and no start above a load of 4 per core (README.md:260, 269). `tests/skips.allow` lists no skips, and the suite exits 1 on any unlisted skip (README.md:261).

## Limits
- The owner's own description of a young tool, rendered by respeak from `design/readme/source.md` (the author text, which says the same with different prose). It states mechanism and counts, not outcomes. It gives no measurement of context saved and no reason for the numbers 25 and 7.
- "One owner" is stated as the user base (README.md:10).

## Used in
- research/synthesis/tools-decisions.md
