# Method

Two sittings wrote this site, each from its own brief. The research sitting surveyed the field and the tools, wrote twenty cited pages, and merged as pull request #1.[^sitebrief][^log] The site sitting adds the look, a journal and the story shape, and is still in progress.[^sitecharter] Each sitting ran in more than one Claude Code cloud session: each stopped at a RESPAWN point in its charter, and a new session went on from the charter.[^log][^sitecharter] The tools under study and this site have the same owner, and this page says what that limits.

This page gives the record as of 2026-10-14, while the site sitting's first refute round finishes. It is brought current when the site sitting ends.

## The rules both briefs set

- A page cites only what the session opened, and a source note in `research/sources/` records what was read.[^brief]
- Every volatile vendor fact carries its date, and every claim that could be contested carries an evidence level.[^brief]
- Helper agents run the surveys, the claim checks and the editorial passes. The briefs allow at most four at once and tell the session to read the helpers' reports, not their transcripts.[^brief][^sitebrief]
- Each phase ends with a commit, a push and the charter brought current. The charter stays under 4 KB. At about 60 percent of the context window, the session finishes the act in flight, writes a Next act that starts `RESPAWN:`, and stops, and a fresh session starts from the brief and the charter.[^brief][^sitebrief]

These are instructions. The tables below set each brief's phases beside what the charters and the commit log show ran.

## The research sitting

The brief is `PROMPT-2026-10-13-cloud-research.md`. Commit 4703b79 seeded the repo on 2026-10-13 with the brief, the charter, the agents, the checks and a one-page site, and the phases ran on 2026-10-14.[^charter][^log]

| Phase | The brief sets | The record shows |
|---|---|---|
| 0. Setup | `make setup` links the sources; `make check` passes on the seed; each source's commit is recorded | All seven sources linked and `make check` passing on the seed, at agentik-commons e456f4b, agentik-relay a326550, agentik-session e7f0723, agentik-decisions 80d59eb, agentik-respeak 319f060, agentik-agents 78ce312 and the organization profile 6476f3a[^charter] |
| 1. Internal survey | A synthesis per tool in `research/synthesis/tools-<tool>.md`; a researcher helper can take each repository | Six `tools-*.md` syntheses and 115 repository source notes[^charter] |
| 2. External survey | A researcher helper per part 1 question writes source notes; then a synthesis per question | `field-1.md` to `field-10.md` and 402 notes, with duplicate notes from parallel helpers kept[^charter] |
| 3. Outline | `research/OUTLINE.md`: each page's claims with their sources and levels | The outline, every page's claims with slugs and levels[^charter] |
| 4. Draft | Each page in `docs/`, written from the outline | All 20 pages in the nav and draft pull request #1 open. No commit holds phases 1 to 4 alone: their files first appear in 6060f64, a commit of 461 files titled for the first refute fix[^charter][^log] |
| 5. Refute | A refuter helper per page; fix every unsupported or leaking line; at most two rounds per page | Round 1: the charter records all 20 pages refuted and all 20 failed on first read. Six refute commits, 6060f64 to c2bbc52, name 8 pages in their titles. Round 2 ran after the edit: 13 commits, d419ddb to f0cbe79, each changing 1 to 8 pages[^charter][^log] |
| 6. Edit | An editor helper per page runs respeak's editorial pass; it keeps the meaning, and `make style` passes | 13 edit commits, 5fd26c7 to 1245ec5, between the two refute rounds. The generated sources page skips the editor[^charter][^log] |
| 7. Finish | `make check` passes; rewrite `README.md`; mark the pull request ready with a bluf summary | `make check` passing, the README re-read with two layout rows added, and pull request #1 marked ready (5f8ca0a), then merged (ba74b87)[^charter][^log] |

The sitting stopped at a RESPAWN point after round 1, at about 63 percent of its context (c2bbc52). The rest ran in at least one later session, which began by writing fix prompts for the six tool repositories into `research/prompts/`, for the owner to paste into each one (c503da6).[^charter][^log]

## The site sitting

The brief is `PROMPT-2026-10-14-cloud-site.md`. Commit 25e72df added it on 2026-10-14 with the vendored glass kit and the critic agent. The work sits on draft pull request #2.[^sitecharter][^log]

| Phase | The brief sets | The record shows, as of 2026-10-14 |
|---|---|---|
| 0. Setup | `make setup`; `make check` passes on `main`; npm pins; `shots`, `a11y` and `links` targets, with `a11y` and `links` added to `make check`; Inter's licence | Done (66dd372)[^sitecharter][^log] |
| 1. The skin and the frame | The layers, the skin, the overrides, the home page template, the nav, the favicon and the social cards, checked in screenshots | The glass frame and the agentik skin (49fcc10), and the CI packages for the new checks (6421f89)[^sitecharter][^log] |
| 2. The journal | The blog plugin, the RSS feed and six entries, each drafted in `research/synthesis/` first | Six entries, their outlines in `research/synthesis/journal-*.md`, back-links and RSS (86c469b)[^sitecharter][^log] |
| 3. The shape | Rewrite the home page, the summary and the six tool pages: the tool pages in the story shape, the home page and the summary bluf; restyle the field pages and practices with no claim changed | The six tool pages in the story shape, the home page and the summary in bluf, and evidence pills, a legend and limits cards on the field pages and practices (2be0082)[^sitecharter][^log] |
| 4. The sources browse | A JSON list from `scripts/sources-page` and a faceted browse page | `scripts/sources-page` writes `docs/assets/data/sources.json` for the browse (2be0082)[^sitecharter][^log] |
| 5. Refute | A refuter on every new or rewritten page; at most two rounds; fix every unsupported or leaking line | Round 1 is finishing. The six journal entries, the tools index and the session page each failed on first read and were fixed (2f4df5b to 6d71aef). After the re-pin (6b5e5b0), fixes landed for the relay, respeak, decisions and agents pages (faabde6 to 5852ebc). The charter lists the rest: the home page, the summary, this page, the sources page's intro and generator, and the journal index[^sitecharter][^log] |
| 6. Polish | `make shots`; a critic on each group of pages, at most two rounds; then the editor on every new or rewritten page; `make style` passes | Not yet run[^sitecharter][^log] |
| 7. Publish | The Pages workflow; `make check` passes; rewrite `README.md`; mark the pull request ready with a bluf summary and three screenshots | The workflow and the README landed early (951a7f2); the rest waits[^sitecharter][^log] |

On 2026-10-14, source repositories merged fixes for findings this site raised. Commit 6b5e5b0 re-pinned the site at each repository's head that day: agentik-commons 588530f, agentik-relay 405d1e0, agentik-session e8477a7, agentik-decisions 569a120, agentik-respeak c83e9b8, agentik-agents f986500 and the organization profile 8a0a188. From then on, a stale line is restated as the head has it.[^sitecharter] A refuter's report now goes to a fixer helper with a written brief that holds the pin and the rule for each verdict.[^sitecharter]

The sitting stopped at a RESPAWN point partway through round 1 (6d71aef), and the charter calls the session after it session 2.[^log][^sitecharter]

Still to come: the rest of round 1; round 2 on every page that failed round 1; the screenshots, a critic per group of pages and an editor per page; then `make check` and the pull request marked ready.[^sitecharter] No critic or editor pass has run on this sitting's pages yet.[^sitecharter][^log]

## The evidence levels

- **Measured.** A study or benchmark with a method you can read. A study run by the vendor of what it tests is named as that vendor's.
- **Documented.** The vendor's documentation or changelog says so. The footnote gives the date the page was read, because these pages change without notice.
- **Reported.** A practitioner's write-up or issue report, or a vendor post that does not state its sample.
- **Our use.** The agentik repositories' own record: an incident, a log line, a test, named by repository, path and commit.
- **Conjecture.** Reasoned but untested: an owner's rule with no outside evidence, or this site's extrapolation from a narrower finding.

## The limits

- **One owner.** One person wrote and used every tool before this site was written. The organization profile calls the tools early and built for the author's own daily use, and the brief calls them young and used by one owner.[^profile][^brief] The sources found include no measurement that a tool beats the alternative it replaced, and the pages say so.
- **The site and the tools share an owner.** The brief asks for every limit to be named, and each tool page has a section on what has not worked and what is open. You should still weigh that the tools' author commissioned the research.[^brief]
- **Facts from private repositories.** The journal draws some facts from the owner's private repositories. The site brief gives them under generic names in its section "The owner's record", at the level our use, and a reader cannot check them at the source.[^sitebrief]
- **Vendor facts are volatile.** Timeouts and hook semantics changed in the month before this site was written.[^changelog] One user's record shows the cache lifetime changed earlier in 2026.[^issue46829] The site states each vendor fact as of October 2026, with the page it came from.
- **No measurement of a Claude Code session at length.** The length studies use benchmarks, and their newest Claude models are Opus 4 and Sonnet 4.[^chroma][^ifscale] The sources found include no study that compares a restart from a written handoff with compaction.
- **Pages that could not be opened.** The brief forbids citing a page the session could not open.[^brief] In the research sitting's notes, three sources are recorded as not opened: the ISO 24495-1 text (a catalogue entry only), the Kincaid 1975 report, and Parnin's primary paper on interruptions. For Replit's July 2025 incident a news report was read, and no vendor post-mortem was opened. Three more notes record a page that returned 403 and say what was read in its place.[^notes]
- **Duplicate notes.** Parallel helpers sometimes opened the same page and wrote separate notes. The sources page lists one line per URL.[^charter]
- **Private names.** The source repositories name the private product and household that first used the tools. This site describes them generically and never repeats the names. The brief says the owner runs a private-term scan before the repository goes public.[^brief]

## The checks

`make check` runs six checks: the structural check `scripts/check`, respeak's style gate over `docs/` and the README, the commons hygiene scan, a strict MkDocs build, an axe accessibility check of every page in light and dark, and a link check of the built site.[^check] The seed ran the first four, and phase 0 of the site sitting added the last two (66dd372).[^check][^log] The accessibility check fails on a serious or critical violation, and the link check fails on a broken internal link.[^check]

The structural check requires every page in the navigation and keeps the journal posts out of it. Each post needs front matter with a date and at least one allowed category. Every footnote is defined and used, sits under a Sources heading and carries a URL. The check rejects draft markers and private paths or addresses, requires front matter on every source note, and keeps the newest charter under 4 KB.[^check]

## Sources

[^brief]: agentik-dev/agentik-research, "history/sessions/PROMPT-2026-10-13-cloud-research.md", the research sitting's brief, commit 6b5e5b0, <https://github.com/agentik-dev/agentik-research/blob/6b5e5b0/history/sessions/PROMPT-2026-10-13-cloud-research.md>.
[^sitebrief]: agentik-dev/agentik-research, "history/sessions/PROMPT-2026-10-14-cloud-site.md", the site sitting's brief, commit 6b5e5b0, <https://github.com/agentik-dev/agentik-research/blob/6b5e5b0/history/sessions/PROMPT-2026-10-14-cloud-site.md>.
[^charter]: agentik-dev/agentik-research, "history/sittings/2026-10-13-1-research.md", the research sitting's charter, commit 6b5e5b0, <https://github.com/agentik-dev/agentik-research/blob/6b5e5b0/history/sittings/2026-10-13-1-research.md>.
[^sitecharter]: agentik-dev/agentik-research, "history/sittings/2026-10-14-1-research.md", the site sitting's charter, commit 6b5e5b0, <https://github.com/agentik-dev/agentik-research/blob/6b5e5b0/history/sittings/2026-10-14-1-research.md>.
[^log]: agentik-dev/agentik-research, the commit log from 9663532 to 5852ebc, read 2026-10-14, <https://github.com/agentik-dev/agentik-research/commits/5852ebc>.
[^profile]: agentik-dev, ".github/profile/README.md", commit 8a0a188, <https://github.com/agentik-dev/.github/blob/8a0a188/profile/README.md>.
[^changelog]: Anthropic, "Claude Code changelog", documentation page read 2026-10-14, <https://code.claude.com/docs/en/changelog>.
[^issue46829]: Issue reporter, "Cache TTL silently regressed from 1h to 5m around early March 2026, causing quota and cost inflation", anthropics/claude-code issue 46829, 12 April 2026, <https://github.com/anthropics/claude-code/issues/46829>.
[^chroma]: Kelly Hong, Anton Troynikov and Jeff Huber, Chroma Research, "Context Rot: How Increasing Input Tokens Impacts LLM Performance", July 2025, <https://www.trychroma.com/research/context-rot>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^notes]: agentik-dev/agentik-research, "research/sources/", the research sitting's source notes, commit 1f1c37a, <https://github.com/agentik-dev/agentik-research/tree/1f1c37a/research/sources>.
[^check]: agentik-dev/agentik-research, "scripts/check" and "Makefile", commit 6b5e5b0, <https://github.com/agentik-dev/agentik-research/blob/6b5e5b0/scripts/check>.
