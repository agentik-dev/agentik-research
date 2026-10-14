# Method

One Claude Code cloud session researched and wrote this site on 2026-10-14. It worked from a brief the owner wrote the day before, with helper agents for the surveys, the claim checks and the editorial passes.[^brief] That session opened every source the site cites. Every vendor fact is dated as of October 2026, and every contested claim carries an evidence level. The tools under study belong to the same owner as the brief, and this page says what that limits.

## The phases

| Phase | What happened | Record |
|---|---|---|
| 0. Setup | The seven source repositories were linked read-only at fixed commits: agentik-commons e456f4b, agentik-relay a326550, agentik-session e7f0723, agentik-decisions 80d59eb, agentik-respeak 319f060, agentik-agents 78ce312, the organization profile 6476f3a | The charter[^charter] |
| 1. Internal survey | One researcher helper per repository, with the organization profile folded into the commons survey, read its README, design records, backlog and history by section and wrote a synthesis with every claim's path and commit | `research/synthesis/tools-*.md` |
| 2. External survey | One researcher helper per research question searched for primary sources, opened each one, wrote a source note per source, and wrote a synthesis | `research/synthesis/field-*.md`, `research/sources/` |
| 3. Outline | Each page's claims in order, with sources and levels, and a check that part 3 maps onto parts 1 and 2 | `research/OUTLINE.md` |
| 4. Draft | The pages, written from the outline, with a diagram only where it shows a mechanism | `docs/` |
| 5. Refute | A read-only refuter helper per page checks every claim against the source its footnote cites and reports unsupported, overstated, stale or leaking lines; unsupported and leaking lines are fixed, at most two rounds per page | The commit log, one commit per page |
| 6. Edit | An editor helper per page brings the voice to the repository's respeak configuration without changing a claim, a number, a link or a quotation | The style gate in `make check` |
| 7. Finish | The checks pass, the README is rewritten, and the pull request is marked ready | The pull request |

At most four helpers ran at once. The session read their reports, not their transcripts.

## The evidence levels

- **Measured.** A study or benchmark with a method you can read. Vendor-run studies are marked as such.
- **Documented.** The vendor's documentation or changelog says so. The footnote gives the date the page was read, because these pages change without notice.
- **Reported.** A named practitioner's write-up, or a vendor post that does not state its sample.
- **Our use.** The agentik repositories' own record: an incident, a log line, a test, named by repository, path and commit.
- **Conjecture.** Reasoned but untested. The site uses it rarely, and names what would test it.

## The limits

- **One owner.** One person wrote and used every tool for a few weeks before this site was written. The owner's organization profile and brief say so.[^profile][^brief] The sources found include no measurement that a tool beats the alternative it replaced, and the pages say so.
- **The site and the tools share an owner.** The brief asked for the tools' limits to be named, and the surveys found them. You should still weigh that the tools' author commissioned the research.[^brief]
- **Vendor facts are volatile.** Timeouts and hook semantics changed in the month before this site was written.[^changelog] One user's record shows the cache lifetime changed earlier in 2026.[^issue46829] The site states each vendor fact as of October 2026, with the page it came from.
- **No measurement of a Claude Code session at length.** The length studies use benchmarks, and their newest Claude models are Opus 4 and Sonnet 4.[^chroma][^ifscale] The sources found include no study that compares a restart from a written handoff with compaction.
- **Pages that could not be opened.** The helpers did not cite what they could not open. The notes record the ISO 24495-1 text (a catalogue entry only) and the Kincaid 1975 report. They also record Parnin's primary paper on interruptions and Replit's own posts on the July 2025 incident. A secondary report and a news report, in that order, stand in for them. The helpers' reports name several more that left no note, among them third-party blog pages that returned 403.[^notes]
- **Duplicate notes.** Parallel helpers sometimes opened the same page and wrote separate notes. The sources page lists one line per page.
- **Private names.** The source repositories name the private product and household that first used the tools. This site describes them generically and never repeats the names. The owner runs a private-term scan before the repository goes public.[^brief]

## The checks

`make check` runs four checks: a structural check, respeak's style gate over `docs/` and the README, the commons hygiene scan, and a strict MkDocs build. The structural check requires every page in the navigation and every footnote defined and used under a Sources heading with a URL. It rejects draft markers and private paths or addresses. It requires every source note to carry its front matter and the charter to stay under 4 KB.[^check]

## Sources

[^brief]: agentik-dev/agentik-research, "history/sessions/PROMPT-2026-10-13-cloud-research.md", the brief, commit 4703b79, <https://github.com/agentik-dev/agentik-research/blob/4703b79/history/sessions/PROMPT-2026-10-13-cloud-research.md>.
[^charter]: agentik-dev/agentik-research, "history/sittings/2026-10-13-1-research.md", the charter, on the main branch once the pull request merges, <https://github.com/agentik-dev/agentik-research/blob/main/history/sittings/2026-10-13-1-research.md>.
[^profile]: agentik-dev, ".github/profile/README.md", commit 6476f3a, <https://github.com/agentik-dev/.github/blob/6476f3a/profile/README.md>.
[^changelog]: Anthropic, "Claude Code changelog", documentation page read 2026-10-14, <https://code.claude.com/docs/en/changelog>.
[^issue46829]: Issue reporter, "Cache TTL silently regressed from 1h to 5m", anthropics/claude-code issue 46829, 12 April 2026, <https://github.com/anthropics/claude-code/issues/46829>.
[^chroma]: Kelly Hong, Anton Troynikov and Jeff Huber, Chroma Research, "Context Rot: How Increasing Input Tokens Impacts LLM Performance", July 2025, <https://www.trychroma.com/research/context-rot>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^notes]: agentik-dev/agentik-research, "research/sources/", the source notes, on the main branch once the pull request merges, <https://github.com/agentik-dev/agentik-research/tree/main/research/sources>.
[^check]: agentik-dev/agentik-research, "scripts/check" and "Makefile", commit 4703b79, <https://github.com/agentik-dev/agentik-research/blob/4703b79/scripts/check>.
