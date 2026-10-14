# The agentik tools

The agentik tools are six public repos under one GitHub organization, all written by one owner. The organization profile gives the one-line purpose: guardrails for long, unattended Claude Code work.[^profile] Five are Claude Code plugins, four of them with a command-line tool behind them, and each meets one failure. The sixth, agentik-commons, is the shared front door and the conventions.[^commonsrecord] The evidence is our use, by one owner. The sources found include no measurement that a tool beats the alternative it replaced.

## The problem

You leave Claude Code running for hours, or for a night, and nobody watches. The repos record five ways it goes wrong. Each tool meets one of them.

| Tool | The failure it meets | What it does | Version, 2026-10-13 |
|---|---|---|---|
| [agentik-session](session.md) | A session runs to its limit with no room to hand off, and a person has to restart it | A meter on the session's own transcript, a checkpoint at 80 percent, a charter under 4 KB, and a launcher that restarts a sitting from the charter instead of compacting[^sessionreadme] | 2.0.0-alpha.14 |
| [agentik-relay](relay.md) | An unattended night of sessions forks past its means, spends without bound, or damages the repository | A Go binary that runs queued packets headless, one worktree and one child per row, a deterministic gate, thirty stop reasons and two money caps[^relayreadme][^relayr1][^relaycode] | 0.1.3 |
| [agentik-decisions](decisions.md) | Settled decisions do not reach the next session, or the file that holds them grows past reading | One sectioned ledger per repo, capped at 25 entries in force, rendered into a small CLAUDE.md block, with batched owner questions[^decisionsreadme] | 0.8.0 |
| [agentik-respeak](respeak.md) | Agents write to each other in shorthand and the person reading the output becomes the outsider | Two lanes: a ratified lexicon for agent traffic and a translator, a style gate and a prose-only verifier for human prose[^respeakreadme] | 0.8.0 |
| [agentik-agents](agents.md) | Delegated work bills in three currencies, fails quietly, and a session reaches one API endpoint | Three lanes (API-billed, subscription, local model), a loopback router that routes on the model name, a pooled fan-out and a cost log[^agentsreadme] | 1.2.0 |

The versions are the marketplace's entries on 2026-10-13.[^marketplace]

The suite had a problem of its own. Its record opens with it: five tools, five naming schemes, three marketplace rules, and one tool that took its verbs as flags.[^commonsrecord]

## A human example: the shipping container

The shipping container's sizes were fixed before countries adopted it. In 1961 a US maritime board fixed the nominal dimensions: 8 feet wide, 8 feet high, and 10, 20, 30 or 40 feet long. The International Organization for Standardization adopted the four lengths in 1964, and strength and lifting standards in 1965. A 2013 working paper by Daniel Bernhofen, Zouheir El-Sahli and Richard Kneller traces this sequence. In its sample, the first countries began handling containers in 1966. The paper says the ability of land and sea carriers to handle each other's containers set the foundation for global adoption.[^bernhofen]

The paper then estimates what containerisation did to trade. It follows product-level trade between 157 countries from 1962 to 1990. It times the effect from the year both countries of a pair first handled cargo through container ports or rail. For trade among rich countries, the abstract puts the cumulative average effect over 20 years at "about 700%". The body's benchmark estimates sum to 790 percent <span class="ev ev-measured">measured</span>. A free trade agreement raised trade 45 percent cumulatively, and joint GATT membership 285 percent.[^bernhofen]

The figures are the working paper's; the abstract of the 2016 journal version states no percentage. The abstract and the body give different figures for one effect. Both hold for North-North trade only, and the paper reports smaller effects for other country pairs. Above all, the paper measures containerisation as a whole, container technology and its intermodal system, not the size standard alone. It describes the standard as a precondition and gives it no estimate of its own.[^bernhofen] The paper measures trade, not software. The suite borrows the shape, not the number. Its five tools share one front door command, one naming guide and one set of exit codes, so a person or an agent learns one shape once.

## What the research teaches

Part 1 supports the causes behind three of commons' rules. It measures none of the rules themselves.

- **Guards that match text miss other spellings.** <span class="ev ev-documented">documented</span> [Unattended runs and guardrails](../field/unattended-and-guardrails.md) finds that Claude Code's deny rules match command text, so `Bash(rm *)` misses `/bin/rm -rf`. It advises testing each guard with the absolute-path, `sh -c` and `git -C` spellings. The commons record found a weakness of the same kind in the relay's guards, below.
- **Tests fail under load.** <span class="ev ev-measured">measured</span> The same chapter cites a study in which 46.5 percent of 608 flaky tests were affected by computational resources, with CPU starvation worst. A load check is the relay's own rule, and the [Practices](../practices.md) page pairs the finding with the `bounded` wrapper.
- **A refusal is unrun, never red.** [Review that ends](../field/review.md) sets this commons rule beside the measured finding that an outside signal beats self-correction. The rule itself is the owner's.

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
| Packets | A closed "may touch" list, a verify row, acceptance lines with a measured baseline, six sections under 9,216 bytes |
| The check | `make check` runs under `bounded`: one lock per tree, an 840-second wall, and no start above a load of 4 per core while the CPU's idle share is 25 percent or less; a refusal reads as unrun, never red |
| Hygiene | Six generic groups scanned with counts only; owner-specific terms in a private list outside every repo |
| Records | Cite a record by section; design records are `<topic>-rN.md`; the README is rendered from a source file |
| Command surface | `agentik-<tool>`, verbs as words, `--help`, `--version` and `doctor` everywhere, exit codes 0 done, 1 a check said no, 2 usage, 3 not installed |

The table paraphrases the guide.[^guide] The `bounded` wrapper's idle floor of 25 percent equals the relay's night breaker floor; the two move together.[^bounded] The rendered README answers a hand-edited one that had grown to 40,089 bytes in the respeak repo.[^respeakchangelog]

### How the tools relate

The tools are consistent, not dependent: each runs alone, and a cross-link turns on only when you install the other plugin.[^guide][^profile] agentik-session is an optional provider that writes one resolved configuration per session; relay, decisions and respeak read it when its provider version is in their range, and never write it.[^guide] agentik-relay starts each packet as a builder session and ships adversary and attendant subagent types. agentik-respeak renders the relay's morning report and the decisions tool's owner questions. agentik-agents' status view lists the sessions that agentik-session tracks.[^profile][^commonsrecord]

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> Six repos by one owner, each with a public history of one to three commits from 2026-10-13. No count on this page measures what the shared front door and conventions save a person or an agent.

</div>

Every claim in this part is the repos' own record, labelled our use, unless a page says otherwise. The [method](../method.md) page gives the limits.

- **The scale.** The working records start in September 2026. Before the public commits, the record is each repo's design files and changelogs. Each git history begins at one commit of 2026-10-13 and holds one to three commits.[^respeakchangelog][^firstcommits]
- **The copies.** At the survey's date the hygiene scan and the `bounded` wrapper still matched in all five repos. The drift that commons guards against had not yet happened.[^commonsrecord]

Not measured: whether a tool beats the alternative it replaced, and whether one front door and one guide save a person or an agent any learning. Each tool page says so where it matters.

## What has not worked, and what is open

Two pieces of the shared tooling have failed.

- **The hygiene scan passed a large file unread.** A review found the hygiene scan passing a file over 4 MiB by path only. That file's first line held a home path and an email. The scan now streams oversize files.[^commonstests]
- **The load floor missed a red check.** The load floor does not catch every case. The relay's backlog records a full check that went red under a load of 20 on 16 cores, below 4 per core, and proposes a test timeout or a split of the slow package.[^relaynth]

What stays open:

- The suite rename recorded in the commons design is partly done at the commit read. The switch, the proofs and the cold window are written as steps still to run, and the organization profile still shows the earlier install lines.[^commonsrecord][^profile]
- The switch installs from a local marketplace built from each checkout, with the public marketplace as the fallback if the local proof fails. The record plans the switch and its proof, and records no run of either.[^commonsrecord]
- Nine items sit in the commons backlog.[^commonsnth]

## From the journal

- [Two lanes](../journal/posts/2026-08-31-two-lanes.md): agents drift into shorthand and the reader becomes the outsider; respeak splits the lanes and gates the human one (n=1).
- [The probe that stopped a night](../journal/posts/2026-09-30-the-probe-that-stopped-a-night.md): a review agent's hand-built relay replaced a running night's lock file, and the night stopped with nine rows still ready.
- [Restart, don't compact](../journal/posts/2026-10-05-restart-dont-compact.md): a charter under 4 KB and a fresh session carried one night across three restarts; nobody has compared it with compaction.
- [A wake that cost a turn](../journal/posts/2026-10-10-a-wake-that-cost-a-turn.md): 581 of 614 self-paced wakeups in one count took a turn of their own, and four pacing rules followed.
- [The ledger that ran away](../journal/posts/2026-10-10-the-ledger-that-ran-away.md): a decision ledger grew past 400 entries, and a cap, a sign-off bar and four severity levels were the fix.
- [Living inside a usage window](../journal/posts/2026-10-14-living-inside-a-usage-window.md): a band that paces helpers and a pause that waits for the five-hour window to reset; neither has run long enough to judge.

## Sources

[^profile]: agentik-dev, ".github/profile/README.md", commit 6476f3a, <https://github.com/agentik-dev/.github/blob/6476f3a/profile/README.md>.
[^commonsrecord]: agentik-dev/agentik-commons, "design/agentik-r1.md", the suite record, commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/design/agentik-r1.md>.
[^marketplace]: agentik-dev/agentik-commons, ".claude-plugin/marketplace.json", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/.claude-plugin/marketplace.json>.
[^commonstests]: agentik-dev/agentik-commons, "tests/test_hygiene.py", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/tests/test_hygiene.py>.
[^commonsreadme]: agentik-dev/agentik-commons, "README.md", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/README.md>.
[^frontdoor]: agentik-dev/agentik-commons, "bin/agentik", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/bin/agentik>.
[^guide]: agentik-dev/agentik-commons, "GUIDE.md", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/GUIDE.md>.
[^bounded]: agentik-dev/agentik-commons, "scripts/bounded", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/scripts/bounded>.
[^commonsnth]: agentik-dev/agentik-commons, "NICE_TO_HAVE.md", commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/NICE_TO_HAVE.md>.
[^sessionreadme]: agentik-dev/agentik-session, "README.md", commit e7f0723, <https://github.com/agentik-dev/agentik-session/blob/e7f0723/README.md>.
[^relayreadme]: agentik-dev/agentik-relay, "README.md", commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/README.md>.
[^relaycode]: agentik-dev/agentik-relay, "internal/relay/types.go", the stop reasons, and "internal/night/night.go", the night cap, commit a326550, <https://github.com/agentik-dev/agentik-relay/tree/a326550/internal>.
[^relayr1]: agentik-dev/agentik-relay, "design/relay-r1.md", section 6, the gate, commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/design/relay-r1.md>.
[^relaynth]: agentik-dev/agentik-relay, "NICE_TO_HAVE.md", line 442, commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/NICE_TO_HAVE.md>.
[^decisionsreadme]: agentik-dev/agentik-decisions, "README.md", commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/README.md>.
[^respeakreadme]: agentik-dev/agentik-respeak, "README.md", commit 319f060, <https://github.com/agentik-dev/agentik-respeak/blob/319f060/README.md>.
[^respeakchangelog]: agentik-dev/agentik-respeak, "CHANGELOG.md", commit 319f060, <https://github.com/agentik-dev/agentik-respeak/blob/319f060/CHANGELOG.md>.
[^agentsreadme]: agentik-dev/agentik-agents, "README.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/README.md>.
[^firstcommits]: agentik-dev, the first public commit of each repository, all dated 2026-10-13, read in the checkouts at the commits cited on this page; for example <https://github.com/agentik-dev/agentik-commons/commits/e456f4b>.
[^bernhofen]: Daniel M. Bernhofen, Zouheir El-Sahli and Richard Kneller, "Estimating the effects of the container revolution on world trade", GEP Research Paper 2013/02 (working paper; the journal version is Journal of International Economics 98:36-50, 2016), 2013, <https://www.nottingham.ac.uk/gep/documents/papers/2013/2013-02.pdf>.
