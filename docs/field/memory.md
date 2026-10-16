# Memory and the always-loaded context

Keep what loads on every turn short, and put what must hold on every turn in a hook, not in prose. The measured evidence is thin but consistent. A context file raised cost 20 percent without raising success.[^gloaguen] A file lifted adherence to one rule from zero to about two thirds, and its length did not matter.[^mcmillan] Adherence to keyword instructions falls as their number grows.[^ifscale]

The practical answers are in the vendor's documentation, which says how and when each memory layer loads. This chapter answers research question 3: CLAUDE.md, memory files, skills, handoff documents, and what belongs in context against what should be a pointer.

## What is measured

- Gloaguen et al. tested repository context files for coding agents. Agent-generated files raised cost 20 to 23 percent, and developer-written files up to 19 percent. None of the resolution changes, -0.5, -2 and +2.4 points, was significant.[^gloaguen]
- McMillan ran 1,650 Claude Code sessions in a factorial design. The study found no detectable effect on adherence to one trivial rule from file size (25 to 500 lines), position, extra files or a conflicting rule, after correcting for multiple tests. By size, adherence was 60.0, 65.2, 67.7 and 64.0 percent. With no file, 0 of 524 functions complied.[^mcmillan]
- Jaroslawicz et al. measured adherence against the number of instructions. Claude Sonnet 4 scored 94.4 percent at 100 simultaneous keyword instructions and 42.9 percent at 500.[^ifscale]

Vercel's own evaluation is reported rather than measured, because it states neither its model nor its case count. An AGENTS.md docs index passed 100 percent of cases. A skill passed 53 percent by default, and 79 percent when AGENTS.md told the agent to use it. The agent never invoked the skill in 56 percent of cases.[^vercel]

## What the vendor documents, as of October 2026

- CLAUDE.md files in the working directory and every parent directory load at launch, root first. A CLAUDE.md in a subdirectory loads when Claude touches a file there, and `claudeMdExcludes` skips a file.[^memory][^largecodebases]
- CLAUDE.md is sent as a user message after the system prompt, with no guarantee of adherence. `@` imports load at launch, nest to four hops, and save no context. The documentation advises under 200 lines. After compaction the root file returns, and nested files load again on demand.[^memory]
- Auto memory loads the first 200 lines or 25KB of `MEMORY.md` each session. Topic files load on demand.[^memory]
- Claude Code lists every skill's name at session start and cuts each description at 1,536 characters. The listing budget is 1 percent of the window. A skill's body enters on use and stays in context. The documentation advises under 500 lines.[^skills]
- A prompt-cache write costs 1.25 times the base input price for the five-minute lifetime and 2 times for the one-hour lifetime. A cache read costs 0.1 times, 0.05 times on Sonnet 5.5 and Opus 5.5, and 0.025 times on Fable 5.1.[^caching]
- A PreToolUse hook that times out does not block. To make it block, set `onFailure` to `"block"` (version 2.1.295).[^hooks]
- AskUserQuestion takes 1 to 4 questions per call with 2 to 4 options each and a header of up to 12 characters.[^userinput]

## What practitioners report

- HumanLayer advises under 300 lines. By the author's own count, Claude Code's system prompt holds about 50 instructions.[^humanlayer]
- One engineer runs a 13KB root file and sees a fresh session start near 20k tokens.[^shankar]

## What belongs in context every turn, and what should be a pointer

| Item | Placement | Reason | Evidence |
|---|---|---|---|
| A rule that must hold on every turn | A hook, plus one short CLAUDE.md line | CLAUDE.md is advisory; a file lifted one rule from 0 to 67.7 percent, and a hook can block | <span class="ev ev-documented">documented</span>;[^bestpractices][^hooks] <span class="ev ev-measured">measured</span>[^mcmillan] |
| A decision ledger | A short index, always loaded; entries read by pointer | The vendor caps its own index; the ledger's caps are untested | <span class="ev ev-documented">documented</span>;[^memory] <span class="ev ev-conjecture">conjecture</span> for the caps |
| A handoff charter | A small file, read first | A new session reads a progress file, the git log and a feature list first | <span class="ev ev-reported">reported</span>[^harnesses] |
| Reference documents | An always-loaded index, or a pointer the instructions say when to follow | A skill that waited to be invoked went unused in 56 percent of cases; an always-loaded index did not | <span class="ev ev-reported">reported</span>[^vercel] |
| Skills | The description always; the body on use | The listing costs context on every turn; the body enters on use and stays | <span class="ev ev-documented">documented</span>[^skills] |
| Tool output | Sent to a subagent that returns a summary, or cleared | Reads fill the window | <span class="ev ev-documented">documented</span>[^bestpractices] |

## Where sources disagree

- Placement. A November 2025 post says CLAUDE.md joins the system prompt;[^claudemdblog] the October 2026 documentation says it is a user message.[^memory] The later page governs.
- Length. HumanLayer's 300 lines against the documentation's 200.[^humanlayer][^memory]
- Adherence. The documentation says longer files lower adherence and cites no study.[^memory] The one length experiment found no effect from 25 to 500 lines on one trivial rule.[^mcmillan]
- Always-loaded against on-demand. An always-loaded index beat a skill in Vercel's evaluation,[^vercel] while the documentation sends situational content to skills.[^bestpractices]

## Where the evidence stops

<div class="ak-limits" markdown>

- Adherence: the one length experiment tested one trivial rule, and the decline with many rules is measured only for keyword lists.[^mcmillan][^ifscale]
- Length: neither HumanLayer's 300 lines nor the documentation's 200 is measured.[^humanlayer][^memory]

</div>

## What this means for the agentik tools

The documentation supports most of what agentik-decisions' design files claim about this question, and since 2026-10-14 those files cite the pages themselves.[^decisionsdesign][^d18][^reviewr6] `@` imports expand at launch.[^memory] A parent CLAUDE.md loads in every repository beneath it.[^largecodebases] A skill loads its description at start and its body on use, and the 500-line figure is advice, not a limit.[^skills] AskUserQuestion's limits of 1 to 4 questions and 2 to 4 options are documented, though the page names no version.[^userinput] A timed-out PreToolUse hook fails open unless `onFailure` reverses it.[^hooks]

Two claims are weaker. The first is the repo's cost model, which says inline text wins below a few hundred tokens. The reason it gives: an always-loaded file costs its size on every turn, while a retrieval costs an extra turn. From assumed values, the model puts the threshold at 667 tokens.[^decisionsdesign] Cache reads discount both sides alike, so the threshold holds to first order. This page first offered that as our conjecture. On 2026-10-14, commit `f7222c3` added §8.3a, which says the same and adds a miss term: a cache miss reprices the whole context at the write rate, and on Opus 5.5 with five-minute cache writes, two misses a sitting put the threshold near 575 tokens. The inputs are still assumed, and the burn report that would measure them is specified and not built.[^decisionsdesign] A test: count cached-read tokens per turn with and without the block over a sitting.

The second concerns file length and the ledger's caps. The cost of a context file against none is measured, but that study did not vary length.[^gloaguen] The one adherence experiment found no detectable effect of length.[^mcmillan] The README states the caps of 25 entries in force and 7 loaded every session.[^decisionsreadme] Since 2026-10-14 (commit `ba78699`), the design records both as the owner's rulings, not measurements, and says no outside source gives either number. The nearest evidence it names is the instruction-count study above, by this site's reading, and the documentation's 200 lines.[^d17][^ifscale][^memory]

## Practices this evidence supports

- Cut any CLAUDE.md line whose removal would cause no mistake, and stay under 200 lines. <span class="ev ev-documented">documented</span>.[^bestpractices][^memory]
- Put a rule that must hold in a hook, and set `onFailure` to block where failing open is unsafe. <span class="ev ev-documented">documented</span>.[^hooks]
- Keep a short always-loaded index rather than a pointer that waits to be invoked. <span class="ev ev-reported">reported</span>.[^vercel]
- Write handoff state to files and read them first. <span class="ev ev-reported">reported</span>.[^harnesses]

## From the journal

- [The ledger that ran away](../journal/posts/2026-10-10-the-ledger-that-ran-away.md): a decision ledger past 400 entries, and the cap, sign-off bar and levels that followed.

## Sources

[^gloaguen]: Gloaguen et al., "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?", February 2026, <https://arxiv.org/abs/2602.11988>.
[^mcmillan]: Damon McMillan, "Instruction Adherence in Coding Agent Configuration Files: A Factorial Study of Four File-Structure Variables", May 2026, <https://arxiv.org/abs/2605.10039>.
[^ifscale]: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", July 2025, <https://arxiv.org/abs/2507.11538>.
[^vercel]: Jude Gao, Vercel, "AGENTS.md outperforms skills in our agent evals", 27 January 2026, <https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals>.
[^largecodebases]: Anthropic, "Set up Claude Code in a monorepo or large codebase", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/large-codebases>.
[^memory]: Anthropic, "How Claude remembers your project", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/memory>.
[^skills]: Anthropic, "Extend Claude with skills", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/skills>.
[^caching]: Anthropic, "Prompt caching", documentation read 2026-10-14, <https://platform.claude.com/docs/en/build-with-claude/prompt-caching>.
[^hooks]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks>.
[^userinput]: Anthropic, "Handle approvals and user input", Claude Agent SDK documentation read 2026-10-14, <https://code.claude.com/docs/en/agent-sdk/user-input>.
[^humanlayer]: HumanLayer, "Writing a good CLAUDE.md", 25 November 2025, <https://www.humanlayer.dev/blog/writing-a-good-claude-md>.
[^shankar]: Shrivu Shankar, "How I Use Every Claude Code Feature", 2 November 2025, <https://blog.sshh.io/p/how-i-use-every-claude-code-feature>.
[^bestpractices]: Anthropic, "Best practices for Claude Code", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/best-practices>.
[^harnesses]: Justin Young, Anthropic, "Effective harnesses for long-running agents", 26 November 2025, <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>.
[^claudemdblog]: Anthropic, "Using CLAUDE.md files: Customizing Claude Code for your codebase", 25 November 2025, <https://claude.com/blog/using-claude-md-files>.
[^decisionsdesign]: agentik-dev/agentik-decisions, "history/design/decisions-r1.md", sections 4.2, 8.2, 8.3, 8.3a, 9 and 9a, commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/history/design/decisions-r1.md>.
[^d18]: agentik-dev/agentik-decisions, "design/d18-one-flow.md", section 1.1, commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/design/d18-one-flow.md>.
[^reviewr6]: agentik-dev/agentik-decisions, "history/design/review-r6.md", section 3, commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/history/design/review-r6.md>.
[^decisionsreadme]: agentik-dev/agentik-decisions, "README.md", commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/README.md>.
[^d17]: agentik-dev/agentik-decisions, "design/d17-four-verbs.md", commit 569a120, <https://github.com/agentik-dev/agentik-decisions/blob/569a120/design/d17-four-verbs.md>.
