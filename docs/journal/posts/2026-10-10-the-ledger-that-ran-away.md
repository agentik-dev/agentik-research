---
date:
  created: 2026-10-10
categories:
  - Worked
  - Open
description: A decision ledger grew past 400 entries, and nothing in it said which of them mattered. A cap, a sign-off bar and four priority levels followed. The old 401 entries still bind.
---

# The ledger that ran away

A decision ledger exists so that a project stops deciding the same thing twice. One of ours grew past 400 entries, and nothing in it said which of them mattered. The owner answered with four rulings between 2026-09-22 and 2026-10-10: decide inside the design, a cap of 25 entries in force, a sign-off bar that ends a review, and four priority levels. The cap holds. The old entries are still there.

<!-- more -->

## The problem

On 2026-09-25 one commit wrote 322 review rulings into the ledger of the owner's home-infrastructure repository, sorted by domain. By 2026-10-14 the old part of that ledger held 401 entries in about 15,700 words. Of them, 385 carried a review-round tag, and 346 came from a single review series.[^record]

None of the entries carried a level, so a reader could not tell which of them mattered.[^record]

The owner's record holds two more problems. On 2026-09-22, the questions one unattended run's builders left for the owner had become one brief of 50. For about four weeks to 2026-10-05, in a Go infrastructure product, reviews kept making findings that became work.[^record]

## A human example: triage at the door

An emergency department must decide, for every patient who walks in, who can wait. The Emergency Severity Index (ESI) answers with five levels, assigned at the door. Its handbook says the purpose of triage "is to prioritize incoming patients and to identify those who cannot wait to be seen."[^esi]

Each level has a short test. Level 1 needs a life-saving intervention now. For level 2, the nurse asks: "Would I give my last open bed to this patient?" Levels 3 to 5 turn on how many resources the patient will need, and the nurse never counts past two.[^esi] The scale caps its own effort.

In one hospital's comparison, raters agreed more on the five-level index than on a three-level scale: weighted kappa 0.68 against 0.53.[^esi]

ESI sets no times to reassess a patient: the handbook leaves them to each department's triage policy. In a crowded department, the handbook says, nurses are forced to keep reprioritizing the patients who wait for scarce beds.[^esi] A level answers who waits, by a written rule that trained nurses apply. Each department chooses when to ask again.

## What the research teaches

Two chapters bear on the ledger. The [memory chapter](../../field/memory.md) shows that a model follows fewer instructions as their number grows: in one benchmark, Claude Sonnet 4 followed 94.4 percent of 100 simultaneous keyword instructions and 42.9 percent of 500.[^ifscale] A model partly ignores a long, flat list of rules.

The [review chapter](../../field/review.md) shows what more review rounds bought in two studies. In the first, a fine-tuned 8-billion-parameter model wrote, reviewed and revised its own patches. Its SWE-bench Verified resolve rate read 34.8 percent at the first sample, before any review, then 40.6, 43.0, 43.4 and 44.0 percent after one to four revision rounds. In the paper's words, the rate "increases steadily from 34.8% (sample 1, no review) to 44.0% (sample 5)." By this site's subtraction, not the paper's, the steps were 5.8, 2.4, 0.4 and 0.6 points.[^wang] In the second, GPT-4 corrected its own math answers with no outside signal and got worse, from 95.5 to 89.0 percent over two rounds.[^huang]

Michael Nygard's architecture decision records (ADRs) give a ledger its form, not its size. Each record holds one decision in one or two pages, numbers are never reused, and a reversed decision keeps its record, marked superseded. Nygard's post sets no cap on how many records stay active, and the review chapter finds no ADR source that does.[^nygard]

## What we changed

Four rulings, in the order they landed.

**Decide inside the design (2026-09-22).** One unattended run's builders had each left three to six "decide, owner" items in their handovers. Across twenty sittings they became one brief of 50 questions: field names, exit-code mappings, environment variables, JSON key case. The owner ruled all 50 "as recommended" and wrote: "these decisions are way too granular for where we are at. I'd rather you build something that we can iterate on within a well done design."[^record] Since then a builder decides inside the design of record, logs the choice, and escalates only a fork the design cannot settle.

**A cap (ruled 2026-09-25, applied 2026-09-29).** The owner set both caps in a ledger entry dated 2026-09-25, and agentik-decisions' design packet d17 builds them.[^d17] On 2026-09-29 the home-infrastructure ledger took one entry shape, and the tool enforces it: "At most 25 entries are in force, and at most 7 sit under `Every session`."[^record][^readme] An older ledger keeps its text below a marker line, `<!-- decisions: legacy below -->`, where the parser stops and no cap counts it.[^readme]

**A sign-off bar (to 2026-10-05).** In a Go infrastructure product driven by nightly unattended runs, about 40 percent of 72 queued rows added no capability: fixes, repairs and retries. Five of the six rows queued for the next night were fixes. For about four weeks, reviews created findings and findings created rows.[^record] The ruling: each component gets a sign-off bar. Once it is met, a finding becomes work only as a reproduced correctness or safety bug. A review blocks only on an unmet acceptance criterion, a bug or a failing test, or a conflict with the ledger. Review gets at most two rounds, and every finding is placed against the build order, never first by default.[^record]

**Four priority levels (2026-10-10).** The owner asked for priority levels, and agentik-session shipped them: S1 harm, S2 blocks the goal, S3 the build order, S4 the rest. The next act takes the ready item at the highest level, and a sitting takes at most one S4 item.[^record][^s21]

agentik-decisions had met the cost of a long ledger before. Its first user's ruling log reached 242,404 bytes and 214 rulings, with a hand-kept index of 41,576 bytes that lagged four rulings behind.[^r1] The numbers 25 and 7 are rulings, not measurements. On 2026-10-14, commit `ba78699` wrote that into d17 and into a comment in `ledger.py`. d17 says no outside source gives either number. As the nearest evidence it names the instruction-count study above, in this site's reading, and Anthropic's memory page, which advises keeping a CLAUDE.md under 200 lines.[^d17][^src][^rf1] The commit answers this site's first review, so it is not independent support.

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> One owner, three weeks. A check enforces the cap. The sign-off bar and the levels are rules in the prompt, and nothing yet counts their effect.

</div>

The cap holds by construction. A 26th entry in force, or an 8th under `Every session`, fails `agentik decisions render --lint`.[^readme][^src] The cap cannot choose: the owner still decides which 25 entries stay in force.

The record holds no count of fix rows after the sign-off bar, and no count of S4 items taken after the levels. We cannot show yet that either helped.

## What has not worked, and what is open

The 401 old entries still bind, and still cost a reader's time. They move into the new shape only when each repository's ledger is folded.[^record]

The levels are rules in the prompt. No hook enforces them: the packet that shipped them says so in its fourth ruling.[^s21] One check touches them. With priority on, `agentik session charter check` and `agentik session charter close` warn on stderr, without changing their exit status, when the charter's Handover has no `- open by level:` line (the packet's fifth ruling).[^s21][^charter] The warning looks for that line. It does not look at which item a sitting took.

And once, a cap blocked the owner's own answers. Two sittings each opened four questions on the same day, both within the cap of five open questions. When their branches merged, the questions file held eight. The sitting holding the owner's answers to four of them ran `agentik decisions answer`, and the tool refused with "7 questions open; the cap is 5", the count the answer would have left. An answer always removes a question, so the cap blocked the one act that would bring the count down. The sitting set the other sitting's four questions aside by hand, ran its four answers, and restored the four byte for byte.[^intake] On 2026-10-14, commit `8f9847b` fixed it: with the open count over the cap, the tool now accepts an answer, which lowers the count, and `agentik decisions render --lint` still reports the count.[^src][^rf1] <span class="ev ev-our-use">our use</span> The evidence is the commit's test on a synthetic file, not a sitting's use. In our run on 2026-10-14 the test passes at the head and fails against the code at fabb212, with "6 questions open; the cap is 5".[^rf1]

<p class="ak-written">Written 2026-10-14 from the owner's record, agentik-decisions at commit 569a120 and agentik-session at commit e8477a7.</p>

<ul class="ak-related" markdown>
<li markdown>[Review that ends](../../field/review.md)</li>
<li markdown>[Memory and the always-loaded context](../../field/memory.md)</li>
<li markdown>[agentik-decisions](../../tools/decisions.md)</li>
<li markdown>[agentik-session](../../tools/session.md)</li>
</ul>

## Sources

[^record]: agentik-dev/agentik-site, "history/sessions/PROMPT-2026-10-14-cloud-site.md", section "The owner's record", commit 576aaa1, <https://github.com/agentik-dev/agentik-site/blob/576aaa1/history/sessions/PROMPT-2026-10-14-cloud-site.md>.
[^esi]: Nicki Gilboy, Paula Tanabe, Debbie Travers and Alexander M. Rosenau, "Emergency Severity Index (ESI): A Triage Tool for Emergency Department Care, Version 4, Implementation Handbook, 2012 Edition", Agency for Healthcare Research and Quality, November 2011, <https://www.govinfo.gov/content/pkg/GOVPUB-HE20_6500-PURL-gpo23161/pdf/GOVPUB-HE20_6500-PURL-gpo23161.pdf>.
[^ifscale]: Daniel Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^wang]: Ruoyu Wang et al., "SWE-Review: Closing the Loop on Issue Resolution with Agentic Code Review", July 2026, <https://arxiv.org/abs/2607.06065>.
[^huang]: Jie Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet", October 2023, <https://arxiv.org/abs/2310.01798>.
[^nygard]: Michael Nygard, "Documenting Architecture Decisions", 15 November 2011, <https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions>.
[^readme]: agentik-dev/agentik-decisions, "README.md", commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/README.md>.
[^d17]: agentik-dev/agentik-decisions, "design/d17-four-verbs.md", the caps, commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/design/d17-four-verbs.md>.
[^s21]: agentik-dev/agentik-session, "design/packets/s21-priority-default.md", rulings 4 and 5, commit e8477a7, <https://github.com/agentik-dev/agentik-session/blob/e8477a7/design/packets/s21-priority-default.md>.
[^charter]: agentik-dev/agentik-session, "claude_session/charter.py", the function `warnings`, commit e8477a7, <https://github.com/agentik-dev/agentik-session/blob/e8477a7/claude_session/charter.py>.
[^src]: agentik-dev/agentik-decisions, "src/decisions/ledger.py" and "src/decisions/answer.py", commit 569a120, <https://github.com/agentik-dev/agentik-decisions/tree/569a120/src/decisions>.
[^r1]: agentik-dev/agentik-decisions, "history/design/decisions-r1.md", commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/history/design/decisions-r1.md>.
[^intake]: agentik-dev/agentik-decisions, "history/sessions/", the intake of 2026-10-11 on an answer over the cap, commit 569a120, <https://github.com/agentik-dev/agentik-decisions/tree/569a120/history/sessions>.
[^rf1]: agentik-dev/agentik-decisions, the merge "rf1-research-fixes" and its commits 8f9847b and ba78699, commit 569a120, <https://github.com/agentik-dev/agentik-decisions/compare/fabb212...569a120>.
