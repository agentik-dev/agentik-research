# Method

This site was researched and written by one Claude Code cloud session on 2026-10-14, from a brief the owner wrote the day before, with helper agents for the surveys, the claim checks and the editorial passes.[^brief] Every source cited was opened in that session; every vendor fact is dated as of October 2026; and every contested claim carries an evidence level. The tools under study belong to the same owner as the brief, and this page says what that limits.

## The phases

| Phase | What happened | Record |
|---|---|---|
| 0. Setup | The seven source repositories were linked read-only at fixed commits: agentik-commons e456f4b, agentik-relay a326550, agentik-session e7f0723, agentik-decisions 80d59eb, agentik-respeak 319f060, agentik-agents 78ce312, the organization profile 6476f3a | The charter[^charter] |
| 1. Internal survey | One researcher helper per repository read its README, design records, backlog and history by section and wrote a synthesis with every claim's path and commit | `research/synthesis/tools-*.md` |
| 2. External survey | One researcher helper per research question searched for primary sources, opened each one, wrote a source note per source, and wrote a synthesis | `research/synthesis/field-*.md`, `research/sources/` |
| 3. Outline | Each page's claims in order, with sources and levels, and a check that part 3 maps onto parts 1 and 2 | `research/OUTLINE.md` |
| 4. Draft | The pages, written from the outline, with a diagram only where it shows a mechanism | `docs/` |
| 5. Refute | A read-only refuter helper per page checked every claim against the source its footnote cites and reported unsupported, overstated, stale or leaking lines; unsupported and leaking lines were fixed, at most two rounds per page | `NICE_TO_HAVE.md` for the notes kept |
| 6. Edit | An editor helper per page brought the voice to the repository's respeak configuration without changing a claim, a number, a link or a quotation | The style gate in `make check` |
| 7. Finish | The checks pass, the README is rewritten, and the pull request is marked ready | The pull request |

At most four helpers ran at once. The session read their reports, not their transcripts.

## The evidence levels

- **Measured.** A study or benchmark with a method you can read. Vendor-run studies are marked as such.
- **Documented.** The vendor's documentation or changelog says so. The footnote gives the date the page was read, because these pages change without notice.
- **Reported.** A named practitioner's write-up, or a vendor post whose sample is not stated.
- **Our use.** The agentik repositories' own record: an incident, a log line, a test, named by repository, path and commit.
- **Conjecture.** Reasoned but untested. Used rarely, with what would test it.

## The limits

- **One owner.** Every tool was written and used by one person, on a few machines, for a few weeks before this site was written. No measurement shows that a tool beats the alternative it replaced, and the pages say so.[^commonsrecord]
- **The site and the tools share an owner.** The brief asked for the tools' limits to be named, and the surveys found them; a reader should still weigh that the research was commissioned by the tools' author.[^brief]
- **Vendor facts are volatile.** Windows, prices, cache lifetimes, timeouts, hook semantics and permission behaviour each changed within the year before this site was written. Each is stated as of October 2026 with the page it came from.[^changelog]
- **No measurement of a Claude Code session at length.** The length studies use benchmarks, and their newest Claude models are Opus 4 and Sonnet 4. No study compares a restart from a written handoff with compaction.
- **Pages that could not be opened.** The helpers did not cite what they could not open. Among the pages that refused or failed: the ISO 24495-1 text (catalogue entry only), Flesch's 1948 paper, the Kincaid 1975 report, Redish's 2000 critique of readability formulas, the ASD-STE100 specification, Parnin's primary paper on interruptions (a secondary report was used), Replit's own posts on the July 2025 incident (a news report was used), one sandbox-escape write-up, an Ollama blog post (404), and several third-party blog pages that returned 403. The MAST paper was read in its HTML form after its PDF failed.
- **Duplicate notes.** Parallel helpers sometimes opened the same page and wrote separate notes; the sources page lists one line per page.
- **Private names.** The source repositories name the private product and household that first used the tools; this site describes them generically and never repeats the names. The owner runs a private-term scan before the repository goes public.[^brief]

## The checks

`make check` runs four checks: a structural check (every page in the navigation, every footnote defined and used under a Sources heading with a URL, no draft markers, no private paths or addresses, every source note with its front matter, the charter under 4 KB); respeak's style gate over `docs/` and the README; the commons hygiene scan; and a strict MkDocs build.[^check]

## Sources

[^brief]: agentik-dev/agentik-research, "history/sessions/PROMPT-2026-10-13-cloud-research.md", the brief, <https://github.com/agentik-dev/agentik-research/blob/main/history/sessions/PROMPT-2026-10-13-cloud-research.md>.
[^charter]: agentik-dev/agentik-research, "history/sittings/2026-10-13-1-research.md", the charter, <https://github.com/agentik-dev/agentik-research/blob/main/history/sittings/2026-10-13-1-research.md>.
[^commonsrecord]: agentik-dev/agentik-commons, "design/agentik-r1.md", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/design/agentik-r1.md>.
[^changelog]: Anthropic, "Claude Code changelog", documentation page read 2026-10-14, entries to 9 October 2026, <https://code.claude.com/docs/en/changelog>.
[^check]: agentik-dev/agentik-research, "scripts/check" and "Makefile", <https://github.com/agentik-dev/agentik-research/blob/main/scripts/check>.
