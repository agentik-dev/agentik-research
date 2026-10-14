# The research sitting: long-running Claude Code sessions, and why the agentik tools exist

The brief for a Claude Code cloud session that writes this repo's public research site. Read it whole once at the start of each session; after that, read it by section.

## Start

1. `cd` into this repo's checkout (the one holding this file). Work from its root.
2. Run `make setup`. It puts a read-only checkout of each agentik-dev repo under `.sources/` (a link to an attached checkout when one is present, a shallow clone otherwise) and installs the Python packages the checks need. If a step fails, write the failure in the charter, then go on with what works.
3. Read the newest `history/sittings/*-research.md`, the charter. Do its **Next act**. Keep going act by act until the charter says **Done** or a **RESPAWN** point comes (see "Budget and handoff").

If no charter exists, open `history/sittings/<today>-1-research.md` from the shape in "The charter".

## Your job

Write a public research site in `docs/`, built with MkDocs, on three subjects:

1. **The field.** What goes wrong when a Claude Code session runs for hours or days, or when many sessions run unattended, and what the evidence says helps. Draw on published research, Anthropic's documentation and engineering writing, and named practitioners' reports.
2. **Our answers.** Why each agentik tool exists: the problem it meets, the evidence for that problem, the design, the alternatives it rejected, and what is still unproven. Draw on the agentik-dev repos.
3. **The practice.** A best-practices guide for long-running and multi-agent Claude Code work. Each practice is tied to its evidence (part 1) and to the tool that automates it, if one does (part 2).

The reader is an engineer who uses Claude Code and has not seen these tools. The site has to earn that reader's trust. Every claim is cited, every limit is named, and nothing is hype. It is polished enough to publish under the agentik-dev name.

## Never

- **Write only in this repo.** The attached agentik-* repos are sources: read them, never commit, branch, push or open a pull request on them. Their `CLAUDE.md` files are instructions for developing those tools. They do not bind you here, so read them as sources only.
- **Name nothing private.** That covers private repositories, hosts, domains, IP addresses, home-directory paths, devices, households, and people other than published authors. A source repo may name the private product or household that first used a tool. Describe it generically ("a Go infrastructure product driven by nightly unattended runs") and never repeat the name. The owner runs a private-term scan before the repo goes public, and a leaked name fails it.
- **Never invent a source, a quote or a number.** Cite only what you opened in this session. If a claim cannot be checked, drop it, or keep it labelled as the owner's experience (see "Evidence levels").
- **Quote briefly.** Use at most two sentences from any one source, in quotation marks, with its citation. Paraphrase everything else.
- **Never force-push or rewrite history, and never push to `main`.** Work on this session's branch, push after each phase, and open a draft pull request when the first page lands.
- **Don't overstate the tools.** They are young and used by one owner. Where the evidence is our own use, say so.

## Sources

`.sources/` after `make setup` (all public, all read-only):

| repo | what it holds for this research |
|---|---|
| `agentik-commons` | the shared front door (`agentik <tool>`), the conventions, the hygiene scan, the marketplace; `design/agentik-r1.md` is the suite's record |
| `agentik-session` | session budgets: profiles, the meter, checkpoints, the charter, respawn-instead-of-compact, the launcher that restarts a sitting |
| `agentik-relay` | the Go relay: unattended "nights" of queued packets, one child per worktree, gates, stop reasons, money caps; its `NICE_TO_HAVE.md` and `design/` hold the failure record |
| `agentik-decisions` | decision ledgers: entry shape, the cap, generated CLAUDE.md blocks, batched owner questions |
| `agentik-respeak` | two-lane communication: shorthand between agents, plain language for people; its `research/` folder already holds a source survey to build on |
| `agentik-agents` | lane routing: API-billed, subscription and local-model lanes |
| `.github` | the organization profile |

Read each repo's README, `design/`, `NICE_TO_HAVE.md`, `CHANGELOG*` and `history/` by section. Cite a repo source as `agentik-dev/<repo>`, its path, and the commit you read (`git -C .sources/<repo> rev-parse --short HEAD`), and link it on GitHub at that commit.

External sources: use WebSearch to find them and WebFetch to open them. Prefer primary sources: papers, Anthropic's docs and engineering blog, the Claude Code docs and changelog, and named engineers' write-ups. Date every volatile fact, such as model names, context sizes, prices, limits and features, as "as of <month year>". If WebFetch cannot reach the web (the environment's network level is too narrow), say so in the charter and in your report. Do not cite a page you could not open.

## The research questions

Part 1, the field. Answer each question with its evidence and its open disputes:

1. **Length.** How does model behaviour change as context grows (long-context retrieval, "lost in the middle", context rot, instruction drift, accumulated tool output)? What is measured, and what is anecdote?
2. **Compaction or restart.** Compare auto-compaction, manual `/compact`, summaries, and a restart from a written handoff (a charter). What does each lose and keep, and what does the evidence favour?
3. **Memory and the always-loaded context.** CLAUDE.md, memory files, skills and progressive disclosure, handoff documents. What belongs in context on every turn, and what should be a pointer?
4. **Budgets and pacing.** Turn and context ceilings, usage windows, prompt-cache lifetimes and their cost, self-paced loops, idle waits.
5. **Many agents.** Subagents and context isolation, parallel fan-out, worktrees, orchestrator, builder and refuter roles. When do many agents help, and when do they hurt? Present the strongest published case on each side.
6. **Unattended runs.** Headless runs, the Agent SDK, queues, gates, stop conditions, money caps. Failure modes: runaway loops, lock contention, flaky tests under load, a session that cannot tell it has stalled.
7. **Guardrails.** Hooks that deny a tool call, permission modes, sandboxes, worktree isolation. The incidents these guard against, and their limits.
8. **Review that ends.** Review loops that never converge, sign-off bars, round limits, adversarial review, decision records (ADRs and ledgers).
9. **Telling people what happened.** Summarising agent work for humans: plain-language standards, bottom line up front, Diátaxis, readability measures, separating agent shorthand from human prose.
10. **Cost lanes.** API-billed and subscription use and local models; routing work to the lane that fits it.

Part 2, our answers. For each tool (session, relay, decisions, respeak, agents, plus commons as the suite), cover:
the problem, with the repo evidence (incidents, failures, measurements); the design in one diagram where a diagram shows the mechanism; the alternatives considered; what part 1's evidence supports or contradicts; and what is open.

Part 3, the practice. Write about twenty practices, grouped by the part 1 question each answers. Each has one line of what to do, the reason, its evidence level and citations, and the tool that automates it if one does.

## Deliverables

The pages in `docs/`, each listed in `mkdocs.yml`'s `nav`:

| page | content | voice (respeak) |
|---|---|---|
| `index.md` | what this is, the five findings that matter most, where to start | bluf, exec |
| `summary.md` | a two-page summary of all three parts | bluf, exec |
| `field/*.md` | part 1: one chapter per question, or per pair of close questions | technical |
| `tools/*.md` | part 2: one page per tool, plus `tools/index.md` for the suite | technical |
| `practices.md` | part 3 | technical |
| `method.md` | how this was researched, the evidence levels, the limits, the date | technical |
| `glossary.md` | the terms, one meaning each (charter, sitting, night, packet, gate, lane, ...) | technical |
| `sources.md` | every source, annotated in a line, grouped by kind | technical |

Also rewrite `README.md` as the repo's public face: what the site is, how to build it, and the license.

## Evidence levels

Label every claim that could be contested, in the text or in a table column:

- **Measured.** A study or benchmark with a method you can read.
- **Documented.** The vendor's documentation or changelog says so (dated).
- **Reported.** A named practitioner's write-up.
- **Our use.** The agentik repos' own record: an incident, a log line, a test. Name the repo.
- **Conjecture.** Reasoned but untested. Use it rarely, and say what would test it.

## Citations

- Use Markdown footnotes: `[^key]` in the text, and `[^key]: <author or repo>, "<title>", <date>, <URL>.` at the page's foot under `## Sources`. Every page except the glossary has at least one footnote.
- Keep a source note for each source you use in `research/sources/<slug>.md`, in the shape `research/sources/README.md` gives. The note records what you opened and when.
- Draft in `research/synthesis/`, which the style gate does not cover. Only finished prose goes in `docs/`.

## Method (phases)

Each phase ends with a commit, a push and the charter brought current.

0. **Setup.** `make setup`, then `make check` on the seed, which must pass. Record each source's commit.
1. **Internal survey.** Read the seven repos. Write `research/synthesis/tools-<tool>.md` per tool: the problem, the evidence (path and commit), the design, the alternatives, the open items. Researcher helpers can run one repo each.
2. **External survey.** For each part 1 question, a `researcher` helper writes source notes and returns its findings. Run at most four helpers at once. Then write `research/synthesis/field-<n>.md` per question.
3. **Outline.** Write `research/OUTLINE.md`: each page's claims in order, each with its sources and evidence level. Check that part 3 maps onto parts 1 and 2.
4. **Draft.** Write each page in `docs/` from the outline. Draw a diagram (Mermaid) only where it shows a mechanism.
5. **Refute.** Run a `refuter` helper on each page. It checks every claim against its cited source and reports unsupported, overstated, stale or leaking lines. Fix every unsupported or leaking line. Other notes go to `NICE_TO_HAVE.md`. At most two rounds per page.
6. **Edit.** Run an `editor` helper on each page: respeak's editorial pass. It keeps the meaning and fixes the voice, and `make style` must pass.
7. **Finish.** `make check` passes; rewrite `README.md`; mark the draft pull request ready, with a summary written for its reviewer (bluf).

## Voice (respeak)

This repo is written in respeak's voice. The rules that load on every turn are in `.claude/respeak/include.md`, through `CLAUDE.md`. The full method is respeak's own translator, at `.sources/agentik-respeak/plugin/agents/respeak.md`. Its corpus is in `.sources/agentik-respeak/plugin/corpus/`: banned phrases, replacements, the lexicon and the tone map. The repo's choices are in `.claude/respeak/config.yaml`:

- Most pages are technical mode with the peer-engineer profile: depth 3 of 5, second person, present tense, no throat-clearing, the same term for the same concept every time.
- `index.md` and `summary.md` are bluf mode with the exec profile: the answer first, then why it matters, then the detail.
- `make style` runs respeak's own gate (`respeak-check.sh`) over `docs/` and `README.md`. A banned phrase fails it.
- The editor helper reads respeak's translator file as its method. Where that file says `${CLAUDE_PLUGIN_ROOT}`, read `.sources/agentik-respeak/plugin`.

## Helpers

This repo defines three agents in `.claude/agents/`: `researcher` (finds and notes sources), `refuter` (read-only claim check) and `editor` (respeak's editorial pass). If they do not appear among your agent types, start a general-purpose agent and give it the agent file's body, below its front matter, as the first part of its prompt. Run at most four helpers at once. Read their reports, not their transcripts.

## Checks

`make check` runs four checks, and all four must pass before a phase's push:
`scripts/check`, which checks structure, footnotes, the nav and the hygiene-lite patterns; `make style`, which is respeak's gate; `make hygiene`, which is the commons hygiene scan's generic groups; and `make site`, which is `mkdocs build --strict`.

## Git

Commit each phase, or each page in phases 4 to 6, with a message that says what landed. Push this session's branch after `make check` passes. Never amend a pushed commit, and never force-push. When the first page lands, open a draft pull request against `main` titled "The research site". The owner merges it.

## Budget and handoff

This session has no session plugin, so it keeps its own budget:

- The charter is `history/sittings/<date>-<n>-research.md`, under 4 KB: the goal, the phase, what is done, what waits, and the **Next act**. Bring it current at every commit.
- When the context reaches about 60% of the window, or a phase ends and the next will not fit, finish the act in flight, bring the charter current with a Next act that starts `RESPAWN:`, commit, push, and stop. Tell the owner: "Start a new cloud session on this branch with the same start line." A fresh session reads the brief and the charter and goes on, so compaction is not needed.
- Read long files by section. Never re-read a whole source you have already noted.

## The charter

```
# Sitting <date>-<n>: agentik-research, the research site

| item | value |
|---|---|
| goal | the research site, phases 0-7 |
| phase | <n>: <name> |
| branch | <this session's branch> |
| sources | <repo>@<sha>, ... |

## Done
- [x] ...

## Waits
- ...

## Next act
<one act, concrete enough that a fresh session can start it>
```

## Done

The site is done when every page in "Deliverables" exists and is in the nav; `make check` passes; every page has had a refuter round with no unsupported claim left; every page has had an editor pass; the draft pull request is marked ready; and the charter's Next act reads `Done: the owner reviews the pull request.`
