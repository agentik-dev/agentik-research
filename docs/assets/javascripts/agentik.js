/* agentik.js: the site's own config script, loaded after the glass kit's
 * glass-browse.js and glass-cards.js.
 *
 * It registers the sources browse (docs/sources.md mounts it; the rows are
 * docs/assets/data/sources.json, written by scripts/sources-page): a table on
 * a wide screen, glass-cards' cards below 960 px. Once the browse has drawn,
 * the static list below it folds away behind a button; without JavaScript,
 * or if the rows fail to load, the list stays.
 *
 * On every page (Material's document$ under navigation.instant, else
 * DOMContentLoaded) it also tidies the typeset text:
 *   - marks a footnote mark that directly follows another, for the comma
 *     agentik-site.css puts between them;
 *   - ties a note's first back-link to its last word;
 *   - keeps ISO dates, a number with its unit, and short inline code on one
 *     line;
 *   - wraps each Mermaid diagram in a scroller and gives it a minimum width,
 *     so a wide diagram stays legible and scrolls on a narrow screen;
 *   - marks wide tables, code blocks and diagrams that scroll sideways, for
 *     the edge fade in agentik-site.css, and gives them a tab stop.
 */
(function () {
  "use strict";

  /* ---- The sources browse ------------------------------------------ */

  /* Cards below 960 px, where the table's six columns do not fit. */
  var NARROW = window.matchMedia ? window.matchMedia("(max-width: 59.984375em)") : null;

  function registerBrowse() {
    if (!window.GlassBrowse) return;

    var LEVELS = ["measured", "documented", "reported", "our use"];
    /* Years sort as years; a source that states no date ("undated") sinks
     * below the dated ones when the newest come first. */
    var YEARS = ["undated"];
    for (var yr = 1900; yr <= 2100; yr++) YEARS.push(String(yr));
    /* The Year facet lists the newest year first and "undated" last. Without
     * an order the kit sorts the options and reverses them for "year", which
     * puts "undated" first; an order list replaces that sort (options it does
     * not name are dropped, so it names every year the column can hold). */
    var YEAR_OPTIONS = YEARS.slice(1).reverse().concat(["undated"]);

    var EV = {};
    LEVELS.forEach(function (l) { EV[l] = { text: l, cls: "ev-" + l.replace(/ /g, "-") }; });

    var sources = {
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
      /* The card a narrow screen shows: title and author, then the year, the
       * evidence level, the kind and each page that cites the source. */
      card: {
        href: "u",
        title: "t",
        subtitle: "a",
        pills: [
          { key: "y" },
          { key: "l", map: EV },
          { key: "k" },
          { key: "p", cls: "page" }
        ]
      },
      sortKey: "y",
      sortDir: -1,
      tieBreak: "l",
      searchPlaceholder: "Search titles, authors, pages…",
      emptyText: "No source matches",
      emptyHint: "Clear a filter or shorten the search."
    };
    /* The kit reads cfg.view at every render, so the view follows the width. */
    Object.defineProperty(sources, "view", {
      enumerable: true,
      get: function () { return NARROW && NARROW.matches ? "cards" : "table"; }
    });

    GlassBrowse.register({ sources: sources }, { order: { level: LEVELS, year: YEAR_OPTIONS } });

    /* When the width crosses 960 px, redraw in the other view: an input
     * event on the search box makes the kit apply its state again. */
    if (NARROW) {
      var redraw = function () {
        var q = document.querySelector('.gb-browse[data-page="sources"] .gb-q');
        if (q) q.dispatchEvent(new Event("input"));
      };
      if (NARROW.addEventListener) NARROW.addEventListener("change", redraw);
      else if (NARROW.addListener) NARROW.addListener(redraw);
    }
  }

  /* Fold the static list once the browse has drawn its table or cards. */
  function foldStaticList() {
    var mount = document.querySelector('.gb-browse[data-page="sources"]');
    var list = document.querySelector(".ak-static-list");
    if (!mount || !list || list.dataset.akFolded) return;
    var done = function () {
      if (!mount.querySelector("table, .gb-cards") || list.dataset.akFolded) return false;
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

  /* ---- Sidebars ------------------------------------------------------ */

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

  /* ---- Footnotes ----------------------------------------------------- */

  function isMark(node) {
    return node && node.nodeType === 1 && node.tagName === "SUP" && /^fnref/.test(node.id);
  }

  /* A mark whose previous sibling node, white space aside, is another mark
   * gets .ak-fn-next, and the stylesheet puts a comma before it. Marks with
   * text between them are left alone. */
  function markAdjacentFootnotes(root) {
    root.querySelectorAll('sup[id^="fnref"]').forEach(function (sup) {
      var prev = sup.previousSibling;
      while (prev && prev.nodeType === 3 && !prev.nodeValue.trim()) prev = prev.previousSibling;
      sup.classList.toggle("ak-fn-next", isMark(prev));
    });
  }

  /* A note's first back-link in one unbreakable run with the note's last
   * word, so the hidden icon never wraps onto a blank line of its own: the
   * no-break space Python-Markdown puts before it does not hold, since a line
   * may still break before an inline-block. The stylesheet hides the further
   * back-links of a note cited more than once until the note is hovered,
   * focused or targeted. */
  function groupBackrefs(root) {
    root.querySelectorAll(".footnote li").forEach(function (li) {
      var refs = li.querySelectorAll("a.footnote-backref");
      if (!refs.length || refs[0].parentNode.classList.contains("ak-backrefs")) return;
      var run = document.createElement("span");
      run.className = "ak-backrefs";
      var before = refs[0].previousSibling;
      refs[0].parentNode.insertBefore(run, refs[0]);
      if (before && before.nodeType === 3) {
        var text = before.nodeValue, cut = Math.max(text.lastIndexOf(" "), text.lastIndexOf("\n"), text.lastIndexOf("\t"));
        run.appendChild(document.createTextNode(text.slice(cut + 1)));
        before.nodeValue = text.slice(0, cut + 1);
      }
      run.appendChild(refs[0]);
    });
  }

  /* ---- Line breaks ------------------------------------------------- */

  /* An ISO date or month (2026-10-14, 2026-10), or a number and a short
   * unit (4 KB, 3600 s, 300 ms). */
  var GLUE = /\b\d{4}-\d{2}(?:-\d{2})?\b|\b\d[\d,.]*\s(?:KB|MB|GB|TB|KiB|MiB|GiB|kB|ms|s|min|h|px|USD)\b/g;
  var SKIP = "pre, code, kbd, script, style, textarea, .ak-nobr, .mermaid, .headerlink, .md-clipboard";

  function glueText(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || n.nodeValue.length < 4) return NodeFilter.FILTER_REJECT;
        GLUE.lastIndex = 0;
        if (!GLUE.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        return n.parentElement && n.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var hits = [];
    while (walker.nextNode()) hits.push(walker.currentNode);
    hits.forEach(function (n) {
      var text = n.nodeValue, frag = document.createDocumentFragment(), last = 0, m;
      GLUE.lastIndex = 0;
      while ((m = GLUE.exec(text))) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var span = document.createElement("span");
        span.className = "ak-nobr";
        span.textContent = m[0];
        frag.appendChild(span);
        last = m.index + m[0].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
  }

  /* Inline code breaks after every hyphen. Code of at most 40 characters
   * with no space stays whole; in code with spaces, each word of at most 40
   * characters that holds a hyphen ("-c", "--max-turns") stays whole, and
   * the spaces still break. */
  function glueCode(root) {
    root.querySelectorAll("code").forEach(function (code) {
      if (code.dataset.akGlued || code.closest("pre") || code.children.length) return;
      code.dataset.akGlued = "1";
      var text = code.textContent;
      if (!/\s/.test(text)) {
        if (text.length <= 40) code.classList.add("ak-nobr");
        return;
      }
      if (text.indexOf("-") < 0) return;
      var frag = document.createDocumentFragment();
      text.split(/(\s+)/).forEach(function (part) {
        if (part.length > 1 && part.length <= 40 && part.indexOf("-") >= 0 && /\S/.test(part)) {
          var span = document.createElement("span");
          span.className = "ak-nobr";
          span.textContent = part;
          frag.appendChild(span);
        } else if (part.length) {
          frag.appendChild(document.createTextNode(part));
        }
      });
      code.textContent = "";
      code.appendChild(frag);
    });
  }

  /* ---- Sideways scrolling ------------------------------------------- */

  var SCROLLERS = ".md-typeset__scrollwrap, .md-typeset pre > code, .ak-diagram";

  function scrollState(el) {
    var max = el.scrollWidth - el.clientWidth;
    var state = "";
    if (max > 1) {
      var left = el.scrollLeft > 1, right = el.scrollLeft < max - 1;
      state = left && right ? "both" : left ? "left" : right ? "right" : "";
    }
    if ((el.getAttribute("data-ak-scroll") || "") !== state) {
      if (state) el.setAttribute("data-ak-scroll", state);
      else el.removeAttribute("data-ak-scroll");
    }
    /* A box that scrolls takes keyboard focus when nothing inside it can
     * (axe: scrollable-region-focusable). Material handles code blocks. */
    if (max > 1 && el.tagName !== "CODE" && !el.hasAttribute("tabindex") &&
        !el.querySelector("a[href], button, input, select, textarea, [tabindex]")) {
      el.setAttribute("tabindex", "0");
      el.dataset.akTabstop = "1";
    } else if (max <= 1 && el.dataset.akTabstop) {
      el.removeAttribute("tabindex");
      delete el.dataset.akTabstop;
    }
  }

  function watchScrollers() {
    document.querySelectorAll(SCROLLERS).forEach(function (el) {
      if (!el.dataset.akWatch) {
        el.dataset.akWatch = "1";
        el.addEventListener("scroll", function () { scrollState(el); }, { passive: true });
      }
      scrollState(el);
    });
  }

  var pending = 0;
  function rewatch() {
    if (pending) return;
    pending = window.requestAnimationFrame(function () { pending = 0; watchScrollers(); });
  }
  window.addEventListener("resize", rewatch, { passive: true });

  /* ---- Mermaid diagrams ---------------------------------------------- */

  /* Material renders each diagram into a closed shadow root as an SVG with
   * width 100% and max-width at its drawn width, so it shrinks to fit the
   * column. From outside, the drawn width follows from three heights: the
   * box's height grows with its width at the SVG's aspect ratio until the
   * width reaches the drawn width. The diagram then gets a minimum width of
   * 72 percent of its drawn width (16 px text stays above 11 px), and its
   * wrapper scrolls past that. */
  var MIN_SCALE = 0.72;

  function sizeDiagram(wrap) {
    var host = wrap.querySelector(":scope > div.mermaid");
    if (!host) return false;
    if (!wrap.clientWidth) return false;
    var hostStyle = host.style;
    hostStyle.minWidth = "";
    var w1 = host.clientWidth, h1 = host.clientHeight;
    if (!w1 || !h1) return false;
    hostStyle.width = Math.round(w1 * 0.5) + "px";
    var w2 = host.clientWidth, h2 = host.clientHeight;
    hostStyle.width = "6000px";
    var h3 = host.clientHeight;
    hostStyle.width = "";
    var ratio = (h1 - h2) / (w1 - w2);
    if (!(ratio > 0) || h3 <= h1 + 1) {
      wrap.dataset.akSized = "1";
      return true;   /* the diagram already shows at its drawn width */
    }
    var gap = h1 - w1 * ratio;
    var drawn = (h3 - gap) / ratio;
    var min = Math.round(Math.min(drawn, 6000) * MIN_SCALE);
    if (min > w1) hostStyle.minWidth = min + "px";
    wrap.dataset.akSized = "1";
    scrollState(wrap);
    return true;
  }

  /* Material removes the class from each <pre class="mermaid"> while it
   * loads Mermaid, then swaps in a drawn <div class="mermaid">; the wrapper
   * goes round that div when it arrives. */
  function adoptDiagram(host) {
    var wrap = host.parentNode;
    if (!wrap || !wrap.closest || !wrap.closest(".md-typeset")) return;
    if (!wrap.classList.contains("ak-diagram")) {
      wrap = document.createElement("div");
      wrap.className = "ak-diagram";
      wrap.setAttribute("role", "group");
      wrap.setAttribute("aria-label", "Diagram");
      host.parentNode.insertBefore(wrap, host);
      wrap.appendChild(host);
    }
    if (!wrap.dataset.akSized) sizeDiagram(wrap);
    if (!wrap.dataset.akWatch) watchScrollers();
  }

  function wrapDiagrams(root) {
    root.querySelectorAll("div.mermaid").forEach(adoptDiagram);
  }

  if (window.MutationObserver) {
    new MutationObserver(function (records) {
      records.forEach(function (r) {
        r.addedNodes.forEach(function (n) {
          if (n.nodeType === 1 && n.tagName === "DIV" && n.classList.contains("mermaid")) adoptDiagram(n);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ---- Each page ----------------------------------------------------- */

  function onPage() {
    setTimeout(function () {
      var root = document.querySelector(".md-content") || document.body;
      markAdjacentFootnotes(root);
      groupBackrefs(root);
      glueCode(root);
      glueText(root);
      wrapDiagrams(root);
      watchScrollers();
      foldStaticList();
      focusableScrollers();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(rewatch);
    }, 0);
  }

  registerBrowse();

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(onPage);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onPage);
  } else {
    onPage();
  }
})();
