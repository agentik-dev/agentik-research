---
repo: agentik-dev/agentik-respeak
path: tests/
commit: 319f060
title: "respeak tests: eight unittest files and ten bash suites"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Counts made in this survey by counting `def test_` lines per Python file: `test_verify_edit.py` 74, `test_config_layers.py` 75, `test_measure_gate.py` 47, `test_include.py` 37, `test_provider_layer.py` 13, `test_corpus.py` 11, `test_readme.py` 8, `test_hygiene.py` 7: 272 in total, equal to the README's "272 unittest cases". Ten bash suites: `test_bounded.sh`, `test_check.sh`, `test_doctor.sh`, `test_gate_hook.sh`, `test_hooks.sh`, `test_install.sh`, `test_overrides.sh`, `test_readme_fresh.sh`, `test_render.sh`, `test_report_env.sh`, equal to the README's "10 bash suites". The README's table lists 17 of the 18 files; `test_hygiene.py` is not in it.
- What the verifier tests pin (names read): prose edits pass; a changed number, link target, fence, heading, inline code or front matter fails; a wrapped line that begins with `#` becomes a heading and fails; prose-to-list fails (a warning under restructure); code files pass on comment edits only; `--allow-strings` passes string edits but fails a new dict entry, a lost placeholder, a changed number or a changed call; `--prose-keys` and `--dirs` cases.
- What the scanner tests pin: a pre-existing hit is reported and not failed; an introduced hit fails; `--fail-on` semantics; the literal "spine switch" passes while "the spine of the argument" still flags; `gate.allow`; budgets; HTML comments and URLs contribute nothing; bullets split as sentences; a case-sensitive entry flags a stock name but not the brand; setup errors exit 2.
- What the gate hook suite pins: gate enabled blocks (exit 2), disabled is silent, a non-Markdown file is a no-op, folder and user files cannot turn the gate on, a broken python shim or corrupt corpus fails open with a trace line, `block_on` behaviour per baseline source, a file too large to measure fails early.
- `test_corpus.py` (11 tests) scans the shipped corpus with the sentences the 2026-09-21 field run met: the literal sense passes and the cliche still flags for each exempted entry; the two retiered rules land in the density bucket.
- `test_check.sh` pins `respeak-check.sh` and `--verify`; `test_render.sh` the bounded spawns, the renderer's breakers and the README render; `test_readme_fresh.sh` every freshness verdict; `test_readme.py` the README's status line, icon and size.

## Limits
- I read file heads, test names and counts; I did not read test bodies. The tests pin the determinism of the scanner, the verifier, the resolver and the scripts. No test measures token savings, readability grade, or the accuracy of a translator narrative (the translator is a model and has no test); no test exercises the machine lane's lexicon use by agents.

## Used in
- research/synthesis/tools-respeak.md
