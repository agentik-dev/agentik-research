# agentik-research: the research site. `make setup` once, then `make check`.
PY      ?= python3
RESPEAK := .sources/agentik-respeak/plugin/scripts
HYGIENE := .sources/agentik-commons/scripts/hygiene

.PHONY: setup sources deps npm check structure style hygiene site a11y links shots serve include

setup: sources deps npm

sources:
	bash scripts/sources

# A system python may refuse a plain install (PEP 668); retry with the override.
deps:
	$(PY) -m pip install -q -r requirements.txt || $(PY) -m pip install -q --break-system-packages -r requirements.txt

# Chromium for Playwright: the pinned build when installed, else the cloud
# image's /opt/pw-browsers/chromium (scripts/lib/site.mjs); never downloaded here.
npm:
	PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci --no-audit --no-fund

check: structure style hygiene site a11y links

structure:
	$(PY) scripts/check

style:
	RESPEAK_PYTHON="$$(command -v $(PY))" bash $(RESPEAK)/respeak-check.sh

hygiene:
	$(PY) $(HYGIENE) --repo .

site:
	$(PY) -m mkdocs build --strict --quiet

# axe on every page, light and dark; fails on a serious or critical violation.
a11y:
	node scripts/a11y.mjs

# linkinator over site/; fails on a broken internal link, lists external
# failures in .cache/links.txt. LINKS_EXTERNAL=0 skips the external links.
links:
	node scripts/links.mjs

# Every page at 390, 768, 1280 and 1680 px, light and dark, into .cache/shots/.
# PAGES=index,journal/ WIDTHS=390 SCHEMES=dark narrow a run. Needs `make site`.
shots:
	node scripts/shots.mjs

serve:
	$(PY) -m mkdocs serve

# Re-render .claude/respeak/include.md after .claude/respeak/config.yaml changes
# (commit the config first: the render reads what git tracks).
include:
	RESPEAK_PYTHON="$$(command -v $(PY))" $(RESPEAK)/py respeak-include.py write
