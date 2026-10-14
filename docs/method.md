# Method

Two sittings wrote this site, each from its own brief. The research sitting surveyed the field and the tools, wrote twenty cited pages, and merged as pull request #1.[^sitebrief][^log] The site sitting adds the look, a journal and the story shape, and is still in progress.[^sitecharter] Each sitting ran in more than one Claude Code cloud session: each stopped at a RESPAWN point in its charter, and a new session went on from the charter.[^log][^sitecharter] The tools under study and this site have the same owner, and this page says what that limits.

This page gives the record as of 2026-10-14, while the site sitting's second and last refute round finishes. It is brought current when the site sitting ends.[^sitecharter]

## The rules both briefs set

- A page cites only what the session opened, and a source note in `research/sources/` records what was read.[^brief]
- Every volatile vendor fact carries its date, and every claim that could be contested carries an evidence level.[^brief]
- Helper agents run the surveys, the claim checks and the editorial passes. The briefs allow at most four at once and tell the session to read the helpers' reports, not their transcripts.[^brief][^sitebrief]
- Each phase ends with a commit, a push and the charter brought current. The charter stays under 4 KB. At about 60 percent of the context window, the session finishes the act in flight, writes a Next act that starts `RESPAWN:`, and stops, and a fresh session starts from the brief and the charter.[^brief][^sitebrief]

These are instructions. The tables below set each brief's phases beside what the charters and the commit log show ran.

## The research sitting

The brief is `PROMPT-2026-10-13-cloud-research.md`. Two commits seeded the repo on 2026-10-13: 9663532 added respeak's project config, and 4703b79, a minute later, added the brief, the charter, the agents, the checks and a one-page site. The phases ran on 2026-10-14.[^charter][^log]

| Phase | The brief sets | The record shows |
|---|---|---|
| 0. Setup | `make setup` links the sources; `make check` passes on the seed; each source's commit is recorded | All seven sources linked and `make check` passing on the seed, at agentik-commons e456f4b, agentik-relay a326550, agentik-session e7f0723, agentik-decisions 80d59eb, agentik-respeak 319f060, agentik-agents 78ce312 and the organization profile 6476f3a[^charter] |
| 1. Internal survey | A synthesis per tool in `research/synthesis/tools-<tool>.md`; a researcher helper can take each repository | Six `tools-*.md` syntheses. The charter counts 115 repository source notes; 6060f64, the first commit that holds them, has 108[^charter][^log] |
| 2. External survey | A researcher helper per part 1 question writes source notes; then a synthesis per question | `field-1.md` to `field-10.md`. The charter's 402 notes match every note at 6060f64, the phase 1 notes included: 108 on a repository and 294 on a web page. Duplicate notes from parallel helpers are kept[^charter][^log] |
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
| 1. The skin and the frame | The layers, the skin, the overrides, the home page template, the nav, the favicon and the social cards, checked in screenshots | The glass frame and the agentik skin, with the journal's `blog` and `rss` plugins and its feed link in `mkdocs.yml` (49fcc10); the CI packages for the new checks and the RSS plugin's package (6421f89)[^sitecharter][^log] |
| 2. The journal | The blog plugin, the RSS feed and six entries, each drafted in `research/synthesis/` first | Six entries, their outlines in `research/synthesis/journal-*.md`, and back-links from the field and tool pages (86c469b). The blog plugin and the feed landed in phase 1[^sitecharter][^log] |
| 3. The shape | Rewrite the home page, the summary and the six tool pages: the tool pages in the story shape, the home page and the summary bluf; restyle the field pages and practices with no claim changed | The six tool pages in the story shape, the home page and the summary in bluf, and evidence pills, a legend and limits cards on the field pages and practices (2be0082)[^sitecharter][^log] |
| 4. The sources browse | A JSON list from `scripts/sources-page` and a faceted browse page | `scripts/sources-page` writes `docs/assets/data/sources.json` for the browse (2be0082)[^sitecharter][^log] |
| 5. Refute | A refuter on every new or rewritten page; at most two rounds; fix every unsupported or leaking line | Round 1 ran on every page. The decisions page and the journal index passed on first read; the decisions page was still revised for lines stale at its repository's new head (5869d91). Every other page failed and was fixed: the six journal entries, the tools index and the session page (2f4df5b to 6d71aef); after the re-pin (6b5e5b0), the relay, respeak and agents pages (faabde6, 7a72add, 5852ebc); then the home page, the summary, this page and the sources page with its generator (fecb582, 5fdb4c3, 1d74854, 4ba39df). Round 2, the last, runs on every page that failed round 1. As of a22116f, this sitting has 13 commits titled "refute round 2", a42b450 and then 8c8531e to a22116f: the six entries, the tools index, the session, respeak, relay and agents pages, the home page and the summary. This page and the sources page have none yet[^sitecharter][^log] |
| 6. Polish | `make shots`; a critic on each group of pages, at most two rounds; then the editor on every new or rewritten page; `make style` passes | Not yet run[^sitecharter][^log] |
| 7. Publish | The Pages workflow; `make check` passes; rewrite `README.md`; mark the pull request ready with a bluf summary and three screenshots | The workflow and the README landed early (951a7f2); the rest waits[^sitecharter][^log] |

On 2026-10-14, source repositories merged fixes for findings this site raised. Commit 6b5e5b0 re-pinned the site at each repository's head that day: agentik-commons 588530f, agentik-relay 405d1e0, agentik-session e8477a7, agentik-decisions 569a120, agentik-respeak c83e9b8, agentik-agents f986500 and the organization profile 8a0a188. From then on, a stale line is restated as the head has it.[^sitecharter] A refuter's report now goes to a fixer helper with a written brief that holds the pin and the rule for each verdict.[^sitecharter]

The sitting stopped at a RESPAWN point partway through round 1 (6d71aef), and the charter calls the session after it session 2.[^log][^sitecharter]

Still to come, as of a22116f: round 2 on this page and the sources page; a sweep that aligns footnote commits with the notes and regenerates the sources page; the screenshots, a critic per group of pages and an editor per new or rewritten page; then this page brought current, `make check`, and the pull request marked ready.[^sitecharter] No critic or editor pass has run on this sitting's pages yet.[^sitecharter][^log]

## The evidence levels

The research brief defines the five levels in its section "Evidence levels" (lines 87 to 95).[^brief] The site brief keeps them (line 20) and names the same five (line 50).[^sitebrief] Each item below gives the brief's definition, then what this site adds. Only one level is wider here than in the brief: reported.

- **Measured.** A study or benchmark with a method you can read. This site names a study run by the vendor of what it tests as that vendor's.
- **Documented.** The vendor's documentation or changelog says so, dated. The footnote gives the date the page was read, because these pages change without notice.
- **Reported.** The brief's definition is "A named practitioner's write-up". This site widens it to an issue report and to a vendor post that does not state its sample.[^brief]
- **Our use.** The agentik repositories' own record: an incident, a log line, a test, with the repository named. This site also names the path and commit. The site brief puts the owner's record from private repositories at this level.[^sitebrief]
- **Conjecture.** Reasoned but untested; the brief says to use it rarely and to say what would test it. This site uses it for an owner's rule with no outside evidence, or for its own extrapolation from a narrower finding.

## The limits

- **One owner.** One person wrote and used every tool before this site was written. The organization profile calls the tools early and built for the author's own daily use, and the brief calls them young and used by one owner.[^profile][^brief] The sources found include no measurement that a tool beats the alternative it replaced, and the pages say so.
- **The site and the tools share an owner.** The brief asks for every limit to be named, and each tool page has a section on what has not worked and what is open. You should still weigh that the tools' author commissioned the research.[^brief]
- **Facts from private repositories.** The journal draws some facts from the owner's private repositories. The site brief gives them under generic names in its section "The owner's record", at the level our use, and a reader cannot check them at the source.[^sitebrief]
- **Vendor facts are volatile.** Timeouts and hook semantics changed in the month before this site was written.[^changelog] One user's record shows the cache lifetime changed earlier in 2026.[^issue46829] The site states each vendor fact as of October 2026, with the page it came from.
- **No measurement of a Claude Code session at length.** The length studies use benchmarks, and their newest Claude models are Opus 4 and Sonnet 4.[^chroma][^ifscale] The sources found include no study that compares a restart from a written handoff with compaction.
- **Pages that could not be opened.** The brief forbids citing a page the session could not open.[^brief] A grep of the research sitting's notes at 1f1c37a for "not opened", "did not open", "could not read", "could not be read", "could not open" and "returned" with an HTTP 4xx status matches 32 notes. One hit is a tool's own HTTP 404, not a page.[^notes] Nine notes record a page that failed to open. Five returned HTTP 403: the ISO page for ISO 24495-1 (the note holds a catalogue entry, and the standard's text is sold), the PDF of the Kincaid 1975 report, a Reading Rockets page, the Joint Commission's list and a dissertation record. A fact-check page on a 2017 negotiation study returned HTTP 402, and an arXiv HTML page returned 404. Parnin's primary paper on interruptions sat behind a login step, and Anthropic's April 2025 post on best practices now redirects to the current documentation page. Each of the nine notes says what was read instead or what stays unverified. Another 22 notes record a page or file left unopened by choice: a linked page, the full paper behind an abstract, or the rest of a folder. Among them, for Replit's July 2025 incident a news report was read, and no vendor post-mortem was opened. In all, 31 notes record a page or file not opened. The grep misses notes worded otherwise, such as "the full paper was not read", so that count is a lower bound.[^notes]
- **Duplicate notes.** Parallel helpers sometimes opened the same page and wrote separate notes. The sources page lists one line per URL.[^charter]
- **Private names.** The brief warns that a source repository may name the private product or household that first used a tool. It tells the session to describe them generically and never repeat the names, and it says the owner runs a private-term scan before the repository goes public.[^brief]

## The checks

`make check` runs six checks: the structural check `scripts/check`, respeak's style gate over `docs/` and the README, the commons hygiene scan, a strict MkDocs build, an axe accessibility check of every page in light and dark, and a link check of the built site.[^check] The seed ran the first four, and phase 0 of the site sitting added the last two (66dd372).[^check][^log] The accessibility check fails on a serious or critical violation, and the link check fails on a broken internal link.[^check]

The structural check requires every page in the navigation and keeps the journal posts out of it. Each post needs front matter with a date and at least one allowed category. Every footnote is defined and used, sits under a Sources heading and carries a URL. The check rejects draft markers and private paths or addresses, requires front matter on every source note, and keeps the newest charter under 4 KB.[^check]

## Sources

[^brief]: agentik-dev/agentik-research, "history/sessions/PROMPT-2026-10-13-cloud-research.md", the research sitting's brief, commit 6b5e5b0, <https://github.com/agentik-dev/agentik-research/blob/6b5e5b0/history/sessions/PROMPT-2026-10-13-cloud-research.md>.
[^sitebrief]: agentik-dev/agentik-research, "history/sessions/PROMPT-2026-10-14-cloud-site.md", the site sitting's brief, commit 6b5e5b0, <https://github.com/agentik-dev/agentik-research/blob/6b5e5b0/history/sessions/PROMPT-2026-10-14-cloud-site.md>.
[^charter]: agentik-dev/agentik-research, "history/sittings/2026-10-13-1-research.md", the research sitting's charter, commit 6b5e5b0, <https://github.com/agentik-dev/agentik-research/blob/6b5e5b0/history/sittings/2026-10-13-1-research.md>.
[^sitecharter]: agentik-dev/agentik-research, "history/sittings/2026-10-14-1-research.md", the site sitting's charter, commit 9e24c02, <https://github.com/agentik-dev/agentik-research/blob/9e24c02/history/sittings/2026-10-14-1-research.md>.
[^log]: agentik-dev/agentik-research, the commit history from 9663532 to a22116f, read 2026-10-14, <https://github.com/agentik-dev/agentik-research/commits/a22116f>.
[^profile]: agentik-dev, ".github/profile/README.md", commit 8a0a188, <https://github.com/agentik-dev/.github/blob/8a0a188/profile/README.md>.
[^changelog]: Anthropic, "Claude Code changelog", documentation page read 2026-10-14, <https://code.claude.com/docs/en/changelog>.
[^issue46829]: Issue reporter, "Cache TTL silently regressed from 1h to 5m around early March 2026, causing quota and cost inflation", anthropics/claude-code issue 46829, 12 April 2026, <https://github.com/anthropics/claude-code/issues/46829>.
[^chroma]: Kelly Hong, Anton Troynikov and Jeff Huber, Chroma Research, "Context Rot: How Increasing Input Tokens Impacts LLM Performance", July 2025, <https://www.trychroma.com/research/context-rot>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^notes]: agentik-dev/agentik-research, "research/sources/", the research sitting's source notes, commit 1f1c37a, <https://github.com/agentik-dev/agentik-research/tree/1f1c37a/research/sources>.
[^check]: agentik-dev/agentik-research, "scripts/check" and "Makefile", commit 6b5e5b0, <https://github.com/agentik-dev/agentik-research/blob/6b5e5b0/scripts/check>.
