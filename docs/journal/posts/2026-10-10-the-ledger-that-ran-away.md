---
date:
  created: 2026-10-10
categories:
  - Worked
  - Open
description: A decision ledger grew past 400 entries because nothing in it said which entries mattered. A cap, a sign-off bar and four severity levels were the fix. The old 401 entries still bind.
---

# The ledger that ran away

A decision ledger exists so that a project stops deciding the same thing twice. One of ours grew past 400 entries, and nothing in it said which of them mattered. We fixed it in three moves over three weeks: a cap of 25 entries in force, a sign-off bar that ends a review, and four severity levels. The cap holds. The old entries are still there.

<!-- more -->

## The problem

On 2026-09-25 one commit wrote 322 review rulings into the ledger of the owner's home-infrastructure repository, sorted by domain. By 2026-10-14 the old part of that ledger held 401 entries in about 15,700 words. 385 of them carried a review-round tag, and 346 came from a single review series.[^record]

None of the entries carried a level. Every entry had the same form, so a reader, human or model, could not tell which of them mattered without reading all of them.[^record]

The ledger sat at the end of a chain. Builders asked the owner too many questions, and reviews made findings that became rulings.

## A human example: triage at the door

An emergency department must decide, for every patient who walks in, who can wait. The Emergency Severity Index answers with five levels, assigned at the door. In the words of its handbook, the purpose of triage "is to prioritize incoming patients and to identify those who cannot wait to be seen."[^esi]

Each level has a short test. Level 1 needs a life-saving intervention now. For level 2, the nurse asks: "Would I give my last open bed to this patient?" Levels 3 to 5 turn on how many resources the patient will need, and the nurse never counts past two.[^esi] The scale caps its own effort.

In one hospital's comparison, raters agreed more on the five-level index than on a three-level scale: weighted kappa 0.68 against 0.53.[^esi] A level is a decision about who waits, made once, early, by a rule anyone can apply.

## What the research teaches

Two chapters bear on it. The [memory chapter](../../field/memory.md) shows that a model follows fewer instructions as their number grows: in one benchmark, Claude Sonnet 4 followed 94.4 percent of 100 simultaneous keyword instructions and 42.9 percent of 500.[^ifscale] A long, flat list of rules is a list the model will partly ignore.

The [review chapter](../../field/review.md) shows that review rounds return less each time. With one fine-tuned small model as both writer and reviewer, SWE-bench Verified scores after successive rounds read 34.8, 40.6, 43.0, 43.4 and 44.0 percent: gains of 5.8, 2.4, 0.4 and 0.6 points.[^wang] GPT-4 correcting its own math answers with no outside signal got worse, from 95.5 to 89.0 percent over two rounds.[^huang] Michael Nygard's architecture decision records point the same way: each record holds one decision in one or two pages, numbers are never reused, and a reversed decision keeps its record, marked superseded.[^nygard]

## What we changed

Four rulings, in the order they landed.

**Decide inside the design (2026-09-22).** One unattended run's builders had each left three to six "decide, owner" items in their handovers. Across twenty sittings they became one brief of 50 questions: field names, exit-code mappings, environment variables, JSON key case. The owner ruled all 50 "as recommended" and wrote: "these decisions are way too granular for where we are at. I'd rather you build something that we can iterate on within a well done design."[^record] Since then a builder decides inside the design of record, logs the choice, and escalates only a fork the design cannot settle.

**A cap (2026-09-29).** The ledger took one entry shape, and agentik-decisions enforces it: "At most 25 entries are in force, and at most 7 sit under `Every session`."[^readme] An older ledger keeps its text below a marker line, `<!-- decisions: legacy below -->`, where the parser stops and no cap counts it.[^readme]

**A sign-off bar (to 2026-10-05).** In a Go infrastructure product driven by nightly unattended runs, about 40 percent of 72 queued rows added no capability: fixes, repairs and retries. Five of the six rows queued for the next night were fixes. For about four weeks, reviews created findings and findings created rows.[^record] The ruling: each component gets a sign-off bar. Once it is met, a finding becomes work only as a reproduced correctness or safety bug. A review blocks only on an unmet acceptance criterion, a bug or a failing test, or a conflict with the ledger. There are at most two review rounds, and every finding is placed against the build order, never first by default.[^record]

**Four levels (2026-10-10).** The owner asked for priority levels, and agentik-session shipped them: S1 harm, S2 blocks the goal, S3 the build order, S4 the rest. The next act takes the highest level ready, and a sitting takes at most one S4 item.[^record][^s21]

We chose a hard cap over a better index. agentik-decisions had already seen where an index leads: its first user's ruling log reached 242,404 bytes and 214 rulings, with a hand-kept index of 41,576 bytes that lagged four rulings behind.[^r1]

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> One owner, three weeks. The cap is enforced by a check. The sign-off bar and the levels are rules in the prompt, and nothing yet counts their effect.

</div>

The cap holds by construction. A 26th entry in force, or an 8th under `Every session`, fails `agentik decisions render --lint`.[^readme][^src] What the cap cannot do is choose: the owner still decides which 25 entries stay in force.

The record holds no count of fix rows after the sign-off bar, and no count of S4 items taken after the levels. We cannot show yet that either helped.

## What has not worked, and what is open

The 401 legacy entries still bind, and still cost a reader's time. They move into the new shape only when each repository's ledger is folded, entry by entry.[^record]

The levels are rules in the prompt. No hook enforces them: the packet that shipped them says so in its fourth ruling.[^s21] A sitting that ignores them meets no check.

And a cap bit its owner once. Two sittings each opened four questions on the same day, both within the cap of five open questions. When their branches merged, the questions file held eight. The owner's answers to four of them then failed, with "7 questions open; the cap is 5", although an answer only ever closes a question.[^intake] A cap that blocks the act that would bring you under it is a cap with a bug.

<p class="ak-written">Written 2026-10-14 from the owner's record and agentik-decisions at commit fabb212.</p>

<ul class="ak-related" markdown>
<li markdown>[Review that ends](../../field/review.md)</li>
<li markdown>[Memory and the always-loaded context](../../field/memory.md)</li>
<li markdown>[agentik-decisions](../../tools/decisions.md)</li>
<li markdown>[agentik-session](../../tools/session.md)</li>
</ul>

## Sources

[^record]: agentik-dev/agentik-research, "history/sessions/PROMPT-2026-10-14-cloud-site.md", section "The owner's record", commit 25e72df, <https://github.com/agentik-dev/agentik-research/blob/25e72df/history/sessions/PROMPT-2026-10-14-cloud-site.md>.
[^esi]: Nicki Gilboy, Paula Tanabe, Debbie Travers and Alexander M. Rosenau, "Emergency Severity Index (ESI): A Triage Tool for Emergency Department Care, Version 4, Implementation Handbook, 2012 Edition", Agency for Healthcare Research and Quality, November 2011, <https://www.govinfo.gov/content/pkg/GOVPUB-HE20_6500-PURL-gpo23161/pdf/GOVPUB-HE20_6500-PURL-gpo23161.pdf>.
[^ifscale]: Daniel Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^wang]: Ruoyu Wang et al., "SWE-Review: Closing the Loop on Issue Resolution with Agentic Code Review", July 2026, <https://arxiv.org/abs/2607.06065>.
[^huang]: Jie Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet", October 2023, <https://arxiv.org/abs/2310.01798>.
[^nygard]: Michael Nygard, "Documenting Architecture Decisions", 15 November 2011, <https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions>.
[^readme]: agentik-dev/agentik-decisions, "README.md", commit fabb212, <https://github.com/agentik-dev/agentik-decisions/blob/fabb212/README.md>.
[^s21]: agentik-dev/agentik-session, "design/packets/s21-priority-default.md", commit 89c69a8, <https://github.com/agentik-dev/agentik-session/blob/89c69a8/design/packets/s21-priority-default.md>.
[^src]: agentik-dev/agentik-decisions, "src/decisions/ledger.py", commit fabb212, <https://github.com/agentik-dev/agentik-decisions/blob/fabb212/src/decisions/ledger.py>.
[^r1]: agentik-dev/agentik-decisions, "history/design/decisions-r1.md", commit fabb212, <https://github.com/agentik-dev/agentik-decisions/blob/fabb212/history/design/decisions-r1.md>.
[^intake]: agentik-dev/agentik-decisions, "history/sessions/", the intake of 2026-10-11 on an answer over the cap, commit fabb212, <https://github.com/agentik-dev/agentik-decisions/tree/fabb212/history/sessions>.
