---
date:
  created: 2026-10-05
categories:
  - Worked
  - Open
description: Instead of compacting a full context, a sitting writes a charter under 4 KB and a fresh session starts from it. It carried one night across three restarts. Nobody has compared it with compaction.
---

# Restart, don't compact

When a Claude Code sitting fills its context, the built-in answer is compaction: the conversation is replaced by a summary the model writes. We stopped doing that. A sitting now writes a charter of under 4 KB, exits, and a fresh session starts from the charter. On one night that carried the work across three restarts. We have no comparison that shows it beats compaction.

<!-- more -->

## The problem

A sitting that runs for hours fills its window. Compaction keeps it going, but the model decides what to keep, and in an unattended run nobody reads the summary before the next turn builds on it. What a compaction drops, the work forgets.

## A human example: a plan for an unfinished task

E. J. Masicampo and Roy Baumeister asked students to write about two important tasks due in the next few days. One group then wrote out how, when and where they would do them. While the students read a passage of a novel, the tasks kept intruding on those without a plan: their distraction averaged 3.00 on a 7-point scale, against 1.77 for those who had written the plan and 1.82 for a control group whose tasks were already done.[^masicampo] In a later study, students with a plan solved 9.55 anagrams on average, against 6.55 for those who had only the goal.[^masicampo]

The tasks were still undone. Writing down the next step was enough to set them aside. A charter does the same for a sitting: it names the next act, so the next session can start clean.

## What the research teaches

The [length and compaction chapter](../../field/length-and-compaction.md) holds the evidence, and it cuts both ways. In Factory's test of compressors, the artifact trail, which files were touched and how, scored lowest for every compressor, 2.19 to 2.45 out of 5.[^factory] In one run of Anthropic's own cookbook, a compaction kept all three high-level facts and none of three obscure values.[^cookbook] Anthropic's harness for long-running agents carried its state between context windows in a progress file the agent writes and in git history.[^harnesses]

So a summary keeps the gist and loses specifics, and a written file is how Anthropic's own harness carried state. No source we found compares a restart from a written handoff with compaction in a coding session, under control.

## What we built

On 2026-09-29 the owner ruled that a sitting restarts rather than compacts: a restart reads its brief fresh, and a compaction needs the owner's hand.[^s17] agentik-session's exit rule now reads: `EXIT: land the act in flight at a checkpoint, then exit; respawn, never compact`.[^hooks]

The charter is one file per sitting with the goal, the budget, what is done, the handover and one Next act. It must stay under 4,096 bytes, and the rule is to "move text out, never widen the ceiling".[^skill] A PreCompact hook blocks automatic compaction and lets a typed `/compact` through, so the owner keeps the choice.[^mod]

The night that made the launcher came on 2026-10-05. One orchestrator reached its checkpoint three times, and the owner restarted it by hand each time, after gaps of 113, 181 and 83 minutes: 6 hours 17 minutes of a night spent waiting for a person. Each restart "went cleanly, because the successor read its charter and carried on".[^respawn]

So agentik-session gained a launcher, `agentik session run`. It starts `claude` with a fresh session id every time. When a sitting closes on RESPAWN and marks its checkpoint, the launcher waits for the turn to settle, ends the sitting and starts the next. It never compacts, resumes, forks or restarts after a crash, and it stops at 12 restarts in any 24 hours.[^respawn][^runbook]

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> One night's record, kept by hand, before the launcher existed. No comparison with compaction, and no count of the launcher's restarts.

</div>

The 2026-10-05 night is the evidence: three restarts, each one clean, from charters alone.[^respawn] The tool's own repository holds 61 charters, from 1,606 to 3,993 bytes, all under the ceiling.[^sittings] None of them opens its Next act with RESPAWN, so the repository holds no chain of restarts of its own. The tool has no log of how often the launcher has restarted a sitting.

## What has not worked, and what is open

The handoff fails in the gaps between steps.

- A sitting wrote RESPAWN into its charter and stopped without running the checkpoint command. The chain stalled, with `claude` idle at 309,000 of a 400,000-token ceiling, until the owner looked.[^nth]
- A sitting marked RESPAWN 9 minutes 16 seconds in. The launcher's 600-second floor held it, silently, and it sat idle 47 minutes.[^nth]
- Claude Code's idle compaction compacted two sittings overnight, against the rule. A PreCompact hook cannot tell it from an automatic compaction: both arrive as `auto`.[^nth]
- Blocking automatic compaction has a cost. A sitting that reaches its hard limit cannot recover by compacting, and the request fails.[^mod]

And the main question is open. We believe a fresh start from a short charter loses less than a summary <span class="ev ev-conjecture">conjecture</span>. The field has not tested it, and neither have we. A test would run the same long task both ways and count the exact values each one carries forward.

<p class="ak-written">Written 2026-10-14 from agentik-session at commit 89c69a8.</p>

<ul class="ak-related" markdown>
<li markdown>[Length and compaction](../../field/length-and-compaction.md)</li>
<li markdown>[agentik-session](../../tools/session.md)</li>
</ul>

## Sources

[^masicampo]: E. J. Masicampo and Roy F. Baumeister, "Consider It Done! Plan Making Can Eliminate the Cognitive Effects of Unfulfilled Goals", Journal of Personality and Social Psychology 101(4):667-683, 2011, <https://users.wfu.edu/masicaej/MasicampoBaumeister2011JPSP.pdf>.
[^factory]: Factory Research, "Evaluating Context Compression for AI Agents", 16 December 2025, <https://factory.com/news/evaluating-compression>.
[^cookbook]: Isabella He, Anthropic, "Context engineering: memory, compaction, and tool clearing", 20 March 2026, <https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools>.
[^harnesses]: Justin Young, Anthropic, "Effective harnesses for long-running agents", 26 November 2025, <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>.
[^s17]: agentik-dev/agentik-session, "design/packets/s17-exit-rule-respawns.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/design/packets/s17-exit-rule-respawns.md>.
[^hooks]: agentik-dev/agentik-session, "claude_session/hooks.py", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/claude_session/hooks.py>.
[^skill]: agentik-dev/agentik-session, "plugin/skills/session/SKILL.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/plugin/skills/session/SKILL.md>.
[^mod]: agentik-dev/agentik-session, "design/mod-r1.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/design/mod-r1.md>.
[^respawn]: agentik-dev/agentik-session, "design/respawn-r1.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/design/respawn-r1.md>.
[^runbook]: agentik-dev/agentik-session, "RUNBOOK.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/RUNBOOK.md>.
[^sittings]: agentik-dev/agentik-session, "history/sittings/", 61 charters, commit 89c69a8, <https://github.com/agentik-dev/agentik-session/tree/89c69a8/history/sittings>.
[^nth]: agentik-dev/agentik-session, "NICE_TO_HAVE.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/NICE_TO_HAVE.md>.
