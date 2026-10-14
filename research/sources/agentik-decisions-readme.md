---
repo: agentik-dev/agentik-decisions
path: README.md
commit: fabb212
title: "agentik-decisions (the repository README)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
Line numbers are at fabb212. The earlier survey of this file was at 80d59eb; the README was re-rendered between the two commits, and every line number below was re-read.
- The tool is a Claude Code plugin, `decisions@agentik`, plus a stdlib Python tool, `agentik-decisions`, for the decisions a repository has settled. A repository keeps them in one sectioned `DECISIONS.md` at its root. Six verbs: `show`, `find`, `new`, `ask`, `answer` and `render`, plus `doctor` and `backlog` (README.md:5-6).
- "Why it exists" (README.md:8-14). One owner runs several Claude Code plugins in unattended relay runs, where one session hands its work to the next. The decisions that shape that work have to reach every session, and no session should read a long file whole to find them. So the ledger groups entries by area and caps its size, and `render` copies the few entries every session needs into a generated block in `CLAUDE.md`. An agent reads the rest by number or by area. Agents draft questions; only the owner moves an entry into force (:14). The section gives no size, count or incident behind "caps its size".
- There is no README heading "At most 25 entries are in force". The sentence is a bullet in the section "The ledger" (README.md:16-47): "At most 25 entries are in force, and at most 7 sit under `Every session`." (:46).
- The ledger shape (README.md:18-47). Three sections in order: `## In force` (with `### Every session` first when present, then one `### <area>` each; every entry in force sits under a subsection, :41), `## Proposed`, `## Superseded`. An entry in force is one line: its number, a bold title ending in a period (or `?` or `!`), one paragraph, and a closing parenthetical that opens with a date and then a `;` or `,` and a source (:42). A Proposed line ends `(proposed YYYY-MM-DD; OPEN-QUESTIONS.md)`, and only the owner's answer moves it into force (:43). A Superseded line holds a date and a fate: `replaced by`, `merged into` or `lapsed with` (:44). Numbers are unique across the three sections and never reused (:45). The example block is at :21-39.
- The legacy marker (README.md:47). The line `<!-- decisions: legacy below -->` ends the parsed part. An older ledger in another shape puts an empty `## In force` and that line above its old text, then takes new entries in the new shape. `show --area` and `find` read the text below the line; "the lint and the caps pass over it".
- The verb table (README.md:75-87). `new` writes the four-part question with 2 to 4 options, the first recommended, plus its Proposed line (:80). `ask` renders the open questions once through respeak and prints AskUserQuestion calls (:81). `answer` records the owner's answer as entry N, an amendment of entry M, or no entry (:82). `render --lint` runs the lint alone over the ledger and the `OPEN-QUESTIONS.md` beside it (:84). `backlog` places each repository's `NICE_TO_HAVE.md` against its `HANDOFF.md` build order: S1 and S2 items first, then each open step with the items that share a path with it, then S3, then S4; "an item with no level prints `S4?`" (:86).
- Priority and level fields. Entries in force, Proposed lines and question blocks carry none. The only levels are the `S1` to `S4` tokens that `backlog` reads from `NICE_TO_HAVE.md` items (:86). In a question, the first option alone is marked `(Recommended)` (:118, :165), which is a recommendation and not a priority. (I grepped `src/`, `plugin/`, the README and designs d17, d18 and d23 for priority, severity and urgency; the only hits are the `backlog` verb's `most_urgent` helper and d23's description of it.)
- The batched owner questions (README.md:107-142, :164-166, :194). `new` refuses an option count outside 2 to 4, a label over five words, a choice that does not end in `?`, or a sixth open question (:132). The lint says the same from the other side: at most five questions stay open, each block holds the four labels in order, 2 to 4 options, the first alone recommended (:164-165). `ask` prints one AskUserQuestion call per four questions (:140). The skill `/decisions:ask` is described as "ask the open questions once, in one batch, through AskUserQuestion" (:194). With respeak absent or the render failed, the text stays, one warning goes to stderr and the exit is 0 (:141). A sitting without AskUserQuestion runs `ask` for the render alone, and the owner answers on the **Your answer:** line (:142).
- `answer` (README.md:144-155). It removes question N and its Proposed line, adds an `Answered` line, rewrites the `CLAUDE.md` block when that file holds the markers, and writes both files or neither (:151-152). `--amends M` refuses a paragraph under half the old one's length unless `--shorter` (:150).
- `render` (README.md:157-177). It lints first in every mode: section shape, entry shape, unique numbers and both caps (:157). It then writes the block between the BEGIN and END markers: the `Every session` entries verbatim and one line per other entry in force, `- N Title (area)` (:170-173). Proposed and Superseded entries stay out (:174). Exit 1 is a lint problem or a stale block (:184).
- Status (README.md:277-296). Status line at :279: version `0.8.0`, rendered `2026-10-13`, `361` unittest cases. Version 0.3.0 "broke `0.2.0` on purpose": the per-file format and its verbs are gone, and a repository moves its entries into one ledger by hand (:296). Version 0.8.0 tightened the lint (a tail must open with its date; an entry in force may not be only its tail; a Proposed tail must name `OPEN-QUESTIONS.md`; fate phrases in any case) (:288).
- Dependencies (README.md:272-275): `respeak` `^0.6` renders this README and the questions `ask` puts when installed; the session plugin is an optional provider that `doctor` reports (:217-218).

## Limits
- It is the owner's own description of a young tool, rendered by respeak from `design/readme/source.md` (:323). It states mechanism and counts, not outcomes. It gives no measurement of context saved, and no reason for the numbers 25 and 7 or for the cap of five open questions.
- "One owner" is stated as the user base (:10).
- The README test count of 361 matches the builder's charter for the same commit (`history/sittings/2026-10-13-2-agentik-r1.md:10`). A plain `grep` for `def test_` in `tests/*.py` returns 367 definitions; I did not run the suite and do not know why the two differ.

## Used in
- research/synthesis/tools-decisions.md
- research/synthesis/journal-ledger.md
