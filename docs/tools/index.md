# The agentik tools

Six public repositories under one GitHub organization, written by one owner since September 2026, each meeting one failure of long or unattended Claude Code work. Five are Claude Code plugins with a command-line tool behind them; the sixth, agentik-commons, is the shared front door and the conventions. The organization profile gives the one-line purpose: guardrails for long, unattended Claude Code work.[^profile] Every claim in this part is the repos' own record, labelled our use, unless a page says otherwise. No measurement shows that any tool beats the alternative it replaced, and this part says so where it matters.[^commonsrecord]

## The five tools and what each meets

| Tool | The failure it meets | What it does | Version, 2026-10-13 |
|---|---|---|---|
| agentik-session | A session runs to its limit with no room to hand off, and a person has to restart it | A meter on the session's own transcript, a checkpoint at 80 percent, a charter under 4 KB, and a launcher that restarts a sitting from the charter instead of compacting | 2.0.0-alpha.14 |
| agentik-relay | An unattended night of sessions forks past its means, spends without bound, or damages the repository | A Go binary that runs queued packets headless, one worktree and one child per row, a deterministic gate, thirty stop reasons and two money caps | 0.1.3 |
| agentik-decisions | Settled decisions do not reach the next session, or the file that holds them grows past reading | One sectioned ledger per repo, capped at 25 entries in force, rendered into a small CLAUDE.md block, with batched owner questions | 0.8.0 |
| agentik-respeak | Agents write to each other in shorthand and the person reading the output becomes the outsider | Two lanes: a ratified lexicon for agent traffic and a translator, a style gate and a prose-only verifier for human prose | 0.8.0 |
| agentik-agents | Delegated work bills in three currencies, fails quietly, and a session reaches one API endpoint | Three lanes (API-billed, subscription, local model), a loopback router that routes on the model name, a pooled fan-out and a cost log | 1.2.0 |

The versions are the marketplace's entries on 2026-10-13.[^marketplace]

## Why commons exists

The suite's own record opens with its problem: five tools, five naming schemes, three marketplace rules, and one tool that took its verbs as flags.[^commonsrecord] Three failures followed from the inconsistency. Guards that match a command by name fail on a new spelling, and the relay's deny rules did.[^commonsrecord] Scripts duplicated across five repos drift, so commons keeps one canonical copy of the hygiene scan and the check wrapper, which each repo vendors with a sha256 pin.[^commonsrecord] And public repos leak private names: the hygiene scan once passed a 4 MiB file by path only, with a home path and an email in its first line, and now streams oversize files.[^commonstests]

Commons therefore holds the front door `agentik <tool>` (96 lines of POSIX shell that finds `agentik-<tool>` on the path and runs it), the guide every repo follows, one marketplace, the canonical scripts, and the tests. It builds no tool.[^commonsreadme][^frontdoor]

## The conventions every repo follows

| Convention | The rule | Why |
|---|---|---|
| Sittings and charters | One charter per sitting under `history/sittings/`, a commit per act, never an amend or a push from a builder | A restart reads the charter; the sitting's own record outlives the context |
| Packets | A closed "may touch" list, a verify row, acceptance lines with a measured baseline, six sections under 9,216 bytes | A packet fits one sitting, and the gate can judge it without a model |
| The check | `make check` runs under `bounded`: one lock per tree, an 840-second wall, no start above a load of 4 per core unless the CPU is idle; a refusal reads as unrun, never red | Checks that collide or hang under load were the relay's recorded failure |
| Hygiene | Six generic groups scanned with counts only; owner-specific terms in a private list outside every repo | The repos are public and the owner's working context is private |
| Records | Cite a record by section; design records are `<topic>-rN.md`; the README is rendered from a source file | A model reads by section, and a hand-kept README drifted to 40 KB in one repo |
| Command surface | `agentik-<tool>`, verbs as words, `--help`, `--version` and `doctor` everywhere, exit codes 0 done, 1 a check said no, 2 usage, 3 not installed | One meaning per code across five tools |

The table paraphrases the guide.[^guide] The `bounded` wrapper's idle floor of 25 percent equals the relay's night breaker floor; the two move together.[^bounded]

## How the tools relate

The tools are consistent, not dependent: each runs alone, and a cross-link turns on only when the other plugin is installed.[^guide][^profile] agentik-session is an optional provider that writes one resolved configuration per session, which the others read when its version is in range and never write. agentik-relay starts each packet as a builder session and ships adversary and attendant subagent types. agentik-respeak renders the relay's morning report and the decisions tool's owner questions. agentik-agents' status view lists the sessions that agentik-session tracks.[^profile][^commonsrecord]

## What is open

- The suite rename recorded in the commons design is only partly done at the commit read: the switch, the proofs and the cold window are written in the future tense, and the organization profile still shows the earlier install lines.[^commonsrecord][^profile]
- The marketplace has never been installed from the public repo; the owner's machine uses a local copy.[^commonsrecord]
- No build order or earlier suite history is recorded; each public history starts at one commit in October 2026.[^commonsrecord]
- Nine open items sit in the commons backlog, none blocking.[^commonsnth]

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
