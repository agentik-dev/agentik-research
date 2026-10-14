# Fix prompt: agentik-respeak

Paste into a Claude Code session in the agentik-respeak repository. The research site read the repository at commit 319f060 on 2026-10-14 and re-opened the outside sources behind its design where it could. Each item gives the location the site's notes recorded, what the repository says, what the source says, and the fix. Verify each location first. Open each outside page before editing. Change documentation, comments and configuration text, not behaviour, unless an item says so. Commit per item.

## Numbers and claims to correct

1. **Readability grades.** `plugin/config/respeak.config.yaml` declares `readability_metrics: [flesch_kincaid, gunning_fog]` and a reading grade per mode (6, 9, 12; the 12 marked unverified), and `plugin/scripts/respeak-measure.py` computes sentence length and em-dash density and no grade. The studies the site found say formulas track rated difficulty weakly on specialist text (Zheng and Yu, 2017, r = 0.10 to 0.41 for Flesch-Kincaid, SMOG and Gunning-Fog, <https://pmc.ncbi.nlm.nih.gov/articles/PMC5355629/>) and that two of four formulas did not correlate with cloze scores in one language (Jansen et al., 2017). Fix: either compute the grades and label them as a rough proxy, or remove the declared grades and keep the sentence and paragraph budgets, which GOV.UK (check sentences over 25 words) and the federal guidelines (150-word paragraphs) state directly.

2. **The field-test figures.** `README.md` lines 55 to 71 give the 2026-08-31 n=1 figures (sentence average 32.1 to 24.5 words, em-dashes 19.9 to 3.1 per 1,000 words). `CHANGELOG.md` 0.6.0 says the sentence splitter changed on 2026-09-21 and that earlier sentence figures are stale; the source document was removed (`CHANGELOG.md` line 481). The rendered README size the changelog gives for 0.6.1 (21,453 bytes) is 18,541 at this commit. Fix: re-run the measurement on a document the repository keeps, or mark the sentence row as pre-splitter and drop the stale size.

3. **The `uses` counter.** `plugin/corpus/lexicon.yaml` says its `uses` field is maintained by tooling. No script writes it, and every entry reads `uses: 0`. Fix: say so in the file, or write the counter.

4. **Governance keys.** The config's `shorthand.*` keys (`legibility_floor`, `max_entries` 150, `min_token_edit_distance` 2, retirement after 180 days, review every 90, an audit every 30, the auto-ratification gate) are merged by the resolver, but only `legibility_floor` is named in `plugin/agents/respeak.md`, and `README.md` line 320 lists the cap, expiry and audits as declared and not built. Fix: mark each key in the config as enforced, instruction-only, or not built, so the config reads the same as the README.

5. **Bottom line up front.** The modes cite BLUF and Minto. The site found standards, not measurements: Army Regulation 25-50 (2020) puts the main point first, asks for about 15-word sentences, and bans brevity codes in letters to people outside the Department of Defense; the federal guidelines kept in the plainlanguage.gov repository ask for the bottom line first, one idea per sentence and 150-word paragraphs, while the live digital.gov guide no longer states those rules. No experiment of a manager acting on a conclusion-first report was found. Fix: cite the regulation and the repository copy of the guidelines by date, and describe BLUF as a standard, not a measured effect.

6. **Book years in the research notes.** `research/sources/communication-best-practices.md` and `research/sources/landscape-and-media.md` disagree on Maxwell (2010 against 2009), Sullivan's Simply Said (2017 against 2016) and Minto's Pyramid Principle (1985 or 1996 against "first pub 1978"; Minto's own site says 1987). The Juzek and Ward venue is COLING 2025 on arXiv and ACL Findings in the note. Fix: open a primary page for each and settle the dates.

7. **Dead links.** `docs/references.md` links three Wikipedia pages (conceptual pact, interactive alignment, experimental semiotics) that `research/sources/linguistics-of-expert-shorthand.md` records as 404. Fix: replace or remove them.

8. **The verifier's claim.** `README.md` says the verifier proves a style edit meaning-preserving. `design/review-adv6.md` finding ADV6-4 reproduced an appended false paragraph and a flipped "never" that pass, and the fix was deferred. Fix: say the verifier holds structure, links, code and numbers, and that facts rest on the translator's rule, until the deferred invariant lands.

9. **Proposals directory.** The architecture diagram says `plugin/corpus/proposals/`, the config's `proposal_dir` says `corpus/proposals/`, and the agent, `init` and the README say `.claude/respeak/proposals/`; the code uses the project folder. Fix: one path everywhere.

10. **Install lines and names.** `README.md` still names the marketplace by the plugin's earlier name. Fix: the current `respeak@agentik` form.

11. **Volatile Claude Code facts in the notes.** `design/include-r1.md` section 3 says that in Claude Code 2.1.296 the AGENTS.md loader reads AGENTS.md only in a project with no CLAUDE.md; the research notes rely on a `MessageDisplay` hook, Stop hook input carrying the last assistant message, and plugin front-matter limits that the site did not re-open. Fix: date each as "as of" its version and re-open the Claude Code documentation before citing it in user-facing text.

## Claims the sources support, for the record

Machine-prose tells are measured ("delves" at 28.0 times its expected frequency in 2024 biomedical abstracts, Kobak et al., 2025), and frequent users of a writing model detect machine text where lay readers cannot (Russell et al., 2025; Jakesch et al., 2023). Replacing jargon with plain words raised correct answers from 63.60 to 68.84 percent in a randomised study and a glossary did not (Kerwer et al., 2021). Claude Code's own Concise output style leads with the result and keeps errors and failing tests whole (<https://code.claude.com/docs/en/output-styles>). Among coding-agent runs that made a status claim, one benchmark found a false-success rate of 75.8 percent (Advani, 2026, <https://arxiv.org/abs/2606.09863>).
