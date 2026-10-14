# Field 3: Memory and the always-loaded context

## The question
CLAUDE.md, memory files, skills and progressive disclosure, handoff documents. What belongs in context on every turn, and what should be a pointer?

## Findings
Measured:
- Context files raised cost 20 to 23 percent (generated) and up to 19 percent (developer-written) without raising success (-0.5, -2 and +2.4 points). [gloaguen-agents-md-context-files; measured]
- In 1,650 Claude Code sessions, file size (25 to 500 lines), position, extra files and a conflicting rule did not change compliance with one trivial rule: 60.0, 65.2, 67.7 and 64.0 percent by size; 0 of 524 functions with no file. [mcmillan-config-file-adherence; measured]
- Claude Sonnet 4 scored 94.4 percent at 100 and 42.9 percent at 500 simultaneous keyword instructions. [jaroslawicz-ifscale; measured]

Reported (vendor eval; model and case count unstated):
- An AGENTS.md docs index passed 100 percent; a skill passed 53 percent by default and 79 percent when told to use it; it was never invoked in 56 percent of cases. [vercel-agents-md-outperforms-skills; reported]

Documented (as of October 2026):
- CLAUDE.md files in the working directory and every parent load at launch, root first; subdirectory files load when Claude touches a file there. [code-docs-large-codebases; documented]
- CLAUDE.md is a user message after the system prompt, with no compliance guarantee. `@` imports load at launch, nest four hops, save no context. Advice: under 200 lines. After compaction the root file returns; nested files do not. [code-docs-memory; documented]
- Auto memory: the first 200 lines or 25KB of MEMORY.md load each session; topic files on demand. [code-docs-memory; documented]
- Skills: every name is listed; each description is cut at 1,536 characters; the listing budget is 1 percent of the window; the body enters on use and stays; keep it under 500 lines. [code-docs-skills; documented]
- Cache write: 1.25 times (5 minutes) or 2 times (1 hour) the base input price; read: 0.1 times (0.05 on Sonnet 5.5 and Opus 5.5). [anthropic-api-docs-prompt-caching; documented]
- A timed-out PreToolUse hook does not block; `onFailure: "block"` (v2.1.295) does. [code-docs-hooks-reference; documented]
- AskUserQuestion: 1 to 4 questions, 2 to 4 options, header up to 12 characters. [code-docs-agent-sdk-user-input; documented]

Reported (practitioners):
- Under 300 lines; about 50 instructions in Claude Code's own prompt (author's count). [humanlayer-writing-a-good-claude-md; reported] A 13KB root file; a fresh session near 20k tokens. [shankar-every-claude-code-feature; reported]

## What belongs in context on every turn, and what should be a pointer
| Item | Placement | Reason | Evidence |
|---|---|---|---|
| Rule that must hold every turn | Hook, plus a short CLAUDE.md line | CLAUDE.md is advisory; a file lifted one rule from 0 to 67.7 percent | [code-docs-best-practices; documented] [mcmillan-config-file-adherence; measured] |
| Decision ledger | Index loaded, entries by pointer | Vendor caps its index; our caps untested | [code-docs-memory; documented]; conjecture |
| Handoff charter | Small file, read first | A new session reads progress file, git log, feature list first | [anthropic-effective-harnesses; documented] |
| Reference docs | Pointer with a trigger | Unprompted pointers get skipped | [vercel-agents-md-outperforms-skills; reported] |
| Skills | Description always, body on use | Listing costs every turn | [code-docs-skills; documented] |
| Tool output | Not kept | Reads fill the window | [code-docs-best-practices; documented] |

## Disputes
- Placement: a November 2025 post says CLAUDE.md joins the system prompt [claude-blog-using-claude-md-files; documented]; the October 2026 docs say user message [code-docs-memory; documented]. The later page governs.
- Length: 300 lines [humanlayer-writing-a-good-claude-md; reported] against 200 [code-docs-memory; documented]. Neither is measured.
- The docs say longer files lower adherence and cite no study; the one length experiment found shows no effect from 25 to 500 lines on one trivial rule [mcmillan-config-file-adherence; measured]. Many-rule decline is measured only for keyword lists [jaroslawicz-ifscale; measured]. The 50-instruction count is the author's own.
- Always-loaded beat a skill in one vendor eval [vercel-agents-md-outperforms-skills; reported]; the docs send situational content to skills [code-docs-best-practices; documented].

## What this says about the agentik claims
- (a) `@` imports expand at launch: supported. [code-docs-memory; documented]
- (b) A parent CLAUDE.md loads in every repository beneath it: supported; `claudeMdExcludes` skips it. [code-docs-large-codebases; documented]
- (c) Description at start, body on use, under 500 lines: supported; also the body stays, and compaction keeps 5,000 tokens per skill, 25,000 in all. The 500 is advice. [code-docs-skills; documented]
- (d) Inline wins below a few hundred tokens: not in the docs; the repo's model gives 667 tokens from assumed values. [agentik-decisions-history-design; our use] Reads at 0.1 times discount both sides alike, so it likely holds; retrieved text stays in context too. [conjecture; test with cache read counts]
- (e) A timed-out hook fails open: supported for PreToolUse; `onFailure` can reverse it. [code-docs-hooks-reference; documented]
- (f) AskUserQuestion takes 1 to 4 questions, 2 to 4 options: supported; the page names no version. [code-docs-agent-sdk-user-input; documented]
- (g) A growing file hurts: cost supported [gloaguen-agents-md-context-files; measured]; adherence loss not shown. The 25 and 7 caps are in no source. [agentik-decisions-readme; our use]

## Candidate practices
- Cut any CLAUDE.md line whose removal would cause no mistake; stay under 200 lines. [code-docs-best-practices; documented]
- Put a rule that must hold in a hook; set `onFailure` to block where failing open is unsafe. [code-docs-hooks-reference; documented]
- Keep a short index and say when to read each pointer. [vercel-agents-md-outperforms-skills; reported]
- Write handoff state to files and read them first. [anthropic-effective-harnesses; documented]

## Sources
- gloaguen-agents-md-context-files: Gloaguen et al., "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?", 2026-02, https://arxiv.org/abs/2602.11988
- mcmillan-config-file-adherence: Damon McMillan, "Instruction Adherence in Coding Agent Configuration Files: A Factorial Study of Four File-Structure Variables", 2026-05, https://arxiv.org/abs/2605.10039
- jaroslawicz-ifscale: Jaroslawicz et al., "How Many Instructions Can LLMs Follow at Once?", 2025-07, https://arxiv.org/abs/2507.11538
- vercel-agents-md-outperforms-skills: Jude Gao, "AGENTS.md outperforms skills in our agent evals", 2026-01-27, https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals
- code-docs-large-codebases: Anthropic, "Set up Claude Code in a monorepo or large codebase", undated, https://code.claude.com/docs/en/large-codebases
- code-docs-memory: Anthropic, "How Claude remembers your project", undated, https://code.claude.com/docs/en/memory
- code-docs-skills: Anthropic, "Extend Claude with skills", undated, https://code.claude.com/docs/en/skills
- anthropic-api-docs-prompt-caching: Anthropic, "Prompt caching", undated, https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- code-docs-hooks-reference: Anthropic, "Hooks reference", undated, https://code.claude.com/docs/en/hooks
- code-docs-agent-sdk-user-input: Anthropic, "Handle approvals and user input", undated, https://code.claude.com/docs/en/agent-sdk/user-input
- anthropic-effective-harnesses: Justin Young, "Effective harnesses for long-running agents", 2025-11-26, https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- humanlayer-writing-a-good-claude-md: Kyle (HumanLayer), "Writing a good CLAUDE.md", 2025-11-25, https://www.humanlayer.dev/blog/writing-a-good-claude-md
- shankar-every-claude-code-feature: Shrivu Shankar, "How I Use Every Claude Code Feature", 2025-11-02, https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- code-docs-best-practices: Anthropic, "Best practices for Claude Code", undated, https://code.claude.com/docs/en/best-practices
- claude-blog-using-claude-md-files: Anthropic, "Using CLAUDE.md files: Customizing Claude Code for your codebase", 2025-11-25, https://claude.com/blog/using-claude-md-files
- agentik-decisions-readme: agentik-dev/agentik-decisions, README.md at commit 80d59eb, 2026-10-13, https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/README.md
- agentik-decisions-history-design: agentik-dev/agentik-decisions, history/design/decisions-r1.md section 8.3 at commit 80d59eb, 2026-09, https://github.com/agentik-dev/agentik-decisions/blob/80d59eb/history/design/decisions-r1.md
