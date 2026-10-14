# Fix prompt: agentik-commons and the organization profile

Paste into a Claude Code session in the agentik-commons repository, and the last two items into one in the organization profile repository. The research site read commons at commit e456f4b and the profile at 6476f3a on 2026-10-14. Each item gives the location, what the repository says, what the site found, and the fix. Verify each location first. Commit per item.

## Items to correct

1. **The `bounded` rule's wording.** `scripts/bounded` lines 12 to 13 refuse a start above a load of 4 per core while the CPU's idle share is 25 percent or less, and wait up to 600 seconds. Several prose restatements in the suite say "unless the CPU is idle" or "confirmed by an idle CPU", which inverts the sense. Fix: one sentence in `GUIDE.md` section 5 and the docstring that states the rule as the code has it, and reuse it in the tool READMEs.

2. **The wall.** `scripts/bounded` and `GUIDE.md` give an 840-second wall; the relay's README and Makefile say 840 and its design record says 900. Fix: state in the guide that a repository may raise the wall and that the relay does, and have the relay reconcile its own two numbers.

3. **The hygiene `renamed` pattern.** `scripts/hygiene` line 85 matches `claude-code-(session|decisions|respeak|agents)` with a lookbehind but no trailing boundary, so a public URL slug such as `claude-code-session-management` matches in a live file. The research site hit it in a footnote URL. Fix: add a trailing boundary that still catches the old plugin ids, or allow a URL context.

4. **The commons packet size.** `design/packets/agentik-r1-commons.md` is 9,913 bytes against the guide's 9,216-byte limit (`GUIDE.md` section 9). Fix: trim it or record the exception.

5. **The record's future tense.** `design/agentik-r1.md` section 8.2 lists the switch, proofs P1 to P3 and the cold window as not yet done at e456f4b, and the organization profile still shows the pre-switch install lines. Fix: when the switch lands, update section 8.2 and the profile in the same change, and record the date.

6. **Test counts.** The site re-ran the commons suite on a scratch copy on 2026-10-14: 49 tests passed, and the scan of commons itself reported 0 hits outside the allowlist with the warning that no private list was present. No fix needed; recorded so the number is dated.

## Organization profile

7. **Install lines.** `profile/README.md` shows the earlier marketplace and command names. Fix: the `agentik` marketplace and `agentik <tool> <verb>` forms, after the switch.

8. **The one-line purpose.** The profile says "Guardrails for long, unattended Claude Code work" and lists five tools. The research site quotes it. Fix: none; keep it as the public sentence, and keep the site's wording in step if it changes.

## For the record

The site found no measurement that any agentik tool beats the alternative it replaced, and says so on every tool page. The sources that bear on the suite's premises are summarised on the site's field pages: context length lowers accuracy on its own (measured across models), compaction loses specifics and no study compares it with a restart, many agents help decomposable work and hurt sequential work, review needs an outside signal and a round cap, and an unattended run's success is unproven until the denials are read.
