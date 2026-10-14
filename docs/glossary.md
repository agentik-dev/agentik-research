# Glossary

One meaning per term, as the agentik repositories and this site use it. Terms from Claude Code and the field come first, then the tools' own.

## The field

**Context window.** The tokens a model reads on one request: the system prompt, the conversation so far, tool definitions and tool output. As of October 2026 the current Claude models list 1,000,000 tokens; Sonnet 4.5 and older list 200,000.

**Context rot.** The decline in a model's accuracy and recall as the context fills, named as such in Anthropic's documentation and measured across models in the studies part 1 cites.

**Compaction.** Claude Code's replacement of the conversation with a summary when the context nears its limit. Automatic compaction runs at the model's limit; manual compaction is `/compact`; idle compaction runs after a long pause.

**Handoff.** A written record of the goal, the decisions, the ruled-out approaches and the next step, made so that a fresh session can continue the work. A charter is the agentik form of it.

**Headless, or print mode.** Running `claude -p` with no terminal to answer prompts. Permission prompts resolve to deny, the result is a structured message, and `--max-turns` and `--max-budget-usd` apply.

**Hook.** A command Claude Code runs at an event such as PreToolUse, PostToolUse, Stop or PreCompact. A PreToolUse hook that exits 2 denies the call. A hook that times out fails open unless told to block.

**Subagent.** A helper the main session starts with its own context window; it sees none of the parent's history and returns a summary. Its tokens count against the same usage limits.

**Worktree.** A second checkout of the same git repository, with its own files, index and branch, sharing refs and objects with the main checkout.

**Usage window.** On a subscription, the rolling five-hour limit and the weekly limit on use, shared across models and with chat.

**Evidence levels.** Measured, documented, reported, our use and conjecture. The method page defines each.

## The suite

**Sitting.** One Claude Code session with a named profile, a budget and a charter, from its start line to its exit. A long piece of work is a chain of sittings.

**Charter.** One file per sitting, under 4 KB, holding the goal, the budget, what is done, what waits and the next act. A fresh sitting reads the newest charter and does its next act.

**Checkpoint.** The point at which a sitting is handoff-ready: the charter is current and the work is committed. agentik-session asks for one at 80 percent of either ceiling.

**Meter.** agentik-session's reading of a session's own transcript after every tool call: context tokens and turns against the profile's two ceilings.

**Profile.** A named launch posture in agentik-session: the model, the window, the two ceilings, the checkpoint threshold and the respawn guards.

**Zone.** A band of the meter: clear, notice at 80 percent, wind-down at 90, reserve at 92, exhausted at 100.

**Respawn.** Ending a sitting on purpose and starting a fresh session that reads the charter, instead of compacting. The launcher does the restart; the charter's next act opens with the word RESPAWN.

**Launcher.** `agentik session run`: the process that starts `claude`, waits for a respawn mark, and restarts it with a fresh session id and the same arguments, under a cap and a floor.

**Night.** One `agentik relay run`: a plan, then a loop over the queue, ending with a stop reason. Nights run while nobody watches.

**Queue and row.** The file in a repository that lists the work for a night; each row names a packet and a budget.

**Packet.** A scope file under 9,216 bytes: who it is from, the pin, the wall, the paths it may touch, its acceptance lines and its budget, then six sections. A packet fits one sitting.

**Child.** The `claude -p` session the relay starts for one row, in that row's worktree, with the packet on its stdin.

**Gate.** The relay's deterministic check after a child exits: a result with no error, a commit, a clean tree, an unmoved origin, no orphans, every touched path within the packet's list, the acceptance lines and the verify line re-run in a fresh clone, then the merge. A gate whose facts cannot be read is unrun, and an unrun gate is never a pass.

**Stop reason.** One of thirty named reasons a night ends, split into packet failures, which the night moves past, and sitting failures, which stop it.

**Cap and ceiling.** A cap is a money or count limit: a row's `--max-budget-usd`, a night's `--max-usd`, twelve respawns a day. A ceiling is a context or turn limit a profile sets.

**Watchdog.** The relay's outside check on a child every 60 seconds: HEAD, the newest file time and the CPU seconds of the process group. No change for 2,700 seconds is a stall.

**Breaker.** The relay's load check before a spawn: open above a load of four per core when the CPU confirms it, closed again under two.

**Ledger (decisions).** One `DECISIONS.md` per repository: entries in force, proposed questions and superseded entries, at most 25 in force and 7 loaded every session.

**Entry.** One numbered line in the ledger: a bold title, a paragraph and a dated tail naming its source. Numbers are never reused.

**In force, proposed, superseded.** The three sections of the ledger. Only the owner's answer moves a question into force; a retired entry keeps its number under superseded.

**Every session.** The ledger area whose entries are rendered in full into CLAUDE.md on every session; at most seven.

**Backlog.** `agentik decisions backlog`: a read-only view of each repository's open items with the blocking ones first.

**Lane (respeak).** Who reads a text. The machine lane is agents reading agents: notes, packets, tool output. The human lane is a person reading: replies, READMEs, the pages of this site.

**Mode.** The form of a human-lane text in agentik-respeak: eli5 for a newcomer, bluf for a manager, technical for a peer engineer.

**Lexicon.** The list of shorthand terms agents may use with each other, each ratified by a person. Everything else is written in full.

**Gate (respeak).** The hook and the check that scan a human-lane file for banned phrases and length budgets and block an error-severity hit.

**Verifier.** The script that proves an editorial pass changed prose only: headings, structure, links, code and numbers byte-identical before and after.

**Include file.** A static file of at most 1,500 bytes that renders the writing rules for CLAUDE.md to import, so a reader without the plugin gets them.

**Lane (agents).** Where delegated work is billed: the API key, the subscription seat or a local model.

**Route.** `agentik agents route`: the loopback router that sends a request to the API or to a local backend by the model name in its body.

**Fan-out.** `agentik agents fanout`: several headless delegates under one pooled budget, each reserving before it starts and settling at its cost.

**Rig.** `agentik agents rig`: the manager for local model backends.

**Delegate.** A headless, read-only run billed to the API key, with a profile, a spend ceiling and a structured result.

**Front door.** `agentik <tool> <verb>`: the shell script in agentik-commons that finds `agentik-<tool>` on the path and runs it.

**Bounded.** The commons wrapper every repository's check runs under: one lock per tree, an 840-second wall and a load check, with a refusal that reads as unrun.

**Hygiene.** The commons scan for private names in a public repository: home paths, private addresses, sibling tool names, secrets, emails and the tools' old names, counted and never printed.
