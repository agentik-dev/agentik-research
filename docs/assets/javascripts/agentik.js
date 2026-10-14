/* agentik.js: the site's own config script, loaded after the glass kit's
 * glass-browse.js and glass-cards.js.
 *
 * It registers the sources browse (docs/sources.md mounts it; the rows are
 * docs/assets/data/sources.json, written by scripts/sources-page). Once the
 * browse has drawn its table, the static list below it folds away behind a
 * button; without JavaScript, or if the rows fail to load, the list stays.
 */
(function () {
  "use strict";
  if (!window.GlassBrowse) return;

  var LEVELS = ["measured", "documented", "reported", "our use"];
  /* Years sort as years; a source that states no date ("undated") sinks below
   * the dated ones when the newest come first. */
  var YEARS = ["undated"];
  for (var yr = 1900; yr <= 2100; yr++) YEARS.push(String(yr));

  GlassBrowse.register({
    sources: {
      filters: [
        { param: "level", key: "l", label: "Evidence", primary: true },
        { param: "kind", key: "k", label: "Kind", primary: true },
        { param: "question", key: "qs", label: "Question", primary: true },
        { param: "page", key: "p", label: "Cited on", primary: true },
        { param: "year", key: "y", label: "Year" }
      ],
      cols: [
        { key: "t", label: "Source", link: "u", wrap: true },
        { key: "a", label: "Author", wrap: true },
        { key: "y", label: "Year", ordinal: YEARS },
        { key: "l", label: "Evidence", badge: "ev", ordinal: LEVELS },
        { key: "k", label: "Kind" },
        { key: "p", label: "Cited on", wrap: true }
      ],
      sortKey: "y",
      sortDir: -1,
      tieBreak: "l",
      searchPlaceholder: "Search titles, authors, pages…",
      emptyText: "No source matches",
      emptyHint: "Clear a filter or shorten the search."
    }
  }, { order: { level: LEVELS } });

  /* Fold the static list once the browse has drawn its table. */
  function foldStaticList() {
    var mount = document.querySelector('.gb-browse[data-page="sources"]');
    var list = document.querySelector(".ak-static-list");
    if (!mount || !list || list.dataset.akFolded) return;
    var done = function () {
      if (!mount.querySelector("table") || list.dataset.akFolded) return false;
      list.dataset.akFolded = "1";
      list.hidden = true;
      var p = document.createElement("p");
      p.className = "ak-static-toggle";
      var b = document.createElement("button");
      b.type = "button";
      b.className = "md-button";
      b.textContent = "Show the full list as text";
      b.setAttribute("aria-expanded", "false");
      b.addEventListener("click", function () {
        list.hidden = !list.hidden;
        b.setAttribute("aria-expanded", String(!list.hidden));
        b.textContent = list.hidden ? "Show the full list as text" : "Hide the full list";
      });
      p.appendChild(b);
      list.parentNode.insertBefore(p, list);
      return true;
    };
    if (done()) return;
    var obs = new MutationObserver(function () { if (done()) obs.disconnect(); });
    obs.observe(mount, { childList: true, subtree: true });
  }

  /* A sidebar that scrolls must take keyboard focus (WCAG 2.1.1; axe:
   * scrollable-region-focusable). Material's journal post sidebar can
   * overflow with no link inside it, so it gets a tab stop only then. */
  function focusableScrollers() {
    document.querySelectorAll(".md-sidebar__scrollwrap").forEach(function (el) {
      var scrolls = el.scrollHeight > el.clientHeight + 1;
      if (scrolls && !el.querySelector("a[href], button, input")) {
        el.setAttribute("tabindex", "0");
        el.setAttribute("role", "region");
        el.setAttribute("aria-label", "Page details");
      }
    });
  }

  function onPage() {
    setTimeout(function () { foldStaticList(); focusableScrollers(); }, 0);
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(onPage);
  } else {
    document.addEventListener("DOMContentLoaded", onPage);
  }
})();
