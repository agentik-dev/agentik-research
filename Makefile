# agentik-research: the research site. `make setup` once, then `make check`.
PY      ?= python3
RESPEAK := .sources/agentik-respeak/plugin/scripts
HYGIENE := .sources/agentik-commons/scripts/hygiene

.PHONY: setup sources deps check structure style hygiene site serve include

setup: sources deps

sources:
	bash scripts/sources

# A system python may refuse a plain install (PEP 668); retry with the override.
deps:
	$(PY) -m pip install -q -r requirements.txt || $(PY) -m pip install -q --break-system-packages -r requirements.txt

check: structure style hygiene site

structure:
	$(PY) scripts/check

style:
	RESPEAK_PYTHON="$$(command -v $(PY))" bash $(RESPEAK)/respeak-check.sh

hygiene:
	$(PY) $(HYGIENE) --repo .

site:
	$(PY) -m mkdocs build --strict --quiet

serve:
	$(PY) -m mkdocs serve

# Re-render .claude/respeak/include.md after .claude/respeak/config.yaml changes
# (commit the config first: the render reads what git tracks).
include:
	RESPEAK_PYTHON="$$(command -v $(PY))" $(RESPEAK)/py respeak-include.py write
