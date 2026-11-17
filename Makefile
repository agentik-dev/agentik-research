# agentik-site: the research site. `make setup` once, then `make check`.
# The interpreter: the pyenv virtualenv .python-version names (`make venv` makes it)
# when pyenv has it, else python3 (the cloud image, a fresh machine); a caller's PY
# wins. Resolved once, when make reads this file.
ifndef PY
PY := $(shell p="$$(pyenv prefix agentik-site 2>/dev/null)" && [ -x "$$p/bin/python3" ] && echo "$$p/bin/python3" || command -v python3)
endif
HAVE_PYENV := $(shell command -v pyenv 2>/dev/null)
# The browser steps skip, with a line saying so, where node_modules is absent and CI is
# unset or empty; in CI, or with node_modules present, they run, so a missing install is red.
node_run = if [ ! -d node_modules ] && [ -z "$$CI" ]; then echo "$@: skipped, node_modules absent (run make npm)"; else node $(1); fi
RESPEAK := .sources/agentik-respeak/plugin/scripts
HYGIENE := .sources/agentik-commons/scripts/hygiene

.PHONY: setup venv sources deps npm check structure style hygiene site a11y links shots serve include

# With pyenv the packages go into the virtualenv; without it, into the system python.
ifneq ($(HAVE_PYENV),)
setup: sources venv npm
else
setup: sources deps npm
endif

# The virtualenv .python-version names, on pyenv 3.12.7, with requirements.txt.
venv:
	@pyenv virtualenvs --bare | grep -qx '3.12.7/envs/agentik-site' \
		|| pyenv virtualenv 3.12.7 agentik-site
	"$$(pyenv prefix agentik-site)/bin/python3" -m pip install --quiet -r requirements.txt
	@echo "venv: agentik-site, requirements.txt installed"

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
	@$(call node_run,scripts/a11y.mjs)

# linkinator over site/; fails on a broken internal link, lists external
# failures in .cache/links.txt. LINKS_EXTERNAL=0 skips the external links.
links:
	@$(call node_run,scripts/links.mjs)

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
