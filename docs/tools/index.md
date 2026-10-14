# The agentik tools

Six public repositories under one GitHub organization, written by one owner, with working records from late August 2026 and public histories that begin in October 2026,[^respeakchangelog][^commonsrecord] each meeting one failure of long or unattended Claude Code work. Five are Claude Code plugins, four of them with a command-line tool behind them; the sixth, agentik-commons, is the shared front door and the conventions.[^commonsrecord] The organization profile gives the one-line purpose: guardrails for long, unattended Claude Code work.[^profile] Every claim in this part is the repos' own record, labelled our use, unless a page says otherwise. The sources found include no measurement that a tool beats the alternative it replaced, and this part says so where it matters; the [method](../method.md) page gives the limits.

## The five tools and what each meets

| Tool | The failure it meets | What it does | Version, 2026-10-13 |
|---|---|---|---|
| agentik-session | A session runs to its limit with no room to hand off, and a person has to restart it | A meter on the session's own transcript, a checkpoint at 80 percent, a charter under 4 KB, and a launcher that restarts a sitting from the charter instead of compacting[^sessionreadme] | 2.0.0-alpha.14 |
| agentik-relay | An unattended night of sessions forks past its means, spends without bound, or damages the repository | A Go binary that runs queued packets headless, one worktree and one child per row, a deterministic gate, thirty stop reasons and two money caps[^relayreadme][^relaycode] | 0.1.3 |
| agentik-decisions | Settled decisions do not reach the next session, or the file that holds them grows past reading | One sectioned ledger per repo, capped at 25 entries in force, rendered into a small CLAUDE.md block, with batched owner questions[^decisionsreadme] | 0.8.0 |
| agentik-respeak | Agents write to each other in shorthand and the person reading the output becomes the outsider | Two lanes: a ratified lexicon for agent traffic and a translator, a style gate and a prose-only verifier for human prose[^respeakreadme] | 0.8.0 |
| agentik-agents | Delegated work bills in three currencies, fails quietly, and a session reaches one API endpoint | Three lanes (API-billed, subscription, local model), a loopback router that routes on the model name, a pooled fan-out and a cost log[^agentsreadme] | 1.2.0 |

The versions are the marketplace's entries on 2026-10-13.[^marketplace]

## Why commons exists

The suite's own record opens with its problem: five tools, five naming schemes, three marketplace rules, and one tool that took its verbs as flags.[^commonsrecord] Three risks followed from the inconsistency. Guards that match a command by name fail on a new spelling, and the record's analysis found the relay's guards would.[^commonsrecord] Scripts duplicated across five repos can drift, so commons keeps one canonical copy of the hygiene scan and the check wrapper, which each repo vendors with a sha256 pin.[^commonsrecord] And public repos can leak private names: a review found the hygiene scan passing a file over 4 MiB by path only, with a home path and an email in its first line, and the scan now streams oversize files.[^commonstests]

Commons therefore holds the front door `agentik <tool>` (96 lines of POSIX shell that finds `agentik-<tool>` on the path and runs it), the guide every repo follows, one marketplace, the canonical scripts, and the tests. It builds no tool.[^commonsreadme][^frontdoor]

## The conventions every repo follows

| Convention | The rule |
|---|---|
| Sittings and charters | One charter per sitting under `history/sittings/`, a commit per act, never an amend or a push from a builder |
| Packets | A closed "may touch" list, a verify row, acceptance lines with a measured baseline, six sections under 9,216 bytes |
| The check | `make check` runs under `bounded`: one lock per tree, an 840-second wall, and no start above a load of 4 per core while the CPU's idle share is 25 percent or less; a refusal reads as unrun, never red |
| Hygiene | Six generic groups scanned with counts only; owner-specific terms in a private list outside every repo |
| Records | Cite a record by section; design records are `<topic>-rN.md`; the README is rendered from a source file |
| Command surface | `agentik-<tool>`, verbs as words, `--help`, `--version` and `doctor` everywhere, exit codes 0 done, 1 a check said no, 2 usage, 3 not installed |

The table paraphrases the guide.[^guide] The `bounded` wrapper's idle floor of 25 percent equals the relay's night breaker floor; the two move together.[^bounded] The relay's record shows why the check runs bounded: its full check went red under a load of 20 on 16 cores.[^relaynth] The rendered README answers a hand-edited one that had grown to 40,089 bytes in the respeak repo.[^respeakchangelog]

## How the tools relate

The tools are consistent, not dependent: each runs alone, and a cross-link turns on only when the other plugin is installed.[^guide][^profile] agentik-session is an optional provider that writes one resolved configuration per session, which the others read when its version is in range and never write. agentik-relay starts each packet as a builder session and ships adversary and attendant subagent types. agentik-respeak renders the relay's morning report and the decisions tool's owner questions. agentik-agents' status view lists the sessions that agentik-session tracks.[^profile][^commonsrecord]

## What is open

- The suite rename recorded in the commons design is only partly done at the commit read: the switch, the proofs and the cold window are written in the future tense, and the organization profile still shows the earlier install lines.[^commonsrecord][^profile]
- The switch to the public marketplace and its proof are written in the future tense at the commit read; a local copy for the owner's machine is the plan.[^commonsrecord]
- No build order or earlier suite history is recorded; each public history starts at one commit in October 2026.[^commonsrecord]
- Nine items sit in the commons backlog.[^commonsnth]

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
[^relaynth]: agentik-dev/agentik-relay, "NICE_TO_HAVE.md", line 442, commit a326550, <https://github.com/agentik-dev/agentik-relay/blob/a326550/NICE_TO_HAVE.md>.
[^decisionsreadme]: agentik-dev/agentik-decisions, "README.md", commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/README.md>.
[^respeakreadme]: agentik-dev/agentik-respeak, "README.md", commit 319f060, <https://github.com/agentik-dev/agentik-respeak/blob/319f060/README.md>.
[^respeakchangelog]: agentik-dev/agentik-respeak, "CHANGELOG.md", commit 319f060, <https://github.com/agentik-dev/agentik-respeak/blob/319f060/CHANGELOG.md>.
[^agentsreadme]: agentik-dev/agentik-agents, "README.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/README.md>.
