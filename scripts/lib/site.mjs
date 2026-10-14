// site.mjs: serve the built site/ under the deploy prefix, list its pages, and
// launch Chromium for the shots, a11y and links checks. Node stdlib only.
import { createServer } from 'node:http';
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

export const ROOT = resolve(new URL('../..', import.meta.url).pathname);
export const SITE = join(ROOT, 'site');
export const CACHE = join(ROOT, '.cache');
// The path GitHub Pages serves the site under (mkdocs.yml site_url).
export const PREFIX = '/agentik-research/';
export const SITE_URL = 'https://agentik-dev.github.io' + PREFIX;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json',
};

// Serve site/ at http://127.0.0.1:<port>/agentik-research/, with site/404.html
// for a missing path, as GitHub Pages does. Resolves to { url, close }.
export function serve() {
  if (!existsSync(join(SITE, 'index.html'))) {
    throw new Error('site/ is not built: run `make site` first');
  }
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (!path.startsWith(PREFIX)) {
      res.writeHead(302, { Location: PREFIX });
      return res.end();
    }
    let file = resolve(SITE, '.' + sep + path.slice(PREFIX.length));
    if (file !== SITE && !file.startsWith(SITE + sep)) {
      res.writeHead(403);
      return res.end();
    }
    if (existsSync(file) && statSync(file).isDirectory()) {
      if (!path.endsWith('/')) {
        res.writeHead(301, { Location: path + '/' });
        return res.end();
      }
      file = join(file, 'index.html');
    }
    let status = 200;
    if (!existsSync(file)) {
      status = 404;
      file = join(SITE, '404.html');
    }
    res.writeHead(status, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    createReadStream(file).pipe(res);
  });
  return new Promise((ok) => {
    server.listen(0, '127.0.0.1', () => {
      const url = `http://127.0.0.1:${server.address().port}${PREFIX}`;
      ok({ url, close: () => new Promise((done) => server.close(done)) });
    });
  });
}

// Every built page as a path under the prefix ('' for the home page), sorted,
// with 404.html last. PAGES="index,journal/" narrows it to paths that start
// with one of the given prefixes ("index" means the home page).
export function pages() {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const rel = relative(SITE, full).split(sep).join('/');
      if (statSync(full).isDirectory()) {
        if (!['assets', 'search', 'stylesheets', 'javascripts'].includes(rel)) walk(full);
      } else if (name === 'index.html') {
        out.push(rel.slice(0, -'index.html'.length));
      }
    }
  };
  walk(SITE);
  out.sort();
  if (existsSync(join(SITE, '404.html'))) out.push('404.html');
  const want = (process.env.PAGES || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!want.length) return out;
  return out.filter((p) => want.some((w) => (w === 'index' ? p === '' : p.startsWith(w))));
}

// A file-safe name for a page path: '' -> 'index', 'field/memory/' -> 'field-memory'.
export function slug(page) {
  return page.replace(/\/$/, '').replace(/\.html$/, '').replace(/\//g, '-') || 'index';
}

// Chromium for Playwright. The pinned Playwright's own build is used when it
// is installed; otherwise CHROMIUM, then the cloud image's /opt/pw-browsers/chromium.
export async function browser() {
  const { chromium } = await import('playwright');
  try {
    return await chromium.launch();
  } catch (err) {
    const path = process.env.CHROMIUM || '/opt/pw-browsers/chromium';
    if (!existsSync(path)) throw err;
    return chromium.launch({ executablePath: path });
  }
}
