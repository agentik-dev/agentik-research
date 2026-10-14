---
date:
  created: 2026-09-30
categories:
  - Did not work
  - Open
description: A review agent's hand-built relay overwrote a running night's pid file, then removed it. The night read the missing file as a moved lock and stopped with nine rows ready, though its port lock held. Four layers had holes, and they lined up.
---

# The probe that stopped a night

A review agent built its own relay binary, ran it four times against a scratch repository, and stopped a real night running beside it on the same account. Nine rows of work stayed ready overnight. The night's lock, a port, held. Four other layers had holes, and on 2026-09-30 the holes lined up.

<!-- more -->

## The problem

An unattended night runs while nobody watches. One relay process holds the account's lock, a TCP port on 127.0.0.1, and `agentik relay run` refuses any live holder, so a second night started from another shell is refused. The design calls that lock advisory "against a child that builds its own relay with its own port link".[^design] Other agents share the account: the night's own sittings, and helpers of other Claude sessions that run outside any row.[^design][^ar40] What they do to shared state, such as the account's pid directory, reaches the night.

## A human example: slices of Swiss cheese

James Reason, writing on medical error, pictured a system's defences as layers: engineered barriers, people and procedures between a hazard and harm. "In reality, however, they are more like slices of Swiss cheese, having many holes".[^reason] The holes open, shut and move. A hole in one slice does not normally cause harm: "Usually, this can happen only when the holes in many layers momentarily line up".[^reason]

Reason named two kinds of hole. Active failures are unsafe acts by people in direct contact with the system, and their effect is usually short-lived. Latent conditions are built in by designers, builders, procedure writers and managers, can lie dormant for years, and can be found and fixed before anything goes wrong.[^reason] His remedy follows from the split: active failures keep coming however many you swat, so the best remedies are better defences and draining the latent conditions. Read that way, the hand build below was the active failure, and the four holes it passed through were latent conditions, in place before it ran.

## What the research teaches

The [guardrails half of the unattended-runs chapter](../../field/unattended-and-guardrails.md) lists Claude Code's guards with the limits their documentation states. In Reason's terms, each is one slice with named holes. A deny rule matches the command's text: as of October 2026, `Bash(git push *)` misses `git -C . push`, and the documentation says a rule is not a security boundary.[^permissions] The sandbox covers Bash commands and their children, but it is off by default, and file tools and hooks run outside it.[^sandbox] A PreToolUse hook that exits 2 stops a call before the permission rules are evaluated, even when an allow rule would have passed it.[^permissions]

Each incident the chapter lists is one account, not reproduced. This one is too: one account, seen once, and never replayed with a real binary.

## What happened

Between 06:56 and 06:58 UTC on 2026-09-30, a review agent built the relay binary by hand. (A later packet dates the same event 2026-09-29 at 23:56, which matches if its clock ran seven hours behind UTC.)[^ar40] It linked the binary with a lock port of its own, and its home and state variables pointed at scratch directories. Then it ran `agentik relay plan` four times against a scratch repository.[^ar36] At the time the binary ran under its old name, `relay`. The build took the name agentik-relay on 2026-10-13, in commit `72c0fe0`, and this entry writes the commands as they read today.[^rename]

Here the holes lined up:

1. **The pid directory came from the system's user database, not from the home variable.** The scratch home did not apply, so the hand-built binary used the account's real pid directory.
2. **The pid file write replaced a live holder's file.** Each run took the binary's own lock port, which was free, wrote its line over the running night's `relay.pid`, and removed the file on release.
3. **The night read a missing pid file as a moved lock.** At its next poll it stopped with the reason `lock-moved`. No new sitting started, and nine rows stayed ready overnight.[^ar36] Its port was still held.[^nth] In the code's words, "the lock is the port, never the file".[^ar36]
4. **The rule against hand-built binaries lived only in prompts.** The guard against a nested run applied only inside a night's row, and the review helper ran outside any row.[^ar40]

Parts of the route were known. Review ADV13 found that removing `relay.pid` let a second relay take the lock (ADV13-4). It proposed a lock a sitting cannot unlink, a loopback port, with the holder re-checking the file's path each poll and stopping the night on a new inode.[^adv13] The design took both, and that check is hole 3.[^design] The next review, ADV14, found that a relay built with its own lock port takes its own lock: "ADV13-13 is open with a new route".[^adv14] The design lists that route as a residual, the advisory lock quoted above.[^design] Both reviews tested what the relay's hook let through. The probe ran outside any row, where no guard applied.[^ar40]

## What we changed

Packet AR36, in a sitting dated the same day, closed holes 1 and 2. A binary linked with a lock port and no pid home, as the probe's was, now refuses to resolve the account's real pid directory. The pid file write now refuses to replace a file that names a live holder. Its third ruling gave the builder and adversary prompts one line each: never build the relay by hand.[^ar36] That is one more rule in a prompt, so hole 4 stayed as it was. Hole 3 is still open (below).

A second incident followed. A read-only helper, whose prompt forbade it, ran `agentik relay run --orchestrate`. It was refused only because a gate held the lock. The packet that followed, AR40, put the finding in one line: "the rule lived only in their prompts."[^ar40] It added a hook guard, `helper-relay`, that denies the relay's write verbs and a build of the relay on any subagent's Bash call, in a row or not. For helpers, that took the rule out of the prompts alone. The main thread is unchanged.[^ar40]

The prompt lines stay in the builder and adversary prompts as one slice, no longer the only one.[^prompts]

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> Two incidents, each seen once. The fixes rest on in-process tests, not on a replay with a real binary. The charters record two of AR36's three tests, and one of AR40's three, as red on `main` before the fix.

</div>

AR36 shipped three tests, and AR40 three more.[^ar36][^ar40] AR36's charter records `TestAR36_1_LiveHolderFileIsNotReplaced` and `TestAR36_2_LinkedPortNeedsLinkedHome` red on `main`.[^ar36sit] AR40's charter records only `TestAR40_1_HelperDeniedWriteVerbs` red.[^ar40sit] The repo holds no count of helper runs that the new guard denied or let through.

The first review of the new guard found holes the same day. Spelling bypasses it: `$(which relay) stop`, a variable holding the name, or `pkill -f 'relay run'`. A build through `make build` passes. And a read-only `find cmd/relay ... -exec grep -l stop` is denied, because a word naming the relay's source comes before a verb.[^nth]

## What has not worked, and what is open

The check that stopped the night is unchanged at the head: a missing `relay.pid`, or a new inode at its path, still stops the night, though the lock is the port.[^design] One open question in the repo asks whether a missing advisory file should stop a night whose port is still held, or whether the holder should write the file again. It is not decided.[^nth] The same check reads only the file's device and inode, so an in-place rewrite, a hard link and restore, or a move away and back would slip past it.[^adv14]

The design leaves both the own-port-link route and those evasions to a sandbox that is "Not built (the owner's open decision)". Its seam is `internal/effects/spawn.go`, "the one place a sitting starts".[^design] The probe was no sitting: it was a helper of a plain session, outside any row.[^ar40] A sandbox at that seam would wrap the night's sittings, and the probe was not one of them. The review of AR36's fix alone left six more lines in the repository's list.[^nth]

<p class="ak-written">Written 2026-10-14 from agentik-relay at commit 405d1e0.</p>

<ul class="ak-related" markdown>
<li markdown>[Unattended runs and guardrails](../../field/unattended-and-guardrails.md)</li>
<li markdown>[agentik-relay](../../tools/relay.md)</li>
</ul>

## Sources

[^reason]: James Reason, "Human error: models and management", BMJ 320(7237):768-770, 18 March 2000, <https://pmc.ncbi.nlm.nih.gov/articles/PMC1117770/>.
[^permissions]: Anthropic, "Configure permissions", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/permissions>.
[^sandbox]: Anthropic, "Configure the sandboxed Bash tool", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/sandboxing>.
[^ar36]: agentik-dev/agentik-relay, "design/packets/ar36-pid-file-guard.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/packets/ar36-pid-file-guard.md>.
[^ar36sit]: agentik-dev/agentik-relay, "history/sittings/2026-09-30-3-ar36.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/history/sittings/2026-09-30-3-ar36.md>.
[^ar40]: agentik-dev/agentik-relay, "design/packets/ar40-helper-relay-guard.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/packets/ar40-helper-relay-guard.md>.
[^ar40sit]: agentik-dev/agentik-relay, "history/sittings/2026-09-30-7-ar40.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/history/sittings/2026-09-30-7-ar40.md>.
[^design]: agentik-dev/agentik-relay, "design/relay-r1.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/relay-r1.md>.
[^adv13]: agentik-dev/agentik-relay, "design/review-adv13.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/review-adv13.md>.
[^adv14]: agentik-dev/agentik-relay, "design/review-adv14.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/review-adv14.md>.
[^rename]: agentik-dev/agentik-relay, "Makefile" (the build and install targets; the rename is commit 72c0fe0, 2026-10-13), commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/Makefile>.
[^prompts]: agentik-dev/agentik-relay, "plugin/agents/builder.md" (and "plugin/agents/adversary.md"), commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/plugin/agents/builder.md>.
[^nth]: agentik-dev/agentik-relay, "NICE_TO_HAVE.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/NICE_TO_HAVE.md>.
