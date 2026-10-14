# The agentik tools

The agentik tools are seven public repos under one GitHub organization, all written by one owner. The organization profile gives the one-line purpose: guardrails for long, unattended Claude Code work.[^profile] Five are Claude Code plugins, four of them with a command-line tool behind them, and each meets one failure. The sixth, agentik-commons, is the shared front door and the conventions.[^commonsrecord] The seventh, `.github`, holds that organization profile.[^profile] The evidence is our use, by one owner. The sources found include no measurement that a tool beats the alternative it replaced.

## The problem

You leave Claude Code running for hours, or for a night, and nobody watches. The repos record five ways it goes wrong. Each tool meets one of them.

Each tool, with its version on 2026-10-13:

- [agentik-session](session.md), version 2.0.0-alpha.14
    - **The failure it meets:** a session runs to its limit with no room to hand off, and a person has to restart it.
    - **What it does:** a meter on the session's own transcript, a checkpoint at 80 percent, a charter under 4 KB, and a launcher that restarts a sitting from the charter instead of compacting.[^sessionreadme]
- [agentik-relay](relay.md), version 0.1.3
    - **The failure it meets:** an unattended night of sessions forks past its means, spends without bound, or damages the repository.
    - **What it does:** a Go binary that runs queued packets headless, one worktree and one child per row, a deterministic gate, thirty stop reasons and two money caps.[^relayreadme][^relayr1][^relaycode]
- [agentik-decisions](decisions.md), version 0.8.0
    - **The failure it meets:** settled decisions do not reach the next session, or the file that holds them grows past reading.
    - **What it does:** one sectioned ledger per repo, capped at 25 entries in force; the few entries every session needs copied into a generated CLAUDE.md block; owner questions asked in one batch.[^decisionsreadme]
- [agentik-respeak](respeak.md), version 0.8.0
    - **The failure it meets:** agents write to each other in shorthand and the person reading the output becomes the outsider.
    - **What it does:** two lanes, with a ratified lexicon for agent traffic, and a translator, a style gate and a verifier that an edit changed only prose for the human lane.[^respeakreadme]
- [agentik-agents](agents.md), version 1.2.0
    - **The failure it meets:** delegated work bills in three currencies, fails quietly, and a session reaches one API endpoint.
    - **What it does:** three lanes (API-billed, subscription, local model), a loopback router that routes on the model name, a pooled fan-out and a cost log.[^agentsreadme]

The versions are the marketplace's entries. The file is unchanged from 2026-10-13 to commons' head on 2026-10-14, commit 588530f.[^marketplace]

The suite had a problem of its own. Its record opens with it: five tools, five naming schemes, three marketplace rules, and one tool that took its verbs as flags.[^commonsrecord]

## A human example: the shipping container

The shipping container's sizes were fixed before it went international, not before it went to sea. A 2013 working paper by Daniel Bernhofen, Zouheir El-Sahli and Richard Kneller traces the sequence. US container shipping began in 1956. The first fully containerised ships carried 35-foot boxes, the longest allowed for trucks on US highways, and other lines used smaller sizes. In 1961 a US maritime board fixed the nominal dimensions: 8 feet wide, 8 feet high, and 10, 20, 30 or 40 feet long. The International Organization for Standardization adopted the four lengths in 1964, and strength and lifting standards in 1965. Australia took up containers in 1964, but not in international trade. In the paper's sample, the first countries began handling container cargo in 1966, the year the first container services crossed the Atlantic. The paper says the ability of land and sea carriers to handle each other's containers set the foundation for global adoption.[^bernhofen]

The paper then estimates what containerisation did to trade. It follows product-level trade between 157 countries from 1962 to 1990. It times the effect from the year both countries of a pair first handled cargo through container ports or rail. For trade among rich countries, the abstract puts the cumulative average effect over 20 years at "about 700%". The body's benchmark estimates sum to 790 percent <span class="ev ev-measured">measured</span>. A free trade agreement raised trade 45 percent cumulatively, and joint GATT membership 285 percent.[^bernhofen]

The figures are the working paper's; the abstract of the 2016 journal version states no percentage. The abstract and the body give different figures for one effect. Both hold for North-North trade only, and the paper reports smaller effects for other country pairs. Above all, the paper measures containerisation as a whole, container technology and its intermodal system, not the size standard alone. It describes the standard as a precondition and gives it no estimate of its own.[^bernhofen] The paper measures trade, not software. The suite borrows the shape, not the number. The commons record's status of 2026-10-14 says four of the tools are installed behind one front door command, `agentik <tool>`, and that `agentik` lists them; respeak has no command-line tool in this round.[^commonsrecord] All five follow one guide for names, verbs and exit codes.[^guide]

## What the research teaches

Part 1 supports the causes behind two of commons' rules, and sets a third beside a finding of another kind. It measures none of the rules themselves.

- **Guards that match text miss other spellings.** <span class="ev ev-documented">documented</span> [Unattended runs and guardrails](../field/unattended-and-guardrails.md) finds that Claude Code's deny rules match command text, so `Bash(rm *)` misses `/bin/rm -rf`. It advises testing each guard with the absolute-path, `sh -c` and `git -C` spellings. The commons record found a weakness of the same kind in the relay's guards, below.
- **Tests fail under load.** <span class="ev ev-measured">measured</span> The same chapter cites a study in which 46.5 percent of 608 flaky tests were affected by computational resources, with CPU starvation worst. A load check is the relay's own rule, and the [Practices](../practices.md) page pairs the finding with the `bounded` wrapper.
- **A refusal is unrun, never red.** <span class="ev ev-our-use">our use</span> The rule is the owner's.[^guide] [Review that ends](../field/review.md) sets it beside the measured finding that an outside signal beats self-correction. That study measured language models revising their own reasoning, not checks that refused to run.

Each tool page reads its own premise against the field chapters that bear on it.

## The approach

### Why commons exists

Three risks shaped what commons holds.

- **A new spelling defeats a guard that matches by name.** Guards that match a command by name fail on a new spelling, and the record's analysis found the relay's guards would.[^commonsrecord]
- **Copies drift.** Scripts copied into five repos can drift. So commons keeps one canonical copy of the hygiene scan and the check wrapper, and each repo vendors them with a sha256 pin.[^commonsrecord]
- **Public repos can leak private names.** The hygiene scan guards against that, and it has had a gap of its own, recorded below.

Commons therefore holds the front door, the guide every repo follows, one marketplace, the canonical scripts, and the tests. The front door, `agentik <tool>`, is 96 lines of POSIX shell that finds `agentik-<tool>` on the path and runs it. Commons builds no tool.[^commonsreadme][^frontdoor]

### The conventions every repo follows

| Convention | The rule |
|---|---|
| Sittings and charters | One charter per sitting under `history/sittings/`, a commit per act, never an amend or a push from a builder |
| Packets | A closed "may touch" list, a verify row, acceptance lines with a measured baseline, six sections under 9,216 bytes; one recorded exception, commons' spent packet at 9,913 bytes |
| The check | `make check` runs under `bounded`: one lock per tree; an 840-second wall, which a repo may raise if it stays under the relay gate's verify limit (900 seconds when unset); no start while the load is above 4 per core and the CPU's idle share is 25 percent or less, and after 600 seconds, or at the wall, `bounded` exits without running the check; a refusal reads as unrun, never red |
| Hygiene | Six generic groups scanned with counts only; owner-specific terms in a private list outside every repo |
| Records | Cite a record by section; design records are `<topic>-rN.md`; the README is rendered from a source file |
| Command surface | `agentik-<tool>`, verbs as words, `--help`, `--version` and `doctor` everywhere, exit codes 0 done, 1 a check said no, 2 usage, 3 not installed |

The table paraphrases the guide.[^guide] The `bounded` wrapper's idle floor of 25 percent equals the relay's night breaker floor; the two move together.[^bounded] The rendered README answers a hand-edited one that had grown to 40,089 bytes in the respeak repo.[^respeakchangelog]

### How the tools relate

The tools are consistent, not dependent: each runs alone, and a cross-link turns on only when you install the other plugin.[^guide][^profile] agentik-session is an optional provider that writes one resolved configuration per session; relay, decisions and respeak read it when its provider version is in their range, and never write it.[^guide] agentik-relay starts each packet as a builder session and ships adversary and attendant subagent types. agentik-respeak renders the relay's morning report and the decisions tool's owner questions. agentik-agents' status view lists the sessions that agentik-session tracks.[^profile][^commonsrecord]

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> Seven repos by one owner, each with a public history that starts on 2026-10-13 and held 6 to 63 commits at its head on 2026-10-14. No count on this page measures what the shared front door and conventions save a person or an agent.

</div>

Every claim in this part is the repos' own record, labelled our use, unless a page says otherwise. The [method](../method.md) page gives the limits.

- **The scale.** The working records are older than the git histories. The agents README's feedback log opens with entries dated 2026-08-13,[^agentsreadme] and respeak's README dates its one field test 2026-08-31.[^respeakreadme] Before the public commits, the record is each repo's design files and changelogs. Each git history begins at one commit of 2026-10-13. At the commits the first reading used, which several footnotes here cite, each held one to three commits.[^respeakchangelog][^firstcommits] At their heads on 2026-10-14, the seven held 6 to 63 commits: session 63, respeak 27, decisions 23, agents 22, relay 21, commons 9 and the profile 6. Five of the seven have a newest commit dated 2026-10-14; relay's and the profile's are dated 2026-10-13.[^githeads]
- **The copies.** At the survey's date the hygiene scan and the `bounded` wrapper matched in all five repos, and the doc gate `doclint` in three.[^commonsrecord] The guide says `doclint` stays byte-identical across the repos.[^guide] At commit a326550, and still at 405d1e0, the relay's copy has another sha256, and its Makefile pins that one.[^relaydoclint] So one shared script had already drifted; the record leaves `doclint` as one copy to r2.[^commonsrecord] On 2026-10-14 the canonical hygiene scan and `bounded` changed in commons. Its backlog records that the five tool repos and the profile still vendor the earlier bytes, until each repo's next sync.[^commonsnth]

Not measured: whether a tool beats the alternative it replaced, and whether one front door and one guide save a person or an agent any learning. Each tool page says so where it matters.

## What has not worked, and what is open

Two pieces of the shared tooling have failed.

- **The hygiene scan passed a large file unread.** A review found the hygiene scan passing a file over 4 MiB by path only. That file's first line held a home path and an email. The scan now streams oversize files.[^commonstests]
- **The load floor missed a red check.** The load floor does not catch every case. The relay's backlog records a full check that went red under a load of 20 on 16 cores, below 4 per core, and proposes a test timeout or a split of the slow package.[^relaynth]

What stays open:

- The suite rename recorded in the commons design is partly done. At e456f4b, on 2026-10-13, the record wrote the switch, the proofs and the cold window as steps to run. On 2026-10-14, commit `3378994` added a status: the switch has landed, the five tool packets and the profile packet are merged, the four command-line tools are installed and `agentik` lists them, and the five `@agentik` plugins are enabled with the five old ones disabled. The status is the record's own statement and shows no log of the run. It does not yet record proofs P1 to P3, the consumer packets or the cold window as done.[^commonsrecord] At commit 6476f3a the organization profile showed the earlier install lines.[^profile] On 2026-10-13 the five tool repos merged their rename branches within one minute of each other.[^githeads] The record allows that merge only in the switch.[^commonsrecord] The profile merged its own branch in the same minute: at 8a0a188 it installs `session@agentik` and the other four plugins from the `agentik` marketplace.[^githeads][^profiler1]
- The switch was planned to install from a local marketplace built from each checkout, with the public marketplace as the fallback if proof P1 fails. The status says the plugins install from the `agentik` marketplace, not which copy, and P1 is among the proofs it does not yet record.[^commonsrecord]
- Ten items sit in the commons backlog. The tenth, added on 2026-10-14, is the vendored copies above.[^commonsnth]

## From the journal

- [Two lanes](../journal/posts/2026-08-31-two-lanes.md): the premise is that agents that write to each other drift toward shorthand, and the person reading the run becomes the outsider. respeak splits the lanes and gates the human one. One field test, n=1.
- [The probe that stopped a night](../journal/posts/2026-09-30-the-probe-that-stopped-a-night.md): a review agent's hand-built relay overwrote a running night's pid file, then removed it. The night read the missing file as a moved lock and stopped with nine rows ready, though its port lock held. Four layers had holes, and they lined up.
- [Restart, don't compact](../journal/posts/2026-10-05-restart-dont-compact.md): instead of compacting a full context, a sitting writes a charter under 4 KB and a fresh session starts from it. It carried one night across three restarts. No source we found compares it with compaction.
- [A wake that cost a turn](../journal/posts/2026-10-10-a-wake-that-cost-a-turn.md): 581 of 614 self-paced wakeups in one count took a turn of their own. Four pacing rules followed. The count has not been re-run.
- [The ledger that ran away](../journal/posts/2026-10-10-the-ledger-that-ran-away.md): a decision ledger grew past 400 entries, and nothing in it said which of them mattered. A cap, a sign-off bar and four priority levels followed. The old 401 entries still bind.
- [Living inside a usage window](../journal/posts/2026-10-14-living-inside-a-usage-window.md): a subscription meters use in five-hour windows under a weekly limit. We built two answers, a band that projects the window and advises how many helpers fit, and a pause that waits for the reset. The band has run live only in observe mode, where it refuses nothing. The pause has run only in tests, on fakes.

## Sources

[^profile]: agentik-dev, ".github/profile/README.md", commit 6476f3a, <https://github.com/agentik-dev/.github/blob/6476f3a/profile/README.md>.
[^profiler1]: agentik-dev, ".github/profile/README.md", the merge of the profile's rename packet, commit 8a0a188, <https://github.com/agentik-dev/.github/blob/8a0a188/profile/README.md>.
[^commonsrecord]: agentik-dev/agentik-commons, "design/agentik-r1.md", the suite record, with the status of 2026-10-14 that commit 3378994 added to section 8.2, commit 588530f, <https://github.com/agentik-dev/agentik-commons/blob/588530f/design/agentik-r1.md>.
[^marketplace]: agentik-dev/agentik-commons, ".claude-plugin/marketplace.json", commit 588530f, <https://github.com/agentik-dev/agentik-commons/blob/588530f/.claude-plugin/marketplace.json>.
[^commonstests]: agentik-dev/agentik-commons, "tests/test_hygiene.py", commit 588530f, <https://github.com/agentik-dev/agentik-commons/blob/588530f/tests/test_hygiene.py>.
[^commonsreadme]: agentik-dev/agentik-commons, "README.md", commit 588530f, <https://github.com/agentik-dev/agentik-commons/blob/588530f/README.md>.
[^frontdoor]: agentik-dev/agentik-commons, "bin/agentik", commit 588530f, <https://github.com/agentik-dev/agentik-commons/blob/588530f/bin/agentik>.
[^guide]: agentik-dev/agentik-commons, "GUIDE.md", commit 588530f, <https://github.com/agentik-dev/agentik-commons/blob/588530f/GUIDE.md>.
[^bounded]: agentik-dev/agentik-commons, "scripts/bounded", commit 588530f, <https://github.com/agentik-dev/agentik-commons/blob/588530f/scripts/bounded>.
[^commonsnth]: agentik-dev/agentik-commons, "NICE_TO_HAVE.md", commit 588530f, <https://github.com/agentik-dev/agentik-commons/blob/588530f/NICE_TO_HAVE.md>.
[^sessionreadme]: agentik-dev/agentik-session, "README.md", commit e7f0723, <https://github.com/agentik-dev/agentik-session/blob/e7f0723/README.md>.
[^relayreadme]: agentik-dev/agentik-relay, "README.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/README.md>.
[^relaycode]: agentik-dev/agentik-relay, "internal/relay/types.go", the stop reasons, and "internal/night/night.go", the night cap, commit a326550, <https://github.com/agentik-dev/agentik-relay/tree/a326550/internal>.
[^relayr1]: agentik-dev/agentik-relay, "design/relay-r1.md", section 6, the gate, commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/design/relay-r1.md>.
[^relaydoclint]: agentik-dev/agentik-relay, "scripts/doclint" and "Makefile", line 6, commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/scripts/doclint>.
[^relaynth]: agentik-dev/agentik-relay, "NICE_TO_HAVE.md", line 442, commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/NICE_TO_HAVE.md>.
[^decisionsreadme]: agentik-dev/agentik-decisions, "README.md", commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/README.md>.
[^respeakreadme]: agentik-dev/agentik-respeak, "README.md", commit c83e9b8, <https://github.com/agentik-dev/agentik-respeak/blob/c83e9b8/README.md>.
[^respeakchangelog]: agentik-dev/agentik-respeak, "CHANGELOG.md", commit 319f060, <https://github.com/agentik-dev/agentik-respeak/blob/319f060/CHANGELOG.md>.
[^agentsreadme]: agentik-dev/agentik-agents, "README.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/README.md>.
[^firstcommits]: agentik-dev, the first public commit of each repository, all dated 2026-10-13, read in the checkouts at the commits of the first reading (session e7f0723, relay a326550, decisions 80d59eb, respeak 319f060, agents 78ce312, commons e456f4b, profile 6476f3a); for example <https://github.com/agentik-dev/agentik-commons/commits/e456f4b>.
[^githeads]: agentik-dev, the git history of each repository, read on 2026-10-14 at its newest commit (session e8477a7, relay 405d1e0, decisions 569a120, respeak c83e9b8, agents f986500, commons 588530f, profile 8a0a188); for example <https://github.com/agentik-dev/agentik-session/commits/e8477a7>.
[^bernhofen]: Daniel M. Bernhofen, Zouheir El-Sahli and Richard Kneller, "Estimating the effects of the container revolution on world trade", GEP Research Paper 2013/02 (working paper; the journal version is Journal of International Economics 98:36-50, 2016), 2013, <https://www.nottingham.ac.uk/gep/documents/papers/2013/2013-02.pdf>.
