# Memory and the always-loaded context

What loads on every turn should be short, and what must hold on every turn should be a hook, not prose. The measured evidence is thin but consistent: a context file raised cost 20 percent without raising success,[^gloaguen] a file lifted compliance with one rule from zero to about two thirds and its length did not matter,[^mcmillan] and compliance falls as the number of simultaneous instructions grows.[^ifscale] The vendor's documentation says how each memory layer loads and when, and that is where the practical answers are. This chapter answers research question 3: CLAUDE.md, memory files, skills, handoff documents, and what belongs in context against what should be a pointer.

## What is measured

- Gloaguen et al. tested repository context files for coding agents. Agent-generated files raised cost 20 to 23 percent and developer-written files up to 19 percent, without raising success: the resolution changes were -0.5, -2 and +2.4 points.[^gloaguen]
- McMillan ran 1,650 Claude Code sessions in a factorial design. File size from 25 to 500 lines, position, extra files and a conflicting rule did not change compliance with one trivial rule: 60.0, 65.2, 67.7 and 64.0 percent by size. With no file, 0 of 524 functions complied.[^mcmillan]
- Jaroslawicz et al. measured instruction following against instruction count. Claude Sonnet 4 scored 94.4 percent at 100 simultaneous keyword instructions and 42.9 percent at 500.[^ifscale]

One vendor evaluation is reported rather than measured, because its model and case count are not stated. An AGENTS.md docs index passed 100 percent of cases; a skill passed 53 percent by default and 79 percent when AGENTS.md told the agent to use it, and the skill was never invoked in 56 percent of cases.[^vercel]

## What the vendor documents, as of October 2026

- CLAUDE.md files in the working directory and in every parent directory load at launch, root first; a CLAUDE.md in a subdirectory loads when Claude touches a file there; `claudeMdExcludes` skips a file.[^memory][^largecodebases]
- CLAUDE.md is sent as a user message after the system prompt, with no compliance guarantee. `@` imports load at launch, nest to four hops, and save no context. The page advises under 200 lines. After compaction the root file returns, and nested files load again on demand.[^memory]
- Auto memory loads the first 200 lines or 25KB of `MEMORY.md` each session; topic files load on demand.[^memory]
- Skills: every skill's name is listed at session start, each description is cut at 1,536 characters, and the listing budget is 1 percent of the window. The body enters on use and stays in context. The page advises under 500 lines.[^skills]
- Prompt caching prices a cache write at 1.25 times the base input price for the five-minute lifetime and 2 times for the one-hour lifetime; a cache read costs 0.1 times, 0.05 times on Sonnet 5.5 and Opus 5.5, and 0.025 times on Fable 5.1.[^caching]
- A PreToolUse hook that times out does not block. Setting `onFailure` to `"block"` (version 2.1.295) makes it block.[^hooks]
- AskUserQuestion takes 1 to 4 questions per call with 2 to 4 options each and a header of up to 12 characters.[^userinput]

## What practitioners report

- HumanLayer advises under 300 lines and counts about 50 instructions in Claude Code's own system prompt; the count is the author's own.[^humanlayer]
- One engineer runs a 13KB root file and sees a fresh session start near 20k tokens.[^shankar]

## What belongs in context every turn, and what should be a pointer

| Item | Placement | Reason | Evidence |
|---|---|---|---|
| A rule that must hold on every turn | A hook, plus one short CLAUDE.md line | CLAUDE.md is advisory; a file lifted one rule from 0 to 67.7 percent, and a hook can block | Documented;[^bestpractices][^hooks] measured[^mcmillan] |
| A decision ledger | A short index loaded; entries read by pointer | The vendor caps its own index; the ledger's caps are untested | Documented;[^memory] conjecture for the caps |
| A handoff charter | A small file, read first | A new session reads a progress file, the git log and a feature list first | Reported[^harnesses] |
| Reference documents | An always-loaded index, or a pointer the instructions say when to follow | A skill that waited to be invoked went unused in 56 percent of cases; an always-loaded index did not | Reported[^vercel] |
| Skills | The description always; the body on use | The listing costs on every turn; the body enters on use and stays | Documented[^skills] |
| Tool output | Not kept | Reads fill the window | Documented[^bestpractices] |

## Where sources disagree

- Placement. A November 2025 post says CLAUDE.md joins the system prompt;[^claudemdblog] the October 2026 documentation says it is a user message.[^memory] The later page governs.
- Length. HumanLayer's 300 lines against the documentation's 200.[^humanlayer][^memory] Neither is measured.
- Adherence. The documentation says longer files lower adherence and cites no study. The one length experiment found no effect from 25 to 500 lines on one trivial rule.[^mcmillan] The decline with many rules is measured only for keyword lists.[^ifscale]
- Always-loaded against on-demand. An always-loaded index beat a skill in one vendor evaluation,[^vercel] while the documentation sends situational content to skills.[^bestpractices]

## What this means for the agentik tools

agentik-decisions' design files make several claims about this question,[^decisionsdesign][^d18][^reviewr6] and the documentation supports most of them. `@` imports expand at launch.[^memory] A parent CLAUDE.md loads in every repository beneath it.[^largecodebases] A skill loads its description at start and its body on use, and the 500-line figure is advice, not a limit.[^skills] AskUserQuestion's limits of 1 to 4 questions and 2 to 4 options are documented, though the page names no version.[^userinput] A timed-out PreToolUse hook fails open unless `onFailure` reverses it.[^hooks]

Two claims are weaker. The repo's model says inline text wins below a few hundred tokens because an always-loaded file costs its size on every turn while a retrieval costs an extra turn; the model gives 667 tokens from assumed values.[^decisionsdesign] Cache reads at 0.1 times discount both sides alike, so the threshold likely holds to first order, but that is conjecture. The cost of a context file against none is measured, and its length was not varied;[^gloaguen] the adherence loss is not measured, and the caps of 25 entries in force and 7 loaded every session are in no source.[^decisionsreadme]

## Practices this evidence supports

- Cut any CLAUDE.md line whose removal would cause no mistake, and stay under 200 lines. Documented.[^bestpractices][^memory]
- Put a rule that must hold in a hook, and set `onFailure` to block where failing open is unsafe. Documented.[^hooks]
- Keep a short always-loaded index rather than a pointer that waits to be invoked. Reported.[^vercel]
- Write handoff state to files and read them first. Reported.[^harnesses]

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
[^decisionsdesign]: agentik-dev/agentik-decisions, "history/design/decisions-r1.md", sections 4.2, 8.3 and 9, commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/history/design/decisions-r1.md>.
[^d18]: agentik-dev/agentik-decisions, "design/d18-one-flow.md", section 1.1, commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/design/d18-one-flow.md>.
[^reviewr6]: agentik-dev/agentik-decisions, "history/design/review-r6.md", section 3, commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/history/design/review-r6.md>.
[^decisionsreadme]: agentik-dev/agentik-decisions, "README.md", commit 80d59eb, <https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/README.md>.
