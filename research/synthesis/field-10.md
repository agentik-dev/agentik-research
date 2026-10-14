# Field 10: Cost lanes

## The question
API-billed and subscription use and local models; routing work to the lane that fits it.

## Findings
Measured:
- Fresh tasks, 15 May to 1 July 2026 (111 problems, hosted runs): Fable 5 64.5 percent at 4.40 dollars per problem, Sonnet 5 56.8 at 1.43, Qwen3.6-27B 31.2 at 0.62. [swe-rebench-leaderboard; measured]
- Maker's card, self-reported: Qwen3.8-27B scores 61.7 on SWE-bench Pro against 53.4 for Opus 4.6 Max, both through the Claude Code harness. It is not on the board above. [qwen38-27b-model-card; measured, vendor-run]
- RouteLLM sent 13.4 percent of MT Bench calls to the strong model for 95 percent of its quality, but 35.4 percent (92 percent) on MMLU and 33.6 percent (87 percent) on GSM8K. [ong-routellm; measured]
- Across 21 datasets and 33 models, top routers gained up to 4 percent accuracy or saved up to 31.7 percent cost; several lost to the best single model, OpenRouter by 24.7 percent. [li-llmrouterbench; measured]
- Anthropic's internal evals: an Opus 5.5 executor with a Fable 5.1 advisor gained 1.7 points for 2.1 times the cost. A Fable 5 orchestrator with a Sonnet worker halved cost on an easy slice, then lost on the full set. Sweep effort first. [anthropic-optimizing-cost-intelligence; measured, vendor]

Documented, as of October 2026:
- Plans: Pro 20 dollars a month, Max 100 (5x) or 200 (20x), Team seat 25 or 125. A rolling five-hour window plus weekly limits; chat and Claude Code share one pool; no token counts. [claude-pricing-plans; documented]
- Past a limit, Pro and Max can enable usage credits at standard API rates under a monthly cap. [support-claude-extra-usage; documented]
- API, per million input/output tokens: Sonnet 5.5 2/10 dollars, Opus 5.5 4/20, Haiku 5.5 0.10/0.50; cache reads 0.05 times input on Sonnet and Opus 5.5; batch 50 percent off. [anthropic-pricing-doc; documented]
- A gateway credential, key or helper replaces the login; plan limits stop applying and the credential's owner pays per token. A base URL alone keeps the login. Anthropic does not support routing Claude Code to non-Claude models. [code-docs-llm-gateway; documented]
- Remote Control is off under a non-Anthropic base URL. Voice dictation and Remote Control are off while a key, token or helper is active. [code-docs-llm-gateway-connect; documented]
- In `-p` runs `ANTHROPIC_API_KEY` is always used when set; `--bare` never reads the login. [code-docs-authentication; code-docs-headless-unattended; documented]
- Max and Team include API credits (100 or 200 dollars; Team up to 500 pooled). They cover the Agent SDK and API, not interactive Claude Code; `claude -p` only with a key from the linked organisation. [support-claude-api-credits-max-team; documented]
- Agent SDK and `claude -p` on a plan login: the 15 June 2026 change was paused and usage still counts against plan limits. [support-claude-agent-sdk-plan; documented]
- Ollama lacks prompt caching, `tool_choice` and `count_tokens`; its default context is 4k under 24 GiB, and agents need at least 64,000 tokens. [ollama-anthropic-compatibility; ollama-context-length; documented]
- A subagent `model` takes sonnet, opus, haiku, fable or inherit; Anthropic advises Haiku for cheap work. [code-docs-sub-agents-budgets; documented]
- A `-p` run with no permission host denies prompts, tells Claude not to retry, and lists denials in `permission_denials`. [code-docs-headless-unattended; documented]

Reported:
- An 80B Q4 model on a 64 GB Mac: 23 tokens/s generation, 20 tokens/s prompt evaluation, a 66-minute session; Ollama held 16,384 tokens while Claude Code assumed 180,000. [kodam-80b-local-claude-code; reported]
- A 35B mixture-of-experts model on a 36 GB Mac: prompt processing 610 tokens/s at 1K context, 527 at 13K; about 31 tokens/s generation; occasional invented tool names. [stevenpg-claude-code-apple-silicon; reported]
- One heavy Opus user: about 10B tokens, over 15,000 dollars API-equivalent, about 800 dollars paid on Max. [ksred-claude-code-pricing-guide; reported]

## The lanes
| Lane | Cost and limits | Fits | Cannot | Evidence |
|---|---|---|---|---|
| API-billed (key, gateway, cloud) | Per token; org rate and spend limits | Unattended `-p`, `--bare`, fan-out | Remote Control, voice, routines | code-docs-authentication; documented |
| Subscription | Flat fee; five-hour and weekly windows; credits beyond | Interactive work | Third-party SDK login; Fable is capped or credit-billed | claude-pricing-plans; documented |
| Local model | No token charge; hardware-bound; 64k context floor | Small, tool-light tasks | Caching, advisor; a gateway is unsupported | stevenpg-claude-code-apple-silicon; reported |

## Disputes
- SDK billing: Anthropic says the June change was paused; a guide says it took effect [buildthisnow-max-vs-api; reported]. Anthropic's banner and its linked article differ on `claude -p`.
- Local quality: a self-reported card against an independent board that measured only the predecessor. No source measures tool-call accuracy for 27B-class models; the invented-tool-name report is anecdote.
- Routing: RouteLLM and LLMRouterBench disagree on benchmarks; neither tests coding agents.
- Break-even: the 15,000 dollars is API-equivalent, not saved money, and plan sizes are unpublished. Anecdote.

## What this says about the agentik claims
- (a) Separate budgets: supported [code-docs-llm-gateway; documented]. Windows as the binding limit: unmeasured [conjecture].
- (b) Remote Control: supported. Voice dictation: not supported as stated; the page ties it to keys, not a base URL [code-docs-llm-gateway-connect; documented].
- (c) Placeholder after full cost: not in the docs [code-docs-headless-unattended; documented]. The 3 of 4 runs are our use.
- (d) Local speeds: same order as the reports above; the 26k-token turn has no outside check [kodam-80b-local-claude-code; reported].
- (e) Name-only routing: not contradicted, not shown sufficient; studies route on query difficulty and none on privacy [ong-routellm; measured].
- (f) SDK API-billed: contradicted as a blanket claim; billing follows the credential [support-claude-agent-sdk-plan; documented].

## Candidate practices
- Pick the credential per run: unset `ANTHROPIC_API_KEY` for plan work, pass a key to `--bare`, check `/status`. [code-docs-authentication; documented]
- Sweep effort before switching models or adding a router. [anthropic-optimizing-cost-intelligence; measured, vendor]
- Give a local lane 64,000 tokens of context and check `ollama ps`. [ollama-context-length; documented]
- Read `permission_denials`, not the success flag, before paying for a delegate's output. [code-docs-headless-unattended; documented]

## Sources
- swe-rebench-leaderboard: SWE-rebench project, "SWE-rebench leaderboard", window to 2026-07-01, https://swe-rebench.com/
- qwen38-27b-model-card: Qwen, "Qwen3.8-27B", 2026-08, https://huggingface.co/Qwen/Qwen3.8-27B
- ong-routellm: Ong et al., "RouteLLM: Learning to Route LLMs with Preference Data", 2024-06, https://arxiv.org/abs/2406.18665
- li-llmrouterbench: Li et al., "LLMRouterBench", 2026-01, https://arxiv.org/abs/2601.07206
- anthropic-optimizing-cost-intelligence: Anthropic, "Multi-model strategies: advisor and orchestrator", undated, https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence
- claude-pricing-plans: Anthropic, "Claude pricing", undated, https://claude.com/pricing
- support-claude-extra-usage: Anthropic, "Manage usage credits for paid Claude plans", undated, https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans
- anthropic-pricing-doc: Anthropic, "Pricing", undated, https://platform.claude.com/docs/en/about-claude/pricing
- code-docs-llm-gateway: Anthropic, "Other LLM gateways", undated, https://code.claude.com/docs/en/llm-gateway
- code-docs-llm-gateway-connect: Anthropic, "Connect Claude Code to an LLM gateway", undated, https://code.claude.com/docs/en/llm-gateway-connect
- code-docs-authentication: Anthropic, "Authentication", undated, https://code.claude.com/docs/en/authentication
- code-docs-headless-unattended: Anthropic, "Run Claude Code programmatically", undated, https://code.claude.com/docs/en/headless
- code-docs-sub-agents-budgets: Anthropic, "Subagents", undated, https://code.claude.com/docs/en/sub-agents
- support-claude-api-credits-max-team: Anthropic, "Monthly API credits for Max and Team plans", undated, https://support.claude.com/en/articles/17154008
- support-claude-agent-sdk-plan: Anthropic, "Use the Claude Agent SDK with your Claude plan", 2026-10, https://support.claude.com/en/articles/15036540-use-the-agent-sdk-with-your-claude-plan
- ollama-anthropic-compatibility: Ollama, "Anthropic compatibility", undated, https://docs.ollama.com/api/anthropic-compatibility
- ollama-context-length: Ollama, "Context length", undated, https://docs.ollama.com/context-length
- kodam-80b-local-claude-code: Vijay Kodam, "I Ran an 80B Coding Model Locally with Claude Code", 2026-02-14, https://vijay.eu/co-authored/80b-coding-model-locally-claude-code-ollama/
- stevenpg-claude-code-apple-silicon: unnamed author, "Running Claude Code Locally on Apple Silicon", 2026-05-20, https://stevenpg.com/posts/running-claude-code-locally-on-apple-silicon/
- ksred-claude-code-pricing-guide: Kyle Redelinghuys, "Claude Code Pricing Guide", 2026-02-23, https://www.ksred.com/claude-code-pricing-guide-which-plan-actually-saves-you-money/
- buildthisnow-max-vs-api: speedy_devv, "Claude Code Max Plan vs API Cost", 2026-06-15, https://www.buildthisnow.com/blog/guide/development/claude-code-max-plan-vs-api
