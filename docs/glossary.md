# Glossary

One meaning per term, as the agentik repositories and this site use it. Terms from Claude Code and the field come first, then the tools' own. Command forms are the suite's `agentik <tool> <verb>` names, which the front door runs; each tool page gives the installed names at the commit it read.

## The field

**Context window.** The tokens a model works with on one request: the system prompt, the conversation so far, tool definitions, tool output, and the output it writes, thinking included. As of October 2026 the current Claude models list 1,000,000 tokens; the 4.5 models and older list 200,000. See [Length and compaction](field/length-and-compaction.md).
{ #context-window }

**Context rot.** The decline in a model's accuracy and recall as the context fills. Anthropic's documentation uses the name, and the studies part 1 cites measure it across models.
{ #context-rot }

**Compaction.** Claude Code's replacement of the conversation with a summary. Automatic compaction runs as the context nears the model's limit; manual compaction is `/compact`, at any time; idle compaction runs after a long pause above a token threshold.
{ #compaction }

**Handoff.** A written record of the goal, the decisions, the ruled-out approaches and the next step, made so that a fresh session can continue the work. A charter is the agentik form of it.
{ #handoff }

**Headless, or print mode.** Running `claude -p` with no terminal to answer prompts. Permission prompts resolve to deny, the result is a structured message when a JSON output format is chosen, and `--max-turns` and `--max-budget-usd` apply.
{ #headless }

**Hook.** A command Claude Code runs at an event such as PreToolUse, PostToolUse, Stop or PreCompact. A PreToolUse hook that exits 2 denies the call, and one that times out fails open unless told to block.
{ #hook }

**Subagent.** A helper the main session starts with its own context window. It starts without the parent's history unless forked from it, and returns a summary. Its tokens count against the same usage limits.
{ #subagent }

**Worktree.** A second checkout of the same git repository, with its own files, index and branch, sharing refs and objects with the main checkout.
{ #worktree }

**Usage window.** On a subscription, the rolling five-hour limit on use, shared across models and with chat. A weekly limit sits above it.
{ #usage-window }

**Evidence levels.** Measured, documented, reported, our use and conjecture. The method page defines each.
{ #evidence-levels }

## The suite

**Sitting.** One Claude Code session with a named profile, a budget and a charter, from its start line to its exit. A long piece of work is a chain of sittings.
{ #sitting }

**Charter.** One file per sitting, under 4 KB, holding the goal, the budget, what is done, what waits and the next act. A fresh sitting reads the newest charter and does its next act.
{ #charter }

**Checkpoint.** The point at which a sitting is handoff-ready: the charter is current and the work is committed. agentik-session asks for one at 80 percent of either ceiling.
{ #checkpoint }

**Meter.** agentik-session's reading of a session's own transcript after every tool call: context tokens and turns against the profile's two ceilings.
{ #meter }

**Profile.** In agentik-session, a named set of launch settings: the model, whose choice decides the window, the two ceilings, the checkpoint threshold and the respawn guards. agentik-agents uses the word for a delegate's read-only tool set, and agentik-respeak for a reader (`exec`, `peer-engineer`, `author`).
{ #profile }

**Zone.** A band of the meter: clear, notice at 80 percent, wind-down at 90, reserve at 92, exhausted at 100.
{ #zone }

**Respawn.** Ending a sitting on purpose and starting a fresh session that reads the charter, instead of compacting. The launcher does the restart; the charter's next act opens with the word RESPAWN.
{ #respawn }

**Launcher.** `agentik session run`: the process that starts `claude` and waits for a respawn mark. It then restarts Claude Code with a fresh session id and the same arguments, under a cap and a floor.
{ #launcher }

**Night.** One `agentik relay run`: a plan, then a loop over the queue, ending with a stop reason. Nights run while nobody watches.
{ #night }

**Queue and row.** The file in a repository that lists the work for a night; each row names a packet and a budget.
{ #queue-and-row }

**Packet.** A scope file under 9,216 bytes. It holds who it is from, the [pin](#pin), the [wall](#wall), the paths it may touch, its acceptance lines and its budget, then six sections. A packet fits one sitting.
{ #packet }

**Pin.** The commit at which this site reads a repository. On 2026-10-14 this site re-pinned each repository at its head that day; the [method](method.md) lists the commits. In a relay packet's header, the pin names a branch or commit, and the queue row's base wins when both name one.
{ #pin }

**Child.** The `claude -p` session the relay starts for one row, in that row's worktree, with the packet on its stdin.
{ #child }

**Gate.** The relay's deterministic check after a child exits. It requires a result with no error, a commit, a clean tree, an unmoved origin and no orphans. Every touched path must fall within the packet's list. It then re-runs the acceptance lines and the verify line in a fresh clone. Under the `merge-on-green` policy it then merges; the queue's default, `branch-only`, keeps the branch for the owner. A gate whose facts cannot be read is unrun, and an unrun gate is never a pass.
{ #gate }

**Stop reason.** One of thirty named reasons a night ends, among them: the queue emptied, a count or budget was reached, the owner stopped it, or a sitting failed. A row's own outcome is separate: red, after which the night moves on unless it is a second stall, or failed, which stops it.
{ #stop-reason }

**Cap and ceiling.** A cap is a money or count limit: a row's `--max-budget-usd`, a night's `--max-usd`, twelve respawns in any rolling 24 hours. In agentik-session and agentik-relay a ceiling is a context or turn limit: a profile's two ceilings, a queue row's context and turns. agentik-agents calls a delegate's spend cap its ceiling.
{ #cap-and-ceiling }

**Watchdog.** The relay's outside check on a child every 60 seconds: HEAD, the newest file time and the CPU seconds of the process group. No change for 2,700 seconds is a stall.
{ #watchdog }

**Breaker.** The relay's load check before a spawn: open above a load of four per core when the CPU confirms it, closed again under two.
{ #breaker }

**Ledger (decisions).** One `DECISIONS.md` per repository: entries in force, proposed questions and superseded entries, at most 25 in force and 7 loaded every session.
{ #ledger }

**Entry.** One numbered line in the ledger: a bold title, a paragraph and a dated tail naming its source. Numbers are never reused.
{ #entry }

**In force, proposed, superseded.** The three sections of the ledger. Only the owner's answer moves a question into force; a retired entry becomes a line under superseded.
{ #in-force-proposed-superseded }

**Every session.** The ledger area whose entries are rendered in full into the CLAUDE.md block, so a session reads them on every turn; at most seven.
{ #every-session }

**Backlog.** `agentik decisions backlog`: a read-only view of each repository's open items with the blocking ones first.
{ #backlog }

**Lane (respeak).** Who reads a text. The machine lane is agents reading agents: notes, packets, tool output. The human lane is a person reading: replies, READMEs, the pages of this site.
{ #lane-respeak }

**Mode.** The form of a human-lane text in agentik-respeak: eli5 for a newcomer, bluf for a manager, technical for a peer engineer.
{ #mode }

**Lexicon.** The list of shorthand terms agents may use with each other, each ratified by a person by default. Everything else is written in full.
{ #lexicon }

**Gate (respeak).** The hook and the check that scan a human-lane file for banned phrases and length budgets and block an error-severity hit.
{ #gate-respeak }

**Verifier.** The script that checks an editorial pass changed prose only: headings, link targets and fenced code unchanged, block counts equal, and inline code and numbers the same multiset before and after. It does not check facts: an appended false paragraph passes.
{ #verifier }

**Include file.** A static file of at most 1,500 bytes that renders the writing rules for CLAUDE.md to import, so a reader without the plugin gets them.
{ #include-file }

**Lane (agents).** Where delegated work is billed: the API key, the subscription seat or a local model.
{ #lane-agents }

**Route.** `agentik agents route`: the loopback router that sends a request to the API or to a local backend by the model name in its body.
{ #route }

**Fan-out.** `agentik agents fanout`: several headless delegates under one pooled budget, each reserving before it starts and settling at its cost.
{ #fan-out }

**Rig.** `agentik agents rig`: the manager for local model backends.
{ #rig }

**Delegate.** A run the main session hands off. In the API lane, it is a headless run with a read-only profile, a spend cap and a structured result. In the local lane, it is one of the local agents, some of which may edit files and run commands.
{ #delegate }

**Front door.** `agentik <tool> <verb>`: the shell script in agentik-commons that finds `agentik-<tool>` on the path and runs it.
{ #front-door }

**Bounded.** The commons wrapper every repository's check runs under: one lock per tree, an 840-second [wall](#wall) and a load check. A refusal reads as unrun.
{ #bounded }

**Wall.** In agentik-commons' `bounded` wrapper, the time limit on a command, counted from `bounded`'s start with any load wait included. At the wall the command's process group gets SIGTERM, then SIGKILL after a grace, and `bounded` exits 124; its last line, `bounded: stop: wall`, reads as unrun, never red. Each repository's check runs under an 840-second wall, which a repository may raise while it stays under the relay gate's verify limit. In a relay packet's header, the wall is a line of prose that must contain "this repo only" or a repository name.
{ #wall }

**Hygiene.** The commons scan for private names in a public repository: home paths, private addresses, sibling tool names, secrets, emails and the tools' old names. It counts what it finds and never prints it.
{ #hygiene }
