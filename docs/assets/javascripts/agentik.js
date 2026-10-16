/* agentik.js: the site's own config script, loaded after the glass kit's
 * glass-browse.js and glass-cards.js.
 *
 * It registers the sources browse (docs/sources.md mounts it; the rows are
 * docs/assets/data/sources.json, written by scripts/sources-page): a table on
 * a wide screen, glass-cards' cards below 960 px, 30 at a time behind a
 * "Show more" button (search and the facets still run over every row). Once
 * the browse has drawn, the static list below it folds away behind a button;
 * without JavaScript, or if the rows fail to load, the list stays.
 *
 * On every page (Material's document$ under navigation.instant, else
 * DOMContentLoaded) it also tidies the typeset text:
 *   - ties a note's first back-link to its last word;
 *   - keeps ISO dates, a number with its unit, and short inline code on one
 *     line, and lets long inline code break only after a slash or a bar;
 *   - wraps each Mermaid diagram in a card and a scroller and gives it a
 *     minimum width, so a wide diagram stays legible and scrolls on a narrow
 *     screen, starting with its first node in view;
 *   - marks wide tables, code blocks and diagrams that scroll sideways, for
 *     the edge fade in agentik-site.css, and gives them a tab stop.
 */
(function () {
  "use strict";

  /* ---- The sources browse ------------------------------------------ */

  /* Cards below 960 px, where the table's six columns do not fit. */
  var NARROW = window.matchMedia ? window.matchMedia("(max-width: 59.984375em)") : null;

  /* glass-cards draws every matching row at once: 421 sources made a phone
   * page 68,000 px tall. This renderer hands glass-cards the first PAGE rows
   * of the filtered, sorted set and adds a button for the next PAGE. The kit
   * still filters, searches and counts over every row, and calls the
   * renderer again on each change, which starts from the first PAGE. */
  var PAGE = 30;

  function pagedCards(ctx) {
    var cards = window.GlassBrowse.renderers.cards;
    var all = ctx.out, shown = 0;
    function draw(upto) {
      var part = {};
      for (var k in ctx) part[k] = ctx[k];
      part.out = all.slice(0, upto);
      cards(part);
      shown = Math.min(upto, all.length);
      if (shown < all.length) {
        var p = document.createElement("p");
        p.className = "ak-more";
        var b = document.createElement("button");
        b.type = "button";
        b.className = "md-button";
        var next = Math.min(PAGE, all.length - shown);
        b.textContent = "Show " + next + " more";
        b.setAttribute("aria-label", "Show " + next + " more sources; " + shown + " of " + all.length + " shown");
        b.addEventListener("click", function () {
          var from = shown;
          draw(shown + PAGE);
          /* Focus moves to the first card the click added. */
          var added = ctx.host.querySelectorAll(".gb-cards > *")[from];
          var target = added && (added.matches("a[href], [tabindex]") ? added : added.querySelector("a[href]"));
          if (target) target.focus();
        });
        var count = document.createElement("span");
        count.className = "ak-more-count";
        count.textContent = shown + " of " + all.length + " shown";
        p.appendChild(b);
        p.appendChild(count);
        ctx.host.appendChild(p);
      }
    }
    draw(PAGE);
  }

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
    if (GlassBrowse.renderers && GlassBrowse.renderers.cards) GlassBrowse.renderers["ak-cards"] = pagedCards;
    var CARDS = GlassBrowse.renderers && GlassBrowse.renderers["ak-cards"] ? "ak-cards" : "cards";
    Object.defineProperty(sources, "view", {
      enumerable: true,
      get: function () { return NARROW && NARROW.matches ? CARDS : "table"; }
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

  /* Adjacent marks are sorted, and get the comma between them, in the HTML
   * (overrides/hooks/footnote_order.py), so they need nothing here.
   *
   * A note's first back-link in one unbreakable run with the note's last
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
   * with no space stays whole. In longer code, each word (the text between
   * spaces) of at most 40 characters that holds a hyphen ("-c",
   * "--max-turns") stays whole; a longer word breaks only after a slash or a
   * bar, each piece between them whole ("~/.claude/" "projects/" ...). The
   * spaces still break. */
  var LONG = 40;

  function nobr(text) {
    var span = document.createElement("span");
    span.className = "ak-nobr";
    span.textContent = text;
    return span;
  }

  function glueWord(frag, word) {
    if (word.length <= LONG) {
      frag.appendChild(word.length > 1 && word.indexOf("-") >= 0 ? nobr(word) : document.createTextNode(word));
      return;
    }
    var pieces = word.replace(/([\/|])(?![\/|])/g, "$1\u0000").split("\u0000").filter(Boolean);
    pieces.forEach(function (piece, i) {
      frag.appendChild(pieces.length > 1 && piece.length <= LONG ? nobr(piece) : document.createTextNode(piece));
      if (i < pieces.length - 1) frag.appendChild(document.createElement("wbr"));
    });
  }

  function glueCode(root) {
    root.querySelectorAll("code").forEach(function (code) {
      if (code.dataset.akGlued || code.closest("pre") || code.children.length) return;
      code.dataset.akGlued = "1";
      var text = code.textContent;
      if (!/\s/.test(text) && text.length <= LONG) {
        code.classList.add("ak-nobr");
        return;
      }
      var parts = text.split(/(\s+)/);
      if (!parts.some(function (w) { return w.indexOf("-") >= 0 || w.length > LONG; })) return;
      var frag = document.createDocumentFragment();
      parts.forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
        else glueWord(frag, part);
      });
      code.textContent = "";
      code.appendChild(frag);
    });
  }

  /* ---- Sideways scrolling ------------------------------------------- */

  var SCROLLERS = ".md-typeset__scrollwrap, .md-typeset pre > code, .ak-diagram-scroll";

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
    pending = window.requestAnimationFrame(function () { pending = 0; sizePending(); watchScrollers(); });
  }
  window.addEventListener("resize", rewatch, { passive: true });

  /* ---- Mermaid diagrams ---------------------------------------------- */

  /* Material renders each diagram into a closed shadow root as an SVG with
   * width 100% and max-width at its drawn width, so it shrinks to fit the
   * column. The script keeps a reference to each diagram's root as Material
   * attaches it (the root stays closed to every other script), to read the
   * drawn width from the SVG's viewBox and to find the diagram's first node.
   *
   * Each diagram goes in a card (.ak-diagram) holding a scroller
   * (.ak-diagram-scroll), so the edge fade stays inside the card's border.
   * The diagram gets a minimum width of 68 percent of its drawn width: its
   * 16 px text shrinks to no less than 10.9 px, and the scroller scrolls past
   * that. A diagram up to about 1.47 times its column's width scales down to
   * fit. When a diagram scrolls, it starts with its first node centred, not
   * at its left edge, where a side branch may sit. */
  var MIN_SCALE = 0.68;
  var ROOTS = window.WeakMap ? new WeakMap() : null;

  if (ROOTS && window.Element && Element.prototype.attachShadow) {
    var attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (init) {
      var root = attachShadow.call(this, init);
      if (this.tagName === "DIV" && this.classList.contains("mermaid")) ROOTS.set(this, root);
      return root;
    };
  }

  /* The drawn width: the SVG's viewBox through the kept root; without it,
   * from three heights, since the box's height grows with its width at the
   * SVG's aspect ratio until the width reaches the drawn width. */
  function drawnWidth(host) {
    var root = ROOTS && ROOTS.get(host);
    var svg = root && root.querySelector("svg");
    if (svg) {
      var vb = svg.viewBox && svg.viewBox.baseVal;
      var max = parseFloat(svg.style.maxWidth);
      if (max > 0) return max;
      if (vb && vb.width > 0) return vb.width;
    }
    var hostStyle = host.style;
    var w1 = host.clientWidth, h1 = host.clientHeight;
    if (!w1 || !h1) return 0;
    hostStyle.width = Math.round(w1 * 0.5) + "px";
    var w2 = host.clientWidth, h2 = host.clientHeight;
    hostStyle.width = "6000px";
    var h3 = host.clientHeight;
    hostStyle.width = "";
    var ratio = (h1 - h2) / (w1 - w2);
    if (!(ratio > 0) || h3 <= h1 + 1) return w1;
    return Math.min((h3 - (h1 - w1 * ratio)) / ratio, 6000);
  }

  /* The first node the source names: Mermaid numbers node ids in source
   * order ("...-flowchart-fork-0"). */
  function firstNode(host) {
    var root = ROOTS && ROOTS.get(host);
    if (!root) return null;
    var best = null, bestN = Infinity;
    root.querySelectorAll("g.node").forEach(function (g) {
      var m = /-(\d+)$/.exec(g.id || "");
      var n = m ? Number(m[1]) : Infinity;
      if (!best || n < bestN) { best = g; bestN = n; }
    });
    return best;
  }

  function startAtFirstNode(scroller, host) {
    var max = scroller.scrollWidth - scroller.clientWidth;
    if (max <= 1 || scroller.dataset.akStarted) return;
    scroller.dataset.akStarted = "1";
    var node = firstNode(host);
    if (!node) return;
    var r = node.getBoundingClientRect(), box = scroller.getBoundingClientRect();
    var centre = r.left + r.width / 2 - box.left + scroller.scrollLeft;
    scroller.scrollLeft = Math.max(0, Math.min(max, Math.round(centre - scroller.clientWidth / 2)));
  }

  function sizeDiagram(wrap) {
    var scroller = wrap.querySelector(":scope > .ak-diagram-scroll");
    var host = scroller && scroller.querySelector(":scope > div.mermaid");
    if (!host || !scroller.clientWidth) return false;
    host.style.minWidth = "";
    var drawn = drawnWidth(host);
    if (!drawn) return false;
    /* Set at every width: where the column is wider, it has no effect, and
     * it still holds when the window narrows. */
    host.style.minWidth = Math.round(drawn * MIN_SCALE) + "px";
    wrap.dataset.akSized = "1";
    startAtFirstNode(scroller, host);
    scrollState(scroller);
    return true;
  }

  /* Material removes the class from each <pre class="mermaid"> while it
   * loads Mermaid, then swaps in a drawn <div class="mermaid">; the card and
   * the scroller go round that div when it arrives. */
  function adoptDiagram(host) {
    var parent = host.parentNode;
    if (!parent || !parent.closest || !parent.closest(".md-typeset")) return;
    var wrap;
    if (parent.classList.contains("ak-diagram-scroll")) {
      wrap = parent.parentNode;
    } else {
      wrap = document.createElement("div");
      wrap.className = "ak-diagram";
      wrap.setAttribute("role", "group");
      wrap.setAttribute("aria-label", "Diagram");
      var scroller = document.createElement("div");
      scroller.className = "ak-diagram-scroll";
      parent.insertBefore(wrap, host);
      wrap.appendChild(scroller);
      scroller.appendChild(host);
    }
    if (!wrap.dataset.akSized) sizeDiagram(wrap);
    watchScrollers();
  }

  function wrapDiagrams(root) {
    root.querySelectorAll("div.mermaid").forEach(adoptDiagram);
  }

  /* After a resize: a diagram that was hidden when it arrived is sized, and
   * one that starts to scroll starts at its first node. */
  function sizePending() {
    document.querySelectorAll(".ak-diagram:not([data-ak-sized])").forEach(sizeDiagram);
    document.querySelectorAll(".ak-diagram-scroll:not([data-ak-started])").forEach(function (s) {
      var host = s.querySelector(":scope > div.mermaid");
      if (host) startAtFirstNode(s, host);
    });
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
