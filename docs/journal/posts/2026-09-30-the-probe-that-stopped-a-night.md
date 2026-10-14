---
date:
  created: 2026-09-30
categories:
  - Did not work
  - Open
description: A review agent's hand-built relay replaced a running night's lock file, and the night stopped with nine rows still ready. Every guard we had was a slice with a hole in it.
---

# The probe that stopped a night

A review agent built its own copy of agentik-relay to test a theory, ran it four times, and stopped a real night that was running beside it. Nine rows of work sat ready until morning. No single guard failed. Four of them had holes, and on 2026-09-30 the holes lined up.

<!-- more -->

## The problem

An unattended night runs while nobody watches. One relay process holds a lock, so two nights never run in the same account at once. Other agents run beside it: builders inside the night's rows, and reviewers and helpers outside them. Anything they do to shared state lands on the night, and nobody is awake to notice.

## A human example: slices of Swiss cheese

James Reason, writing on medical error, pictured an organisation's defences as layers: machines, people and procedures between a hazard and harm. "In reality, however, they are more like slices of Swiss cheese, having many holes".[^reason] The holes open, close and move. Harm gets through only when holes in many layers line up at once.

Reason named two kinds of hole. Active failures are the unsafe acts of people at the sharp end, and they pass quickly. Latent conditions are built in by designers and managers, can lie dormant for years, and can be found and fixed before anything goes wrong.[^reason] His remedy follows from the split: you cannot stop every slip, so you build better layers and drain the latent conditions.

## What the research teaches

The [guardrails half of the unattended-runs chapter](../../field/unattended-and-guardrails.md) reads each Claude Code guard as one slice, with its holes documented. A deny rule matches the command's text: as of October 2026, `Bash(git push *)` misses `git -C . push`, and the documentation says a rule is not a security boundary.[^permissions] The sandbox covers Bash commands and their children, but it is off by default, and file tools and hooks run outside it.[^sandbox] A PreToolUse hook that exits 2 does deny the call, even in the most permissive mode, but only the calls it was written to recognise.[^hooks]

No study measures how often agents beside an unattended run damage it. The chapter's incident list holds single accounts, none reproduced.

## What happened

Between 06:56 and 06:58 UTC on 2026-09-30, a review agent built the relay binary by hand. It gave the binary a lock port of its own and pointed its home and state variables at scratch directories. Then it ran `agentik relay plan` four times against a scratch repository.[^ar36]

Here the holes lined up:

1. **The pid directory came from the system's user database, not from the home variable.** The scratch home did not apply, so the hand-built binary used the account's real pid directory. A latent condition.
2. **The pid file write replaced a live holder's file.** Each run took its own free port, wrote its line over the running night's `relay.pid`, and removed the file on exit. Another latent condition.
3. **The night read a missing pid file as a moved lock.** At its next poll it stopped with the reason `lock-moved`. No new sitting started, and nine rows stayed ready overnight. The night's real lock, its port, was never lost: the file only names the holder.[^ar36]
4. **The rule against hand-built binaries lived only in prompts.** The guard against a nested run applied inside a night's row, and the reviewer ran outside any row.[^ar40]

The route was not new. A review six days earlier had named it, and the design record listed the lock as advisory "against a child that builds its own relay with its own port link".[^design]

## What we changed

Packet AR36 closed three holes the same day. The pid file now refuses to replace a file that names a live holder. A binary linked with a lock port and no pid home refuses to touch the account's real pid directory. And the builder and adversary prompts gained one line each: never build the relay by hand.[^ar36]

The next day a read-only helper, whose prompt forbade it, ran `agentik relay run --orchestrate`. A gate happened to hold the lock, so the run was refused. The packet that followed, AR40, put the finding in one line: "the rule lived only in their prompts."[^ar40] It added a hook guard, `helper-relay`, that denies the relay's write verbs and a build of the relay to any subagent, in a row or not.

We kept the prompt lines as a slice, and stopped counting on them as the only one.

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> Two incidents, each seen once. The fixes are proven by tests that were red before and green after, not by a replay with a real binary.

</div>

AR36 shipped three tests, and AR40 three more.[^ar36][^ar40] The repo holds no count of helper runs that the new guard denied or let through.

The review of the guard found its holes at once. Spelling bypasses it: `$(which relay) stop`, a variable holding the name, or `pkill -f 'relay run'`. A build through `make build` passes. And a harmless `find cmd/relay ... -exec grep -l stop` is denied, because a word naming the relay's source comes before a verb.[^nth]

## What has not worked, and what is open

The check that stopped the night is still the check we have, and it reads the wrong thing. The port held; the file moved. One open question in the repo asks whether a missing advisory file should stop a night whose port is still held, or whether the holder should write the file again. It is not decided.[^nth] The same check reads only the file's device and inode, so an in-place rewrite would slip past it.[^nth]

The sandbox that would close the whole route is "Not built (the owner's open decision)".[^design] Until it is, the night's safety rests on layers we know have holes, and we have listed each one.

<p class="ak-written">Written 2026-10-14 from agentik-relay at commit 405d1e0.</p>

<ul class="ak-related" markdown>
<li markdown>[Unattended runs and guardrails](../../field/unattended-and-guardrails.md)</li>
<li markdown>[agentik-relay](../../tools/relay.md)</li>
</ul>

## Sources

[^reason]: James Reason, "Human error: models and management", BMJ 320(7237):768-770, 18 March 2000, <https://pmc.ncbi.nlm.nih.gov/articles/PMC1117770/>.
[^permissions]: Anthropic, "Configure permissions", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/permissions>.
[^sandbox]: Anthropic, "Configure the sandboxed Bash tool", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/sandboxing>.
[^hooks]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks>.
[^ar36]: agentik-dev/agentik-relay, "design/packets/ar36-pid-file-guard.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/packets/ar36-pid-file-guard.md>.
[^ar40]: agentik-dev/agentik-relay, "design/packets/ar40-helper-relay-guard.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/packets/ar40-helper-relay-guard.md>.
[^design]: agentik-dev/agentik-relay, "design/relay-r1.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/design/relay-r1.md>.
[^nth]: agentik-dev/agentik-relay, "NICE_TO_HAVE.md", commit 405d1e0, <https://github.com/agentik-dev/agentik-relay/blob/405d1e0/NICE_TO_HAVE.md>.
