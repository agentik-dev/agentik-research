---
repo: agentik-dev/agentik-commons
path: the git history from e456f4b to 588530f; design/agentik-r1.md, GUIDE.md, NICE_TO_HAVE.md, README.md, bin/agentik, scripts/bounded, tests/test_hygiene.py, .claude-plugin/marketplace.json, docs/sibling.md, history/sittings/; and, by sha256 only, scripts/hygiene, scripts/bounded and scripts/agentik at the heads of the five tool repos and the profile repo
commit: 588530f
title: "agentik-commons at its head on 2026-10-14: the rf1-research-fixes merge"
author: agentik-dev (the suite owner)
published: 2026-10-14 (the merge 588530f)
accessed: 2026-10-14
kind: our-use
---

Read on 2026-10-14 in the attached checkout at 588530f: `git log` from e456f4b to 588530f; `git diff e456f4b 588530f` over design/agentik-r1.md, NICE_TO_HAVE.md, GUIDE.md, scripts/bounded and docs/sibling.md; `git show --stat` of 2507c11; at 588530f, design/agentik-r1.md lines 1-75 and 196-333, GUIDE.md whole, NICE_TO_HAVE.md whole, README.md lines 1-33, bin/agentik lines 1-20 and its `exec` lines, scripts/bounded lines 58-64, tests/test_hygiene.py lines 325-340 and .claude-plugin/marketplace.json whole. Line numbers are at 588530f.

## What it says
- History: 9 commits at 588530f. After e456f4b (2026-10-13 17:21:17 -0700), six commits dated 2026-10-14 between 09:50:22 and 09:53:39 -0700 merged in 588530f at 09:53:53, "merge rf1-research-fixes: the research site's findings (the bounded rule stated once, the renamed boundary, the packet exception, §8.2's status)". The six: 2507c11 (hygiene: the `renamed` group's old ids end at a word boundary), e0c852e (the bounded load rule stated once: GUIDE.md §5, the docstring, docs/sibling.md), 17c9082 (GUIDE.md §5: a repository may raise its bounded wall), 3086db0 (GUIDE.md §9: the 9,913-byte packet exception), 3378994 (agentik-r1 §8.2: the status on 2026-10-14) and 51509e4 (NICE_TO_HAVE: the vendored copies).
- The record's status, added by commit 3378994 at design/agentik-r1.md:266: "**Status (2026-10-14).** The switch (§8.3) has landed: the five tool packets and the profile packet are merged, the four command line tools are installed and `agentik` lists them (A1), the plugins install as `<name>@agentik` from the `agentik` marketplace, and the five `@agentik` plugins are enabled with the five old ones disabled (A4)." It goes on: "Not recorded here as done: proofs P1 to P3 (§9), the consumer packets and the cold window (§8.5); each is dated in this section when it lands." The status names no log or output of the switch's run.
- Apart from that paragraph, the record reads as at e456f4b (the diff adds two lines). §1 (:11): "Five tools, five naming schemes, three marketplace rules. One tool takes verbs as flags." §2.1 (:25): `bounded` and `hygiene` match in all five repos, `doclint` in three. §2.4 (:60): relay's guards match by name, "A new spelling gets past both." §7.3 (:224-226): the canonical hygiene, `bounded` and the front door are vendored, each pinned by sha256; `doclint` becomes one copy in r2. §8.1 (:245): the tool branches merge only in the switch. §8.3 (:270-277): the switch's steps 0 to 5, from the merge to the freeze; step 2 installs from a local marketplace. §9 (:320-322): P1, a `file://` `git-subdir` entry installs and its hooks run in a scratch config folder, and "If it fails, D1 falls back to the public marketplace"; P2 and P3. §10 (:330-333): D1, the owner's machine installs from a local marketplace built from each checkout's committed main; D4, "respeak gets no command in r1".
- GUIDE.md §5 (:53): `check` runs under `scripts/bounded --lock .check.lock --wall 840 --load 4`. The load rule: while the 1-minute load is above 4 per core and the CPU's idle share is 25% or less, `bounded` holds the start, polling every 30 s, and after 600 s or at the wall exits 2 without running the command. "A repository may raise its wall in its own `check` line, kept under the gate's verify limit (the relay's `verify_seconds`, 900 s when unset)"; the relay's own `check` keeps 840 s. A last stderr line `bounded: stop: lock|load|wall` "is unrun, never red".
- GUIDE.md §9 (:71): "Six sections, six header rows plus `verify`, under 9,216 bytes. One recorded exception (2026-10-14): commons' spent packet `design/packets/agentik-r1-commons.md`, 9,913 bytes, kept as it was built, since a spent packet is a record."
- The rest of GUIDE.md reads as at e456f4b: binding on the five tools, "consistent, not dependent" (:3); §3, the session's resolved file, which a plugin accepts only when the provider version is in its range and never writes (:38); §6, six generic hygiene groups, owner terms kept outside the repo, counts only (:57); §7, a charter per sitting, a commit per act, never `--amend` or push (:61); §8, a record cited by section (:65); §10, `agentik-<tool>`, verbs as words, `--help`, `--version` and `doctor` everywhere, exit codes 0, 1, 2 and 3 (:79-82).
- NICE_TO_HAVE.md holds 10 items. The tenth, added by commit 51509e4 (:12): "**rf1 (2026-10-14), the vendored copies, S3.**" The research fixes changed the canonical `scripts/hygiene` and `scripts/bounded`; "The five tool repos and the organization profile still vendor the earlier bytes; `scripts/sync <repo>` in each, at that repo's next packet, brings them over and rewrites `scripts/vendored.sha256`."
- README.md:3-4: the shared ground of the five tools; "It builds no tool: no `install` target, no plugin of its own."
- bin/agentik: 96 lines (`wc -l`), `#!/bin/sh`; line 96 is `exec "agentik-$tool" "$@"`; unchanged since e456f4b.
- scripts/bounded:10-11 (docstring, unchanged since e456f4b): `--wall S`, "counted from bounded's start, the load wait included; at S seconds the command's group gets SIGTERM, then SIGKILL after a grace: exit 124." Line 33: "On a refusal or the wall the last stderr line is `bounded: stop: lock|load|wall`", which the gate reads "as unrun, never red". Read on 2026-10-14 for the glossary's wall.
- scripts/bounded:61-62: the idle floor of 25 percent is "the relay's night.DefaultIdleFloor (0.25, a share), and the two move together."
- tests/test_hygiene.py:327-328: "the relay's ADV11-15: a tracked file over 4 MiB whose first line holds a home path and an email passed by path only, exit 0; streamed now (S14), both counted."
- .claude-plugin/marketplace.json: unchanged since e456f4b (an empty `git diff`); five entries, session 2.0.0-alpha.14, decisions 0.8.0, respeak 0.8.0, relay 0.1.3, agents 1.2.0.
- My check, not the record's: `sha256sum` of `scripts/hygiene`, `scripts/bounded` and `scripts/agentik` at the heads of agentik-session, agentik-decisions, agentik-respeak, agentik-relay, agentik-agents and `.github`. In all six, hygiene (32bd5b63148e...) and bounded (4fdfdc1df943...) equal commons' copies at e456f4b, not its copies at 588530f (8ef611607c0f... and 188adff23545...). The front door (4cd780d9c66d...) equals commons' `bin/agentik` at both commits.
- Added 2026-10-14 for docs/tools/relay.md (the charter count): `git ls-tree --name-only 588530f history/sittings/` lists one dated `.md` charter, `2026-10-13-1.md`, and no other file, as agentik-relay-head-2026-10-14 counts.

## Limits
- The owner's own record of the owner's suite. The status is a statement in the record, with no log of the switch's run; it says the plugins install from the `agentik` marketplace, not whether from the local copy (D1) or the public one.
- The fixes answer this site's first review round; they change the record and the scripts, not the evidence that the tools work.

## Used in
- docs/tools/index.md
- docs/tools/relay.md (the charter count)
- docs/glossary.md (wall)
