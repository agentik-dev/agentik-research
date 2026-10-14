# Fix prompts

One prompt per source repository, written for the owner to paste into a Claude Code session in that repository. Each lists the numbers, calculations and claims about Claude Code or the Anthropic API that the research site's survey found wrong, stale, conditional or unsourced at the commit the site read, with the vendor page that says otherwise as of 2026-10-14. Each item names the file and line the site's notes recorded; verify the location first, since the repository may have moved on.

The prompts change documentation, comments and constants, not behaviour, unless an item says a behaviour rests on the wrong number. The vendor pages are undated and change often, so every value is "as of 2026-10-14"; open the page before you edit.

| Repository | Prompt |
|---|---|
| agentik-session | `FIX-agentik-session.md` |
| agentik-relay | `FIX-agentik-relay.md` |
| agentik-decisions | `FIX-agentik-decisions.md` |
| agentik-respeak | `FIX-agentik-respeak.md` |
| agentik-agents | `FIX-agentik-agents.md` |
| agentik-commons and the organization profile | `FIX-agentik-commons.md` |

The site's own record of each finding is in `docs/tools/<tool>.md` under "What part 1 says", and the sources are in `research/sources/` by slug.
