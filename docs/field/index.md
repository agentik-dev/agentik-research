# The field

Part 1 answers ten questions about what goes wrong when a Claude Code session runs for hours or unattended, and what the evidence says helps. Three of the ten have measured evidence that settles the direction: context length, review loops, and many agents. The rest rest on the vendor's documentation, which is dated and changes often, and on named practitioners' reports. No source measures a Claude Code session as it fills, and no study compares a restart from a written handoff with compaction.[^levy][^huang][^kim]

## The questions and the chapters

| Question | Chapter | Strongest evidence |
|---|---|---|
| 1. How behaviour changes as context grows | [Length and compaction](length-and-compaction.md) | Measured across models: length alone lowers accuracy[^levy] |
| 2. Compaction, summaries or a restart | [Length and compaction](length-and-compaction.md) | Measured on compressors; documented for Claude Code; no restart comparison[^factory] |
| 3. Memory and the always-loaded context | [Memory](memory.md) | Measured: a context file costs 20 percent more and length does not change adherence[^gloaguen] |
| 4. Budgets and pacing | [Budgets, pacing and cost lanes](budgets-and-lanes.md) | Documented only, as of October 2026[^caching] |
| 5. Many agents | [Many agents](many-agents.md) | Measured: +80.8 percent on decomposable work, -70 on sequential[^kim] |
| 6. Unattended runs | [Unattended runs and guardrails](unattended-and-guardrails.md) | Documented; measured on other harnesses[^headless] |
| 7. Guardrails | [Unattended runs and guardrails](unattended-and-guardrails.md) | Documented; vendor-measured classifier rates[^automode] |
| 8. Review that ends | [Review that ends](review.md) | Measured: self-correction without a signal makes answers worse[^huang] |
| 9. Telling people what happened | [Telling people what happened](telling-people.md) | Measured: 75.8 percent of failed runs with a status claim claimed success[^advani] |
| 10. Cost lanes | [Budgets, pacing and cost lanes](budgets-and-lanes.md) | Documented; measured for routers, not coding agents[^routellm] |

## How to read the evidence levels

Every contested claim carries one of five labels. **Measured** means a study or benchmark with a method you can read. **Documented** means the vendor's documentation or changelog says so, and the page gives the date it was read. **Reported** means a named practitioner's write-up. **Our use** means the agentik repos' own record: an incident, a log line, a test, named by repo and commit. **Conjecture** means reasoned but untested, and the page says what would test it.

Two cautions apply across the part. The newest Claude models in the length studies are Opus 4 and Sonnet 4; no independent measurement of a Claude 5.x model at length was found.[^levy] And every vendor fact is as of October 2026: windows, prices, cache lifetimes, timeouts and hook semantics have each changed within the year.[^changelog]

## Sources

[^levy]: Mosh Levy, Alon Jacoby and Yoav Goldberg, "Same Task, More Tokens: the Impact of Input Length on the Reasoning Performance of Large Language Models", February 2024, <https://arxiv.org/abs/2402.14848>.
[^huang]: Jie Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet", October 2023, <https://arxiv.org/abs/2310.01798>.
[^kim]: Yubin Kim et al., "Towards a Science of Scaling Agent Systems", version 3, 8 April 2026 (first version December 2025), <https://arxiv.org/abs/2512.08296>.
[^factory]: Factory Research, "Evaluating Context Compression for AI Agents", 16 December 2025, <https://factory.com/news/evaluating-compression>.
[^gloaguen]: Gloaguen et al., "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?", February 2026, <https://arxiv.org/abs/2602.11988>.
[^caching]: Anthropic, "How Claude Code uses prompt caching", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/prompt-caching>.
[^headless]: Anthropic, "Run Claude Code programmatically", Claude Code documentation read 2026-10-14, <https://code.claude.com/docs/en/headless>.
[^automode]: Anthropic Engineering, "How we built Claude Code auto mode: a safer way to skip permissions", 25 March 2026, <https://www.anthropic.com/engineering/claude-code-auto-mode>.
[^advani]: Advani, "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents", June 2026, <https://arxiv.org/abs/2606.09863>.
[^routellm]: Isaac Ong et al., "RouteLLM: Learning to Route LLMs with Preference Data", June 2024, <https://arxiv.org/abs/2406.18665>.
[^changelog]: Anthropic, "Claude Code changelog", documentation page read 2026-10-14, entries to 9 October 2026, <https://code.claude.com/docs/en/changelog>.
