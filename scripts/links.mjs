// links.mjs: check every link in the built site with linkinator. A broken
// internal link fails; external failures are listed in .cache/links.txt.
//   LINKS_EXTERNAL=0 skips the external links (offline, or a quick run).
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LinkChecker } from 'linkinator';
import { CACHE, SITE_URL, serve } from './lib/site.mjs';

mkdirSync(CACHE, { recursive: true });
const site = await serve();
const internal = (u) => u.startsWith(site.url) || u.startsWith(SITE_URL);
const external = process.env.LINKS_EXTERNAL !== '0';
const checker = new LinkChecker();
const res = await checker.check({
  path: [site.url, site.url + '404.html'],
  recurse: true,
  concurrency: 25,
  timeout: 20000,
  retry: true,
  checkFragments: true,
  // The deploy address resolves to the local server, so canonical and feed links check too.
  urlRewriteExpressions: [{ pattern: new RegExp('^' + SITE_URL.replace(/[.]/g, '\\.')), replacement: site.url }],
  linksToSkip: async (u) => !internal(u) && (!external || !/^https?:/.test(u)),
});
await site.close();
const broken = res.links.filter((l) => l.state === 'BROKEN');
const inner = broken.filter((l) => internal(l.url));
const outer = broken.filter((l) => !internal(l.url));
const line = (l) => `${l.status || 'error'} ${l.url}  (on ${l.parent || '?'})`;
writeFileSync(join(CACHE, 'links.txt'), outer.map(line).join('\n') + (outer.length ? '\n' : ''));
for (const l of inner) console.log('broken: ' + line(l));
const checked = res.links.filter((l) => l.state !== 'SKIPPED').length;
console.log(`links: ${checked} checked, ${inner.length} broken internal, ${outer.length} external failures in .cache/links.txt${external ? '' : ' (external skipped)'}`);
process.exit(inner.length ? 1 : 0);
