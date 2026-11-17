# Method

Claude Code cloud sessions and their helper agents researched and wrote this site from two written briefs. A page cites only what a session opened, and a claim that could be contested carries an evidence level. A helper agent checks each claim on a page against its cited source, and `make check` runs six checks over the site.[^brief][^sitebrief][^check] This site and the tools it studies have the same owner, and this page names the limits that follow.

## The rules both briefs set

Two sittings wrote this site, each from its own brief. On this page a sitting is the work of one brief under one charter. Each sitting ran in more than one Claude Code cloud session: each stopped at a RESPAWN point in its charter, a Next act that starts `RESPAWN:` (see [respawn](glossary.md#respawn)), and a new session went on from the charter.[^log][^sitecharter] Both briefs set these rules:

- A page cites only what the session opened, and a source note in `research/sources/` records what was read.[^brief]
- Every volatile vendor fact carries its date, and every claim that could be contested carries an evidence level.[^brief]
- Helper agents run the surveys, the claim checks and the editorial passes. The briefs allow at most four helpers at once and tell the session to read the helpers' reports, not their transcripts.[^brief][^sitebrief]
- Each new or rewritten page goes through a refute round. A refuter helper checks every claim against its cited source and reports unsupported, overstated, stale or leaking lines, and the session fixes every unsupported or leaking line. A page gets at most two rounds.[^brief][^sitebrief]
- Each phase ends with a commit, a push and the charter brought current. The charter stays under 4 KB. At about 60 percent of the context window, the session finishes the act in flight, writes a Next act that starts `RESPAWN:` and stops. A new session then starts from the brief and the charter.[^brief][^sitebrief]

These rules are what the briefs instruct. The section on each sitting, below, sets that brief's phases beside what the charters and the commit log show ran.

## The evidence levels

The research brief defines the five levels in its section "Evidence levels" (lines 87 to 95).[^brief] The site brief keeps them (line 20) and names the same five (line 50).[^sitebrief] This site widens only one level beyond the brief: reported. Each item below gives the brief's definition, then what this site adds.

- **Measured.** A study or benchmark with a method you can read. When the vendor of what a study tests also ran the study, this site names it as that vendor's.
- **Documented.** The vendor's documentation or changelog says so, dated. The footnote gives the date the page was read, because these pages change without notice.
- **Reported.** The brief's definition is "A named practitioner's write-up". This site widens it to an issue report and to a vendor post that does not state its sample.[^brief]
- **Our use.** The agentik repositories' own record: an incident, a log line, a test, with the repository named. This site also names the path and commit. The site brief puts the owner's record from private repositories at this level.[^sitebrief]
- **Conjecture.** Reasoned but untested. The brief says to use it rarely and to say what would test it. This site uses it for an owner's rule with no outside evidence, or for its own extrapolation from a narrower finding.

## The checks

`make check` runs six checks: the structural check `scripts/check`, respeak's style gate over `docs/` and the README, the commons hygiene scan, a strict MkDocs build, an axe accessibility check of every page in light and dark, and a link check of the built site.[^check] The seed ran the first four, and phase 0 of the site sitting added the last two (11ffca6).[^check][^log] The accessibility check fails on a serious or critical violation, and the link check fails on a broken internal link.[^check]

The structural check requires every page to be in the navigation and keeps the journal posts out of it. Each post needs front matter with a date and at least one allowed category. Every footnote must be defined and used, sit under a Sources heading and carry a URL. The check rejects draft markers and private paths or addresses, requires front matter on every source note, and keeps the newest charter under 4 KB.[^check]

## The limits

- **One owner.** One person wrote and used every tool before this site was written. The organization profile calls the tools early and built for the author's own daily use; the brief calls them young and used by one owner.[^profile][^brief] No source this site found measures that a tool beats the alternative it replaced, and the pages say so.
- **The site and the tools share an owner.** The brief asks for every limit to be named, and each tool page has a section on what has not worked and what is open. Even so, the tools' author commissioned the research, and you should weigh that.[^brief]
- **Facts from private repositories.** The journal draws some facts from the owner's private repositories, and you cannot check those at the source. The site brief gives them under generic names in its section "The owner's record", at the level our use.[^sitebrief]
- **Vendor facts are volatile.** Timeouts and hook semantics changed in the month before this site was written.[^changelog] One user's record shows the cache lifetime changed earlier in 2026.[^issue46829] The site states each vendor fact as of October 2026, with the page it came from.
- **No measurement of a Claude Code session at length.** The length studies use benchmarks, and their newest Claude models are Opus 4 and Sonnet 4.[^chroma][^ifscale] No source this site found compares a restart from a written handoff with compaction.
- **Pages that could not be opened.** The brief forbids citing a page the session could not open.[^brief] A grep of the research sitting's notes at 2c11bbd for "not opened", "did not open", "could not read", "could not be read", "could not open" and "returned" with an HTTP 4xx status matches 32 notes. One hit is a tool's own HTTP 404, not a page.[^notes] Nine notes record a page that failed to open. Five returned HTTP 403: the ISO page for ISO 24495-1 (the note holds a catalogue entry, and the standard's text is sold), the PDF of the Kincaid 1975 report, a Reading Rockets page, the Joint Commission's list and a dissertation record. A fact-check page on a 2017 negotiation study returned HTTP 402, and an arXiv HTML page returned 404. Parnin's primary paper on interruptions sat behind a login step, and Anthropic's April 2025 post on best practices now redirects to the current documentation page. Each of the nine notes says what was read instead or what stays unverified. Another 22 notes record a page or file left unopened by choice: a linked page, the full paper behind an abstract, or the rest of a folder. Among them is Replit's July 2025 incident: a news report was read, and no vendor post-mortem was opened. In all, 31 notes record a page or file not opened. The grep misses notes worded otherwise, such as "the full paper was not read", so that count is a lower bound.[^notes]
- **Duplicate notes.** Parallel helpers sometimes opened the same page and wrote separate notes. The sources page lists one line per URL.[^charter]
- **Private names.** The brief warns that a source repository may name the private product or household that first used a tool. It tells the session to describe them generically and never repeat the names. It also says the owner runs a private-term scan before the repository goes public.[^brief]

## The research sitting

The research sitting surveyed the field and the tools, wrote twenty cited pages, and merged as pull request #1.[^sitebrief][^log] Its brief is `PROMPT-2026-10-13-cloud-research.md`. Two commits seeded the repository on 2026-10-13: 9663532 added respeak's project config, and 4703b79, a minute later, added the brief, the charter, the agents, the checks and a one-page site. The phases ran on 2026-10-14.[^charter][^log]

| Phase | The brief sets | The record shows |
|---|---|---|
| 0. Setup | `make setup` links the sources; `make check` passes on the seed; each source's commit is recorded | All seven sources linked and `make check` passing on the seed, at agentik-commons e456f4b, agentik-relay a326550, agentik-session e7f0723, agentik-decisions 80d59eb, agentik-respeak 319f060, agentik-agents 78ce312 and the organization profile 6476f3a[^charter] |
| 1. Internal survey | A synthesis per tool in `research/synthesis/tools-<tool>.md`; a researcher helper can take each repository | Six `tools-*.md` syntheses. The charter counts 115 repository source notes; 372539c, the first commit that holds them, has 108[^charter][^log] |
| 2. External survey | A researcher helper per part 1 question writes source notes; then a synthesis per question | `field-1.md` to `field-10.md`. The charter's 402 notes match every note at 372539c, the phase 1 notes included: 108 on a repository and 294 on a web page. Duplicate notes from parallel helpers are kept[^charter][^log] |
| 3. Outline | `research/OUTLINE.md`: each page's claims with their sources and levels | The outline, every page's claims with slugs and levels[^charter] |
| 4. Draft | Each page in `docs/`, written from the outline | All 20 pages in the nav and draft pull request #1 open. No commit holds phases 1 to 4 alone: their files first appear in 372539c, a commit of 461 files titled for the first refute fix[^charter][^log] |
| 5. Refute | A refuter helper per page; fix every unsupported or leaking line; at most two rounds per page | Round 1: the charter records all 20 pages refuted and all 20 failed on first read. Six refute commits, 372539c to 3ea8756, name 8 pages in their titles. Round 2 ran after the edit: 13 commits, 721b60c to 7ce0144, each changing 1 to 8 pages[^charter][^log] |
| 6. Edit | An editor helper per page runs respeak's editorial pass; it keeps the meaning, and `make style` passes | 13 edit commits, 36faf3d to ed586db, between the two refute rounds. The generated sources page skips the editor[^charter][^log] |
| 7. Finish | `make check` passes; rewrite `README.md`; mark the pull request ready with a bluf summary | `make check` passing, the README re-read with two layout rows added, and pull request #1 marked ready (983d5b3), then merged (31a0a29)[^charter][^log] |

The sitting stopped at a RESPAWN point after round 1, at about 63 percent of its context (3ea8756). The rest ran in at least one later session. It began by writing fix prompts for the six tool repositories into `research/prompts/`, for the owner to paste into each one (b9cd496).[^charter][^log]

## The site sitting

The site sitting adds the look, a journal and the story shape.[^sitecharter] Its brief is `PROMPT-2026-10-14-cloud-site.md`. Commit 576aaa1 added it on 2026-10-14 with the vendored glass kit and the critic agent. The work sits on draft pull request #2.[^sitecharter][^log]

| Phase | The brief sets | The record shows, as of 2026-10-14 |
|---|---|---|
| 0. Setup | `make setup`; `make check` passes on `main`; npm pins; `shots`, `a11y` and `links` targets, with `a11y` and `links` added to `make check`; Inter's licence | Done (11ffca6)[^sitecharter][^log] |
| 1. The skin and the frame | The layers, the skin, the overrides, the home page template, the nav, the favicon and the social cards, checked in screenshots | The glass frame and the agentik skin, with the journal's `blog` and `rss` plugins and its feed link in `mkdocs.yml` (8f77e45); the CI packages for the new checks and the RSS plugin's package (b2845c8)[^sitecharter][^log] |
| 2. The journal | The blog plugin, the RSS feed and six entries, each drafted in `research/synthesis/` first | Six entries, their outlines in `research/synthesis/journal-*.md`, and back-links from the field and tool pages (fd9b1c9). The blog plugin and the feed landed in phase 1[^sitecharter][^log] |
| 3. The shape | Rewrite the home page, the summary and the six tool pages: the tool pages in the story shape, the home page and the summary bluf; restyle the field pages and practices with no claim changed | The six tool pages in the story shape, the home page and the summary in bluf, and evidence pills, a legend and limits cards on the field pages and practices (48acc27)[^sitecharter][^log] |
| 4. The sources browse | A JSON list from `scripts/sources-page` and a faceted browse page | `scripts/sources-page` writes `docs/assets/data/sources.json` for the browse (48acc27)[^sitecharter][^log] |
| 5. Refute | A refuter on every new or rewritten page; at most two rounds; fix every unsupported or leaking line | Round 1 ran on every page. The decisions page and the journal index passed on first read; the decisions page was still revised for lines stale at its repository's new head (e858185). Every other page failed and was fixed: the six journal entries, the tools index and the session page (2debfd5 to 7676b3e); after the re-pin (b33bd13), the relay, respeak and agents pages (bdc3bd1, 0a850b8, 2e9e2e8); then the home page, the summary, this page and the sources page with its generator (ae9529b, 4758fed, d9c28d9, 0b88431). Round 2, the last, ran on every page that failed round 1 (15 commits, 31b5b70 to d774f96), and a sweep left no footnote citing a commit no note read (770a2fd, 43b5d40)[^sitecharter][^log] |
| 6. Polish | `make shots`; a critic on each group of pages, at most two rounds; then the editor on every new or rewritten page; `make style` passes | Two critic rounds on five groups of pages, each round's findings fixed (d5aea8e and 7c519a1; de05614 and 5c75210), and the editor on the 16 new or rewritten pages; `make style` passes. See [Status](#status)[^log][^critics] |
| 7. Publish | The Pages workflow; `make check` passes; rewrite `README.md`; mark the pull request ready with a bluf summary and three screenshots | The workflow and the README landed early (2e11630), and the README was brought current in 5c75210; [Status](#status) gives the rest[^log] |

On 2026-10-14, source repositories merged fixes for findings this site raised. Commit b33bd13 re-pinned the site at each repository's head that day: agentik-commons 588530f, agentik-relay 405d1e0, agentik-session e8477a7, agentik-decisions 569a120, agentik-respeak c83e9b8, agentik-agents f986500 and the organization profile 8a0a188. From then on, the site restates a stale line as the head has it.[^sitecharter] A refuter's report now goes to a fixer helper, with a written brief that holds the pin and the rule for each verdict.[^sitecharter]

The sitting stopped at a RESPAWN point partway through round 1 (7676b3e), and the charter calls the session after it session 2.[^log][^sitecharter]

## Status

This section gives the record as of commit 5c75210, on 2026-10-14.[^log]

- **Refute.** Round 1 ran on every new or rewritten page, and round 2, the last, on every page that failed round 1. A sweep then aligned every footnote with a note that records reading its source at the cited commit.[^log]
- **Polish.** The first critic round failed all five groups of pages: the home page and summary, the journal, the field, the tools, and the reference pages. Its findings were fixed in d5aea8e and 7c519a1. The second and last round passed the home page, the summary and the journal, and failed the field, the tools and the reference pages; those findings were fixed in de05614 and 5c75210, with no third round, as the brief caps critic rounds at two. The editor ran on the 16 new or rewritten pages, one commit each.[^log][^critics]
- **Publish.** `make check` passes at 5c75210: the structure checks, respeak's style gate, the hygiene scan, a strict build, axe with no serious or critical violation, and links with no broken internal link. The pull request is marked ready after this commit; the owner reviews it, turns Pages on and makes the repository public.[^log]
- **Left open.** `NICE_TO_HAVE.md` lists what this sitting did not do, among them a second human example for the decisions page and the glass kit's defects.[^log]

## Sources

[^brief]: agentik-dev/agentik-site, "history/sessions/PROMPT-2026-10-13-cloud-research.md", the research sitting's brief, commit b33bd13, <https://github.com/agentik-dev/agentik-site/blob/b33bd13/history/sessions/PROMPT-2026-10-13-cloud-research.md>.
[^sitebrief]: agentik-dev/agentik-site, "history/sessions/PROMPT-2026-10-14-cloud-site.md", the site sitting's brief, commit b33bd13, <https://github.com/agentik-dev/agentik-site/blob/b33bd13/history/sessions/PROMPT-2026-10-14-cloud-site.md>.
[^charter]: agentik-dev/agentik-site, "history/sittings/2026-10-13-1-research.md", the research sitting's charter, commit b33bd13, <https://github.com/agentik-dev/agentik-site/blob/b33bd13/history/sittings/2026-10-13-1-research.md>.
[^sitecharter]: agentik-dev/agentik-site, "history/sittings/2026-10-14-1-research.md", the site sitting's charter, commit 0b9f4c7, <https://github.com/agentik-dev/agentik-site/blob/0b9f4c7/history/sittings/2026-10-14-1-research.md>.
[^log]: agentik-dev/agentik-site, the commit history from 9663532 to 5c75210, read 2026-10-14, <https://github.com/agentik-dev/agentik-site/commits/5c75210>.
[^critics]: agentik-dev/agentik-site, "research/synthesis/critic-round-1.md" and "research/synthesis/critic-round-2.md", the critics' reports, commit 5c75210, <https://github.com/agentik-dev/agentik-site/tree/5c75210/research/synthesis>.
[^profile]: agentik-dev, ".github/profile/README.md", commit 8a0a188, <https://github.com/agentik-dev/.github/blob/8a0a188/profile/README.md>.
[^changelog]: Anthropic, "Claude Code changelog", documentation page read 2026-10-14, <https://code.claude.com/docs/en/changelog>.
[^issue46829]: Issue reporter, "Cache TTL silently regressed from 1h to 5m around early March 2026, causing quota and cost inflation", anthropics/claude-code issue 46829, 12 April 2026, <https://github.com/anthropics/claude-code/issues/46829>.
[^chroma]: Kelly Hong, Anton Troynikov and Jeff Huber, Chroma Research, "Context Rot: How Increasing Input Tokens Impacts LLM Performance", July 2025, <https://www.trychroma.com/research/context-rot>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^notes]: agentik-dev/agentik-site, "research/sources/", the research sitting's source notes, commit 2c11bbd, <https://github.com/agentik-dev/agentik-site/tree/2c11bbd/research/sources>.
[^check]: agentik-dev/agentik-site, "scripts/check" and "Makefile", commit b33bd13, <https://github.com/agentik-dev/agentik-site/blob/b33bd13/scripts/check>.
