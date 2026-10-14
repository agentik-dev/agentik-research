# agentik-agents

agentik-agents routes delegated work to one of three lanes. The lanes are headless runs billed to an API key, the interactive subscription seat, and a local model behind a loopback router. It exists because delegated work billed in two currencies that nobody summed, and delegated runs failed quietly while billing in full. A Claude Code session also reaches one API endpoint, so a local model could not serve subagents without a proxy.[^readme][^design01]

Every measurement in the repo is one owner's. The local lane was measured on one Mac, one model family and small tasks, and the API lane on a handful of runs. The repo records no case of the local lane keeping the seat under a usage window.[^readme][^design01]

Everything on this page is the repo's record at commit 78ce312 unless marked otherwise. The command names below are the suite's current ones, from the commons rename plan. At commit 78ce312 the scripts still carry their earlier names.[^commonsr1]

## The problem, as the repo records it

- Two currencies and a free lane, no common ledger. API spend is real dollars from a usage log. Seat work is priced at list rates as equivalent dollars. The local lane is zero dollars, counted in tokens and wall time. The README states one undated pair: 3.13 dollars of API spend beside 155.78 of seat-absorbed work.[^readme]
- Delegation fails quietly and bills. Three of four delegates that tried a denied tool returned a schema-valid placeholder after full cost. One of them spent 2.15 dollars over 14 turns. In an eight-shard review fan-out, two shards ran 8 to 10 turns and cost 1.02 dollars combined. Both returned a placeholder, and the envelope said success. Of that fan-out's spend, 33 percent bought nothing. A 0.01-dollar cap overshot to 0.0117 and returned nothing. Eight shards at the default 10-dollar ceiling expose 80 dollars.[^bin][^readme]
- Containment that did not contain. `--allowedTools` pre-approves a set and restricts nothing. A red team ran a shell command inside a read-only profile. The fix is `--tools`. A deny-list over the caller's arguments was defeated four ways. An allow-list replaced it: it builds the child's arguments and sends the prompt on stdin. `Read` is not confined to `--add-dir`: a probe read a private key.[^readme]
- One endpoint per session. A session cannot name a provider per agent. The local lane therefore puts a router on loopback that decides by the request's model name.[^design01]
- The local model's traps. The repo measured them on 2026-09-04 on an Apple Silicon Mac with 128 GB of memory and a 27B model. An unpinned reasoning effort took 4 minutes 56 seconds on a three-line file. A run with Claude Code's token reminder took 36.0 seconds of prefill on its second turn, against 0.38 for a run without it. The two runs also differed in system-prompt length and were not compared directly. A 54-tool agent sent about 31,000 input tokens and took 172 seconds per turn. One Ollama version returned HTTP 500 on every non-bare request.[^readme][^design01][^evidence]
- The tools' own defects. A review round on 2026-09-05 found reproducible defects on all five surfaces. A two-entry header deny-list let cookies reach the local backend. A chunked body lost its model name and went upstream on the seat's credential. Both plugin skills granted nothing because of a wrong front-matter key. Four stated measurements failed a check against their own logs. A reviewer's `pkill` matched its own shell and killed the production router.[^review]

## The design

| Lane | What it is | Billed to | Entry point |
|---|---|---|---|
| API-billed | Headless `claude --bare` runs through a wrapper with read-only profiles and a default 10-dollar ceiling | A Console project, in dollars | `agentik agents api`, `agentik agents fanout` |
| Subscription | Plain interactive `claude`; the cost tool prices its usage as equivalent dollars | The seat | `claude` |
| Local model | A seat session whose subagents run on a local model behind a loopback router | Nothing; tokens and wall time are logged | `agentik agents local`, `agentik agents route`, `agentik agents rig` |

- **The router.** It decides by one thing: the model name in the request body. A model is local if its name starts with `local/`, is in a configured list, or carries an Ollama-style tag, unless it names Claude. Upstream requests relay every header byte for byte, which keeps the session on the seat. Local requests get an allow-list of headers, and the seat's credential is stripped. On local routes the router drops the token reminder, sets effort to low when the request names none, and clamps anything above medium. It also clamps `max_tokens` to 8,192, serialises requests, and sends keep-alive pings so Claude Code's stream watchdog does not fire. The fit rule is a four-rung ladder, from local for mechanical and bounded work up to the frontier model for orchestration. The acceptance check decides escalation, not the model's confidence. Privacy is not a routing criterion anywhere in the repo.[^bin][^design01]
- **The fan-out.** `--max-budget-usd` is per process, so the fan-out holds one pool. Each shard reserves before launch and settles at its actual cost, so settled plus in-flight spend never exceeds the budget. The per-shard ceiling is deflated by 1.35 for a measured overshoot of 1.2. Each shard's result is classified into one of eight statuses, with `degenerate` for a result that has no substance. The exit code is non-zero unless every shard is `ok`.[^bin][^readme]
- **The cost log.** It holds one line per run: cost, turns, duration, cache tokens and the names of denied tools. It never holds a prompt or a result. A price table copied from the vendor's page is checked against every bill. Past a 2 percent disagreement, the tool withholds the cache figure and says so.[^readme]
- **The rig.** A backends file maps `local/<name>` to a server. On 2026-09-05 a new agent shape cost 28 to 37 seconds of prefill on every backend tried. The design concludes from this that prefill bandwidth, not caching, governs latency. The levers are fewer agent shapes and smaller prompts.[^design02]

```mermaid
flowchart LR
  S["Claude Code session, one base URL"] --> R["agentik agents route, a loopback router"]
  R -->|"model name claude-*: headers byte for byte"| A["Anthropic API, the seat login kept"]
  R -->|"model name local/* or a colon tag"| L["A local backend"]
  L -.-> N["Four adjustments: strip the reminder, clamp effort, clamp max_tokens, one request at a time"]
```

The diagram follows the design's own ASCII form.[^design01]

## Alternatives the repo rejected

| Alternative | What the repo says |
|---|---|
| A gateway app with its own control plane | Capable, but a fast-moving GUI whose core value, format translation, is unneeded[^design01] |
| An existing LAN gateway as the endpoint | Would lose the seat, add a network hop, and risk tool fidelity in format translation[^design01] |
| Aliasing the Haiku model name to the local model | Worked, but the alias also drives Claude Code's background calls[^design01] |
| One environment variable sending every unnamed subagent local | The variable does not reach the built-in agents, and an unnamed agent carries 54 tools[^design01] |
| Read-only by `--allowedTools` | Restricted nothing; replaced by `--tools`[^readme] |
| A deny-list over arguments | Defeated four ways; an allow-list fails closed[^readme] |
| A tight per-run cap as the safe choice | A run that trips the cap returns nothing and still bills[^readme] |
| A hand-rolled parallel fan-out | No shared pool, so no aggregate ceiling[^readme] |

The record names no one-lane alternative, no hosted router, and no use of the Agent SDK. Headless work goes through the CLI.[^readme]

## What part 1 says

- Seat work and API spend are separate budgets, as documented: a credential replaces the login and plan limits stop. Whether the usage windows are the binding limit for long sessions is unmeasured: no window hit is recorded.
- Remote Control is off under a non-Anthropic base URL, as the repo says. Voice dictation is tied to keys rather than the base URL, so the repo's claim is half right.
- Subagents continue after a denial, as documented. The documentation does not describe a placeholder returned after full cost, and its cause is conjecture. See [Many agents](../field/many-agents.md).
- The repo measured local generation at 11 tokens a second for prose. That is below the 23 and 31 that two practitioners report on other models and machines: the same order, not the same figure.[^readme] No source measures tool-call accuracy for a 27B-class model.
- Routing studies route on query difficulty, none on privacy, and several routers lose to the best single model. Name-only routing is neither contradicted nor shown sufficient. The vendor advises you to sweep effort first.
- Billing follows the credential, not the entry point: on a plan login, your SDK and `claude -p` usage counts against plan limits. See [Budgets, pacing and cost lanes](../field/budgets-and-lanes.md).

## What is open

- One machine, one model family, small tasks; no quality comparison between local and hosted output.[^design01]
- The launcher can orphan a router on a signal, and two routers were left running in a 200-run reproduction.[^nth]
- The cache best case of 0.38 seconds was measured with flags the launcher does not use. One production run re-prefilled in full.[^design01]
- The README and the wrapper disagree on a profile delegate's tools: Read, Grep and Glob in one, Read alone in the other.[^readme][^bin]
- The tests target macOS. On Linux, five of six failures printed platform output; one, in the API-run suite, was not investigated.[^tests]

## Sources

[^readme]: agentik-dev/agentik-agents, "README.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/README.md>.
[^design01]: agentik-dev/agentik-agents, "design/01-local-agent-lane.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/design/01-local-agent-lane.md>.
[^bin]: agentik-dev/agentik-agents, "bin/", the API wrapper, the router and the fan-out, commit 78ce312, <https://github.com/agentik-dev/agentik-agents/tree/78ce312/bin>.
[^evidence]: agentik-dev/agentik-agents, "design/01-local-agent-lane/", the committed logs, commit 78ce312, <https://github.com/agentik-dev/agentik-agents/tree/78ce312/design/01-local-agent-lane>.
[^review]: agentik-dev/agentik-agents, "design/03-review-2026-09.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/design/03-review-2026-09.md>.
[^design02]: agentik-dev/agentik-agents, "design/02-local-rig.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/design/02-local-rig.md>.
[^nth]: agentik-dev/agentik-agents, "NICE_TO_HAVE.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/NICE_TO_HAVE.md>.
[^tests]: agentik-dev/agentik-agents, "tests/", re-run by this site on a scratch copy, 2026-10-14, commit 78ce312, <https://github.com/agentik-dev/agentik-agents/tree/78ce312/tests>.
[^commonsr1]: agentik-dev/agentik-commons, "design/agentik-r1.md", section 4.2, commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/design/agentik-r1.md>.
