# Budgets, pacing and cost lanes

Nothing here is measured in the brief's sense. The vendor documents the ceilings, the cache lifetimes and the usage windows, and two practitioners have read their own transcripts. What follows is therefore mostly documented and dated: it is true as of October 2026 and changes often. Three points carry the chapter. A turn resends the whole conversation, so cost scales with turns times context only while the prompt cache is warm, and every miss reprices the context at the write rate.[^caching][^pricing] The money and turn caps for unattended runs are client-side estimates that can overshoot.[^cli] And the three billing lanes, subscription, API key and a local model, differ in what they turn off, not only in what they cost.[^gatewayconnect] This chapter answers research questions 4 and 10.

## Question 4: budgets and pacing

### What the vendor documents, as of October 2026

Prompt cache and prices:

- The main conversation (interactive, `claude -p` and the Agent SDK) gets the one-hour cache lifetime only on a subscription within plan usage. On usage credits, an API key or a cloud provider it gets five minutes. Subagents, workflows, teammates, forks and compaction get five minutes, except server-controlled helpers on a subscription.[^caching] The settings `promptCacheTtl` and `subagentPromptCacheTtl` (`5m` or `1h`, Claude Code 2.1.242 or later) set each bucket.[^settings]
- A cache write costs 1.25 times the base input price for the five-minute lifetime and 2 times for one hour. A read costs 0.1 times, except 0.05 times on Opus 5.5 (0.20 dollars per million tokens) and Sonnet 5.5 (0.10), and 0.025 times on Fable 5.1 (0.25). Caching pays off after one read at five minutes and two reads at one hour.[^pricing]
- Current models list a 1,000,000-token window. Claude 4.6 and later cost the same per token across it. Haiku 5.5 charges more above 100,000 prompt tokens.[^models][^pricing]

Usage limits:

- Subscriptions have a five-hour session limit and a weekly limit shared with chat; Max adds a weekly Fable limit.[^promax] Session and weekly limits span all models, and Opus and Sonnet have per-family limits. One workflow burst can exhaust the weekly limit.[^errors]
- Subagent requests count toward the same limits as the main conversation.[^subagents]
- `autoContinueAtUsageLimit` defaults to true (2.1.234 or later), covers only interactive claude.ai sessions, re-arms at most twice, and is not offered in `-p`, background sessions or API-key use.[^interactive]
- Fable can bill usage credits; in `-p` Claude Code bills them without asking.[^modelconfig]

Ceilings and timers:

- Idle compaction, on by default from 2.1.290, runs after about 54 idle minutes above 200,000 tokens.[^settings]
- `--max-turns` and `--max-budget-usd` work in print mode only and default to no limit. The budget is a client-side estimate that can pass the cap.[^cli] It is checked after each response, so spend can pass the cap by one response plus any running subagents.[^agentloop]
- The status line exposes `rate_limits.five_hour` and `seven_day` with `used_percentage` and `resets_at` in epoch seconds, and `prompt_cache` with `warm`, `ttl`, `hit_ratio` and `misses` (2.1.251 or later).[^statusline]
- The Bash tool times out at 120,000 milliseconds by default, with a maximum of 600,000; a timed-out command moves to the background.[^bash] A command hook times out at 600 seconds by default, a prompt hook at 30 and an agent hook at 60.[^hooktimeouts]
- A self-paced `/loop` waits between 1 minute and 1 hour. `/loop 5m` runs 4 minutes 45 seconds apart so the five-minute cache stays warm. A scheduled task fires on an idle session and resends the full context.[^scheduled][^costs]

### What practitioners report

- Across 63,880 requests the cache hit rate was 96.59 percent token-weighted but 86.41 percent for the median session, where writes were 75.9 percent of the cache cost.[^primeline]
- A per-turn cost table for Opus 4.6: about 0.03 dollars at turn 20 (60,000 tokens), 0.15 at turn 50 (150,000) and over 0.33 at turn 80.[^zivtech]
- One user's 119,866 calls showed one-hour cache writes until 5 March 2026, then five-minute writes (93 percent by 21 March). The October 2026 documentation gives per-bucket lifetimes, so the history matters only for reading older cost data.[^issue46829]

### The cost model

- Each turn resends the whole conversation, priced as uncached input, a cache write or a cache read, plus output.[^costs][^pricing]
- A miss follows a gap past the lifetime, a model switch, a tool-definition change, compaction or an upgrade.[^caching]
- A warm 200,000-token turn costs about 0.04 dollars on Opus 5.5; a cold one-hour rewrite of the same context costs 1.60, forty times as much. The prices are documented; the arithmetic is ours.[^pricing]
- So cost is turns times context only while the cache is warm. That is a conjecture to test by summing cache-creation tokens per session.

### Where the evidence stops

All the cost figures are single-user transcripts. The aggregate 96.59 percent hides the 86.41 percent median, and no source measures a long session's cost across users.[^primeline] No source measures the cost of a self-paced loop against a scheduled task.

## Question 10: cost lanes

### What is measured

- On fresh tasks from 15 May to 1 July 2026, Fable 5 solved 64.5 percent at 4.40 dollars per problem, Sonnet 5 56.8 percent at 1.43, and Qwen3.6-27B 31.2 percent at 0.62.[^rebench] The maker's card for Qwen3.8-27B reports 61.7 on SWE-bench Pro in the Claude Code harness, self-reported and not on that board.[^qwen]
- RouteLLM sent 13.4 percent of MT Bench calls to the strong model for 95 percent of its quality, but needed 35.4 percent on MMLU and 33.6 percent on GSM8K.[^routellm] Across 21 datasets and 33 models, the best routers gained up to 4 percent accuracy or saved up to 31.7 percent cost, and several lost to the best single model.[^routerbench]
- Anthropic's internal evaluations: an Opus 5.5 executor with a Fable 5.1 advisor gained 1.7 points for 2.1 times the cost; a Fable 5 orchestrator with a Sonnet worker halved cost on an easy slice, while Fable 5 alone was 22 to 30 percent cheaper on the full set. The page's advice is to sweep effort first.[^costintel]

### What the vendor documents, as of October 2026

- Plans: Pro at 20 dollars a month, Max at 100 (5x) or 200 (20x), Team seats at 25 or 125. The rolling five-hour window and the weekly limit are shared with chat, and no token counts are published.[^plans] Past a limit, Pro and Max can enable usage credits at API rates under a monthly cap.[^extrausage]
- API prices per million input and output tokens: Sonnet 5.5 at 2 and 10 dollars, Opus 5.5 at 4 and 20, Haiku 5.5 at 0.10 and 0.50; batch is 50 percent off.[^pricing]
- A gateway credential, an API key or a helper replaces the login: plan limits stop and the credential's owner pays per token. A base URL alone keeps the login. Anthropic does not support non-Claude models behind a gateway.[^gateway] Remote Control is off under a non-Anthropic base URL; voice dictation and Remote Control are off while a key, token or helper is active.[^gatewayconnect]
- In `-p` runs `ANTHROPIC_API_KEY` is always used when set; `--bare` never reads the login.[^auth][^headless]
- Max and Team include monthly API credits (100 or 200 dollars; Team up to 500 pooled) for the Agent SDK and the API, not for interactive Claude Code; `claude -p` counts only with a key from the linked organisation.[^apicredits] The change announced for 15 June 2026, which would have billed the SDK and `claude -p` separately on a plan login, was paused; that usage counts against plan limits.[^sdkplan]
- Ollama's Anthropic-compatible endpoint lacks prompt caching, `tool_choice` and `count_tokens`. Its default context is 4k on machines under 24 GiB, and the page advises 64,000 or more for agents.[^ollamacompat][^ollamactx]
- A subagent's `model` takes an alias or inherits; Anthropic advises Haiku for cheap work.[^subagents]

### What practitioners report

- An 80B four-bit model on a 64 GB Mac: 23 tokens a second of generation, 20 of prompt evaluation, a 66-minute session; Ollama held 16,384 tokens while Claude Code assumed 180,000.[^kodam]
- A 35B mixture-of-experts model on a 36 GB Mac: prompt processing at 610 tokens a second at 1K context and 527 at 13K; about 31 tokens a second of generation; occasional invented tool names.[^stevenpg]
- One heavy Opus user: about 10 billion tokens, over 15,000 dollars API-equivalent, about 800 dollars paid on Max. API-equivalent is a size, not a saving, and plan sizes are unpublished.[^ksred]

### The three lanes

| Lane | Cost and limits | Fits | Cannot | Evidence |
|---|---|---|---|---|
| API-billed | Per token; organisation spend limits | Unattended `-p` and `--bare` runs, fan-out | Remote Control, voice dictation | Documented[^gatewayconnect] |
| Subscription | A flat fee; five-hour and weekly windows | Interactive work | Fable past its own limit, except on credits | Documented[^plans][^modelconfig] |
| Local model | No token charge; bound by hardware; 64k context advised | Small, tool-light tasks | Prompt caching; unsupported by Anthropic | Documented[^ollamacompat] |

### Where sources disagree

- SDK billing. Anthropic's support page says the June change was paused; a third-party guide says it took effect.[^sdkplan][^buildthisnow] The vendor page governs.
- Local quality. A self-reported model card sits against an independent board that measured only the predecessor. No source measures tool-call accuracy for a 27B-class model, and the invented tool names are anecdote.[^qwen][^rebench][^stevenpg]
- Routing. RouteLLM and LLMRouterBench disagree on how much a router saves, and neither tests coding agents.[^routellm][^routerbench]

## What this means for the agentik tools

agentik-session states cache lifetimes and read prices that are partly wrong as of October 2026. One hour for the main loop and five minutes for subagents hold only on a subscription within plan usage,[^caching] and the 0.1 times read rate is 0.05 on Opus 5.5 and Sonnet 5.5 and 0.025 on Fable 5.1.[^pricing] Its reading of usage limits is right: shared limits, no wait in `-p`, auto-continue on by default, Fable credits.[^subagents][^interactive] Its status-line field name is wrong (`used_percentage`, not `percentUsed`),[^statusline] and so are its timeouts: Bash defaults to 120 seconds, not 600, and a command hook to 600 seconds, not 60.[^bash][^hooktimeouts] Its observation that a 3,600-second scheduled wake lands 36 to 48 seconds late is not in the documentation; the repo saw it in its own cache audit.[^sessionnth]

agentik-agents is right that seat work and API spend are separate budgets,[^gateway] and that Remote Control is off under a non-Anthropic base URL; voice dictation is tied to keys rather than the base URL.[^gatewayconnect] Its claim that the Agent SDK is API-billed is contradicted as a blanket statement: billing follows the credential.[^sdkplan] Its router routes on the model name alone; the routing studies route on query difficulty, and none routes on privacy, so name-only routing is neither contradicted nor shown sufficient.[^routellm]

## Practices this evidence supports

- Set `--max-turns` and `--max-budget-usd` on every unattended run, with headroom for the overshoot. Documented.[^cli][^agentloop]
- Keep a self-paced wait under the cache lifetime in force, and know which lifetime you have. Documented.[^scheduled][^caching]
- Pick the credential per run: unset `ANTHROPIC_API_KEY` for plan work, pass a key to `--bare`, and check `/status`. Documented.[^auth]
- Sweep effort before switching models or adding a router. Measured, vendor-run.[^costintel]
- Give a local lane 64,000 tokens of context and check what the server holds. Documented.[^ollamactx]

## Sources

[^caching]: Anthropic, "How Claude Code uses prompt caching", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/prompt-caching>.
[^pricing]: Anthropic, "Pricing", documentation read 2026-10-14, <https://platform.claude.com/docs/en/about-claude/pricing>.
[^cli]: Anthropic, "CLI reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/cli-reference>.
[^gatewayconnect]: Anthropic, "Connect Claude Code to an LLM gateway", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/llm-gateway-connect>.
[^settings]: Anthropic, "Settings reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/settings-reference>.
[^models]: Anthropic, "Models overview", documentation read 2026-10-14, <https://platform.claude.com/docs/en/models/overview>.
[^promax]: Anthropic, "Using Claude Code with your Pro or Max plan", support article read 2026-10-14, <https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan>.
[^errors]: Anthropic, "Error reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/errors>.
[^subagents]: Anthropic, "Create custom subagents", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/sub-agents>.
[^interactive]: Anthropic, "Interactive mode", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/interactive-mode>.
[^modelconfig]: Anthropic, "Model configuration", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/model-config>.
[^agentloop]: Anthropic, "How the agent loop works", Claude Agent SDK documentation read 2026-10-14, <https://code.claude.com/docs/en/agent-sdk/agent-loop>.
[^statusline]: Anthropic, "Customize your status line", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/statusline>.
[^bash]: Anthropic, "Tools reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/tools-reference>.
[^hooktimeouts]: Anthropic, "Hooks reference", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/hooks>.
[^scheduled]: Anthropic, "Run prompts on a schedule", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/scheduled-tasks>.
[^costs]: Anthropic, "Manage costs effectively", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/costs>.
[^primeline]: Robin, Primeline, "Is Your Claude Code Cache Really 96% Efficient?", 30 August 2026, <https://primeline.cc/blog/claude-md-cache-cost>.
[^zivtech]: Alex Urevick-Ackelsberg, Zivtech, "The Economics of Claude Code, Part 1: Session Timing", 22 April 2026, <https://www.zivtech.com/blog/economics-of-claude-code-part-1-session-timing>.
[^issue46829]: Issue reporter, "Cache TTL silently regressed from 1h to 5m", anthropics/claude-code issue 46829, 12 April 2026, <https://github.com/anthropics/claude-code/issues/46829>.
[^rebench]: SWE-rebench project, "SWE-rebench leaderboard", read 2026-10-14, <https://swe-rebench.com/>.
[^qwen]: Qwen, "Qwen3.8-27B", model card read 2026-10-14, <https://huggingface.co/Qwen/Qwen3.8-27B>.
[^routellm]: Isaac Ong et al., "RouteLLM: Learning to Route LLMs with Preference Data", June 2024, <https://arxiv.org/abs/2406.18665>.
[^routerbench]: Li et al., "LLMRouterBench", January 2026, <https://arxiv.org/abs/2601.07206>.
[^costintel]: Anthropic, "Optimizing for cost and intelligence: multi-model strategies", documentation read 2026-10-14, <https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence>.
[^plans]: Anthropic, "Claude pricing", read 2026-10-14, <https://claude.com/pricing>.
[^extrausage]: Anthropic, "Manage usage credits for paid Claude plans", support article read 2026-10-14, <https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans>.
[^gateway]: Anthropic, "Other LLM gateways", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/llm-gateway>.
[^auth]: Anthropic, "Authentication", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/authentication>.
[^headless]: Anthropic, "Run Claude Code programmatically", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/headless>.
[^apicredits]: Anthropic, "Monthly API credits for Max and Team plans", support article read 2026-10-14, <https://support.claude.com/en/articles/17154008>.
[^sdkplan]: Anthropic, "Use the Claude Agent SDK with your Claude plan", support article read 2026-10-14, <https://support.claude.com/en/articles/15036540-use-the-agent-sdk-with-your-claude-plan>.
[^ollamacompat]: Ollama, "Anthropic compatibility", documentation read 2026-10-14, <https://docs.ollama.com/api/anthropic-compatibility>.
[^ollamactx]: Ollama, "Context length", documentation read 2026-10-14, <https://docs.ollama.com/context-length>.
[^kodam]: Vijay Kodam, "I Ran an 80B Coding Model Locally with Claude Code", 14 February 2026, <https://vijay.eu/co-authored/80b-coding-model-locally-claude-code-ollama/>.
[^stevenpg]: Steven PG, "Running Claude Code Locally on Apple Silicon", 20 May 2026, <https://stevenpg.com/posts/running-claude-code-locally-on-apple-silicon/>.
[^ksred]: Kyle Redelinghuys, "Claude Code Pricing Guide", 23 February 2026, <https://www.ksred.com/claude-code-pricing-guide-which-plan-actually-saves-you-money/>.
[^buildthisnow]: Build This Now, "Claude Code Max Plan vs API Cost", 15 June 2026, <https://www.buildthisnow.com/blog/guide/development/claude-code-max-plan-vs-api>.
[^sessionnth]: agentik-dev/agentik-session, "NICE_TO_HAVE.md", commit e7f0723, <https://github.com/agentik-dev/agentik-session/blob/e7f0723/NICE_TO_HAVE.md>.
