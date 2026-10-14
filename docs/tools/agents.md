# agentik-agents

agentik-agents routes the work a Claude Code session delegates to one of three lanes: headless runs billed to an API key, the interactive subscription seat, or a local model behind a loopback router. It is for one owner who hands work out of Claude Code sessions, and its evidence is our use. Every measurement in the repo is that owner's: the local lane on one Mac, one model family and small tasks, and the API lane on a handful of runs. The repo records no case of the local lane keeping the seat under a usage window.[^readme][^design01] The page describes the repo at its head on 2026-10-14, commit f986500. A claim cited to the first public commit, 78ce312, reads the same at the head unless the page says the head changed it. The test re-run under Does it work? is the one result tied to 78ce312 alone.[^commits]

## The problem

You hand work out of a Claude Code session: a subagent, a headless run, a review split into shards. Each piece bills somewhere, and the bills come in two currencies that the README says cannot be summed. A delegated run can fail quietly and still bill in full. A session also reaches one API endpoint, so a local model cannot serve its subagents without a proxy. Those three facts are why the tool exists.[^readme][^design01]

The repo's record, failure by failure:

- **Two currencies and a free lane.** The README says summing them is meaningless, so its cost tool reports them side by side. API spend is real dollars from a usage log. Seat work is priced at list rates as equivalent dollars. The local lane is zero dollars, counted in tokens and wall time.[^readme] The README states one pair, dated 2026-08-13: 3.13 dollars of API spend beside 155.78 of seat-absorbed work. It calls the seat figure a lower bound. The tool sums a per-project usage field, and no Claude Code page says whether that field is cumulative. It also prices the seat's cache writes at the five-minute 1.25 times input, while a subscription's main conversation gets one-hour writes at 2 times.[^readmehead]
- **Delegation fails quietly and bills.** Three of four delegates that tried a denied tool returned a schema-valid placeholder after full cost. One of them spent 2.15 dollars over 14 turns. In an eight-shard review fan-out, two shards ran 8 to 10 turns and cost 1.02 dollars combined. Both returned a placeholder, and the envelope said success. Of that fan-out's spend, 33 percent bought nothing, by the README's measurement of 2026-08-13. A run that tripped a 0.01-dollar cap did report an error, but it overshot to 0.0117 and returned no result. Eight shards at the default 10-dollar ceiling expose 80 dollars.[^bin][^readme][^readmehead]
- **Containment that did not contain.** `--allowedTools` pre-approves a set and restricts nothing. A red team found that a shell command could run inside a read-only profile, and the gap was reproduced. The fix is `--tools`. A deny-list over the caller's arguments was defeated four ways. An allow-list replaced it: it builds the child's arguments and sends the prompt on stdin. `Read` is not confined to `--add-dir`: a probe read a private key.[^readme]
- **One endpoint per session.** A session cannot name a provider per agent. The local lane therefore puts a router on loopback that decides by the request's model name.[^design01]
- **The local model's traps.** The repo measured them on 2026-09-04 on an Apple Silicon Mac with 128 GB of memory and a 27B model. An unpinned reasoning effort took 4 minutes 56 seconds on a three-line file. A run with Claude Code's token reminder took 36.0 seconds of prefill on its second turn, against 0.38 for a run without it. The two runs also differed in system-prompt length and were not compared directly. A 54-tool agent sent about 31,000 input tokens and took 172 seconds on its first turn and 180 on its second. One Ollama version returned HTTP 500 on every non-bare request.[^readme][^design01][^evidence]
- **The tools' own defects.** A review round on 2026-09-05 found reproducible defects on all five surfaces. A two-entry header deny-list let cookies reach the local backend. A chunked body lost its model name and went upstream on the seat's credential. Both plugin skills granted nothing because of a wrong front-matter key. Four stated measurements failed a check against their own logs. A reviewer's `pkill` matched its own shell and killed the production router.[^review]

## A human example: task shifting in health care

Health systems short of doctors move tasks to workers with less training, a practice called task shifting. The World Health Organization's guidelines of 2008 are listed as a set of 22 recommendations for countries that are considering adopting or extending it.[^who] A systematic review of HIV care in Africa defines task shifting as delegating tasks that physicians perform to staff with lower-level qualifications. It included 84 studies from 10 sub-Saharan countries. The most common shift moved starting and monitoring antiretroviral therapy from doctors to nurses and other non-physician clinicians. Nine studies found equal or better quality of care; those are counts of studies, not effect sizes. The authors attach conditions: training, support and pay for staff in new roles, integration into teams, and regulatory compliance.[^callaghan]

A Cochrane review pooled 18 randomised trials of nurses working in place of primary care doctors, all but one in high-income countries. Across 8 trials and 36,529 participants, deaths were 6.29 per 1,000 under doctor-led care and 4.84 per 1,000 under nurse-led care: a risk ratio of 0.77, with a 95 percent confidence interval of 0.57 to 1.03. The interval spans no difference, and the authors rate the evidence low certainty. Patient satisfaction was slightly higher with nurses, at moderate certainty. The effect on cost is uncertain, and in many trials the nurse could ask a doctor for advice.[^laurant]

Nurses are an analogy for a cheaper lane, not evidence for one. agentik-agents shifts delegated work the same way: it sends each task to the API-billed lane, the subscription seat or a local model by what the task needs, and the cheaper lane has to be checked for the work it is given.

## What the research teaches

Part 1 backs the split into separate budgets and most of the repo's reading of the platform. It corrected one claim, on voice dictation, which the repo changed on 2026-10-14. It finds no documented cause for the quiet placeholder, and leaves name-only routing and a local model's tool-call accuracy unmeasured.

**What it supports.**

- Seat work and API spend are separate budgets, as <span class="ev ev-documented">documented</span>: a gateway credential, an API key or a helper replaces the login, and plan limits stop.[^gateway] Billing follows the credential, not the entry point: on a plan login, your SDK and `claude -p` usage counts against plan limits.[^sdkplan] See [Budgets, pacing and cost lanes](../field/budgets-and-lanes.md).
- Remote Control is off under a non-Anthropic base URL, as the repo says.[^gatewayconnect]
- Subagents continue after a denial, as documented.[^changelog]
- The repo measured local generation at 11 tokens a second for prose.[^readme] Two practitioners report 23 and 31 on other models and machines: the same order, not the same figure.[^kodam][^stevenpg]

**Where it cuts against the repo, or stays silent.**

- The documentation ties voice dictation to a key, a token or a helper, not to the base URL.[^gatewayconnect] Until 2026-10-14 the repo said a base URL turns dictation off; the fix is listed under What has not worked, and what is open.
- The README now says no Claude Code page documents the placeholder returned after full cost. It labels the finding as observed in August 2026, with no Claude Code version recorded, and the repo files a re-test on the current CLI.[^readmehead][^nthhead] The wrapper's comment reasons that a delegate with no way to report a dead end routes around it.[^binhead] That cause is <span class="ev ev-conjecture">conjecture</span>. See [Many agents](../field/many-agents.md).
- Whether the usage windows are the binding limit for long sessions is unmeasured: the repo records no window hit.[^readme]
- The repo measures a local model's tool-call speed, about 25 tokens a second, and its design quotes community reports of "zero failed tool calls across a multi-hour agentic session".[^readme][^design01head] One practitioner reports that tool calling "works most of the time" on a 35B-A3B mixture-of-experts model, with occasional wrong parameter names, missing arguments and invented tool names.[^stevenpg] Neither gives a count of failed calls, so tool-call accuracy stays unmeasured on this page.
- The routing studies found route on query difficulty, and none routes on privacy. Several routers did not reliably beat the best single model.[^routellm][^routerbench] Name-only routing is neither contradicted nor shown sufficient. The vendor advises sweeping effort first.[^costintel]

## The approach

The command names below are the verbs of `agentik-agents`, a shell dispatcher that runs the script behind each verb with its arguments unchanged. Commit a76ff65 added it, and 40fbe9e merged it on 2026-10-13.[^commits][^binhead] The commons record keeps the eight scripts as they are, under their earlier names, with the dispatcher in front of them.[^commonsr1]

### Three lanes

| Lane | What it is | Billed to | Entry point |
|---|---|---|---|
| API-billed | Headless `claude --bare` runs through a wrapper with read-only profiles and a default 10-dollar ceiling | A Console project, in dollars | `agentik agents api`, `agentik agents fanout` |
| Subscription | Plain interactive `claude`; the cost tool prices its usage as equivalent dollars | The seat | `claude` |
| Local model | A seat session whose subagents run on a local model behind a loopback router | Nothing; tokens and wall time are logged | `agentik agents local`, `agentik agents route`, `agentik agents rig` |

### The router

The router decides by one thing: the model name in the request body. A model is local if its name starts with `local/`, is in a configured list, or carries an Ollama-style colon tag; a colon in a name that contains Claude or Anthropic stays upstream. Upstream requests pass every header through unchanged except the hop-by-hop set, which keeps the session on the seat. Local requests get an allow-list of headers, and the seat's credential is stripped. On local routes the router drops the token reminder, sets effort to low when the request names none, and clamps anything above medium. It also clamps `max_tokens` to 8,192, serialises requests, and sends keep-alive pings so Claude Code's stream watchdog does not fire.[^bin][^design01]

Which lane a task gets follows a fit rule: a four-rung ladder, from local for mechanical and bounded work up to the frontier model for orchestration. The acceptance check decides escalation, not the model's confidence. Privacy is not a routing criterion anywhere in the repo.[^bin][^design01]

```mermaid
flowchart LR
  S["Claude Code session, one base URL"] --> R["agentik agents route, a loopback router"]
  R -->|"model name claude-*: headers passed through"| A["Anthropic API, the seat login kept"]
  R -->|"model name local/* or a colon tag"| L["A local backend"]
  L -.-> N["Four adjustments: strip the reminder, clamp effort, clamp max_tokens, one request at a time"]
```

The diagram follows the design's own ASCII form.[^design01]

### The fan-out, the cost log and the rig

- **The fan-out.** `--max-budget-usd` is per process, so the fan-out holds one pool. Each shard reserves before launch and settles at its actual cost, so settled plus in-flight reserves never exceed the budget. The per-shard ceiling is deflated by 1.35 for a measured overshoot of 1.2. That overshoot is one measurement on a 0.01-dollar cap, not a fixed ratio: spend passes the cap by one response plus what running subagents spend, so it scales with the size of the last response. The README calls 1.35 a margin for small caps, not a bound.[^readmehead][^binhead] Each shard's result is classified into one of eight statuses, with `degenerate` for a result that has no substance. The exit code is non-zero unless every shard is `ok`.[^bin][^readme]
- **The cost log.** It holds one line for each run that emits a JSON envelope; text and stream runs are not logged. A line records cost, turns, duration, cache tokens and the names of denied tools. It never holds a prompt or a result. Every run's bill is checked against a price table copied from a published page. Past a 2 percent disagreement, the tool withholds the cache figure and says so.[^readme] On 2026-10-14 the repo checked the table row by row against Anthropic's Pricing page and corrected Sonnet 5.5's cache read from 0.20 to 0.10 dollars per million tokens. It keeps Sonnet 5 at the 3 and 15 dollars per million input and output tokens this account was billed, although the page now lists 2 and 10, and files that row as open.[^binhead][^nthhead]
- **The rig.** A backends file maps `local/<name>` to a server. On 2026-09-05 a new agent shape cost 28 to 37 seconds of prefill on every backend tried. The design concludes from this that prefill bandwidth, not caching, governs latency. The levers are fewer agent shapes and smaller prompts.[^design02]

### Alternatives the repo rejected

This page gathers nine alternatives from design/01 and from corrections the README records. Each row gives the repo's reason and cites its source.

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
| Ollama's own launcher, which points the whole session at a local model | It would take the whole session local; a local main thread is a non-goal[^design01] |

The record names a hosted router, OpenRouter, as a provider whose key the rig tool can store, and the cleartext leak reproduced on 2026-09-05 was an `openrouter_key`. The README's key table has a row for a cloud endpoint you route to instead of Anthropic.[^binhead][^readme] Headless work goes through the CLI, `claude --bare -p`, not the Agent SDK.[^readme][^readmehead]

## Does it work?

<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> One owner's measurements: the local lane on one Mac, one model family and small tasks, and the API lane on a handful of runs. Treat them as sizing evidence, not a test; nothing in the record compares local output with hosted output.

</div>

The record holds dated measurements, one review round and a test suite. It holds no trial.

- **Measurements.** The local lane's figures come from one Apple Silicon Mac with a 27B model, on 2026-09-04, and the rig's from 2026-09-05; both are listed above.[^design01][^design02][^evidence] The fan-out's ceiling rests on one measured overshoot of 1.2, on a 0.01-dollar cap. The README's one cost pair is dated 2026-08-13, and its seat figure is a lower bound.[^bin][^readmehead]
- **The review.** The round of 2026-09-05 checked the repo's own numbers: four stated measurements failed a check against their own logs.[^review]
- **The tests.** They target macOS. This site re-ran them on Linux at the first public commit, 78ce312: five of six failures printed platform output; one, in the API-run suite, was not investigated.[^tests]

What it does not measure:

- Output quality. The record has no quality comparison between local and hosted output, and the local lane ran on one machine, one model family and small tasks.[^design01]
- The seat under a usage window. The repo records no window hit, and no case of the local lane keeping the seat under one.[^readme]
- A local model's tool-call accuracy, and whether routing by model name alone is enough (see What the research teaches).

## What has not worked, and what is open

The failures the record holds are listed under the problem, above. What stays open at the head:

- The launcher can orphan a router on a signal, and two routers were left running in a 200-run reproduction.[^nth]
- The cache best case of 0.38 seconds was measured with flags the launcher does not use. One production run re-prefilled in full.[^design01]
- A profile delegate's working toolset, Read alone under `--bare`, rests on one probe of 2026-08-19 with no Claude Code version recorded. The repo files a re-probe on the current CLI.[^readmehead][^nthhead]
- The placeholder after a denial is unverified on the current CLI, and a re-test is filed.[^nthhead]
- Whether the per-project usage field behind the seat figure is cumulative is unchecked, so that figure stays a lower bound.[^nthhead]

Changed in the record since the first public commit. Each is a change to the text or the price table, not evidence that the tool works:[^commits]

- **The verbs.** At 78ce312 each tool ran under its script name alone. Commit a76ff65, merged in 40fbe9e on 2026-10-13, added the dispatcher behind `agentik agents <verb>`.[^binhead]
- **Voice dictation.** The README, the launcher's comments and design/01 said a non-Anthropic base URL turns voice dictation off. On 2026-10-14, commit 34e1664 changed all three: dictation is off only while a key, a token or a helper is active, and the launcher keeps those unset. The repo has not re-tested it.[^readme][^design01][^readmehead][^design01head]
- **A profile delegate's tools.** The README said a profile delegate has Read, Grep and Glob, while the wrapper said Read alone. On 2026-10-14, commit d7b00b3 changed the README: the delegate is allow-listed Read, Grep and Glob, and under `--bare` it has Read alone.[^readme][^bin][^readmehead]
- **The undated cost pair.** On 2026-10-14, commit 8825efd dated the 3.13 and 155.78 dollar pair to 2026-08-13 and called the seat figure a lower bound.[^readme][^readmehead]
- **The overshoot.** On 2026-10-14, commit 741f036 added that the 1.2 overshoot is one measurement on a 0.01-dollar cap, not a fixed ratio. The factor of 1.35 is unchanged.[^readmehead][^binhead]
- **The price table.** On 2026-10-14, commit 52904aa checked every row against Anthropic's Pricing page and corrected Sonnet 5.5's cache read to 0.10 dollars per million tokens. Commit ee724e2 moved a test's expected cost to match.[^binhead]

## Sources

[^readme]: agentik-dev/agentik-agents, "README.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/README.md>.
[^design01]: agentik-dev/agentik-agents, "design/01-local-agent-lane.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/design/01-local-agent-lane.md>.
[^bin]: agentik-dev/agentik-agents, "bin/", the API wrapper, the router and the fan-out, commit 78ce312, <https://github.com/agentik-dev/agentik-agents/tree/78ce312/bin>.
[^evidence]: agentik-dev/agentik-agents, "design/01-local-agent-lane/", the committed logs, commit 78ce312, <https://github.com/agentik-dev/agentik-agents/tree/78ce312/design/01-local-agent-lane>.
[^review]: agentik-dev/agentik-agents, "design/03-review-2026-09.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/design/03-review-2026-09.md>.
[^design02]: agentik-dev/agentik-agents, "design/02-local-rig.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/design/02-local-rig.md>.
[^nth]: agentik-dev/agentik-agents, "NICE_TO_HAVE.md", commit 78ce312, <https://github.com/agentik-dev/agentik-agents/blob/78ce312/NICE_TO_HAVE.md>.
[^tests]: agentik-dev/agentik-agents, "tests/", re-run by this site on a scratch copy, 2026-10-14, commit 78ce312, <https://github.com/agentik-dev/agentik-agents/tree/78ce312/tests>.
[^readmehead]: agentik-dev/agentik-agents, "README.md", commit f986500, <https://github.com/agentik-dev/agentik-agents/blob/f986500/README.md>.
[^design01head]: agentik-dev/agentik-agents, "design/01-local-agent-lane.md", commit f986500, <https://github.com/agentik-dev/agentik-agents/blob/f986500/design/01-local-agent-lane.md>.
[^binhead]: agentik-dev/agentik-agents, "bin/", the dispatcher, the API wrapper, the fan-out, the cost tool, the launcher and the rig tool, commit f986500, <https://github.com/agentik-dev/agentik-agents/tree/f986500/bin>.
[^nthhead]: agentik-dev/agentik-agents, "NICE_TO_HAVE.md", commit f986500, <https://github.com/agentik-dev/agentik-agents/blob/f986500/NICE_TO_HAVE.md>.
[^commits]: agentik-dev/agentik-agents, "Commits from 78ce312 to f986500", 2026-10-13 to 2026-10-14, <https://github.com/agentik-dev/agentik-agents/compare/78ce312...f986500>.
[^gateway]: Anthropic, "Other LLM gateways", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/llm-gateway>.
[^gatewayconnect]: Anthropic, "Connect Claude Code to an LLM gateway", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/llm-gateway-connect>.
[^kodam]: Vijay Kodam, "I Ran an 80B Coding Model Locally with Claude Code", 14 February 2026, <https://vijay.eu/co-authored/80b-coding-model-locally-claude-code-ollama/>.
[^stevenpg]: Coding Steve, "Running Claude Code Locally on Apple Silicon", 20 May 2026, <https://stevenpg.com/posts/running-claude-code-locally-on-apple-silicon/>.
[^routellm]: Isaac Ong et al., "RouteLLM: Learning to Route LLMs with Preference Data", June 2024, <https://arxiv.org/abs/2406.18665>.
[^routerbench]: Li et al., "LLMRouterBench", January 2026, <https://arxiv.org/abs/2601.07206>.
[^costintel]: Anthropic, "Optimizing for cost and intelligence: multi-model strategies", documentation read 2026-10-14, <https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence>.
[^sdkplan]: Anthropic, "Use the Claude Agent SDK with your Claude plan", support article read 2026-10-14, <https://support.claude.com/en/articles/15036540-use-the-agent-sdk-with-your-claude-plan>.
[^changelog]: Anthropic, "Claude Code changelog", documentation page read 2026-10-14, entries to 9 October 2026, <https://code.claude.com/docs/en/changelog>.
[^commonsr1]: agentik-dev/agentik-commons, "design/agentik-r1.md", sections 4.1 and 4.2, commit e456f4b, <https://github.com/agentik-dev/agentik-commons/blob/e456f4b/design/agentik-r1.md>.
[^who]: World Health Organization, "Task Shifting: rational redistribution of tasks among health workforce teams: global recommendations and guidelines", 2008, listing page read 2026-10-14, <https://chwcentral.org/resources/task-shifting-rational-redistribution-of-tasks-among-health-workforce-teams-global-recommendations-and-guidelines/>.
[^callaghan]: Mike Callaghan, Nathan Ford and Helen Schneider, "A systematic review of task-shifting for HIV treatment and care in Africa", Human Resources for Health 8:8, 31 March 2010, <https://pmc.ncbi.nlm.nih.gov/articles/PMC2873343>.
[^laurant]: Miranda Laurant, Mieke van der Biezen, Nancy Wijers, Kanokwaroon Watananirun, Evangelos Kontopantelis and Anneke JAH van Vught, "Nurses as substitutes for doctors in primary care", Cochrane Database of Systematic Reviews 2018, issue 7, CD001271, July 2018, <https://pmc.ncbi.nlm.nih.gov/articles/PMC6367893>.
